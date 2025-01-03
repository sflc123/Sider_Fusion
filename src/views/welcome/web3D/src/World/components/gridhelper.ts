// import { BufferGeometry, LineSegments, LineBasicMaterial, Object3D } from "three";
import * as THREE from "three";

function createGridHelper() {
  // const geometry = new THREE.BufferGeometry();
  // 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
  // 因为在两个三角面片里，这两个顶点都需要被用到。
  // let vertices = [];
  const width = 76.8;
  const height = 20;
  const depth = -0.6;
  let ans = new THREE.Group();
  for (let k = 0; k < 16; k++) {
    const g = new THREE.BufferGeometry();
    let v = [];
    let b = k * (width / 16);
    let e = (k + 1) * (width / 16);
    for (let i = b; i < e; i++) {
      v.push(i, -3, depth);
      v.push(i, height, depth);
    }
    for (let j = -3; j < height; j++) {
      v.push(b, j, depth);
      v.push(e, j, depth);
    }
    g.setAttribute("position", new THREE.Float32BufferAttribute(v, 3));
    let m;
    if (k % 2 === 1) m = new THREE.LineBasicMaterial({ color: "red" });
    else m = new THREE.LineBasicMaterial({ color: "yellowgreen" });
    ans.add(new THREE.LineSegments(g, m));
  }
  return ans;
  // for (let i = 0; i <= width; i++) {
  //   vertices.push(i, 0, 0);
  //   vertices.push(i, height, 0);
  // }
  // for (let j = 0; j <= height; j++) {
  //   vertices.push(0, j, 0);
  //   vertices.push(width, j, 0);
  // }
  // // itemSize = 3 因为每个顶点都是一个三元组。
  // geometry.setAttribute(
  //   "position",
  //   new THREE.Float32BufferAttribute(vertices, 3)
  // );
  // const material = new THREE.LineBasicMaterial({ color: "black" });
  // const mesh = new THREE.LineSegments(geometry, material);
  // return mesh;
}

export { createGridHelper };
