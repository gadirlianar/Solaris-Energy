# Solaris Energy — Design Specification & Token Architecture

This specification document records the exact measurements, colors, typography scales, layout dimensions, and component geometries sampled directly from the 9 reference screenshots in `/reference` at the canonical 1290px desktop viewport width.

---

## 1. Color Tokens

| Token Name | Hex Code | RGB | Sampling Source & Usage |
|---|---|---|---|
| `color-bg-page` | `#FFFFFF` | `255, 255, 255` | Page background, card backgrounds |
| `color-ink-primary` | `#111111` | `17, 17, 17` | Primary text, H1, H2, dark buttons, dark pills |
| `color-ink-secondary` | `#555555` | `85, 85, 85` | Subtitles, descriptions, secondary body text |
| `color-ink-muted` | `#666666` | `102, 102, 102` | Card body copy, footer text |
| `color-ink-eyebrow` | `#555555` | `85, 85, 85` | Eyebrow `/ Label` text |
| `color-accent-lime` | `#E4F86E` | `228, 248, 110` | Lime icon squares, step badges, arrow button squares, "Trusted" pill |
| `color-panel-gray` | `#F2F2F2` | `242, 242, 242` | Outer container background for card grids and sections |
| `color-card-white` | `#FFFFFF` | `255, 255, 255` | Inner cards, accordion rows |
| `color-border-subtle` | `rgba(0, 0, 0, 0.05)` | `0, 0, 0, 0.05` | Subtle dividers / card borders |
| `color-icon-gray` | `#ECECEC` | `236, 236, 236` | About stat icon boxes, accordion plus icon circles, footer icon boxes |
| `color-sky-top` | `#87B8D9` | `135, 184, 217` | Hero sky gradient top |
| `color-sky-mid` | `#B7DCF0` | `183, 220, 240` | Hero sky gradient mid-upper |
| `color-sky-pale` | `#D2EDF6` | `210, 237, 246` | Hero sky gradient lower |
| `color-sky-bottom` | `#FFFFFF` | `255, 255, 255` | Hero sky gradient bottom fade |

---

## 2. Typography Scales

Primary Heading Font: **Host Grotesk** (wide-ish grotesque, geometric terminals, medium/regular weight)
Body Font: **Host Grotesk**
Mono / Digit Font: **Host Grotesk** (tabular-nums)

| Role | Font Size | Line Height | Weight | Letter Spacing | Case / Format |
|---|---|---|---|---|---|
| **H1 (Hero)** | 70px (`4.375rem`) | 1.08 (`76px`) | 500 (Medium) | `-0.03em` | Sentence case, centered |
| **H2 (Section Titles)** | 44px (`2.75rem`) | 1.15 (`51px`) | 500 (Medium) | `-0.025em` | Sentence case |
| **H3 / Card Title** | 24px–26px | 1.2 (`30px`) | 500 (Medium) | `-0.02em` | Sentence case |
| **Subtitle / Lead** | 17px (`1.0625rem`) | 1.5 (`26px`) | 400 (Regular) | `-0.01em` | Sentence case |
| **Body (Cards)** | 15px–16px | 1.5 (`24px`) | 400 (Regular) | `0em` | Sentence case |
| **Eyebrow** | 14px (`0.875rem`) | 1.2 (`17px`) | 500 (Medium) | `0.02em` | `/ Section Title` |
| **Button Text** | 15px (`0.9375rem`) | 1.0 (`15px`) | 500 (Medium) | `-0.01em` | Sentence case |
| **Nav Links** | 16px (`1rem`) | 1.0 (`16px`) | 400 (Regular) | `0em` | Normal |
| **Stat Numbers** | 36px (`2.25rem`) | 1.1 (`40px`) | 400 (Normal) | `-0.03em` | E.g. `10+`, `500+`, `25 Years` (tabular-nums) |
| **Step Numbers** | 22px (`1.375rem`) | 1.0 (`22px`) | 600 (Semibold) | `0em` | E.g. `01`, `02`, `03`, `04` |

---

## 3. Radii & Geometry Tokens

| Token | Value | Applied To |
|---|---|---|
| `radius-panel` | `28px` | Outer gray containers (`#F2F2F2`) |
| `radius-panel-lg` | `32px` | Footer outer container |
| `radius-card` | `20px` | Inner white cards inside panels |
| `radius-card-sm` | `16px` | Accordion rows |
| `radius-project-card` | `18px` | Bento project cards (`509px` & `693px`) |
| `radius-button` | `12px` | Primary CTA button, dark-gray button, navbar glass pill |
| `radius-badge-lime` | `14px` | How it works step badges (`54px × 54px`) |
| `radius-icon-lime` | `10px` | Solutions lime icon squares (`44px × 44px`) |
| `radius-arrow-square` | `8px` | Trailing lime button square (`32px × 32px`) |
| `radius-pill` | `9999px` | "Trusted by 500+ Homeowners" badge, glass nav pill |

