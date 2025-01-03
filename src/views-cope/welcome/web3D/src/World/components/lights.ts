import { DirectionalLight } from "three";
import { PointLight } from "three";
import { HemisphereLight } from "three";
import { AmbientLight } from "three";

function createLights() {
  const hemisphereLight = new HemisphereLight("white", "darkslategrey", 2);
  const ambientLight = new AmbientLight("white", 6);

  const pointLight = new PointLight("white", 600);
  pointLight.position.set(-20, -30, 30);

  const mainLight = new DirectionalLight("white", 3);

  mainLight.position.set(10, 10, 10);

  return { ambientLight, mainLight, hemisphereLight, pointLight };
}

export { createLights };
