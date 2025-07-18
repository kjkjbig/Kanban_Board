// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import login from '../Firstpage/login.vue'
import Kanban from '../kanban.vue'
import register from '../Firstpage/register.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/Kanban',
    name: 'Kanban',
    component: Kanban,
    meta: { requiresAuth: true }  
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/') 
  } else {
    next() 
  }
})

export default router
