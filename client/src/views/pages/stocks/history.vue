<template>
  <q-layout class="layout-padding">
    <div class="row">
      <q-alert ref="alert" v-if="message" enter="bounceInLeft" leave="bounceOutRight" style="width: 100%">
        {{message}}
      </q-alert>
    </div>
    <form @submit.prevent="getHistory">
      <div class="row md-gutter">
        <div class="col-lg-4 col-sm-12">
          <q-select separator stack-label="Select the symbol" v-model="search.symbol" :options="options"/>
        </div>
        <div class="col-lg-4 col-sm-12">
          <q-datetime v-model="search.from" stack-label="From" />
        </div>
        <div class="col-lg-4 col-sm-12">
          <q-datetime v-model="search.to" stack-label="To" />
        </div>
      </div>
      <div class="row">
        <q-btn small icon="search" type="submit" style="margin-left: auto">SEARCH</q-btn>
      </div>
    </form>
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
    QAlert,
    QBtn,
    QDataTable,
    QDatetime,
    QLayout,
    QSelect
  } from 'quasar'

  export default {
    name: 'history',
    components: {
      QAlert,
      QBtn,
      QDataTable,
      QDatetime,
      QLayout,
      QSelect
    },
    data () {
      return {
        message: '',
        search: {},
        options: [],
        lastPrices: [],
        config: {
          title: 'Stock History',
          rowHeight: '50px',
          pagination: {
            rowsPerPage: 10,
            options: [5, 10]
          }
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
        this.$http.get(
          '/stocks/' + this.search.symbol +
          '/history?from=' + this.search.from + '&to=' + this.search.to)
          .then((res) => {
            if (res.data.errors) {
              let errors = res.data.errors
              this.showMessage(errors[Object.keys(errors)[0]][0])
            }
            else {
              this.lastPrices = res.data.lastPrices
            }
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
