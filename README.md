# VantageFit

> **Efficiency-First fitness for busy professionals.**
> Data-driven nutrition, 30-minute high-intensity workouts, and 24/7 digital accountability.

---

## 🚀 Project Overview

VantageFit is a premium fitness platform targeting high-performing professionals who want elite health results on a compressed schedule. The platform consists of:

1. **Landing Page** — High-converting marketing site with Stripe checkout integration
2. **Mobile App** — React Native/Expo app with workout tracking, nutrition logging, and coaching chat
3. **Backend** — Supabase (PostgreSQL + Auth + Realtime + Storage)
4. **Payments** — Stripe subscription management with automatic tier provisioning

---

## 📁 Project Structure

```
vantagefit/
├── landing-page/           # Static marketing website
│   ├── index.html          # Main landing page (SEO-optimized)
│   ├── styles.css          # Complete stylesheet with responsive breakpoints
│   ├── main.js             # Interactions, scroll animations, mobile menu
│   ├── manifest.json       # Web App Manifest (PWA)
│   ├── robots.txt          # Crawler directives
│   ├── sitemap.xml         # SEO sitemap
│   └── assets/
│       └── og-image.png    # Social sharing image
│
├── docs/                   # Team documentation
│   ├── app_architecture.md # Mobile app architecture design
│   ├── framework.md        # 12-week HIIT & nutrition framework
│   ├── exercise_library.md # Complete exercise library
│   ├── ads_strategy.md     # YouTube Ads strategy & scripts
│   ├── stripe_integration.md # Stripe-Supabase sync docs
│   └── supabase_setup.sql  # Database schema & seed data
│
└── README.md               # This file
```

---

## 🌐 Landing Page Deployment

The landing page is a **fully static site** (HTML + CSS + JS) with zero build steps. It can be deployed to any static host.

### Option 1: GitHub Pages (Recommended)

1. Push the `landing-page/` directory to a GitHub repository.
2. Go to **Settings → Pages** in the repo.
3. Select **Deploy from a branch**, choose `main`, and set the folder to `/ (root)`.
4. Your site will be live at `https://<username>.github.io/vantagefit-landing/`.
5. **Note:** If your repo is named `vantagefit.github.io`, it deploys to the root domain.

### Option 2: Vercel

1. Install the Vercel CLI: `npm i -g vercel`
2. `cd landing-page/`
3. Run `vercel --prod`
4. Follow the prompts to link or create a project.
5. Vercel auto-detects static files and deploys instantly.

**Custom Domain:** In the Vercel dashboard, go to **Project Settings → Domains** and add your domain.

### Option 3: Netlify

