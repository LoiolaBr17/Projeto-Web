import { computed, createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
import {usuarioStore} from '../src/store/usuario'


router.beforeEach((to,from,next) => {
   
    const store = usuarioStore()
    
    if (to.name !== 'Login' && !store.Logado) next({ name: 'Login' })
    else if(to.name === 'cliente' && !store.isAuthenticated) next({ name: 'Login' })
    else if(to.name === 'administrador' && !store.isAdmin) next({ name: 'Login' })
    else if(to.name === 'adicionarservico' && !store.isAdmin) next({ name: 'Login' })
    else if(to.name === 'adicionarreserva' && !store.isAuthenticated) next({ name: 'Login' })
    else next()
    
    

})

createApp(App).use(router).use(createPinia()).mount('#app')
