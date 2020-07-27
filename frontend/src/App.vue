<template>

  <div>

      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <img src="./assets/corretora.png" height="30px" style="margin-right: 15px;"/>
        <router-link class="navbar-brand" to="Home">Home</router-link>
      </nav>

  <br/><div class="container" id="box">
    <router-view></router-view>
  </div>
  <br/>

  </div>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'app',
  components: {
    Home
  }
}
</script>

<style>
body {
  padding-top: 60px;
  background-color: azure;
  
}
#box{
    background-color:white;
    border-radius: 10px;
    box-shadow: gray 0.5em 0.5em 0.3em
    }
</style>
