# Stripe-Supabase Subscription Integration

## Overview
This document outlines the architecture for syncing Stripe subscription status with the VantageFit Supabase user profiles.

## 1. Stripe Webhook Configuration
To enable automatic subscription syncing, a Stripe Webhook must be configured to point to a Supabase Edge Function.

- **Webhook URL:** `https://<your-project-ref>.supabase.co/functions/v1/stripe-webhook`
- **Events to listen for:**
    - `checkout.session.completed`
    - `customer.subscription.updated`
    - `customer.subscription.deleted`

## 2. Supabase Edge Function Logic
The Edge Function (`stripe-webhook`) should handle the incoming Stripe events and update the `profiles` table.

### Logic Flow:
1. Verify the Stripe webhook signature.
2. Extract the `client_reference_id` (which should be the Supabase `user_id`) from the `checkout.session.completed` event.
3. Map the Stripe Price ID or Product ID to the corresponding VantageFit tier (`go`, `core`, `vip`).
4. Update the user's profile in Supabase:
   ```sql
   UPDATE profiles SET subscription_tier = 'core' WHERE id = 'user_id';
   ```

## 3. Manual Sync (App Side)
Since webhooks can occasionally be delayed, the app provides a "Sync Subscription" button in the Profile screen. This button:
1. Triggers a request to a Supabase Edge Function (e.g., `sync-stripe-status`).
2. The Edge Function fetches the latest active subscriptions for the user's email from Stripe.
3. Updates the Supabase profile if a discrepancy is found.

## 4. UI Gating
The app uses the `subscription_tier` field in the `profiles` table to determine feature access:
- **Go:** Training library only.
- **Core:** Workouts + Nutrition Dashboard + Group Chat.
- **VIP:** Core features + Private Coaching Chat + Custom Macros.
