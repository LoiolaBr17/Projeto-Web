<template>
    <main>
        <h3>Bem vindo ao nosso PetShop</h3>
        <h3>Serviços Disponíveis</h3>

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
    name: 'Servicos',
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
</style>