---

## 4. Spacing & Container System

- **Reference Viewport**: 1286px – 1290px
- **Page Horizontal Margins**: 36px left, 36px right
- **Maximum Content Width**: `1216px` (`calc(1288px - 72px)`)
- **Outer Panel Inner Padding**: `10px` all sides (top, right, bottom, left)
- **Inner Card Grid Gaps**: `10px` – `12px`
- **Section Vertical Rhythm**: `100px` – `120px` between section headers/panels

---

## 5. Section Geometries

### Navbar
- Height: 68px, fixed/sticky with backdrop-blur
- Logo: 38px lime rounded square with black Z/bolt glyph + "SOLARIS ENERGY" text (2 lines)
- Nav links: Home, About, Solution, Projects, FAQ
- Right CTA: Glass pill (`rgba(255, 255, 255, 0.35)` + blur) + black rounded-square arrow

### Hero (02-hero.png)
- Canvas: Full width, height ≈ 1056px at 1290px width
- Sky gradient: top `#80B7E3` → `#E8F0F7` → `#FFFFFF` at bottom
- Film grain overlay: SVG `feTurbulence` (8% opacity)
- Hero Badge: Black pill (#111), inner lime pill "Trusted" (#E4F86E, black text), white text "by 500+ Homeowners"
- H1: "Solar energy that moves the world forward" (2 lines, 70px)
- Villa Image: Width ≈ 1080px (84% of 1286px), height ≈ 560px, softly blends to white ground

### About (09-about.png)
- Split top: Left copy (eyebrow, H2, paragraph, primary button)
- Right story slider: 565px × 473px, radius 24px, 5 story progress segments, pause button, chevrons, bottom dark gradient with date, title, caption
- Bottom stats panel: Gray container (1216px × 260px) with 3 equal white cards (391px each, gap 11px). Icon box (44px, radius 12px, gray), count-up numbers (0+ → 10+, 0+ → 500+, 0Years → 25 Years), labels, descriptions

### Solutions (06-solutions.png)
- Header: Centered eyebrow, H2, subtitle
- Gray panel: 1216px wide, 10px padding
- Grid: 3 columns × 2 rows, cards 391px × 434px, gap 11px
- Card layout: 44px lime icon square top-left, title 26px, description 16px, black monoline illustration (1.5px stroke, no fill) bottom

### How It Works (01-how-it-works.png)
- Two columns: Left column sticky (top: 120px), width ≈ 540px. Right gray panel: 587px wide, 10px padding, 4 white cards stacked (gap 10px)
- Each card: 54px lime number badge ("01", "02", "03", "04"), title 26px, 3 diamond-bulleted items

### Projects (07-projects.png)
- Header: Centered eyebrow, H2, subtitle
- Bento Grid: 2 rows, 12px gap
  - Row 1: Left card 510px, Right card 692px, height 500px
  - Row 2: Left card 692px, Right card 510px, height 500px
- Cards: Full-bleed imagery with dark gradient overlay, white title (22px) and 2-3 line description

### Benefits (08-benefits.png)
- Header: Centered eyebrow, H2, subtitle
- Gray panel: 1216px wide, 10px padding, two 592px halves (gap 10px)
  - Left: 6 white accordion rows (radius 16px), 1 open at a time, first open by default with "↗", closed with "→"
  - Right: Full image of woman on rooftop with tablet (radius 16px)

### Testimonials (03-testimonials.png)
- Header: Centered eyebrow, H2, subtitle
- 3D carousel: Perspective 1200px, 5 cards visible (260px wide, 355px tall, radius 20px). Center card flat (325px), neighbors rotated inward (rotateY ±25deg), outer cards rotated ±45deg with fade mask

### FAQ (05-faq.png)
- Two columns (5/12 + 7/12): Left column has eyebrow, H2, subtitle, and "Need More Help?" card with button. Right column has gray panel with 6 white accordion items with round plus/close toggle

### CTA + Footer (04-cta-footer.png)
- Outer gray panel (radius 32px, 10px padding), two stacked white cards
- Card 1: H2, subtitle, button, wide solar field photo fading into white, followed by 3-column footer (Brand, Quick Links, Contact Us)
- Card 2: Centered copyright with dynamic year
