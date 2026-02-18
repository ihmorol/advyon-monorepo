# Team 2 · Public Page Experience Blueprint

_Prepared via Product Manager + UI/UX Designer workflow for Team 2 implementation pods._

## Visual DNA
- **Primary Palette**: `#0E2D2C` midnight teal (bg), `#1C4645` deep teal, `#3A7573` accent teal, `#5CDBD6` bright teal highlights, `#E59500` amber CTA, `#FFFFFF` pure white objects.
- **3D Language**: floating translucent legal tiles + white quartz cards lit with soft amber rim lights.
- **Textures**: 3D gradient background (Three.js plane + shader) with low-poly noise. Motion blur trails when cards enter view.
- **Fonts**: Display = `Lora` (serif) for hero/legal quotes; Body = `Inter`.
- **Core Technologies**:
  - WebGL / `react-three-fiber` for hero background plane + orbiting glyphs.
  - `framer-motion` for scroll orchestration / parallax.
  - `lenis` or `framer-motion` smooth scroll.
  - `gsap/ScrollTrigger` optional for timeline/milestone staggering.
  - `@react-three/drei` for quick shader materials.

## Page Blueprints

### 1. Landing Page (`Home.jsx` / `src/features/landing/`)
- **Hero**
  - Full-bleed 3D plane (r3f) tinted `#0E2D2C` with gradient ramp to `#1B4B57`.
  - White extruded “legal artifacts” orbit slowly; respond to mouse with subtle parallax (5px).
  - Copy: “Advyon Legal OS” headline + subline describing unified workspace.
  - CTA buttons: `Start Free Trial` (amber gradient) + `Explore Platform` (outlined teal).
  - **Animation**: hero text slides from 20px below, blur 20 → 0, 600 ms.
- **Trust Bar**
  - Row of grayscale client logos with shimmering highlight on hover (CSS mask).
- **Feature Lava Sections**
  - Each section uses `grid grid-cols-12` with alternating 3D cards (floating white surfaces) and copy.
  - Parallax translation: ±40px based on scroll progress.
  - Micro-interactions: card tilt on hover (`rotateX/Y`).
- **How It Works Timeline**
  - Three steps with vertical progress indicator. Use `framer-motion` `useScroll` to fill gradient line.
- **Testimonials Carousel**
  - Glassmorphism cards (white at 90% opacity) with depth-of-field blur on edges.
  - Auto-play 6s, manual drag via `keen-slider`.
- **Pricing Preview**
  - Toggle for Monthly/Annual; cards expand with spring animation.
  - Glow line under recommended plan.
- **FAQ Accordion**
  - `framer-motion` layout transitions; icon rotates 180°.
- **Footer**
  - Multi-column nav + newsletter. Add starfield canvas behind .

### 2. About Page (`src/pages/AboutPage.jsx`)
- **Mission Banner**
  - Split layout: copy on left, subtle `meshGradient` blob on right, animated swirl.
  - Use `text-balance` and highlight keywords with amber gradient underline.
- **Vision & Values**
  - 2×3 card grid, each card has floating scale animation (scale 0.98 ↔ 1.02).
  - Colors per value using tinted teal/amber backgrounds.
- **Leadership Spotlight**
  - White cards with portrait, role, LinkedIn icon.
  - On hover: photo lifts 6px, drop shadow intensifies.
- **Milestone Timeline**
  - Horizontal scroll-snap timeline with dot + date + summary.
  - Use `ScrollTrigger` to fade between decades.
- **Partner Logos**
  - Provide grayscale logos, lighten to teal on hover.
- **Social Proof Stats**
  - Large numerals with gradient strokes, counting animation triggered on view.

### 3. How-to-Use Page (`src/pages/HowToUsePage.jsx`)
- **Intro Section**
  - Short video embed (MP4/WebM) with overlay controls.
- **Step-by-Step Modules**
  - Each step uses sticky left column (progress tracker) + right content area that scrolls.
  - Include CTA per step (“Launch workspace wizard”).
- **Interactive Tutorials**
  - Use `react-lite-youtube-embed` or local WebM loops.
  - Provide code-style callouts referencing actual UI.
- **FAQ + Best Practices**
  - Expandable cards with icon states (checklist icon rotates).
- **Support CTA**
  - Link to Contact page, includes gradient button.

### 4. Contact Page (`src/pages/ContactPage.jsx`)
- **Hero**
  - Map-like abstract wave background; location pins glow amber.
  - Copy: “Talk to Advyon’s Legal Concierge”.
- **Contact Form**
  - Two-column form (Name/Email, Role, Message, Urgency multi-select).
  - Inline validation (Zod) with subtle shake on error.
  - Submission animation: button morphs into loader ring, success confetti sparkles (CSS).
- **Support Channels**
  - Cards for Email, Phone, Slack, Knowledge Base.
- **Office Locations**
  - Cards with city, address, timezone, micro map (SVG).
- **Social Ribbon**
  - Icons with gradient outlines; hover rotates 15°.

### 5. Policy Cluster (`Terms`, `Privacy`, `Cookie`, `Security`, `Accessibility`, `Careers`, `Blog placeholder`)
- Shared layout using `Prose` typography + anchored table of contents.
- Animated heading markers (amber line slides in).
- Careers page: job cards with apply CTA; add floating badges for location/contract.
- Blog placeholder: 3 cards with “Coming Soon” shimmering overlay.

## Motion + Interaction Specs
- **Global Scroll**: smooth, inertia 0.1, clamp to avoid nausea.
- **Section Transition**: fade + upward translate 24px, duration 0.6s, overlap 0.1s for cascade.
- **3D Background**: 
  - Use `react-three-fiber` plane geometry, custom shader (Simplex noise) to animate gradient waves.
  - Keep GPU budget < 3% on MacBook Air (limit polygon count, use `drei/Effects` for bloom at intensity 0.4).
- **Particles**: instantiate 24 white orbs (size 4px) using `three-instanced-mesh`.
- **Reduced Motion**: wrap `prefers-reduced-motion` hook – disable parallax & heavy animations, fallback to static gradient.

## Accessibility + Performance Notes
- Maintain 4.5:1 contrast; white objects use drop shadow to separate from teal.
- All video loops require play/pause + captions.
- 3D canvas should lazy-load (dynamic import) and show CSS gradient fallback.
- LCP target < 2 s: pre-render hero copy, defer heavy script.
- Provide focus outlines for CTA buttons (2px amber).

## Developer Handoff Checklist
- Provide design tokens inside `tailwind.config.js` (already defined). Reference tokens by CSS variables rather than hex code.
- Each section exported as component under `src/features/landing/sections/*` for reuse.
- Keep copy strings centralized in `src/features/landing/content.ts` for i18n readiness.
- Animations orchestrated with `framer-motion` variants file to ensure consistent easing (`[0.16, 1, 0.3, 1]` for hero, `[0.83, 0, 0.17, 1]` for cards).
- Document every WebGL shader in `/landing/shaders/` with comments and fallback colors.
