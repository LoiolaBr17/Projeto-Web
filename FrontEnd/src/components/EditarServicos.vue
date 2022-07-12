<template>
    <main>
        <h3>Editar Serviços Disponíveis</h3>
        <button @click="AddServico()">Adicionar Serviço</button>
        <div id="servico-table">
        
            <div>
                <div id="servico-table-heading">
                    <div class="order-id">#:</div>
                    <div>Nome:</div>
                    <div>Serviços:</div>
                    <div>valor:</div>
                </div>
            </div>
            <div id="servico-table-rows">
                <div class="servico-table-row" v-for="servico in this.servicos" :key="servico.id">
                    <div class="order-number"> {{servico.id}} </div>
                    <div>{{servico.attributes.Nome}}</div>
                    <div>{{servico.attributes.Servicos}}</div>
                    <div>{{servico.attributes.Valor}}</div>
                    <div><button class="btn" @click="DelServico(servico.id)">X</button></div>
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
    name: 'EditarServicos',
    data(){

        const store = usuarioStore()

        const getToken = computed(() => store.getToken)

        const servicos = null

        return {
            getToken,
            servicos
        }
    },
    async mounted() {
        this.getServicos();
    },
    methods: {
        async getServicos(){
            const token = this.getToken
            const response = await axios.get('http://localhost:1337/api/pacotes',{
                headers: {Authorization: `Bearer ${token}`}
            })
            
            this.servicos = response.data.data
        },

        async DelServico(id){
            const token = this.getToken

            const response3 = await axios.delete(`http://localhost:1337/api/pacotes/${id}`,{
                headers: {Authorization: `Bearer ${token}`}
            })

            const response = await axios.get('http://localhost:1337/api/reserva-pets',{
                headers: {Authorization: `Bearer ${token}`},
                params: {
                    populate: "*",
                },
            })
            
            let teste = response
            let ids = []


            for(let i=0; i<teste.data.data.length; i++){
                if(teste.data.data[i].attributes.pacote.data === null){
                   if(teste.data.data[i].attributes.Status === "Marcada" ){
                        if(!ids.includes(teste.data.data[i])){
                            ids.push(teste.data.data[i].id)
                        }
                   }else if(teste.data.data[i].attributes.Status === "Solicitada"){
                        if(!ids.includes(teste.data.data[i])){
                            ids.push(teste.data.data[i].id)
                        }
                   }
                }
            }

            const envio = {
                data: {
                    Status: "Cancelada"
                }
            }
            
            for(let x =0; x<ids.length; x++){
                let idAtual = ids[x]
                const response2 = await axios.put(`http://localhost:1337/api/reserva-pets/${idAtual}`,envio,{
                    headers: {Authorization: `Bearer ${token}`}
                })

            }
          
            this.getServicos()
            

        },

        AddServico(){
            router.push('/adicionarservico')
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

    .btn {
        padding: 7px;
    }
</style>