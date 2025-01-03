<template>
  <div class="bg-background">
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-card rounded-lg shadow-md">
        <div class="flex justify-center items-center">
          <el-text type="success" style="font-size: 25px; font-weight: bold"
            >1号车</el-text
          >
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="flex flex-row">
            <!-- 系统状态 1/4 -->
            <el-card class="card w-1/2" shadow="always">
              <div
                v-for="(value, key) in DataStruct.crane1.crane.data"
                :key="key"
                class="p-1 mb-6"
              >
                <el-button :type="value === 1 ? 'success' : 'danger'" plain>{{
                  key
                }}</el-button>
              </div>
            </el-card>
            <!-- 系统状态 2/4 -->
            <el-card class="card w-1/2" shadow="always">
              <!-- Card 内容 -->
              <div
                v-for="(value, key) in DataStruct.crane1.crane.data3"
                :key="key"
              >
                <el-form
                  :size="size"
                  :label-position="labelPosition"
                  label-width="100px"
                  :model="formLabelAlign"
                >
                  <el-form-item :label="String(key).toUpperCase() + ':'">
                    <el-input
                      v-model="formData[key]"
                      type="danger"
                      plain
                      :value="value"
                    />
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
          </div>
          <div class="flex flex-row">
            <!-- 执行流程 3/4 -->
            <el-card class="card w-1/2" shadow="always">
              <div style="max-height: 400px; overflow-y: auto">
                <el-timeline>
                  <el-timeline-item
                    v-for="(activity, index) in DataStruct.crane1.crane
                      .ExecutionSteps"
                    :key="index"
                    :class="{ 'current-step': index + 1 === currentStep }"
                    :timestamp="activity.timestamp"
                    size="large"
                  >
                    <el-text>{{ activity.content }}</el-text>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-card>
            <!-- 执行流程 3/4 -->
            <el-card class="card w-1/2" shadow="always" />
          </div>
        </div>
        <h3 class="text-md font-semibold p-3">1#起升</h3>
        <el-card class="card" shadow="always">
          <div class="flex flex-wrap items-center justify-center">
            <div
              v-for="(value, key) in DataStruct.crane1.Lifting"
              :key="key"
              class="mx-7 flex flex-wrap"
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
        <h3 class="text-md font-semibold p-3">1#开闭</h3>
        <el-card class="card" shadow="always">
          <div class="flex flex-wrap items-center justify-center">
            <div
              v-for="(value, key) in DataStruct.crane1.OAC"
              :key="key"
              class="flex flex-wrap mx-7"
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
        <h3 class="text-md font-semibold p-3">1#故障</h3>
        <el-card class="card" shadow="always">
          <div class="flex flex-wrap">
            <div
              v-for="(value, key) in DataStruct.crane1.Fault"
              :key="key"
              class="ml-20 pt-5 w-1/4"
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
          </div>
        </el-card>
      </div>

      <div class="bg-card rounded-lg shadow-md">
        <div class="flex justify-center items-center">
          <el-text type="success" style="font-size: 25px; font-weight: bold"
            >2号车</el-text
          >
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="flex flex-row">
            <!-- 系统状态 1/4 -->
            <el-card class="card w-1/2" shadow="always">
              <div
                v-for="(value, key) in DataStruct.crane2.crane.data"
                :key="key"
                class="p-1 mb-6"
              >
                <el-button :type="value === 1 ? 'success' : 'danger'" plain>{{
                  key
                }}</el-button>
              </div>
            </el-card>
            <!-- 系统状态 2/4 -->
            <el-card class="card w-1/2" shadow="always">
              <!-- Card 内容 -->
              <div
                v-for="(value, key) in DataStruct.crane2.crane.data3"
                :key="key"
              >
                <el-form
                  :size="size"
                  :label-position="labelPosition"
                  label-width="100px"
                  :model="formLabelAlign"
                >
                  <el-form-item :label="String(key).toUpperCase() + ':'">
                    <el-input
                      v-model="formData[key]"
                      type="danger"
                      plain
                      :value="value"
                    />
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
          </div>
          <div class="flex flex-row">
            <!-- 执行流程 3/4 -->
            <el-card class="card w-1/2" shadow="always">
              <div style="max-height: 400px; overflow-y: auto">
                <el-timeline>
                  <el-timeline-item
                    v-for="(activity, index) in DataStruct.crane2.crane
                      .ExecutionSteps"
                    :key="index"
                    :class="{ 'current-step': index + 1 === currentStep }"
                    :timestamp="activity.timestamp"
                  >
                    <el-text>{{ activity.content }}</el-text>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-card>
            <!-- 执行流程 3/4 -->
            <el-card class="card w-1/2" shadow="always" />
          </div>
        </div>

        <h3 class="text-md font-semibold p-3">2#起升</h3>
        <el-card class="card" shadow="always">
          <div class="flex flex-wrap items-center justify-center">
            <div
              v-for="(value, key) in DataStruct.crane2.Lifting"
              :key="key"
              class="mx-7 flex flex-wrap"
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
        <h3 class="text-md font-semibold p-3">2#开闭</h3>
        <el-card class="card" shadow="always">
          <div class="flex flex-wrap items-center justify-center">
            <div
              v-for="(value, key) in DataStruct.crane2.OAC"
              :key="key"
              class="flex flex-wrap mx-7"
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
        <h3 class="text-md font-semibold p-3">2#故障</h3>
        <el-card class="card" shadow="always">
          <div class="flex flex-wrap">
            <div
              v-for="(value, key) in DataStruct.crane2.Fault"
              :key="key"
              class="ml-20 pt-5 w-1/4"
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
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import AutoCraneStatus from "../PLCDataFormat/AutoCraneStatus";
import DataStruct from "../PLCDataFormat/DataStruct";
import { reactive, ref } from "vue";
import { ComponentSize, FormProps } from "element-plus";
const size = ref<ComponentSize>("default");

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
const formLabelAlign = reactive({
  name: "",
  region: "",
  type: "",
  date: new Date().toISOString().slice(0, 19).replace("T", " ")
});
</script>
<style scoped></style>
