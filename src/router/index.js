import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import PacientesView from '../views/PacientesView.vue'
import AgendaView from '../views/AgendaView.vue'
import AgendarView from '../views/AgendarView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path:'/',
      component: HomeView
    },
    {
      path:'/Login',
      component: LoginView
    },
    {
      path:'/pacientes',
      component: PacientesView
    },
    {
      path:'/agenda',
      component: AgendaView
    },
    {
      path:'/agendar',
      component: AgendarView
    }
  ]
})

export default router