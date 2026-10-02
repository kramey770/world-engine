# Integration Boundaries

## World Engine

The root Next.js application owns product UI, project state, Canon records, and host-side adapters. Root aliases are limited to `app/`, `components/`, and `lib/`; do not use them to reach embedded project files.

## Armoria

Armoria is an independent project under `armoria/`. World Engine hosts its runtime at `/armoria/index.html` in an iframe and does not import Armoria source or communicate with its internals through a JavaScript API.

The hosted files under `public/armoria/` are a host-specific runtime copy, not a byte-for-byte mirror of `armoria/public/`. The host copy has its own index adjustments and `world-engine.css`; no root-owned sync command currently connects the two trees. Do not overwrite it with an unmodified Armoria build. Keep changes to the Armoria application in its own project and review host-runtime changes separately.

The iframe currently has no host message/data bridge. World Engine's heraldry save action records only a project status marker; it does not save or load Armoria design data. Treat project-level heraldry persistence as an unresolved product integration, not as an existing capability.

## Azgaar

`map-generator-source/` owns the map engine, editing state, and native map import/export. World Engine hosts the runtime in an iframe and owns the surrounding UI, Canon Location state, and synchronization adapter.

The host protocol is represented by `lib/map-creator-bridge.ts`. `components/map-generator.tsx` verifies message origin and iframe source, validates message payloads, and sends typed commands to the iframe. The corresponding runtime bridge is in `map-generator-source/public/main.js`; keep its message shapes aligned with the host contract. Only integration summaries such as selected-settlement fields cross into World Engine, where `useLocationCanon` performs Canon synchronization. Do not make World Engine depend on Azgaar's map data structures or DOM beyond the explicit bridge commands.

## Generated Map Runtime

`map-generator-source/` is the source of truth. `pnpm sync:map-runtime` builds it and copies `map-generator-source/dist/` into `public/fantasy-map-generator/`, replacing stale hashed chunks. `pnpm validate:map-source` builds the source and checks the generated tree for differences. Do not edit `public/fantasy-map-generator/` as source; make changes in the source project, then sync and validate.

## World Engine Icons

`world-engine-icons/` is a separate Vite application. Its standalone application build is not consumed by World Engine. World Engine intentionally consumes only the exported icon catalog through the project's `src/catalog.ts` entry point and the host-owned `lib/world-engine-icons.ts` adapter. Keep this as the sole cross-project source import; do not import the icon app UI or other internals into product components.

## Boundary Rules

- Keep embedded projects independently configured and do not import their implementation files into World Engine.
- Put unavoidable cross-project integration behind a named World Engine adapter or runtime URL.
- Keep Azgaar protocol validation and Canon conversion on the World Engine side; do not move Canon behavior into Azgaar.
- Keep the generated map runtime derived from its source and run the freshness check after syncing.
- Treat the Armoria host copy as distinct from its source tree until a deliberate, reproducible sync process is established.
- Update both sides of the Azgaar message contract when its protocol changes, then run the relevant source build and runtime check.
