import { Color } from "three";
import { Scene } from "three";

function createScene() {
  const scene = new Scene();

  scene.background = new Color(0xf8f9fa);
  // scene.background = new Color(0xffffff);

  return scene;
}

export { createScene };
