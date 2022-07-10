import { createRouter, createWebHistory } from 'vue-router'
import ClienteView from '../views/Cliente.vue'
import AdministradorView from '../views/Administrador.vue'
import LoginView from '../views/Login.vue'
import FormularioServico from '../components/FormularioServico.vue'
import FormularioReserva from '../components/FormularioReserva.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cliente',
    name: 'Usuario',
    component: ClienteView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/administrador',
    name: 'Administrador',
    component: AdministradorView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/adicionarservico',
    name: 'AdicionarServico',
    component: FormularioServico,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/adicionarreserva',
    name: 'AdicionarReserva',
    component: FormularioReserva,
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
