<template>
  <div style="height: 80vh">
    <el-row :gutter="20" style="height: 80%">
      <el-col v-for="(item, index) in Data2" :key="index" :span="4">
        <el-table :data="item" style="width: 100%; height: 70%">
          <el-table-column prop="name" label="变量名称" />
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
                <span>{{ scope.row.data }}</span>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col v-for="(item, index) in Data" :key="index" :span="5">
        <el-table :data="item" style="width: 100%; height: 70%">
          <el-table-column prop="name" label="变量名称" />
          <el-table-column label="数据">
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
                <span>{{ scope.row.data }}</span>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="20" style="height: 70%">
      <el-col v-for="(item, index) in Data" :key="index" :span="5">
        <el-table :data="item" style="width: 100%; height: 70%">
          <el-table-column prop="name" label="变量名称" />
          <el-table-column label="数据">
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
                <span>{{ scope.row.data }}</span>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="height: 100%">
      <el-col
        v-for="(param, index) in ElectricLimitStatas"
        :key="index"
        :span="4"
      >
        <el-card
          shadow="always"
          style="height: 100%; overflow: auto"
          class="custom-scroll"
        >
          <el-table :data="Data2[index]">
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
      </el-col>
      <el-col v-for="(param, index) in CraneStatus" :key="index" :span="5">
        <el-card
          shadow="always"
          style="height: 100%; overflow: auto"
          class="custom-scroll"
        >
          <el-table :data="Data[index]">
            <el-table-column
              align="left"
              :label="Object.keys(param)[0]"
              prop="name"
              width="160"
            />
            <el-table-column label="数据" width="130">
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
                  <el-input
                    v-model="scope.row.data"
                    class="centered-input"
                    style="text-align: center"
                    size="small"
                  />
                </template>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row> -->

    <!-- <el-row :gutter="20" style="height: 40%">
      <el-col v-for="(param, index) in Data1" :key="index" :span="8">
        <el-card shadow="always">
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
    </el-row> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { waitForDebugger } from "inspector";

const props = defineProps({
  ElectricLimitStatas: Array,
  CraneStatus: Array,
  DataList: Array
});
let Data = ref([]);
let Data1 = ref([]);
let Data2 = ref([]);
let intervalId;
const GetCraneStatus = async () => {
  try {
    const responses = await Promise.all(
      props.CraneStatus.map(url => axios.get(Object.values(url)[0]))
    );
    Data.value = responses.map(response => response.data);
    console.log(Data.value);
  } catch (error) {
    console.error("请求失败:", error);
    return null;
  }
};
const GetElectricLimit = async () => {
  try {
    const responses = await Promise.all(
      props.ElectricLimitStatas.map(url => axios.get(Object.values(url)[0]))
    );
    Data2.value = responses.map(response => response.data);
    console.log(Data.value);
  } catch (error) {
    console.error("请求失败:", error);
    return null;
  }
};

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
    Data1.value = responses.map(response => response.data);
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
    Data1.value[1] = updatedObject;
    Data1.value[2] = updatedObject1;
  } catch (error) {
    console.error("请求失败:", error);
    return null;
  }
};
onMounted(() => {
  GetCraneStatus();
  GetDataList();
  GetElectricLimit();
  intervalId = setInterval(async () => {
    try {
      await GetCraneStatus();
      await GetDataList();
      await GetElectricLimit();
    } catch (error) {
      console.error("请求失败:", error);
    }
  }, 1000);
});
onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.el-card {
  margin: 0 auto;
}
.el-table-column {
  margin-bottom: 0.5rem;
}
.el-input {
  width: 70%;
}
.el-table__row {
  margin-bottom: 10px; /* Adjust the margin value as needed */
}
.centered-input {
  text-align: center;
}
</style>
