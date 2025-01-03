export default {
  path: "/Users",
  redirect: "/Users/user",
  meta: {
    icon: "material-symbols:account-box-sharp",
    title: "用户管理",
    rank: 9
  },
  children: [
    {
      path: "/Users/user",
      name: "user",
      component: () => import("@/views/Users/user.vue"),
      meta: {
        title: "用户管理"
      }
    }
  ]
} satisfies RouteConfigsTable;
