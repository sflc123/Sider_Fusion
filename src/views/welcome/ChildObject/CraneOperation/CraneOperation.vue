<script lang="ts" setup>
import { onMounted, ref, onUnmounted } from "vue";
import { CaretBottom, CaretTop, Warning } from "@element-plus/icons-vue";

const props = defineProps<{
  InfoMation: any;
  API: any;
  cancelRequest: () => void;
  requestUrl: any;
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

function getStatus(curValue) {
  if (props.InfoMation.isCanceled) {
    if (props.InfoMation.workOrderStep - 1 === curValue) return "error";
    else if (props.InfoMation.workOrderStep > curValue) return "success";
    else return "wait";
  } else {
    if (props.InfoMation.workOrderStep > curValue) return "success";
    else return "wait";
  }
}
let intervalId = null;
const fetchData = () => {
  props.API.DataBase.GetInventory(props.requestUrl)
    .then(res => {
      updateData(res);
    })
    .catch(err => {
      console.log(err, "获取盘库数据失败");
    });
};

onMounted(() => {
  fetchData();
  intervalId = setInterval(fetchData, 8000);
  // intervalId = setInterval(() => {
  //   console.log("刷新数据", props.InfoMation);
  // }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
  props.cancelRequest();
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
        <el-steps
          :active="props.InfoMation.workOrderStep"
          size="small"
          align-center
        >
          <el-step
            v-for="(step, index) in stepss"
            :key="index"
            :title="step.title"
            :description="step.description"
            :status="getStatus(index)"
            :class="{ blinking: index === props.InfoMation.workOrderStep - 1 }"
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
