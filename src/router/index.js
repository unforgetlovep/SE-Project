import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/home-page.vue'
import Register from '@/views/register-page.vue'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
