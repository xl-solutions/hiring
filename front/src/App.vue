<template>
  <v-app>
    <v-main>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field v-model="action" :rules="nameRules" label="Ação" :counter="9" required />

              <v-btn :disabled="!valid" color="success" class="mr-4" @click="quote">
                Pesquisar
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-alert v-if="error" type="error">Houve um erro inesperado.</v-alert>
          </v-row>
        </v-container>        
      </v-form>

      <div>
        <v-card v-if="actionSelected.name" max-width="400" class="mx-auto">
          <v-card-title class="v-date-picker-title" v-if="actionSelected.name">
            {{ this.actionSelected.name }}
          </v-card-title>
          
          <v-card-text v-if="actionSelected.price" style="font-size: 1.2em" >
            {{ this.actionSelected.price | money }}
          </v-card-text>
        </v-card>
      </div>
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
    error: false,

    valid: false,
    action: 'PETR4.SAO',

    actionSelected: {
      name: null,
      price: null,
    },

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

    nameRules: [
      v => !!v || 'Ação deve ser informada',
      v => v.length === 9 || 'O código da ação deve conter 10 digitos, ex: PETR4.SAO',
    ],
  }),

  filters: {
    money: (value) => {
      if (value) {
        return value.replace('.', ',').substring(-2, value.length - 2);
      }
    }
  },

  methods: {
    // async search() {
    //   console.log(this.action);
    // },

    async quote() {
      await axios.get(`http://127.0.0.1:3333/stocks/${this.action}/quote`).then(({ data }) => {
        this.error = false;
        this.actionSelected.name = data.name;
        this.actionSelected.price = data.pricedAt;
      }).catch(() => {
        this.error = true;
      });
    },

    // async periud() {

    //   await axios.get(`http://127.0.0.1:3333/stocks/${this.action}/history?from=${this.form}&to=${this.to}`)
    //   .then(({ data }) => {

    //     console.log('periud', data);

    //   });
    // },

    // async compare() {

    //   await axios.get(`http://127.0.0.1:3333/stocks/${this.action}/compare`, {
    //     data: {
    //       'stocks': this.compare,
    //     },
    //   }).then(({ data }) => {

    //     console.log('compare', data);

    //   });
    // },

    // async gains() {

    //   await axios.get(`https://localhost:3333/stocks/${this.action}/gains?purchasedAmount=${this.purchasedAmount}&purchasedAt=${this.purchasedAt}`)
    //   .then(({ data }) => {

    //     console.log('gains', data);

    //   });
    // },
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
