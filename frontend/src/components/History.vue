<template>
  <div>
    <md-card class="margin-content">
      <md-card-area class="margin-content size">
        <form @submit.prevent="history()">
          <md-input-container>
            <label for="stock">Stock Name</label>
            <md-select name="stock" id="stock" v-model="stock.name" required>
              <md-option v-for="stock in stocks" v-bind:value="stock.name"> {{ stock.name }} </md-option>
            </md-select>
          </md-input-container>
          <md-input-container>
            <label for="from">From</label>
            <md-input placeholder="From" v-mask="'####-##-##'" v-model="stock.from" required></md-input>
          </md-input-container>
          <md-input-container>
            <label for="to">To</label>
            <md-input placeholder="To" v-mask="'####-##-##'" v-model="stock.to"></md-input>
          </md-input-container>
          <md-button type="submit" class="md-primary">
            Fetch history
          </md-button>
        </form>
      </md-card-area>
    </md-card>
    <md-card class="margin-content" v-show="prices.length > 0">
      <md-card-area class="margin-content">
        <md-table>
          <md-table-header>
            <md-table-row>
              <md-table-head> Name </md-table-head>
              <md-table-head> Opening </md-table-head>
              <md-table-head> Low </md-table-head>
              <md-table-head> High </md-table-head>
              <md-table-head> Close </md-table-head>
              <md-table-head> Priced At </md-table-head>
            </md-table-row>
          </md-table-header>
          <md-table-body>
            <md-table-row v-for="price in prices">
              <md-table-cell>{{ stock.name }}</md-table-cell>
              <md-table-cell>{{ price.opening | currency }}</md-table-cell>
              <md-table-cell>{{ price.low | currency }}</md-table-cell>
              <md-table-cell>{{ price.high | currency }}</md-table-cell>
              <md-table-cell>{{ price.closing | currency }}</md-table-cell>
              <md-table-cell>{{ price.pricedAt | moment }}</md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>
      </md-card-area>
    </md-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      stocks: [],
      stock: {
        name: '',
        from: '',
        to: ''
      },
      format: moment,
      prices: []
    }
  },
  mounted () {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      this.stocks.push(JSON.parse(localStorage.getItem(key)))
    }
  },
  methods: {
    history: function () {
      this.$http
        .get(`${this.stock.name}/history?from=${this.stock.from || moment().subtract(1, 'years').format('YYYY-MM-DD')}&to=${this.stock.to || moment().format('YYYY-MM-DD')}`)
        .then(response => {
          this.prices = response.data.prices
        })
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('YYYY-MM-DD')
    }
  }
}
</script>
