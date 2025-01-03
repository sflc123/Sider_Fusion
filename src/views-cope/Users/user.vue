<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import axios from "axios";
import { urls } from "@/utils/Url";
import { ElMessage } from "element-plus";
import { md5 } from "js-md5";
import Urls from "@/store/urls";

const dialogFormVisible = ref(false);
const formLabelWidth = "140px";

let sizeForm = reactive({
  number: "",
  name: "",
  password: "",
  sex: "",
  shift: "",
  role: ""
});
interface User {
  number: string;
  name: string;
  sex: string;
  shift: string;
  role: string;
  password: string;
}
let userlist = ref<User[]>([]);
function resetForm() {
  sizeForm.number = "";
  sizeForm.name = "";
  sizeForm.password = "";
  sizeForm.sex = "";
  sizeForm.shift = "";
  sizeForm.role = "";
}
//添加新增用户
function onSubmit() {
  sizeForm.password = md5(sizeForm.password).toString();
  parseInt(sizeForm.number);
  // sizeForm.role = "操作员";
  // sizeForm.shift = "夜班";
  console.log(sizeForm);
  axios
    .put(Urls.Users.PutAddOperator, sizeForm)
    .then(res => {
      if (res.data.status) ElMessage.success(res.data.message);
      else ElMessage.error(res.data.message);
      fetchUsers();
      resetForm();
    })
    .catch(error => {
      if (error.response) {
        const status = error.response.status;
        console.log(status);
        ElMessage.error(`请求错误 ${status}`);
        if (status === 400) {
          ElMessage.error("请求参数错误！！！");
        } else if (status === 403) {
          ElMessage.error("没有权限访问！！！");
        } else if (status === 401) {
          ElMessage.error("密钥失效，请重新登录验证！！！");
        } else if (status === 401) {
          ElMessage.error("密钥失效，请重新登录验证！！！");
        } else {
          ElMessage.error("请求错误！！！");
        }
      } else {
        console.error(`ERROR: ${error}`);
      }
    });
  const token = localStorage.getItem("authToken");
  console.log(token);
}

// 封装获取用户信息的函数
const fetchUsers = async () => {
  axios
    .get(Urls.Users.GetAllOperator)
    .then(res => {
      res.data.forEach(item => {});
      userlist.value = res.data as User[];
      console.log(userlist.value);
    })
    .catch(error => {
      console.error(error);
    });
};

// 封装根据ID获取用户信息的函数
const fetchGetByID = (id: string) => {
  axios
    .get(urls.users.getbyid + id.toString())
    .then(res => {
      console.log(res);
      sizeForm = res.data;
    })
    .catch(error => {
      console.error(error);
    });
};
//组件挂载自动查询所有用户信息
onMounted(() => {
  fetchUsers();
});

// // 搜索框内容
const search = ref("");
// 过滤后的表格数据
const filterTableData = computed(() =>
  tableData.value.filter(
    data =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
// 编辑按钮
const handleEdit = (index: number, row: User) => {
  Object.assign(sizeForm, row);
};
// 发送更新请求
const updateRow = (index?: number, row?: User) => {
  row.password = md5(row.password).toString();
  row.number = parseInt(row.number).toString();
  console.log(row);
  axios
    .put(Urls.Users.PutUpdateOperator, row)
    .then(res => {
      ElMessage.success(res.data);
      fetchUsers();
      resetForm();
    })
    .catch(error => {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          ElMessage.success("请求参数错误!!");
        } else if (status === 403) {
          ElMessage.success("没有权限访问！！");
        } else {
          ElMessage.success("密钥失效，请重新登录验证！！");
        }
      } else {
        console.error(`ERROR: ${error}`);
      }
    });
};
// 删除按钮
const handleDelete = (index: number, row: User) => {
  axios
    .delete(urls.users.deleteuser + row.number.toString())
    .then(res => {
      ElMessage.success(res.data);
      fetchUsers();
      console.log(res);
    })
    .catch(error => {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          alert("请求参数错误");
        } else if (status === 403) {
          alert("没有权限访问");
        } else {
          ElMessage.error("密钥失效，请重新登录验证！！");
        }
      } else {
        console.error(`ERROR: ${error}`);
      }
    });
};
// 表格数据
const tableData = userlist;
</script>

