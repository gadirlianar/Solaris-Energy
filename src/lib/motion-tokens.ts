/**
 * Solaris Energy Motion Tokens
 * Strict tokens for 2D + CSS-3D choreography.
 * All animations, transitions and easings must derive from these tokens.
 */

export const MOTION_TOKENS = {
  // Easings
  ease: {
    // Primary: Custom cubic-bezier for natural, elegant deceleration
    primary: [0.22, 1, 0.36, 1] as const,
    primaryCss: "cubic-bezier(0.22, 1, 0.36, 1)",
    // Secondary: Snappy, punchy acceleration/deceleration
    secondary: [0.65, 0, 0.35, 1] as const,
    secondaryCss: "cubic-bezier(0.65, 0, 0.35, 1)",
    // Smooth linear (for continuous rotations / drifts)
    linear: [0, 0, 1, 1] as const,
    linearCss: "linear",
  },

  // Durations (ms)
  duration: {
    fast: 200,
    base: 400,
    slow: 700,
    epic: 1100,
  },

  // Stagger delays (ms)
  stagger: {
    tight: 60,
    standard: 80,
    loose: 90,
  },

  // Spatial Offsets (px)
  distance: {
    small: 16,
    medium: 24,
    large: 40,
  },

  // CSS 3D Perspectives (px)
  perspective: {
    tight: 1000,
    standard: 1200,
    wide: 1400,
  },

  // Restraint thresholds
  maxTiltDegrees: 5,
  maxMagneticPull: 8,
  heroHouseTiltMax: 3,
} as const;

export type MotionTokens = typeof MOTION_TOKENS;
