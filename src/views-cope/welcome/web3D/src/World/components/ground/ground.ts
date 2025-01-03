import * as THREE from "three";

// import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js";
// import { useScannerDataStore } from "@/store/modules/scannerData";
import Urls from "@/store/urls";
import axios from "axios";
const scannerDataUrl = Urls.ScannerData.GetArray;

let cnt = 0;
let ground;
// let texture;

// const multi = 13;
// const groundHeight = 64;
// const groundWidth = 17;
// const worldWidth = multi * groundHeight,
//   worldDepth = multi * groundWidth + 1;

async function loadGround() {
  const ans = (await axios.get(scannerDataUrl)).data;
  const l = ans.data[0];
  const r = ans.data[ans.data.length - 3];
  const newVertices = ans.data;
  const worldWidth = ans.length;
  const worldDepth = ans.width;

  const newGeometry = new THREE.PlaneBufferGeometry(
    // ans.length, //料场的长度
    // ans.width, //料场的宽度
    r - l - 10,
    7,
    worldWidth - 1,
    worldDepth - 1
  );
  const newData = new Float32Array(worldWidth * worldDepth);
  const array = newGeometry.attributes.position.array;
  for (let i = 0; i < array.length; i++) {
    // if (i % 3 === 0) array[i] = newVertices[i];
    // if (i % 3 === 1) array[i] = newVertices[i];
    if (i % 3 === 2)
      array[i] = newVertices[i] < 0 ? newVertices[i] : -newVertices[i];
    // array[i] = newVertices[i];
  }
  for (let i = 0; i < worldWidth * worldDepth; i++) {
    newData[i] =
      newVertices[3 * i + 2] < 0
        ? newVertices[3 * i + 2]
        : -newVertices[3 * i + 2];
  }
  let newTexture = new THREE.CanvasTexture(
    generateTexture(newData, worldWidth, worldDepth)
  );
  newTexture.wrapS = THREE.ClampToEdgeWrapping;
  newTexture.wrapT = THREE.ClampToEdgeWrapping;
  newTexture.colorSpace = THREE.SRGBColorSpace;

  ground = new THREE.Mesh(
    newGeometry,
    // new THREE.MeshBasicMaterial({ map: newTexture })
    new THREE.MeshStandardMaterial({
      map: newTexture,
      // color: 0x00ff00,
      side: THREE.DoubleSide
      // wireframe: true
    })
  );
  // ground.rotation.x = Math.PI / 2;
  ground.position.x += 40;
  ground.position.y += 8.5;
  ground.tick = async () => {
    if (++cnt % 30 !== 0) return;
    const ans = (await axios.get(scannerDataUrl)).data;
    const newVertices = ans.data;
    const worldWidth = ans.length;
    const worldDepth = ans.width;

    const newGeometry = new THREE.PlaneBufferGeometry(
      // ans.length, //料场的长度
      // ans.width, //料场的宽度
      ans.length * 0.1,
      4,
      worldWidth - 1,
      worldDepth - 1
    );
    const newData = new Float32Array(worldWidth * worldDepth);
    const array = newGeometry.attributes.position.array;

    for (let i = 0; i < array.length; i++) {
      // if (i % 3 === 0) array[i] = newVertices[i] - 32;
      if (i % 3 === 2) array[i] = 2;
      // if (i % 3 === 1) array[i] = newVertices[i];
      // if (i % 3 === 2) array[i] = newVertices[i];
    }
    for (let i = 0; i < worldWidth * worldDepth; i++) {
      newData[i] = newVertices[3 * i + 1];
    }
    let newTexture = new THREE.CanvasTexture(
      generateTexture(newData, worldWidth, worldDepth)
    );
    newTexture.wrapS = THREE.ClampToEdgeWrapping;
    newTexture.wrapT = THREE.ClampToEdgeWrapping;
    newTexture.colorSpace = THREE.SRGBColorSpace;

    ground.material.map = newTexture;
    ground.geometry = newGeometry;
  };
  return ground;
  // scene.add(mesh);
}

// function generateHeight(width, height) {
//   const size = width * height,
//     // data = new Uint8Array(size),
//     data = new Float32Array(size),
//     perlin = new ImprovedNoise(),
//     z = Math.random() * 100;

//   let quality = 1;

//   for (let j = 0; j < 4; j++) {
//     for (let i = 0; i < size; i++) {
//       const x = i % width,
//         y = Math.floor(i / width);
//       data[i] += Math.abs(
//         perlin.noise(x / quality, y / quality, z) * quality * 1.75
//       );
//     }

//     quality *= 5;
//   }

//   return data;
// }

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
  }

  context.putImageData(image, 0, 0);

  // Scaled 4x

  const canvasScaled = document.createElement("canvas");
  canvasScaled.width = width * 4;
  canvasScaled.height = height * 4;

  context = canvasScaled.getContext("2d");
  context.scale(4, 4);
  context.drawImage(canvas, 0, 0);

  image = context.getImageData(0, 0, canvasScaled.width, canvasScaled.height);
  imageData = image.data;

  for (let i = 0, l = imageData.length; i < l; i += 4) {
    const v = ~~(Math.random() * 5);

    imageData[i] += v;
    imageData[i + 1] += v;
    imageData[i + 2] += v;
  }

  context.putImageData(image, 0, 0);

  return canvasScaled;
}

// async function loadGround() {
//   return await init();
// }

export { loadGround };
