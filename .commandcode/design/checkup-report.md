# Checkup Report — web-porto-v2

Mode: `checkup` · Date: 2026-11-07 · Surface: home hero (`src/lib/components/Hero.svelte`)

## Score

**45 / 60**

## TL;DR

The hero is readable, functional, and responsive enough, but it is assembled from defaults: a glass card, a centered stack, and a font that ignores the site's own type system. No critical blocker. Primary prescription: recompose without the glass panel, restore Instrument Serif, and raise the CTA hit area.

## Vitals

| # | Vital | Status | Score | Evidence |
|---|---|---|---|---|
| 1 | Intentionality | Watch | 5/10 | `.hero-glass` + centered stack + Helvetica read as an assembled template, not a decision |
| 2 | Readability | Healthy | 10/10 | `--text-muted #334155` on pale blue shader passes; dark mode uses `#cbd5e1` |
| 3 | Usability | Healthy | 10/10 | Both CTAs are real `<a href>` to `/about` and `/projects` |
| 4 | Responsiveness | Watch | 5/10 | Glass card pads `3rem 2.5rem` on a 320px screen; CTA height ≈ 40px |
| 5 | Speed | Healthy | 10/10 | No images, no webfont fetch in the hero; shader is capped at ~2MP |
| 6 | Accessibility | Watch | 5/10 | Lede, badge, and CTAs start at `opacity: 0` until JS mounts; entrance motion ignores `prefers-reduced-motion`; CTA targets under 44px |

## Prescriptions

| # | Severity | Issue | Why it matters | Fix |
|---|---|---|---|---|
| 1 | MEDIUM | Hero copy hidden without JS (`Hero.svelte:106-119,127-140,194-204`) | A failed or delayed hydration leaves the lede and CTAs invisible | Animate with CSS `@keyframes` + `animation-fill-mode: both` so content ends visible without JS |
| 2 | MEDIUM | Entrance motion ignores reduced motion | Users who request reduced motion still get blur/translate | Wrap motion in `@media (prefers-reduced-motion: no-preference)` |
| 3 | MEDIUM | CTA touch targets ≈ 40px tall (`Hero.svelte:209,228`) | Below the 44px minimum for touch | `min-height: 48px` on the primary, 44px on the text link |
| 4 | MEDIUM | Glass panel forces `3rem 2.5rem` padding at 320px (`Hero.svelte:61`) | Wastes 80px of a 320px viewport | Remove the panel; page padding `1.25rem` under 480px |
| 5 | LOW | Hero title font drifts from the site heading voice | Breaks system consistency | Instrument Serif lockup |

## Verification

- Read `Hero.svelte`, `app.css`, `+page.svelte`, `Navbar.svelte`, `ShaderBackground.svelte`.
- Checked token contrast values in light and dark mode.
- Computed CTA box height from padding + line height (≈ 40px).
- Not verified in a browser at this pass.

## Verdict

**Needs changes**
