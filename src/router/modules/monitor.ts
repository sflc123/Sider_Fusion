export default {
  path: "/monitor",
  redirect: "/monitor/Index",
  meta: {
    icon: "ri:4k-fill",
    title: "monitor",
    rank: 8
  },
  children: [
    {
      path: "/monitor/Index",
      name: "monitor",
      component: () => import("@/views/monitor/Index.vue"),
      meta: {
        title: "监控界面"
      }
    }
  ]
} satisfies RouteConfigsTable;
