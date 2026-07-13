import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

/**
 * Retell AI Webhook Handler — Echelon Form Voice Concierge
 *
 * Handles inbound webhook events from Retell AI for the executive
 * voice concierge service. Retell AI triggers these events when
 * calls are initiated, in progress, or completed.
 *
 * Events handled:
 *  - call_started:   A call has been initiated
 *  - call_ended:     A call has completed
 *  - transcript:     Real-time transcript available
 *  - agent_response: Agent has generated a response
 *
 * Configure in Retell AI Dashboard:
 * 1. Go to Settings → Webhooks
 * 2. URL: https://<project-ref>.supabase.co/functions/v1/retell-webhook
 * 3. Events: Select all call events
 * 4. Secret: Set to match RETELL_WEBHOOK_SECRET env var
 */

interface RetellEvent {
  event: string
  call_id: string
  call_type: string
  from_number: string
  to_number: string
  direction: string
  agent_id: string
  audio_url?: string
  transcript?: string
  timestamp: string
  metadata?: Record<string, any>
}

interface RetellTranscriptMessage {
  role: 'agent' | 'user'
  content: string
}

serve(async (req) => {
  try {
    // Verify webhook signature
    const signature = req.headers.get('X-Retell-Signature') || ''
    const webhookSecret = Deno.env.get('RETELL_WEBHOOK_SECRET') || ''
    
    // Simple HMAC verification (Retell uses SHA256)
    const body = await req.text()
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(webhookSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )
    const signatureBytes = hexToBytes(signature)
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes,
      encoder.encode(body)
    )

    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 401 })
    }

    const event: RetellEvent = JSON.parse(body)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') as string,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
    )

    switch (event.event) {
      case 'call_started': {
        // Log the incoming call
        await supabase.from('concierge_logs').insert({
          call_id: event.call_id,
          call_type: event.call_type,
          from_number: event.from_number,
          to_number: event.to_number,
          direction: event.direction,
          agent_id: event.agent_id,
          status: 'started',
          started_at: event.timestamp,
          metadata: event.metadata || {},
        })

        // If this is an inbound call from a known number, look up the prospect
        if (event.direction === 'inbound') {
          const { data: prospect } = await supabase
            .from('profiles')
            .select('id, full_name, email, subscription_tier')
            .eq('phone', event.from_number)
            .maybeSingle()

          if (prospect) {
            // Update the call log with prospect info
            await supabase
              .from('concierge_logs')
              .update({
                user_id: prospect.id,
                user_email: prospect.email,
                user_name: prospect.full_name,
                subscription_tier: prospect.subscription_tier,
              })
              .eq('call_id', event.call_id)
          }
        }
        break
      }

      case 'call_ended': {
        // Update the call record with results
        await supabase
          .from('concierge_logs')
          .update({
            status: 'ended',
            ended_at: event.timestamp,
            audio_url: event.audio_url,
            transcript: event.transcript,
            duration_seconds: calculateDuration(event.timestamp, event.metadata?.started_at),
          })
          .eq('call_id', event.call_id)
        break
      }

      case 'transcript': {
        // Update transcript in real-time
        await supabase
          .from('concierge_logs')
          .update({
            transcript: event.transcript,
            last_transcript_at: event.timestamp,
          })
          .eq('call_id', event.call_id)
        break
      }

      case 'agent_response': {
        // Log agent responses for analytics
        const { data: existing } = await supabase
          .from('concierge_logs')
          .select('agent_responses')
          .eq('call_id', event.call_id)
          .single()

        const responses = existing?.agent_responses || []
        responses.push({
          response: event.transcript,
          timestamp: event.timestamp,
        })

        await supabase
          .from('concierge_logs')
          .update({ agent_responses: responses })
          .eq('call_id', event.call_id)
        break
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 })
  } catch (err: any) {
    console.error('Retell webhook error:', err.message)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16)
  }
  return bytes
}

function calculateDuration(endTimestamp: string, startTimestamp?: string): number {
  if (!startTimestamp) return 0
  const end = new Date(endTimestamp).getTime()
  const start = new Date(startTimestamp).getTime()
  return Math.floor((end - start) / 1000)
}