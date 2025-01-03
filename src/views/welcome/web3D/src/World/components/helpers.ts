import { AxesHelper, GridHelper } from "three";

function createAxesHelper() {
  const helper = new AxesHelper(10);
  helper.position.set(-1, -1, 0);
  return helper;
}

function createGridHelper() {
  const size = 23.7;
  const helper = new GridHelper(size, size);
  // rotation the grid around the x-axis by 90 degrees
  helper.rotation.x = Math.PI / 2;

  helper.position.x = size / 2;
  helper.position.y = size / 2;

  return helper;
}

export { createAxesHelper, createGridHelper };
