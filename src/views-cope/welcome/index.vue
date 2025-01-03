<script setup lang="ts">
import echarts from "vue-echarts";
import "echarts-gl";
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
import axios from "axios";
import { urls } from "@/views/welcome/ChildObject/Url";
import autourls from "@/store/urls";
import {
  Plc2WmsInstanceStatus,
  Plc2WmsRealTimeStatus,
  Wms2PlcTask
} from "@/views/SharedData/Data";
import { ElMessage } from "element-plus";
const store = useCraneStatusStore();
let byteData = ref(new Uint8Array());
const _PARA = {
  _POOLX: 1440, // 设定_POOX的值（假设为5）
  _POOLY: 165, // 设定_POOX的值（假设为5）
  GL: 300 // 设定GL的值（假设为3）
};

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
let intervalId;
let intervalId1;
let intervalId2;
//行车信息显示接口
const location = ref({
  x: 0,
  y: 0,
  z: 0
});
const fetchData = async () => {
  try {
    const [weightResponse, craneStatusResponse] = await Promise.all([
      axios.get(autourls.PlcStatus.GetLoadWeight),
      axios.get(autourls.DataBase.GetCraneState, { params: { id: 1 } })
    ]);

    store.Weight = weightResponse.data.loadWeight;
    // console.log("重量获取成功", store.Weight);
    // ElMessage.success("重量获取成功", store.Weight);
    store.OperationMode = craneStatusResponse.data.operationmode;
    store.WorkMode = craneStatusResponse.data.worktype;
    // ElMessage.success("操作模式获取成功");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
onBeforeMount(async () => {
  intervalId1 = setInterval(async () => {
    try {
      const response = await axios.get(autourls.PlcStatus.ReadCurrentLocation);
      location.value = response.data;
      store.CurrentPosition.x = response.data.x;
      store.CurrentPosition.y = response.data.y;
      store.CurrentPosition.z = response.data.z;
      const res = await axios.get(autourls.PlcStatus.GetOpenRatio);
      store.OpenRatio = res.data.openRatio;
      const Target = await axios.get(autourls.PlcStatus.ReadTargetLocation);
      // console.log(Target.data);
      store.TargetPosition.x = Target.data.x;
      store.TargetPosition.y = Target.data.y;
      store.TargetPosition.z = Target.data.z;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, 300);
});
onMounted(async () => {
  // initializeUrls();
  // await axios
  //   .get(urls.points.getpointdata)
  //   .then(response => {
  //     // 获取Base64编码的图片数据
  //     const base64String = response.data[0].picture;
  //     // 解码Base64字符串
  //     const binaryString = window.atob(base64String);
  //     // 创建一个Uint8Array来存储字节数据
  //     byteData.value = new Uint8Array(new ArrayBuffer(binaryString.length));
  //     // 将二进制字符串转换为字节数组
  //     for (let i = 0; i < byteData.value.length; i++) {
  //       byteData.value[i] = binaryString.charCodeAt(i);
  //     }
  //     const rate_y = _PARA._POOLY / _PARA.GL;

  //     for (let i = 0; i < _PARA._POOLX; i += 10) {
  //       for (let j = 0; j < _PARA.GL; j += 10) {
  //         const z = parseFloat(
  //           byteData.value[
  //             i * _PARA._POOLY * 3 + parseInt(rate_y * j) * 3 + 1
  //           ] *
  //             256 +
  //             parseInt(
  //               byteData.value[
  //                 i * _PARA._POOLY * 3 + parseInt(rate_y * j) * 3 + 2
  //               ]
  //             )
  //         );
  //         // 在数据加载完成后
  //         points.value.values.push([i, j, z]);
  //       }
  //     }
  //     // 使用setOption更新数据，传递notMerge参数为true
  //     chartRef.value.setOption(
  //       {
  //         data: points.value.values
  //       },
  //       false
  //     ); // true表示不与现有配置合并
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  intervalId = setInterval(async () => {
    const responses = await axios.get(
      autourls.PlcStatus.DeviceStatusRespectively
    );
    store.DeviceStatus.largevehicle = responses.data.largevehicle;
    store.DeviceStatus.smallvehicle = responses.data.smallvehicle;
    store.DeviceStatus.bucket = responses.data.bucket;
  }, 500);
  intervalId2 = setInterval(() => {
    fetchData();
  }, 700);
});
onUnmounted(() => {
  clearInterval(intervalId);
  clearInterval(intervalId1);
  clearInterval(intervalId2);
});
</script>

<template>
  <div
    class="bg-[url('..\views\welcome\picture\12.png')] flex flex-row bg-cover bg-center overflow-hidden"
    style="width: 100%; height: 100%; margin: 0; padding: 0"
  >
    <!-- <echarts ref="chartRef" class="chart" :option="option" /> -->
    <Web3D class="chart" />

    <div class="absolute left-0 top-1 w-1/3 h-1/3 flex flex-col">
      <craneinfomation
        :instance-status="Plc2WmsInstanceStatus"
        :real-time-status="Plc2WmsRealTimeStatus"
        :task="Wms2PlcTask"
        :Info="store.Info"
        :OpenRatio="store.OpenRatio"
        :CurrentLocation="store.CurrentPosition"
        :TargetPosition="store.TargetPosition"
        :ManipulateMode="store.WorkMode"
        :api="autourls"
      />
    </div>

    <div class="absolute left-1/3 w-4/12 h-1/3 top-1 flex flex-col">
      <craneoperation :Axios="axios" :api="urls" :ApiUrl="autourls" />
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
      <cranealarm :ApiUrl="autourls" />
    </div>

    <div class="absolute right-5 bottom-0 w-2/3 h-2/5 pl-8 flex flex-col">
      <workchoice :api="urls" :AddAlarm="addUserData" :ApiUrl="autourls" />
    </div>
  </div>
</template>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
