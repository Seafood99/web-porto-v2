# Review Report — web-porto-v2

Mode: `review` · Date: 2026-11-07 · Surface: home hero (`src/lib/components/Hero.svelte`)

## Score

**28 / 50**

## TL;DR

First impression: a soft blue glass card with a bold name and two pills. Competent, but it could belong to any developer portfolio. The shader is the only thing that says "this site". The name is the strongest asset; the card and the centered stack bury it.

## First Impression

Blue, soft, centered, frosted. I remember the shader and the name; everything between them is furniture. No point of view survives the blink test.

## Lenses

| # | Lens | Score | Assessment |
|---|---|---|---|
| 1 | First impression | 5/10 | Glass card + centered stack is the median generated hero |
| 2 | Hierarchy | 6/10 | Name lands first, but badge and two equal CTAs compete for second |
| 3 | Color voice | 6/10 | Blue is the domain default; the shader earns it, the UI does not add to it |
| 4 | Type voice | 5/10 | Instrument Serif exists site-wide and is absent from the hero |
| 5 | Interaction feel | 6/10 | Working links, but 40px targets, no focus-visible styling, no reduced-motion path |

## Primary Flow

Arrive → read the name → read the role → read the lede → choose between two equally-weighted buttons. The flow completes. It never creates a decision.

## Findings

| # | Severity | Discipline | Location | Before | After | Why |
|---|---|---|---|---|---|---|
| 1 | HIGH | Layout | `Hero.svelte:41-68` | Centered glass card holding all hero content | Left-aligned editorial grid: pitch + actions on the left, a facts ledger on the right, hairline rules, no card | The card answers "how do I make text readable" instead of "what should the visitor do next" |
| 2 | HIGH | Type | `Hero.svelte:79-88` | Helvetica Neue 800, `-1.5px`, single line | Instrument Serif lockup, surname italic, two lines | The hero should be the loudest statement of the site's own type system |
| 3 | MEDIUM | Interaction | `Hero.svelte:209,228` | Two pill buttons at ≈ 40px height | Primary 48px, text link 44px, both with `:focus-visible` rings | Touch and keyboard users need a target they can hit and see |
| 4 | MEDIUM | Motion | `Hero.svelte:106-119,127-140,194-204` | JS-gated blur/translate entrance, no reduced-motion branch | CSS entrance that ends visible without JS and is disabled under reduced motion | Content should not depend on hydration to become visible |
| 5 | LOW | Writing | `Hero.svelte:34-35` | `My Journey` / `Selected Work` | `View selected work` / `My journey` | Name the destination; keep one dominant action |

## Considered but Rejected

| Location | Candidate | Rejected because |
|---|---|---|
| `Hero.svelte:18` | Replace the lede copy | The sentence is specific and honest; only the stack chips are noise |
| `Hero.svelte:11` | Add PRD stat counters | Out of the scoped request; would add a stat monument smell |
| `+page.svelte:7-11` | Rework the page shell | Footer and scroll indicator already work; no evidence they hurt the hero |

## Verification

- Read the hero markup/CSS and the shared tokens it consumes.
- Compared the hero's type choices against `knowledge/design-system.md` and every other page.
- Did not run a browser session this pass; visual confirmation follows the fix.

## Verdict

**Needs changes**
