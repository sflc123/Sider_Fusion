<script setup lang="ts">
import echarts from "vue-echarts";
import "echarts-gl";
import { Loop } from "@/views/welcome/web3D/src/World/systems/Loop.js";
import craneinfomation from "../welcome/ChildObject/CraneInfomation/CraneInfomation.vue";
import systemname from "../welcome/ChildObject/SystemName.vue";
import craneoperation from "../welcome/ChildObject/CraneOperation/CraneOperation.vue";
import workingcondition from "../welcome/ChildObject/WorkingCondition.vue";
import workchoice from "../welcome/ChildObject/WorkChoice/WorkChoice.vue";
import cranestatus from "../welcome/ChildObject/CraneStatus.vue";
import cranealarm from "./ChildObject/CraneAlarm/CraneAlarm.vue";
import devicestatus from "./ChildObject/Status/devicestatus.vue";
import { initializeUrls } from "@/utils/Url";
import Web3D from "@/views/welcome/web3D/index.vue";
import { onMounted, ref, onUnmounted, onBeforeMount } from "vue";
import { addUserData } from "@/views/welcome/ChildObject/DataStore";
import { useCraneStatusStore } from "@/store/modules/craneStatus";
import { debounce, is, throttle } from "@pureadmin/utils";
// import * as signalR from "@microsoft/signalr";
import * as signalR from "@microsoft/signalr";
// import * as urlsModule from "@/store/urls";
// const autourls = urlsModule.default;
// const API = urlsModule.API;
// const cancelRequest = urlsModule.cancelRequest;

import { API, useRequest } from "@/store/urls";
const { requestUrl, cancelRequest } = useRequest();

import { ElMessage } from "element-plus";
import { use } from "echarts/types/src/extension.js";
const store = useCraneStatusStore();
let byteData = ref(new Uint8Array());
let isComponentMounted = true;
const _PARA = {
  _POOLX: 1440, // 设定_POOX的值（假设为5）
  _POOLY: 165, // 设定_POOX的值（假设为5）
  GL: 300 // 设定GL的值（假设为3）
};
let connection;
const chartRef = ref(null); // 创建一个模板引用
const points = ref({ values: [] });

// 定义图表的配置  定义一个响应式引用 option，它包含 ECharts 图表的配置选项
const option = ref({
  tooltip: {},
  visualMap: {
    //隐藏掉颜色值
    show: false,
    max: 3500,
    min: 0,
    inRange: {
      color: [
        "#313695", // 深蓝色
        "#4575b4", // 亮蓝色
        "#74add1", // 浅蓝色
        "#abd9e9", // 更浅蓝色
        "#e0f3f8", // 淡蓝色
        "#fee8c8", // 浅橙色
        "#fdbb84", // 橙色
        "#fc8d59", // 强橙色
        "#ef6548", // 红橙色
        "#d7301f", // 深红色
        "#b30000" // 更深红色
      ]
    }
  },
  xAxis3D: {
    type: "category",
    splitLine: { show: false }
  },
  yAxis3D: {
    type: "category",
    splitLine: { show: false }

    // data: days
  },
  zAxis3D: {
    type: "value",
    max: 6500,
    min: 0,
    splitLine: { show: false },
    axisPointer: {
      show: false
    },
    splitArea: { show: false }
  },
  grid3D: {
    //特效
    // postEffect: {
    //   enable: true
    // },
    //背景色
    // environment: "#000",
    axisLine: {
      lineStyle: { color: "#fff" },
      //三维模型固定不动
      show: true
    },
    axisPointer: {
      lineStyle: { color: "#fff" },
      show: true
    },
    //长宽
    boxWidth: 800,
    boxDepth: 200,
    // boxheight: 1000,

    //投影方式
    viewControl: {
      //旋转
      // autoRotate: true,
      alpha: 30, // 绕x轴旋转的角度
      beta: 0, // 绕y轴旋转的角度s
      distance: 1000,
      //cw顺时针  ccw逆时针
      // autoRotateDirection: "ccw",
      //自转时间
      autoRotateSpeed: 2
    },

    // width: "50%",
    // height: "50%",
    // left: "10%",
    // right: "10%",
    // top: "10%",
    // bottom: "10%",
    light: {
      main: {
        //主光源的强度
        intensity: 1.1,
        quality: "ultra",
        //是否有阴影
        shadow: true
      },
      ambient: {
        intensity: 0.3
      }
    }
  },
  series: [
    {
      type: "bar3D",
      // 开启大数据量级优化
      large: true,
      // // 设置启用大数据量优化的阈值
      largeThreshold: 1000,
      data: points.value.values,

      shading: "lambert",
      label: {
        fontSize: 16,
        borderWidth: 1
      },
      emphasis: {
        label: {
          fontSize: 20,
          color: "#900"
        },
        itemStyle: {
          color: "#900"
        }
      }
    }
  ]
});

