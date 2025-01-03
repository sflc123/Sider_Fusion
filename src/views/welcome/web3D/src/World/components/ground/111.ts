import * as THREE from "three";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
import { throttle } from "@pureadmin/utils";
import { API, useRequest } from "@/store/urls";
const { requestUrl } = useRequest();

let ground;
let loader = new THREE.TextureLoader(); // 创建一个纹理加载器
const exrLoader = new EXRLoader();
const loadTexture = () => {
  //基础
  loader.load(
    "public/textureMap/textures4/red_laterite_soil_stones_diff_4k.jpg",
    texture => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(5, 5);
      ground.material.map = texture;
      ground.material.needsUpdate = true;
    },
    undefined,
    err => {
      console.error("Failed to load texture:", err);
    }
  );
  // 置换
  // loader.load(
  //   "public/textureMap/textures4/red_laterite_soil_stones_disp_4k.png",
  //   displacementTexture => {
  //     ground.material.displacementMap = displacementTexture;
  //     ground.material.displacementScale = 0.5;

  //     ground.material.needsUpdate = true;
  //   },
  //   undefined,
  //   err => {
  //     console.error("Failed to load normal map:", err);
  //   }
  // );
  // 糙度
  // exrLoader.load(
  //   "public/textureMap/textures4/red_laterite_soil_stones_rough_4k.exr",
  //   roughnessTexture => {
  //     ground.material.roughnessMap = roughnessTexture;
  //     ground.material.needsUpdate = true;
  //   },
  //   undefined,
  //   err => {
  //     console.error("Failed to load roughnessMap map:", err);
  //   }
  // );
  // 法线;
  // exrLoader.load(
  //   "public/textureMap/textures4/red_laterite_soil_stones_nor_gl_4k.exr",
  //   normalTexture => {
  //     ground.material.normalMap = normalTexture;
  //     ground.material.needsUpdate = true;
  //   },
  //   undefined,
  //   err => {
  //     console.error("Failed to load normal map:", err);
  //   }
  // );
};
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

  loadTexture();

  let ans;
  ground.tick = throttle(async () => {
    try {
      await API.ScannerData.GetArray(requestUrl).then(res => {
        ans = res;
      });

      console.log("ans is 111 -->", ans);
      if (!ans) return null;
      const l = ans.data[0];
      const r = ans.data[ans.data.length - 3];
      const newVertices = ans.data;
      const worldWidth = ans.length;
      const worldDepth = ans.width;

      const newGeometry = new THREE.PlaneGeometry(
        r - l,
        14,
        worldWidth - 1,
        worldDepth - 1
      );

      // 使用新的几何体更新顶点
      const array = newGeometry.attributes.position.array;
      for (let i = 0; i < array.length; i++) {
        if (i % 3 === 0) array[i] *= 0.8;
        if (i % 3 === 1) array[i] = newVertices[i];
        if (i % 3 === 2)
          array[i] = newVertices[i] < 0 ? -newVertices[i] : newVertices[i];
      }

      ground.geometry.dispose(); // 释放之前的几何体
      ground.geometry = newGeometry; // 更新几何体

      ground.position.x = ((r - l) * 4) / 10 + (l / 5) * 4;
      ground.position.y = 8;
    } catch (err) {
      console.log("load ground failed", err);
    }
  }, 3000);

  return ground;
}
export { loadGround };
