<template>
    <main>
        <h3>Minhas Reservas</h3>
        <button @click="adicionarReserva()">Adicionar Reserva</button>
        <div id="servico-table">
            <div>
                <div id="servico-table-heading">
                    <div class="order-id">Pet:</div>
                    <div>Data:</div>
                    <div>Pacote:</div>
                    <div>Status:</div>
                </div>
                <div id="servico-table-rows">
                    <div class="servico-table-row" v-for="reserva in this.reservas" :key="reserva.id">
                        <div class="order-number">{{reserva.attributes.Pet}}</div>
                        <div>{{reserva.attributes.Horario}}</div>
                        <div>{{reserva.attributes.pacote.data.attributes.Nome}}</div>
                        <div>{{reserva.attributes.Status}}</div>
                        <button class="btn" @click="apagarReserva(reserva.id)">X</button>
                    </div>
                    
                </div>
            </div>
        </div>
        
        
    </main>
</template>

<script>

import { computed } from '@vue/runtime-core'
import {usuarioStore} from '../store/usuario'
import axios from 'axios'
import router from '../router'

export default {
    name: 'MinhasReservas',
    data(){
        const store = usuarioStore()

        const getToken = computed(() => store.getToken)
        const getEmail = computed(() => store.getEmail)

        return {
            getToken,
            getEmail,
            reservas: []
        }
    },
    async mounted() {
        this.getReservas()
    },
    methods: {
       async getReservas(){
            const token = this.getToken
            const email = this.getEmail
            const url = `http://localhost:1337/api/reserva-pets?filters[EmailDono][$eq]=${email}`

            const response = await axios.get(url,{
                headers: {Authorization: `Bearer ${token}`},
                params: {
                    populate: "*",
                },
            })
            
            
            this.reservas = response.data.data

        },
        async updatedStatusReserva(e,id){

            const token = this.getToken

            const dados = {
                data: {
                    Status: e.currentTarget.value
                }
            }

            try {
                
                const request = axios.put(`http://localhost:1337/api/reserva-pets/${id}`,dados,{
                    headers: {Authorization: `Bearer ${token}`},
                })

            }catch(error){
                console.log(error)
            }
        },
        async apagarReserva(id){
            
            const token = this.getToken

            try {
                const request = axios.delete(`http://localhost:1337/api/reserva-pets/${id}`,{
                    headers: {Authorization: `Bearer ${token}`},
                })

                this.getReservas()
            }catch(error){
                console.log(error)
            }
        },
        adicionarReserva(){
            router.push('/adicionarreserva')
        }
    },
    
}
</script>

<style scoped>
    #servico-table {
        max-width: 1200px;
        margin: 0 auto;
    }

    #servico-table-heading,
    #servico-table-rows,
    .servico-table-row {
        display: flex;
        flex-wrap: wrap;
    }

    #servico-table-heading {
        font-weight: bold;
        padding: 12px;
        border-bottom: 3px solid #333;
    }

    #servico-table-heading div,
    .servico-table-row div {
        width: 30%;
    }

    .servico-table-row {
        width: 100%;
        padding: 12px;
        border-bottom: 1px solid #ccc;
    }

    #servico-table-heading .order-id,
    .servico-table-row .order-number {
        width: 5%;
    }

    .btn {
        padding: 10px;
        border-radius: 10px;
        cursor: pointer;
    }
</style>