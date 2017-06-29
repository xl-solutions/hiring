<template>
  <div id="app">
    <Toolbar></Toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Toolbar from './components/root/Toolbar'
export default {
  name: 'app',
  components: {
    Toolbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.margin-content {
  margin: 20px;
}
</style>
