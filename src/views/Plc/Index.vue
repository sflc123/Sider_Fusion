<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
import TABLE from "./Table.vue";
import { useCraneStatusStore } from "@/store/modules/craneStatus";
const store = useCraneStatusStore();
import { storeToRefs } from "pinia";
import { API, useRequest } from "@/store/urls";
const { requestUrl, cancelRequest } = useRequest();
import Urls from "@/store/urls";
const FaultUrls = [
  API.PlcStatus.HoistFault(requestUrl),
  API.PlcStatus.SwitchFault(requestUrl),
  API.PlcStatus.LargeVehicleFault(requestUrl),
  API.PlcStatus.SmallVehicleFault(requestUrl),
  API.PlcStatus.SystemFault(requestUrl)
];
const LimitUrls = [
  API.PlcStatus.MachineLimit(requestUrl),
  API.PlcStatus.ElectricLimit(requestUrl)
];
const IOInputUrls = [
  API.PlcStatus.HoistInput(requestUrl),
  API.PlcStatus.SwitchInput(requestUrl),
  API.PlcStatus.LargeVehicleInput(requestUrl),
  API.PlcStatus.SmallVehicleInput(requestUrl),
  API.PlcStatus.SystemInput(requestUrl)
];
const IOOutUrls = [
  API.PlcStatus.HoistOutput(requestUrl),
  API.PlcStatus.SwitchOutput(requestUrl),
  API.PlcStatus.LargeVehicleOutput(requestUrl),
  API.PlcStatus.SmallVehicleOutput(requestUrl),
  API.PlcStatus.SystemOutput(requestUrl)
];
const RunStatus = [
  API.PlcStatus.StatusBit(requestUrl),
  API.PlcStatus.HoistStatus(requestUrl),
  API.PlcStatus.SwitchStatus(requestUrl),
  API.PlcStatus.LargeVehicleStatus(requestUrl),
  API.PlcStatus.SmallVehicleStatus(requestUrl),
  API.PlcStatus.BucketStatus(requestUrl),
  API.PlcStatus.AutoRunningStatus(requestUrl),
  API.PlcStatus.SystemStatus(requestUrl)
];
const SystemParams = [
  API.PlcStatus.HoistSetUp(requestUrl),
  API.PlcStatus.SwitchSetUp(requestUrl),
  API.PlcStatus.ElectricLimitSetUp(requestUrl),
  API.PlcStatus.SystemSetUp(requestUrl)
];
const CarParams = [
  API.PlcStatus.LargeVehicleSetUp(requestUrl),
  API.PlcStatus.SmallVehicleSetUp(requestUrl),
  API.PlcStatus.BucketSetUp(requestUrl)
];
</script>

<template>
  <el-tabs type="border-card" style="height: 98%; margin: 0.5rem; padding: 0">
    <el-tab-pane label="故障">
      <el-tabs style="margin: 0rem" type="border-card">
        <el-tab-pane label="起升故障">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="FaultUrls[0]"
            Title="故障状态"
          />
        </el-tab-pane>
        <el-tab-pane label="开闭故障">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="FaultUrls[1]"
            Title="故障状态"
          />
        </el-tab-pane>
        <el-tab-pane label="大车故障">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="FaultUrls[2]"
            Title="故障状态"
          />
        </el-tab-pane>
        <el-tab-pane label="小车故障">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="FaultUrls[3]"
            Title="故障状态"
          />
        </el-tab-pane>
        <el-tab-pane label="系统故障">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="FaultUrls[4]"
            Title="故障状态"
          />
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="限位">
      <el-tabs style="margin: 0rem" type="border-card">
        <el-tab-pane label="机械限位">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="LimitUrls[0]"
            Title="限位状态"
          />
        </el-tab-pane>
        <el-tab-pane label="电子限位">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="LimitUrls[1]"
            Title="限位状态"
          />
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="IO状态输入">
      <el-tabs style="margin: 0rem" type="border-card">
        <el-tab-pane label="起升输入">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="IOInputUrls[0]"
            Title="起升输入状态"
          />
        </el-tab-pane>
        <el-tab-pane label="开闭输入">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="IOInputUrls[1]"
            Title="开闭输入状态"
          />
        </el-tab-pane>
        <el-tab-pane label="大车输入">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="IOInputUrls[2]"
            Title="大车输入状态"
          />
        </el-tab-pane>
        <el-tab-pane label="小车输入">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="IOInputUrls[3]"
            Title="小车输入状态"
          />
        </el-tab-pane>
        <el-tab-pane label="系统输入">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="IOInputUrls[4]"
            Title="系统输入状态"
          />
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="IO状态输出">
      <el-tabs style="margin: 0rem" type="border-card">
        <el-tab-pane label="起升输出">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="IOOutUrls[0]"
            Title="起升输出状态"
          />
        </el-tab-pane>
        <el-tab-pane label="开闭输出">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="IOOutUrls[1]"
            Title="开闭输出状态"
          />
        </el-tab-pane>
        <el-tab-pane label="大车输出">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="IOOutUrls[2]"
            Title="大车输出状态"
          />
        </el-tab-pane>
        <el-tab-pane label="小车输出">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="IOOutUrls[3]"
            Title="小车输出状态"
          />
        </el-tab-pane>
        <el-tab-pane label="系统输出">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="IOOutUrls[4]"
            Title="系统输出状态"
          />
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="运行状态">
      <el-tabs style="margin: 0rem" type="border-card">
        <el-tab-pane label="系统状态">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="RunStatus[0]"
            Title="系统状态"
          />
        </el-tab-pane>
        <el-tab-pane label="起升状态">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="RunStatus[1]"
            Title="起升状态"
          />
        </el-tab-pane>
        <el-tab-pane label="开闭状态">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="RunStatus[2]"
            Title="开闭状态"
          />
        </el-tab-pane>
        <el-tab-pane label="大车状态">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="RunStatus[3]"
            Title="大车状态"
          />
        </el-tab-pane>
        <el-tab-pane label="小车状态">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="RunStatus[4]"
            Title="小车状态"
          />
        </el-tab-pane>
        <el-tab-pane label="抓斗状态">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="RunStatus[5]"
            Title="抓斗状态"
          />
        </el-tab-pane>
        <el-tab-pane label="自动运行状态">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="RunStatus[6]"
            Title="自动运行状态"
          />
        </el-tab-pane>
        <el-tab-pane label="通讯状态">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="RunStatus[7]"
            Title="通讯状态"
          />
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="系统参数设置">
      <el-tabs style="margin: 0rem" type="border-card">
        <el-tab-pane label="起升参数">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="SystemParams[0]"
            Title="起升参数数据"
          />
        </el-tab-pane>
        <el-tab-pane label="开闭参数">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="SystemParams[1]"
            Title="起升参数数据"
          />
        </el-tab-pane>
        <el-tab-pane label="大车参数">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="CarParams[0]"
            Title="大车参数数据"
          />
        </el-tab-pane>
        <el-tab-pane label="小车参数">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="CarParams[1]"
            Title="小车参数数据"
          />
        </el-tab-pane>
        <el-tab-pane label="抓斗参数">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="CarParams[2]"
            Title="抓斗参数数据"
          />
        </el-tab-pane>
        <el-tab-pane label="电子限位参数">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="SystemParams[2]"
            Title="电子限位参数数据"
          />
        </el-tab-pane>
        <el-tab-pane label="系统相关">
          <TABLE
            :cancelRequest="cancelRequest"
            :Urls="SystemParams[3]"
            Title="系统相关数据"
          />
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>
