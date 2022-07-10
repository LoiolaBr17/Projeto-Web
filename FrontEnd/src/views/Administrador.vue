<template>
<main>
  <h1>Administrador</h1>
  <nav id="nav">
    <ul class="nav-ul">
      <li><button @click="inicioF()">Inicio</button></li>
      <li><button @click="editarF()">Editar Serviços</button></li>
      <li><button @click="reservasF()">Reservas</button></li>
    </ul>
  </nav>
  <Servicos v-if="inicio===true"/>
  <EditarServicos v-if="editar===true" />
  <TodasReservas v-if="reservas===true" />
</main>
  
</template>

<script>
import Servicos from '../components/Servicos.vue'
import EditarServicos from '../components/EditarServicos.vue'
import TodasReservas from '../components/TodasReservas.vue'
import router from '../router/index'

export default {
  name: 'AdministradorView',
  components: {
    Servicos,
    EditarServicos,
    TodasReservas,
  },
  data(){

    return {
      inicio: true,
      editar: false,
      reservas: false
    }
  },
  methods:{
    inicioF: function(){
      this.inicio = true
      this.editar = false
      this.reservas = false
    },
    editarF: function(){
      this.inicio = false
      this.editar = true
      this.reservas = false
    },
    reservasF: function(){
      this.inicio = false,
      this.editar = false,
      this.reservas = true
    }
  }
  
}
</script>

<style >
#nav,h1 {
  background-color: rgb(245, 66, 101);
}

.nav-ul {
  display: flex;
  justify-content: center;
}

.nav-ul li {
  list-style-type: none;
  margin: 0 20px;
}

.nav-ul li button {
  padding: 6px;
  border-radius: 20px;
  font-size: 20px;
  cursor: pointer;
}

.nav-ul li button:hover {
  color: #fff;
  background-color: #909090;
}

</style>