# Smell Report — web-porto-v2

Mode: `smell` · Date: 2026-11-07 · Surface: home hero (`src/lib/components/Hero.svelte`)

## Score

**5 / 10 — PRESENT**

## TL;DR

Hero is a centered frosted card: glass panel, centered stack, Helvetica title, pill badge, and chip-styled stack names. The shader is signature, but the hero above it is a template reflex. Primary recommendation: recompose as a left-aligned editorial index with no glass backing.

## Odor Heuristics

| # | Odor | Detected | Evidence |
|---|---|---|---|
| 1 | Tech gradient | no | Palette is a single blue family, no violet/cyan gradient |
| 2 | Generic tech hue | yes (faint) | Blue is the category-default hue for developer portfolios; shader earns it, components do not |
| 3 | Feature tile grid | no | No tile grid on this surface |
| 4 | Accent rail | no | No colored rails |
| 5 | Unearned blur | yes | `.hero-glass` frosted panel over the shader |
| 6 | Stat monument | no | No stat blocks |
| 7 | Icon topper | no | No icon above headings |
| 8 | Bounce everywhere | no | No bounce/elastic easing |
| 9 | Default type | yes | Hero title is Helvetica Neue bold while the rest of the site speaks Instrument Serif |
| 10 | Center stack | yes | Eyebrow/pill, title, lede, and CTAs all centered in a 780px column |

## Findings

| # | Severity | Discipline | Location | Before | After | Why |
|---|---|---|---|---|---|---|
| 1 | HIGH | Layout | `src/lib/components/Hero.svelte:56-68` | Text wrapped in `.hero-glass` (blur 16px, border, radius 20px, shadow) | Remove the panel; left-aligned editorial grid: primary column + facts ledger separated by hairlines | The card exists only to make text readable over the shader; contrast already passes, so it is decoration that flattens the hero into a generic glass box |
| 2 | HIGH | Layout | `src/lib/components/Hero.svelte:41-53` | `display:flex; align-items:center; justify-content:center; text-align:center` | Two-column grid, left-aligned, ledger bottom-aligned on desktop | A decide surface needs one dominant action and a readable pitch, not a centered safe middle |
| 3 | MEDIUM | Type | `src/lib/components/Hero.svelte:79-88` | `font-family: Helvetica Neue` 800, single line | Instrument Serif lockup, surname italic, two lines, `clamp(3.5rem, 9vw, 7.5rem)` | Site heading voice is Instrument Serif; the hero is the one place it is ignored |
| 4 | MEDIUM | Layout | `src/lib/components/Hero.svelte:94-119` | `.identity-pill` badge next to the name | Role moves into an uppercase eyebrow line with the location | The badge duplicates the lede and adds a third visual stop before the name |
| 5 | LOW | Layout | `src/lib/components/Hero.svelte:142-155` | Inline tech chips with background, border, shadow inside the paragraph | Plain inline text with small brand icons, no chip fill | Six nested pills inside one sentence add noise without adding hierarchy |
| 6 | LOW | Writing | `src/lib/components/Hero.svelte:34-35` | `My Journey` / `Selected Work` as two equal pill buttons | One primary action `View selected work`, one quiet text link `My journey` | Two equal CTAs mean no decision. Name the destination in sentence case |

## Considered but Rejected

| Location | Candidate | Rejected because |
|---|---|---|
| `src/lib/components/Hero.svelte:86` | Remove the light-mode text-shadow | The shadow disappears with the glass panel; no separate finding needed |
| `src/lib/components/Hero.svelte:249-255` | Rewrite the 768px media query as container query | No container context exists on this page; adds complexity for no gain |
| `src/app.css:49` | Redefine `--glass-bg` globally | Other pages still use it; changing the token would be out of scope |

## Verification

- Inspected rendered structure and CSS in `Hero.svelte`, `app.css`, `+page.svelte`, `Navbar.svelte`, `ShaderBackground.svelte`.
- Confirmed shader intensity is `0.06` over pale blue (light) and dark navy (dark); body text contrast holds without a backing panel.
- Confirmed no hover/transition uses bounce or elastic easing.
- Not verified in a browser at this pass; browser verification happens after the fix.

## Verdict

**Needs changes**
