<template>
<main>
    <button @click="VoltarEditarServico()">Voltar</button>
    
    <h2>Preencha os campos para adicionar o Serviço:</h2>

    <form>
        <input type="text" placeholder="Digite o nome do serviço" v-model="attributes.Nome" id="nome">
        <input type="text" placeholder="Digite os serviços ofertados" v-model="attributes.Servicos" id="servicos">
        <input type="number" placeholder="Digite o preço do serviço" v-model="attributes.Valor" id="preco">
        <input type="submit" value="Cadastrar" @click="cadastrarServico($event)">
    </form>
    
</main>

</template>

<script>
import { computed } from '@vue/runtime-core'

import {usuarioStore} from '../store/usuario'
import axios from 'axios'
import router from '../router'

export default {
    name: 'FormularioServico',
    data(){

        const store = usuarioStore()

        const getToken = computed(() => store.getToken)

        return {
            attributes: {
                Nome: "",
                Servicos: "",
                Valor: null,
            },
            getToken
        }
    },
    methods: {
        VoltarEditarServico(){
            router.push('/administrador')
        },
        cadastrarServico:async function(e){
            e.preventDefault()

            const nome = document.getElementById("nome").value
            const servicos = document.getElementById("servicos").value
            const valor = document.getElementById("preco").value

            if(nome === "" || servicos === "" || valor === null || valor === "" ){
                alert("Preencha Todos os Campos !")
                return
            }

            const dados = {
                data:{
                    Nome: nome,
                    Servicos: servicos,
                    Valor: Number(valor)
                }
            }

            console.log(dados)

            try {
                const response = await axios.post('http://localhost:1337/api/pacotes',dados)
                router.push('/administrador')
                
            }catch(error){
                console.log(error)
            }

        }
    },
    
}
</script>

<style scoped>
h2 {
    margin: 0;
}

input {
    margin: 0 auto;
    border: 1px solid #000;
}
</style>