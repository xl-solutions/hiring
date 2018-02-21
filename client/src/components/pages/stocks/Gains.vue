<template>
  <q-layout class="layout-padding">
    <div class="row">
      <q-alert ref="alert" v-if="message" enter="bounceInLeft" leave="bounceOutRight" style="width: 100%">
        {{message}}
      </q-alert>
    </div>
    <form @submit.prevent="getGains">
      <div class="row md-gutter" style="padding: 10px;">
        <div class="col-lg-4 col-sm-12">
          <q-select separator stack-label="Select the symbol*" v-model="search.symbol" :options="options"/>
        </div>
        <div class="col-lg-4 col-sm-12">
          <q-input type="number" v-model="search.purchasedAmount" stack-label="Purchased amount*"/>
        </div>
        <div class="col-lg-4 col-sm-12">
          <q-datetime v-model="search.purchasedAt" stack-label="Purchased at*" />
        </div>
      </div>
      <div class="row">
        <q-btn small icon="search" type="submit" style="margin-left: auto">SEARCH</q-btn>
      </div>
    </form>
    <hr>
    <div class="row">
      <div class="col">
        <q-card>
          <q-card-main>
            <div class="row md-gutter">
              <div class="col-lg-4 col-sm-6">
                <q-input readonly v-model="stock.name" stack-label="Symbol"/>
              </div>
              <div class="col-lg-4 col-sm-6">
                <q-input readonly v-model="stock.purchasedAmount" stack-label="Purchased amount"/>
              </div>
              <div class="col-lg-4 col-sm-6">
                <q-input readonly v-model="stock.purchasedAt" stack-label="Purchased at"/>
              </div>
              <div class="col-lg-4 col-sm-6">
                <q-input readonly v-model="stock.priceAtDate" stack-label="Price at date"/>
              </div>
              <div class="col-lg-4 col-sm-6">
                <q-input readonly v-model="stock.lastPrice" stack-label="Last price"/>
              </div>
              <div class="col-lg-4 col-sm-6">
                <q-input readonly v-model="stock.capitalGains" stack-label="Capital gains"/>
              </div>
            </div>
          </q-card-main>
        </q-card>
      </div>
    </div>
  </q-layout>
</template>

<script>
  import {
    LocalStorage,
    QAlert,
    QBtn,
    QCard,
    QCardMain,
    QDatetime,
    QInput,
    QLayout,
    QSelect

  } from 'quasar'

  export default {
    name: 'gains',
    components: {
      QAlert,
      QBtn,
      QCard,
      QCardMain,
      QDatetime,
      QInput,
      QLayout,
      QSelect
    },
    data () {
      return {
        message: '',
        options: [],
        search: {},
        stock: {}
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
      getGains () {
        this.$http.get(
          '/stocks/' + this.search.symbol +
          '/gains?purchasedAmount=' + this.search.purchasedAmount +
          '&purchasedAt=' + this.search.purchasedAt)
          .then((res) => {
            if (res.data.errors) {
              let errors = res.data.errors
              this.showMessage(errors[Object.keys(errors)[0]][0])
            }
            else {
              this.stock = res.data
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
