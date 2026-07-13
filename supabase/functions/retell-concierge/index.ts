import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

/**
 * Echelon Form — Retell AI Concierge Proxy
 *
 * This Supabase Edge Function acts as a secure proxy between the mobile app
 * and Retell AI's API. It handles:
 *  1. Initiating outbound calls to users
 *  2. Scheduling callbacks
 *  3. Fetching call history
 *
 * The mobile app never directly calls Retell AI — it goes through this
 * proxy to keep API keys secure on the server side.
 */

const RETELL_API_BASE = 'https://api.retellai.com'

serve(async (req) => {
  try {
    // Verify the request is authenticated
    const authHeader = req.headers.get('Authorization') || ''
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY') || ''
    
    if (authHeader !== `Bearer ${anonKey}` && authHeader !== `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const retellApiKey = Deno.env.get('RETELL_API_KEY') || ''
    const url = new URL(req.url)
    const action = url.searchParams.get('action')

    // GET: Fetch call history
    if (req.method === 'GET' && action === 'history') {
      const userId = url.searchParams.get('user_id')
      if (!userId) {
        return new Response(JSON.stringify({ error: 'Missing user_id' }), { status: 400 })
      }

      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') as string,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
      )

      const { data: calls, error } = await supabase
        .from('concierge_logs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error

      return new Response(JSON.stringify({ calls }), { status: 200 })
    }

    // POST: Initiate call or schedule callback
    if (req.method === 'POST') {
      const body = await req.json()

      switch (body.action) {
        case 'initiate_call': {
          // Initiate an outbound call via Retell AI
          const retellResponse = await fetch(`${RETELL_API_BASE}/create-phone-call`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${retellApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from_number: Deno.env.get('RETELL_FROM_NUMBER') || '+1234567890',
              to_number: body.phone_number,
              agent_id: Deno.env.get('RETELL_AGENT_ID') || '',
              metadata: {
                user_name: body.user_name || '',
                user_email: body.user_email || '',
                source: 'mobile_app',
              },
            }),
          })

          const data = await retellResponse.json()
          if (!retellResponse.ok) throw new Error(data.message || 'Retell API error')

          // Log the call in Supabase
          const supabase = createClient(
            Deno.env.get('SUPABASE_URL') as string,
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
          )

          await supabase.from('concierge_logs').insert({
            call_id: data.call_id,
            call_type: 'outbound',
            from_number: Deno.env.get('RETELL_FROM_NUMBER') || '',
            to_number: body.phone_number,
            direction: 'outbound',
            agent_id: Deno.env.get('RETELL_AGENT_ID') || '',
            status: 'initiated',
            user_name: body.user_name,
            user_email: body.user_email,
            metadata: { source: 'mobile_app' },
          })

          return new Response(JSON.stringify({
            success: true,
            call_id: data.call_id,
            message: 'Call initiated. The concierge will ring you shortly.',
          }), { status: 200 })
        }

        case 'schedule_callback': {
          // Schedule a callback for later
          const supabase = createClient(
            Deno.env.get('SUPABASE_URL') as string,
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
          )

          const { data: scheduled, error } = await supabase
            .from('concierge_scheduled')
            .insert({
              phone_number: body.phone_number,
              preferred_time: body.preferred_time,
              notes: body.notes || '',
              status: 'pending',
            })
            .select()
            .single()

          if (error) throw error

          return new Response(JSON.stringify({
            success: true,
            scheduled_id: scheduled.id,
            message: 'Callback scheduled. We will call you at the requested time.',
          }), { status: 200 })
        }

        default:
          return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400 })
      }
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  } catch (err: any) {
    console.error('[Retell Concierge] Error:', err.message)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})