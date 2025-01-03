import { Vector3 } from "three";
// import * as THREE from "three";
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
// import { loadBox } from "./components/box/box";
// import { loadFloor } from "./components/floor/floor";
// import { loadGround } from "./components/ground/111";
// import { loadGround } from "./components/ground/ground";
// import { loadMark } from "./components/mark/mark";
// import { init } from "./components/mark/marks(1)";
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
    // const box = loadBox();
    // if (box) scene.add(box);

    // const floor = loadFloor();
    // if (floor) scene.add(floor);

    const crane = await loadCrane();
    if (crane) scene.add(crane);
    loop.updatables.push(crane);

    // const ground = loadGround();
    // if (ground) {
    //   scene.add(ground);
    //   loop.updatables.push(ground);
    // }

    // await init(scene);
    // ground.rotation.x = -Math.PI;
    // const mark = loadMark();
    // scene.add(mark);
    // console.log("--->>>mark-->>>>", mark);

    controls.target.copy(new Vector3(40, 18, 3));
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
