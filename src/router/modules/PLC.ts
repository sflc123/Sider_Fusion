// export default {
//   path: "/Plc",
//   redirect: "/Plc/PLC",
//   meta: {
//     icon: "ri:information-line",
//     title: "PLC",
//     rank: 9
//   },
//   children: [
//     {
//       path: "/Plc/PLC",
//       name: "PLC",
//       component: () => import("@/views/Plc/PLC.vue"),
//       meta: {
//         title: "PLC"
//       }
//     }
//   ]
// } satisfies RouteConfigsTable;
// 最简代码，也就是这些字段必须有
export default {
  // 路由路径
  path: "/Plc",
  // 重定向路径
  redirect: "/Plc/Index",
  // 路由元信息
  meta: {
    // 路由图标
    icon: "ri:aed-fill",
    //菜单名称
    title: "Index",
    // 菜单排序
    rank: 10
  },
  // 子路由配置项
  children: [
    {
      // 路由路径
      path: "/Plc/Index",
      // 路由名称（必须唯一并且和当前路由component字段对应的页面里用defineOptions包起来的name保持一致）
      name: "Index",
      // 路由组件（按需加载需要展示的页面）
      component: () => import("@/views/Plc/Index.vue"),
      // 路由元信息
      meta: {
        title: "测试页面"
      }
    }
    // 添加多个子页面
    // {
    //   path: "/fighting/effort",
    //   name: "Effort",
    //   component: () => import("@/views/fighting/effort.vue"),
    //   meta: {
    //     title: "努力"
    //   }
    // }
  ]
};
