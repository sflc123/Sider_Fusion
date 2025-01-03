import * as THREE from "three";
import { debounce } from "@pureadmin/utils";
// import { throttle } from "@pureadmin/utils";

// import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js";
// import { useScannerDataStore } from "@/store/modules/scannerData";
import Urls from "@/store/urls";
import axios from "axios";
const scannerDataUrl = Urls.ScannerData.GetArray;

// import { API, useRequest } from "@/store/urls";
// const { requestUrl, cancelRequest } = useRequest();
// let cnt = 0;
let ground;
let loader = new THREE.TextureLoader();

function loadGround() {
  ground = new THREE.Mesh(
    new THREE.PlaneGeometry(0, 0),
    new THREE.MeshPhongMaterial({
      roughness: 0.5,
      side: THREE.DoubleSide
    })
  );
  ground.receiveShadow = true;
  ground.castShadow = true;

  // ground.rotation.x = Math.PI / 2;

  // ground.position.y;
  // const immediateDebounce = debounce(ExecuteWork2, 1000, true);
  ground.tick = debounce(
    async () => {
      let ans;
      // API.ScannerData.GetArray(requestUrl)
      //   .then(res => {
      //     console.log("res is -->", res);
      //     if (res.status === 200) {
      //       ans = [res];
      //     }
      //   })
      //   .catch(err => {
      //     console.log("load ground failed", err);
      //   });
      await axios
        .get(scannerDataUrl)
        .then(response => {
          if (response.status === 200) {
            ans = response.data;
          }
        })
        .catch(err => {
          console.log("load ground failed", err);
        });
      console.log("ans is -->", ans);
      if (ans === null || ans === undefined) return null;

      const l = ans.data[0];
      const r = ans.data[ans.data.length - 3];
      const newVertices = ans.data;
      const worldWidth = ans.length;
      const worldDepth = ans.width;

      // console.log("l is -->", l);
      // console.log("r is -->", r);
      const newGeometry = new THREE.PlaneGeometry(
        r - l,
        14,
        worldWidth - 1,
        worldDepth - 1
      );
      const newData = new Float32Array(worldWidth * worldDepth);
      const array = newGeometry.attributes.position.array;

      for (let i = 0; i < array.length; i++) {
        if (i % 3 === 0) array[i] *= 0.8;
        if (i % 3 === 1) array[i] = newVertices[i];
        if (i % 3 === 2)
          array[i] = newVertices[i] < 0 ? -newVertices[i] : newVertices[i];
        // array[i] = newVertices[i];
        // array[i] = newVertices[i];
      }

      for (let i = 0; i < worldWidth * worldDepth; i++) {
        newData[i] =
          newVertices[3 * i + 2] < 0
            ? -newVertices[3 * i + 2]
            : newVertices[3 * i + 2];
      }
      let newTexture = new THREE.CanvasTexture(
        generateTexture(newData, worldWidth, worldDepth)
      );
      newTexture.wrapS = THREE.ClampToEdgeWrapping;
      newTexture.wrapT = THREE.ClampToEdgeWrapping;
      newTexture.colorSpace = THREE.SRGBColorSpace;

      ground.position.x = ((r - l) * 4) / 10 + (l / 5) * 4;
      ground.position.y = 8;
      // ground.material.map = newTexture;

      // 定义纹理的尺寸（例如 256x256）
      const width = 256;
      const height = 256;

      // 创建一个包含纯色像素数据的 Uint8Array
      // 例如，红色 (255, 0, 0)
      const data = new Uint8Array(width * height * 3);
      for (let i = 0; i < data.length; i += 3) {
        data[i] = 255; // 红色分量
        data[i + 1] = 255; // 绿色分量
        data[i + 2] = 255; // 蓝色分量
      }

      // 创建纹理
      const texture1 = new THREE.DataTexture(
        data,
        width,
        height,
        THREE.RGBFormat
      );
      ground.material.map = texture1;
      ground.material.map = loader.load("./public/pictures/brown4k.jpg");
      ground.geometry = newGeometry;
    },
    3000,
    true
  );
  ground.tick();
  return ground;
}

function generateTexture(data, width, height) {
  // bake lighting into texture

  let context, image, imageData, shade;

  const vector3 = new THREE.Vector3(0, 0, 0);

  const sun = new THREE.Vector3(1, 1, 1);
  sun.normalize();

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  context = canvas.getContext("2d");
  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);

  image = context.getImageData(0, 0, canvas.width, canvas.height);
  imageData = image.data;

  for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
    vector3.x = data[j - 2] - data[j + 2];
    vector3.y = 2;
    vector3.z = data[j - width * 2] - data[j + width * 2];
    vector3.normalize();

    shade = vector3.dot(sun);

    const scale = 0.5 + data[j] * 0.007;
    imageData[i] = (96 + shade * 128) * scale;
    imageData[i + 1] = (32 + shade * 96) * scale;
    imageData[i + 2] = shade * 96 * scale;

    // const scale = 0.5 + data[j] * 0.003;
    // imageData[i] = (90 + shade * 98) * scale;
    // imageData[i + 1] = (103 + shade * 102) * scale;
    // imageData[i + 2] = (107 + shade * 101) * scale;
  }
}
export { loadGround };
