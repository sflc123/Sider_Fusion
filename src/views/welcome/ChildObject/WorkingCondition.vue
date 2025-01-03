<template>
  <el-carousel :interval="5000" type="card" height="200px">
    <el-carousel-item v-for="index in 3" :key="index">
      <div v-if="index === 1" class="w-full h-full bg-black bg-opacity-80 pt-2">
        <div class="w-full h-8 flex flex-row p-0 mb-1">
          <div
            class="bg-[url('..\views\welcome\picture\3.gif')] bg-cover bg-center w-full p-0 flex flex-col"
          >
            <el-text
              class="mx-1"
              type="success"
              style="font-size: 16px; font-weight: bold"
              >工单进度</el-text
            >
          </div>
        </div>
        <!-- <el-text class="mx-1" type="primary">Primary</el-text>
        <el-text class="mx-1" type="success">Success</el-text>
        <el-text class="mx-1" type="info">Info</el-text>
        <el-text class="mx-1" type="warning">Warning</el-text>
        <el-text class="mx-1" type="danger">Danger</el-text> -->
        <div class="w-full h-full pt-5">
          <!-- active 绑定该进度条进度 -->
          <el-steps style="max-width: 100%" :active="1" align-center>
            <el-step title="Step 1" description="start" />
            <el-step title="Step 2" description="Some description" />
            <el-step title="Step 3" description="end" />
          </el-steps>
        </div>
      </div>
      <div v-else-if="index === 2" class="container bg-black bg-opacity-80">
        <div class="w-full h-8 flex flex-row p-0 mt-2 mb-1">
          <div
            class="bg-[url('..\views\welcome\picture\3.gif')] bg-cover bg-center w-full p-0 flex flex-col"
          >
            <el-text
              class="mx-1"
              type="primary"
              style="font-size: 16px; font-weight: bold"
              >料场盘库</el-text
            >
          </div>
        </div>
        <el-row
          :gutter="0"
          justify="space-around"
          style="text-align: center; align-items: center"
        >
          <el-col :span="12">
            <div class="statistic-card">
              <el-statistic :value="parseFloat(area)">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
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

              <div class="statistic-footer">
                <div class="footer-item">
                  <span>所占比：</span>
                  <span class="green">
                    {{ areaProportion }}%
                    <el-icon>
                      <CaretTop />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="statistic-card">
              <el-statistic :value="parseFloat(weight)">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
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
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>所占比：</span>
                  <span class="red">
                    {{ weightProportion }}%
                    <el-icon>
                      <CaretBottom />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div v-else class="w-full h-full flex flex-col bg-black bg-opacity-80">
        <div class="w-full h-8 flex flex-row p-0 mt-2 mb-1">
          <div
            class="bg-[url('..\views\welcome\picture\3.gif')] bg-cover bg-center w-full p-0 flex flex-col"
          >
            <el-text
              class="mx-1"
              type="warning"
              style="font-size: 16px; font-weight: bold"
              >操作规范</el-text
            >
          </div>
        </div>
        <div class="scrollable-content p-2">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="操作提示" name="1">
              <div>
                Consistent with real life: in line with the process and logic of
                are used to;
              </div>
              <div>
                Consistent within interface: all elements should be consistent
                etc.
              </div>
            </el-collapse-item>
            <el-collapse-item title="注意事项" name="2">
              <div>
                Operation feedback: enable the users to clearly perceive their
              </div>
              <div>
                Visual feedback: reflect current state by updating or
                rearranging elements of the page.
              </div>
            </el-collapse-item>
            <el-collapse-item title="安全处理" name="3">
              <div>
                Simplify the process: keep operating process simple and
                intuitive;
              </div>
              <div>
                Definite and clear: enunciate your intentions clearly so that
              </div>
              <div>
                Easy to identify: the interface should be straightforward, which
                recalling.
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts" setup>
import { urls } from "@/utils/Url";
import {
  ArrowRight,
  CaretBottom,
  CaretTop,
  Warning
} from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
import axios from "axios";
const activeName = ref(""); //默认所有项不展开 （若为1，2，3则展开对应的el-collapse-item）

const weight = ref(0); // Initialize to some default value
const area = ref(0); // Initialize to some default value
const areas = 4500; //料场最大体积
const weights = 16000; //料场最大重量
const areaProportion = ref(0);
const weightProportion = ref(0);

onMounted(() => {
  axios
    .get(urls.getMaterial)
    .then(response => {
      updateData(response.data);
    })
    .catch(err => {
      console.error(err);
    });
});

// Function to update the reactive variables
const updateData = newData => {
  area.value = newData[0];
  weight.value = newData[1];
  areaProportion.value = parseInt(((newData[0] / areas) * 100).toFixed(2));
  weightProportion.value = parseInt(((newData[1] / weights) * 100).toFixed(2));
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: white;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: rgba(0, 0, 0, 0.78);
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: rgba(0, 0, 0, 0.5);
}

:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.container {
  height: 100%; /* 设置容器高度为视口高度 */
  display: flex;
  flex-direction: column;
}
.el-row {
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.statistic-card {
  height: 100%;
  padding: 20px;
  /* border-radius: 4px; */
  /* background-color: var(--el-bg-color-overlay); */
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 1px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}

.scrollable-content {
  height: 100%; /* Set this to the desired height */
  overflow-y: auto; /* This will add a vertical scrollbar if the content exceeds the height */
}
</style>
