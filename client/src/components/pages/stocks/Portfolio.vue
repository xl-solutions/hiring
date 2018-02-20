<template>
  <q-layout class="layout-padding">
    <div class="row">
      <q-alert ref="alert" v-if="message" enter="bounceInLeft" leave="bounceOutRight" style="width: 100%">
        {{message}}
      </q-alert>
    </div>
    <form @submit.prevent="getStock">
      <div class="row items-center">
        <div class="col-lg-12">
          <q-input v-model="symbol" stack-label="Informe the stock symbol (BVMF:PETR4, NASDAQ:AAPL)"/>
        </div>
      </div>
      <div class="row">
        <q-btn small icon="search" type="submit" style="margin-left: auto">SEARCH</q-btn>
      </div>
    </form>
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
          rowHeight: '50px',
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
          .then((res) => {
            console.log(res.data)
            if (res.data.errors) {
              let errors = res.data.errors
              this.showMessage(errors[Object.keys(errors)[0]][0])
            }
            else {
              this.stocks.push(res.data)
              LocalStorage.set('stocks', this.stocks)
              this.symbol = ''
            }
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
