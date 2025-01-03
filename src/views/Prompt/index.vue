<script lang="ts" setup>
import Fault from "./Fault.vue";
import Prompt from "./Prompt.vue";
import WorkOrder from "./WorkOrder.vue";
import { API, useRequest } from "@/store/urls";
const { requestUrl, cancelRequest } = useRequest();
</script>

<template>
  <el-tabs type="border-card" style="height: 97%; margin: 1rem; padding: 0">
    <el-tab-pane label="操作信息查询">
      <Prompt
        :API="API"
        :cancelRequest="cancelRequest"
        :requestUrl="requestUrl"
      />
    </el-tab-pane>
    <el-tab-pane label="故障信息查询">
      <Fault
        :API="API"
        :cancelRequest="cancelRequest"
        :requestUrl="requestUrl"
      />
    </el-tab-pane>
    <el-tab-pane label="工单信息查询">
      <WorkOrder
        :API="API"
        :cancelRequest="cancelRequest"
        :requestUrl="requestUrl"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped></style>
