<template>
  <div class="history">
    <h3>Histórico</h3>

    <div class="history-form">
      <label for="">Digite aqui o código da ação:</label>
      <input type="text" placeholder="Ex.: USIM5.SA" v-model="input.name" />
    </div>

    <div class="history-form">
      <label for="">Escolha a data de início:</label>
      <input type="date" placeholder="Ex.: USIM5.SA" v-model="input.from" />
    </div>

    <div class="history-form">
      <label for="">Escolha a data de fim:</label>
      <input type="date" placeholder="Ex.: USIM5.SA" v-model="input.to" />
    </div>

    <div class="history-form">
      <button @click="getFromAPI">Historico</button>
    </div>

    <div class="history-return" v-if="show">
      <p class="history-return-title">
        Histórico para: {{ input.name }} ({{ history.length }})
      </p>
      <ul class="history-return-body">
        <li v-for="(item, index) in history" :key="index">
          <p>Opening: R$ {{ parseMoney(item.opening) }}</p>
          <p>Low: R$ {{ parseMoney(item.low) }}</p>
          <p>High: R$ {{ parseMoney(item.high) }}</p>
          <p>Closing: R$ {{ parseMoney(item.closing) }}</p>
          <p>Price at: {{ parseDate(item.pricedAt) }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import moment from "moment";

export default Vue.extend({
  data() {
    return {
      input: {
        name: "",
        from: "",
        to: "",
      },
      show: false,
      history: {},
      api: "http://localhost:3000",
    };
  },
  methods: {
    async getFromAPI() {
      try {
        const url = `${this.api}/stocks/${this.input.name}/history?from=${this.input.from}&to=${this.input.to}`;
        const response = await axios.get(url);
        this.history = response.data.prices;
        this.show = true;
      } catch (error) {
        this.show = false;
      }
    },
    parseDate(date: string): string {
      return `
      ${moment(date).format("DD/MM/YYYY")} 
        às ${moment(date).format("HH:mm")}`;
    },
    parseMoney(price: any): string {
      return price.toFixed(2).replace(".", ",");
    },
  },
});
</script>

<style lang="scss" scoped>
.history {
  &-form {
    display: flex;
    height: 40px;
    align-items: center;
    width: 100%;
    gap: 20px;
    margin-bottom: 10px;
    input {
      height: 40px;
      flex: 1;
      padding: 10px;
    }
  }
  &-return {
    &-body {
      list-style: none;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
      padding: 0;
      margin: 0;
      li {
        background: white;
        padding: 0 10px;
        border-radius: 5px;
        box-shadow: 0 0 10px -2px lightgray;
      }
    }
  }
}
</style>