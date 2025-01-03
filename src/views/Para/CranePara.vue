<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import { Check, CloseBold, Select } from "@element-plus/icons-vue";
import axios from "axios";
import Urls from "@/store/urls";
const props = defineProps<{
  API: any;
  requestUrl: any;
  cancelRequest: () => void;
}>();

const CarParams = [
  { 大车参数: Urls.PlcStatus.GetLargeVehicleSetUp },
  { 小车参数: Urls.PlcStatus.GetSmallVehicleSetUp }
];

const LimitParams = [
  { 系统相关参数: Urls.PlcStatus.GetSystemSetUp },
  { 电气限位参数: Urls.PlcStatus.GetElectricLimitSetUp }
];
const BucketParams = [
  { 起升参数: Urls.PlcStatus.GetHoistSetUp },
  { 开闭参数: Urls.PlcStatus.GetSwitchSetUp },
  { 抓斗参数: Urls.PlcStatus.GetBucketSetUp }
];

//大小车参数设置
let CarParamsData = ref([]);
//限位参数设置
let LimitParamsData = ref([]);
//抓斗参数设置
let BucketData = ref([]);

//大车参数更改请求
const UpdateCarsData1 = async (data, index) => {
  const parms = {
    name: data.name,
    data: data.data
  };
  switch (index) {
    case 0:
      if (data.name == "大车测距方向")
        parms.data = data.data == "顺时针" ? "逆时针" : "顺时针";
      if (data.name == "大车测距自动校正点")
        parms.data = data.data == "上停" ? "下停" : "上停";
      if (data.name == "大车测距校正方式")
        parms.data = data.data == "自动" ? "手动" : "自动";
      await props.API.PlcSetUp.SetLargeVehicle(props.requestUrl, parms);
      // await axios.put(CarsParmsSetUp.SetLargeVehicle, parms).then(response => {
      //   console.log(response.data);
      // });
      break;
    case 1:
      if (data.name == "小车测距方向")
        parms.data = data.data == "顺时针" ? "逆时针" : "顺时针";
      if (data.name == "小车测距自动校正点")
        parms.data = data.data == "上停" ? "下停" : "上停";
      if (data.name == "小车测距校正方式")
        parms.data = data.data == "自动" ? "手动" : "自动";
      await props.API.PlcSetUp.SetSmallVehicle(props.requestUrl, parms);
      // await axios.put(CarsParmsSetUp.SetSmallVehicle, parms).then(response => {
      //   console.log(response.data);
      // });
      break;
    default:
  }
  GetCarsData();
};
const UpdateCarsData = async (data, index, setToTrue) => {
  try {
    const parms = {
      name: data.name,
      data: data.data
    };
    const value = setToTrue ? "True" : "False";

    switch (index) {
      case 0:
        const isLargeVehicleOperation =
          data.name === "大车恢复出厂设置" || data.name === "大车测距校正";
        parms.data = isLargeVehicleOperation ? value : parms.data;
        if (isLargeVehicleOperation) {
          await props.API.PlcSetUp.SetLargeVehicle(props.requestUrl, parms);
          // await axios
          //   .put(CarsParmsSetUp.SetLargeVehicle, parms)
          //   .then(response => {
          //     console.log(response.data);
          //   });
        }
        break; // Add break to prevent fall-through
      case 1:
        const isSmallVehicleOperation =
          data.name === "小车恢复出厂设置" || data.name === "小车测距校正";
        parms.data = isSmallVehicleOperation ? value : parms.data;
        if (isSmallVehicleOperation) {
          await props.API.PlcSetUp.SetSmallVehicle(props.requestUrl, parms);
          // await axios
          //   .put(CarsParmsSetUp.SetSmallVehicle, parms)
          //   .then(response => {
          //     console.log(response.data);
          //   });
        }
        break; // Add break to prevent fall-through
    }
  } catch (error) {
    console.error("Error updating data:", error);
  }
  GetCarsData();
};
const UpdateCarsInputData = async (data, index) => {
  const parms = {
    name: data.name,
    data: data.data
  };
  switch (index) {
    case 0:
      await props.API.PlcSetUp.SetLargeVehicle(props.requestUrl, parms)
        .then(response => {
          GetCarsData();
        })
        .catch(error => {
          console.error("Error updating data:", error);
          GetCarsData();
        });
      // await axios
      //   .put(CarsParmsSetUp.SetLargeVehicle, parms)
      //   .then(response => {
      //     GetCarsData();
      //   })
      //   .catch(error => {
      //     console.error("Error updating data:", error);
      //     GetCarsData();
      //   });
      break;
    case 1:
      await props.API.PlcSetUp.SetSmallVehicle(props.requestUrl, parms)
        .then(response => {
          GetCarsData();
        })
        .catch(error => {
          console.error("Error updating data:", error);
          GetCarsData();
        });
      // await axios
      //   .put(CarsParmsSetUp.SetSmallVehicle, parms)
      //   .then(response => {
      //     GetCarsData();
      //   })
      //   .catch(error => {
      //     console.error("Error updating data:", error);
      //     GetCarsData();
      //   });
      break;
  }
};
//抓斗参数更改请求
const UpdateBucketData1 = async (rowdata, index) => {
  const parms = {
    name: rowdata.name,
    data: rowdata.data
  };
  console.log("111111111111111111", parms.data);
  switch (index) {
    case 0:
      if (rowdata.name == "起升编码器方向")
        parms.data = rowdata.data == "顺时针" ? "逆时针" : "顺时针";
      if (rowdata.name == "起升编码器自动校正点")
        parms.data = rowdata.data == "上停" ? "下停" : "上停";
      if (rowdata.name == "起升编码器校正方式")
        parms.data = rowdata.data == "自动" ? "手动" : "自动";
      await props.API.PlcSetUp.SetHoist(props.requestUrl, parms);
      // await axios.put(CarsParmsSetUp.SetHoist, parms).then(response => {
      //   console.log(response.data);
      // });
      break;
    case 1:
      if (rowdata.name == "开闭编码器方向")
        parms.data = rowdata.data == "顺时针" ? "逆时针" : "顺时针";
      if (rowdata.name == "开闭编码器自动校正点")
        parms.data = rowdata.data == "上停" ? "下停" : "上停";
      if (rowdata.name == "开闭编码器校正方式")
        parms.data = rowdata.data == "自动" ? "手动" : "自动";
      await props.API.PlcSetUp.SetSwitch(props.requestUrl, parms);
      // await axios.put(CarsParmsSetUp.SetSwitch, parms).then(response => {
      //   console.log(response.data);
      // });
      break;
    case 2:
      await props.API.PlcSetUp.SetBucket(props.requestUrl, parms);
      // await axios.put(CarsParmsSetUp.SetBucket, parms).then(response => {
      //   console.log("2222222222222", parms);
      // });
      break;
    default:
  }
  GetBucketData();
};
const UpdateBuckedData = async (data, index, setToTrue) => {
  try {
    const parms = {
      name: data.name,
      data: data.data
    };
    const value = setToTrue ? "True" : "False";

    switch (index) {
      case 0:
        const isLargeVehicleOperation =
          data.name === "起升恢复出厂设置" ||
          data.name === "起升编码器校正" ||
          data.name === "起升制动器1计数清零" ||
          data.name === "起升制动器2计数清零";
        parms.data = isLargeVehicleOperation ? value : parms.data;
        if (isLargeVehicleOperation) {
          await props.API.PlcSetUp.SetHoist(props.requestUrl, parms);
          // await axios.put(CarsParmsSetUp.SetHoist, parms).then(response => {
          //   console.log(response.data);
          // });
        }
        break;
      case 1:
        const isSmallVehicleOperation =
          data.name === "开闭恢复出厂设置" ||
          data.name === "开闭编码器校正" ||
          data.name === "开闭制动器1计数清零" ||
          data.name === "开闭制动器2计数清零";
        parms.data = isSmallVehicleOperation ? value : parms.data;
        if (isSmallVehicleOperation) {
          await props.API.PlcSetUp.SetSwitch(props.requestUrl, parms);
          // await axios.put(CarsParmsSetUp.SetSwitch, parms).then(response => {
          //   console.log(response.data);
          // });
        }
        break;
      default:
    }
  } catch (error) {
    console.error("Error updating data:", error);
  }
  GetBucketData();
};
const UpdateBuckedInputData = async (data, index) => {
  const parms = {
    name: data.name,
    data: data.data
  };
  switch (index) {
    case 0:
      await props.API.PlcSetUp.SetHoist(props.requestUrl, parms)
        .then(response => {
          GetBucketData();
        })
        .catch(error => {
          console.error("Error updating data:", error);
          GetBucketData();
        });
      // await axios
      //   .put(CarsParmsSetUp.SetHoist, parms)
      //   .then(response => {
      //     GetBucketData();
      //   })
      //   .catch(error => {
      //     console.error("Error updating data:", error);
      //     GetBucketData();
      //   });
      break;
    case 1:
      await props.API.PlcSetUp.SetSwitch(props.requestUrl, parms)
        .then(response => {
          GetBucketData();
        })
        .catch(error => {
          console.error("Error updating data:", error);
          GetBucketData();
        });
      // await axios
      //   .put(CarsParmsSetUp.SetSwitch, parms)
      //   .then(response => {
      //     GetBucketData();
      //   })
      //   .catch(error => {
      //     console.error("Error updating data:", error);
      //     GetBucketData();
      //   });
      break;
    case 2:
      await props.API.PlcSetUp.SetBucket(props.requestUrl, parms)
        .then(response => {
          GetBucketData();
        })
        .catch(error => {
          console.error("Error updating data:", error);
          GetBucketData();
        });
      // await axios
      //   .put(CarsParmsSetUp.SetBucket, parms)
      //   .then(response => {
      //     GetBucketData();
      //   })
      //   .catch(error => {
      //     console.error("Error updating data:", error);
      //     GetBucketData();
      //   });
      break;
  }
};
//限位参数更改请求
const UpdateLimitData = async (data, index) => {
  const parms = {
    name: data.name,
    data: data.data
  };
  console.log("1233123123", parms.data);
  await props.API.PlcSetUp.SetSystem(props.requestUrl, parms);
  // await axios.put(CarsParmsSetUp.SetSystem, parms).then(response => {
  //   console.log(response.data);
  // });
  GetLimitData();
};
const UpdateLimitInputData = async (data, index) => {
  const parms = {
    name: data.name,
    data: data.data
  };
  switch (index) {
    case 0:
      await props.API.PlcSetUp.SetSystem(props.requestUrl, parms)
        .then(response => {
          GetLimitData();
        })
        .catch(error => {
          console.error("Error updating data:", error);
          GetLimitData();
        });
      // await axios
      //   .put(CarsParmsSetUp.SetSystem, parms)
      //   .then(response => {
      //     GetLimitData();
      //   })
      //   .catch(error => {
      //     console.error("Error updating data:", error);
      //     GetLimitData();
      //   });
      break;
    case 1:
      await props.API.PlcSetUp.SetElectricLimit(props.requestUrl, parms)
        .then(response => {
          GetLimitData();
        })
        .catch(error => {
          console.error("Error updating data:", error);
          GetLimitData();
        });
      // await axios
      //   .put(CarsParmsSetUp.SetElectricLimit, parms)
      //   .then(response => {
      //     GetLimitData();
      //   })
      //   .catch(error => {
      //     console.error("Error updating data:", error);
      //     GetLimitData();
      //   });
      break;
  }
};
//查询参数请求
const GetCarsData = async () => {
  try {
    const [LargeVehicleSetUp, SmallVehicleSetUp] = await axios.all([
      props.API.PlcStatus.LargeVehicleSetUp(props.requestUrl),
      props.API.PlcStatus.SmallVehicleSetUp(props.requestUrl)
    ]);
    CarParamsData.value = [LargeVehicleSetUp, SmallVehicleSetUp];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  // try {
  //   const responses = await Promise.all(
  //     CarParams.map(param => axios.get(Object.values(param)[0]))
  //   );
  //   CarParamsData.value = responses.map(response => response.data);
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  // }
};
const GetLimitData = async () => {
  try {
    const [SystemSetUp, ElectricLimitSetUp] = await axios.all([
      props.API.PlcStatus.SystemSetUp(props.requestUrl),
      props.API.PlcStatus.ElectricLimitSetUp(props.requestUrl)
    ]);
    LimitParamsData.value = [SystemSetUp, ElectricLimitSetUp];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  // try {
  //   const responses = await Promise.all(
  //     LimitParams.map(param => axios.get(Object.values(param)[0]))
  //   );
  //   LimitParamsData.value = responses.map(response => response.data);
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  // }
};
const GetBucketData = async () => {
  try {
    const [HoistSetUp, SwitchSetUp, BucketSetUp] = await axios.all([
      props.API.PlcStatus.HoistSetUp(props.requestUrl),
      props.API.PlcStatus.SwitchSetUp(props.requestUrl),
      props.API.PlcStatus.BucketSetUp(props.requestUrl)
    ]);
    BucketData.value = [HoistSetUp, SwitchSetUp, BucketSetUp];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  // try {
  //   const responses = await Promise.all(
  //     BucketParams.map(param => axios.get(Object.values(param)[0]))
  //   );
  //   BucketData.value = responses.map(response => response.data);
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  // }
};
onMounted(() => {
  GetCarsData();
  GetLimitData();
  GetBucketData();
});
onUnmounted(() => {
  props.cancelRequest();
});
</script>

<template>
  <el-tabs tab-position="top" type="border-card" style="margin: 0rem">
    <el-tab-pane label="大小车参数设置">
      <el-row>
        <el-col v-for="(param, index) in CarParams" :key="index" :span="12">
          <el-card shadow="always" class="pl-10">
            <el-table :data="CarParamsData[index]">
              <el-table-column :label="Object.keys(param)[0]" prop="name" />
              <el-table-column label="设置">
                <template #default="scope">
                  <template v-if="scope.row.type === 'Bool'">
                    <el-button
                      v-if="
                        scope.row.data === 'True' || scope.row.data === 'False'
                      "
                      plain
                      value="scope.row.data"
                      type="success"
                      :icon="
                        scope.row.data === 'True' || scope.row.data === 'False'
                          ? Check
                          : null
                      "
                      @mouseup="UpdateCarsData(scope.row, index, false)"
                      @mousedown="UpdateCarsData(scope.row, index, true)"
                    >
                      {{
                        scope.row.data === "False" || scope.row.data === "True"
                          ? ""
                          : scope.row.data
                      }}
                    </el-button>

                    <el-button
                      v-else
                      plain
                      value="scope.row.data"
                      type="success"
                      :icon="null"
                      @click="UpdateCarsData1(scope.row, index)"
                    >
                      {{
                        scope.row.data === "False" || scope.row.data === "True"
                          ? ""
                          : scope.row.data
                      }}
                    </el-button>
                  </template>
                  <template v-else>
                    <el-input
                      v-model="scope.row.data"
                      size="small"
                      type="number"
                      @change="UpdateCarsInputData(scope.row, index)"
                    />
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <!-- <el-col :span="4">
          <el-card
            shadow="always"
            style="
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
            "
          >
            <el-row style="margin-top: auto">
              <el-button plain type="primary" @click="GetCarsData"
                >更新参数</el-button
              >
            </el-row>
            <el-row style="margin-top: 10%">
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                title="是否修改参数?"
                @confirm="null"
              >
                <template #reference>
                  <el-button plain type="danger">修改参数</el-button>
                </template>
              </el-popconfirm>
            </el-row>
          </el-card>
        </el-col> -->
      </el-row>
    </el-tab-pane>

    <el-tab-pane label="抓斗参数设置">
      <el-row>
        <el-col v-for="(param, index) in BucketParams" :key="index" :span="8">
          <el-card shadow="always" style="height: 100%" class="pl-10">
            <el-table :data="BucketData[index]">
              <el-table-column :label="Object.keys(param)[0]" prop="name" />
              <el-table-column label="设置">
                <template #default="scope">
                  <template v-if="scope.row.type === 'Bool'">
                    <template
                      v-if="
                        index === 2 &&
                        (scope.row.data === 'True' ||
                          scope.row.data === 'False')
                      "
                    >
                      <el-switch
                        v-model="scope.row.data"
                        active-value="True"
                        inactive-value="False"
                        @change="UpdateBucketData1(scope.row, index)"
                      />
                    </template>

                    <template v-else>
                      <el-button
                        v-if="
                          scope.row.data === 'True' ||
                          scope.row.data === 'False'
                        "
                        plain
                        type="success"
                        :icon="
                          scope.row.data === 'True' ||
                          scope.row.data === 'False'
                            ? Check
                            : null
                        "
                        @mouseup="UpdateBuckedData(scope.row, index, true)"
                        @mousedown="UpdateBuckedData(scope.row, index, false)"
                      />
                      <el-button
                        v-else
                        plain
                        type="success"
                        :icon="null"
                        @click="UpdateBucketData1(scope.row, index)"
                      >
                        {{
                          scope.row.data === "False" ||
                          scope.row.data === "True"
                            ? ""
                            : scope.row.data
                        }}
                      </el-button>
                    </template>
                  </template>

                  <template v-else>
                    <el-input
                      v-model="scope.row.data"
                      size="small"
                      @change="UpdateBuckedInputData(scope.row, index)"
                    />
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <!-- <el-col :span="3">
          <el-card
            shadow="always"
            style="
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
            "
          >
            <el-row style="margin-top: auto">
              <el-button
                plain
                type="primary"
                style="width: 80%"
                @click="GetBucketData()"
                >更新参数</el-button
              >
            </el-row>
            <el-row style="margin-top: 10%">
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                title="是否修改参数?"
                @confirm="null"
              >
                <template #reference>
                  <el-button plain style="width: 80%" type="danger"
                    >修改参数</el-button
                  >
                </template>
              </el-popconfirm>
            </el-row>
          </el-card>
        </el-col> -->
      </el-row>
    </el-tab-pane>

    <el-tab-pane label="限位参数设置">
      <el-row>
        <el-col v-for="(param, index) in LimitParams" :key="index" :span="12">
          <el-card shadow="always" style="height: 100%" class="pl-10">
            <el-table :data="LimitParamsData[index]">
              <el-table-column :label="Object.keys(param)[0]" prop="name" />
              <el-table-column label="设置">
                <template #default="scope">
                  <template
                    v-if="
                      scope.row.data === 'False' || scope.row.data === 'True'
                    "
                  >
                    <el-switch
                      v-model="scope.row.data"
                      :active-value="'True'"
                      :inactive-value="'False'"
                      @change="UpdateLimitData(scope.row, index)"
                    />
                  </template>
                  <template v-else>
                    <el-input
                      v-model="scope.row.data"
                      size="small"
                      @change="UpdateLimitInputData(scope.row, index)"
                    />
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <!-- <el-col :span="4">
          <el-card
            shadow="always"
            style="
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
            "
          >
            <el-row style="margin-top: auto">
              <el-button plain type="primary" @click="GetLimitData"
                >更新参数</el-button
              >
            </el-row>
            <el-row style="margin-top: 10%">
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                title="是否修改参数?"
                @confirm="null"
              >
                <template #reference>
                  <el-button plain type="danger">修改参数</el-button>
                </template>
              </el-popconfirm>
            </el-row>
          </el-card>
        </el-col> -->
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>
.el-card {
  width: 99%;
  margin: 0 auto;
}
.el-button {
  width: 40%;
  font-size: 1.2rem;
  font-weight: bold;
}
.el-input {
  text-align: center;
  width: 40%;
}
.el-row {
  justify-content: center;
}
.el-table {
  height: 78vh;
}
</style>
