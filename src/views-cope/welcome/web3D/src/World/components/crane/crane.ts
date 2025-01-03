import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
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
  const loader = new GLTFLoader();

  const craneData = await loader.loadAsync("/public/models/crane2-2.glb");

  // for (let i = 0; i < craneData.scene.children.length; i++) {
  //   console.log(craneData.scene.children[i]);
  // }
  const largeVehicle = craneData.scene.children[0];
  const smallVehicle = craneData.scene.children[1];
  const orbitFar = craneData.scene.children[2];
  const orbitNear = craneData.scene.children[3];
  const crabBucketLeft = craneData.scene.children[4];
  const crabBucketRight = craneData.scene.children[5];
  // const backGround = craneData.scene.children[6];

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

  const crane = new Group();
  // method 1:
  // crane.add(orbitFar, orbitNear, largeVehicle, smallVehicle, crabBucket);

  // method 2:
  crane.add(orbitFar, orbitNear, glargeVehicle);

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
    () => store.CurrentPosition,
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
    if (++cnt % 15 !== 0) return;
    // let location = await axios.get(Urls.PlcStatus.ReadCurrentLocation);
    curruntLocation.value.x = store.CurrentPosition.x / 1000;
    curruntLocation.value.y = store.CurrentPosition.z / 1000;
    curruntLocation.value.z = -(store.CurrentPosition.y / 1000);
    // console.log(store.CurrentPosition);

    crane.moveTo(
      curruntLocation.value.x * 0.8,
      curruntLocation.value.y,
      curruntLocation.value.z
    );
    crabBucketLeft.rotation.y =
      beginleft + ((100 - store.OpenRatio) * Math.PI) / 200;
    crabBucketRight.rotation.y =
      beginright + ((100 - store.OpenRatio) * Math.PI) / 200;
  };

  return crane;
}

export { loadCrane };
