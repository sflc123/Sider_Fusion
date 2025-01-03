<template>
  <div class="h-full w-full pt-1">
    <!-- <echarts class="echart" :option="option" /> -->
    <el-text style="font-size: 3rem" type="success"> 一号天车 </el-text>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
const option = ref({
  graphic: {
    elements: [
      {
        type: "text",
        left: "center",
        top: "top",
        style: {
          text: "智能天车WMS系统",
          fontSize: 28,
          // fontWeight: "bold",
          lineDash: [0, 200],
          lineDashOffset: 0,
          fill: "transparent",
          stroke: "white",
          lineWidth: 1
        },
        keyframeAnimation: {
          // duration: 1000,
          loop: false,
          keyframes: [
            {
              percent: 0.5,
              style: {
                fill: "transparent",
                lineDashOffset: 200,
                lineDash: [200, 0]
              }
            },

            {
              percent: 1,
              style: {
                fill: "default"
              }
            }
          ]
        }
      }
    ]
  }
});
onMounted(() => {});
</script>
<style></style>
