<script lang="ts" setup>
import { ref } from "vue";
import { useCraneStatusStore } from "@/store/modules/craneStatus";
import { ElMessage } from "element-plus";
const store = useCraneStatusStore();
const props = defineProps<{
  Info: { Name: string };
  InfoMation: any;
}>();
//行车状态
const cranestatus = ref("在线");
const location = ref({
  x: 0,
  y: 0,
  z: 0
});
</script>

<template>
  <div
    class="bg-[url('..\views\welcome\ChildObject\picture\7.png')] bg-cover demo-progress"
  >
    <el-row :gutter="24" justify="center">
      <el-col>
        <el-text
          class="blinking-text"
          style="font-size: 2rem"
          :type="cranestatus === '休息' ? 'danger' : 'success'"
        >
          {{ Info.Name }}
          {{ "(" + cranestatus + ")" }}
        </el-text>
      </el-col>
    </el-row>

    <el-row :gutter="24" class="w-full">
      <el-col :span="8">
        <el-text style="font-size: 2.3rem" type="success">
          {{
            typeof location.x === "number"
              ? (InfoMation.currentX / 1000).toFixed(2)
              : "N/A"
          }}
        </el-text>
        <br />
        <el-text style="font-size: 1.1rem" class="mx-1">大车位置(米)</el-text>
      </el-col>
      <el-col :span="8">
        <el-text style="font-size: 2.3rem" type="success">
          {{
            typeof location.y === "number"
              ? (InfoMation.currentY / 1000).toFixed(2)
              : "N/A"
          }}
        </el-text>
        <br />
        <el-text style="font-size: 1.1rem" class="mx-1">小车位置(米)</el-text>
      </el-col>
      <el-col :span="8">
        <el-text style="font-size: 2.3rem" type="success">
          {{
            typeof location.z === "number"
              ? (InfoMation.currentZ / 1000).toFixed(2)
              : "N/A"
          }}
        </el-text>
        <br />
        <el-text style="font-size: 1.1rem" class="mx-1">起升高度(米)</el-text>
      </el-col>
    </el-row>

    <el-row :gutter="24" class="w-full">
      <el-col :span="8">
        <el-text style="font-size: 2.3rem" type="success">
          {{
            typeof location.x === "number"
              ? (InfoMation.targetX / 1000).toFixed(2)
              : "N/A"
          }}
        </el-text>
        <br />
        <el-text style="font-size: 1.1rem" class="mx-1">大车目标位置</el-text>
      </el-col>
      <el-col :span="8">
        <el-text style="font-size: 2.3rem" type="success">
          {{
            typeof location.y === "number"
              ? (InfoMation.targetY / 1000).toFixed(2)
              : "N/A"
          }}
        </el-text>
        <br />
        <el-text style="font-size: 1.1rem" class="mx-1">小车目标位置</el-text>
      </el-col>
      <el-col :span="8">
        <el-text style="font-size: 2.3rem" type="success">
          {{
            typeof location.z === "number"
              ? (InfoMation.targetZ / 1000).toFixed(2)
              : "N/A"
          }}
        </el-text>
        <br />
        <el-text style="font-size: 1.1rem" class="mx-1">起升目标位置</el-text>
      </el-col>
    </el-row>

    <el-row :gutter="24" class="w-full pt-3">
      <el-col :span="4">
        <el-statistic
          :value="
            (InfoMation.workType as any) && InfoMation.workType.length > 0
              ? InfoMation.workType
              : 'null'
          "
          title="工作模式"
          value-style="color: red;"
        />
      </el-col>
      <el-col :span="4">
        <el-statistic
          title="操作模式"
          :value="
            (InfoMation.operationMode as any) &&
            InfoMation.operationMode.length > 0
              ? InfoMation.operationMode
              : 'null'
          "
          value-style="color: red;"
        />
      </el-col>
      <el-col :span="4">
        <el-statistic
          value-style="color: red;"
          title="抓斗开度(%)"
          :value="InfoMation.openRatio as any"
        />
      </el-col>
      <el-col :span="4">
        <el-statistic
          title="重量(吨)"
          :precision="2"
          :value="Number(InfoMation.weight) / 1000"
        />
      </el-col>
      <el-col :span="4">
        <el-statistic title="目标放料区" :value="null">
          <template #prefix>
            {{
              typeof store.sendputlocation.loadlocation === "string"
                ? store.sendputlocation.loadlocation
                : store.sendputlocation.loadlocation &&
                    store.sendputlocation.loadlocation.length > 0
                  ? store.sendputlocation.loadlocation[0] +
                    "-" +
                    store.sendputlocation.loadlocation[
                      store.sendputlocation.loadlocation.length - 1
                    ] +
                    "区"
                  : "NaN"
            }}
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="4">
        <el-statistic title="目标放料区" :value="null">
          <template #prefix>
            {{
              store.sendputlocation.unloadlocation &&
              store.sendputlocation.unloadlocation.length > 0
                ? store.sendputlocation.unloadlocation[0] +
                  "-" +
                  store.sendputlocation.unloadlocation[
                    store.sendputlocation.unloadlocation.length - 1
                  ] +
                  "区"
                : "NaN"
            }}
          </template>
        </el-statistic>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.demo-progress {
  display: flex;
  flex-direction: column; /* 垂直堆叠子项  */
  align-items: center; /* 水平居中子项 */
  justify-content: center; /* 如果容器具有定义的高度，则将子项垂直居中 */
  height: 100%; /* 如果要垂直居中，请设置高度 */
  width: 100%; /* 如果要水平居中，请设置宽度 */
  overflow: hidden; /* 防止内元素超出容器 */
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

.el-row {
  margin: 0.2rem;
}
.el-col {
  text-align: center;
}
/* 字体闪烁效果 */
/* @keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.blinking-text {
  animation: blink 0.8s step-start infinite; 
} */
</style>
