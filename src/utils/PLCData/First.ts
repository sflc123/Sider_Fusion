import { ref, watchEffect } from "vue";
// import axios from "axios";
// import { urls } from "@/utils/Url";

const Crane1 = ref({
  Lifting: {
    超温: 0,
    超速: 0,
    上停: 1,
    上减: 1,
    下减: 1,
    下停: 0,
    超载: 0
  },
  OAC: {
    超温: 1,
    超速: 0,
    上停: 0,
    上减: 1,
    下减: 0,
    下停: 0,
    重锤: 0
  },
  buck: "抓斗",
  crane: {
    data: {
      系统启动: 1,
      操作模式: 0,
      抓斗模式: 1,
      自动开闭: 1,
      自动运行: 1,
      防摇打开: 0,
      电子限位: 0
    },
    data2: {
      启动回路: 1,
      通讯系统: 0,
      起升系统: 0,
      开闭系统: 0,
      大车系统: 1,
      小车系统: 1
    },
    data3: {
      大车速度: "1",
      小车速度: "1",
      大车位置: "1",
      小车位置: "1",
      抓斗高度: "1",
      安全高度: "1",
      起升电流: "1",
      开闭电流: "1"
    }
  },
  workOrder: {
    name: ["行车状态", "任务类型", "执行指令", "当前流程", "净重"],
    data2: [
      "大车（X）",
      "小车（Y）",
      "高度（Z）",
      "当前",
      "抓取点",
      "放料点",
      "安全高度"
    ]
  }
});
function updateCraneData() {
  setInterval(() => {
    // Example updates for Lifting
    Crane1.value.Lifting.超温 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.Lifting.超速 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.Lifting.上停 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.Lifting.上减 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.Lifting.下减 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.Lifting.下停 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.Lifting.超载 = Math.random() > 0.5 ? 1 : 0;

    // Example updates for OAC
    Crane1.value.OAC.超温 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.OAC.超速 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.OAC.上停 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.OAC.上减 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.OAC.下减 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.OAC.下停 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.OAC.重锤 = Math.random() > 0.5 ? 1 : 0;

    // Example updates for crane data
    Crane1.value.crane.data.系统启动 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.crane.data.操作模式 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.crane.data.抓斗模式 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.crane.data.自动开闭 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.crane.data.自动运行 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.crane.data.防摇打开 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.crane.data.电子限位 = Math.random() > 0.5 ? 1 : 0;

    // Example updates for crane data2
    Crane1.value.crane.data2.启动回路 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.crane.data2.通讯系统 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.crane.data2.起升系统 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.crane.data2.开闭系统 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.crane.data2.大车系统 = Math.random() > 0.5 ? 1 : 0;
    Crane1.value.crane.data2.小车系统 = Math.random() > 0.5 ? 1 : 0;

    // Example updates for crane data3
    Crane1.value.crane.data3.大车速度 = (Math.random() * 1000).toFixed(2);
    Crane1.value.crane.data3.小车速度 = (Math.random() * 1000).toFixed(2);
    Crane1.value.crane.data3.大车位置 = (Math.random() * 1000).toFixed(2);
    Crane1.value.crane.data3.小车位置 = (Math.random() * 1000).toFixed(2);
    Crane1.value.crane.data3.抓斗高度 = (Math.random() * 1000).toFixed(2);
    Crane1.value.crane.data3.安全高度 = (Math.random() * 1000).toFixed(2);
    Crane1.value.crane.data3.起升电流 = (Math.random() * 10).toFixed(2);
    Crane1.value.crane.data3.开闭电流 = (Math.random() * 10).toFixed(2);

    // Example updates for workOrder data2
    Crane1.value.workOrder.data2 = Crane1.value.workOrder.data2.map(() =>
      Math.random().toFixed(2)
    );
  }, 500); // Update every second
}
// async function fetchCraneData() {
//   const response = await axios.get(urls.craneMode._GetCraneMode);
//   return response.data;
// }
// 使用 watchEffect 监听变化
watchEffect(async () => {
  updateCraneData();
  //调用api接口模拟获取数据
  // const data = await fetchCraneData();
  // Crane1.value.crane.data3.大车速度 = data[0].id;
  // Crane1.value.crane.data3.小车速度 = data[0].cranE_NO;
  // Crane1.value.crane.data3.大车位置 = data[0].worK_MODE;
  // Crane1.value.crane.data3.小车位置 = data[0].pouR_NO;
  // Crane1.value.crane.data3.抓斗高度 = data[0].targeT_NO;
  // Crane1.value.crane.data3.安全高度 = data[0].scaN_FLAG;
  // Crane1.value.crane.data3.起升电流 = data[0].id;
  // Crane1.value.crane.data3.开闭电流 = data[0].scaN_FLAG;
});
export default Crane1;
