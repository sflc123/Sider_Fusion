import { defineStore } from "pinia";
import { store } from "../utils";
import axios from "axios";
import Urls from "../urls";

export const useCraneStatusStore = defineStore({
  id: "gbm-crane1-status",
  state: (): any => {
    return {
      infoPrompt: [],
      isInitialized: false,
      CraneInfoMation: {
        bucketStatus: "",
        currentX: 0,
        currentY: 0,
        currentZ: 0,
        largeVehicleStatus: "",
        openRatio: 0,
        workOrderStep: 0,
        isCanceled: false,
        operationMode: "",
        smallVehicleStatus: "",
        targetX: 0,
        targetY: 0,
        targetZ: 0,
        weight: 0,
        workType: ""
      },
      Info: {
        Name: "GBM-Crane1"
      },
      WorkMode: "",
      OperationMode: "",
      Weight: "",
      sendputlocation: {
        loadlocation: [],
        unloadlocation: []
      },
      DeviceStatus: {
        largevehicle: {
          ready: false,
          error: false,
          paused: false,
          running: false,
          limited: false
        },
        smallvehicle: {
          ready: false,
          error: false,
          paused: false,
          running: false,
          limited: false
        },
        bucket: {
          ready: false,
          error: false,
          paused: false,
          running: false,
          limited: false
        }
      },
      CurrentPosition: {
        x: 0,
        y: 0,
        z: 0
      },
      OpenRatio: 0,
      TargetPosition: {
        x: 0,
        y: 0,
        z: 0
      },
      Limit: {
        hoist: {
          OverTempereture: false,
          OverSpeed: false,
          OverLoad: true,
          // HeavyPunch: false,
          UpDecelerate: false,
          DownDecelerate: false,
          UpStop: false,
          DownStop: false
        },
        switch: {
          OverTempereture: false,
          OverSpeed: true,
          // overLoad: false,
          HeavyPunch: false,
          UpDecelerate: false,
          DownDecelerate: true,
          UpStop: false,
          DownStop: false
        }
      },
      Electric: {
        voltage: 0,
        current: {
          HoistCurrent: 0,
          SwitchCurrent: 0
        }
      },
      Speed: {
        LargeVehicle: 0,
        SmallVehicle: 0,
        Bucket: 0
      },
      Gear: 0,
      Fault: {
        SystemFault: false,
        HoistFault: false,
        SwitchFault: false,
        LargeVehicleFault: false,
        SmallVehicleFault: false
      },
      PlcHoistFault: [],
      PlcSwitchFault: [],
      PlcLargeVehicleFault: [],
      PlcSmallVehicleFault: [],
      PlcSystemFault: [],
      //限位
      MachineLimit: [],
      ElectricLimit: [],
      //IO输入输出
      HoistInput: [],
      SwitchInput: [],
      LargeVehicleInput: [],
      SmallVehicleInput: [],
      SystemInput: [],
      HoistOutput: [],
      SwitchOutput: [],
      LargeVehicleOutput: [],
      SmallVehicleOutput: [],
      SystemOutput: [],
      //运行状态
      StatusBit: [],
      HoistStatus: [],
      SwitchStatus: [],
      LargeVehicleStatus: [],
      SmallVehicleStatus: [],
      BucketStatus: [],
      AotoRunningStatus: [],
      SystemStatus: [],
      //参数设置
      HoistSetUp: [],
      SwitchSetUp: [],
      LargeVehicleSetUp: [],
      SmallVehicleSetUp: [],
      BucketSetUp: [],
      ElectricLimitSetUp: [],
      SystemSetUp: [],
      //监控页面
      Current: [],
      LoadWeight: [],
      EmergencyStopInfo: []
    };
  },
  getters: {
    getInfo(state) {
      return state.Info;
    },
    getTargetPosition(state) {
      return state.targetPosition;
    },
    getHiddenSideBar(state) {
      return state.electric;
    }
  },
  actions: {
    AddInfoPrompt(prompt) {
      this.infoPrompt.push(prompt);
      if (this.infoPrompt.length > 50) this.infoPrompt.shift();
    },
    CHANGE_SETTING({ key, value }) {
      if (Reflect.has(this, key)) {
        this[key] = value;
      }
    },
    setCurrentPosition(location) {
      this.CurrentPosition = location;
    },
    async getCurrentPosition() {
      return await axios.get(
        "http://192.168.8.50:5078/plc/PlcStatus/ReadLocation"
      );
    },
    changeSetting(data) {
      this.CHANGE_SETTING(data);
    },
    async tick(num) {
      if (num % 1 === 0) {
        this.CurrentPosition = (
          await axios.get(Urls.PlcStatus.ReadCurrentLocation)
        ).data;
      }
      if (num % 1 === 0)
        this.targetPosition = (
          await axios.get(Urls.PlcStatus.ReadTargetLocation)
        ).data;
      if (num % 1 === 0) {
        this.DeviceStatus = (
          await axios.get(Urls.PlcStatus.DeviceStatusRespectively)
        ).data;
        // console.log(">>>>>>", this.DeviceStatus);
        // console.log(">>>>>>", this.DeviceStatus.Smallvehicle);
        // console.log(">>>>>>", this.DeviceStatus.Smallvehicle.Ready);
      }
      // if (num % 1 === 0) this.Info = await axios.get(Urls.PlcStatus.ReadSpeed);
      if (num % 1 === 0)
        this.WorkMode = (await axios.get(Urls.PlcStatus.GetWorkMode)).data;
      if (num % 1 === 0)
        this.Limit = (await axios.get(Urls.PlcStatus.GetLimit)).data;

      if (num % 1 === 0)
        this.Speed = (await axios.get(Urls.PlcStatus.GetSpeed)).data;
      if (num % 1 === 0)
        this.Gear = (await axios.get(Urls.PlcStatus.GetGear)).data;
      // if (num % 1 === 0) this.Fault = await axios.get(Urls.Fault.Fault);
      //故障测试接口
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetHoistFault);
        this.PlcHoistFault = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetSwitchFault);
        this.PlcSwitchFault = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetLargeVehicleFault);
        this.PlcLargeVehicleFault = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetSmallVehicleFault);
        this.PlcSmallVehicleFault = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetSystemFault);
        this.PlcSystemFault = response.data;
      }
      //限位接口
      if (num % 1 === 0)
        this.MachineLimit = (
          await axios.get(Urls.PlcStatus.GetMachineLimit)
        ).data;
      if (num % 1 === 0)
        this.ElectricLimit = (
          await axios.get(Urls.PlcStatus.GetElectricLimit)
        ).data;
      //IO输入输出接口
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetHoistInput);
        this.HoistInput = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetSwitchInput);
        this.SwitchInput = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetLargeVehicleInput);
        this.LargeVehicleInput = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetSmallVehicleInput);
        this.SmallVehicleInput = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetSystemInput);
        this.SystemInput = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetHoistOutput);
        this.HoistOutput = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetSwitchOutput);
        this.SwitchOutput = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetLargeVehicleOutput);
        this.LargeVehicleOutput = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetSmallVehicleOutput);
        this.SmallVehicleOutput = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetSystemOutput);
        this.SystemOutput = response.data;
      }
      //运行状态
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetStatusBit);
        this.StatusBit = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetHoistStatus);
        this.HoistStatus = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetSwitchStatus);
        this.SwitchStatus = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetLargeVehicleStatus);
        this.LargeVehicleStatus = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetSmallVehicleStatus);
        this.SmallVehicleStatus = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetBucketStatus);
        this.BucketStatus = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetAutoRunningStatus);
        this.AutoRunningStatus = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetSystemStatus);
        this.SystemStatus = response.data;
      }

      //参数设置
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetHoistSetUp);
        this.HoistSetUp = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetSwitchSetUp);
        this.SwitchSetUp = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetLargeVehicleSetUp);
        this.LargeVehicleSetUp = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetSmallVehicleSetUp);
        this.SmallVehicleSetUp = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetBucketSetUp);
        this.BucketSetUp = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetElectricLimitSetUp);
        this.ElectricLimitSetUp = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetSystemSetUp);
        this.SystemSetUp = response.data;
      }
      //监控页面
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetCurrent);
        this.Current = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetLoadWeight);
        this.LoadWeight = response.data;
      }
      if (num % 1 === 0) {
        const response = await axios.get(Urls.PlcStatus.GetEmergencyStopInfo);
        this.EmergencyStopInfo = response.data;
      }
    }
  }
});

export function useCraneStatusStoreHook() {
  return useCraneStatusStore(store);
}
