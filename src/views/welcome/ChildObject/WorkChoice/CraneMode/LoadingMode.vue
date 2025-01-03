<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import { Check } from "@element-plus/icons-vue";
import axios from "axios";
const props = defineProps<{
  API: any;
  cancelRequest: () => void;
  requestUrl: any;
}>();
//抓料区
const PutPour301 = [null, null, null, null];

const tooltipContent1 = value1 => {
  return value1 === 4
    ? "是否切换到自选区域倒料？"
    : `是否切换到${value1}号下料口？`;
};
const cities = ref({ values: [] });
const checkboxGroup3 = ref([]);
let isVisible = ref(false);
const index = ref(2);
const value3 = ref(true);
const value4 = ref();
const value5 = ref();
const radio = ref();
const CraneModeData = ref({ values: [] });
const options = ref([
  { value: 1, label: "下料口1" },
  { value: 2, label: "下料口2" },
  { value: 3, label: "下料口3" },
  { value: 4, label: "区域倒料" }
]);
const parkingSpots = ref([
  {
    icon: "success",
    inputValue: "",
    title: "一号车位",
    subTitle: "车辆就绪",
    buttonText: "确认装车"
  },
  {
    icon: "warning",
    inputValue: "",

    title: "二号车位",
    subTitle: "车辆信号异常",
    buttonText: "检查信号"
  },
  {
    icon: "error",
    inputValue: "",
    title: "三号车位",
    subTitle: "无车",
    buttonText: "等待车辆"
  }
  // 可以根据需要添加更多车位
]);
//删除所有选择区域
const DeletePOURNO = () => {
  console.log(checkboxGroup3.value);
  axios
    .put(props.API.pouroperate.updatePourNo)
    .then(res => {
      selectNos();
      console.log("API response:", res.data);
    })
    .catch(error => {
      console.error("Error fetching pour select:", error);
    });
};

