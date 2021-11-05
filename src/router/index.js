import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "defaultLayout" */ "../layouts/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/Home.vue"),
      },
      {
        path: "detail/:id",
        name: "detail",
        component: () =>
          import(/* webpackChunkName: "detail" */ "../views/Detail.vue"),
        props: (route) => {
          const { id, allActivities } = route.params;

          return isNaN( Number(id)) ? { id: 1, allActivities } : { id: Number(id), allActivities };
        }
      }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
