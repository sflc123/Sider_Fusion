import { Color } from "three";
// import { Fog } from "three";
import { Scene } from "three";

function createScene() {
  const scene = new Scene();
  scene.background = new Color(0xf8f9fa);
  // scene.background = new Color(0x000000);
  // scene.fog = new Fog(0x000000, 500, 1400);
  // scene.background = new Color(0xffffff);

  return scene;
}

export { createScene };
