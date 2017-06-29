<template>
  <div>
    <md-card class="margin-content">
      <md-card-area class="margin-content size">
        <form @submit.prevent="gain()">
          <md-input-container>
            <label for="stock">Stock Name</label>
            <md-select name="stock" id="stock" v-model="stock.name" required>
              <md-option v-for="stock in stocks" v-bind:value="stock.name"> {{ stock.name }} </md-option>
            </md-select>
          </md-input-container>
          <md-input-container>
            <label for="amount">Purchased Amount</label>
            <md-input placeholder="Purchased Amount" type="number" v-model="purchasedAmount" required></md-input>
          </md-input-container>
          <md-input-container>
            <label for="purchasedAt">Purchased At</label>
            <md-input placeholder="Purchased At" v-mask="'####-##-##'" v-model="purchasedAt" required></md-input>
          </md-input-container>
          <md-button type="submit" class="md-primary">
            Fetch gains
          </md-button>
        </form>
      </md-card-area>
    </md-card>
    <md-card class="margin-content" v-show="gains.length > 0">
      <md-card-area class="margin-content">
        <md-table>
          <md-table-header>
            <md-table-row>
              <md-table-head> Name </md-table-head>
              <md-table-head> Purchased Amount </md-table-head>
              <md-table-head> Price at Date </md-table-head>
              <md-table-head> Last Price </md-table-head>
              <md-table-head> Capital Gains </md-table-head>
            </md-table-row>
          </md-table-header>
          <md-table-body>
            <md-table-row v-for="gain in gains">
              <md-table-cell>{{ gain.name }}</md-table-cell>
              <md-table-cell>{{ gain.purchasedAmount }}</md-table-cell>
              <md-table-cell>{{ gain.priceAtDate | currency }}</md-table-cell>
              <md-table-cell>{{ gain.lastPrice | currency }}</md-table-cell>
              <md-table-cell>{{ gain.capitalGains | currency }}</md-table-cell>
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
        name: ''
      },
      purchasedAmount: '',
      purchasedAt: '',
      gains: []
    }
  },
  mounted () {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      this.stocks.push(JSON.parse(localStorage.getItem(key)))
    }
  },
  methods: {
    gain: function () {
      this.$http
        .get(`${this.stock.name}/gains?purchasedAmount=${this.purchasedAmount}&purchasedAt=${this.purchasedAt}`)
        .then(response => {
          this.gains = []
          this.gains.push(response.data)
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
