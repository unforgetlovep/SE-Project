import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/home-page.vue'
import Register from '@/views/register-page.vue'
import Login from '@/views/login-page.vue'
import User from '@/views/user-page.vue'
import Course from '@/views/course-page.vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/register',
    name:'register',
    component:Register
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/user',
    name:'user',
    component:User,
    meta: { requiresAuth: true }
  },
  {
    path:'/course',
    name:'course',
    component:Course,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!userStore.isLoggedIn) {
      ElMessage({
        message:"请先登录！",
        type:"warning"
      });
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
