import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

/**
 * RevenueCat Webhook → Supabase Profile Sync
 *
 * This Edge Function receives RevenueCat webhook events (configured in the
 * RevenueCat dashboard under "Integrations → Webhooks") and syncs the
 * entitlement changes to the Supabase `profiles` table.
 *
 * RevenueCat handles all Stripe/App Store/Play Store billing directly.
 * This webhook is optional — the app also reads entitlements directly from
 * the RevenueCat SDK. Use this webhook to keep the Supabase `profiles`
 * table in sync for server-side checks (e.g., coach portal, analytics).
 *
 * RevenueCat webhook events handled:
 *  - INITIAL_PURCHASE
 *  - RENEWAL
 *  - UNCANCELLATION
 *  - CANCELLATION
 *  - NON_SUBSCRIPTION_PURCHASE
 *  - SUBSCRIPTION_PAUSED
 *  - EXPIRATION
 *  - SUBSCRIPTION_EXTENDED
 *
 * Configure in RevenueCat Dashboard:
 * 1. Go to Project Settings → Webhooks
 * 2. URL: https://<project-ref>.supabase.co/functions/v1/revenuecat-webhook
 * 3. Authorization header: `Bearer <your-supabase-anon-key>`
 */

serve(async (req) => {
  try {
    // Verify authorization
    const authHeader = req.headers.get('Authorization') || '';
    const expectedToken = Deno.env.get('SUPABASE_ANON_KEY') || '';
    if (authHeader !== `Bearer ${expectedToken}`) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const body = await req.json();
    const event = body.event;

    if (!event) {
      return new Response(JSON.stringify({ error: 'Invalid event' }), { status: 400 });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') as string,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
    );

    // Extract the app_user_id (set via Purchases.logIn in the app)
    const userId = event.app_user_id;
    const entitlementId = event.product_id;

    if (!userId) {
      return new Response(JSON.stringify({ error: 'No user ID' }), { status: 200 });
    }

    // Map RevenueCat entitlement/product IDs to Echelon Form tiers
    const TIER_MAP: Record<string, string> = {
      'echelon_go': 'go',
      'echelon_core': 'core',
      'echelon_vip': 'vip',
      'echelon_elite': 'elite',
    };

    // Determine the tier based on the event type
    let tier: string | null = null;

    switch (event.type) {
      case 'INITIAL_PURCHASE':
      case 'RENEWAL':
      case 'UNCANCELLATION':
      case 'SUBSCRIPTION_EXTENDED':
        tier = TIER_MAP[entitlementId] || 'go';
        break;
      case 'CANCELLATION':
      case 'EXPIRATION':
      case 'SUBSCRIPTION_PAUSED':
        // Check if the user still has any active entitlements
        // RevenueCat sends the full subscriber data in the event
        if (event.subscriber?.entitlements) {
          const activeEntitlements = Object.entries(event.subscriber.entitlements)
            .filter(([_, e]: [string, any]) => e.expires_date && new Date(e.expires_date) > new Date())
            .map(([id]) => id);

          if (activeEntitlements.length > 0) {
            // User still has another active entitlement
            tier = TIER_MAP[activeEntitlements[0]] || 'go';
          } else {
            tier = 'go';
          }
        } else {
          tier = 'go';
        }
        break;
    }

    if (tier) {
      await supabase
        .from('profiles')
        .update({ subscription_tier: tier })
        .eq('id', userId);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err: any) {
    console.error('RevenueCat webhook error:', err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});