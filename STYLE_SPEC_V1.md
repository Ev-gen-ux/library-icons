# Style Spec v1 - Filled Soft Icons

This document defines the target icon style for the library.

## 1. Goal

Build a consistent `filled-soft` icon system for product UI:

- soft rounded silhouettes
- higher fill density than outline icons
- strong readability in bottom navigation
- one-color rendering via `currentColor`

Sizes remain independent and mandatory: `24`, `20`, `16`.

## 2. Core Style Principles

- Use solid or semi-solid shapes as the primary visual language.
- Avoid thin-only outline metaphors as a final form.
- Prefer rounded corners and rounded line caps.
- Keep icon personality friendly and neutral (no aggressive sharp angles).
- Maintain visual balance next to Inter labels.

## 3. Color and States

- Icons are monochrome and always inherit color from `currentColor`.
- Active/inactive states are controlled by color token only.
- No gradients, no shadows, no effects.

## 4. Geometry Rules

- Each icon must have enough fill area to read as a compact spot at `16px`.
- Internal negative space should be simple and intentional.
- Remove micro details that collapse at small sizes.
- Keep stroke/fill balance optically equal across categories.

## 5. Size-Specific Rules (Independent Drawings)

All sizes are separate drawings, not automatic scaling.

### 24px

- full semantic detail
- strong silhouette
- balanced internal cutouts

### 20px

- simplify secondary details
- preserve main metaphor and mass
- prevent narrow gaps that visually close

### 16px

- keep only core shape information
- maximize clarity over detail
- avoid tiny holes/splits that blur on export

## 6. Bottom Navigation Profile

For bottom-nav icons (home, search, favorites, cart, profile):

- slightly denser silhouette than generic system icons
- centered optical balance inside frame
- matching perceived weight across the whole nav row
- clear distinction between active and inactive via color only

## 7. Technical Constraints

- Output format: SVG
- Naming: `icon-{name}-{size}.svg`
- ViewBox: square and size-aligned (`24`, `20`, `16`)
- One-color pipeline only (`currentColor`)
- No variant-based size handling in Figma; each size is a separate component

## 8. QA Checklist (Pass Required)

- Reads clearly at `24/20/16`
- Looks stylistically consistent with existing filled-soft set
- Works with Inter labels without visual conflict
- Active/inactive state works by tokenized color only
- No accidental stroke jumps after export

## 9. Migration Policy

- Every new icon must be delivered in all three sizes: `24/20/16`
- Existing icons are migrated in batches:
  1) bottom-nav
  2) core actions/status
  3) remaining categories

