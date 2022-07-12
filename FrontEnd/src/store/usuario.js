import {defineStore} from 'pinia'
import {api} from '../baseConfig'
import router from '../router'
import axios from 'axios'

export const usuarioStore = defineStore('usuario', {
    state: () => {
        return {
            user:[],
            Logado: false,
            isAdmin: false,
            isAuthenticated: false
        }
    },

    getters: {
        getToken: (state) => {return state.user.jwt},
        getEmail: (state) => {return state.user.email},
        getUserName: (state) => {return state.user.username},     
    },

    actions: {
        async logarUsuario(email,senha){
            try {
              const {data} = await api.post('/auth/local', {
                identifier: email,
                password: senha
              })

              const {user, jwt} = data

              this.user = {
                id: user.id,
                username: user.username,
                email: user.email,
                jwt: jwt,
                role: ""
              }

              this.getRole()

            }catch(error){
                console.log(error)
            }
        },

        async getRole(){
            const token = this.user.jwt

            try { 
                const dados = await axios.get("http://localhost:1337/api/users/me", {
                    headers: {Authorization: `Bearer ${token}`},
                    params: {
                    populate: "role",
                    },
                });

                this.user.role = dados.data.role.name
                this.Logado = true

                if(this.user.role === 'Adm'){
                    this.isAdmin = true
                    router.push('/administrador')
                }else if(this.user.role === 'Authenticated'){
                    this.isAuthenticated = true
                    router.push('/cliente')
                }else {
                    router.push('/')
                }
                
            } catch (error) {
                alert("erro")
            }
                
            
            
            
        },

        async registrarUsuario(e,s){
            const nome = e.split("@")[0]
            const email = e
            const senha = s

            const form = {
                username: nome,
                email: email,
                password: senha
            }

            try {

                const response = await axios.post('http://localhost:1337/api/users',form)
                router.push('/')
                console.log(response)

            }catch(erro){
                console.log(erro)
            }
        },

        async logout(){
            this.user = []
            this.Logado = false
            this.isAdmin = false
            this.isAuthenticated = false
            router.push('/')
        }

    }
})