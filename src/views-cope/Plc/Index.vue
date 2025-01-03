<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
import TABLE from "./Table.vue";
import { useCraneStatusStore } from "@/store/modules/craneStatus";
const store = useCraneStatusStore();
import { storeToRefs } from "pinia";
import Urls from "@/store/urls";
const FaultUrls = [
  Urls.PlcStatus.GetHoistFault,
  Urls.PlcStatus.GetSwitchFault,
  Urls.PlcStatus.GetLargeVehicleFault,
  Urls.PlcStatus.GetSmallVehicleFault,
  Urls.PlcStatus.GetSystemFault
];
const LimitUrls = [
  Urls.PlcStatus.GetMachineLimit,
  Urls.PlcStatus.GetElectricLimit
];
const IOInputUrls = [
  Urls.PlcStatus.GetHoistInput,
  Urls.PlcStatus.GetSwitchInput,
  Urls.PlcStatus.GetLargeVehicleInput,
  Urls.PlcStatus.GetSmallVehicleInput,
  Urls.PlcStatus.GetSystemInput
];
const IOOutUrls = [
  Urls.PlcStatus.GetHoistOutput,
  Urls.PlcStatus.GetSwitchOutput,
  Urls.PlcStatus.GetLargeVehicleOutput,
  Urls.PlcStatus.GetSmallVehicleOutput,
  Urls.PlcStatus.GetSystemOutput
];
const RunStatus = [
  Urls.PlcStatus.GetStatusBit,
  Urls.PlcStatus.GetHoistStatus,
  Urls.PlcStatus.GetSwitchStatus,
  Urls.PlcStatus.GetLargeVehicleStatus,
  Urls.PlcStatus.GetSmallVehicleStatus,
  Urls.PlcStatus.GetBucketStatus,
  Urls.PlcStatus.GetAutoRunningStatus,
  Urls.PlcStatus.GetSystemStatus
];
const SystemParams = [
  Urls.PlcStatus.GetHoistSetUp,
  Urls.PlcStatus.GetSwitchSetUp,
  Urls.PlcStatus.GetElectricLimitSetUp,
  Urls.PlcStatus.GetSystemSetUp
];
const CarParams = [
  Urls.PlcStatus.GetLargeVehicleSetUp,
  Urls.PlcStatus.GetSmallVehicleSetUp,
  Urls.PlcStatus.GetBucketSetUp
];
// const {
//   PlcHoistFault,
//   PlcSwitchFault,
//   PlcLargeVehicleFault,
//   PlcSmallVehicleFault,
//   PlcSystemFault,
//   MachineLimit,
//   ElectricLimit,
//   HoistInput,
//   SwitchInput,
//   LargeVehicleInput,
//   SmallVehicleInput,
//   SystemInput,
//   HoistOutput,
//   SwitchOutput,
//   LargeVehicleOutput,
//   SmallVehicleOutput,
//   SystemOutput,
//   //运行状态
//   StatusBit,
//   HoistStatus,
//   SwitchStatus,
//   LargeVehicleStatus,
//   SmallVehicleStatus,
//   BucketStatus,
//   AotoRunningStatus,
//   SystemStatus
// } = storeToRefs(store);
</script>

