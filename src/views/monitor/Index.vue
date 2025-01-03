<script lang="ts" setup>
import { reactive, ref, onMounted, onUnmounted } from "vue";
import Urls from "@/store/urls";
import { useCraneStatusStore } from "@/store/modules/craneStatus";
import CraneStatus from "./SubFile/CraneStatus.vue";
import AutoStatus from "./AutoStatus.vue";
import axios from "axios";
import Twocars from "./SubFile/TwoCars.vue";
import ThreeCars from "./SubFile/ThreeCars.vue";
// import * as urlsModule from "@/store/urls";
// const API = urlsModule.API;
// const cancelRequest = urlsModule.cancelRequest;
import { API, useRequest } from "@/store/urls";
const { requestUrl, cancelRequest } = useRequest();
const store = useCraneStatusStore();
const AutoStatusUrl = [
  { 系统状态: Urls.PlcStatus.GetStatusBit },
  { 系统故障: Urls.PlcStatus.GetSystemFault }
];
let isComponentMounted = true; // 标志位
const AutoDataUrl = [{ 自动运行状态: Urls.PlcStatus.GetAutoRunningStatus }];
const craneStatus = [
  { 起升机构: Urls.PlcStatus.GetHoistStatus },
  { 开闭机构: Urls.PlcStatus.GetSwitchStatus },
  { 大车机构: Urls.PlcStatus.GetLargeVehicleStatus },
  { 小车机构: Urls.PlcStatus.GetSmallVehicleStatus }
];
const DataList = [
  { 急停故障: Urls.PlcStatus.GetEmergencyStopInfo },
  { 电流信息: Urls.PlcStatus.GetCurrent },
  { 速度信息: Urls.PlcStatus.GetSpeed }
];

const craneStatusData = ref([]);
const ElectricLimitStatasData = ref([]);
const AutoStatusUrlData = ref([]);
const DataListData = ref([]);
const AutoDataUrlData = ref([]);

const unitMapping: Record<string, string> = {
  起升电流: "A",
  开闭电流: "A",
  大车电流: "A",
  小车电流: "A",
  起升速度: "m/s",
  开闭速度: "m/s",
  大车速度: "m/s",
  小车速度: "m/s"
};

//限位故障
const GetElectricLimitStatasData = async () => {
  API.PlcStatus.ElectricLimit(requestUrl)
    .then(response => {
      // 假设 response 是一个数组
      ElectricLimitStatasData.value = response.map(item => item);
      // 提取数据
      const originalData = ElectricLimitStatasData.value;

      // 分割数据
      const chunkSize = Math.ceil(originalData.length / 4);
      const chunkedData = [];
      for (let i = 0; i < originalData.length; i += chunkSize) {
        chunkedData.push(originalData.slice(i, i + chunkSize));
      }
      // 重新构造响应式数组
      ElectricLimitStatasData.value = chunkedData;
    })
    .catch(error => {
      console.error("限位故障请求失败:", error);
    });
};
//大小车、起升开闭机构
const GetcraneStatusData = async () => {
  try {
    const [hoistStatus, switchStatus, largeVehicleStatus, smallVehicleStatus] =
      await axios.all([
        API.PlcStatus.HoistStatus(requestUrl),
        API.PlcStatus.SwitchStatus(requestUrl),
        API.PlcStatus.LargeVehicleStatus(requestUrl),
        API.PlcStatus.SmallVehicleStatus(requestUrl)
      ]);

    craneStatusData.value = [
      hoistStatus,
      switchStatus,
      largeVehicleStatus,
      smallVehicleStatus
    ];
  } catch (error) {
    console.error("Error in one of the crane status requests:", error);
  }
};
//系统状态/故障
const GetAutoStatusUrlData = async () => {
  try {
    const [statusBit, systemFault] = await axios.all([
      API.PlcStatus.StatusBit(requestUrl),
      API.PlcStatus.SystemFault(requestUrl)
    ]);

    AutoStatusUrlData.value = [statusBit, systemFault];
  } catch (error) {
    console.error("Error in one of the crane status requests:", error);
  }
};
//电流，急停，速度
const GetDataListData = async () => {
  try {
    const [emergencyStopInfo, current, speed] = await axios.all([
      API.PlcStatus.GetEmergencyStopInfo(requestUrl),
      API.PlcStatus.GetCurrent(requestUrl),
      API.PlcStatus.GetSpeed(requestUrl)
    ]);

    DataListData.value = [emergencyStopInfo, current, speed];
    // 获取第二个数组对象
    const secondObject = DataListData.value[1];
    const secondObject1 = DataListData.value[2];

    // 遍历对象并修改变量名称
    const updatedObject = Object.entries(secondObject).reduce(
      (acc, [key, value]) => {
        acc[`${key}(${unitMapping[key] || ""})`] = value;
        return acc;
      },
      {}
    );
    const updatedObject1 = Object.entries(secondObject1).reduce(
      (acc, [key, value]) => {
        acc[`${key}(${unitMapping[key] || ""})`] = value;
        return acc;
      },
      {}
    );
    DataListData.value[1] = updatedObject;
    DataListData.value[2] = updatedObject1;
  } catch (error) {
    console.error("Error in one of the crane status requests:", error);
  }
};
// 自动运行状态
const GetAutoDataUrlData = async () => {
  API.PlcStatus.AutoRunningStatus(requestUrl)
    .then(response => {
      AutoDataUrlData.value = [response];
    })
    .catch(error => {
      console.error("自动运行状态请求失败:", error);
    });
};
let intervalId1 = null;
const fetchData = async () => {
  if (!isComponentMounted) return; // 如果组件已卸载，则不再执行请求
  await GetcraneStatusData();
  await GetElectricLimitStatasData();
  await GetAutoStatusUrlData();
  await GetDataListData();
  await GetAutoDataUrlData();
  if (isComponentMounted) {
    console.log("启用计时器");
  }
};
onMounted(() => {
  fetchData(); // 立即执行一次
  intervalId1 = setInterval(fetchData, 1000); // 每秒执行一次
});

