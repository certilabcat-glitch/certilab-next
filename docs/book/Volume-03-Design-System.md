# Volume III — Design System

## The Component Architecture of Certilab Platform

---

**Volume:** III of VII
**Status:** ✅ ACTIVE
**Last Updated:** 2026-07-05
**Estimated Pages:** 150–200

---

## Table of Contents

1. [Design System Philosophy](#1-design-system-philosophy)
2. [Component Anatomy](#2-component-anatomy)
3. [Atomic Design: Atoms](#3-atomic-design-atoms)
4. [Atomic Design: Molecules](#4-atomic-design-molecules)
5. [Atomic Design: Organisms](#5-atomic-design-organisms)
6. [Atomic Design: Templates](#6-atomic-design-templates)
7. [Patterns](#7-patterns)
8. [States and Behaviour](#8-states-and-behaviour)
9. [Form Design](#9-form-design)
10. [Data Display](#10-data-display)
11. [Feedback and Notification](#11-feedback-and-notification)
12. [Navigation Patterns](#12-navigation-patterns)
13. [Component Governance](#13-component-governance)
14. [Design System Evolution](#14-design-system-evolution)
15. [Open Questions](#15-open-questions)

---

## 1. Design System Philosophy

### 1.1 Why a Design System

A design system ensures that every interface created for Certilab feels like it belongs to the same product. It eliminates the fragmentation that occurs when multiple teams or individuals build components in isolation. It provides a shared vocabulary for designers and developers. It enables speed without sacrificing consistency.

### 1.2 Design System Principles

**1. Pragmatic over perfect.** The design system must serve the product's needs today. It should not over-abstract for hypothetical future scenarios. Components are created when they are needed, not when they are imagined.

**2. Composable over monolithic.** Components should be small, focused, and composable. A Button atom, an Input atom, and a Label atom compose into a Form Field molecule. They should not be built as a single monolithic Form component that cannot be rearranged.

**3. Accessible by default.** Every component in the design system must be accessible out of the box. Accessibility is not a layer applied on top — it is built into the component's core.

**4. Decoupled from brand.** The design system's component architecture is decoupled from visual decisions. Visual tokens can be modified without restructuring components. This enables the brand to evolve independently from the component library.

**5. Progressive migration.** The design system is not a rewrite. It is a progressive migration from the current state (mixed CSS modules and Tailwind) to a unified, token-driven system.

### 1.3 Current State Assessment

| Aspect | Current State | Target State |
|--------|---------------|--------------|
| CSS methodology | Mixed: CSS Modules + Tailwind | Tailwind v4 + CSS custom properties |
| Component library | React components, no central registry | Design system with documentation |
| Tokens | Hardcoded values | CSS custom properties with semantic aliases |
| Documentation | None | Living documentation in repository |
| Versioning | None | Semantic versioning |
| Testing | Minimal | Component-level tests + visual regression |

> 🔍 **Reference:** → VII:§3 for implementation plan

---

## 2. Component Anatomy

### 2.1 The Anatomy of a Component

Every component in the Certilab Design System has the following anatomy:

```
┌──────────────────────────────────────────────────┐
│  ComponentName                                    │
│  ┌──────────────────────────────────────────────┐│
│  │  [Props] → Component logic                   ││
│  │  [State] → Internal state management         ││
│  │  [Tokens] → Visual tokens (colour, spacing)  ││
│  │  [Variants] → Visual variants                ││
│  │  [Sizes] → Size options                      ││
│  │  [States] → Interactive states               ││
│  └──────────────────────────────────────────────┘│
│                                                   │
│  Rules:                                           │
│  - Accessibility requirements                     │
│  - Usage guidelines                               │
│  - Do not use examples                            │
└──────────────────────────────────────────────────┘
```

### 2.2 Component Specification Template

```typescript
interface ComponentSpec {
  name: string;          // Component name
  category: string;      // Atom, Molecule, Organism
  description: string;   // What it does
  props: Prop[];         // Input properties
  states: State[];       // All possible states
  variants: Variant[];   // Visual variants
  sizes: Size[];         // Size options
  accessibility: string; // ARIA requirements
  usage: string;         // When to use
  dont: string;          // When NOT to use
}
```

### 2.3 Component Ownership

| Role | Responsibility |
|------|---------------|
| Design lead | Visual design, behaviour specification |
| Frontend lead | Implementation, testing, documentation |
| Product manager | Priority, usage governance |
| QA | Accessibility, cross-browser testing |

---

## 3. Atomic Design: Atoms

### 3.1 Button

**Purpose:** Triggers an action or navigates to a destination.

**Variants:**

| Variant | Usage | Visual |
|---------|-------|--------|
| `primary` | Primary action on a page | Filled, primary colour |
| `secondary` | Secondary action | Outline, neutral |
| `ghost` | Tertiary / minimal action | No border, subtle |
| `danger` | Destructive action | Red, filled |
| `link` | Text that navigates | Text-only, underlined |

**Sizes:**

| Size | Height | Font | Padding |
|------|--------|------|---------|
| `sm` | 32px | 14px | 12px horizontal |
| `md` | 40px | 16px | 16px horizontal |
| `lg` | 48px | 18px | 20px horizontal |

**States:**

```
Default → Hover → Active → Focus → Disabled → Loading
```

**Rules:**
- Primary action: maximum 1 per view.
- Danger variant: must be accompanied by a confirmation dialog.
- Icon can be included before (leading) or after (trailing) text.
- Icon-only buttons must have an aria-label.

**✅ Correct:** A primary "Enviar solicitud" button at the bottom of a form.
**❌ Incorrect:** Three primary buttons competing for attention on the same view.

### 3.2 Input

**Purpose:** Captures user text input.

**Variants:**

| Variant | Usage |
|---------|-------|
| `text` | Alphanumeric text |
| `email` | Email address |
| `password` | Password with visibility toggle |
| `number` | Numeric values |
| `tel` | Phone number |
| `search` | Search input with clear button |
| `textarea` | Multi-line text |

**States:**

```
Default → Focus → Typing → Valid → Invalid → Disabled → Read-only
```

**Anatomy:**

```
┌─ Label (optional) ──────────────────────────┐
│                                               │
│  ┌─────────────────────────────────────────┐ │
│  │  Input field              [icon]        │ │
│  └─────────────────────────────────────────┘ │
│                                               │
│  Helper text / Error message                  │
└───────────────────────────────────────────────┘
```

**Rules:**
- Every input must have an associated label (visible or aria-label).
- Placeholder text must never replace a label.
- Error messages must explain what went wrong and how to fix it.
- Input width should match the expected content length.

**✅ Correct:** A properly labelled input with clear error message and helper text.
**❌ Incorrect:** A placeholder-only input used as a label replacement.

### 3.3 Select

**Purpose:** Selects an option from a predefined list.

**Variants:**

| Variant | Usage |
|---------|-------|
| `single` | Single selection |
| `multiple` | Multiple selections (tags) |
| `searchable` | Filterable list |
| `native` | Native HTML select for simple cases |

**States:** Same as Input.

**Rules:**
- Use native select for 5 or fewer options.
- Use searchable select for 10+ options.
- Multi-select should display selected items as removable tags.

### 3.4 Checkbox

**Purpose:** Selects or deselects an option.

**States:**

```
Unchecked → Checked → Indeterminate → Disabled
```

**Rules:**
- Checkboxes are for multi-select. For single select, use radio buttons.
- A standalone checkbox without visible label must have an aria-label.
- The clickable area should include both the checkbox and its label.

### 3.5 Radio Button

**Purpose:** Selects a single option from a set.

**States:**

```
Unselected → Selected → Disabled
```

**Rules:**
- Radio buttons are for mutually exclusive choices.
- Minimum 2, maximum 7 options. For more, use a Select.
- One option should be pre-selected (usually the safest or most common).

### 3.6 Toggle

**Purpose:** Switches a setting between two states.

**States:**

```
Off → On → Disabled
```

**Rules:**
- Toggles are for instant-apply settings. If a form submission is required, use a checkbox.
- The toggle label should clearly describe what the setting does.
- Use the exact same label text for both states — the visual state communicates the value.

### 3.7 Badge

**Purpose:** Highlights status, category, or count.

**Variants:**

| Variant | Usage |
|---------|-------|
| `default` | Neutral information |
| `success` | Positive status |
| `warning` | Attention required |
| `error` | Problem |
| `info` | Informational |
| `outline` | Subtle, minimal emphasis |

**Sizes:** `sm` (16px height), `md` (20px height), `lg` (24px height)

**Rules:**
- Badges are non-interactive. For interactive tags, use a Tag component.
- Badge text should be short (1-3 words maximum).

### 3.8 Avatar

**Purpose:** Represents a user or entity.

**Variants:** `image`, `initials`, `icon`, `placeholder`

**Sizes:** `sm` (24px), `md` (32px), `lg` (40px), `xl` (48px)

**Rules:**
- Fall back gracefully: image → initials → icon → placeholder.
- Initials should use the user's first and last name initials.
- Placeholder should use a generic person icon.

### 3.9 Icon

**Purpose:** Provides a visual cue for an action or concept.

**Sizes:** 16px, 20px, 24px

**Rules:**
- Icons must have consistent stroke width (1.5px).
- Icons must be available in both default and semantic colours.
- Decorative icons must be hidden from screen readers (`aria-hidden="true"`).
- Functional icons must have an aria-label.

### 3.10 Typography

**Purpose:** Renders text with consistent styling.

**Variants:**

| Variant | HTML Element | Token |
|---------|-------------|-------|
| `h1` | `h1` | `--text-5xl` |
| `h2` | `h2` | `--text-4xl` |
| `h3` | `h3` | `--text-3xl` |
| `h4` | `h4` | `--text-2xl` |
| `h5` | `h5` | `--text-xl` |
| `h6` | `h6` | `--text-lg` |
| `body` | `p` | `--text-base` |
| `small` | `span` | `--text-sm` |
| `caption` | `span` | `--text-xs` |

**Rules:**
- Do not skip heading levels (h1 → h2 → h3, never h1 → h3).
- Each page must have exactly one h1.
- Text component should accept `weight` and `colour` as optional props.

---

## 4. Atomic Design: Molecules

### 4.1 Form Field

**Purpose:** Composes a label, input, helper text, and error into a single unit.

**Anatomy:**

```
┌──────────────────────────────────────────────┐
│  Label (required indicator)                   │
│  ┌────────────────────────────────────────┐ │
│  │  Input / Select / Textarea             │ │
│  └────────────────────────────────────────┘ │
│  Helper text / Error message                 │
└──────────────────────────────────────────────┘
```

**Rules:**
- Helper text and error message occupy the same space (mutually exclusive).
- Required fields should be indicated with a subtle "(obligatorio)" text.
- Optional fields should be indicated with "(opcional)" — not the reverse.

### 4.2 Input Group

**Purpose:** Groups related inputs with an optional prefix or suffix.

**Anatomy:**

```
┌────────────┬────────────────────┬────────────┐
│  Prefix    │  Input             │  Suffix    │
│  (€)       │  (value)          │  (unit)    │
└────────────┴────────────────────┴────────────┘
```

**Usage:** Currency inputs, units of measurement, search with submit.

### 4.3 Search Bar

**Purpose:** Provides search functionality with suggestions.

**Anatomy:**

```
┌──────────────────────────────────────────────┐
│  🔍  Search...                       [Clear] │
├──────────────────────────────────────────────┤
│  Recent searches                              │
│  → Search result 1                            │
│  → Search result 2                            │
│  → Search result 3                            │
└──────────────────────────────────────────────┘
```

### 4.4 Card

**Purpose:** Groups related content into a visually distinct container.

**Variants:**

| Variant | Usage |
|---------|-------|
| `default` | Standard card with border and shadow |
| `elevated` | Floating card with stronger shadow |
| `flat` | Border only, no shadow |
| `interactive` | Hoverable, clickable card |

**Anatomy:**

```
┌──────────────────────────────────────────────┐
│  ┌──────────┐                                │
│  │  Image   │  Header                        │
│  └──────────┘                                │
│                                               │
│  Body content                                 │
│                                               │
│  Footer (actions, metadata)                   │
└──────────────────────────────────────────────┘
```

**Rules:**
- Cards should not be used inside tables. Use table rows for tabular data.
- Interactive cards must have keyboard support (Enter/Space to activate).
- Card elevation should be consistent within a view.

### 4.5 Modal / Dialog

**Purpose:** Prompts the user for a decision or displays critical information.

**Anatomy:**

```
┌──────────────────────────────────────────────┐
│  ═══ Overlay ════════════════════════════════ │
│  ┌────────────────────────────────────────┐  │
│  │  Modal Container                       │  │
│  │  ┌──────────────────────────────────┐  │  │
│  │  │  Title                    [✕]   │  │  │
│  │  ├──────────────────────────────────┤  │  │
│  │  │  Content                         │  │  │
│  │  │                                   │  │  │
│  │  │                                   │  │  │
│  │  ├──────────────────────────────────┤  │  │
│  │  │  [Secondary]          [Primary]  │  │  │
│  │  └──────────────────────────────────┘  │  │
│  └────────────────────────────────────────┘  │
│                                               │
│  ✕ Click outside to close                     │
└──────────────────────────────────────────────┘
```

**Sizes:**

| Size | Width | Usage |
|------|-------|-------|
| `sm` | 400px | Confirmations, alerts |
| `md` | 540px | Standard forms, edits |
| `lg` | 720px | Complex forms, detailed content |
| `xl` | 960px | Full content, document preview |

**Rules:**
- Modals must be closable via: ✕ button, Escape key, and clicking outside.
- Focus must be trapped inside the modal when open.
- The primary action button should be on the right, secondary on the left.
- Modals should not open other modals.

**✅ Correct:** A confirmation modal with a clear title, concise message, and two action buttons.
**❌ Incorrect:** A modal with no title, 500 words of text, and five action buttons.

### 4.6 Alert / Banner

**Purpose:** Communicates important information that persists until dismissed.

**Variants:**

| Variant | Usage |
|---------|-------|
| `info` | General information |
| `success` | Positive outcome |
| `warning` | Something needs attention |
| `error` | A problem occurred |

**Anatomy:**

```
┌──────────────────────────────────────────────┐
│  [icon]  Title (optional)                    │
│          Message text                        │
│          [Action]                    [✕]    │
└──────────────────────────────────────────────┘
```

**Rules:**
- Alerts can optionally include an action button.
- Alerts should be dismissible unless they communicate a permanent condition.
- Only one alert banner should be visible at a time.

### 4.7 Toast / Notification

**Purpose:** Communicates the result of an action temporarily.

**Anatomy:**

```
┌──────────────────────────────────────────────┐
│  [icon]  Message                    [✕]    │
└──────────────────────────────────────────────┘
```

**Variants:** Same as Alert.

**Rules:**
- Toasts auto-dismiss after 5 seconds (8 seconds for errors).
- Toasts appear in the top-right corner of the viewport.
- Maximum 3 toasts visible simultaneously.
- Toasts must not contain critical information that requires action.

### 4.8 Tooltip

**Purpose:** Provides additional context on hover or focus.

**Anatomy:**

```
┌──────────────────────────────────────────────┐
│  Text content (max 100 characters)           │
└──────────────────────────────────────────────┘
```

**Positions:** `top`, `bottom`, `left`, `right`

**Rules:**
- Tooltips must not contain interactive content.
- Tooltips should be triggered on both hover and focus.
- Tooltip delay: 500ms before showing, 300ms before hiding.

> ⚠️ **Pending validation of design:** Tooltip delay values should be validated through user testing.

### 4.9 Menu / Dropdown

**Purpose:** Presents a list of related actions.

**Anatomy:**

```
┌──────────────────────────────────────────────┐
│  Trigger button              ▼               │
├──────────────────────────────────────────────┤
│  ┌────────────────────────────────────────┐ │
│  │  Option 1                              │ │
│  │  Option 2                       ✔     │ │
│  │  ──────────────────────────────────── │ │
│  │  Option 3                              │ │
│  │  Option 4                              │ │
│  └────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

**Rules:**
- Menu items must be keyboard navigable (arrow keys, Enter, Escape).
- Active/selected items must be visually indicated.
- Menu should close on selection unless the action opens a submenu.

### 4.10 Tabs

**Purpose:** Organises content into related sections.

**Variants:**

| Variant | Usage |
|---------|-------|
| `underline` | Primary navigation within a page |
| `pills` | Content filtering, secondary navigation |
| `vertical` | Sidebar navigation within a section |

**Anatomy:**

```
┌──────────────────────────────────────────────┐
│  Tab 1  │  Tab 2  │  Tab 3  │  Tab 4       │
│  ───────                                          │
│                                                   │
│  Tab content                                      │
└──────────────────────────────────────────────┘
```

**Rules:**
- Active tab must have a clear visual indicator (underline, background, or colour).
- Tab labels should be 1-3 words.
- Tabs should not be used for primary navigation (→ use navigation component).

### 4.11 Breadcrumbs

**Purpose:** Shows the user's current location and navigation path.

**Anatomy:**

```
Inicio  >  Expedientes  >  Expediente #1234
```

**Rules:**
- Every level except the last must be clickable.
- The last level should be text (the current page) not a link.
- Breadcrumbs should appear on all pages deeper than one level from root.

### 4.12 Pagination

**Purpose:** Navigates through paginated content.

**Anatomy:**

```
<  1  2  3  ...  20  >
```

**Rules:**
- Show first and last page always.
- Show up to 5 page numbers around the current page.
- Show ellipsis for gaps.
- "Previous" and "Next" labels must be translated.
- Page count should include total: "Página 3 de 20".

### 4.13 Progress Bar

**Purpose:** Shows the progress of a multi-step process.

**Variants:**

| Variant | Usage |
|---------|-------|
| `linear` | Stepped progress (wizard, form) |
| `determinate` | Known progress percentage |
| `indeterminate` | Unknown duration |

**Anatomy (stepped):**

```
Step 1 ─── Step 2 ─── Step 3 ─── Step 4
   ✔        ●          ○          ○
Completed  Current    Pending    Pending
```

**Rules:**
- Each step must have a label.
- Completed steps should show a check icon.
- The current step should be visually distinct.

### 4.14 Skeleton

**Purpose:** Indicates content is loading.

**Anatomy:**

```
┌──────────────────────────────────────────────┐
│  ┌─────────────┐  ┌────────────────────────┐│
│  │  ██████████  │  │  ████████████████████  ││
│  │  ██████████  │  │  ████████████████████  ││
│  └─────────────┘  │  ████████████████████  ││
│                   │  ████████████████████  ││
│                   └────────────────────────┘│
└──────────────────────────────────────────────┘
```

**Rules:**
- Skeleton should match the layout of the final content as closely as possible.
- Skeleton animation should be subtle (pulse at 1.5s duration).
- Skeleton should not be used for loading states shorter than 300ms.

---

## 5. Atomic Design: Organisms

### 5.1 Page Header

**Purpose:** Provides consistent page-level structure.

**Anatomy:**

```
┌──────────────────────────────────────────────┐
│  Breadcrumbs (if applicable)                 │
│                                               │
│  ┌──────────────────────────────────────┐    │
│  │  Page Title              [Actions]   │    │
│  │  Description / subtitle               │    │
│  └──────────────────────────────────────┘    │
└──────────────────────────────────────────────┘
```

**Rules:**
- Each page must have exactly one Page Header.
- Actions should be the primary action for the page.
- The page title should match the navigation label.

### 5.2 Data Table

**Purpose:** Displays tabular data with sorting, filtering, and actions.

**Anatomy:**

```
┌──────────────────────────────────────────────┐
│  Search                    [Filter] [Export] │
├──────────────────────────────────────────────┤
│  Header 1  │  Header 2  │  Header 3  │ ... │
│  ─────────────────────────────────────────── │
│  Data 1     │  Data 2     │  Data 3     │ ... │
│  Data 1     │  Data 2     │  Data 3     │ ... │
│  Data 1     │  Data 2     │  Data 3     │ ... │
├──────────────────────────────────────────────┤
│  Total: 20 items                <  1  2  3 > │
└──────────────────────────────────────────────┘
```

**Features:**
- Column sorting (click header to sort asc/desc).
- Row selection (checkbox in first column).
- Responsive: columns collapse to stacked view on mobile.
- Inline actions per row (edit, delete, view).
- Empty state with guidance.

**Rules:**
- Maximum 8 columns per table. More columns should use a detail view.
- Long text should truncate with ellipsis.
- Numeric data should be right-aligned.
- Dates should use the Spanish format (DD/MM/AAAA).

### 5.3 Filter Bar

**Purpose:** Filters content in a list or table.

**Anatomy:**

```
┌──────────────────────────────────────────────┐
│  Category: [▼ All]  Status: [▼ Active]      │
│  Date from: [____]  Date to: [____]         │
│  [Apply filters]  [Clear filters]           │
└──────────────────────────────────────────────┘
```

**Rules:**
- Active filters should be shown as removable tags below the filter bar.
- Filters should apply immediately or after clicking "Apply filters."
- "Clear filters" should reset all filters to their default state.

### 5.4 Detail Panel

**Purpose:** Shows detailed information about a selected item.

**Anatomy:**

```
┌──────────────────────────────────────────────┐
│  ┌─ Sidebar ─┐  ┌─ Main Content ─────────┐  │
│  │           │  │                         │  │
│  │ Overview  │  │ Detail information      │  │
│  │ Section 1 │  │ displayed here          │  │
│  │ Section 2 │  │                         │  │
│  │ Section 3 │  │                         │  │
│  │           │  │                         │  │
│  │ History   │  │                         │  │
│  └───────────┘  └─────────────────────────┘  │
└──────────────────────────────────────────────┘
```

**Rules:**
- Used for detail views of complex entities (case files, clients, properties).
- Sidebar navigation within the panel for long content.
- Main content area adapts based on selected sidebar section.

### 5.5 Empty State

**Purpose:** Guides the user when no content exists.

**Anatomy:**

```
┌──────────────────────────────────────────────┐
│                                               │
│                   [icon]                      │
│                                               │
│        Title: "No hay expedientes"           │
│                                               │
│        Description: "Solicita tu primera     │
│        segunda opinión para comenzar."        │
│                                               │
│        [Primary action button]               │
│                                               │
└──────────────────────────────────────────────┘
```

**Rules:**
- Empty states must include a path forward (action button or link).
- Empty states must not use illustrations in V1.
- Empty state text should be concise and helpful.

### 5.6 Error Boundary

**Purpose:** Catches and displays errors gracefully.

**Anatomy:**

```
┌──────────────────────────────────────────────┐
│                                               │
│                   [warning icon]              │
│                                               │
│        "Algo ha ido mal"                      │
│                                               │
│        "Ha ocurrido un error inesperado.     │
│        Puedes intentar recargar la página."   │
│                                               │
│        [Recargar página]  [Contactar soporte] │
│                                               │
└──────────────────────────────────────────────┘
```

**Rules:**
- Error boundaries should prevent the entire application from crashing.
- The error message should be human-readable.
- Technical error details should be logged, not displayed.

### 5.7 Navigation Shell

**Purpose:** Provides the application's primary navigation structure.

**Anatomy (Desktop):**

```
┌──────┬───────────────────────────────────────┐
│      │  Top Bar (user, notifications)        │
│ Sid  │───────────────────────────────────────│
│ ebar │  Content area                         │
│      │                                       │
│ Nav  │                                       │
│      │                                       │
│      │                                       │
└──────┴───────────────────────────────────────┘
```

**Anatomy (Mobile):**

```
┌──────────────────────────────────────────────┐
│  Top Bar                                     │
├──────────────────────────────────────────────┤
│                                              │
│  Content area                               │
│                                              │
├──────────────────────────────────────────────┤
│  Home  │  Expedientes  │  Perfil  │  Más   │
└──────────────────────────────────────────────┘
```

**Rules:**
- The sidebar should be collapsible on desktop.
- Active section must be visually highlighted.
- Navigation labels must match page titles.
- Icons should accompany navigation items.

---

## 6. Atomic Design: Templates

### 6.1 Landing Template

**Purpose:** Marketing and conversion pages.

**Structure:**
- Hero section (headline, subtitle, CTA)
- Value proposition section
- How it works section
- Testimonials / Social proof
- Final CTA

### 6.2 Auth Template

**Purpose:** Login, registration, and password reset pages.

**Structure:**
- Centred card layout (max 480px)
- Logo at top
- Form in card
- Footer with links (privacy, terms)

### 6.3 Dashboard Template

**Purpose:** AT workspace and overview.

**Structure:**
- Navigation shell
- Summary cards (stats, pending items)
- Recent activity list
- Quick action buttons

### 6.4 Detail Template

**Purpose:** Entity detail views (case file, client, property).

**Structure:**
- Navigation shell
- Detail panel (sidebar + main content)
- Action bar at top
- Related items section at bottom

### 6.5 Form Template

**Purpose:** Data entry and editing.

**Structure:**
- Navigation shell (or standalone)
- Page header with title
- Form fields in single column
- Action buttons (Submit, Cancel)

### 6.6 List Template

**Purpose:** Entity lists and search results.

**Structure:**
- Navigation shell
- Page header
- Filter bar
- Data table or card list
- Pagination

---

## 7. Patterns

### 7.1 Loading Pattern

**Rules:**
- Loading states shorter than 300ms: no indicator needed.
- Loading states 300ms–3s: skeleton or spinner.
- Loading states longer than 3s: skeleton plus progress indicator.
- Full-page loads: skeleton matching the page layout.
- Partial loads: inline spinner for the affected section.

### 7.2 Empty State Pattern

**Rules:**
- First time user: onboarding message + primary action.
- After filters: "No se encontraron resultados" + clear filters action.
- After deletion: brief success message, item removed from list.

### 7.3 Error Recovery Pattern

**Rules:**
- Network errors: retry action + "Comprueba tu conexión" message.
- Validation errors: inline error next to the field.
- Server errors: "Algo ha ido mal. Inténtalo de nuevo."
- Session expired: redirect to login with "Tu sesión ha expirado."

### 7.4 Confirmation Pattern

**Rules:**
- Destructive actions must be confirmed.
- Confirmation dialog must state exactly what will happen.
- The primary button should use the action verb ("Eliminar", not "Aceptar").
- "Are you sure?" is not a sufficient message. Explain the consequences.

### 7.5 Optimistic Update Pattern

**Rules:**
- Show the result immediately, before server confirmation.
- Indicate the state as "pending" (subtle visual treatment).
- On success: remove the pending indicator.
- On error: revert the change and show an error message.

### 7.6 Progressive Disclosure Pattern

**Rules:**
- Show essential information by default.
- Reveal secondary information on interaction (expand, hover, click).
- Never hide critical actions behind progressive disclosure.
- Complex forms can use multi-step (wizard) disclosure.

### 7.7 Keyboard Navigation Pattern

**Rules:**
- Tab: move to next interactive element.
- Shift+Tab: move to previous interactive element.
- Enter/Space: activate the focused element.
- Escape: close modal, menu, or dropdown.
- Arrow keys: navigate within menus, tables, lists.
- All interactive elements must be keyboard accessible.

---

## 8. States and Behaviour

### 8.1 Interactive States

| State | Description | Visual |
|-------|-------------|--------|
| `default` | Element is idle and available | Normal appearance |
| `hover` | Mouse cursor is over the element | Slight background/opacity change |
| `active` | Element is being pressed | Slightly darker/inset |
| `focus` | Element is focused via keyboard | Focus ring (2px outline) |
| `disabled` | Element is not interactive | Reduced opacity (50%) |
| `loading` | Operation in progress | Spinner or reduced opacity |
| `error` | Validation failure | Red border + error message |
| `success` | Validation passed | Green check or border |

### 8.2 Focus Management

**Rules:**
- Focus indicator must have 3:1 contrast ratio against the background.
- Focus indicator must be visible in all colour schemes.
- Custom focus indicators are preferred over browser defaults.
- Focus must be managed programmatically in modals, menus, and async content.

### 8.3 Disabled State

**Rules:**
- Disabled elements must not be interactive.
- Disabled elements should not receive focus.
- Provide a tooltip explaining why an element is disabled.
- Disabled state opacity: 50% of enabled state.

### 8.4 Loading State

**Rules:**
- The element must maintain its dimensions while loading.
- The button should show a spinner and keep its text visible.
- Disable interaction while loading.
- Loading duration should be communicated if known.

---

## 9. Form Design

### 9.1 Form Principles

1. **One thing at a time.** Each form should accomplish one goal.
2. **Label every input.** Visible labels are mandatory.
3. **Match input to content.** Input width should suggest the expected content.
4. **Provide defaults.** Pre-fill with sensible defaults when possible.
5. **Validate early.** Validate on blur where possible, not only on submit.
6. **Explain errors.** Error messages must explain what's wrong and how to fix it.
7. **Autosave.** Long forms should autosave to prevent data loss.

### 9.2 Form Layout

- Single column by default.
- Two columns only for related, short fields (city + postal code, day + month + year).
- Labels above inputs (not beside).
- Related fields grouped with fieldset.

### 9.3 Validation

| Validation Timing | Method | Usage |
|-------------------|--------|-------|
| On blur | Client-side | Format validation, required fields |
| On submit | Client + server | Business rules, data consistency |
| Debounced (300ms) | Server-side | Uniqueness checks, availability |

**Validation message format:**

```
"Correo electrónico inválido" (not "Error de validación")
"Este campo es obligatorio" (not "Required")
"La contraseña debe tener al menos 8 caracteres" (not "Too short")
```

### 9.4 Required vs Optional

- Mark required fields with "(obligatorio)" after the label.
- Mark optional fields with "(opcional)" — not the reverse.
- If most fields are required, mark only the optional ones.

### 9.5 Form Actions

| Action | Position | Variant |
|--------|----------|---------|
| Primary (submit, save) | Bottom-right | Primary button |
| Secondary (cancel) | Bottom-left | Ghost button |
| Destructive (delete) | Separate section | Danger button |

---

## 10. Data Display

### 10.1 Data Presentation Rules

1. **Consistent formatting.** Numbers, dates, and currencies must be formatted consistently.
2. **Right-align numbers.** Numbers should be right-aligned in tables.
3. **Left-align text.** Text, names, and descriptions should be left-aligned.
4. **Provide context.** Show units, currency symbols, and date formats.
5. **Truncate gracefully.** Long text should truncate with ellipsis.
6. **Sort by relevance.** Data should be sorted by the most relevant column by default.

### 10.2 Date and Time Formats

| Context | Format | Example |
|---------|--------|---------|
| Full date | DD/MM/AAAA | 15/07/2026 |
| Short date | DD MMM | 15 jul |
| Date with time | DD/MM/AAAA HH:mm | 15/07/2026 14:30 |
| Relative | Hace X tiempo | Hace 3 horas |
| Duration | Xh Ymin | 2h 30min |

### 10.3 Number and Currency Formats

| Context | Format | Example |
|---------|--------|---------|
| Integer | 1.000,00 | 2.500 |
| Percentage | X% | 75% |
| Currency | X€ | 150,00€ |
| Decimal | 1.000,00 | 1.234,56 |

### 10.4 Status Indicators

| Status | Colour | Icon | Example |
|--------|--------|------|---------|
| Completed | Green | ✓ | Certificado validado |
| In progress | Blue | ● | En revisión |
| Pending | Yellow | ◐ | Pendiente |
| Rejected | Red | ✗ | Rechazado |
| Draft | Grey | ○ | Borrador |

---

## 11. Feedback and Notification

### 11.1 Notification Types

| Type | Persistence | Location | Animation |
|------|-------------|----------|-----------|
| Toast | 5s (8s error) | Top-right | Slide in, fade out |
| Banner | Until dismissed | Top of page | Slide down |
| Inline | Until corrected | Next to element | Instant |
| Modal | Until dismissed | Centre of screen | Fade in |

### 11.2 Feedback Guidelines

- **Success:** Confirm without celebration. "Expediente creado" not "¡Expediente creado con éxito!"
- **Error:** Explain what happened and how to fix it.
- **Warning:** Explain the risk and offer a choice.
- **Information:** Provide context without requiring action.

### 11.3 Notification Hierarchy

```
Critical (modal) > Error (toast + inline) > Warning (banner) > Info (toast) > Success (toast)
```

Only one critical notification should be shown at a time.

---

## 12. Navigation Patterns

### 12.1 Primary Navigation

The primary navigation structure for authenticated users:

| Section | Icon | Visibility |
|---------|------|------------|
| Dashboard | Grid | AT only |
| Expedientes | Folder | All authenticated |
| Clientes | People | AT only |
| Mi Perfil | User | All authenticated |

### 12.2 Secondary Navigation

- **AT workflow:** Case file detail uses sidebar navigation (sections within a case file).
- **Settings:** Tab-based navigation within settings pages.
- **Landing:** Single-page scroll navigation.

### 12.3 Navigation Rules

- The current location must always be visible in the navigation.
- Navigation labels must match page titles and breadcrumbs.
- Navigation should not use icons alone — text labels are mandatory.
- External links must be indicated with an icon.

---

## 13. Component Governance

### 13.1 Component Lifecycle

```
Proposed → Draft → Review → Approved → Published → Deprecated → Archived
```

| Stage | Activities |
|-------|-----------|
| Proposed | Component need identified, specification drafted |
| Draft | First implementation, visual review |
| Review | Accessibility audit, cross-browser testing |
| Approved | Component merged into the design system |
| Published | Component documented and available for use |
| Deprecated | Component replaced, migration path provided |
| Archived | Component removed, documentation preserved |

### 13.2 Component Review Checklist

- [ ] Follows design principles?
- [ ] All states implemented?
- [ ] Keyboard accessible?
- [ ] Screen reader compatible?
- [ ] Cross-browser tested?
- [ ] Responsive?
- [ ] Token-driven?
- [ ] Documented with examples?
- [ ] Unit tests passing?

### 13.3 Breaking Changes

A change is breaking if:

- Component props change.
- Visual output changes significantly.
- Behaviour changes.
- A11y behaviour changes.

Breaking changes require:
1. Deprecation notice in the previous version.
2. Migration guide for consumers.
3. Major version bump.

---

## 14. Design System Evolution

### 14.1 Phase 1: Foundation (V1)

- Define visual tokens (colour, typography, spacing).
- Build core atoms (Button, Input, Select, Checkbox, Badge, Icon).
- Document patterns and rules.

### 14.2 Phase 2: Expansion (V1.1)

- Build molecules (Form Field, Card, Modal, Tabs, Data Table).
- Implement form patterns.
- Add loading and empty states.
- Begin documentation site.

### 14.3 Phase 3: Maturity (V2)

- Complete organism library.
- Add motion tokens.
- Implement advanced components (Data Table with sorting/filtering).
- Full documentation site with interactive examples.
- Visual regression testing.

### 14.4 Phase 4: Mastery (V3+)

- Full component coverage.
- Theme system for future modules.
- Component playground.
- Automated accessibility testing.

---

## 15. Open Questions

| ID | Question | Context | Depends On |
|----|----------|---------|------------|
| DS-001 | Should the design system use a CSS-in-JS approach or pure CSS? | Tailwind v4 is the current choice, but CSS-in-JS offers better component encapsulation. | Framework decision |
| DS-002 | Should components be built as a separate npm package? | Separate package enables versioning and external use but adds maintenance overhead. | Phase 3 planning |
| DS-003 | What is the testing strategy for components? | Unit tests, visual regression tests, or both? | Phase 2 planning |
| DS-004 | How should documentation be generated? | Storybook, custom documentation site, or inline? | Phase 2 planning |

---

## Volume III — References

| Reference | Relationship |
|-----------|-------------|
| → II:§2 (Colour) | Visual tokens used in components |
| → IV:§5 (Component-specific UX) | UX behaviour for components |
| → VII:§3 (Implementation) | Technical implementation of design system |

---

*End of Volume III — Design System*