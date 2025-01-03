<script setup lang="ts">
import Motion from "./utils/motion";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { loginRules } from "./utils/rule";
import { useNav } from "@/layout/hooks/useNav";
import type { FormInstance } from "element-plus";
import { useLayout } from "@/layout/hooks/useLayout";
import { useUserStoreHook } from "@/store/modules/user";
import { initRouter, getTopMenu } from "@/router/utils";
import { bg, avatar, illustration } from "./utils/static";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { ref, reactive, toRaw, onMounted, onBeforeUnmount } from "vue";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";
import Urls from "@/store/urls";

import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";
import Lock from "@iconify-icons/ri/lock-fill";
import User from "@iconify-icons/ri/user-3-fill";
import axios from "axios";
import { urls } from "@/utils/Url";
import { initializeUrls } from "@/utils/Url";
defineOptions({
  name: "Login"
});
function generateSessionToken() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();

const { initStorage } = useLayout();
initStorage();

const { dataTheme, dataThemeChange } = useDataThemeChange();
dataThemeChange();
const { title } = useNav();

const ruleForm = reactive({
  // username: "admin",
  // password: "admin123"
  operatorname: "cc",
  password: ""
});

const LoginUsers = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      initializeUrls();

      useUserStoreHook().loginByUsername({
        username: ruleForm.operatorname,
        password: ruleForm.password
      });
      // axios.put(Urls.Users.GetAllOperator);
      axios
        .put(urls.Logins.Tokenkeys, ruleForm)
        .then(response => {
          if (response.data) {
            // 将新的认证令牌保存到LocalStorage中
            localStorage.setItem("authToken", response.data);
            //生成一个唯一的会话标识
            const sessionToken = generateSessionToken();
            //存储至sessionStoeage中
            sessionStorage.setItem("sessionToken", sessionToken);
            // 获取后端路由
            return initRouter().then(() => {
              //获取跳转路由
              console.log(getTopMenu(true).path);
              router.push(getTopMenu(true).path).then(() => {
                message("登录成功", { type: "success" });
                console.log("登录成功" + sessionToken);
              });
            });
          } else {
            alert("登录错误：" + response.data.message);
          }
        })
        .catch(error => {
          console.error("登录请求失败:", error);
          message("登录请求失败", { type: "error" });
        })
        .finally(() => (loading.value = false));
    } else {
      return fields;
    }
  });
};
// const onLogin = async (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   await formEl.validate((valid, fields) => {
//     if (valid) {
//       loading.value = true;

//       axios.put('https://localhost:1234/LoginOperator/LoginAndGetToken', {
//         username: ruleForm.username,
//         password: ruleForm.password,
//       })
//         .then((response) => {
//           if (response.data) {
//             // 获取后端路由
//             return initRouter().then(() => {
//               // console.log(response.data);
//               localStorage.setItem('authToken', response.data);
//               //生成一个唯一的会话标识
//               const sessionToken = generateSessionToken();
//               //存储至sessionStoeage中
//               sessionStorage.setItem('sessionToken', sessionToken);
//               router.push(getTopMenu(true).path).then(() => {
//                 message('登录成功', { type: 'success' });
//               });
//             });
//           } else {
//             message('登录失败', { type: 'error' });
//           }
//         })
//         .catch((error) => {
//           console.error('登录请求失败:', error);
//           message('登录请求失败', { type: 'error' });
//         })

//         .finally(() => (loading.value = false));
//     } else {
//       return fields;
//     }
//   });

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (code === "Enter") {
    LoginUsers(ruleFormRef.value);
  }
}

onMounted(async () => {
  await initializeUrls();
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});
</script>

<template>
  <div class="select-none">
    <img :src="bg" class="wave" />
    <div class="flex-c absolute right-5 top-3">
      <!-- 主题 -->
      <el-switch
        v-model="dataTheme"
        inline-prompt
        :active-icon="dayIcon"
        :inactive-icon="darkIcon"
        @change="dataThemeChange"
      />
    </div>
    <div class="login-container">
      <div class="img">
        <component :is="toRaw(illustration)" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <avatar class="avatar" />
          <Motion>
            <h2 class="outline-none">{{ title }}</h2>
          </Motion>

          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="loginRules"
            size="large"
          >
            <Motion :delay="100">
              <el-form-item prop="username">
                <el-input
                  v-model="ruleForm.operatorname"
                  clearable
                  placeholder="账号"
                  :prefix-icon="useRenderIcon(User)"
                />
              </el-form-item>
            </Motion>

            <Motion :delay="150">
              <el-form-item prop="password">
                <el-input
                  v-model="ruleForm.password"
                  clearable
                  show-password
                  placeholder="密码"
                  :prefix-icon="useRenderIcon(Lock)"
                />
              </el-form-item>
            </Motion>

            <Motion :delay="250">
              <el-button
                class="w-full mt-4"
                size="default"
                type="primary"
                :loading="loading"
                @click="LoginUsers(ruleFormRef)"
              >
                登录
              </el-button>
            </Motion>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 导入样式组件样式 */
@import url("@/style/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
