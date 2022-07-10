<template>
  <main>
    <h1>Cliente</h1>
    <nav id="nav">
      <ul class="nav-ul">
        <li><button @click="inicioF()">Serviços Disponíveis</button></li>
        <li><button @click="reservasF()">Minhas Reservas</button></li>
      </ul>
    </nav>
    <Servicos v-if="inicio===true"/>
    <MinhasReservas v-if="reservas===true"/>
  </main>
  
</template>

<script>
import Servicos from '../components/Servicos.vue'
import MinhasReservas from '../components/MinhasReservas.vue'

export default {
  name: 'ClienteView',
  components: {
    Servicos,
    MinhasReservas   
  },
  data(){
    return {
      inicio: true,
      reservas: false
    }
  },
  methods:{
    inicioF: function(){
      this.inicio = true
      this.reservas = false
    },
    reservasF: function(){
      this.inicio = false
      this.reservas = true
    }
  }
}
</script>

<style scoped>

</style>