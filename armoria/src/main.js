import App from "./components/App.svelte";
import "scripts/aliases";
import {mount} from "svelte";

const app = mount(App, {
  target: document.body,
  props: {}
});

export default app;