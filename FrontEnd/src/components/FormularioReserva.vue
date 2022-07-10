<template>
<main>
    <button @click="voltarReservas()">Voltar</button>
    <h2>Preencha os campos para adicionar uma Reserva:</h2>
    
    <form>
        <label for="">Nome do pet
            <input type="text" placeholder="Digite aqui" id="pet">
        </label>
        <label for="">Dia
            <input type="date"  id="dia">
        </label>
        <br>
        <label for="">Pacote
            <select name="" id="pacote">
                <option :value="pacote.id" v-for="pacote in pacotes" :key="pacote.id">
                    {{pacote.nome}}
                </option>
            </select>
        </label>
        <br>
        <br>
        <input type="submit" value="reservar" @click="cadastrarReserva($event)">
    </form>

</main>

</template>

<script>
import { computed } from '@vue/runtime-core'

import {usuarioStore} from '../store/usuario'
import axios from 'axios'
import router from '../router'

export default {
    name: 'FormularioReserva',
    data(){

        const store = usuarioStore()

        const getToken = computed(() => store.getToken)
        const getEmail = computed(() => store.getEmail)

        return {
            getToken,
            getEmail,
            pacotes: []
        }
    },
    async mounted() {
        this.getPacotes()
    },
    methods: {
        voltarReservas(){
            router.push('/cliente')
        },
        async cadastrarReserva(e){
            e.preventDefault()
        
            const pet = document.getElementById('pet').value
            const dia = document.getElementById('dia').value
            const Pacote = document.getElementById('pacote').value
            const email = this.getEmail

            if(pet == "" || dia == "" || pacote == "" ){
                alert("Informe todos os campos")
                return
            }

            const dados = {
                data: {
                    Pet: pet,
                    Horario: dia,
                    EmailDono: email,
                    Status: "Solicitada",
                    pacote: [Pacote]
                }
            }

            console.log(dados)
            
            try{
                const response = await axios.post('http://localhost:1337/api/reserva-pets',dados)
                router.push('/cliente')
            }catch(error){
                console.log(error)
            }


        },
        async getPacotes(){
            try{
                const response = await axios.get('http://localhost:1337/api/pacotes')
                this.setPacotes(response.data.data)
            }catch(error){
                console.log(error)
            }
        },
        setPacotes(pacotes){
            for(let i=0; i<pacotes.length;i++){
                this.pacotes.push({
                    nome: pacotes[i].attributes.Nome,
                    id: pacotes[i].id
                })
            }

            console.log(this.pacotes)
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