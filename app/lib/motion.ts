/**
 * Shared animation constants for consistent motion across all pages.
 * Uses `as const` to ensure TypeScript infers tuple types for Framer Motion's Easing.
 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
