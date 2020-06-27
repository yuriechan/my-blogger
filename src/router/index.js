import Vue from "vue";
import VueRouter from "vue-router";
import Gallery from "../components/Gallery.vue";
import CreateBlog from "../views/CreateBlog.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Gallery",
    component: Gallery
  },
  {
    path: "/CreateBlog",
    name: "CreateBlog",
    component: CreateBlog
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
