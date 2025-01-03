<script lang="ts" setup>
import Urls from "@/store/urls";
import { onMounted, onUnmounted, ref, watch, nextTick } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
const props = defineProps<{
  ApiUrl: any;
}>();
let intervalId;
const fetchedData = ref({ values: [] });
const tableRef = ref(null);

const filterTag = (value, row) => {
  return row.tag === value || row.type === value;
};
const getTagType = type => {
  switch (type) {
    case "操作":
      return "warning";
    case "故障":
      return "danger";
    default:
      return "info"; // Update this line
  }
};
const formatDate = (row, column, cellValue) => {
  const match = cellValue.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  return match ? match[0].replace("T", " ") : cellValue;
};
const op1 = async () => {
  await axios
    .get(props.ApiUrl.DataBase.GetPromptAndFault)
    .then(res => {
      fetchedData.value.values = res.data;
      fetchedData.value.values.sort((a, b) => {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
        return dateA.getTime() - dateB.getTime();
      });
    })
    .catch(error => {
      console.error("Error fetching pour select:", error);
    });
};
let timer = null;
let scrollTimeout = null;
let isUserScrolling = false;
const myTable = ref(null);

// 清除滚动
const clearScroll = () => {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
};

const createScroll = () => {
  clearScroll();
  // 获取table
  const table = myTable.value.layout.table.refs;
  // 获取可以滚动的元素
  const tableWrapper = table.bodyWrapper.firstElementChild.firstElementChild;

  // 取消之前的事件监听器，以避免重复添加
  tableWrapper.removeEventListener("scroll", handleScroll);

  // 监听用户滚动事件
  tableWrapper.addEventListener("scroll", handleScroll);

  timer = setInterval(() => {
    if (!isUserScrolling) {
      tableWrapper.scrollTop += 4;
    }
  }, 50);
};

// 滚动事件处理函数
const handleScroll = () => {
  clearTimeout(scrollTimeout);
  isUserScrolling = true;

  scrollTimeout = setTimeout(() => {
    // 程序加载时直接滚动到底部
    const tableWrapper =
      myTable.value.layout.table.refs.bodyWrapper.firstElementChild
        .firstElementChild;
    tableWrapper.scrollTop = tableWrapper.scrollHeight;
    isUserScrolling = false; // 用户停止滚动后，恢复自动滚动
  }, 1000); // 停止滚动1秒后恢复自动滚动
};

onMounted(() => {
  intervalId = setInterval(() => {
    op1();
    createScroll();
  }, 800);
});

onUnmounted(() => {
  clearInterval(intervalId);
  clearScroll();
  // 取消事件监听器
  if (myTable.value) {
    const tableWrapper =
      myTable.value.layout.table.refs.bodyWrapper.firstElementChild
        .firstElementChild;
    tableWrapper.removeEventListener("scroll", handleScroll);
  }
});
</script>

<template>
  <el-table
    ref="myTable"
    stripe
    :data="fetchedData.values"
    class="demo-progress mt-3"
    style="border-right: 3px dashed gray; height: 400px; overflow-y: auto"
    @mouseover="clearScroll"
    @mouseleave="createScroll"
  >
    <el-table-column
      prop="time"
      label="时间"
      width="120"
      :formatter="formatDate"
    />
    <el-table-column prop="crane" label="天车号" width="100" />
    <el-table-column prop="source" label="来源" width="100" />
    <el-table-column prop="context" label="信息" />
    <el-table-column
      prop="type"
      label="类型"
      width="100"
      :filters="[
        { text: '故障', value: '故障' },
        { text: '操作', value: '操作' },
        { text: '常规', value: '常规' }
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <el-tag
          size="large"
          :type="getTagType(scope.row.type)"
          disable-transitions
        >
          {{ scope.row.type }}
        </el-tag>
      </template></el-table-column
    >
  </el-table>
</template>

<style scoped>
.demo-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  overflow-y: auto;
  width: 100%;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
}
</style>
