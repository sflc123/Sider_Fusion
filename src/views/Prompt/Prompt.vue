<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { ElButton, ElMessage, ElTable, ElTableColumn } from "element-plus";
import axios from "axios";
//导出Excel表格
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Urls from "@/store/urls";
const props = defineProps<{
  API: any;
  requestUrl: any;
  cancelRequest: () => void;
}>();
// 分页参数
const pageNumber = ref(1);
const pageSize = ref(100);
const totalItems = ref();
const temps = ref<DataStruct[]>([]);
const params = ref({
  pageNumber: pageNumber.value,
  pageSize: pageSize.value
});
// // 搜索框内容
const search = ref("");
// const filterTableData = computed(() =>
//   temps.value.filter(
//     data =>
//       !search.value ||
//       data.content.toLowerCase().includes(search.value.toLowerCase())
//   )
// );

const filterTableData = computed(() => {
  return temps.value.filter(data => {
    const matchesSearch =
      !search.value ||
      (data.context &&
        data.context.toLowerCase().includes(search.value.toLowerCase()));
    const matchesDateRange =
      !selectedDateRange.value ||
      (new Date(data.createTime) >= selectedDateRange.value[0] &&
        new Date(data.createTime) <= selectedDateRange.value[1]);
    return matchesSearch && matchesDateRange;
  });
});
interface DataStruct {
  context: string;
  createTime: Date;
  cranE_NO: string;
  creater: string;
  flag: string;
}
//全部数据
const handleClick = async () => {
  props.API.DataBase.GetPrompt(props.requestUrl, params.value)
    .then(res => {
      temps.value = res;
      totalItems.value = Math.ceil(res.length / pageSize.value);
      ElMessage.success("成功获取数据");
      console.log(temps.value);
    })
    .catch(err => {
      console.log(err);
    });
  // await axios
  //   .get(Urls.DataBase.GetPrompt, {
  //     params: {
  //       pageNumber: 1,
  //       pageSize: 100
  //     }
  //   })
  //   .then(res => {
  //     temps.value = res.data;
  //     totalItems.value = Math.ceil(res.data.length / pageSize.value);
  //     ElMessage.success("成功获取数据");
  //     console.log(temps.value);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
};
//导出Excel表格
const exportToExcel = () => {
  try {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filterTableData.value);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "prompt.xls"
    );
    ElMessage({
      message: "导出成功",
      type: "success",
      duration: 2000
    });
  } catch (error) {
    ElMessage({
      message: "导出失败",
      type: "error",
      duration: 2000
    });
  }
};
const formatDate = (row: DataStruct, column: any, cellValue: string) => {
  const match = cellValue.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  return match ? match[0].replace("T", " ") : cellValue;
};
// 处理分页组件页码改变
const handlePageChange = (newPageNumber: number) => {
  pageNumber.value = newPageNumber;
  params.value.pageNumber = newPageNumber;
  fetchPageData();
};

// 请求分页数据
const fetchPageData = async () => {
  props.API.DataBase.GetPrompt(props.requestUrl, params.value)
    .then(res => {
      temps.value = res;
      console.log(
        "1111111111111111111111111111111111111111111111111",
        temps.value
      );
      // ElMessage.success("成功获取操作信息数据");
    })
    .catch(err => {
      console.log(err);
    });
  // try {
  //   const response = await axios.get(Urls.DataBase.GetPrompt, {
  //     params: {
  //       pageNumber: pageNumber.value,
  //       pageSize: pageSize.value
  //     }
  //   });
  //   temps.value = response.data;
  //   console.log(temps.value);
  //   // ElMessage.success("成功获取操作信息数据");
  // } catch (error) {
  //   console.error(error);
  // }
};
onMounted(async () => {
  props.API.DataBase.GetPromptAmount(props.requestUrl)
    .then(res => {
      totalItems.value = Math.ceil(res.length / pageSize.value);
    })
    .catch(err => {
      console.log(err);
    });
  fetchPageData();
});
// 时间范围
const now = new Date();
const lastWeek = new Date(now);
lastWeek.setDate(now.getDate() - 7);
//时间绑定值
// const value1 = ref<[Date, Date]>([lastWeek, now]);
const selectedDateRange = ref<[Date, Date] | null>(null);
</script>
<template>
  <el-card shadow="always" class="flex-buttons">
    <el-input
      v-model="search"
      size="large"
      placeholder="请输入操作信息关键字查询"
      style="width: auto"
    />
    <el-date-picker
      v-model="selectedDateRange"
      size="large"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
    />
    <!-- <el-button type="primary" plain @click="times">时间查询</el-button> -->
    <el-button type="primary" plain @click="handleClick">查询</el-button>
    <el-button type="success" plain @click="exportToExcel()"
      >导出Excel</el-button
    >
  </el-card>
  <el-card shadow="always">
    <el-table :data="filterTableData" height="72vh" style="width: 100%">
      <el-table-column
        prop="createTime"
        label="时间"
        width="500"
        :formatter="formatDate"
      />
      <el-table-column prop="context" label="操作信息" />
      <el-table-column prop="name" label="天车号" width="300" />
      <el-table-column prop="source" label="操作来源" width="300" />
      <!-- <el-table-column prop="flag" label="操作标记" width="150" /> -->
    </el-table>
  </el-card>
  <div class="flex justify-center">
    <el-pagination
      v-model:page-size="pageSize"
      background
      layout="prev, pager, next"
      :page-count="totalItems"
      :current-page="pageNumber"
      @current-change="handlePageChange"
    />
  </div>
</template>

<style scoped>
.el-card {
  margin-bottom: 0.5rem;
}
.el-input {
  margin-right: 1rem;
}
.el-button {
  width: 10%;
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 1rem;
}
.flex-buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
