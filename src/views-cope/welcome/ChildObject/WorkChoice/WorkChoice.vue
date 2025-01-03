<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { TabsInstance } from "element-plus";
//将三个子页面添加进
import PouringMode from "./CraneMode/PouringMode.vue";
import LoadingMode from "./CraneMode/LoadingMode.vue";
import DefaultMode from "./CraneMode/DefaultMode.vue";
import craneOperation from "./CraneMode/craneOperation.vue";
const prop = defineProps<{
  api: any;
  AddAlarm: any;
  ApiUrl: any;
}>();
const tabPosition = ref<TabsInstance["tabPosition"]>("top");
const options = [
  { value: "PouringMode", label: "倒料模式" },
  { value: "LoadingMode", label: "装车模式" },
  { value: "craneOperation", label: "行车操作" },
  { value: "DefaultMode", label: "休息模式" }
];
const activeTab = options[0].value;

// 定义处理函数
function handleTabClick(tab) {
  switch (tab.props.name) {
    case "PouringMode":
      prop.AddAlarm({
        date: new Date().toLocaleString(),
        name: "操作区",
        address: "切换到倒料模式",
        tag: "常规"
      });
      break;
    case "LoadingMode":
      prop.AddAlarm({
        date: new Date().toLocaleString(),
        name: "操作区",
        address: "切换到装车模式",
        tag: "常规"
      });
      break;
    case "DefaultMode":
      prop.AddAlarm({
        date: new Date().toLocaleString(),
        name: "操作区",
        address: "切换到休息模式",
        tag: "常规"
      });
      break;
    case "craneOperation":
      prop.AddAlarm({
        date: new Date().toLocaleString(),
        name: "操作区",
        address: "切换到行车操作模式",
        tag: "常规"
      });
      break;
    default:
      prop.AddAlarm({
        date: new Date().toLocaleString(),
        name: "操作区",
        address: "未知模式",
        tag: "常规"
      });
      break;
  }
} //操作区域显示接口
const uRL = [
  //撤销
  prop.ApiUrl.PlcManipulate.UndoTask,
  //暂停
  prop.ApiUrl.PlcManipulate.PauseTask,
  //继续
  prop.ApiUrl.PlcManipulate.ContinueTask,
  //移动
  prop.ApiUrl.PlcManipulate.Move,
  //自动执行
  prop.ApiUrl.AutoCrane.AutoRunning,
  prop.ApiUrl.AutoCrane.EndTask
];
//手动移动工单接口
const HandMovement = [
  prop.ApiUrl.WorkOrderManipulate.PutCreateAndExecuteMoveTask,
  prop.ApiUrl.WorkOrderManipulate.PutCreateAndExecuteWorkTask
];
// onMounted(async () => {});
</script>

<template>
  <el-tabs
    v-model="activeTab"
    :tab-position="tabPosition"
    @tab-click="handleTabClick"
  >
    <el-tab-pane :label="options[0].label" :name="options[0].value">
      <PouringMode :uRL="uRL" :ApiUrl="prop.ApiUrl" />
    </el-tab-pane>
    <el-tab-pane :label="options[1].label" :name="options[1].value">
      <LoadingMode :api="api" />
    </el-tab-pane>
    <el-tab-pane :label="options[2].label" :name="options[2].value">
      <craneOperation :ApiUrl="ApiUrl" :HandMovement="HandMovement" />
    </el-tab-pane>
    <el-tab-pane :label="options[3].label" :name="options[3].value">
      <DefaultMode />
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>
.el-tabs {
  padding-top: 4rem;
}
/* 覆盖标签文字的颜色和字体粗细 */
:deep .el-tabs__item {
  font-size: 1.3rem;
  font-weight: bold;
}
</style>