onUnmounted(() => {
  isComponentMounted = false; // 设置标志位为 false
  clearInterval(intervalId1);
  console.log("清除计时器");
  cancelRequest();
});
</script>

<template>
  <el-tabs type="border-card" style="height: 96%; margin: 1rem">
    <el-tab-pane label="行车状态">
      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in ElectricLimitStatasData"
          :key="index"
          :span="6"
        >
          <el-card shadow="always">
            <el-table :data="ElectricLimitStatasData[index]">
              <el-table-column prop="name" label="限位故障" align="left" />
              <el-table-column label="状态" align="center">
                <template #default="scope">
                  <template
                    v-if="
                      scope.row.data === 'False' || scope.row.data === 'True'
                    "
                  >
                    <el-tag
                      effect="dark"
                      round
                      :type="scope.row.data === 'False' ? 'success' : 'danger'"
                    />
                  </template>
                  <template v-else>
                    <span>{{ scope.row.data }}</span>
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col v-for="(item, index) in craneStatus" :key="index" :span="6">
          <el-card shadow="always" class="h-full">
            <el-table :data="craneStatusData[index]">
              <el-table-column
                prop="name"
                :label="Object.keys(item)[0]"
                align="left"
              />
              <el-table-column label="数据" align="center">
                <template #default="scope">
                  <template
                    v-if="
                      scope.row.data === 'False' || scope.row.data === 'True'
                    "
                  >
                    <el-tag
                      effect="dark"
                      round
                      :type="scope.row.data === 'False' ? 'success' : 'danger'"
                    />
                  </template>
                  <template v-else>
                    <span>{{ scope.row.data }}</span>
                  </template>
                </template>
              </el-table-column>
            </el-table></el-card
          >
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="自动运行状态">
      <el-row :gutter="20">
        <el-col v-for="(item, index) in DataListData" :key="index" :span="8">
          <el-card shadow="always" class="h-full">
            <el-table :data="Object.entries(item)">
              <el-table-column
                :label="
                  index === 0
                    ? '急停故障'
                    : index === 1
                      ? '电流信息'
                      : '速度信息'
                "
              >
                <template #default="scope">
                  {{ scope.row[0] }}
                </template>
              </el-table-column>
              <el-table-column
                :label="index === 0 ? '状态' : '数据'"
                align="center"
              >
                <template #default="scope">
                  <template
                    v-if="scope.row[1] === 'False' || scope.row[1] === 'True'"
                  >
                    <el-tag
                      effect="dark"
                      round
                      :type="scope.row[1] === 'False' ? 'success' : 'danger'"
                    />
                  </template>
                  <template v-else>
                    <span>{{ scope.row[1] }}</span>
                  </template>
                </template>
              </el-table-column>
            </el-table></el-card
          >
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col v-for="(item, index) in AutoStatusUrl" :key="index" :span="8">
          <el-card shadow="always" class="h-full">
            <el-table :data="AutoStatusUrlData[index]">
              <el-table-column
                prop="name"
                :label="Object.keys(item)[0]"
                align="left"
                class=""
              />
              <el-table-column label="状态" align="center">
                <template #default="scope">
                  <template
                    v-if="
                      scope.row.data === 'False' || scope.row.data === 'True'
                    "
                  >
                    <el-tag
                      effect="dark"
                      round
                      :type="scope.row.data === 'False' ? 'success' : 'danger'"
                    />
                  </template>
                  <template v-else>
                    <span>{{ scope.row.data }}</span>
                  </template>
                </template>
              </el-table-column>
            </el-table></el-card
          >
        </el-col>
        <el-col v-for="(param, index) in AutoDataUrl" :key="index" :span="8">
          <el-card shadow="always" class="h-full">
            <el-table :data="AutoDataUrlData[index]">
              <el-table-column :label="Object.keys(param)[0]" prop="name" />
              <el-table-column label="数据" align="center">
                <template #default="scope">
                  <template
                    v-if="
                      scope.row.data === 'False' || scope.row.data === 'True'
                    "
                  >
                    <el-tag
                      effect="dark"
                      round
                      style="width: 20px; height: 20px"
                      :type="scope.row.data === 'False' ? 'success' : 'danger'"
                    />
                  </template>
                  <template v-else>
                    <span>{{ scope.row.data }}</span>
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>
.el-row {
  margin-bottom: 1rem;
}
</style>
