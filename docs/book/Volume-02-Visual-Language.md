# Volume II — Visual Language

## The Visual Identity of Certilab Platform

---

**Volume:** II of VII
**Status:** ✅ ACTIVE
**Last Updated:** 2026-07-05
**Estimated Pages:** 80–120

---

## Table of Contents

1. [Visual Philosophy](#1-visual-philosophy)
2. [Colour](#2-colour)
3. [Typography](#3-typography)
4. [Iconography](#4-iconography)
5. [Spacing and Rhythm](#5-spacing-and-rhythm)
6. [Layout and Composition](#6-layout-and-composition)
7. [Motion and Transition](#7-motion-and-transition)
8. [Visual Language in Context](#8-visual-language-in-context)
9. [Implementation Notes](#9-implementation-notes)

---

## 1. Visual Philosophy

### 1.1 The Visual Identity of Professional Tools

The visual language of Certilab does not aim to be beautiful. It aims to be **precise**.

A professional tool communicates through its appearance. The typography says "this is serious work." The spacing says "there is room to think." The colour says "this information is important." The motion says "something has changed."

Every visual decision must pass the same test as every product decision:

> *Does this help the professional work better?*

### 1.2 The Qualities of the Visual Language

**Precision.** Every measurement, every colour, every spacing value must be intentional. There is no "close enough." The visual language uses a defined grid, a defined colour palette, and a defined typographic scale.

**Restraint.** The visual language does more by doing less. Fewer colours, fewer typefaces, fewer decorative elements. The result is an interface that communicates clearly because nothing competes for attention.

**Consistency.** The same visual rule applies everywhere. The same spacing, the same colour for the same meaning, the same typographic hierarchy. Consistency builds familiarity, and familiarity builds speed.

**Professionalism.** The visual language reflects the seriousness of technical work. It is not playful. It is not whimsical. It is not corporate in the sense of logos and brand colours plastered everywhere. It is professional — precise, restrained, and confident.

### 1.3 Design Inspirations

The visual language draws inspiration from:

- **Architectural drawings:** Clean lines, measured annotations, hierarchical information
- **Editorial design:** Typographic rhythm, white space, grid systems
- **Professional instruments:** Tools that communicate through their form what they do
- **Modern productivity software:** Linear, Notion, Superhuman — tools that respect the user's time

> 🎯 **Principle:** The interface should look like it was designed by an architect for an architect.

---

## 2. Colour

### 2.1 Colour Philosophy

Colour in Certilab serves a functional purpose. It is not decorative. Every colour has a meaning, and that meaning must be consistent across the entire platform.

The palette is deliberately restrained. A limited palette reduces cognitive load, ensures consistency, and makes the moments when colour is used more impactful.

### 2.2 Primary Palette

The primary palette is anchored by a single hue — a deep, calm blue that conveys trust, precision, and professionalism.

| Token | Value | Usage | Accessibility |
|-------|-------|-------|---------------|
| `--color-primary-50` | `#EFF6FF` | Background, hover states | — |
| `--color-primary-100` | `#DBEAFE` | Light backgrounds | — |
| `--color-primary-200` | `#BFDBFE` | Selected states | — |
| `--color-primary-300` | `#93C5FD` | Active borders | — |
| `--color-primary-400` | `#60A5FA` | Hover icons | — |
| `--color-primary-500` | `#3B82F6` | Primary actions, links | ✅ WCAG AA on white |
| `--color-primary-600` | `#2563EB` | Primary hover | ✅ WCAG AA on white |
| `--color-primary-700` | `#1D4ED8` | Active state | ✅ WCAG AAA on white |
| `--color-primary-800` | `#1E3A8A` | Text on light | ✅ WCAG AAA |
| `--color-primary-900` | `#172554` | Dark backgrounds | — |

> 🎯 **Principle:** The primary colour is used sparingly. It is reserved for interactive elements and key information. Overuse dilutes its meaning.

### 2.3 Neutral Palette

The neutral palette forms the foundation of the interface. It provides the structure, the hierarchy, and the reading experience.

| Token | Value | Usage |
|-------|-------|-------|
| `--color-neutral-50` | `#F9FAFB` | Page backgrounds |
| `--color-neutral-100` | `#F3F4F6` | Card backgrounds, hover |
| `--color-neutral-200` | `#E5E7EB` | Borders, dividers |
| `--color-neutral-300` | `#D1D5DB` | Disabled states |
| `--color-neutral-400` | `#9CA3AF` | Placeholder text |
| `--color-neutral-500` | `#6B7280` | Secondary text |
| `--color-neutral-600` | `#4B5563` | Body text |
| `--color-neutral-700` | `#374151` | Headings |
| `--color-neutral-800` | `#1F2937` | High-emphasis text |
| `--color-neutral-900` | `#111827` | Darkest, seldom used |

> 🎯 **Principle:** Neutrals carry the interface. Colours provide meaning. The ratio should be approximately 90% neutrals to 10% colours.

### 2.4 Semantic Palette

Semantic colours communicate meaning at a glance. They must be used consistently and sparingly.

| Token | Value | Meaning | Usage |
|-------|-------|---------|-------|
| `--color-success` | `#059669` | Positive outcome | Status badges, confirmations |
| `--color-warning` | `#D97706` | Needs attention | Alerts, pending items |
| `--color-error` | `#DC2626` | Problem | Errors, rejections |
| `--color-info` | `#0284C7` | Information | Help text, guidance |

**Usage rules for semantic colours:**

- Semantic colours must never be used for decorative purposes.
- Semantic colours must never be used as the primary colour for interactive elements.
- Text on semantic backgrounds must pass WCAG AA contrast.

### 2.5 Accent Colours (V2+)

Currently classified as **Pending validation of design**. The following are proposed but not finalised:

| Token | Proposed Value | Proposed Usage |
|-------|---------------|----------------|
| `--color-accent-warm` | `#D97706` | Certilab brand accent elements |
| `--color-accent-cold` | `#0369A1` | Secondary brand elements |

> ⚠️ **Pending validation of design:** Accent colours should be defined as part of the Brand Book (→ VI:§2). They are not needed for V1 MVP.

### 2.6 Colour Application Rules

#### Rule 1: Colour Must Be Meaningful
Every use of colour must convey meaning. If colour does not add information, do not use it.

**✅ Correct:** A status badge that uses green for "completed" and red for "rejected."
**❌ Incorrect:** A decorative coloured bar at the top of a card that serves no informational purpose.

#### Rule 2: One Colour Per Meaning
Each meaning maps to exactly one colour throughout the platform.

**✅ Correct:** Red always means error, whether in a form validation, a status badge, or an alert.
**❌ Incorrect:** Red for errors in forms but orange for errors in status badges.

#### Rule 3: Colour Is Not the Only Differentiator
Colour must never be the sole means of conveying information. Add text, icons, or patterns to ensure accessibility for colour-blind users.

**✅ Correct:** A status indicator that uses both colour and an icon (✓ for success, ✗ for error).
**❌ Incorrect:** A chart that uses only colour hue to distinguish data series.

#### Rule 4: Limit Colour Per View
No single view should use more than 3 semantic colours simultaneously. Additional colours dilute meaning and increase cognitive load.

### 2.7 Contrast and Accessibility

All colour combinations must meet WCAG AA standards:

- **Normal text (≥18px):** 4.5:1 contrast ratio minimum
- **Large text (≥24px, or ≥19px bold):** 3:1 contrast ratio minimum
- **User interface components:** 3:1 contrast ratio minimum
- **Graphical objects:** 3:1 contrast ratio minimum

> 🎯 **Principle:** Accessibility is not a constraint on design. It is a design requirement that makes the platform better for all users.

---

## 3. Typography

### 3.1 Typography Philosophy

Typography is the primary communication tool in Certilab. The interface is fundamentally text-based. Users read to understand, to decide, and to act. The typographic system must make reading effortless.

The goals of the typographic system:

1. **Legibility:** Characters must be distinguishable at all sizes.
2. **Readability:** Text must be comfortable to read for extended periods.
3. **Hierarchy:** The relative importance of information must be visually obvious.
4. **Consistency:** The same type treatment must mean the same thing everywhere.

### 3.2 Typeface Selection

#### Primary Typeface: Inter

Inter is an open-source typeface designed for computer screens. It features high legibility at small sizes, clear distinction between similar characters (I/l/1), and excellent hinting for screen rendering.

**Usage:** All interface text, including buttons, labels, form inputs, tables, and navigation.

#### Secondary Typeface: Source Serif 4 (V2+)

Proposed for long-form reading content (blog, reports, Observatory publications). Currently classified as **Pending validation of design**.

> ⚠️ **Pending validation of design:** Secondary typeface for editorial content.

### 3.3 Typographic Scale

The typographic scale uses a 1.25 modular scale (major third) with base values optimised for screen reading.

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `--text-xs` | 12px | 16px | 400 | Secondary labels, metadata |
| `--text-sm` | 14px | 20px | 400 | Body text in dense contexts |
| `--text-base` | 16px | 24px | 400 | Default body text |
| `--text-lg` | 18px | 28px | 500 | Section headings, emphasis |
| `--text-xl` | 20px | 28px | 600 | Card titles |
| `--text-2xl` | 24px | 32px | 600 | Page titles |
| `--text-3xl` | 30px | 36px | 700 | Section headers |
| `--text-4xl` | 36px | 44px | 700 | Page headers |
| `--text-5xl` | 48px | 52px | 800 | Hero titles |

### 3.4 Weight System

| Weight | Name | Usage |
|--------|------|-------|
| 400 | Regular | Body text, paragraphs |
| 500 | Medium | Emphasis, small headings |
| 600 | Semibold | Subheadings, strong emphasis |
| 700 | Bold | Headings, primary labels |
| 800 | Extrabold | Hero titles, emphasis (rare) |

### 3.5 Typography Application Rules

#### Rule 1: One Typeface, One Scale

Use Inter exclusively for all interface text. Do not mix typefaces within the interface.

**✅ Correct:** All interface text uses Inter with the defined scale.
**❌ Incorrect:** Using one typeface for headings and another for body text in the interface.

#### Rule 2: Respect the Scale

Use the defined typographic scale. Do not use sizes between defined steps without justification.

**✅ Correct:** A page title uses `--text-4xl` consistently across all pages.
**❌ Incorrect:** Using `22px` for a heading because it "feels right" on a specific page.

#### Rule 3: Line Length Must Be Controlled

The optimal line length for reading is 60–80 characters. Longer lines reduce readability.

**✅ Correct:** Article content constrained to 720px max-width (~70 characters).
**❌ Incorrect:** Article content spanning the full width of a 1400px viewport.

#### Rule 4: Hierarchy Must Be Visual

The typographic hierarchy must be visually obvious without relying on colour alone.

**✅ Correct:** A page where the title is larger, bolder, and has more space above it than the subtitle, which is larger than the body text.
**❌ Incorrect:** A page where title and subtitle are the same size and weight, differentiated only by colour.

### 3.6 International Characters

The typographic system must support Spanish language characters fully:

- Accented vowels: á, é, í, ó, ú, ü
- Special characters: ñ, ç (for Catalan)
- Punctuation: ¿, ¡
- Catalan-specific: l·l (punt volat)

All type treatments must be tested with Spanish language content before approval.

---

## 4. Iconography

### 4.1 Icon Philosophy

Icons in Certilab are functional, not decorative. They support comprehension by providing visual cues that reduce reading time. An icon should never be the only means of conveying information — it must always be accompanied by text.

### 4.2 Icon Style

**Style:** Line-based, outlined, 1.5px stroke weight.
**Size:** 16px (small), 20px (default), 24px (large).
**Corner radius:** Consistent 2px rounded corners.
**Filled variants:** Only for active states and selected items.

The icon style is consistent with the visual language: precise, restrained, and professional.

### 4.3 Icon Library

Use a single icon library throughout the platform. As of V1, the recommended library is **Lucide Icons** for its consistency, completeness, and open-source license.

> ⚠️ **Pending validation of design:** The specific icon library should be validated for brand alignment.

### 4.4 Icon Application Rules

#### Rule 1: Icons Must Support, Not Replace Text

Every icon must be accompanied by text. Icons without text are ambiguous and inaccessible.

**✅ Correct:** A button with both an icon and text: [✕] Cerrar
**❌ Incorrect:** A button with only an [✕] icon.

#### Rule 2: Icons Must Be Consistent

The same action must use the same icon everywhere.

**✅ Correct:** The delete action always shows a trash icon across all views.
**❌ Incorrect:** Delete shows a trash icon in one view and an X in another.

#### Rule 3: Icons Must Be Semantic

The icon must clearly communicate its meaning. Avoid abstract or metaphorical icons that require learning.

**✅ Correct:** A document icon for documents, a download icon for downloading.
**❌ Incorrect:** A puzzle piece icon for integrations, a star icon for favourites (when a heart or bookmark might be clearer).

#### Rule 4: Icons Must Be Accessible

- Icons that convey meaning must have appropriate aria-labels.
- Icons that are purely decorative must be hidden from screen readers (`aria-hidden="true"`).
- Icon contrast must meet WCAG AA minimums.

---

## 5. Spacing and Rhythm

### 5.1 Spacing Philosophy

Spacing creates rhythm, establishes hierarchy, and communicates relationships between elements. Consistent spacing makes the interface predictable and reduces cognitive load.

### 5.2 Spacing Scale

The spacing scale follows an 8px base unit with a 4px sub-unit for fine adjustments.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-0.5` | 4px | Tight adjustments, icon padding |
| `--space-1` | 8px | Minimal spacing between related elements |
| `--space-2` | 16px | Standard spacing between elements |
| `--space-3` | 24px | Section spacing, card padding |
| `--space-4` | 32px | Major section spacing |
| `--space-5` | 40px | Page section separation |
| `--space-6` | 48px | Large content gaps |
| `--space-8` | 64px | Page margins, major separations |
| `--space-10` | 80px | Hero spacing, landing page rhythm |
| `--space-12` | 96px | Maximum spacing, seldom used |

### 5.3 Spacing Application Rules

#### Rule 1: Use the Scale

Do not use spacing values outside the defined scale. The scale provides sufficient granularity for all layout needs.

**✅ Correct:** Using `--space-2` (16px) for consistent gap between form fields.
**❌ Incorrect:** Using `14px` or `18px` because the arrangement "feels right."

#### Rule 2: Spacing Communicates Relationships

Related items should be closer together. Unrelated items should be further apart.

**✅ Correct:** A form label is 8px above its input, but 24px below the previous field.
**❌ Incorrect:** All elements equally spaced regardless of their relationship.

#### Rule 3: Vertical Rhythm Must Be Consistent

The vertical rhythm of content — the distance between lines, paragraphs, and sections — must follow the spacing scale.

**✅ Correct:** Body text has 24px line height, paragraphs are separated by 24px, sections by 48px.
**❌ Incorrect:** Inconsistent vertical spacing that varies between views.

---

## 6. Layout and Composition

### 6.1 Grid System

The layout uses a 12-column grid system with 24px gutters. The grid adapts to the viewport:

| Breakpoint | Width | Columns | Margins |
|------------|-------|---------|---------|
| `sm` | ≥640px | 4 | 24px |
| `md` | ≥768px | 8 | 32px |
| `lg` | ≥1024px | 12 | 40px |
| `xl` | ≥1280px | 12 | 48px |
| `2xl` | ≥1536px | 12 | 64px |

### 6.2 Content Width

Content width is constrained for readability:

| Context | Max Width | Rationale |
|---------|-----------|-----------|
| Article content | 720px | Optimal reading width |
| Form layouts | 640px | Single-column, focused input |
| Data tables | 100% | Maximise data density |
| Dashboard | 1280px | Balance density and whitespace |

### 6.3 Layout Patterns

#### Single-Column Layout
Used for: Forms, articles, focused views, wizards.
```
┌────────────────────────────────┐
│  Header                        │
│  ┌──────────────────────────┐  │
│  │  Content (640px max)     │  │
│  └──────────────────────────┘  │
│  Footer                        │
└────────────────────────────────┘
```

#### Two-Column Layout
Used for: Detail views, review screens, split workflows.
```
┌────────────────────────────────┐
│  Header                        │
│  ┌───────────┐ ┌───────────┐  │
│  │  Primary  │ │  Sidebar  │  │
│  │  (8 cols) │ │  (4 cols) │  │
│  └───────────┘ └───────────┘  │
│  Footer                        │
└────────────────────────────────┘
```

#### List/Table Layout
Used for: Dashboards, lists, search results.
```
┌────────────────────────────────┐
│  Header                        │
│  ┌──────────────────────────┐  │
│  │  Filter/Search Bar       │  │
│  ├──────────────────────────┤  │
│  │  Table / List            │  │
│  ├──────────────────────────┤  │
│  │  Pagination              │  │
│  └──────────────────────────┘  │
│  Footer                        │
└────────────────────────────────┘
```

### 6.4 Layout Rules

#### Rule 1: Align to the Grid

All elements must align to the grid columns. No element should float between columns.

#### Rule 2: Consistent Padding

Cards, containers, and sections must use consistent padding from the spacing scale.

#### Rule 3: Vertical Rhythm

The space between major sections must be larger than the space within sections.

#### Rule 4: Left Alignment for Reading

Left-align text, labels, and form fields in Spanish. Centred text is reserved for specific contexts (modal titles, empty states).

---

## 7. Motion and Transition

### 7.1 Motion Philosophy

Motion in Certilab is functional. It communicates state changes, spatial relationships, and the consequences of user actions. Motion must never be decorative, never delay the user, and never distract from work.

### 7.2 Duration

| Token | Duration | Usage |
|-------|----------|-------|
| `--duration-fast` | 100ms | Micro-interactions, hover states |
| `--duration-normal` | 200ms | Standard transitions |
| `--duration-slow` | 300ms | Page transitions, modals |
| `--duration-xslow` | 400ms | Emphasis transitions (rare) |

### 7.3 Easing

| Token | Curve | Usage |
|-------|-------|-------|
| `--ease-linear` | linear | Colour transitions |
| `--ease-in` | cubic-bezier(0.4, 0, 1, 1) | Elements leaving the screen |
| `--ease-out` | cubic-bezier(0, 0, 0.2, 1) | Elements appearing |
| `--ease-in-out` | cubic-bezier(0.4, 0, 0.2, 1) | Standard transitions |

### 7.4 Motion Application Rules

#### Rule 1: Motion Must Have Purpose

Every animation must communicate something: a state change, a spatial relationship, a consequence.

**✅ Correct:** A modal that slides up from the bottom communicates "this content is on top of the page."
**❌ Incorrect:** A logo that bounces on page load communicates nothing useful.

#### Rule 2: Motion Must Be Fast

All interface motion must complete within 200ms. Users should not wait for animations.

**✅ Correct:** A dropdown menu that appears in 150ms.
**❌ Incorrect:** A dropdown menu that takes 500ms to animate open.

#### Rule 3: Motion Must Be Subtle

Use the defined easing curves. Avoid bouncy, elastic, or exaggerated animations.

**✅ Correct:** A fade-in at 200ms with `ease-out`.
**❌ Incorrect:** A spring animation that overshoots and settles.

#### Rule 4: Reduced Motion Must Be Honoured

If the user has expressed a preference for reduced motion (`prefers-reduced-motion: reduce`), all motion must be disabled or replaced with instant transitions.

---

## 8. Visual Language in Context

### 8.1 Landing Page

The landing page uses the visual language to convey trust and professionalism:

- **Hero:** Maximum one headline, one supporting sentence, one CTA. The hero is text-dominant with minimal visual decoration.
- **Typography:** Large, confident headings (`--text-5xl`) with generous spacing.
- **Colour:** Primary colour reserved for CTAs and key highlights.
- **Whitespace:** Generous margins and section spacing convey confidence.

### 8.2 Application Shell

The authenticated application uses the visual language for efficiency:

- **Navigation:** Compact, text-and-icon navigation with clear active states.
- **Content area:** Full-width with constrained content sections.
- **Data density:** Professional users see more data per view. Consumer users see more whitespace.
- **Minimal chrome:** No decorative elements. The interface is the data.

### 8.3 Mobile View

The visual language adapts to mobile:

- **Typography:** Scale reduces by one step on small screens.
- **Spacing:** Margins reduce to 16px.
- **Navigation:** Bottom navigation bar for key sections.
- **Touch targets:** Minimum 44px touch targets.

### 8.4 Empty States

Empty states use the visual language to guide, not decorate:

- **Icon:** A single, relevant icon from the icon library.
- **Text:** A clear, single-sentence explanation.
- **Action:** A primary action button to resolve the empty state.
- **No illustrations:** Illustrations are V2.

---

## 9. Implementation Notes

### 9.1 Token Organisation

Visual language tokens will be implemented as CSS custom properties organised by category:

```css
:root {
  /* Colour */
  --color-primary-500: #3B82F6;
  
  /* Typography */
  --font-primary: 'Inter', sans-serif;
  --text-base: 16px;
  
  /* Spacing */
  --space-1: 8px;
  --space-2: 16px;
  
  /* Motion */
  --duration-normal: 200ms;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
}
```

### 9.2 Token Migration Path

| Phase | Tokens | Status |
|-------|--------|--------|
| V1 (current) | Hardcoded values in Tailwind config | ❌ Current state |
| V1.1 | CSS custom properties for colour, typography, spacing | 📋 Planned |
| V2 | Full token system with semantic aliases | 📋 Planned |

> 🔍 **Reference:** → VII:§2.3 for token system architecture.

### 9.3 Quality Check

Before any visual change is approved, it must pass:

1. **Accessibility check:** All colour combinations meet WCAG AA minimum.
2. **Scale check:** All values come from the defined scale.
3. **Consistency check:** The same meaning uses the same visual treatment.
4. **Purpose check:** Every visual element has a purpose.

---

## Volume II — References

| Reference | Relationship |
|-----------|-------------|
| → I:§4 (Design Manifesto) | Visual language expresses the manifesto principles |
| → III:§2 (Component Anatomy) | Visual tokens applied to components |
| → VI:§2 (Brand Visual Identity) | Brand expression of visual language |
| → VII:§2 (Token System) | Technical implementation of visual tokens |

---

*End of Volume II — Visual Language*

*All colour values and spacing scales are tentative and should be validated with the design lead before implementation. Semantic colour meanings are fixed — specific hex values may be refined.*