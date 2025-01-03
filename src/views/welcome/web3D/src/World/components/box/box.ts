import * as THREE from "three";

let loadBox = function () {
  let geometry = new THREE.BoxGeometry(3, 3, 3);
  let material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  let box = new THREE.Mesh(geometry, material);
  box.position.set(50, 4, 7);
  box.castShadow = true;
  return box;
};

export { loadBox };
