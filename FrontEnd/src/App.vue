<template>
  <main>
    <div id="nav" v-if="store.Logado">
      <button @click="store.logout()" id="logout">Logout</button>
    </div>
    
    <router-view/>
   
  </main>
 
</template>

<script>
import {usuarioStore} from '../src/store/usuario'

  export default {
    name: 'App',
    components: {
     
    },
    setup(){
      const store = usuarioStore()

      

      return {
        store,
  
      }
    }
    
  }

</script>


<style>
 #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

#logout{
  margin: 20px 0;
  padding: 10px;
  border-radius: 15px;
  cursor: pointer;
}

#logout:hover {
  background-color: #909090;
  color: #fff;
}

</style>
