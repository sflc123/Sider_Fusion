const serverUrl = "http://192.168.1.129:5078/";
import axios, { type CancelTokenSource } from "axios";
import { ref, onUnmounted } from "vue";
// axios.defaults.baseURL = "http://192.168.1.129:5078/";
const MAX_TOKENS = 10; // 例如，最大保留10个 token
export function useRequest() {
  const cancelTokens = ref<CancelTokenSource[]>([]);

  const requestUrl = async (
    url: string,
    method: "get" | "post" | "put" | "delete",
    data?: any,
    params?: any
  ) => {
    const cancelTokenSource = axios.CancelToken.source();
    if (cancelTokens.value.length >= MAX_TOKENS) {
      cancelTokens.value.shift(); // 删除数组第一个元素
    }
    cancelTokens.value.push(cancelTokenSource);

    try {
      // 如果存在查询参数，则将其附加到URL中
      if (params) {
        const urlObj = new URL(url);
        Object.keys(params).forEach(key =>
          urlObj.searchParams.append(key, params[key])
        );
        url = urlObj.toString();
      }

      const config = {
        url,
        method,
        cancelToken: cancelTokenSource.token, // 添加 cancel token 到请求配置中
        ...(method === "get" ? { params } : { data })
      };

      const response = await axios(config);
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.error(`API request failed: ${error}`);
      }
      throw error;
    } finally {
      // 移除已经完成或取消的请求的取消令牌
      cancelTokens.value = cancelTokens.value.filter(
        token => token !== cancelTokenSource
      );
    }
  };

  // 在组件卸载时调用此方法来取消所有未完成的请求
  const cancelRequest = () => {
    cancelTokens.value.forEach(token =>
      token.cancel("Operation canceled by the user.")
    );
    cancelTokens.value = []; // 清空取消令牌数组
  };

  onUnmounted(() => {
    cancelRequest();
  });

  return { requestUrl, cancelRequest };
}
// 在 API 对象中，调整相应的定义来传递 params 或 data
export const API = {
  AutoCrane: {
    AutoRunning: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "AutoCrane/AutoRunning", "post", data),
    EndTask: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "AutoCrane/EndTask", "post", data),
    AutoParking: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data: any
    ) => requestUrl(serverUrl + "AutoCrane/AutoParking/1", "post", data),
    ScanEntireArea: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "AutoCrane/ScanEntireArea", "post", data)
  },
  CraneConfig: {
    IsAntiSway: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "CraneConfig/IsAntiSway", "get", data),
    LargeVehicleSpeed: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "CraneConfig/LargeVehicleSpeed", "get", data),
    SmallVehicleSpeed: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "CraneConfig/SmallVehicleSpeed", "get", data),
    LiftSpeed: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "CraneConfig/LiftSpeed", "get", data)
  },
  DataBase: {
    AddOperator: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "DataBase/AddOperator", "put", data),
    UpdateOperator: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "DataBase/UpdateOperator", "put", data),
    GetAllOperator: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "DataBase/GetAllOperator",
        "get",
        undefined,
        params
      ),
    AddPrompt: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "DataBase/AddPrompt", "post", data),
    GetPrompt: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) => requestUrl(serverUrl + "DataBase/GetPrompt", "get", undefined, params),
    GetPromptAmount: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "DataBase/GetPromptAmount",
        "get",
        undefined,
        params
      ),
    GetPromptAndFault: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "DataBase/GetPromptAndFault",
        "get",
        undefined,
        params
      ),
    GetFault: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) => requestUrl(serverUrl + "DataBase/GetFault", "get", undefined, params),
    GetFaultAmount: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "DataBase/GetFaultAmount",
        "get",
        undefined,
        params
      ),
    GetRunningWorkOrder: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "DataBase/GetRunningWorkOrder",
        "get",
        undefined,
        params
      ),
    GetAllWorkOrder: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "DataBase/GetAllWorkOrder",
        "get",
        undefined,
        params
      ),
    GetAllWorkOrderAmount: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "DataBase/GetAllWorkOrderAmount",
        "get",
        undefined,
        params
      ),
    GetGroundDivision: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "DataBase/GetGroundDivision",
        "get",
        undefined,
        params
      ),
    GetPourPoints: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "DataBase/GetPourPoints",
        "get",
        undefined,
        params
      ),
    GetPara: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) => requestUrl(serverUrl + "DataBase/GetPara", "get", undefined, params),
    GetCraneStatus: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(serverUrl + "DataBase/CraneStatus", "get", undefined, params),
    GetInventory: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(serverUrl + "DataBase/GetInventory", "get", undefined, params)
  },
  Fault: {
    Fault: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "api/Fault", "get", data)
  },
  PlcManipulate: {
    // PerformTask: (
    //   requestUrl: ReturnType<typeof useRequest>["requestUrl"],
    //   data?: any
    // ) => requestUrl(serverUrl + "PlcManipulate/PerformTask", "put", data),
    // //撤销
    // UndoTask: (
    //   requestUrl: ReturnType<typeof useRequest>["requestUrl"],
    //   data?: any
    // ) => requestUrl(serverUrl + "PlcManipulate/UndoTask", "put", data),
    //暂停
    PauseTask: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "PlcManipulate/PauseTask", "post", data),
    //继续
    ContinueTask: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "PlcManipulate/ContinueTask", "post", data),
    MoveLargeVehicle: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "PlcManipulate/MoveLargeVehicle", "put", data),
    MoveSmallVehicle: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "PlcManipulate/MoveSmallVehicle", "put", data),
    MoveBucketVehicle: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "PlcManipulate/MoveBucketVehicle", "put", data)
  },
  PlcSetUp: {
    SetWorkMode: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "PlcSetUp/SetWorkMode", "put", data),
    SetAntiSway: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "PlcSetUp/SetAntiSway", "put", data),
    SetTargetX: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "PlcSetUp/SetTargetX", "put", data),
    SetTargetY: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "PlcSetUp/SetTargetY", "put", data),
    SetTargetZ: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "PlcSetUp/SetTargetZ", "put", data),
    SetTargetLocation: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "PlcSetUp/SetTargetLocation", "put", data),
    SetLargeVehicle: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "PlcSetUp/SetLargeVehicle", "put", data),
    SetSmallVehicle: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "PlcSetUp/SetSmallVehicle", "put", data),
    SetHoist: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "PlcSetUp/SetHoist", "put", data),
    SetSwitch: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "PlcSetUp/SetSwitch", "put", data),
    SetBucket: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "PlcSetUp/SetBucket", "put", data),
    SetElectricLimit: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "PlcSetUp/SetElectricLimit", "put", data),
    SetSystem: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "PlcSetUp/SetSystem", "put", data)
  },
  PlcStatus: {
    // AutoRunning: (
    //   requestUrl: ReturnType<typeof useRequest>["requestUrl"],
    //   data?: any
    // ) => requestUrl(serverUrl + "AutoCrane/AutoRunning", "post", data),
    GetMainPageData: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "PlcStatus/GetMainPageData", "post", data),
    TheReadData: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(serverUrl + "PlcStatus/TheReadData", "get", undefined, params),
    TheWriteData: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/TheWriteData",
        "get",
        undefined,
        params
      ),
    X: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) => requestUrl(serverUrl + "PlcStatus/X", "get", undefined, params),
    CurrentLocation: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/CurrentLocation",
        "get",
        undefined,
        params
      ),
    TargetLocation: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/TargetLocation",
        "get",
        undefined,
        params
      ),
    CurrentStatusIntergrally: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/CurrentStatusIntergrally",
        "get",
        undefined,
        params
      ),
    DeviceStatusRespectively: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/DeviceStatusRespectively",
        "get",
        undefined,
        params
      ),
    GetLimit: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) => requestUrl(serverUrl + "PlcStatus/GetLimit", "get", undefined, params),
    GetOpenRatio: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/GetOpenRatio",
        "get",
        undefined,
        params
      ),
    GetCurrent: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(serverUrl + "PlcStatus/GetCurrent", "get", undefined, params),
    GetSpeed: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) => requestUrl(serverUrl + "PlcStatus/GetSpeed", "get", undefined, params),
    GetWorkMode: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(serverUrl + "PlcStatus/GetWorkMode", "get", undefined, params),
    GetAntiSway: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(serverUrl + "PlcStatus/GetAntiSway", "get", undefined, params),
    GetGear: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) => requestUrl(serverUrl + "PlcStatus/GetGear", "get", undefined, params),
    GetLoadWeight: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/GetLoadWeight",
        "get",
        undefined,
        params
      ),
    GetEmergencyStopInfo: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/GetEmergencyStopInfo",
        "get",
        undefined,
        params
      ),
    HoistFault: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(serverUrl + "PlcStatus/HoistFault", "get", undefined, params),
    SwitchFault: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(serverUrl + "PlcStatus/SwitchFault", "get", undefined, params),
    LargeVehicleFault: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/LargeVehicleFault",
        "get",
        undefined,
        params
      ),
    SmallVehicleFault: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/SmallVehicleFault",
        "get",
        undefined,
        params
      ),
    SystemFault: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(serverUrl + "PlcStatus/SystemFault", "get", undefined, params),
    MachineLimit: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/MachineLimit",
        "get",
        undefined,
        params
      ),
    ElectricLimit: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/ElectricLimit",
        "get",
        undefined,
        params
      ),
    HoistInput: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(serverUrl + "PlcStatus/HoistInput", "get", undefined, params),
    SwitchInput: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(serverUrl + "PlcStatus/SwitchInput", "get", undefined, params),
    LargeVehicleInput: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/LargeVehicleInput",
        "get",
        undefined,
        params
      ),
    SmallVehicleInput: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/SmallVehicleInput",
        "get",
        undefined,
        params
      ),
    SystemInput: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(serverUrl + "PlcStatus/SystemInput", "get", undefined, params),
    HoistOutput: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(serverUrl + "PlcStatus/HoistOutput", "get", undefined, params),
    SwitchOutput: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/SwitchOutput",
        "get",
        undefined,
        params
      ),
    LargeVehicleOutput: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/LargeVehicleOutput",
        "get",
        undefined,
        params
      ),
    SmallVehicleOutput: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/SmallVehicleOutput",
        "get",
        undefined,
        params
      ),
    SystemOutput: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/SystemOutput",
        "get",
        undefined,
        params
      ),
    StatusBit: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(serverUrl + "PlcStatus/StatusBit", "get", undefined, params),
    HoistStatus: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(serverUrl + "PlcStatus/HoistStatus", "get", undefined, params),
    SwitchStatus: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/SwitchStatus",
        "get",
        undefined,
        params
      ),
    LargeVehicleStatus: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/LargeVehicleStatus",
        "get",
        undefined,
        params
      ),
    SmallVehicleStatus: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/SmallVehicleStatus",
        "get",
        undefined,
        params
      ),
    BucketStatus: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/BucketStatus",
        "get",
        undefined,
        params
      ),
    AutoRunningStatus: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/AutoRunningStatus",
        "get",
        undefined,
        params
      ),
    SystemStatus: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/SystemStatus",
        "get",
        undefined,
        params
      ),
    HoistSetUp: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(serverUrl + "PlcStatus/HoistSetUp", "get", undefined, params),
    SwitchSetUp: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(serverUrl + "PlcStatus/SwitchSetUp", "get", undefined, params),
    LargeVehicleSetUp: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/LargeVehicleSetUp",
        "get",
        undefined,
        params
      ),
    SmallVehicleSetUp: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/SmallVehicleSetUp",
        "get",
        undefined,
        params
      ),
    BucketSetUp: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(serverUrl + "PlcStatus/BucketSetUp", "get", undefined, params),
    ElectricLimitSetUp: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "PlcStatus/ElectricLimitSetUp",
        "get",
        undefined,
        params
      ),
    SystemSetUp: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(serverUrl + "PlcStatus/SystemSetUp", "get", undefined, params)
  },
  ScannerConfig: {
    ScannerConfig: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "ScannerConfig/ScannerConfig",
        "get",
        undefined,
        params
      )
  },
  ScannerData: {
    GetArray: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "ScannerData/GetArray", "post", data),
    GetArrayInfo: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "ScannerData/GetArrayInfo",
        "get",
        undefined,
        params
      ),
    Refresh: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) => requestUrl(serverUrl + "ScannerData/Refresh", "get", undefined, params)
  },
  SystemConfig: {
    IsRunning: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "SystemConfig/IsRunning",
        "get",
        undefined,
        params
      ),
    CurrentWorkMode: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "SystemConfig/CurrentWorkMode",
        "get",
        undefined,
        params
      ),
    ScannerConfig: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "SystemConfig/ScannerConfig",
        "get",
        undefined,
        params
      ),
    PLCCConfigtmp3: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "SystemConfig/PLCCConfigtmp3",
        "get",
        undefined,
        params
      ),
    tmp4: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) => requestUrl(serverUrl + "SystemConfig/tmp4", "get", undefined, params)
  },
  Test: {
    MoveLargeVehicle: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "Test/MoveLargeVehicle", "put", data),
    MoveSmallVehicle: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "Test/MoveSmallVehicle", "put", data),
    MoveBucketVehicle: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "Test/MoveBucketVehicle", "put", data)
  },
  WorkOrderManipulate: {
    LargeVehicleMove: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "workorder/manipulate/LargeVehicleMove",
        "put",
        undefined,
        params
      ),
    SmallVehicleMove: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "workorder/manipulate/SmallVehicleMove",
        "put",
        undefined,
        params
      ),
    BucketMove: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      params?: any
    ) =>
      requestUrl(
        serverUrl + "workorder/manipulate/BucketMove",
        "put",
        undefined,
        params
      ),
    CreateAndExecuteMoveTask: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) =>
      requestUrl(
        serverUrl + "workorder/manipulate/CreateAndExecuteMoveTask",
        "put",
        data
      ),
    StopRunning: (
      requestUrl: ReturnType<typeof useRequest>["requestUrl"],
      data?: any
    ) => requestUrl(serverUrl + "workorder/manipulate/StopRunning", "put", data)
  }
};
export default {
  AutoCrane: {
    //自动运行
    AutoRunning: serverUrl + "AutoCrane/AutoRunning",
    //结束运行
    EndTask: serverUrl + "AutoCrane/EndTask",
    //泊车
    AutoParking: serverUrl + "AutoCrane/AutoParking",
    //扫描料场
    ScanEntireArea: serverUrl + "AutoCrane/ScanEntireArea"
  },
  CraneConfig: {
    IsAntiSway: serverUrl + "CraneConfig/IsAntiSway",
    LargeVehicleSpeed: serverUrl + "CraneConfig/LargeVehicleSpeed",
    SmallVehicleSpeed: serverUrl + "CraneConfig/SmallVehicleSpeed",
    LiftSpeed: serverUrl + "CraneConfig/LiftSpeed"
  },
  PlcManipulate: {
    // UpdateDataPermanently: serverUrl + "PlcManipulate/UpdateDataPermanently",
    // StopDataUpdate: serverUrl + "PlcManipulate/StopDataUpdate",
    // PerformTask: serverUrl + "PlcManipulate/PerformTask",
    //撤销
    UndoTask: serverUrl + "PlcManipulate/UndoTask",
    //暂停
    PauseTask: serverUrl + "PlcManipulate/PauseTask",
    //继续
    ContinueTask: serverUrl + "PlcManipulate/ContinueTask",
    //移动
    Move: serverUrl + "PlcManipulate/Move"
  },
  PlcSetUp: {
    SetWorkMode: serverUrl + "PlcSetUp/SetWorkMode",
    SetAntiSway: serverUrl + "PlcSetUp/SetAntiSway",
    SetLimit: serverUrl + "PlcSetUp/SetLimit",
    //大小车参数设置
    SetLargeVehicle: serverUrl + "PlcSetUp/SetLargeVehicle",
    SetSmallVehicle: serverUrl + "PlcSetUp/SetSmallVehicle",
    //起升开闭抓斗参数设置
    SetHoist: serverUrl + "PlcSetUp/SetHoist",
    SetSwitch: serverUrl + "PlcSetUp/SetSwitch",
    SetBucket: serverUrl + "PlcSetUp/SetBucket",
    //限位系统参数设置
    SetElectricLimit: serverUrl + "PlcSetUp/SetElectricLimit",
    SetSystem: serverUrl + "PlcSetUp/SetSystem"
  },
  PlcStatus: {
    TheReadData: serverUrl + "PlcStatus/TheReadData",
    TheWriteData: serverUrl + "PlcStatus/TheWriteData",
    GetOpenRatio: serverUrl + "PlcStatus/GetOpenRatio",
    ReadX: serverUrl + "PlcStatus/X",
    ReadCurrentLocation: serverUrl + "PlcStatus/CurrentLocation",
    ReadTargetLocation: serverUrl + "PlcStatus/TargetLocation",
    CurrentStatusIntergrally: serverUrl + "PlcStatus/CurrentStatusIntergrally",
    DeviceStatusRespectively: serverUrl + "PlcStatus/DeviceStatusRespectively",
    GetLimit: serverUrl + "PlcStatus/GetLimit",
    //监控页面
    GetCurrent: serverUrl + "PlcStatus/GetCurrent",
    GetLoadWeight: serverUrl + "PlcStatus/GetLoadWeight",
    GetEmergencyStopInfo: serverUrl + "PlcStatus/GetEmergencyStopInfo",

    GetSpeed: serverUrl + "PlcStatus/GetSpeed",
    GetWorkMode: serverUrl + "PlcStatus/GetWorkMode",
    GetAntiSway: serverUrl + "PlcStatus/GetAntiSway",
    GetGear: serverUrl + "PlcStatus/GetGear",
    GetStatus: serverUrl + "PlcStatus/GetStatus",

    //PLC测试接口
    //故障
    GetHoistFault: serverUrl + "PlcStatus/HoistFault",
    GetSwitchFault: serverUrl + "PlcStatus/SwitchFault",
    GetLargeVehicleFault: serverUrl + "PlcStatus/LargeVehicleFault",
    GetSmallVehicleFault: serverUrl + "PlcStatus/SmallVehicleFault",
    GetSystemFault: serverUrl + "PlcStatus/SystemFault",
    //限位
    GetMachineLimit: serverUrl + "PlcStatus/MachineLimit",
    GetElectricLimit: serverUrl + "PlcStatus/ElectricLimit",
    //IO输入输出
    GetHoistInput: serverUrl + "PlcStatus/HoistInput",
    GetSwitchInput: serverUrl + "PlcStatus/SwitchInput",
    GetLargeVehicleInput: serverUrl + "PlcStatus/LargeVehicleInput",
    GetSmallVehicleInput: serverUrl + "PlcStatus/SmallVehicleInput",
    GetSystemInput: serverUrl + "PlcStatus/SystemInput",
    GetHoistOutput: serverUrl + "PlcStatus/HoistOutput",
    GetSwitchOutput: serverUrl + "PlcStatus/SwitchOutput",
    GetLargeVehicleOutput: serverUrl + "PlcStatus/LargeVehicleOutput",
    GetSmallVehicleOutput: serverUrl + "PlcStatus/SmallVehicleOutput",
    GetSystemOutput: serverUrl + "PlcStatus/SystemOutput",

    //运行状态
    GetStatusBit: serverUrl + "PlcStatus/StatusBit",
    GetHoistStatus: serverUrl + "PlcStatus/HoistStatus",
    GetSwitchStatus: serverUrl + "PlcStatus/SwitchStatus",
    GetLargeVehicleStatus: serverUrl + "PlcStatus/LargeVehicleStatus",
    GetSmallVehicleStatus: serverUrl + "PlcStatus/SmallVehicleStatus",
    GetBucketStatus: serverUrl + "PlcStatus/BucketStatus",
    GetAutoRunningStatus: serverUrl + "PlcStatus/AutoRunningStatus",
    GetSystemStatus: serverUrl + "PlcStatus/SystemStatus",

    //参数设置
    GetHoistSetUp: serverUrl + "PlcStatus/HoistSetUp",
    GetSwitchSetUp: serverUrl + "PlcStatus/SwitchSetUp",
    GetLargeVehicleSetUp: serverUrl + "PlcStatus/LargeVehicleSetUp",
    GetSmallVehicleSetUp: serverUrl + "PlcStatus/SmallVehicleSetUp",
    GetBucketSetUp: serverUrl + "PlcStatus/BucketSetUp",
    GetElectricLimitSetUp: serverUrl + "PlcStatus/ElectricLimitSetUp",
    GetSystemSetUp: serverUrl + "PlcStatus/SystemSetUp"
  },
  ScannerConfig: {
    ScannerConfig: serverUrl + "ScannerConfig/ScannerConfig"
  },
  ScannerData: {
    GetArray: serverUrl + "ScannerData/GetArray"
  },
  SystemConfig: {
    IsRunning: serverUrl + "SystemConfig/IsRunning",
    CurrentWorkMode: serverUrl + "SystemConfig/CurrentWorkMode"
  },
  Fault: {
    Fault: serverUrl + "Fault/Fault"
  },
  WorkOrderManipulate: {
    PutLargeVehicleMove: serverUrl + "workorder/manipulate/LargeVehicleMove",
    PutSmallVehicleMove: serverUrl + "workorder/manipulate/SmallVehicleMove",
    PutBucketMove: serverUrl + "workorder/manipulate/BucketMove",
    PutCreateAndExecuteMoveTask:
      serverUrl + "workorder/manipulate/CreateAndExecuteMoveTask",
    PutCreateAndExecuteWorkTask:
      serverUrl + "workorder/manipulate/CreateAndExecuteWorkTask",
    PutStopRunning: serverUrl + "workorder/manipulate/StopRunning"
  },
  Users: {
    GetAllOperator: serverUrl + "DataBase/GetAllOperator",
    PutAddOperator: serverUrl + "DataBase/AddOperator",
    PutUpdateOperator: serverUrl + "DataBase/UpdateOperator"
  },
  DataBase: {
    GetPrompt: serverUrl + "DataBase/GetPrompt",
    GetPromptAmount: serverUrl + "DataBase/GetPromptAmount",
    GetFault: serverUrl + "DataBase/GetFault",
    GetFaultAmount: serverUrl + "DataBase/GetFaultAmount",
    GetAllWorkOrder: serverUrl + "DataBase/GetAllWorkOrder",
    GetAllWorkOrderAmount: serverUrl + "DataBase/GetAllWorkOrderAmount",
    GetPara: serverUrl + "DataBase/GetPara",
    GetGroundDivision: serverUrl + "DataBase/GetGroundDivision",
    GetPourPoints: serverUrl + "DataBase/GetPourPoints",
    GetCraneState: serverUrl + "DataBase/CraneState",
    GetRunningWorkOrder: serverUrl + "DataBase/GetRunningWorkOrder",
    GetPromptAndFault: serverUrl + "DataBase/GetPromptAndFault",
    GetInventory: serverUrl + "DataBase/GetInventory"
  }
};
