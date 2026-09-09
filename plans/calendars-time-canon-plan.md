# Calendars & Time Canon Lore Plan

## Goal

Build `Calendars & Time` as a first-class Canon Lore document for the world's authoritative calendars and temporal conventions. This page is the definitive source for calendar rules and novel knowledge. It is not a visual calendar, interactive timeline, astronomy engine, or full date-conversion service in the first implementation.

## Existing Architecture

The category currently exists in `components/world/canon-lore.tsx` as `calendars`, but is marked `ready: false` and is not included in `IMPLEMENTED_CANON_IDS`. It currently opens the generic coming-soon view.

Use these existing implementations as references:

- `app/page.tsx`: provider composition around `CanonLore`.
- `components/world/canon-lore.tsx`: category router, list/detail/create views, selected-record state, home cards, and coming-soon branch.
- `lib/history-canon.tsx`: closest provider, CRUD, localStorage persistence, chronology, eras, and references.
- `components/world/history-canon-record.tsx`: closest long-form create/edit/detail UI.
- `components/world/history-timeline.tsx`: existing chronology presentation, which should remain separate from calendar definitions.
- `components/world/canon-record-header.tsx`: shared title, summary, artwork, and identity layout.

## Design Boundary

Calendars define date systems and temporal conventions. History defines events, eras, and narrative chronology that may reference calendars.

Existing free-form dates such as `312 AR`, relative phrases, and uncertain prose must remain intact. Add structured calendar references alongside them rather than silently parsing, replacing, or normalizing authored text.

## Research Patterns To Borrow

- **World Anvil and Campfire:** typed templates, guided prompts, eras, linked records, and timeline references.
- **LegendKeeper and Obsidian:** aliases, source notes, backlinks, cultural variants, and disputed chronology.
- **Kanka and Notion:** typed entities, relationships, templates, and multiple views over one record model.
- **Fantasy Calendar and Calendarium:** separate calendar definitions from observances and date-linked notes.

Use the durable information-model patterns only. Do not copy assumptions about exact product labels, plan limits, or advanced calculations without checking current documentation.

## Implementation Phases

### 1. Calendar Provider and Model

Add `lib/calendar-canon.tsx` with a dedicated provider, hook, seeded records, CRUD methods, and localStorage persistence matching the History provider.

Calendar identity should support:

- Name, type, status, summary, and description.
- Owning culture, religion, institution, or region.
- Geographic scope, language, and script.
- Active period, predecessor, and successor calendars.
- Civil, religious, regnal, agricultural, astronomical, or other purpose.
- Sources, confidence, and canon notes.

### 2. Epoch and Year Rules

Document:

- Epoch anchor and founding event.
- Year direction and year-zero behavior.
- Positive/negative year notation.
- Eras and ages.
- Regnal or dynasty numbering.
- Year start and historical reforms.
- Whether the system has a computable absolute anchor.

Include explanatory prose because fictional calendars may be authoritative without being mathematically computable.

### 3. Units and Cycles

Model authored units for:

- Years.
- Months.
- Weeks.
- Days.
- Seasons.
- Cycles.
- Intercalary units.

Each unit should support names, aliases, abbreviations, order, length, variable-length rules, cultural meaning, and validity/effective dates. Do not assume Gregorian behavior.

### 4. Leap, Boundary, and Natural Rules

Document:

- Leap days and intercalary months.
- Skipped periods and cycle resets.
- Week structure and local day boundaries.
- Season definitions.
- Reform behavior and transitional rules.
- Moons, solstices, equinoxes, tides, harvest cycles, or other natural markers.

Natural and astronomical markers should indicate whether they are calculated, observed, ritual, approximate, disputed, or unknown. Do not require ephemeris or orbital simulation.

### 5. Cultural Usage and Observances

Support cultural and regional variants:

- Alternate names, scripts, and dialect forms.
- Local year starts.
- Religious and regnal conventions.
- Taboos and favored dates.
- Communities that use, reject, or reinterpret the calendar.

Add observance entries with:

- Name.
- Date or date range.
- Recurrence.
- Type.
- Cultural context and location.
- Significance.
- Links to History, Religion, Culture, and Organizations.

### 6. Reforms, Uncertainty, and Conversion Notes

Support predecessor and successor calendars, adoption dates, reform reasons, transitional notation, disputed interpretations, and groups that retain older systems.

Date precision states should include:

- Exact.
- Approximate.
- Range.
- Unknown.
- Disputed.
- Relative.

Always preserve original date text and source evidence beside structured data.

Conversion notes must explicitly identify:

- Source calendar and date.
- Target calendar and date.
- Rule-set version.
- Effective boundary.
- Conversion method.
- Confidence.

Unanchored, disputed, or insufficiently documented dates should display as unresolved or not computable rather than receiving a misleading numeric conversion.

### 7. Canon Lore Record UI

Add `components/world/calendar-canon-record.tsx` following the History record UI and shared Canon Record Header.

Use progressive sections:

1. Identity.
2. Scope and Users.
3. Epoch and Eras.
4. Units and Cycles.
5. Leap and Boundary Rules.
6. Natural and Astronomical Markers.
7. Observances.
8. Variants and Reforms.
9. Date Expressions and Conversions.
10. Sources and Notes.

View mode should show concise identity facts first, omit empty sections, use prose for rules, and use compact structured rows for units, eras, observances, and conversions.

Fast draft creation should require only name, type, summary, status, and scope. Advanced sections remain optional.

### 8. Canon Lore Routing

Update `components/world/canon-lore.tsx` to add:

- Calendar provider hook usage.
- Calendar list and selected-record state.
- Record counts and home-card readiness.
- Calendar index branch.
- Empty state.
- Create branch.
- Detail shell.
- Edit flow.
- Compact/list view.
- Image and thumbnail behavior.
- Back navigation.

Update `app/page.tsx` to mount the calendar provider. Add `calendars` to `IMPLEMENTED_CANON_IDS` only after the provider, list, create, and detail flows are complete.

### 9. Chronology Integration

After the standalone calendar model is stable, add calendar-qualified date fields to History additively:

- Calendar ID.
- Date expression or range.
- Precision state.
- Optional conversion or ordering key.

Preserve existing `occurrence`, `end`, and narrative chronology fields. Do not refactor every existing canon model during the initial calendar page pass.

Keep calendar eras for dating conventions and History eras/events for narrative records. Shared eras should be referenced rather than duplicated.

Add safe unresolved-reference and not-computable states for `AR`, relative dates, unknown dates, and missing epochs.

## Verification Checklist

- Run `pnpm lint` after the provider, record component, and router slices.
- Run `pnpm build` after all wiring.
- Verify the Canon Lore home card shows a record count and `Open`, not a placeholder label.
- Test empty state, create, detail, edit, save, cancel, image handling, compact view, and back navigation.
- Confirm empty sections are omitted in view mode.
- Test fixed and variable month lengths, leap periods, no year zero, negative years, regnal years, local variants, disputed dates, relative dates, and non-computable conversions.
- Confirm existing History records and free-form date strings remain backward-compatible.
- Check mobile and desktop layouts for long-form editors and structured sections.

## Explicitly Deferred

Do not implement these as part of the first document page:

- Universal time zones.
- Astronomical ephemerides.
- Automatic recurrence expansion.
- Interactive visual calendars.
- Global date-conversion services.
- Timeline visualization.
- Time or scenario simulation.

The authored calendar model should make those future features possible without requiring them now.
