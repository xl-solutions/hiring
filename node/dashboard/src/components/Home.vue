<template>
  <div class="custom-input">
    <h1>Dashboard</h1>
    <br/>
    <input v-model="stockName" style="text-transform: uppercase">
    <button @click="addStock" :disabled="queringData">Add</button>
    <!-- displays list --> 
    <ul>
      <li v-for="s in stocksData" :key="s.name" class="w3-card-4">
        <header class="w3-container w3-blue">
          {{ s.name }}
        </header>
        <div class="w3-container">
          <div class="block">
            R${{ s.lastPrice.toString().replace('.', ',') }}
          </div>
          <div class="block right">
            <button @click="getHistory(s.name)">
              Histórico
            </button>
          </div>
          <div class="block right">
            <button @click="getProjection(s.name)">
              Projeção
            </button>
          </div>
        </div>
        <footer class="w3-container w3-green">
          {{ new Date(s.pricedAt).toLocaleDateString() }}
        </footer>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'home',
  created() {
      this.$store.commit('INITIALISE_STOCKS_NAMES');
      this.stocksData = this.$store.state.stocksData;
      if (this.stocksData.length) {
        return;
      }
      const stocksNames = this.$store.state.stocksNames.slice(0, this.$store.state.stocksNames.length);
      if (!stocksNames.length) {
        return;
      }
      this.$http
        .put(`${process.env.API}/stocks/${stocksNames.shift()}/compare`, {
          stocks: stocksNames
        }, {
          'Content-Type': 'application/json'
        })
        .then(fullfiled => {
          this.$store.commit('UPDATE_STOCKS_DATA', fullfiled.body.lastPrices);
          this.stocksData = this.$store.state.stocksData.slice(0, this.$store.state.stocksData.length);
        })
        .catch(err => console.log(err));
    },
  data () {
    return {
      queringData: false,
      stocksData: [],
      stockName: ''
    };
  },
  methods: {
      addStock() {
        this.queringData = true;
        if (!this.stockName || this.$store.state.stocksNames.find(e => e == this.stockName)) {
          this.resetInput();
          return;
        }
        console.log(this.$store.state.stocksNames.find(e => e == this.stockName));
        this.$store.commit('INSERT_STOCK_NAME', this.stockName.toUpperCase());
        this.$http
          .get(`${process.env.API}/stocks/${this.stockName.toUpperCase()}/quote`)
          .then(response => {
            if (response.body) {
              this.$store.commit('INSERT_STOCK_DATA', response.body);
              this.stocksData = this.$store.state.stocksData.slice(0, this.$store.state.stocksData.length);
            }
            this.resetInput();
          }, responseError => {
            this.resetInput();
          })
          .catch(err => {
            this.resetInput();
            console.log(err);
          });
      },
      getHistory(stockName) {
        console.log(stockName);
      },
      getProjection(stockName) {
        console.log(stockName);
      },
      resetInput() {
        this.queringData = false;
        this.stockName = '';
      }
  }
}
</script>
<style>
.custom-input {
  width: 500px;
  max-width: 90vw;
}
li {
  list-style-type: none;
  margin-bottom: 20px;
}
.custom-btn {
  margin: 10px;
}
.right {
  float: right;
}
.left {
  float: left;
}
.block {
  display: inline-block;
}
</style>
