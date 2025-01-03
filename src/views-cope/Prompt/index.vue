<script lang="ts" setup>
import Fault from "./Fault.vue";
import Prompt from "./Prompt.vue";
import WorkOrder from "./WorkOrder.vue";
</script>

<template>
  <el-tabs type="border-card" style="height: 97%; margin: 1rem; padding: 0">
    <el-tab-pane label="操作信息查询">
      <Prompt />
    </el-tab-pane>
    <el-tab-pane label="故障信息查询">
      <Fault />
    </el-tab-pane>
    <el-tab-pane label="工单信息查询">
      <WorkOrder />
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped></style>