1. Drag and drop the `landing-page/` folder into [Netlify Drop](https://app.netlify.com/drop).
2. Netlify will give you an instant live URL.
3. To connect a custom domain, go to **Site Settings → Domain Management**.

### Performance Checklist Before Deploy

- [ ] `og-image.png` exists in `assets/`
- [ ] `manifest.json` is accessible at `/manifest.json`
- [ ] `robots.txt` and `sitemap.xml` are at root
- [ ] All Stripe checkout links use `https://buy.stripe.com/...` (not `http://`)
- [ ] Canonical URL in `<head>` matches your production domain
- [ ] DNS prefetch for `fonts.googleapis.com`, `fonts.gstatic.com`, `buy.stripe.com`

---

## 📱 Mobile App Development Setup

### Prerequisites

- **Node.js** ≥ 18
- **npm** or **yarn**
- **Expo CLI**: `npm install -g expo-cli`
- **EAS CLI** (for builds): `npm install -g eas-cli`
- **Supabase CLI** (optional, for local dev): `npm install -g supabase`

### 1. Clone & Install

```bash
git clone https://github.com/<owner>/vantagefit-app.git
cd vantagefit-app
npm install
```

### 2. Environment Variables

Create a `.env` file in the project root:

```env
# Supabase
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_ANON_KEY=<your-anon-key>

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_live_...

# PostHog (Analytics)
POSTHOG_API_KEY=phc_...
```

> **Note:** The App Developer should have already configured the Supabase project. If not, run the schema from `docs/supabase_setup.sql` in the Supabase SQL editor.

### 3. Run the App

```bash
# Start the Expo development server
expo start

# Run on iOS simulator (macOS only)
i

# Run on Android emulator
a

# Run on web
w
```

### 4. Build for Production

```bash
# iOS build (requires Apple Developer account)
eas build --platform ios

# Android build
eas build --platform android

# Configure build profiles in eas.json
```

### 5. Stripe Integration

See `docs/stripe_integration.md` for webhook setup and subscription tier mapping.

- Configure Stripe webhook URL: `https://<your-project-ref>.supabase.co/functions/v1/stripe-webhook`
- Listen for events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
- Edge Function auto-updates the `profiles.subscription_tier` field in Supabase.

---

## 🌐 Multilingual Support

VantageFit is a global platform. The landing page and core documentation are available in the following languages:

- **English** (`index.html`, `framework.md`, `ads_strategy.md`, `business_plan.md`, `campaign_launch_guide.md`)
- **Español** (`index-es.html`, `framework-es.md`, `ads_strategy-es.md`, `business_plan-es.md`, `campaign_launch_guide-es.md`)
- **Français** (`index-fr.html`, `framework-fr.md`, `ads_strategy-fr.md`, `business_plan-fr.md`, `campaign_launch_guide-fr.md`)
- **Deutsch** (`index-de.html`, `framework-de.md`, `ads_strategy-de.md`, `business_plan-de.md`, `campaign_launch_guide-de.md`)
- **Português** (`index-pt.html`, `framework-pt.md`, `ads_strategy-pt.md`, `business_plan-pt.md`)
- **中文 (Mandarin)** (`index-zh.html`, `framework-zh.md`, `ads_strategy-zh.md`, `business_plan-zh.md`)
- **العربية (Arabic)** (`index-ar.html`, `framework-ar.md`, `ads_strategy-ar.md`, `business_plan-ar.md`, `campaign_launch_guide-ar.md`)
- **हिन्दी (Hindi)** (`index-hi.html`, `framework-hi.md`, `ads_strategy-hi.md`, `business_plan-hi.md`)

The language switcher is integrated into the navigation bar of each landing page. All strategic documents and launch guides are localized for immediate deployment in their respective regions.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Landing Page** | Static HTML5 + CSS3 + Vanilla JS |
| **Mobile App** | React Native (Expo) + TypeScript |
| **Backend / DB** | Supabase (PostgreSQL, Auth, Realtime, Storage) |
| **State Management** | Zustand |
| **UI Framework** | Tamagui / NativeWind |
| **Payments** | Stripe Checkout + Supabase Edge Functions |
| **Analytics** | PostHog |
| **Build / Deploy** | EAS (Expo) + GitHub Actions CI/CD |

---

## 🔄 Deployment Workflow

1. **Landing Page:** Push `landing-page/` to the repo → auto-deploy via GitHub Pages / Vercel / Netlify.
2. **App Updates:** Push to `main` → GitHub Actions runs tests → EAS builds → Over-the-air (OTA) update via Expo Updates.
3. **Database:** Schema changes via Supabase migrations. Seed data from `docs/supabase_setup.sql`.

---

## 📋 Checklist for Launch (Phase 2)

- [x] Landing page built and SEO-optimized
- [x] Three-tier pricing with Stripe checkout links
- [x] App Store / Google Play placeholder badges
- [x] App feature section with Beta / Coming Soon badges
- [x] Mobile app architecture defined
- [x] Supabase schema ready
- [x] Stripe integration documented
- [ ] Connect custom domain to landing page
- [ ] Submit sitemap to Google Search Console
- [ ] Configure Stripe webhooks in production
- [ ] Launch YouTube Ads campaigns
- [ ] Beta test app with first 50 Core/VIP members

---

## 📝 Documentation

| Document | Purpose |
|---|---|
| `docs/app_architecture.md` | Mobile app tech stack, data model, security |
| `docs/framework.md` | 12-week HIIT curriculum + nutrition guidelines |
| `docs/exercise_library.md` | Full exercise catalog with progressions |
| `docs/stripe_integration.md` | Webhook setup, tier mapping, UI gating |
| `docs/supabase_setup.sql` | Database schema, RLS policies, seed data |
| `docs/ads_strategy.md` | YouTube Ads strategy, scripts, targeting |

---

## 🤝 Team

- **Lead** — Business execution & team management
- **Strategist** — Fitness & nutrition program design
- **App Developer** — React Native/Expo mobile app
- **Website Designer** — Landing page, SEO, deployment
- **YouTube Ads Promoter** — Marketing & customer acquisition

---

## 📄 License

© 2026 VantageFit. All rights reserved.
