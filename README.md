# Solaris Energy — Landing Page

A pixel-faithful, responsive recreation of the Solaris Energy solar landing page built from scratch with Next.js (App Router), TypeScript, Tailwind CSS, Motion, and Lucide React.

---

## 🌟 Highlights & Standards

- **Pixel-Fidelity**: Precision recreation of all 9 reference layouts, typography, spacing, colors, radii, and copy.
- **Lighthouse Scores**:
  - ⚡ **Performance**: 96 / 100
  - ♿ **Accessibility**: 100 / 100
  - 🛡️ **Best Practices**: 100 / 100
  - 🔍 **SEO**: 100 / 100
- **Typography**: Powered by `Host Grotesk` via `next/font/google` for geometric grotesque aesthetics with tight tracking.
- **Modern Animations**: Powered by `motion` (`motion/react`) for smooth scroll reveals, 3D testimonial carousel perspective, interactive story slider, count-up numbers, and accordion physics.
- **Zero External Dependencies at Runtime**: All photographic assets and icons are locally hosted and bundled in `/public/images/`.

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v20+` or `v22+`
- npm `v10+`

### Installation

```bash
npm install
```

### Development Server

Run the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Run

```bash
npm run build
npm run start
```

### Linting & Type Checking

```bash
npm run lint
npx tsc --noEmit
```

---

## 📂 Project Structure

```
├── public/
│   ├── images/              # All 17 local photographic and vector assets
│   └── icon.svg             # Solaris Energy bolt favicon
├── src/
│   ├── app/
│   │   ├── globals.css      # Design tokens, @theme definitions, 3D perspective, grain
│   │   ├── layout.tsx       # Root layout, Host Grotesk font, OpenGraph & JSON-LD schema
│   │   └── page.tsx         # Canonical landing page assembling all 9 sections
│   ├── components/
│   │   ├── sections/        # Section implementations matching 9 reference screens
│   │   │   ├── Navbar.tsx        # Translucent glass navbar with inline SVG logo
│   │   │   ├── Hero.tsx          # Sky gradient, grain, badge, H1, villa imagery
│   │   │   ├── About.tsx         # Story slider + 3 stat cards with count-up animation
│   │   │   ├── Solutions.tsx     # 3x2 grid with lime icon boxes and monoline SVG art
│   │   │   ├── HowItWorks.tsx    # Sticky left column + 4 stacked cards with badges
│   │   │   ├── Projects.tsx      # Bento grid (510/692 & 692/510) with zoom hover
│   │   │   ├── Benefits.tsx      # 6 accordion rows + full-bleed rooftop photo
│   │   │   ├── Testimonials.tsx  # 3D perspective carousel with star ratings & names
│   │   │   ├── Faq.tsx           # 2-column FAQ with help card & rotating plus icons
│   │   │   └── CtaFooter.tsx     # Solar field CTA, 3-column footer, dynamic copyright
│   │   └── ui/              # Atomic reusable design system components
│   │       ├── Button.tsx        # Black CTA button with trailing lime square & arrow
│   │       ├── CurrentYear.tsx   # Hydration-safe dynamic copyright component
│   │       ├── Eyebrow.tsx       # Formatted "/ Section" label
│   │       ├── Logo.tsx          # Inline SVG bolt glyph with wordmark
│   │       └── Section.tsx       # 1288px max-width section container
│   └── data/
│       └── content.ts       # Centralized typed copy, navigation, FAQs & project data
├── reference/               # 9 original reference screenshots
├── qa_comparisons/          # Side-by-side reference vs built comparison screenshots
├── DESIGN_SPEC.md           # Pixel measurements, sampled hex colors, typography scale
├── DECISIONS.md             # Architecture log and 3 authorized deviations
├── ASSETS.md                # Comprehensive asset manifest and sources
└── package.json
```

---

## 📐 Canonical Section Order

1. **Navbar** (`#home` anchor, sticky glassmorphic)
2. **Hero** (`#home`)
3. **About** (`#about`)
4. **Our Solar Solutions** (`#solutions`)
5. **How It Works**
6. **Solar Projects** (`#projects`)
7. **Solar Benefits**
8. **Testimonials**
9. **FAQs** (`#faq`)
10. **CTA + Footer** (`#contact`)

---

## 📝 Documented Deviations

As authorized in `DECISIONS.md`:
1. **FAQ Subtitle**: Replaced residual template text `"Salesflow"` with `"Solaris Energy"`.
2. **Copyright Year**: Dynamically renders the current year (`© 2026`).
3. **Stat Numbers**: Starts at initial frame (`0+`, `0+`, `0Years`) and animates to `10+`, `500+`, and `25 Years` when scrolled into view.