<template>
  <el-tabs
    type="border-card"
    class="items-center justify-center"
    style="height: 96%; margin: 1rem"
    @tab-click="fetchUsers()"
  >
    <el-tab-pane label="添加用户">
      <br />
      <el-row>
        <el-col :offset="6" :span="1" />
        <el-col :span="8">
          <el-card shadow="always">
            <el-form
              ref="form"
              style="
                width: 100%;
                align-items: center;
                justify-content: center;
                margin: auto;
              "
              :model="sizeForm"
              label-width="auto"
              label-position="top"
              size="large"
            >
              <el-form-item label="ID">
                <el-input
                  v-model="sizeForm.number"
                  placeholder="请输入用户ID"
                />
              </el-form-item>
              <el-form-item label="姓名">
                <el-input
                  v-model="sizeForm.name"
                  placeholder="请输入用户姓名"
                />
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                  v-model="sizeForm.password"
                  type="password"
                  placeholder="请输入用户密码"
                />
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="sizeForm.sex" placeholder="请选择用户性别">
                  <el-option label="男" value="男" />
                  <el-option label="女" value="女" />
                </el-select>
              </el-form-item>
              <el-form-item label="班次">
                <el-radio-group v-model="sizeForm.shift">
                  <el-radio value="早班">早班</el-radio>
                  <el-radio value="中班">中班</el-radio>
                  <el-radio value="夜班">夜班</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="权限">
                <el-radio-group v-model="sizeForm.role">
                  <el-radio value="管理员">管理员</el-radio>
                  <el-radio value="操作员">操作员</el-radio>
                  <el-radio value="工人">工人</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="3">
          <div
            style="
              margin-left: 1rem;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
            "
          >
            <el-row style="margin-top: 10%">
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                title="是否创建新用户?"
                @confirm="onSubmit()"
              >
                <template #reference>
                  <el-button plain style="width: 70%" type="primary"
                    >创建</el-button
                  >
                </template>
              </el-popconfirm>
            </el-row>
            <el-row style="margin-top: 10%">
              <el-button
                plain
                type="info"
                style="width: 70%"
                @click="resetForm()"
                >取消</el-button
              >
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-tab-pane>

    <el-tab-pane label="用户查询"
      ><el-table :data="filterTableData" height="auto" style="width: 100%">
        <el-table-column label="ID" prop="number" />
        <el-table-column label="姓名" prop="name" />
        <!-- <el-table-column label="密码" prop="password" /> -->
        <el-table-column label="性别" prop="sex" />
        <el-table-column label="班次" prop="shift" />
        <el-table-column label="权限" prop="role" />>
        <el-table-column width="250">
          <template #header>
            <el-input
              v-model="search"
              size="large"
              placeholder="请输入用户姓名进行搜索"
              style="width: auto"
            />
          </template>
          <template #default="scope">
            <el-button
              style="width: 100%"
              size="default"
              type="primary"
              plain
              @click="
                handleEdit(scope.$index, scope.row), (dialogFormVisible = true)
              "
            >
              修改信息
            </el-button>
            <!-- <el-popconfirm
              ref="popconfirm"
              title="确认是否删除该条用户数据？"
              @confirm="handleDelete(scope.$index, scope.row)"
            >
              <template #reference>
                <el-button plain size="default" type="danger"
                  >删除用户
                </el-button>
              </template>
            </el-popconfirm> -->
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        v-model="dialogFormVisible"
        :show-close="false"
        title="修改用户信息"
        width="600"
      >
        <el-form :model="sizeForm">
          <el-form-item label="用户姓名" :label-width="formLabelWidth">
            <el-input v-model="sizeForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="用户密码" :label-width="formLabelWidth">
            <el-input v-model="sizeForm.password" />
          </el-form-item>
          <el-form-item label="用户性别" :label-width="formLabelWidth">
            <el-select v-model="sizeForm.sex" placeholder="Please select a sex">
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
          <el-form-item label="用户班次" :label-width="formLabelWidth">
            <el-radio-group v-model="sizeForm.shift">
              <el-radio value="早班">早班</el-radio>
              <el-radio value="中班">中班</el-radio>
              <el-radio value="晚班">晚班</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用户权限" :label-width="formLabelWidth">
            <el-radio-group v-model="sizeForm.role">
              <el-radio value="管理员">管理员</el-radio>
              <el-radio value="工人">工人</el-radio>
              <el-radio value="操作员">操作员</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="(dialogFormVisible = false), resetForm()"
              >取消</el-button
            >
            <el-button
              type="primary"
              @click="
                updateRow(null, sizeForm);
                dialogFormVisible = false;
              "
            >
              确认修改
            </el-button>
          </div>
        </template>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>

<style>
.el-radio-group {
  margin-right: 12px;
}
.el-button {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
