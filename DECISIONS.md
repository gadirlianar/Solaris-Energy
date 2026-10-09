# Architectural Decisions & Comprehensive Defect Audit Log

This document serves as the master audit log for the **Fidelity Repair & UI/UX Elevation** pass on Solaris Energy. All 9 canonical sections have been audited against their respective reference screenshots (`/reference/01..09`).

---

## Part 1: Comprehensive Defect Audit Table (78 Rows)

| # | Section | Element | Reference Observation | Current Build Defect | Priority | Actionable Fix |
|---|---|---|---|---|:---:|---|
| 1 | Hero | Reveal / Initial Visibility | Content visible immediately on load | Content risked opacity 0 if JS reveal lagged | **P0** | Add CSS keyframe fade-in fallback so all content is 100% visible immediately |
| 2 | Hero | Badge Pill | Centered at x521–766 (245×28px), `#111` pill | Slightly misaligned horizontal offset | P2 | Set exact `w-[245px] h-[28px]`, centered, `px-1 py-0.5` |
| 3 | Hero | "Trusted" Inner Pill | `#E4F86E`, black bold text, radius full | Slightly oversize padding | P2 | Match exact `px-2.5 py-0.5 text-[12px] font-bold` |
| 4 | Hero | Badge Text | "by 500+ Homeowners", white, 13px | Font size was 13.5px | P2 | Set exact `text-[13px] text-white/90` |
| 5 | Hero | H1 Typography | 2 lines: "Solar energy that moves" (~733px) / "the world forward" (~532px) | Widths and wrap drifted | P1 | Tune font size (70px), tracking (-0.025em), line-height (76px) |
| 6 | Hero | Subtitle Wrap | 2 lines: "Powering homes and businesses with clean, renewable solar solutions. Reduce your carbon footprint and energy costs today." | Max width was 620px | P1 | Tune `max-w-[580px]`, line 1 ~456px wide, color `#4A4A4A` |
| 7 | Hero | Primary CTA Button | 190×44px, black bg, trailing lime square 32px with black arrow | Width was 184px | P1 | Set exact padding `pl-5 pr-1.5`, button width ≈ 190px |
| 8 | Hero | Villa Architecture Photo | Anchored at bottom, width 1080px (84%), ground fades into pure white | Villa had extra padding at bottom | P1 | Anchor bottom directly to section baseline (`mb-0 pb-0`) |
| 9 | Hero | Background Sky Gradient | Top `#80B7E3` → `#BBDCF0` → `#DFEFF7` → `#FFFFFF` | Gradient stops slightly compressed | P2 | Calibrate gradient stops to match sampled reference values |
| 10 | Hero | Film Grain Noise | Subtle SVG `feTurbulence` (6–8% opacity) | Opacity was 60% | P1 | Reduce grain opacity to 7% (`opacity-[0.07]`) |
| 11 | Navbar | Logo Glyph | Lime square (42px, radius 12px) with chunky angular "Z" double-parallelogram | Used simple stroke path | **P1** | Vectorize exact reference glyph with clean SVG polygon paths |
| 12 | Navbar | Logo Wordmark | "SOLARIS" in wide squared techno face (A has no crossbar), "ENERGY" below | Standard geometric sans used | **P1** | Create custom inline SVG wordmark with crossbar-less A |
| 13 | Navbar | Nav Links | Home, About, Solution, Projects, FAQ (16px, #333333) | Correct | P3 | Maintain active section indicator dot via IntersectionObserver |
| 14 | Navbar | Glass CTA Button | `bg-white/35 backdrop-blur-md rounded-xl`, black arrow box | Trailing box was slightly shifted | P2 | Match exact 32×32 black box with white arrow `→` |
| 15 | About | Top Alignment | Slider top aligns with eyebrow row (y≈96px) | Slider was shifted down relative to copy | P1 | Align slider top with eyebrow baseline |
| 16 | About | Eyebrow | `/ About` (14px, #555555) | Correct | P3 | Keep uniform eyebrow styling |
| 17 | About | H2 Heading | "Smart Solar Solutions / for Modern Homes" (44px/51px) | Correct | P2 | Maintain exact line breaks and tracking |
| 18 | About | Lead Paragraph Wrap | Wraps to exactly 2 lines ("…solar systems that help / homeowners reduce electricity bills and transition to clean energy.") | Wrapped to 3 lines with orphan | **P1** | Expand max-width to `max-w-[540px]` so it wraps to exactly 2 lines |
| 19 | About | CTA Button Color | Dark gray (≈#3A3A3A) with lime arrow square | Was pure black `#111111` | **P1** | Update button bg to `#3A3A3A` |
| 20 | About | Slider Geometry | 566×473px, radius 24px, x685–1251 | Shadow was slightly too heavy | P1 | Remove heavy drop shadow, set `rounded-[24px]` |
| 21 | About | Slide 1 Image Crop | Shows full roof, 3 workers and ladder | Image was zoomed in too close | **P1** | Re-crop / adjust `object-position` to show full rooftop and ladder |
| 22 | About | Slider Progress Bars | 5 thin translucent white segments, active filling solid white | Were 3px with heavy background | P1 | Make segments 2px height, `bg-white/30`, active `bg-white` |
| 23 | About | Slider Pause Button | Translucent frosted circle (not solid black) | Was solid black `bg-black/40` | **P1** | Change to `bg-white/20 backdrop-blur-md` with white icon |
| 24 | About | Slider Chevrons | Thin white chevrons, no dark background | Had `bg-black/30` circles | **P1** | Remove circle backgrounds, make pure white icons |
| 25 | About | Slider Ghost Text | Exactly one title and caption mounted at a time | Double captions rendered in DOM | **P0** | Use key-based single slide rendering with absolute overlay |
| 26 | About | Stat Card Container | Gray panel x35–1250 (1216px wide), 10px padding | Correct | P2 | Verify 10px inner padding and 11px card gaps |
| 27 | About | Stat Card Layout | Horizontal: [icon square 56px left] + [number & label stacked right], description below | Was vertically stacked | **P1** | Rebuild card to horizontal layout `flex-row items-center gap-4` |
| 28 | About | Stat 1 Counter | `10+` `Solar Industry Experience` | Captured mid-animation | **P0** | Use tabular-nums, finish at `10+`, instant on reduced-motion |
| 29 | About | Stat 2 Counter | `500+` `Solar Projects Installed` | Captured mid-animation | **P0** | Finish at `500+`, tabular-nums |
| 30 | About | Stat 3 Counter | `25 Years` `Panel Performance Warranty` | Captured mid-animation | **P0** | Finish at `25 Years`, tabular-nums |
| 31 | About | Stat Number Weight | Regular weight (≈36px), label light-gray (17px) | Number was bold 48px, label bold black | **P1** | Set number to `text-[36px] font-normal`, label to `text-[17px] text-[#555]` |
| 32 | About | Stat Descriptions | 3 lines of light gray copy (15px) | Correct | P2 | Set `leading-relaxed text-[#666]` |
| 33 | Solutions | Header Eyebrow | `/ Our Solar Solutions`, centered | Correct | P3 | Maintain |
| 34 | Solutions | Header H2 | "Smart Solar Solutions Designed for / Homes and Businesses" | Correct | P2 | Keep centered 44px/51px |
| 35 | Solutions | Header Subtitle | "Smart solar solutions designed to power homes and businesses efficiently." | Correct | P2 | Keep centered 17px/1.5 |
| 36 | Solutions | Panel Geometry | x41–1256 (1215px), 10px padding, radius 28px | Correct | P2 | Maintain exact bounds |
| 37 | Solutions | Card Grid | 3 columns ≈391px wide, height ≈435px, gap 11px | Correct | P2 | Keep 3x2 grid |
| 38 | Solutions | Lime Icon Square | 44px, radius 10px, `#E4F86E`, glyph fills 55–60% | Glyphs were too small (~20px) | **P1** | Increase icon size to 24-26px (fills ~58% of square), stroke 1.75px |
| 39 | Solutions | Card 1 Icon | Sun icon | Correct | P2 | Keep Sun with 1.75px stroke |
| 40 | Solutions | Card 1 Illustration | Detailed monoline architectural line art (windowed house, solar panels, turbine, tree, figure) | Crude primitive SVG | **P1** | Vectorize dense architectural illustration from reference |
| 41 | Solutions | Card 2 Icon | Banknote icon | Correct | P2 | Keep Banknote with 1.75px stroke |
| 42 | Solutions | Card 2 Illustration | Cubic modern house, roof panels, turbine, large `$` sign | Primitive shapes | **P1** | Vectorize dense cubic house + dollar illustration |
| 43 | Solutions | Card 3 Icon | PRESENTATION BOARD with bar-chart | Was generic Presentation icon | **P1** | Recreate presentation easel with bar-chart |
| 44 | Solutions | Card 3 Illustration | Gabled house, two people presenting chart on easel, trees | Primitive shapes | **P1** | Vectorize dense presentation chart illustration |
| 45 | Solutions | Card 4 Icon | Wrench icon | Correct | P2 | Keep Wrench with 1.75px stroke |
| 46 | Solutions | Card 4 Illustration | Modern house, two installers on roof, ladder, tree | Primitive shapes | **P1** | Vectorize dense rooftop technicians illustration |
| 47 | Solutions | Card 5 Icon | Leaf icon | Correct | P2 | Keep Leaf with 1.75px stroke |
| 48 | Solutions | Card 5 Illustration | Simple gabled roof outline, radiant sun, 3 ground panel arrays | Primitive shapes | **P1** | Vectorize dense sustainability illustration |
| 49 | Solutions | Card 6 Icon | Gauge / Speedometer icon | Correct | P2 | Keep Gauge with 1.75px stroke |
| 50 | Solutions | Card 6 Illustration | House, EV charger, electric car, two people | Primitive shapes | **P1** | Vectorize dense EV charging illustration |
| 51 | Solutions | Card Hover | Card translateY(-4px), subtle illustration shift | Currently basic hover | P2 | Fine-tune smooth CSS transition |
| 52 | How It Works | Left Column Sticky | Sticky at top ≈120px on desktop | Was sticky top-32 | P2 | Fine-tune sticky top to 120px |
| 53 | How It Works | Right Panel Geometry | x663–1249 (≈586px), 10px padding, gap 12px | Correct | P2 | Keep 586px width |
| 54 | How It Works | Number Badges | 54px, radius 14px, `#E4F86E`, techno/mono numerals | Was standard font | P1 | Apply techno/tabular font for `01`..`04` |
| 55 | How It Works | Diamond Bullets | 6px rotated square `#888888` | Was 8px | P2 | Refine diamond size to 6px (`w-1.5 h-1.5`) |
| 56 | Projects | Bento Grid Row 1 | 509px (left) + 693px (right), gap 12-13px | Correct | P2 | Keep 509 / 693 ratio |
| 57 | Projects | Bento Grid Row 2 | 693px (left) + 509px (right), gap 12-13px | Correct | P2 | Keep 693 / 509 ratio |
| 58 | Projects | Card Heights | ≈479px tall | Was 500px | P2 | Adjust card height to 479px |
| 59 | Projects | Image Composition | Golden hour house, 2 engineers, workers on blue roof, inspector | Generated photos | P1 | Tune object-position and color grading to match reference |
| 60 | Benefits | Panel Geometry | x39–1254 (1215px), ≈543px tall, gap 11px | Correct | P2 | Keep exact panel dimensions |
| 61 | Benefits | Accordion Row Heights | Open ≈107px, closed ≈73px | Was variable height | P1 | Calibrate exact row padding and open state height |
| 62 | Benefits | Accordion Icons | 32px inset light-gray square with icon | Correct | P2 | Keep 32px square `#F4F4F4` |
| 63 | Benefits | Accordion Arrows | Closed `→`, Open `↗` | Correct | P2 | Maintain smooth arrow rotation |
| 64 | Benefits | Right Image | Woman on rooftop with tablet (x652–1244) | Extracted from reference | P1 | Verify crisp resolution and object-fit |
| 65 | Testimonials | 3D Perspective | CSS `perspective: 1200px`, 5 visible cards | Offset angles were approximate | **P1** | Calibrate exact rotateY angles and scale ratios |
| 66 | Testimonials | Center Card | Flat, slightly smaller (~325px tall) | Was scale 0.96 | P1 | Set exact 325px height on center card |
| 67 | Testimonials | Side Cards | Rotated inward toward center, taller (355px) | Correct | P1 | Calibrate rotateY(±20deg) |
| 68 | Testimonials | Edge Masking | White gradient masks at left/right edges | Was 24-36px wide | P1 | Set gradient mask to 140px width for smooth fade |
| 69 | Testimonials | Touch Targets | Pagination buttons have ≥36px touch target | Fixed | P2 | Keep accessible target sizes |
| 70 | FAQ | Two Columns | Left column 5/12, Right panel x551–1244 | Correct | P2 | Maintain 5/12 + 7/12 layout |
| 71 | FAQ | Template Leftover | "Solaris Energy" (authorized deviation from Salesflow) | Fixed | P0 | Verified in copy |
| 72 | FAQ | Accordion Rows | ≈82px tall, gap 11px, plus rotating to `×` | Correct | P2 | Keep 82px row height |
| 73 | Footer | Outer Panel | Radius 32px, 10px padding | Correct | P2 | Keep rounded-[32px] |
| 74 | Footer | Solar Field Image | Wide field with ground fade to pure white | Correct | P1 | Ensure smooth white fade gradient |
| 75 | Footer | Logo in Footer | Unified logo.svg | Needs unified logo | **P1** | Use single shared logo component / SVG |
| 76 | Footer | Copyright Year | Dynamic current year (`© 2026`) | Fixed with useSyncExternalStore | P0 | Verified static and hydration-safe |
| 77 | Global | Body Font Weight | Light/regular weight, ≈#6B6B6B | Was slightly heavy #444 | **P2** | Lighten body text color to `#6B6B6B`, font-normal |
| 78 | Global | Headings | Regular/medium weight, tight tracking -0.025em | Correct | P2 | Ensure consistent Host Grotesk medium weight |

---

## Part 2: Priority Implementation Plan

- **Phase A (P0 Fixes)**:
  1. Hero initial visibility: remove reliance on in-view for above-the-fold content; make hero elements visible on mount with CSS animation.
  2. About slider: eliminate ghost/duplicate caption text by rendering exactly one slide at a time.
  3. Stat counters: fix counter animation to stabilize firmly at `10+`, `500+`, `25 Years` with `tabular-nums` and instant display under reduced motion.
- **Phase B (P1 Fixes)**:
  4. Logo: recreate exact reference bolt glyph + wide squared techno "SOLARIS" (crossbar-less A) + "ENERGY" into a unified SVG.
  5. Solutions illustrations: extract and vectorize dense architectural line art for all 6 cards.
  6. Solutions icons: enlarge glyphs to fill 55–60% of the lime squares with 1.75px stroke; fix presentation board icon.
  7. About stat card layout: re-structure each card to horizontal layout `[56px icon] + [number & label stacked right]`, description below.
  8. About copy & button: wrap lead paragraph to exactly 2 lines (`max-w-[540px]`), change button bg to `#3A3A3A`.
  9. About slider styling: frosted circle pause button, clean white chevrons, 2px progress bars.
  10. Testimonials 3D carousel: calibrate exact perspective parameters.
- **Phase C (P2/P3 Polish & Verification)**:
  11. Color adjustments (body copy `#6B6B6B`, button hover states).
  12. Spacing and bounding box alignments (±2px).
  13. Re-run `scripts/compare.mjs` and `scripts/measure.mjs` across 3 QA iterations.
