# Solaris Energy — Motion QA Deliverables & Audit Results

**Date:** 9 October 2026  
**Status:** All Gates Passed (0 Regressions)

## Directory Structure
- `videos/`: High-resolution scroll-through recordings:
  - Desktop Viewport (1290px): `page@f29c80588f722d657e3ee3f7e3933aa6.webm`
  - Mobile Viewport (390px): `page@e6215ef875470449a415627a2e189042.webm`
- `traces/`: Chrome DevTools Performance Trace archive:
  - `motion_scroll_trace.zip`
- `screenshots/`:
  - `js_disabled_full.png` (Full page with JavaScript completely disabled)
  - `reduced_motion_full.png` (Full page under `prefers-reduced-motion: reduce`)
- `motion_report.json`: Machine-readable results output from `scripts/motion-qa.mjs`.

## Performance Summary Table

| Metric | Measured Value | Budget Target | Status |
|---|---|---|:---:|
| **Cumulative Layout Shift (CLS)** | **0.0000** | < 0.02 | Passed |
| **Scroll Frame Rate** | **60 fps** | ≥ 55 fps | Passed |
| **Interaction to Next Paint (INP)** | **< 120 ms** | < 200 ms | Passed |
| **Added JS (gzip)** | **~17.8 KB** | ≤ 90 KB | Passed |
| **JS Disabled Accessibility** | **100% visible** | 100% visible | Passed |
| **Reduced Motion Rest State** | **0 regressions** | 0 regressions | Passed |
