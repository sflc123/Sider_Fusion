<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import { Check } from "@element-plus/icons-vue";
//引入防抖和节流
import { debounce, throttle } from "@pureadmin/utils";
import { useCraneStatusStore } from "@/store/modules/craneStatus";
const store = useCraneStatusStore();
const props = defineProps<{
  API: any;
  cancelRequest: () => void;
  requestUrl: any;
}>();

//放料区
const checkboxGroup2 = ref([]);
//所有料区
const cities = ref({ values: [] });
//抓料区
const checkboxGroup3 = ref([]);
let isVisible = ref();
const radio = ref();
const options = ref([
  { value: 1, label: "下料口1" },
  { value: 2, label: "下料口2" },
  { value: 3, label: "下料口3" },
  { value: 4, label: "区域倒料" }
]);
const sendputlocation = ref({
  loadLeft: 0,
  loadRight: 0,
  unloadLeft: 0,
  unloadRight: 0
});
const index = ref(2);
//结束
const EndWork = async () => {
  props.API.AutoCrane.EndTask(props.requestUrl)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
};
const EndWorkDebounce = debounce(EndWork, 1000, true);
//继续
const ContinueWork = () => {
  props.API.PlcManipulate.ContinueTask(props.requestUrl)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
};
const ContinueWorkDebounce = debounce(ContinueWork, 1000, true);

//暂停
const PauseWork = () => {
  props.API.PlcManipulate.PauseTask(props.requestUrl)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
};
const PauseWorkDebounce = debounce(PauseWork, 1000, true);

//执行
const ExecuteWork2 = () => {
  ElMessage.success(
    `Load: ${sendputlocation.value.loadLeft}+${sendputlocation.value.loadRight} UnLoad: ${sendputlocation.value.unloadLeft}+${sendputlocation.value.unloadRight}`
  );
  props.API.AutoCrane.AutoRunning(props.requestUrl, [
    sendputlocation.value.loadLeft,
    sendputlocation.value.loadRight,
    sendputlocation.value.unloadLeft,
    sendputlocation.value.unloadRight
  ])
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      ElMessage.error("执行工作失败", error);
      console.log(error);
    });
};
const immediateDebounce = debounce(ExecuteWork2, 1000, true);

const radio2 = ref();
const radioTemp = [
  { value: 1, label: "单选" },
  { value: 2, label: "多选" }
];

const tooltipContent = value => {
  return value === 2
    ? "是否切换模式为：连续区域选择？"
    : `是否切换模式为：单个区域选择？`;
};
const tooltipContent1 = value1 => {
  return value1 === 4
    ? "是否切换到自选区域倒料？"
    : `是否切换到${value1}号下料口？`;
};

const handleClick = value => {
  value === 2 ? (index.value = value) : (index.value = 1);
};

//料区单选按钮点击事件
const handleClick2 = async value => {
  SelectPourNo();
  switch (value) {
    case 1:
      sendputlocation.value.loadLeft = pourNo.value[0].startX;
      sendputlocation.value.loadRight = pourNo.value[0].endX;
      isVisible.value = false;
      checkboxGroup3.value = [];
      // 修改数组中的第一个元素
      if (store.sendputlocation.loadlocation.length > 0) {
        store.sendputlocation.loadlocation = options.value[0].label;
      } else store.sendputlocation.loadlocation = options.value[0].label;
      console.log(store.sendputlocation.loadlocation);
      break;
    case 2:
      sendputlocation.value.loadLeft = pourNo.value[1].startX;
      sendputlocation.value.loadRight = pourNo.value[1].endX;
      isVisible.value = false;
      checkboxGroup3.value = [];
      if (store.sendputlocation.loadlocation.length > 0)
        store.sendputlocation.loadlocation = options.value[1].label;
      else store.sendputlocation.loadlocation = options.value[1].label;
      console.log(store.sendputlocation.loadlocation);
      break;
    case 3:
      sendputlocation.value.loadLeft = pourNo.value[2].startX;
      sendputlocation.value.loadRight = pourNo.value[2].endX;
      isVisible.value = false;
      checkboxGroup3.value = [];
      if (store.sendputlocation.loadlocation.length > 0)
        store.sendputlocation.loadlocation = options.value[2].label;
      else store.sendputlocation.loadlocation = options.value[2].label;
      console.log(store.sendputlocation.loadlocation);
      break;
    case 4:
      isVisible.value = true;
      break;
  }
};

