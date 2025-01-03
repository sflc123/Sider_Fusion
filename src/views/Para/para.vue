<script lang="ts" setup>
import { reactive, ref, onMounted, onUnmounted } from "vue";
import CranePara from "../Para/CranePara.vue";
import axios from "axios";
import Urls from "@/store/urls";
import { urls } from "../../utils/Url";

import { API, useRequest } from "@/store/urls";
const { requestUrl, cancelRequest } = useRequest();
const isPasswordDialogVisible = ref(false);
const isDialogVisible = ref(true);
const mesg = () => {
  axios.put(urls.UpdateparaUrl, formData.value).then(response => {
    console.log(response.data);
  });
};
const apiData = ref({});
const formData = ref({});
const users = reactive({
  OPERATORNAME: "cc",
  PASSWORD: "cc"
});
// 映射对象：将英文变量名映射到相应的中文名称
const englishToChineseMap: Record<string, string> = {
  id: "ID",
  bucketLength: "抓斗长度(m)",
  bucketWidth: "抓斗宽度(m)",
  smallVehicleLimitMax: "小车最大行驶距离(m)",
  smallVehicleLimitMin: "小车最小行驶距离(m)",
  largeVehicleLimitMax: "大车最大行驶距离(m)",
  largeVehicleLimitMin: "大车最小行驶距离(m)",
  groundLength: "料场长度(m)",
  groundWidth: "料场宽度(m)",
  craneHeight: "行车高度(m)",
  materialDensity: "物料密度(m)",
  pour1StartY: "1#出料口Y起始点(m)",
  pour1EndY: "1#出料口Y结束点(m)",
  pour2StartY: "2#出料口Y起始点(m)",
  pour2EndY: "2#出料口Y结束点(m)",
  pour3StartY: "3#出料口Y起始点(m)",
  pour3EndY: "3#出料口Y结束点(m)",
  freightWeightOffset: "货物重量偏移量(t)"
};

function getChineseLabel(key: string): string {
  return englishToChineseMap[key] || key; // 如果找不到映射，返回原始英文变量名
}
function convertToMeters(value: number | null): number | null {
  // 假设所有长度单位都已经是米，如果需要转换，可以在这里实现
  return value !== null ? value / 1000 : null;
}

function convertToTons(value: number | null): number | null {
  // 将重量偏移量转换为吨，假设传入的是千克
  return value !== null ? value / 1000 : null;
}
function VerifyPassword() {
  API.DataBase.GetPara(requestUrl)
    .then(response => {
      const rawData = response;
      const processedData = Object.keys(rawData)
        .filter(key => key !== "id") // 过滤掉id字段
        .reduce((result, key) => {
          result[key] =
            key === "freightWeightOffset"
              ? convertToTons(rawData[key])
              : convertToMeters(rawData[key]);
          return result;
        }, {});
      apiData.value = processedData;
      formData.value = { ...processedData };
    })
    .catch(error => console.log(error));
  // axios
  //   .get(Urls.DataBase.GetPara)
  //   .then(response => {
  //     const rawData = response.data;
  //     const processedData = Object.keys(rawData)
  //       .filter(key => key !== "id") // 过滤掉id字段
  //       .reduce((result, key) => {
  //         result[key] =
  //           key === "freightWeightOffset"
  //             ? convertToTons(rawData[key])
  //             : convertToMeters(rawData[key]);
  //         return result;
  //       }, {});
  //     apiData.value = processedData;
  //     formData.value = { ...processedData };
  //   })
  //   .catch(error => console.log(error));
}
onMounted(() => {
  VerifyPassword();
});
onUnmounted(() => {
  cancelRequest();
});
</script>

<template>
  <el-tabs type="border-card" style="height: 96%; margin: 1rem">
    <el-tab-pane label="库管系统参数设置">
      <el-row :gutter="24">
        <el-col :span="20">
          <el-card shadow="always" class="pl-10">
            <div class="flex flex-wrap ml-20">
              <div v-for="(value, key) in apiData" :key="key" class="w-1/2">
                <el-form label-position="left" label-width="250px">
                  <el-form-item :label="getChineseLabel(key) + ':'">
                    <el-input
                      v-model="formData[key]"
                      size="large"
                      v-bind:disabled="isDialogVisible"
                    />
                  </el-form-item>
                </el-form>
              </div>
            </div> </el-card
        ></el-col>
        <el-col :span="4">
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
                type="success"
                plain
                style="width: 60%"
                @click="VerifyPassword"
                >查看参数</el-button
              >
            </el-row>
            <!-- <el-row style="margin-top: auto">
              <el-button type="warning" plain style="width: 60%"
                >重置参数</el-button
              >
            </el-row> -->
            <!-- <el-row style="margin-top: auto">
              <el-button style="width: 60%" plain type="primary"
                >更新参数</el-button
              >
            </el-row> -->
            <el-row style="margin-top: auto">
              <el-button
                plain
                type="primary"
                style="width: 60%"
                @click="isPasswordDialogVisible = true"
                >检验密码</el-button
              >
            </el-row>
            <el-row style="margin-top: auto">
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                title="是否修改参数?"
                @confirm="mesg"
              >
                <template #reference>
                  <el-button
                    plain
                    type="danger"
                    style="width: 60%; margin-bottom: 10px"
                    >修改参数</el-button
                  >
                </template>
              </el-popconfirm>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-dialog
      v-model="isPasswordDialogVisible"
      title="验证用户密码"
      width="700"
    >
      <el-form :model="users">
        <el-form-item label="用户姓名">
          <el-input v-model="users.OPERATORNAME" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="users.PASSWORD" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            @click="(isPasswordDialogVisible = false), (isDialogVisible = true)"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="
              VerifyPassword();
              isPasswordDialogVisible = false;
              isDialogVisible = false;
            "
          >
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-tab-pane label="行车参数设置"
      ><CranePara
        :API="API"
        :cancelRequest="cancelRequest"
        :requestUrl="requestUrl"
    /></el-tab-pane>
  </el-tabs>
</template>

<style scoped>
.el-input {
  width: 60%;
}
.el-button {
  margin-bottom: 3.6rem;
  font-size: 1.2rem;
  font-weight: bold;
}
.el-row {
  justify-content: center;
}
</style>
