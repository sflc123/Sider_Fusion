<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { InfoFilled } from "@element-plus/icons-vue";
const props = defineProps<{
  API: any;
  cancelRequest: () => void;
  requestUrl: any;
}>();
const ID = {
  Id: 1
};
const cities = ref({ values: [] });
const HandMovementWork = ref([
  {
    X: null,
    Y: null,
    Z: null
  }
]);
//0:手动，1：自动
const UpdeteworkMode = (index: number) => {
  props.API.PlcSetUp.setWorkMode(props.requestUrl, { workMode: index })
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
  props.API.AutoCrane.AutoParking(props.requestUrl, "1")
    .then(res => {
      ElMessage.success("行车复位执行成功!");
      console.log("API response:", ID);
    })
    .catch(error => {
      console.error("Error fetching pour select:", error);
    });
};
//扫描料场
const ScanMove = () => {
  props.API.AutoCrane.ScanEntireArea(props.requestUrl).then(res => {
    ElMessage.success("扫描料场执行成功!");
    console.log("API response:", res.data);
  });
};
//大车单动
const LargeMoveTask = () => {
  props.API.WorkOrderManipulate.LargeVehicleMove(props.requestUrl, {
    target: HandMovementWork.value[0].X * 1000
  })
    .then(res => {
      ElMessage.success("大车单动执行完成!");
      console.log("大车单动执行成功:", HandMovementWork.value[0].X * 1000);
      HandMovementWork.value[0].X = null;
    })
    .catch(error => {
      ElMessage.error("大车单动执行失败!", error);
      console.error("Error:", error);
    });
};
//小车单动
const SmallMoveTask = () => {
  props.API.WorkOrderManipulate.SmallVehicleMove(props.requestUrl, {
    target: HandMovementWork.value[0].Y * 1000
  })
    .then(res => {
      ElMessage.success("小车单动执行完成!");
      console.log("小车单动执行成功:", HandMovementWork.value[0].Y * 1000);
      HandMovementWork.value[0].Y = null;
    })
    .catch(error => {
      ElMessage.error("小车单动执行失败!", error);
      console.error("Error:", error);
    });
};
//起升单动
const BucketMoveTask = () => {
  props.API.WorkOrderManipulate.BucketMove(props.requestUrl, {
    target: HandMovementWork.value[0].Z * 1000
  })
    .then(res => {
      ElMessage.success("起升单动执行完成!");
      console.log("起升单动执行成功:", HandMovementWork.value[0].Z * 1000);
      HandMovementWork.value[0].Z = null;
    })
    .catch(error => {
      ElMessage.error("起升单动执行失败!", error);
      console.error("Error:", error);
    });
};
onUnmounted(() => {
  props.cancelRequest();
});
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