const handleClick2 = async value => {
  // 处理点击事件
  CraneModeData.value.values[0].pouR_NO = value.toString();
  // 如果需要执行进一步的逻辑，可以在这里添加
  await axios
    .put(props.API.craneMode._PutPourNO, CraneModeData.value.values[0])
    .then(res => {
      value === 4
        ? ElMessage.success(`已选择区域倒料`)
        : ElMessage.success(`已选择${value}号下料口`);
      GetcraneMode();
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};
//抓取料区查询
const UpdatePourNo = value => {
  const isPourReclaiming = value === 1;
  const checkboxGroup = checkboxGroup3;
  const endpoint = isPourReclaiming
    ? props.API.pouroperate.PutPourReclaimingt
    : props.API.pouroperate.PutPourDisCharge;

  fillCheckboxRange(checkboxGroup);
  sendPutRequest(endpoint, checkboxGroup);
};
// 填充checkbox数组的方法抽象出来
const fillCheckboxRange = checkboxGroup => {
  if (index.value === 2) {
    const selectedCheckboxes = checkboxGroup.value;
    const numbers = selectedCheckboxes.map(value => parseInt(value, 10));
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    console.log(min + max);
    for (let i = min + 1; i < max; i++) {
      const repeatedI = String(i);
      if (!checkboxGroup.value.includes(repeatedI)) {
        checkboxGroup.value.push(repeatedI);
      }
    }
  }
};

// axios请求的抽象
const sendPutRequest = (endpoint, checkboxGroup) => {
  axios
    .put(endpoint, checkboxGroup.value)
    .then(res => {
      selectNos();
      console.log(res.data);
    })
    .catch(error => {
      console.error("Error fetching pour select:", error);
      if (error.response) {
        console.error(error.response.status);
      }
    });
};
const handleDelete = () => {};
const confirmLoading = index => {
  // 这里可以添加点击按钮后的逻辑
  // 例如，根据索引来处理特定车位的装车请求
  console.log(`车位 ${index + 1} 的装车请求已确认`);
};

const GetcraneMode = async () => {
  await axios
    .get(props.API.craneMode._GetCraneMode)
    .then(response => {
      CraneModeData.value.values = response.data;
      CraneModeData.value.values[0].scaN_FLAG == "0"
        ? (value3.value = false)
        : (value3.value = true);
      switch (CraneModeData.value.values[0].worK_MODE) {
        case "0":
          value4.value = null;
          value5.value = true;

          break;
        case "1":
          value4.value = true;
          break;
        case "2":
          value4.value = false;
          break;
        default:
      }
      radio.value = parseInt(CraneModeData.value.values[0].pouR_NO);
      radio.value === 4 ? (isVisible.value = true) : (isVisible.value = false);
      console.log("readio" + radio.value);
    })
    .catch(error => {
      console.error("Error fetching crane mode:", error);
    });
};
const putWork = () => {
  const baseUrl = "http://192.168.0.17:5078/API/AutoCrane/AutoRuning";
  const urlWithParams = `${baseUrl}?loadLeft=${PutPour301[0]}&loadRight=${PutPour301[1]}&blowLeft=${PutPour301[2]}&blowRight=${PutPour301[3]}`;
  console.log(urlWithParams);
  axios
    .put(urlWithParams)
    .then(res => {
      console.log(res.data, { type: "success" });
    })
    .catch(error => {
      console.log("请求失败", { type: "error" });
    });
};
const selectNos = () => {
  //抓料
  axios
    .get(props.API.pouroperate.getReclaimingURL)
    .then(res => {
      const selectNos = res.data.map(item => item.selecT_NO);
      checkboxGroup3.value = selectNos;
      PutPour301[0] = (parseInt(checkboxGroup3.value[0]) - 1) * 6000;
      PutPour301[1] =
        parseInt(checkboxGroup3.value[checkboxGroup3.value.length - 1]) * 6000;
      console.log(checkboxGroup3);
    })
    .catch(error => {
      console.error("Error fetching reclaiming:", error);
    });
};
const op = () => {
  axios
    .get(props.API.pouroperate.getPourSelectURL)
    .then(res => {
      cities.value.values = res.data;
      console.log("API response:", cities.value.values);
    })
    .catch(error => {
      console.error("Error fetching pour select:", error);
    });
};
onMounted(() => {
  // GetcraneMode();
  // op();
  // selectNos();
});
onUnmounted(() => {
  props.cancelRequest();
});
</script>

<template>
  <el-row>
    <el-col>
      <div class="mb-2">
        <el-text>抓料地址选择:</el-text>
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
      </div>
      <!-- 抓 -->
      <el-checkbox-group
        v-show="isVisible"
        v-model="checkboxGroup3"
        size="large"
      >
        <el-checkbox-button
          v-for="item in cities.values"
          :key="item.select_NO"
          :value="item.selecT_NO"
        >
          <el-text>{{ item.selecT_NO + item.materialName }}</el-text>
        </el-checkbox-button>

        <el-button
          class="ml-5"
          type="success"
          :icon="Check"
          @click="UpdatePourNo(1)"
        />
      </el-checkbox-group>
    </el-col>
  </el-row>

  <el-row>
    <el-col
      v-for="(parkingSpot, index) in parkingSpots"
      :key="index"
      :sm="12"
      :lg="8"
    >
      <el-result
        :icon="parkingSpot.icon as any"
        :title="parkingSpot.title"
        class="custom-result"
      >
        <template #extra>
          <div style="display: flex; align-items: center">
            <el-input
              v-model="parkingSpot.inputValue"
              size="large"
              placeholder="输入装载数"
            />
            <el-button
              type="primary"
              size="large"
              class="custom-button"
              @click="confirmLoading(index)"
            >
              {{ parkingSpot.buttonText }}
            </el-button>
          </div>
        </template>
      </el-result>
    </el-col>
  </el-row>
</template>

<style scoped>
.custom-result {
  padding: 0px;
  margin: 0px;
}

.el-text {
  font-size: 1.2rem;
}
.el-input {
  width: 50%;
}
.el-button {
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 1rem;
}
.el-radio {
  font-size: 2rem;
  font-weight: bold;
  width: 8vw;
}
</style>
