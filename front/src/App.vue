<template>
  <v-app>
    <v-main>
      <input v-model="action" placeholder="Ação">

      <button @click="search">Adiciona 1</button>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    action: 'PETR4.SAO',

    from: '2020-07-20',
    to: '2020-07-23',

    compare: [
      'VVAR3.SAO',
      'AZUL4.SAO',
      'VALE3.SAO',
      'VVAR3.SAO',
      'ITSA4.SAO',  
    ],

    purchasedAmount: 100,
    purchasedAt: '2015-07-23',
  }),

  methods: {
    async search() {

      this.quote();

    },

    async quote() {

      await axios.get(`http://127.0.0.1:3333/stocks/${this.action}/quote`)
      .then(({ data }) => {

        console.log('quote', data);

      });
    },

    async periud() {

      await axios.get(`http://127.0.0.1:3333/stocks/${this.action}/history?from=${this.form}&to=${this.to}`)
      .then(({ data }) => {

        console.log('periud', data);

      });
    },

    async compare() {

      await axios.get(`http://127.0.0.1:3333/stocks/${this.action}/compare`, {
        data: {
          'stocks': this.compare,
        },
      }).then(({ data }) => {

        console.log('compare', data);

      });
    },

    async gains() {

      await axios.get(`https://localhost:3333/stocks/${this.action}/gains?purchasedAmount=${this.purchasedAmount}&purchasedAt=${this.purchasedAt}`)
      .then(({ data }) => {

        console.log('gains', data);

      });
    },
  }
};
</script>

<style scoped>
#app {
  margin: 50px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

input {
  border-style: outset;
}

</style>
