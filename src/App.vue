<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
    <ReDialog />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { ElConfigProvider } from "element-plus";
import { ReDialog } from "@/components/ReDialog";
import zhCn from "element-plus/es/locale/lang/zh-cn";

export default defineComponent({
  name: "app",
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
    ReDialog
  },
  computed: {
    currentLocale() {
      return zhCn;
    }
  }
});
</script>
<style lang="scss" scoped>
//更改菜单栏文字大小
:deep .el-text {
  font-size: 1.2rem;
}
:deep(.el-form-item__label) {
  font-weight: bold;
  font-size: 1.1rem;
}
:deep(.el-input__inner) {
  font-weight: bold;
  font-size: 1.1rem;
}
:deep(.el-tabs__item) {
  margin: 0;
  font-size: 1.1rem;
  font-weight: bold;
}
:deep(.el-tabs) {
  margin: 10px;
}
:deep .el-table,
:deep .el-table th,
:deep .el-table tr,
:deep .el-table td {
  background-color: transparent !important;
  font-size: 1.1rem;
  font-weight: bold;
}
:deep(.el-tag) {
  width: 20px;
  height: 20px;
}
</style>
