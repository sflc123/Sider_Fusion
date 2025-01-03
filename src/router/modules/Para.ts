export default {
  path: "/Para",
  redirect: "/Para/para",
  meta: {
    icon: "material-symbols:settings",
    title: "Para",
    rank: 9
  },
  children: [
    {
      path: "/Para/para",
      name: "Para",
      component: () => import("@/views/Para/para.vue"),
      meta: {
        title: "系统设置"
      }
    }
  ]
} satisfies RouteConfigsTable;
