<template>
  <div class="flex flex-row">
    <div class="bg-card rounded-lg shadow-md">
      <div class="grid grid-rows-2 gap-2">
        <div class="grid grid-rows">
          <div class="flex justify-center items-center">
            <el-text type="success" style="font-size: 25px; font-weight: bold"
              >1号车</el-text
            >
          </div>
          <div class="flex flex-row">
            <!-- 系统状态 1/4 -->
            <el-card class="card w-3/12" shadow="always">
              <div
                v-for="(value, key) in DataStruct.crane1.crane.data"
                :key="key"
                class="mb-8"
              >
                <el-button :type="value === 1 ? 'success' : 'danger'" plain>{{
                  key
                }}</el-button>
                <!-- <el-input v-model="formData[key]" :value="key" size="default" /> -->
              </div>
            </el-card>
            <!-- 系统状态 2/4 -->
            <el-card class="card w-4/12" shadow="always">
              <!-- Card 内容 -->
              <div
                v-for="(value, key) in DataStruct.crane1.crane.data3"
                :key="key"
              >
                <el-form-item :label="String(key).toUpperCase()">
                  <el-input
                    v-model="formData[value]"
                    :value="value"
                    class="mb-1"
                    type="danger"
                    size="small"
                  />
                </el-form-item>
              </div>
            </el-card>
            <!-- 执行流程 3/4 -->
            <el-card class="card w-4/12" shadow="always">
              <div style="max-height: 400px; overflow-y: auto">
                <el-timeline>
                  <el-timeline-item
                    v-for="(activity, index) in DataStruct.crane1.crane
                      .ExecutionSteps"
                    :key="index"
                    :timestamp="activity.timestamp"
                    :class="{ 'current-step': index + 1 === currentStep }"
                    size="large"
                  >
                    <el-text>{{ activity.content }}</el-text>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-card>
            <el-card class="card w-3/12" shadow="always" />
          </div>
        </div>
        <div class="flex flex-row">
          <el-card
            class="card w-1/2 items-center justify-center"
            shadow="always"
          >
            <h2>起升</h2>
            <div class="flex flex-wrap m-3">
              <div
                v-for="(value, key) in DataStruct.crane1.Lifting"
                :key="key"
                class="w-1/3"
              >
                <el-form label-width="auto" class="flex flex-row">
                  <el-tag
                    :type="value === 1 ? 'success' : 'danger'"
                    effect="dark"
                    round
                    class="custom-round-tag m-2"
                  />
                  <el-form-item :label="String(key).toUpperCase()" />
                </el-form>
              </div>
            </div>
            <h2>开闭</h2>
            <div class="flex flex-wrap m-3">
              <div
                v-for="(value, key) in DataStruct.crane1.OAC"
                :key="key"
                class="w-1/3"
              >
                <el-form label-width="auto" class="flex flex-row">
                  <el-tag
                    :type="value === 1 ? 'success' : 'danger'"
                    effect="dark"
                    round
                    class="custom-round-tag m-2"
                  />
                  <el-form-item :label="String(key).toUpperCase()" />
                </el-form>
              </div>
            </div>
          </el-card>

          <el-card class="card w-1/2" shadow="always">
            <h2>故障</h2>
            <div
              v-for="(value, key) in DataStruct.crane1.Fault"
              :key="key"
              class="pt-3"
            >
              <el-form
                :size="size"
                :label-position="labelPosition"
                label-width="100px"
                :model="formLabelAlign"
              >
                <el-form-item :label="String(key).toUpperCase() + ':'">
                  <el-button :type="value === 1 ? 'success' : 'danger'" plain>{{
                    value === 1 ? "正常" : "故障"
                  }}</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <div class="bg-card rounded-lg shadow-md">
      <!-- <h2>2号 行车</h2> -->
      <div class="grid grid-rows-2 gap-2">
        <div class="grid grid-rows">
          <div class="flex justify-center items-center">
            <el-text type="success" style="font-size: 25px; font-weight: bold"
              >2号车</el-text
            >
          </div>
          <div class="flex flex-row">
            <!-- 系统状态 1/4 -->
            <el-card class="card w-3/12" shadow="always">
              <div
                v-for="(value, key) in DataStruct.crane2.crane.data"
                :key="key"
                class="mb-8"
              >
                <el-button :type="value === 1 ? 'success' : 'danger'" plain>{{
                  key
                }}</el-button>
              </div>
            </el-card>
            <!-- 系统状态 2/4 -->
            <el-card class="card w-4/12" shadow="always">
              <!-- Card 内容 -->
              <div
                v-for="(value, key) in DataStruct.crane2.crane.data3"
                :key="key"
              >
                <el-form-item :label="String(key).toUpperCase()">
                  <el-input
                    v-model="formData[value]"
                    :value="value"
                    class="mb-1"
                    type="danger"
                    size="small"
                  />
                </el-form-item>
              </div>
            </el-card>
            <!-- 执行流程 3/4 -->
            <el-card class="card w-4/12" shadow="always">
              <div style="max-height: 400px; overflow-y: auto">
                <el-timeline>
                  <el-timeline-item
                    v-for="(activity, index) in DataStruct.crane2.crane
                      .ExecutionSteps"
                    :key="index"
                    :timestamp="activity.timestamp"
                    :class="{ 'current-step': index + 1 === currentStep }"
                    size="large"
                  >
                    <el-text>{{ activity.content }}</el-text>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-card>
            <el-card class="card w-3/12" shadow="always" />
          </div>
        </div>
        <div class="flex flex-row">
          <el-card
            class="card w-1/2 items-center justify-center"
            shadow="always"
          >
            <h2>起升</h2>
            <div class="flex flex-wrap m-3">
              <div
                v-for="(value, key) in DataStruct.crane2.Lifting"
                :key="key"
                class="w-1/3"
              >
                <el-form label-width="auto" class="flex flex-row">
                  <el-tag
                    :type="value === 1 ? 'success' : 'danger'"
                    effect="dark"
                    round
                    class="custom-round-tag m-2"
                  />
                  <el-form-item :label="String(key).toUpperCase()" />
                </el-form>
              </div>
            </div>
            <h2>开闭</h2>
            <div class="flex flex-wrap m-3">
              <div
                v-for="(value, key) in DataStruct.crane2.OAC"
                :key="key"
                class="w-1/3"
              >
                <el-form label-width="auto" class="flex flex-row">
                  <el-tag
                    :type="value === 1 ? 'success' : 'danger'"
                    effect="dark"
                    round
                    class="custom-round-tag m-2"
                  />
                  <el-form-item :label="String(key).toUpperCase()" />
                </el-form>
              </div>
            </div>
          </el-card>

          <el-card class="card w-1/2" shadow="always">
            <h2>故障</h2>
            <div
              v-for="(value, key) in DataStruct.crane2.Fault"
              :key="key"
              class="pt-3"
            >
              <el-form
                :size="size"
                :label-position="labelPosition"
                label-width="100px"
                :model="formLabelAlign"
              >
                <el-form-item :label="String(key).toUpperCase() + ':'">
                  <el-button :type="value === 1 ? 'success' : 'danger'" plain>{{
                    value === 1 ? "正常" : "故障"
                  }}</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <div class="bg-card rounded-lg shadow-md">
      <!-- <h2>3号 行车</h2> -->
      <div class="grid grid-rows-2 gap-2">
        <div class="grid grid-rows">
          <div class="flex justify-center items-center">
            <el-text type="success" style="font-size: 25px; font-weight: bold"
              >3号车</el-text
            >
          </div>
          <div class="flex flex-row">
            <!-- 系统状态 1/4 -->
            <el-card class="card w-3/12" shadow="always">
              <div
                v-for="(value, key) in DataStruct.crane3.crane.data"
                :key="key"
                class="mb-8"
              >
                <el-button :type="value === 1 ? 'success' : 'danger'" plain>{{
                  key
                }}</el-button>
              </div>
            </el-card>
            <!-- 系统状态 2/4 -->
            <el-card class="card w-4/12" shadow="always">
              <!-- Card 内容 -->
              <div
                v-for="(value, key) in DataStruct.crane3.crane.data3"
                :key="key"
              >
                <el-form-item :label="String(key).toUpperCase()">
                  <el-input
                    v-model="formData[value]"
                    :value="value"
                    class="mb-1"
                    type="danger"
                    size="small"
                  />
                </el-form-item>
              </div>
            </el-card>
            <!-- 执行流程 3/4 -->
            <el-card class="card w-4/12" shadow="always">
              <div style="max-height: 400px; overflow-y: auto">
                <el-timeline>
                  <el-timeline-item
                    v-for="(activity, index) in DataStruct.crane3.crane
                      .ExecutionSteps"
                    :key="index"
                    :timestamp="activity.timestamp"
                    size="large"
                    :class="{ 'current-step': index + 1 === currentStep }"
                  >
                    <el-text>{{ activity.content }}</el-text>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-card>
            <el-card class="card w-3/12" shadow="always" />
          </div>
        </div>
        <div class="flex flex-row">
          <el-card
            class="card w-1/2 items-center justify-center"
            shadow="always"
          >
            <h2>起升</h2>
            <div class="flex flex-wrap m-3">
              <div
                v-for="(value, key) in DataStruct.crane3.Lifting"
                :key="key"
                class="w-1/3"
              >
                <el-form label-width="auto" class="flex flex-row">
                  <el-tag
                    :type="value === 1 ? 'success' : 'danger'"
                    effect="dark"
                    round
                    class="custom-round-tag m-2"
                  />
                  <el-form-item :label="String(key).toUpperCase()" />
                </el-form>
              </div>
            </div>
            <h2>开闭</h2>
            <div class="flex flex-wrap m-3">
              <div
                v-for="(value, key) in DataStruct.crane3.OAC"
                :key="key"
                class="w-1/3"
              >
                <el-form label-width="auto" class="flex flex-row">
                  <el-tag
                    :type="value === 1 ? 'success' : 'danger'"
                    effect="dark"
                    round
                    class="custom-round-tag m-2"
                  />
                  <el-form-item :label="String(key).toUpperCase()" />
                </el-form>
              </div>
            </div>
          </el-card>

          <el-card class="card w-1/2" shadow="always">
            <h2>故障</h2>
            <div
              v-for="(value, key) in DataStruct.crane3.Fault"
              :key="key"
              class="pt-3"
            >
              <el-form
                :size="size"
                :label-position="labelPosition"
                label-width="100px"
                :model="formLabelAlign"
              >
                <el-form-item :label="String(key).toUpperCase() + ':'">
                  <el-button :type="value === 1 ? 'success' : 'danger'" plain>{{
                    value === 1 ? "正常" : "故障"
                  }}</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import DataStruct from "../PLCDataFormat/DataStruct";
import { ref, reactive, onMounted, watchEffect } from "vue";
import { ComponentSize, FormProps } from "element-plus";
import AutoCraneStatus from "../PLCDataFormat/AutoCraneStatus";
const size = ref<ComponentSize>("default");
const formLabelAlign = reactive({
  name: "",
  region: "",
  type: "",
  date: new Date().toISOString().slice(0, 19).replace("T", " ")
});
const labelPosition = ref<FormProps["labelPosition"]>("left");
const formData = ref({});
const currentStep = ref(1); // 初始步骤
setInterval(() => {
  const maxStep = 10;
  if (currentStep.value < maxStep) {
    currentStep.value++;
  } else {
    currentStep.value = 0;
  }
}, 2000);

onMounted(() => {});
</script>
<style scoped></style>
