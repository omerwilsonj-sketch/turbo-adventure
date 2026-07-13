/**
 * Retell AI Client — Echelon Form Voice Concierge
 *
 * Client-side module for interacting with the Retell AI voice concierge
 * service. Provides functions to initiate calls, check status, and
 * retrieve call history.
 *
 * The Retell AI backend service handles:
 *  - Inbound call routing and IVR
 *  - Natural language understanding for executive inquiries
 *  - Booking consultations and callbacks
 *  - CRM integration via the webhook
 *
 * Usage in the app:
 *   import { initiateConciergeCall, getCallHistory } from '../lib/retell';
 */

// Retell AI API base URL
const RETELL_API_BASE = 'https://api.retellai.com';

// Supabase Edge Function for our backend proxy
const SUPABASE_FN_BASE = process.env.EXPO_PUBLIC_SUPABASE_URL
  ? `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1`
  : '';

/**
 * Initiate a concierge call from the app.
 * This triggers Retell AI to call the user's phone number.
 */
export async function initiateConciergeCall(
  userPhone: string,
  userName?: string,
  userEmail?: string
): Promise<{ success: boolean; callId?: string; error?: string }> {
  try {
    const response = await fetch(`${SUPABASE_FN_BASE}/retell-concierge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        action: 'initiate_call',
        phone_number: userPhone,
        user_name: userName,
        user_email: userEmail,
      }),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Failed to initiate call')

    return { success: true, callId: data.call_id }
  } catch (error: any) {
    console.error('[Retell] Failed to initiate call:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Get the concierge call history for a user.
 */
export async function getCallHistory(
  userId: string
): Promise<{ success: boolean; calls?: any[]; error?: string }> {
  try {
    const response = await fetch(
      `${SUPABASE_FN_BASE}/retell-concierge?action=history&user_id=${userId}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
        },
      }
    )

    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Failed to fetch history')

    return { success: true, calls: data.calls }
  } catch (error: any) {
    console.error('[Retell] Failed to fetch call history:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Schedule a callback from the concierge.
 */
export async function scheduleCallback(
  userPhone: string,
  preferredTime: string,
  notes?: string
): Promise<{ success: boolean; scheduledId?: string; error?: string }> {
  try {
    const response = await fetch(`${SUPABASE_FN_BASE}/retell-concierge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        action: 'schedule_callback',
        phone_number: userPhone,
        preferred_time: preferredTime,
        notes,
      }),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Failed to schedule callback')

    return { success: true, scheduledId: data.scheduled_id }
  } catch (error: any) {
    console.error('[Retell] Failed to schedule callback:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Retell AI Agent Configuration
 *
 * This defines the voice concierge agent's personality and knowledge base.
 * The agent should be configured in the Retell AI dashboard with these
 * system prompt instructions.
 */
export const CONCIERGE_AGENT_CONFIG = {
  name: 'Echelon Form Executive Concierge',
  voice: {
    provider: 'eleven_labs',
    voice_id: '21m00Tcm4TlvDq8ikWAM', // Rachel — warm, professional
    speed: 0.95,
    stability: 0.7,
    similarity_boost: 0.8,
  },
  language: 'en-US',
  /**
   * System prompt for the Retell AI agent.
   * This defines how the concierge behaves and what it knows.
   */
  system_prompt: `You are the Executive Concierge for Echelon Form, a premium luxury fitness ecosystem for busy professionals, CEOs, and high-net-worth individuals.

YOUR PERSONALITY:
- Warm, polished, and ultra-professional — like a Ritz-Carlton butler
- Concise and efficient — respect that executives value their time
- Knowledgeable about elite fitness, nutrition science, and performance optimization
- Never pushy or salesy — you inform and invite, you don't pressure

YOUR KNOWLEDGE BASE:

PRODUCTS & PRICING:
1. Echelon Go (£14.99/mo): Self-guided workout library + nutrition guides. Cancel anytime.
2. Echelon Core (£49/mo): Full digital membership + weekly group coaching + accountability.
3. Echelon VIP (£249/mo): 1-on-1 VIP coaching, custom macros, weekly video check-ins.
4. Echelon Elite (£999/mo): Ultra-premium, daily check-ins, live form review, concierge nutrition, private executive network. 12-week minimum commitment.

THE ECHELON METHOD:
- 30-minute "Efficiency-First" workouts (Warm-up 5min → HIIT 20min → Cool-down 5min)
- Data-driven nutrition using Mifflin-St Jeor equation
- 24/7 digital accountability via app and coaching
- 12-week structured programs with progressive overload

CALL HANDLING:
- If someone asks about pricing: clearly state all four tiers
- If someone wants to sign up: guide them to download the Echelon Form app
- If someone has a specific question you can't answer: offer to have a human coach call them back
- If someone sounds frustrated or confused: apologize warmly and offer a callback from a senior coach
- Always confirm the caller's name and best contact number before ending

Keep responses under 30 seconds. Be efficient. Be warm. Be unmistakably premium.`,
}