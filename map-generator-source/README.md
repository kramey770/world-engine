# World Engine Map Generator Source

This is the vendored Fantasy Map Generator renderer source used for World Engine map integration.

- Upstream repository: https://github.com/Azgaar/Fantasy-Map-Generator
- Pinned source commit: `b86434aa193c85b176d23fb1fd4ed62664af86d3`
- Runtime version: `1.149.2`
- Build: `pnpm run build` (`tsc && vite build`)
- Node: `>=24.0.0`

`public/main.js` contains the World Engine bridge preserved from the deployed map runtime. The root application continues to serve the checked-in runtime in `public/fantasy-map-generator`; this project is the maintainable source/build owner for later map runtime changes.

Do not hand-edit generated bundles. From the repository root, run `pnpm sync:map-runtime` to clean-build this project and replace the served runtime in `public/fantasy-map-generator`. The build intentionally removes stale hashed chunks so an older map UI cannot be resurrected by an obsolete generated asset. The service worker cache version must be changed when the runtime presentation changes.
