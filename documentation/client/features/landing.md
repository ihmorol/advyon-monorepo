# Landing & Marketing Surfaces

## Overview
Landing experiences live under `src/pages/landing/` and public routes (`/`, `/about`, `/how-to-use`, `/contact`, etc.). They showcase Advyon’s value proposition, capture leads, and direct prospects into the onboarding funnel.

**Sections** (`src/pages/landing`)
- `HeroSection`, `FeaturesSection`, `RolesSection`, `WorkspaceSection` - scrollable narrative with CTA buttons
- `ScalesOfJustice3D.jsx` - React Three Fiber scene integrated into hero
- `LandingNavbar` & `LandingFooter` - shared chroming across public pages

> Source: advyon-client/src/pages/Home.jsx (c73ac5a)
> Source: advyon-client/src/pages/landing/HeroSection.jsx (c73ac5a)
> Source: advyon-client/src/pages/landing/ScalesOfJustice3D.jsx (c73ac5a)

## Contact & Lead Capture
- `ContactPage.jsx` renders a form validated by `features/landing/contactSchema.js` (Zod). Submissions call `/contact` with topic/urgency metadata.
- Toast notifications reuse the global `sonner` config to acknowledge requests.

> Source: advyon-client/src/pages/ContactPage.jsx (c73ac5a)
> Source: advyon-client/src/features/landing/contactSchema.js (c73ac5a)
> Source: advyon-server/src/app/modules/contact/contact.route.ts (c73ac5a)

## Static Content Pages
| Route | File | Notes |
|-------|------|-------|
| `/about`, `/careers`, `/blog` | `AboutPage.jsx`, `CareersPage.jsx`, `BlogPage.jsx` | Markdown-like sections with CTA cards |
| `/terms`, `/privacy`, `/cookies`, `/security`, `/accessibility` | respective pages under `src/pages/` | Provide compliance/legal disclosures |
| `/how-to-use` | `HowToUsePage.jsx` | Step-by-step product tour linking to video assets |

## Navigation Flow
```mermaid
graph LR
    Visitor --> Navbar
    Navbar -->|CTA| AuthRoutes[/auth/signin]
    Visitor -->|Contact| ContactPage
    ContactPage -->|POST /contact| CRM
    Visitor -->|Docs CTA| documentation/index.md
```

Public layouts never mount Clerk or dashboard stores, keeping bundle size small for pre-login traffic. Animations rely on Framer Motion and custom shader effects for premium polish.

