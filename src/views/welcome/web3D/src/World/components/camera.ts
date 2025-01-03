// import { Vector3 } from "three";
import { PerspectiveCamera } from "three";
// import { OrthographicCamera } from "three";
// import { CubeCamera } from "three";
// import { StereoCamera } from "three";

function createCamera() {
  const camera = new PerspectiveCamera(
    35, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    1000 // far clipping plane
  );

  // const camera = new OrthographicCamera(
  //   -40, // left
  //   40, // right
  //   10, // top
  //   -10, // bottom
  //   0.1, // near clipping plane
  //   1000 // far clipping plane
  // );

  // const camera = new CubeCamera(1, 1000, 256);

  // const camera = new StereoCamera();

  // move the camera back so we can view the scene
  camera.position.set(40, -92, 35);
  // camera.lookAt(new Vector3(12, 12, 0));
  // camera.rotation.y = Math.PI / 4;

  return camera;
}

export { createCamera };
