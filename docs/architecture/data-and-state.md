# Data and State

## Project State

`lib/project-store.tsx` owns project metadata (`name`, `description`, `accent`, timestamps, and display fields) and the project collection repository. Projects are created with `crypto.randomUUID()`. IndexedDB database `world-engine` (object stores `projects` and `project-data`) holds metadata and collection values. A data row is keyed by `${projectId}:${collection}` and also records the project ID and collection name.

On startup, `ProjectStoreProvider` loads metadata and the active project ID from localStorage. The app screen itself starts at the dashboard after refresh; opening a project selects it in the provider and in page-local state. Domain providers/hooks then hydrate their collection for the selected project. State changes are generally persisted by effects; some tools call `readProjectData` / `writeProjectData` directly. There is no server or database service and no project file format at the World Engine layer. The UI has no project export/import path.

Deleting a project now removes its metadata and all rows with that project ID in one IndexedDB transaction.

## Canon

Canon records are project-scoped collections exposed by domain contexts in `lib/*-canon.tsx`. Implemented collections include characters, character versions and influences, locations, families, relationships, history, calendars, cultures, religions, organizations, species, concepts, items, languages, knowledge, research, combat doctrines, governments, and systems. Editors update these records directly; family trees and project-home summaries read and derive views from Canon rather than maintaining another character/location collection.

Records are durable Canon-layer data, but there is no separate pending-edit repository: fields such as `draft`, `provisional`, or `disputed` are statuses on records in those collections. Several seed constants exist in domain modules but are intentionally not loaded into new projects.

## Working / Creation State

- Brainstorming persists messages and ideas in the project `brainstorming` collection, separate from Canon. Its promotion UI is currently a placeholder and does not write to Canon. Initial example messages and ideas are the empty-project defaults.
- Writing Profile is stored in `writing-profile`. Writing Studio stores scene beats, chapters, draft text, and editor selections in `pipeline`. Chapter draft text is a working snapshot: regeneration copies selected scene content into draft 1, after which chapter drafts can be edited separately.
- Book-cover drafts are stored in `cover-drafts` when explicitly saved. Project-home cover/background images and page thumbnails/icons have their own project collections.
- World Engine stores map-generation settings in `map-settings`; it does not store Azgaar's complete map document in that collection.
- Heraldry currently stores only a `heraldry` status marker. Armoria's editor state/settings are maintained by its own browser storage; no project-data bridge loads or saves heraldry designs.

## UI State

Screen selection, dialogs, searches, selected records, map surfaces/layers, and most editor controls are component state. Pipeline stage and selected scene/chapter are an exception: they are stored alongside writing data to restore the workspace. The active project ID, map toolbar usage, and Canon item-list density use localStorage; those preferences are browser-wide, not project data.

Canon providers are nested around the workspace and key their collections by the provider's active project. Pipeline state is more narrowly scoped to the Writing Studio. The workspace also holds the selected `Project` object locally while `ProjectStoreProvider` owns the active project ID and metadata list; the local object is a UI snapshot, not another persistence store.

## Derived State

Project-home counts, writing summaries, family-tree generations, filtered Canon lists, and relationship lookups are calculated from stored records. The project metadata fields `wordCount` and `lastEdited` are not recomputed from project content: word count is initialized to zero, and last-edited changes when metadata is updated, not when collections are saved.

## Persistence

The low-level IndexedDB API is centralized in `project-store.tsx`, but collection hydration and save effects are repeated across some Canon providers and feature components. Stored values are read with TypeScript casts; there is no runtime schema validation. IndexedDB version `2` manages object-store setup, but collection values have no schema/data version or migration path.

Azgaar owns its serialized `.map` data and saves an autosave copy as the single browser IndexedDB key `lastMap`; loading that copy is an engine action. Azgaar preferences and Armoria settings use same-origin localStorage. These embedded stores are not keyed by World Engine project ID. World Engine's toolbar/view preferences and project pointer also use localStorage, with namespaced World Engine keys.

## Identity

Project and character IDs use UUIDs. Other Canon IDs are commonly name slugs with collision suffixes; several domains use timestamp/random IDs. Relationships use typed `{entityType, entityId}` references, while family and character links use string IDs. Azgaar settlements use numeric IDs local to its map document, and Canon locations retain `mapEntityId`/`mapEntityType` for the integration.

There is no shared ID registry, runtime reference validation, or general cascade on entity deletion. Deleting a project is isolated and now cascades its project-data rows, but deleting a Canon entity can leave references in relationships, family/character links, research, or history.

## Integrations

The map iframe crosses into Canon through `lib/map-creator-bridge.ts` and `components/map-generator.tsx`. The host validates the message origin, iframe source, and payload, then `useLocationCanon` copies settlement fields into a Canon Location. The reverse adapter sends selected Canon location fields back to the map. Map geometry and engine serialization remain Azgaar-owned.

A settlement selection currently creates or updates a persistent Canon Location immediately. Matching falls back from map entity ID to case-insensitive name, so a same-named Canon Location can be associated with a different map settlement. The project has no map-document ID in the Canon association.

Armoria is loaded as an iframe. World Engine writes only a heraldry status marker; the Armoria design itself is not project-scoped or synchronized. Character creation and editing write directly to Character Canon; there is no separate pre-Canon character draft store. Brainstorm promotion is not implemented.

## Known Risks

- Saved project collections have no schema version, runtime validation, or migration policy; older/malformed values can be trusted as current types.
- Some read-failure paths mark default values as hydrated and then persist them, which can overwrite previously saved data after a transient IndexedDB read failure. Save errors are also generally not surfaced.
- Azgaar's `lastMap` and Armoria's browser state are origin/browser scoped rather than project scoped. The host's per-project map settings do not identify or select a corresponding `.map` document.
- Map settlement selection can promote data into Canon without confirmation and name-based fallback can attach the wrong same-named location.
- Canon references are not validated or cascaded on entity deletion.
- Project `wordCount` and `lastEdited` can become stale because collection writes do not update them.
- `Character` currently extends `FamilyMember` from `family-data.ts`, a module that also contains illustrative family fixtures. The Canon model therefore depends on a type housed alongside fixture data, though the fixture records themselves are not loaded into Canon.
