import { WebGLRenderer } from "three";

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true });

  // turn on the physically correct lighting model
  renderer.physicallyCorrectLights = true;

  // enable shadows
  renderer.shadowMap.enabled = true;

  return renderer;
}

export { createRenderer };
