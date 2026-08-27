import App from "./components/App.svelte";
import "scripts/aliases";

const app = new App({
  target: document.body,
  props: {}
});

export default app;