<template>
  <el-tabs type="border-card" style="height: 98%; margin: 0.5rem; padding: 0">
    <el-tab-pane label="故障">
      <el-tabs style="margin: 0rem" type="border-card">
        <el-tab-pane label="起升故障">
          <TABLE :Urls="FaultUrls[0]" Title="故障状态" />
        </el-tab-pane>
        <el-tab-pane label="开闭故障">
          <TABLE :Urls="FaultUrls[1]" Title="故障状态" />
        </el-tab-pane>
        <el-tab-pane label="大车故障">
          <TABLE :Urls="FaultUrls[2]" Title="故障状态" />
        </el-tab-pane>
        <el-tab-pane label="小车故障">
          <TABLE :Urls="FaultUrls[3]" Title="故障状态" />
        </el-tab-pane>
        <el-tab-pane label="系统故障">
          <TABLE :Urls="FaultUrls[4]" Title="故障状态" />
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="限位">
      <el-tabs style="margin: 0rem" type="border-card">
        <el-tab-pane label="机械限位">
          <TABLE :Urls="LimitUrls[0]" Title="限位状态" />
        </el-tab-pane>
        <el-tab-pane label="电子限位">
          <TABLE :Urls="LimitUrls[1]" Title="限位状态" />
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="IO状态输入">
      <el-tabs style="margin: 0rem" type="border-card">
        <el-tab-pane label="起升输入">
          <TABLE :Urls="IOInputUrls[0]" Title="起升输入状态" />
        </el-tab-pane>
        <el-tab-pane label="开闭输入">
          <TABLE :Urls="IOInputUrls[1]" Title="开闭输入状态" />
        </el-tab-pane>
        <el-tab-pane label="大车输入">
          <TABLE :Urls="IOInputUrls[2]" Title="大车输入状态" />
        </el-tab-pane>
        <el-tab-pane label="小车输入">
          <TABLE :Urls="IOInputUrls[3]" Title="小车输入状态" />
        </el-tab-pane>
        <el-tab-pane label="系统输入">
          <TABLE :Urls="IOInputUrls[4]" Title="系统输入状态" />
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="IO状态输出">
      <el-tabs style="margin: 0rem" type="border-card">
        <el-tab-pane label="起升输出">
          <TABLE :Urls="IOOutUrls[0]" Title="起升输出状态" />
        </el-tab-pane>
        <el-tab-pane label="开闭输出">
          <TABLE :Urls="IOOutUrls[1]" Title="开闭输出状态" />
        </el-tab-pane>
        <el-tab-pane label="大车输出">
          <TABLE :Urls="IOOutUrls[2]" Title="大车输出状态" />
        </el-tab-pane>
        <el-tab-pane label="小车输出">
          <TABLE :Urls="IOOutUrls[3]" Title="小车输出状态" />
        </el-tab-pane>
        <el-tab-pane label="系统输出">
          <TABLE :Urls="IOOutUrls[4]" Title="系统输出状态" />
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="运行状态">
      <el-tabs style="margin: 0rem" type="border-card">
        <el-tab-pane label="系统状态">
          <TABLE :Urls="RunStatus[0]" Title="系统状态" />
        </el-tab-pane>
        <el-tab-pane label="起升状态">
          <TABLE :Urls="RunStatus[1]" Title="起升状态" />
        </el-tab-pane>
        <el-tab-pane label="开闭状态">
          <TABLE :Urls="RunStatus[2]" Title="开闭状态" />
        </el-tab-pane>
        <el-tab-pane label="大车状态">
          <TABLE :Urls="RunStatus[3]" Title="大车状态" />
        </el-tab-pane>
        <el-tab-pane label="小车状态">
          <TABLE :Urls="RunStatus[4]" Title="小车状态" />
        </el-tab-pane>
        <el-tab-pane label="抓斗状态">
          <TABLE :Urls="RunStatus[5]" Title="抓斗状态" />
        </el-tab-pane>
        <el-tab-pane label="自动运行状态">
          <TABLE :Urls="RunStatus[6]" Title="自动运行状态" />
        </el-tab-pane>
        <el-tab-pane label="通讯状态">
          <TABLE :Urls="RunStatus[7]" Title="通讯状态" />
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="系统参数设置">
      <el-tabs style="margin: 0rem" type="border-card">
        <el-tab-pane label="起升参数">
          <TABLE :Urls="SystemParams[0]" Title="起升参数数据" />
        </el-tab-pane>
        <el-tab-pane label="开闭参数">
          <TABLE :Urls="SystemParams[1]" Title="起升参数数据" />
        </el-tab-pane>
        <el-tab-pane label="大车参数">
          <TABLE :Urls="CarParams[0]" Title="大车参数数据" />
        </el-tab-pane>
        <el-tab-pane label="小车参数">
          <TABLE :Urls="CarParams[1]" Title="小车参数数据" />
        </el-tab-pane>
        <el-tab-pane label="抓斗参数">
          <TABLE :Urls="CarParams[2]" Title="抓斗参数数据" />
        </el-tab-pane>
        <el-tab-pane label="电子限位参数">
          <TABLE :Urls="SystemParams[2]" Title="电子限位参数数据" />
        </el-tab-pane>
        <el-tab-pane label="系统相关">
          <TABLE :Urls="SystemParams[3]" Title="系统相关数据" />
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>
