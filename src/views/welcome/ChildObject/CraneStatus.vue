<template>
  <div
    class="bg-[url('..\views\welcome\ChildObject\picture\7.png')] h-full w-full bg-center bg-contain bg-no-repeat justify-center items-center"
    style="display: flex; flex-wrap: wrap"
  >
    <div class="demo-progress flex flex-1">
      <el-progress :percentage="80" :stroke-width="15" striped />
      <el-progress
        :percentage="50"
        :stroke-width="15"
        status="warning"
        striped
        striped-flow
      />
      <el-progress
        :percentage="80"
        :stroke-width="15"
        status="success"
        striped
        striped-flow
        :duration="10"
      />
      <el-progress
        :percentage="percentage"
        :stroke-width="15"
        status="exception"
        striped
        striped-flow
        :duration="duration"
      />
      <el-button-group>
        <el-button :icon="Minus" @click="decrease" />
        <el-button :icon="Plus" @click="increase" />
      </el-button-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import axios from "axios";
import { Minus, Plus } from "@element-plus/icons-vue";
import { KuGuanSystemVariables } from "@/utils/ReadPlcInterface";
// 定义并启动定时器，不建议在组件加载时就启动，除非有特定需求
// 如果确实需要启动，确保在组件卸载时清除
let timerId: number | undefined;
const percentage = ref<number>(70);
const duration = computed(() => Math.floor(percentage.value / 10));
// 创建一个对象，该对象满足KuGuanSystemVariables接口的结构
const myKuGuanSystemVars = ref<KuGuanSystemVariables>({
  watchdog: 1000, // 示例值
  taskType: 0,
  targetOpening: 0,
  instructionStatus: 0,
  operationCommand: 0,
  targetX: 68850,
  targetY: 12560,
  targetZ: 3500,
  gripWeight: 16000,
  fullBucketWeight: 16000
});
const increase = () => {
  percentage.value += 10;
  if (percentage.value > 100) {
    percentage.value = 100;
  }
};
const decrease = () => {
  percentage.value -= 10;
  if (percentage.value < 0) {
    percentage.value = 0;
  }
};
onMounted(() => {
  // 示例：组件挂载后开始定时递增，这里只是展示用法
  // timerId = window.setInterval(() => {
  //   myKuGuanSystemVars.value.targetOpening <= 100
  //     ? (myKuGuanSystemVars.value.targetOpening += 1)
  //     : (myKuGuanSystemVars.value.targetOpening = 0);
  //   myKuGuanSystemVars.value.taskType >= 0
  //     ? (myKuGuanSystemVars.value.taskType -= 1)
  //     : (myKuGuanSystemVars.value.taskType = 100);
  // }, 100);
});
</script>
<style>
.demo-progress {
  display: flex;
  flex-direction: column; /*垂直堆叠子项 */
  align-items: center; /* 水平居中子对象 */
  justify-content: center; /* 如果容器具有定义的高度，则将子对象垂直居中 */
  height: 100%; /* 如果要垂直居中，请设置高度*/
}
.demo-progress .el-progress--line {
  margin-bottom: 20px;
  margin-top: 0px;
  max-width: 400px;
  width: 25%; /* 可选：如果希望进度条扩展到容器的宽度 */
}
</style>
