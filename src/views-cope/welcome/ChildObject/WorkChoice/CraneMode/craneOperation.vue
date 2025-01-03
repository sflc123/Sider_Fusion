<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { InfoFilled } from "@element-plus/icons-vue";
import axios from "axios";
const props = defineProps<{
  ApiUrl: any;
  HandMovement: Array<string>;
}>();
const cities = ref({ values: [] });
//0:手动，1：自动
const UpdeteworkMode = (index: number) => {
  axios
    .put(props.ApiUrl.PlcSetUp.SetWorkMode, null, {
      params: {
        workMode: index
      }
    })
    .then(res => {
      cities.value.values = res.data;
      ElMessage.success("切换模式成功!");
      console.log("API response:", cities.value.values);
    })
    .catch(error => {
      console.error("Error fetching pour select:", error);
    });
};
//自动泊车
const ParkingMove = () => {
  axios
    .put(props.ApiUrl.AutoCrane.AutoParking, null, {
      params: {
        id: 1
      }
    })
    .then(res => {
      ElMessage.success("行车复位执行成功!");
      console.log("API response:", res.data);
    });
};
//扫描料场
const ScanMove = () => {
  axios.get(props.ApiUrl.AutoCrane.ScanEntireArea).then(res => {
    ElMessage.success("扫描料场执行成功!");
    console.log("API response:", res.data);
  });
};
//大车单动
const LargeMoveTask = () => {
  axios
    .put(props.ApiUrl.WorkOrderManipulate.PutLargeVehicleMove, null, {
      params: {
        target: HandMovementWork.value[0].X * 1000
      }
    })
    .then(response => {
      ElMessage.success("大车单动执行成功!");
      HandMovementWork.value[0].X = null;
      console.log("Response:", response.data);
    })
    .catch(error => {
      ElMessage.error("请求失败!");
      console.error("Error:", error);
    });
};
//小车单动
const SmallMoveTask = () => {
  axios
    .put(props.ApiUrl.WorkOrderManipulate.PutSmallVehicleMove, null, {
      params: {
        target: HandMovementWork.value[0].Y * 1000
      }
    })
    .then(response => {
      ElMessage.success("小车单动执行成功!");
      HandMovementWork.value[0].Y = null;

      console.log("Response:", response.data);
    })
    .catch(error => {
      ElMessage.success("请求失败!");
      console.error("Error:", error);
    });
};
//起升单动
const BucketMoveTask = () => {
  axios
    .put(props.ApiUrl.WorkOrderManipulate.PutBucketMove, null, {
      params: {
        target: HandMovementWork.value[0].Z * 1000
      }
    })
    .then(response => {
      ElMessage.success("起升单动执行成功!");
      HandMovementWork.value[0].Z = null;
      console.log("Response:", response.data);
    })
    .catch(error => {
      ElMessage.success("请求失败!");
      console.error("Error:", error);
    });
};
// onMounted(() => {});
const HandMovementWork = ref([
  {
    X: null,
    Y: null,
    Z: null
  }
]);
</script>

<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="是否切换手动模式?"
            @confirm="UpdeteworkMode(0)"
          >
            <template #reference>
              <el-button type="primary" size="large" plain>手动模式</el-button>
            </template>
          </el-popconfirm>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="是否切换自动模式?"
            @confirm="UpdeteworkMode(1)"
          >
            <template #reference>
              <el-button type="primary" size="large" plain>自动模式</el-button>
            </template>
          </el-popconfirm>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-popconfirm
            ref="popconfirm"
            title="是否移动行车至停靠点？"
            @confirm="ParkingMove()"
            ><template #reference>
              <el-button plain size="large" type="primary">行车复位 </el-button>
            </template></el-popconfirm
          ></el-card
        >
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover"
          ><el-popconfirm
            ref="popconfirm"
            title="是否扫描整个料场？"
            @confirm="ScanMove()"
            ><template #reference>
              <el-button plain size="large" type="primary">扫描料场</el-button>
            </template></el-popconfirm
          ></el-card
        >
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <el-input
            v-model="HandMovementWork[0].X"
            size="large"
            placeholder="请输入X目标值(米)"
          /><el-button type="primary" plain size="large" @click="LargeMoveTask"
            >大车单动</el-button
          ><br />
          <el-input
            v-model="HandMovementWork[0].Y"
            size="large"
            placeholder="请输入Y目标值(米)"
          /><el-button type="primary" plain size="large" @click="SmallMoveTask"
            >小车单动</el-button
          ><br />
          <el-input
            v-model="HandMovementWork[0].Z"
            size="large"
            placeholder="请输入Z目标值(米)"
          /><el-button type="primary" plain size="large" @click="BucketMoveTask"
            >起升单动</el-button
          >
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.el-card {
  background-color: transparent;
}
.el-col {
  text-align: center;
}
.el-button {
  font-size: 1.5rem;
  margin-bottom: 5px;
  font-weight: bold;
}
.el-input {
  width: 50%;
  margin-bottom: 5px;
  margin-right: 2rem;
}
</style>
