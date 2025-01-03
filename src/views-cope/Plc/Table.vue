<script lang="ts" setup>
import { defineProps, onMounted, ref, onUnmounted } from "vue";
import axios from "axios";

const props = defineProps({
  Urls: String,
  Title: {
    type: String,
    default: "结果"
  }
});

let Data = ref([]);
let intervalId;
onMounted(() => {
  intervalId = setInterval(async () => {
    const responses = await axios.get(props.Urls);
    console.log(props.Urls);
    Data.value = responses.data;
    console.log(Data.value);
  }, 1000);
});
onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div>
    <!-- <div v-for="(item, index) in Data" :key="index"> -->
    <el-table :data="Data" style="height: 80vh">
      <el-table-column prop="name" label="变量名称" width="500" />
      <el-table-column prop="type" label="数据类型" width="300" />
      <el-table-column prop="address" label="数据地址" />
      <el-table-column :label="Title">
        <template #default="scope">
          <template
            v-if="scope.row.data === 'False' || scope.row.data === 'True'"
          >
            <el-tag
              :type="scope.row.data === 'False' ? 'success' : 'danger'"
              effect="dark"
              round
              class="custom-round-tag m-2"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.data }}</span>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- </div> -->
</template>

<style scoped>
.el-table {
  font-size: 1.1rem;
  font-weight: bold;
  width: 100%;
  height: auto;
  /* margin-bottom: 5rem; */
}
.custom-round-tag {
  width: 1.4rem;
  height: 1.4rem;
  line-height: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>
