<template>
  <div>
    <md-card class="margin-content">
      <md-card-area>
        <md-table>
          <md-table-header>
            <md-table-row>
              <md-table-head> Name </md-table-head>
              <md-table-head> Last Price </md-table-head>
              <md-table-head> Priced At </md-table-head>
              <md-table-head> Remove </md-table-head>
            </md-table-row>
          </md-table-header>
          <md-table-body>
            <md-table-row v-for="(stock, index) in stocks">
              <md-table-cell>{{ stock.name }}</md-table-cell>
              <md-table-cell>{{ stock.lastPrice | currency }}</md-table-cell>
              <md-table-cell>{{ stock.pricedAt | moment }}</md-table-cell>
              <md-table-cell>
                <md-button @click="remove(index)">
                  <md-icon>delete</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>
      </md-card-area>
    </md-card>
    <router-link :to="{ name: 'stock' }">
      <md-button class="md-fab md-fab-bottom-right">
        <md-icon>add</md-icon>
      </md-button>
    </router-link>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      stocks: [],
      data: []
    }
  },
  methods: {
    remove: function (index) {
      this.stocks.splice(index, 1)
      let key = localStorage.key(index)
      localStorage.removeItem(key)
    }
  },
  mounted () {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      this.data.push(JSON.parse(localStorage.getItem(key)))
    }
    this.data.map(stock => {
      this.$http
        .get(`${stock.name}/quote`)
        .then(response => {
          this.stocks.push(response.data)
        })
    })
  },
  filters: {
    moment: function (date) {
      return moment(date).format('YYYY-MM-DD')
    }
  }
}
</script>
