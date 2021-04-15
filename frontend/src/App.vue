<template>
  <div class="app">
    <div class="app-nav">
      <div class="app-nav-title">Stocks</div>
      <div class="app-nav-links">
        <router-link exact-active-class="selected" to="/">Quote</router-link>
        <router-link exact-active-class="selected" to="/gains"
          >Gains</router-link
        >
        <router-link exact-active-class="selected" to="/history"
          >History</router-link
        >
        <router-link exact-active-class="selected" to="/compare"
          >Compare</router-link
        >
      </div>
    </div>
    <div class="app-details">
      <div class="app-details-title">Details</div>
      <div class="app-details-body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

html,
body,
#app {
  padding: 0;
  margin: 0;
}

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  &-nav {
    width: 30vh;
    background: #2c3e50;
    height: 100vh;
    display: flex;
    flex-direction: column;
    &-title {
      height: 60px;
      padding: 0 10px;
      font-size: 1.5em;
      font-weight: 900;
      color: white;
      border-bottom: 1px solid lightgray;
      display: flex;
      align-items: center;
    }
    &-links {
      display: flex;
      flex-direction: column;
      a {
        color: white;
        text-decoration: none;
        border-bottom: 1px solid lightgray;
        width: 100%;
        padding: 20px 10px;
        &:hover,
        &.selected {
          background: lighten($color: #2c3e50, $amount: 10%);
        }
      }
    }
  }
  &-details {
    flex: 1;
    background: #f1f1f1;
    height: 100vh;
    overflow-x: scroll;
    &-title {
      height: 60px;
      padding: 0 10px;
      font-size: 1.5em;
      font-weight: 900;
      color: #2c3e50;
      border-bottom: 1px solid lightgray;
      display: flex;
      align-items: center;
    }
    &-body {
      padding: 0 20px;
    }
  }
}
</style>
