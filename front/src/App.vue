<template>
  <v-app>
    <v-main>
      <CurrentQuote></CurrentQuote>
      <QuotationByPeriod></QuotationByPeriod>      
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import CurrentQuote from "./components/CurrentQuote";
import QuotationByPeriod from "./components/QuotationByPeriod";

export default {
  name: "App",

  components: {
    CurrentQuote,
    QuotationByPeriod,
  },

  data: () => ({
    action: "PETR4.SAO",

    compares: ["VVAR3.SAO", "AZUL4.SAO", "VALE3.SAO", "VVAR3.SAO", "ITSA4.SAO"],

    purchasedAmount: 100,
    purchasedAt: "2015-07-23",
  }),

  methods: {
    async compare() {
      await axios.get(`http://127.0.0.1:3333/stocks/${this.action}/compare`, {
        data: {
          'stocks': this.compares,
        },
      }).then(({ data }) => {

        console.log('compare', data);

      });
    },

    // async gains() {

    //   await axios.get(`https://localhost:3333/stocks/${this.action}/gains?purchasedAmount=${this.purchasedAmount}&purchasedAt=${this.purchasedAt}`)
    //   .then(({ data }) => {

    //     console.log('gains', data);

    //   });
    // },
  },
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
</style>
