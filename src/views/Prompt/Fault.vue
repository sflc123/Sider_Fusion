<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from "vue";
import { ElButton, ElMessage, ElTable, ElTableColumn } from "element-plus";
//导出Excel表格
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// 分页参数
const pageNumber = ref(1);
const pageSize = ref(100);
const totalItems = ref();
const params = ref({
  pageNumber: pageNumber.value,
  pageSize: pageSize.value
});
const temps = ref<FaultStruct[]>([]);
const props = defineProps<{
  API: any;
  requestUrl: any;
  cancelRequest: () => void;
}>();
// // 搜索框内容
const search = ref("");
const filterTableData = computed(() => {
  return temps.value.filter(data => {
    const matchesSearch =
      !search.value ||
      data.description.toLowerCase().includes(search.value.toLowerCase());
    const matchesDateRange =
      !selectedDateRange.value ||
      (new Date(data.date) >= selectedDateRange.value[0] &&
        new Date(data.date) <= selectedDateRange.value[1]);
    return matchesSearch && matchesDateRange;
  });
});
// const filterTableData = computed(() =>
//   temps.value.filter(
//     data =>
//       !search.value ||
//       data.description.toLowerCase().includes(search.value.toLowerCase())
//   )
// );
interface FaultStruct {
  id: number;
  craneState: string;
  craneStateId: number;
  date: Date;
  description: string;
  level: string;
  sourceline: string;
  crane: string;
}
//全部数据
const handleClick = async () => {
  props.API.DataBase.GetFault(props.requestUrl, params.value)
    .then(res => {
      temps.value = res;
      ElMessage.success("成功获取数据");
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  // await axios
  //   .get(Urls.DataBase.GetFault, {
  //     params: {
  //       pageNumber: pageNumber.value,
  //       pageSize: pageSize.value
  //     }
  //   })
  //   .then(res => {
  //     temps.value = res.data;
  //     // totalItems.value = Math.ceil(res.data / pageSize.value);
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
const formatDate = (row: FaultStruct, column: any, cellValue: string) => {
  const match = cellValue.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  return match ? match[0].replace("T", " ") : cellValue;
};
// 处理分页组件页码改变
const handlePageChange = (newPageNumber: number) => {
  params.value.pageNumber = newPageNumber;
  pageNumber.value = newPageNumber;
  fetchPageData();
};
// 请求分页数据
const fetchPageData = async () => {
  props.API.DataBase.GetFault(props.requestUrl, params.value)
    .then(res => {
      temps.value = res;
      console.log(res);
      // ElMessage.success("成功获取故障信息数据");
    })
    .catch(err => {
      console.log(err);
    });
  // try {
  //   const response = await axios.get(Urls.DataBase.GetFault, {
  //     params: {
  //       pageNumber: pageNumber.value,
  //       pageSize: pageSize.value
  //     }
  //   });
  //   temps.value = response.data;
  //   console.log(temps.value);
  //   // ElMessage.success("成功获取故障信息数据");
  // } catch (error) {
  //   console.error(error);
  // }
};
onMounted(async () => {
  props.API.DataBase.GetFaultAmount(props.requestUrl)
    .then(res => {
      totalItems.value = Math.ceil(res / pageSize.value);
      console.log(res);
      fetchPageData();
    })
    .catch(err => {
      console.log(err);
    });
  // try {
  //   const response = await axios.get(Urls.DataBase.GetFaultAmount);
  //   totalItems.value = Math.ceil(response.data / pageSize.value);
  //   console.log(response.data);
  //   fetchPageData();
  // } catch (error) {
  //   console.error(error);
  // }
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
      placeholder="请输入故障信息关键字查询"
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
    <el-button type="primary" plain @click="handleClick">查询</el-button>
    <el-button type="success" plain @click="exportToExcel()"
      >导出Excel</el-button
    >
  </el-card>
  <el-card shadow="always">
    <el-table :data="filterTableData" height="72vh" style="width: 100%">
      <el-table-column prop="id" label="ID" width="200" />
      <el-table-column prop="crane" label="行车号" width="300" />
      <el-table-column
        prop="date"
        label="时间"
        width="300"
        :formatter="formatDate"
      />
      <el-table-column prop="description" label="故障信息" />
      <el-table-column prop="source" label="故障来源" width="300" />
      <!-- <el-table-column prop="level" label="故障等级" width="200" /> -->
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
