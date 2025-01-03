import * as THREE from "three";

let loadFloor = function () {
  let geometry = new THREE.PlaneGeometry(200, 200, 1, 1);
  let material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
  let floor = new THREE.Mesh(geometry, material);
  floor.receiveShadow = true;
  return floor;
};

export { loadFloor };