//抓取料区查询
const UpdatePourNo = value => {
  const checkboxGroup = value === 1 ? checkboxGroup3 : checkboxGroup2;

  fillCheckboxRange(checkboxGroup);
  sendPutRequest(checkboxGroup, value === 1 ? "抓料" : "放料");
};
// 填充checkbox数组的方法抽象出来
const fillCheckboxRange = checkboxGroup => {
  const selectedCheckboxes = checkboxGroup.value;
  const numbers = selectedCheckboxes.map(value => parseInt(value, 10)); // 将 checkbox 的值转换为整数数组
  const min = Math.min(...numbers); // 找到数组中的最小值
  const max = Math.max(...numbers); // 找到数组中的最大值
  for (let i = min + 1; i < max; i++) {
    if (!checkboxGroup.value.includes(i)) checkboxGroup.value.push(i);
  }
  checkboxGroup.value.sort((a, b) => a - b); // 排序

  if (radio.value == 4)
    store.sendputlocation.loadlocation = checkboxGroup3.value;
  else store.sendputlocation.loadlocation;
  if (store.sendputlocation.unloadlocation.length > 0)
    store.sendputlocation.unloadlocation = checkboxGroup2.value;
  else store.sendputlocation.unloadlocation = checkboxGroup2.value;
  ElMessage.success(
    "piniaData：" +
      "抓料区域:" +
      store.sendputlocation.loadlocation +
      "放料区域:" +
      store.sendputlocation.unloadlocation
  );
};
const sendPutRequest = (checkboxGroup, newStatus) => {
  let selectedItems = ref([]);
  // 遍历 cities.values 获取选中的区域并计算 min 和 max
  cities.value.values.forEach(item => {
    if (checkboxGroup.value.includes(item.groundId)) {
      selectedItems.value.push(item);
      item.status = newStatus;
    } else {
      if (item.status == "抓料" || item.status == "放料") item.status = "空闲";
    }
  });

  if (selectedItems.value.length > 0) {
    console.log("selectedItems.value: ", selectedItems.value);
    const startXValues = selectedItems.value.map(item => item.startX);
    const endXValues = selectedItems.value.map(item => item.endX);
    const min = Math.min(...startXValues);
    const max = Math.max(...endXValues);
    console.log("Min startX:", min, "Max startX:", max);
    if (newStatus == "放料") {
      sendputlocation.value.unloadLeft = min;
      sendputlocation.value.unloadRight = max;
    } else {
      sendputlocation.value.loadLeft = min;
      sendputlocation.value.loadRight = max;
    }
    // console.log(sendputlocation.value);

    // 更新选中区域的 status
    selectedItems.value.forEach(item => {
      item.status = newStatus;
    });
  }
};
const retryRequest = async (fn, retrues = 3, delay = 1000) => {
  for (let i = 0; i < retrues; i++) {
    try {
      const result = await fn();
      console.log(`Attempt ${i + 1}:`, result);
      if (result && result.length > 0) return result;
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
    }
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  throw new Error("重试次数过多，仍然失败");
};
const op1 = async () => {
  try {
    const res = await retryRequest(() =>
      props.API.DataBase.GetGroundDivision(props.requestUrl)
    );
    cities.value.values = res;
  } catch (error) {
    console.error("获取地面分区数据出错:", error);
  }
};
const pourNo = ref();
const SelectPourNo = async () => {
  try {
    const res = await props.API.DataBase.GetPourPoints(props.requestUrl);
    console.log("Data received:", res);
    pourNo.value = res;
  } catch (error) {
    console.error("获取浇注点数据出错:", error);
  }
};
onMounted(() => {
  op1();
  SelectPourNo();
  ElMessage.success(
    "当前pinia：" +
      "load" +
      store.sendputlocation.loadlocation +
      "unload" +
      store.sendputlocation.unloadlocation
  );
  switch (store.sendputlocation.loadlocation) {
    case "下料口1":
      radio.value = 1;
      handleClick2(1);
      break;
    case "下料口2":
      radio.value = 2;
      handleClick2(2);
      break;
    case "下料口3":
      radio.value = 3;
      handleClick2(3);
      break;
    default:
      radio.value = 4;
      handleClick2(4);
      break;
  }
});
onUnmounted(() => {
  props.cancelRequest();
});
</script>

<template>
  <div class="parent-container">
    <el-row>
      <el-col>
        <div class="mb-2">
          <el-text>抓料地址选择:</el-text>
          <!-- 下料口选择 -->
          <el-radio-group v-model="radio" class="ml-8">
            <el-tooltip
              v-for="option in options"
              :key="option.value"
              :content="tooltipContent1(option.value)"
              placement="top"
              effect="customized"
            >
              <el-radio
                border
                size="large"
                :value="option.value"
                @click="handleClick2(option.value)"
                >{{ option.label }}</el-radio
              >
            </el-tooltip>
          </el-radio-group>
          <!-- 单选or多选按钮 -->
          <el-radio-group
            v-show="false"
            v-model="radio2"
            disabled
            class="ml-60"
          >
            <el-tooltip
              v-for="option in radioTemp"
              :key="option.value"
              :content="tooltipContent(option.value)"
              placement="top"
              effect="customized"
            >
              <el-radio
                :value="option.value"
                @click="handleClick(option.value)"
                >{{ option.label }}</el-radio
              >
            </el-tooltip>
          </el-radio-group>
        </div>

        <!-- 抓 -->
        <el-checkbox-group
          v-show="isVisible"
          v-model="checkboxGroup3"
          size="large"
        >
          <el-checkbox-button
            v-for="item in cities.values"
            :key="item.groundId"
            :value="item.groundId"
            :checked="
              store.sendputlocation.loadlocation.includes(item.groundId)
            "
          >
            <el-text>{{ item.groundId }}</el-text>
          </el-checkbox-button>

          <el-button
            class="ml-3"
            type="success"
            :icon="Check"
            @click="UpdatePourNo(1)"
          />
        </el-checkbox-group>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-text>放料地址选择:</el-text>
        <!-- 放 -->
        <el-checkbox-group v-model="checkboxGroup2" size="large">
          <el-checkbox-button
            v-for="item in cities.values"
            :key="item.groundId"
            :value="item.groundId"
            :checked="
              store.sendputlocation.unloadlocation.includes(item.groundId)
            "
          >
            <el-text>{{ item.groundId }}</el-text>
          </el-checkbox-button>
          <el-button
            class="ml-3"
            type="success"
            :icon="Check"
            @click="UpdatePourNo(2)"
          />
        </el-checkbox-group>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-button
          class="w-2/12"
          size="large"
          type="success"
          @click="immediateDebounce"
          >执行</el-button
        >
        <el-button
          class="w-2/12"
          size="large"
          type="warning"
          @click="PauseWorkDebounce"
          >暂停</el-button
        >
        <el-button
          class="w-2/12"
          size="large"
          type="primary"
          @click="ContinueWorkDebounce"
          >继续</el-button
        >
        <el-button
          class="w-2/12"
          size="large"
          type="primary"
          @click="EndWorkDebounce"
          >结束</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.el-row {
  padding-bottom: 1rem;
}
.el-text {
  font-size: 1.5rem;
  margin-right: 0.4rem;
  margin-left: 0.4rem;
}
.el-button {
  font-size: 1.5rem;
  font-weight: bold;
}
.el-radio {
  font-size: 2rem;
  font-weight: bold;
  width: 8vw;
}
.parent-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto; /* 或者使用其他固定高度 */
}
</style>
