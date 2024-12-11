import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/home-page.vue'
import Register from '@/views/register-page.vue'
import Login from '@/views/login-page.vue'
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
