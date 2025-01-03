<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    info: "设备状态"
  },
  defaulcolor: {
    type: String,
    info: "rgb(108, 24, 154)"
  },
  status: {
    type: String,
    info: "- -"
  },
  type: {
    type: String,
    info: "- -"
  },
  Largevehicle: {
    type: Object
  },
  Smallvehicle: {
    type: Object
  },
  Bucket: {
    type: Object
  }
});
</script>
<template>
  <div
    class="bg-[url('..\views\welcome\ChildObject\picture\7.png')] bg-cover demo-progress"
  >
    <el-row justify="center">
      <el-col>
        <el-text style="font-size: 2rem" type="success">
          {{ props.title }}
        </el-text>
      </el-col>
    </el-row>
    <el-row class="w-full" justify="end">
      <el-col :span="4"><el-text>就绪</el-text></el-col>
      <el-col :span="4"><el-text>运行</el-text></el-col>
      <el-col :span="4"><el-text>暂停</el-text></el-col>
      <el-col :span="4"><el-text>限位</el-text></el-col>
      <el-col :span="4"><el-text>错误</el-text></el-col>
    </el-row>
    <el-row class="w-full" justify="center">
      <el-col :span="4" class="text-center"><el-text>大车</el-text></el-col>
      <el-col :span="4">
        <el-tag
          :type="props.Largevehicle.ready ? 'success' : 'info'"
          effect="dark"
          round
          class="custom-round-tag m-2"
        />
      </el-col>
      <el-col :span="4">
        <el-tag
          :type="props.Largevehicle.running ? 'success' : 'info'"
          effect="dark"
          round
          class="custom-round-tag m-2"
        />
      </el-col>
      <el-col :span="4">
        <el-tag
          :type="props.Largevehicle.paused ? 'warning' : 'info'"
          effect="dark"
          round
          class="custom-round-tag m-2"
        />
      </el-col>
      <el-col :span="4">
        <el-tag
          :type="props.Largevehicle.limited ? 'danger' : 'info'"
          effect="dark"
          round
          class="custom-round-tag m-2"
        />
      </el-col>
      <el-col :span="4">
        <el-tag
          :type="props.Largevehicle.error ? 'danger' : 'info'"
          effect="dark"
          round
          class="custom-round-tag m-2"
        />
      </el-col>
    </el-row>
    <el-row class="w-full" justify="center">
      <el-col :span="4" class="text-center"><el-text>小车</el-text></el-col>
      <el-col :span="4">
        <el-tag
          :type="props.Smallvehicle.ready ? 'success' : 'info'"
          effect="dark"
          round
          class="custom-round-tag m-2"
        />
      </el-col>
      <el-col :span="4">
        <el-tag
          :type="props.Smallvehicle.running ? 'success' : 'info'"
          effect="dark"
          round
          class="custom-round-tag m-2"
        />
      </el-col>
      <el-col :span="4">
        <el-tag
          :type="props.Smallvehicle.paused ? 'warning' : 'info'"
          effect="dark"
          round
          class="custom-round-tag m-2"
        />
      </el-col>
      <el-col :span="4">
        <el-tag
          :type="props.Smallvehicle.limited ? 'danger' : 'info'"
          effect="dark"
          round
          class="custom-round-tag m-2"
        />
      </el-col>
      <el-col :span="4">
        <el-tag
          :type="props.Smallvehicle.error ? 'danger' : 'info'"
          effect="dark"
          round
          class="custom-round-tag m-2"
        />
      </el-col>
    </el-row>
    <el-row class="w-full" justify="center">
      <el-col :span="4" class="text-center"><el-text> 起升</el-text></el-col>
      <el-col :span="4">
        <el-tag
          :type="props.Bucket.ready ? 'success' : 'info'"
          effect="dark"
          round
          class="custom-round-tag m-2"
        />
      </el-col>
      <el-col :span="4">
        <el-tag
          :type="props.Bucket.running ? 'success' : 'info'"
          effect="dark"
          round
          class="custom-round-tag m-2"
        />
      </el-col>
      <el-col :span="4">
        <el-tag
          :type="props.Bucket.paused ? 'warning' : 'info'"
          effect="dark"
          round
          class="custom-round-tag m-2"
        />
      </el-col>
      <el-col :span="4">
        <el-tag
          :type="props.Bucket.limited ? 'danger' : 'info'"
          effect="dark"
          round
          class="custom-round-tag m-2"
        />
      </el-col>
      <el-col :span="4">
        <el-tag
          :type="props.Bucket.error ? 'danger' : 'info'"
          effect="dark"
          round
          class="custom-round-tag m-2"
        />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.demo-progress {
  display: flex;
  flex-direction: column; /*垂直堆叠子项 */
  align-items: center; /* 水平居中子对象 */
  justify-content: center; /* 如果容器具有定义的高度，则将子对象垂直居中 */
  height: 100%; /* 如果要垂直居中，请设置高度*/
  width: 100%; /* 如果要水平居中，请设置宽度 */
}

.el-row {
  padding-bottom: 1.2rem;
}
.el-col {
  text-align: center;
}
.el-text {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
