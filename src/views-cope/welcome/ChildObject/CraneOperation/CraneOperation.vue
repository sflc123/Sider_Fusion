<script lang="ts" setup>
import { onMounted, ref, onUnmounted } from "vue";
import { CaretBottom, CaretTop, Warning } from "@element-plus/icons-vue";
import axios from "axios";
import Urls from "@/store/urls";
import { ElMessage } from "element-plus";

const props = defineProps<{
  Axios: any;
  api: any;
  ApiUrl: any;
}>();
const weight = ref(0);
const area = ref(0);
const areaProportion = ref(0);
const weightProportion = ref(0);

const updateData = newData => {
  area.value = newData[0];
  weight.value = newData[2];
  areaProportion.value = newData[1];
  weightProportion.value = newData[3];
};

const stepss = [
  { title: "上升", description: "安全点" },
  { title: "开斗", description: "" },
  { title: "移动", description: "抓料点" },
  { title: "下降", description: "" },
  { title: "闭斗", description: "抓料" },
  { title: "上升", description: "安全点" },
  { title: "移动", description: "放料点" },
  { title: "下降", description: "" },
  { title: "开斗", description: "放料" },
  { title: "上升", description: "安全点" },
  { title: "完成", description: "" }
];
//执行步骤
let iscanceled = ref(false);
let Step = ref(10);
function getStatus(curValue) {
  if (iscanceled.value) {
    if (Step.value === curValue) return "error";
    else if (Step.value > curValue) return "success";
    else return "wait";
  } else {
    if (Step.value >= curValue) return "success";
    else return "wait";
  }
}
let intervalId = null;
const fetchData = async () => {
  try {
    const [inventoryResponse, runningWorkOrderResponse] = await Promise.all([
      axios.get(props.ApiUrl.DataBase.GetInventory),
      axios.get(props.ApiUrl.DataBase.GetRunningWorkOrder, {
        params: { id: 1 }
      })
    ]);
    updateData(inventoryResponse.data);
    Step.value = runningWorkOrderResponse.data.stepnumber - 1;
    iscanceled.value = runningWorkOrderResponse.data.iscanceled;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  intervalId = setInterval(fetchData, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
<template>
  <div
    class="bg-[url('..\views\welcome\ChildObject\picture\7.png')] bg-cover demo-progress"
  >
    <el-row justify="center">
      <el-col>
        <el-text type="success">执行过程</el-text>
      </el-col>
    </el-row>
    <el-row justify="center" class="w-full h-1/3">
      <el-col>
        <el-steps :active="Step" size="small" align-center>
          <el-step
            v-for="(step, index) in stepss"
            :key="index"
            :title="step.title"
            :description="step.description"
            :status="getStatus(index)"
            :class="{ blinking: index === Step }"
          />
        </el-steps>
      </el-col>
    </el-row>

    <el-cow>
      <el-col>
        <el-text type="danger">料区盘库</el-text>
      </el-col>
    </el-cow>
    <el-row class="w-full">
      <el-col :span="12">
        <el-statistic :value="parseFloat(area)">
          <template #title>
            <div
              style="
                display: inline-flex;
                align-items: center;
                font-size: 16px;
                font-weight: bold;
              "
            >
              库存体积(立方米)
              <el-tooltip
                effect="dark"
                content="物料库存所得体积"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
        <span class="proportion-value">
          占比
          {{ areaProportion }}%
          <el-icon>
            <CaretTop />
          </el-icon>
        </span>
      </el-col>
      <el-col :span="12">
        <el-statistic :value="parseFloat(weight)">
          <template #title>
            <div
              style="
                display: inline-flex;
                align-items: center;
                font-size: 16px;
                font-weight: bold;
              "
            >
              库存重量(吨)
              <el-tooltip
                effect="dark"
                content="物料库存所得重量"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
        <span class="proportion-value">
          占比
          {{ weightProportion }}%
          <el-icon>
            <CaretBottom />
          </el-icon>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.demo-progress {
  display: flex;
  flex-direction: column; /*垂直堆叠子项 */
  align-items: center; /* 水平居中子对象 */
  justify-content: center; /* 如果容器具有定义的高度，则将子对象垂直居中 */
  height: 100%; /* 如果要垂直居中，请设置高度*/
  width: 100%; /* 如果要水平居中，请设置宽度 */
}
.demo-progress > * {
  max-width: 100%; /* 限制内元素的最大宽度 */
  max-height: 100%; /* 限制内元素的最大高度 */
  flex-shrink: 1; /* 允许内元素缩小 */
}

@media (max-width: 50%) {
  .el-text {
    font-size: 3rem; /* 根据浏览器宽度调整字体大小 */
  }
}
@media (max-width: 30%) {
  .el-text {
    font-size: 0.8rem; /* 根据浏览器宽度进一步调整字体大小 */
  }
}
.proportion-value {
  color: red;
}
.el-col {
  text-align: center;
}
.el-text {
  font-weight: bold;
  font-size: 1.5rem;
  /* text-shadow: 0 0 0.3rem; */
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.blinking {
  animation: blink 1s infinite;
}
</style>
