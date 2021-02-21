import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faChevronRight,
  faPlus,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle, faCheckCircle } from "@fortawesome/free-regular-svg-icons";

import App from "./App.vue";
import Calendar from "./components/Calendar.vue";
import Day from "./components/Day.vue";

import "./assets/style.css";

library.add(
  faChevronLeft,
  faChevronRight,
  faPlus,
  faTimes,
  faTrash,
  faCircle,
  faCheckCircle
);

const history = createWebHistory("/calendar-app/");
const router = createRouter({
  history,
  routes: [
    {
      path: "/",
      component: Calendar,
    },
    {
      path: "/:year/:month/:date",
      component: Day,
    },
  ],
});

createApp(App).use(router).mount("#app");
