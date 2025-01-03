import type { App } from "vue";
import { createPinia } from "pinia";
// import { useCraneStatusStore } from "../store/modules/craneStatus";

const store = createPinia();

export function setupStore(app: App<Element>) {
  app.use(store);

  // const craneStatusStore = useCraneStatusStore();

  // let number = 1;
  // setInterval(async () => {
  //   await craneStatusStore.tick(++number);
  // }, 100);
}

export { store };