let intervalId3;
//行车信息显示接口
const location = ref({
  x: 0,
  y: 0,
  z: 0
});
const updateCraneInfo = throttle(async () => {
  if (!isComponentMounted) return;
  await API.PlcStatus.GetMainPageData(requestUrl)
    .then(response => {
      // console.log("获取实时数据成功！", response);
      store.CraneInfoMation.bucketStatus = response.bucketStatus;
      store.CraneInfoMation.largeVehicleStatus = response.largeVehicleStatus;
      store.CraneInfoMation.smallVehicleStatus = response.smallVehicleStatus;
      store.CraneInfoMation.workOrderStep = response.workOrderStep;
      store.CraneInfoMation.isCanceled = response.isCanceled;
      store.CraneInfoMation.currentX = response.currentX;
      store.CraneInfoMation.currentY = response.currentY;
      store.CraneInfoMation.currentZ = response.currentZ;
      store.CraneInfoMation.openRatio = response.openRatio;
      store.CraneInfoMation.operationMode = response.operationMode;
      store.CraneInfoMation.targetX = response.targetX;
      store.CraneInfoMation.targetY = response.targetY;
      store.CraneInfoMation.targetZ = response.targetZ;
      store.CraneInfoMation.weight = response.weight;
      store.CraneInfoMation.workType = response.workType;
      // console.log("更新行车信息成功pinia--->:", store.CraneInfoMation);
      // 先重置所有状态为 false
      Object.keys(store.DeviceStatus.largevehicle).forEach(key => {
        store.DeviceStatus.largevehicle[key] = false;
      });
      Object.keys(store.DeviceStatus.smallvehicle).forEach(key => {
        store.DeviceStatus.smallvehicle[key] = false;
      });
      Object.keys(store.DeviceStatus.bucket).forEach(key => {
        store.DeviceStatus.bucket[key] = false;
      });
      // 更新设备状态
      const updateStatus = (status, type) => {
        switch (status) {
          case "ready":
            store.DeviceStatus[type].ready = true;
            break;
          case "error":
            store.DeviceStatus[type].error = true;
            break;
          case "paused":
            store.DeviceStatus[type].paused = true;
            break;
          case "running":
            store.DeviceStatus[type].running = true;
            break;
          case "limited":
            store.DeviceStatus[type].limited = true;
            break;
        }
      };
      updateStatus(response.largeVehicleStatus, "largevehicle");
      updateStatus(response.smallVehicleStatus, "smallvehicle");
      updateStatus(response.bucketStatus, "bucket");
    })
    .catch(error => {
      console.log("获取实时数据失败！", error);
    });
  // if (isComponentMounted) console.log("启动节流计时器");
}, 300); // 300 毫秒的节流间隔
onMounted(async () => {
  intervalId3 = setInterval(() => {
    updateCraneInfo();
  }, 300);

  const options = {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets
  };
  connection = new signalR.HubConnectionBuilder()
    .withUrl("http://192.168.1.129:5078/Hubs/SysHub", options)
    .withAutomaticReconnect()
    .build();
  await connection.start();
  connection.on("ReceiveMessage", msg => {
    store.AddInfoPrompt(msg);
    // console.log("接收到消息：", msg);
    // console.log("接收到消息pinia：", store.InfoPrompt, store.infoPrompt.length);
  });
});
onUnmounted(() => {
  if (connection) {
    connection.stop(); // 断开 SignalR Hub 连接
  }
  isComponentMounted = false; // 设置标志位为 false
  clearInterval(intervalId3);
  cancelRequest();
});
</script>

<template>
  <div
    class="bg-[url('..\views\welcome\pictrue\12.jpg')] flex flex-row bg-cover bg-center overflow-hidden"
    style="width: 100%; height: 100%; margin: 0; padding: 0"
  >
    <!-- <echarts ref="chartRef" class="chart" :option="option" /> -->
    <Web3D class="chart" />

    <div class="absolute left-0 top-1 w-1/3 h-1/3 flex flex-col">
      <craneinfomation :Info="store.Info" :InfoMation="store.CraneInfoMation" />
    </div>

    <div class="absolute left-1/3 w-4/12 h-1/3 top-1 flex flex-col">
      <craneoperation
        :API="API"
        :InfoMation="store.CraneInfoMation"
        :cancelRequest="cancelRequest"
        :requestUrl="requestUrl"
      />
    </div>

    <div class="absolute right-0 top-1 w-1/3 h-1/3 flex flex-col">
      <devicestatus
        title="设备状态"
        :Largevehicle="store.DeviceStatus.largevehicle"
        :Smallvehicle="store.DeviceStatus.smallvehicle"
        :Bucket="store.DeviceStatus.bucket"
      />
    </div>

    <div class="absolute left-0 bottom-2 w-1/3 h-1/3 flex flex-col">
      <cranealarm
        :store="store"
        :API="API"
        :cancelRequest="cancelRequest"
        :requestUrl="requestUrl"
      />
    </div>

    <div class="absolute right-5 bottom-0 w-2/3 h-2/5 pl-8 flex flex-col">
      <workchoice
        :API="API"
        :cancelRequest="cancelRequest"
        :requestUrl="requestUrl"
      />
    </div>
  </div>
</template>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
