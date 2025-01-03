<template>
  <div>
    <el-row :gutter="20" style="height: 70%">
      <!-- <el-col v-for="(param, index) in Urls" :key="index" :span="8">
        <el-card style="height: 55vh" shadow="hover">
          <el-table :data="Data1[index]">
            <el-table-column :label="Object.keys(param)[0]" prop="name" />
            <el-table-column label="状态">
              <template #default="scope">
                <template
                  v-if="scope.row.data === 'False' || scope.row.data === 'True'"
                >
                  <el-tag
                    effect="dark"
                    round
                    :type="scope.row.data === 'False' ? 'success' : 'danger'"
                  />
                </template>
                <template v-else>
                  <el-input v-model="scope.row.data" size="small" />
                </template>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col> -->
      <el-col v-for="(param, index) in Data" :key="index" :span="8">
        <el-card shadow="hover">
          <el-table :data="Data2[index]">
            <el-table-column :label="Object.keys(param)[0]" prop="name" />
            <el-table-column label="数据">
              <template #default="scope">
                <template
                  v-if="scope.row.data === 'False' || scope.row.data === 'True'"
                >
                  <el-tag
                    effect="dark"
                    round
                    style="width: 20px; height: 20px"
                    :type="scope.row.data === 'False' ? 'success' : 'danger'"
                  />
                </template>
                <template v-else>
                  <el-input v-model="scope.row.data" size="small" />
                </template>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col v-for="(param, index) in Data3" :key="index" :span="8">
        <el-card shadow="hover">
          <el-table :data="Object.entries(param)">
            <el-table-column :label="Object.keys(param)[0]">
              <template #default="scope">
                {{ scope.row[0] }}
              </template>
            </el-table-column>
            <el-table-column label="数据">
              <template #default="scope">
                <template
                  v-if="scope.row[1] === 'False' || scope.row[1] === 'True'"
                >
                  <el-tag
                    effect="dark"
                    round
                    :type="scope.row[1] === 'False' ? 'success' : 'danger'"
                  />
                </template>
                <template v-else>
                  <el-input v-model="scope.row[1]" size="small" />
                </template>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";
const props = defineProps({
  Urls: Array,
  Data: Array,
  DataList: Array
});

const unitMapping: Record<string, string> = {
  起升电流: "A",
  开闭电流: "A",
  大车电流: "A",
  小车电流: "A",
  起升速度: "m/s",
  开闭速度: "m/s",
  大车速度: "m/s",
  小车速度: "m/s"
};
const GetDataList = async () => {
  try {
    const responses = await Promise.all(
      props.DataList.map(url => axios.get(Object.values(url)[0]))
    );
    Data3.value = responses.map(response => response.data);
    // 获取第二个数组对象
    const secondObject = Data1.value[1];
    const secondObject1 = Data1.value[2];

    // 遍历对象并修改变量名称
    const updatedObject = Object.entries(secondObject).reduce(
      (acc, [key, value]) => {
        acc[`${key}(${unitMapping[key] || ""})`] = value;
        return acc;
      },
      {}
    );
    const updatedObject1 = Object.entries(secondObject1).reduce(
      (acc, [key, value]) => {
        acc[`${key}(${unitMapping[key] || ""})`] = value;
        return acc;
      },
      {}
    );
    // 更新原始数组对象
    Data3.value[1] = updatedObject;
    Data3.value[2] = updatedObject1;
    console.log("Data3", Data3.value);
  } catch (error) {
    console.error("请求失败:", error);
    return null;
  }
};
const GetData = async () => {
  try {
    const responses = await Promise.all(
      props.Urls.map(url => axios.get(Object.values(url)[0]))
    );
    Data1.value = responses.map(response => response.data);
  } catch (error) {
    console.error("请求失败:", error);
    return null;
  }
};
const GetData1 = async () => {
  try {
    const responses = await Promise.all(
      props.Data.map(item => axios.get(Object.values(item)[0]))
    );
    Data2.value = responses.map(response => response.data);

    // const response = axios.get(props.Data[0][0]);
    // const response1 = axios.get(props.Data[0][1]);
    // console.log("Data1", props.Data[0][0], props.Data[0][1]);

    Data2.value[0][0].name += "(m)";
    Data2.value[0][1].name += "(m)";
    Data2.value[0][2].name += "(m)";
    Data2.value[0][3].name += "(m)";
    Data2.value[0][4].name += "(m)";
    Data2.value[0][5].name += "(m)";
    Data2.value[0][6].name += "(m)";
  } catch (error) {
    console.error("请求失败:", error);
    return null;
  }
};
let Data2 = ref([]);
let Data1 = ref([]);
let Data3 = ref([]);
let intervalId1;
onMounted(() => {
  GetData();
  GetData1();
  GetDataList();
  intervalId1 = setInterval(async () => {
    try {
      await GetData();
      await GetData1();
      await GetDataList();
    } catch (error) {
      console.error("后端api请求失败:", error);
    }
  }, 1000);
  // intervalId1 = setInterval(async () => {
  //   try {
  //     const responses = await Promise.all(
  //       props.Urls.slice(0, 2).map(url => axios.get(url))
  //     );
  //     Data1.value = responses.map(response => response.data);
  //     console.log("Data1", Data1.value);
  //   } catch (error) {
  //     console.error("请求失败:", error);
  //   }
  // }, 1000);
  // intervalId2 = setInterval(async () => {
  //   try {
  //     const responses = await Promise.all(
  //       props.Urls.slice(2).map(url => axios.get(url))
  //     );
  //     Data2.value = responses.map(response => response.data);
  //     console.log("Data2", Data2.value);
  //   } catch (error) {
  //     console.error("请求失败:", error);
  //   }
  // }, 1000);
});
onUnmounted(() => {
  clearInterval(intervalId1);
});
</script>
<style scoped>
/* .el-row {
  height: 90vh;
} */
.el-card {
  margin-bottom: 1.3rem;
  text-align: center;
}
.el-input {
  width: 50%;
}
</style>
