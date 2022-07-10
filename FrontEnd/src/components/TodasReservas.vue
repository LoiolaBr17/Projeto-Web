<template>
    <main>
        <h3>Todas as Reservas</h3>

        <div id="servico-table">
            <div>
                <div id="servico-table-heading">
                    <div class="order-id">Pet:</div>
                    <div>Data:</div>
                    <div>Pacote:</div>
                    <div>Dono:</div>
                    <div>Status:</div>
                </div>

                <div id="servico-table-rows">
                <div class="servico-table-row" v-for="reserva in this.reservas" :key="reserva.id">
                    <div class="order-number"> {{reserva.attributes.Pet}} </div>
                    <div>{{reserva.attributes.Horario}}</div>
                    <div>{{reserva.attributes.pacote.data.attributes.Nome}}</div>
                    <div>{{reserva.attributes.EmailDono}}</div>
                    <div>
                        <select id="Status" name="status" class="status" @change="updatedStatusReserva($event, reserva.id)">
                            <option :value="reserva.attributes.Status" selected>{{reserva.attributes.Status}}</option>
                            <option value="Solicitada" v-if="reserva.attributes.Status!='Solicitada'">Solicitada</option>
                            <option value="Marcada" v-if="reserva.attributes.Status!='Marcada'">Marcada</option>
                            <option value="Cancelada" v-if="reserva.attributes.Status!='Cancelada'">Cancelada</option>
                        </select>
                    </div>
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

export default {
    name: 'TodasReservas',
    data(){
        const store = usuarioStore()

        const getToken = computed(() => store.getToken)

        return {
            getToken,
            reservas: []
        }
    },
    async mounted() {
        this.getReservas()
    },
    methods: {
       async getReservas(){
            const token = this.getToken
            const response = await axios.get('http://localhost:1337/api/reserva-pets',{
                headers: {Authorization: `Bearer ${token}`},
                params: {
                    populate: "*",
                },
            })
            
            
            this.reservas = response.data.data

        },
        updatedStatusReserva(e,id){

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
        width: 20%;
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
</style>