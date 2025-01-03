<template>
  <div id="threeCanvas" ref="threeCanvas" />
</template>

<script setup lang="ts">
import { World } from "./src/World/World";
import { defineComponent, onUnmounted } from "vue";
import { onMounted } from "vue";
import * as signalR from "@microsoft/signalr";

defineComponent({
  name: "web3D"
});
let connection;
let world;
onMounted(async () => {
  world = new World(document.getElementById("threeCanvas"));
  try {
    await world.init();
    world.start();
  } catch (error) {
    console.log("Wed 3D 页面加载错误：", error);
  }

  const options = {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets
  };
  connection = new signalR.HubConnectionBuilder()
    .withUrl("http://192.168.1.129:5078/Hubs/SysHub", options)
    .withAutomaticReconnect()
    .build();
  await connection.start();
  connection.on("ReceivePointCloudMessage", msg => {
    // store.AddInfoPrompt(msg);
    console.log("接收到帧数据消息：", msg);
    // console.log("接收到消息pinia：", store.InfoPrompt, store.infoPrompt.length);
  });
});

onUnmounted(() => {
  world.stop();
});
</script>

<style scoped>
div {
  border-radius: 30px;
}
.web3D {
  border-radius: 30px;
}
</style>
