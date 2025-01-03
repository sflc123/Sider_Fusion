import { ref, watchEffect } from "vue";
const weight = ref("");
const getCurrentTimestamp = (): string => {
  const now = new Date();
  return now.toISOString().slice(0, 19).replace("T", " ");
};
const createCraneData = () => ({
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
  Fault: {
    启动回路: 1,
    通讯系统: 0,
    起升系统: 0,
    开闭系统: 0,
    大车系统: 1,
    小车系统: 1
  },
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
    data3: {
      大车速度: "1",
      小车速度: "1",
      大车位置: "1",
      小车位置: "1",
      抓斗高度: "1",
      安全高度: "1",
      起升电流: "1",
      开闭电流: "1"
    },
    ExecutionSteps: ref([
      {
        content: "开始执行",
        timestamp: getCurrentTimestamp()
      },
      {
        content: "起升上升",
        timestamp: getCurrentTimestamp()
      },
      {
        content: "抓斗下放",
        timestamp: getCurrentTimestamp(),
        color: "#0bbd87"
      },
      {
        content: "夹具夹紧",
        timestamp: getCurrentTimestamp(),
        size: "default",
        color: "red"
      },
      {
        content: "起升带料上升",
        timestamp: getCurrentTimestamp(),
        color: "#0bbd87"
      },
      {
        content: "夹具打开",
        timestamp: getCurrentTimestamp(),
        size: "default",
        color: "red"
      },
      {
        content: "载重:" + weight.value + "吨",
        timestamp: getCurrentTimestamp()
      },
      {
        content: "卸料上升",
        timestamp: getCurrentTimestamp()
      },
      {
        content: "回起始位",
        timestamp: getCurrentTimestamp()
      },
      {
        content: "执行完成",
        timestamp: getCurrentTimestamp()
      }
    ])
  }
});
const Cranes = ref({
  crane1: createCraneData(),
  crane2: createCraneData(),
  crane3: createCraneData()
});

//自动生成随机数绑定数据结构
function changeCraneData(crane, properties, key) {
  const data = crane[key];
  const randomValue = [data.length];
  properties.forEach((prop, index) => {
    randomValue[index] = Math.random() > 0.5 ? 1 : 0;
    data[prop] = randomValue[index];
  });
}
function ChangeCraneData(crane, properties, key) {
  const data = crane[key];
  const randomValue = [data.length];
  properties.forEach((prop, index) => {
    randomValue[index] = (Math.random() * 1000).toFixed(2);
    data[prop] = randomValue[index];
  });
}

function updateCraneData() {
  setInterval(() => {
    weight.value = (Math.random() * 100).toString();
    changeCraneData(
      Cranes.value.crane1,
      Object.keys(Cranes.value.crane1.Lifting),
      "Lifting"
    );
    changeCraneData(
      Cranes.value.crane1,
      Object.keys(Cranes.value.crane1.OAC),
      "OAC"
    );
    changeCraneData(
      Cranes.value.crane1,
      Object.keys(Cranes.value.crane1.Fault),
      "Fault"
    );
    changeCraneData(
      Cranes.value.crane2,
      Object.keys(Cranes.value.crane2.Lifting),
      "Lifting"
    );
    changeCraneData(
      Cranes.value.crane2,
      Object.keys(Cranes.value.crane2.OAC),
      "OAC"
    );
    changeCraneData(
      Cranes.value.crane2,
      Object.keys(Cranes.value.crane2.Fault),
      "Fault"
    );
    changeCraneData(
      Cranes.value.crane3,
      Object.keys(Cranes.value.crane3.Lifting),
      "Lifting"
    );
    changeCraneData(
      Cranes.value.crane3,
      Object.keys(Cranes.value.crane3.OAC),
      "OAC"
    );
    changeCraneData(
      Cranes.value.crane3,
      Object.keys(Cranes.value.crane3.Fault),
      "Fault"
    );
    changeCraneData(
      Cranes.value.crane1.crane,
      Object.keys(Cranes.value.crane1.crane.data),
      "data"
    );
    changeCraneData(
      Cranes.value.crane2.crane,
      Object.keys(Cranes.value.crane2.crane.data),
      "data"
    );
    changeCraneData(
      Cranes.value.crane3.crane,
      Object.keys(Cranes.value.crane3.crane.data),
      "data"
    );
    ChangeCraneData(
      Cranes.value.crane1.crane,
      Object.keys(Cranes.value.crane1.crane.data3),
      "data3"
    );
    ChangeCraneData(
      Cranes.value.crane2.crane,
      Object.keys(Cranes.value.crane2.crane.data3),
      "data3"
    );
    ChangeCraneData(
      Cranes.value.crane3.crane,
      Object.keys(Cranes.value.crane3.crane.data3),
      "data3"
    );
  }, 1000);
}
// async function fetchCraneData() {
//   const response = await axios.get(urls.craneMode._GetCraneMode);
//   return response.data;
// }
// 使用 watchEffect 监听变化
watchEffect(async () => {
  updateCraneData();
});
export default Cranes;
