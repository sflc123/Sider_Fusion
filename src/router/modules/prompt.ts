export default {
  path: "/Prompt",
  redirect: "/Prompt/index",
  meta: {
    icon: "material-symbols:book-2-outline-rounded",
    // showLink: false,
    title: "错误页面",
    rank: 9
  },
  children: [
    {
      path: "/Prompt/index",
      name: "prompt",
      component: () => import("@/views/Prompt/index.vue"),
      meta: {
        title: "日志数据"
      }
    }
  ]
} satisfies RouteConfigsTable;
