import { Vector3 } from "three";

import { createCamera } from "./components/camera";
// import { createAxesHelper, createGridHelper } from "./components/helpers";
import { createGridHelper } from "./components/gridhelper";
import { createLights } from "./components/lights";
import { createScene } from "./components/scene";

import { createControls } from "./systems/controls";
import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";
import { Loop } from "./systems/Loop";

import { loadCrane } from "./components/crane/crane";
import { loadGround } from "./components/ground/ground";
// import { loadGroundRaw } from "./components/ground/groundraw";

let camera;
let controls;
let renderer;
let scene;
let loop;

class World {
  constructor(container) {
    // loadGroundRaw(container);
    // return;
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    controls = createControls(camera, renderer.domElement);
    const { ambientLight, mainLight } = createLights();

    loop.updatables.push(controls);
    scene.add(ambientLight, mainLight);

    new Resizer(container, camera, renderer);
    // const resizer = new Resizer(container, camera, renderer);
    // resizer.onResize = () => {
    //   this.render();
    // };

    scene.add(createGridHelper());
  }

  async init() {
    const crane = await loadCrane();
    const ground = await loadGround();
    ground.rotation.x = -Math.PI;
    scene.add(ground);
    // loop.updatables.push(ground);
    loop.updatables.push(crane);
    controls.target.copy(new Vector3(40, 20, 3));
    scene.add(crane);
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
