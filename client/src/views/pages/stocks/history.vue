<template>
  <q-layout class="layout-padding">
    <div class="row md-gutter	">
      <div class="col-lg-4 col-sm-12">
        <q-select separator stack-label="Select the symbol" v-model="symbol" :options="options"/>
      </div>
      <div class="col-lg-4 col-sm-12">
        <q-datetime v-model="from" stack-label="From" />
      </div>
      <div class="col-lg-4 col-sm-12">
        <q-datetime v-model="to" stack-label="To" />
      </div>
    </div>
    <div class="row">
      <q-btn small icon="search" @click="getHistory" style="margin-left: auto">SEARCH</q-btn>
    </div>
    <hr>
    <div class="row" style="margin-top: 20px">
      <q-data-table
        :data="lastPrices"
        :config="config"
        :columns="columns">
      </q-data-table>
    </div>
  </q-layout>
</template>

<script>
  import {
    LocalStorage,
    QBtn,
    QDataTable,
    QDatetime,
    QLayout,
    QSelect
  } from 'quasar'

  export default {
    name: 'history',
    components: {
      QBtn,
      QDataTable,
      QDatetime,
      QLayout,
      QSelect
    },
    data () {
      return {
        message: '',
        symbol: '',
        from: '',
        to: '',
        options: [],
        lastPrices: [],
        config: {
          title: 'Stock History'
        },
        columns: [
          {
            label: 'PRICED AT',
            field: 'pricedAt',
            width: '80px',
            sort: true,
            type: 'date',
            format (value) {
              return new Date(value).toLocaleString()
            }
          }, {
            label: 'OPENING',
            field: 'opening',
            width: '50px',
            type: 'number'
          }, {
            label: 'LOW',
            field: 'low',
            width: '50px',
            type: 'number'
          }, {
            label: 'HIGH',
            field: 'high',
            width: '50px',
            type: 'number'
          }, {
            label: 'CLOSING',
            field: 'closing',
            width: '50px',
            type: 'number'
          }
        ]
      }
    },
    mounted () {
      let stocks = LocalStorage.get.item('stocks') || []

      stocks.forEach((stock) => {
        this.options.push({
          label: stock.name,
          value: stock.name
        })
      })
    },
    methods: {
      getHistory () {
        this.$http.get('/stocks/' + this.symbol + '/history?from=' + this.from + '&to=' + this.to)
          .then((resp) => {
            console.log(resp)
            this.lastPrices = resp.data.prices
          }).catch(() => {
            this.showMessage('Symbol not found!')
          })
      },
      showMessage (msg) {
        this.message = msg

        // close message after 5 sec
        setTimeout(() => {
          this.message = ''
        }, 5000)
      }
    }
  }
</script>

<style scoped>

</style>
