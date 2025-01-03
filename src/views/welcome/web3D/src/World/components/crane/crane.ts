import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { Group } from "three";
import { ref, watch } from "vue";
// import Urls from "@/store/urls";
// import axios from "axios";
import { useCraneStatusStore } from "@/store/modules/craneStatus";
const store = useCraneStatusStore();
let curruntLocation = ref({
  x: 20,
  y: 2,
  z: -5,
  openRatio: 0
});

async function loadCrane() {
  // const loader1 = new FBXLoader();

  // try {
  //   const craneData = await new Promise((resolve, reject) => {
  //     loader1.load("/public/models/crane2.fbx", resolve, undefined, reject);
  //   });

  //   console.log("cranedata", craneData);
  //   // 添加到场景或进一步处理...
  // } catch (error) {
  //   console.error("Error loading FBX:", error);
  // }
  const loader = new GLTFLoader();

  const craneData = await loader.loadAsync("/public/models/crane4.glb");
  console.log("cranedata", craneData, craneData.scene.children.length);

  let largeVehicle;
  let smallVehicle;
  let orbitFar;
  let orbitNear;
  let crabBucketLeft;
  let crabBucketRight;
  let ground;

  const marks = new Group();
  largeVehicle = craneData.scene.getObjectByName("largeVehicle");
  smallVehicle = craneData.scene.getObjectByName("smallVehicle");
  orbitFar = craneData.scene.getObjectByName("orbitFar");
  orbitNear = craneData.scene.getObjectByName("orbitNear");
  crabBucketLeft = craneData.scene.getObjectByName("bucketLeft");
  crabBucketRight = craneData.scene.getObjectByName("bucketRight");
  ground = craneData.scene.getObjectByName("立方体");
  for (let i = 0, l = craneData.scene.children.length; i < l; i++) {
    marks.add(craneData.scene.children[0]);
  }
  const beginleft = crabBucketLeft.rotation.y;
  const beginright = crabBucketRight.rotation.y;

  const gcrabBucket = new Group();
  gcrabBucket.add(crabBucketLeft);
  gcrabBucket.add(crabBucketRight);

  const gsmallVehicle = new Group();
  gsmallVehicle.add(smallVehicle);
  gsmallVehicle.add(gcrabBucket);

  const glargeVehicle = new Group();
  glargeVehicle.add(largeVehicle);
  glargeVehicle.add(gsmallVehicle);
  const groundBack = new Group();
  groundBack.add(ground);

  const crane = new Group();
  // method 1:
  // crane.add(orbitFar, orbitNear, largeVehicle, smallVehicle, crabBucket);

  // method 2:
  console.log("marks", marks);
  for (let i = 0; i < marks.children.length; i++) {
    marks.children[i].position.x -= 2.4;
  }
  crane.add(orbitFar, orbitNear, glargeVehicle, groundBack, marks);

  crane.rotation.x = Math.PI / 2;

  crane.moveTo = (x, y, z) => {
    glargeVehicle.position.x = x;
    gsmallVehicle.position.z = z;
    gcrabBucket.position.y = y;
    crabBucketLeft.rotation.y =
      beginleft + (curruntLocation.value.openRatio * Math.PI) / 200;
    crabBucketRight.rotation.y =
      beginright + (curruntLocation.value.openRatio * Math.PI) / 200;
  };
  crane.moveTo(0, 0, 0);

  let cnt = 0;

  watch(
    () => store.CraneInfoMation,
    newVal => {
      if (newVal) {
        console.log("Updated CurrentPosition:", newVal);
      }
    },
    { immediate: true }
  );

  crane.tick = async () => {
    // console.log("Store current location:", store.CurrentPosition);
    // if (!store.curruntLocation) {
    //   console.error("curruntLocation is undefined");
    //   return;
    // }
    // console.log(
    //   "45454545454",
    //   store.curruntLocation.x,
    //   store.curruntLocation.y,
    //   store.curruntLocation.z
    // );
    // console.log("crane is 222", "");
    if (++cnt % 15 !== 0) return;
    curruntLocation.value.x = store.CraneInfoMation.currentX / 1000;
    curruntLocation.value.y = store.CraneInfoMation.currentZ / 1000;
    curruntLocation.value.z = -(store.CraneInfoMation.currentY / 1000);

    crane.moveTo(
      curruntLocation.value.x * 0.8,
      curruntLocation.value.y,
      curruntLocation.value.z
    );
    crabBucketLeft.rotation.y =
      beginleft + ((100 - store.CraneInfoMation.openRatio) * Math.PI) / 200;
    crabBucketRight.rotation.y =
      beginright + ((100 - store.CraneInfoMation.openRatio) * Math.PI) / 200;
  };

  return crane;
}

export { loadCrane };
