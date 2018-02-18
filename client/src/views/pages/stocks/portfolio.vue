<template>
  <q-layout class="layout-padding">
    <div class="row">
      <q-alert ref="alert" v-if="message" enter="bounceInLeft" leave="bounceOutRight" style="width: 100%">
        {{message}}
      </q-alert>
    </div>
    <div class="row items-center">
      <div class="col-lg-10">
        <q-field  icon="trending up">
          <q-input v-model="symbol" float-label="Informe the stock symbol (BVMF:PETR4, NASDAQ:AAPL)" />
        </q-field>
      </div>
      <div class="col-lg-2">
        <q-btn small icon="search" @click="getStock">SEARCH</q-btn>
      </div>
    </div>
    <div class="row" style="margin-top: 20px">
      <div class="col">
        <q-data-table
          :data="stocks"
          :config="config"
          :columns="columns"
        >
          <template slot="selection" slot-scope="props">
            <q-btn flat color="primary" @click="deleteStock(props)">
              <q-icon name="delete" />
            </q-btn>
          </template>
        </q-data-table>
      </div>
    </div>
  </q-layout>
</template>

<script>
  import {
    QAlert,
    QBtn,
    QDataTable,
    QField,
    QIcon,
    QInput,
    QLayout,
    LocalStorage
  } from 'quasar'

  export default {
    name: 'portfolio',
    components: {
      QAlert,
      QBtn,
      QDataTable,
      QField,
      QIcon,
      QInput,
      QLayout
    },
    data () {
      return {
        symbol: '',
        message: '',
        stocks: [],
        config: {
          title: 'Stocks',
          refresh: true,
          noHeader: false,
          columnPicker: true,
          leftStickyColumns: 0,
          rightStickyColumns: 2,
          bodyStyle: {
            maxHeight: '500px'
          },
          rowHeight: '50px',
          responsive: true,
          pagination: {
            rowsPerPage: 10,
            options: [5, 10]
          },
          selection: 'multiple'
        },
        columns: [
          {
            label: 'NAME',
            field: 'name',
            width: '140px',
            classes: 'bg-orange-2',
            sort: true,
            filter: true,
            type: 'string'
          },
          {
            label: 'LAST PRICE',
            field: 'lastPrice',
            width: '120px',
            sort: true,
            type: 'number'
          },
          {
            label: 'PRICE AT',
            field: 'pricedAt',
            width: '120px',
            sort: true,
            type: 'date',
            format (value) {
              return new Date(value).toLocaleString()
            }
          }
        ]
      }
    },
    mounted () {
      this.stocks = LocalStorage.get.item('stocks') || []
    },
    methods: {
      getStock () {
        this.$http.get('/stocks/' + this.symbol + '/quote')
          .then((resp) => {
            this.stocks.push(resp.data)
            LocalStorage.set('stocks', this.stocks)
            this.symbol = ''
          }).catch(() => {
            this.showMessage('Symbol not found!')
          })
      },
      deleteStock (props) {
        props.rows.forEach(row => {
          this.stocks.splice(row.index)
          LocalStorage.set('stocks', this.stocks)
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

<style>

</style>
