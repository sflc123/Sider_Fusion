import {
  DirectionalLight,
  PointLight,
  HemisphereLight,
  AmbientLight
} from "three";

function createLights() {
  const hemisphereLight = new HemisphereLight("white", "darkslategrey", 2);
  const ambientLight = new AmbientLight("white", 0.5);

  const pointLight = new PointLight("white", 2000);
  pointLight.castShadow = true;
  pointLight.position.set(40, -20, 20);
  const pointLight1 = new PointLight("white", 2000);
  pointLight1.castShadow = true;
  pointLight1.position.set(30, -20, 20);
  const pointLight2 = new PointLight("white", 2000);
  pointLight2.castShadow = true;
  pointLight2.position.set(20, -10, 6);
  const pointLight3 = new PointLight("white", 2000);
  pointLight3.castShadow = true;
  pointLight3.position.set(50, -10, 20);
  const pointLight4 = new PointLight("white", 2000);
  pointLight4.castShadow = true;
  pointLight4.position.set(60, -10, 20);

  const mainLight = new DirectionalLight("white", 5);
  mainLight.castShadow = true;
  mainLight.position.set(200, -200, 100);
  mainLight.target.position.set(0, 0, 0);
  // 配置阴影相机
  mainLight.shadow.camera.near = 0.5;
  mainLight.shadow.camera.far = 500;
  mainLight.shadow.camera.left = -100;
  mainLight.shadow.camera.right = 100;
  mainLight.shadow.camera.top = 100;
  mainLight.shadow.camera.bottom = -100;
  // 配置阴影分辨率
  mainLight.shadow.mapSize.width = 2048; // 默认值 512
  mainLight.shadow.mapSize.height = 2048; // 默认值 512

  // 调整日光参数
  const sunLight = new DirectionalLight(0xffffff, 8);
  sunLight.castShadow = true;
  sunLight.position.set(40, -15, 50);
  // 配置阴影相机
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 500;
  sunLight.shadow.camera.left = -100;
  sunLight.shadow.camera.right = 100;
  sunLight.shadow.camera.top = 100;
  sunLight.shadow.camera.bottom = -100;
  // 配置阴影分辨率
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;

  return {
    ambientLight,
    mainLight,
    hemisphereLight,
    pointLight,
    pointLight1,
    pointLight2,
    pointLight3,
    pointLight4,
    sunLight
  };
}

export { createLights };
