import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);

  // controls.enableDamping = true;

  // controls.enableRotate = false;
  // controls.enableZoom = false;
  // controls.enablePan = false;

  // controls.target.y = 1;

  // forward controls.update to our custom .tick method
  controls.tick = () => controls.update();

  return controls;
}

export { createControls };
