import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "Posts" */ '@/views/Posts.vue'),
    children: [
      {
        path: '',
        name: 'Posts',
        component: () => import(/* webpackChunkName: "PostsList" */ '@/views/PostsList.vue'),
      },
      {
        path: 'edit/:id',
        name: 'EditPost',
        component: () => import(/* webpackChunkName: "PostsEditing" */ '@/views/PostsEditing.vue'),
      },
      {
        path: 'create',
        name: 'CreatePost',
        component: () => import(/* webpackChunkName: "PostsCreating" */ '@/views/PostsCreating.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue'),
  },
  {
    path: '*',
    redirect: { name: 'Posts' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
