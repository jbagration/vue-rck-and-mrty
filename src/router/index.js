import { createRouter, createWebHistory } from "vue-router";
import CardList from "../views/CardList.vue";
import EventLayout from "../views/event/EventLayout.vue";
import EventDetails from "../views/event/EventDetails.vue";
import EventLocation from "../views/event/EventLocation.vue";
import NotFound from "../views/NotFound.vue";
import NProgress from "nprogress";

const routes = [
  {
    path: "/",
    name: "CardList",
    component: CardList
  },
  {
    path: "/Character/:id",
    component: EventLayout,
    props: true,
    children: [
      {
        path: "",
        name: "EventDetails",
        component: EventDetails,
        props: true
      },
      {
        path: "Location",
        name: "EventLocation",
        component: EventLocation,
        props: true
      }
    ]
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFound,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

export default router;
