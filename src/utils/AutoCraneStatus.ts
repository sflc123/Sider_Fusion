import { ref, watchEffect } from "vue";

const weight = ref(9.5);

const AutoCraneStatus = ref({
  auto: {
    开斗: 0,
    闭斗: 0,
    自动选择: 1,
    任务终止: 1,
    故障复位: 1,
    急停遥控锁定: 0
  },
  limit: {
    大车限位: 0,
    小车限位: 0,
    起升限位: 1,
    限位复位: 1
  },
  buck: {
    吊具有料: 0,
    吊具松开: 0,
    起升1: 1,
    起升2: 1
  },
  heartbeat: {
    HMI通讯心跳: 0,
    中控PLC通讯心跳: 0,
    扫描仪通讯心跳: 1,
    起升2: 1
  },
  autoexecute: {
    起升上升: 0,
    大车起始位置: 0,
    起升下降: 1,
    夹具夹紧: 1,
    大车目标位置: 1,
    夹具打开: 1,
    卸料上升: 1,
    回起始位: 0
  },
  scram: {
    中控急停: 0,
    驾驶室急停: 0,
    电气柜急停: 1
  },
  fault: {
    大车故障: 0,
    小车故障: 0,
    起升故障: 1,
    限位故障: 0,
    plc通信故障: 0,
    扫描仪通信故障: 1
  },
  activities: [
    {
      content: "开始执行",
      timestamp: "2018-04-12 20:46"
    },
    {
      content: "起升上升",
      timestamp: "2018-04-12 20:46"
    },
    {
      content: "抓斗下放",
      timestamp: "2018-04-03 20:46",
      color: "#0bbd87"
    },
    {
      content: "夹具夹紧",
      timestamp: "2018-04-03 20:46",
      size: "default",
      color: "red"
    },
    {
      content: "起升带料上升",
      timestamp: "2018-04-03 20:46",
      color: "#0bbd87"
    },
    {
      content: "夹具打开",
      timestamp: "2018-04-03 20:46",
      size: "default",
      color: "red"
    },
    {
      content: "载重:" + weight.value + "吨",
      timestamp: "2018-04-03 20:46"
    },
    {
      content: "卸料上升",
      timestamp: "2018-04-03 20:46"
    },
    {
      content: "回起始位",
      timestamp: "2018-04-03 20:46"
    },
    {
      content: "执行完成",
      timestamp: "2018-04-03 20:46"
    }
  ]
});

function updateCraneData() {
  setInterval(() => {
    // Example updates for auto
    AutoCraneStatus.value.auto.开斗 = Math.random() > 0.5 ? 1 : 0;
    AutoCraneStatus.value.auto.闭斗 = Math.random() > 0.5 ? 1 : 0;
    AutoCraneStatus.value.auto.自动选择 = Math.random() > 0.5 ? 1 : 0;
    AutoCraneStatus.value.auto.任务终止 = Math.random() > 0.5 ? 1 : 0;
    AutoCraneStatus.value.auto.故障复位 = Math.random() > 0.5 ? 1 : 0;
    AutoCraneStatus.value.auto.急停遥控锁定 = Math.random() > 0.5 ? 1 : 0;

    // Example updates for limit
    AutoCraneStatus.value.limit.大车限位 = Math.random() > 0.5 ? 1 : 0;
    AutoCraneStatus.value.limit.小车限位 = Math.random() > 0.5 ? 1 : 0;
    AutoCraneStatus.value.limit.起升限位 = Math.random() > 0.5 ? 1 : 0;
    AutoCraneStatus.value.limit.限位复位 = Math.random() > 0.5 ? 1 : 0;

    // // Example updates for buck data
    AutoCraneStatus.value.buck.吊具有料 = Math.random() > 0.5 ? 1 : 0;
    AutoCraneStatus.value.buck.吊具松开 = Math.random() > 0.5 ? 1 : 0;
    AutoCraneStatus.value.buck.起升1 = Math.random() > 0.5 ? 1 : 0;
    AutoCraneStatus.value.buck.起升2 = Math.random() > 0.5 ? 1 : 0;

    // // Example updates for buck data2
    // AutoCraneStatus.value.buck.data2.启动回路 = Math.random() > 0.5 ? 1 : 0;
    // AutoCraneStatus.value.buck.data2.通讯系统 = Math.random() > 0.5 ? 1 : 0;
    // AutoCraneStatus.value.buck.data2.起升系统 = Math.random() > 0.5 ? 1 : 0;
    // AutoCraneStatus.value.buck.data2.开闭系统 = Math.random() > 0.5 ? 1 : 0;
    // AutoCraneStatus.value.buck.data2.大车系统 = Math.random() > 0.5 ? 1 : 0;
    // AutoCraneStatus.value.buck.data2.小车系统 = Math.random() > 0.5 ? 1 : 0;

    // // Example updates for buck data3
    // AutoCraneStatus.value.buck.data3.大车速度 = (Math.random() * 1000).toFixed(
    //   2
    // );
    // AutoCraneStatus.value.buck.data3.小车速度 = (Math.random() * 1000).toFixed(
    //   2
    // );
    // AutoCraneStatus.value.buck.data3.大车位置 = (Math.random() * 1000).toFixed(
    //   2
    // );
    // AutoCraneStatus.value.buck.data3.小车位置 = (Math.random() * 1000).toFixed(
    //   2
    // );
    // AutoCraneStatus.value.buck.data3.抓斗高度 = (Math.random() * 1000).toFixed(
    //   2
    // );
    // AutoCraneStatus.value.buck.data3.安全高度 = (Math.random() * 1000).toFixed(
    //   2
    // );
    // AutoCraneStatus.value.buck.data3.起升电流 = (Math.random() * 10).toFixed(
    //   2
    // );
    // AutoCraneStatus.value.buck.data3.开闭电流 = (Math.random() * 10).toFixed(
    //   2
    // );

    // // Example updates for workOrder data2
    // AutoCraneStatus.value.workOrder.data2 =
    //   AutoCraneStatus.value.workOrder.data2.map(() => Math.random().toFixed(2));
  }, 500); // Update every second
}
watchEffect(async () => {
  updateCraneData();
});
export default AutoCraneStatus;
