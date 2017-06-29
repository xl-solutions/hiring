<template>
  <md-toolbar>
    <h2 class="md-title" style="flex: 1">{{title}}</h2>
    <router-link :to="{ name: 'dashboard' }" class="md-button" :class="`md-theme-${$material.currentTheme}`">Portfolio</router-link>
    <router-link :to="{ name: 'history' }" class="md-button" :class="`md-theme-${$material.currentTheme}`">History</router-link>
    <router-link :to="{ name: 'gains' }" class="md-button" :class="`md-theme-${$material.currentTheme}`">Gains</router-link>
  </md-toolbar>
</template>

<script>
export default {
  data () {
    return {
      title: this.$route.meta.title
    }
  }
}
</script>
