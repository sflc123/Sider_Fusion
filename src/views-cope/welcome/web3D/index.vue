<template>
  <div ref="threeCanvas" />
</template>

<script lang="ts">
import { World } from "./src/World/World";
export default {
  name: "Web3D",
  async mounted() {
    const world = new World(this.$refs.threeCanvas);
    await world.init();
    world.start();
    // init(world);
  }
};
</script>

<style scoped>
div {
  border-radius: 30px;
}
.web3D {
  border-radius: 30px;
}
</style>
