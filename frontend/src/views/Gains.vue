<template>
  <div class="gains">
    <h3>Ganhos</h3>

    <div class="gains-form">
      <label for="">Digite aqui o código da ação:</label>
      <input type="text" placeholder="Ex.: USIM5.SA" v-model="input.name" />
    </div>
    <div class="gains-form">
      <label for="">Digite aqui a quantidade de ações:</label>
      <input type="text" placeholder="Ex.: 100" v-model="input.quantity" />
    </div>

    <div class="gains-form">
      <label for="">Data de compra:</label>
      <input type="date" v-model="input.purchaseDate" />
    </div>

    <div class="gains-form">
      <button @click="getFromAPI">Ganhos</button>
    </div>

    <div class="gains-return" v-if="show">
      <p class="gains-return-title">
        O valor de ganhos para {{ gains.name }} é de R$
        {{ parseMoney(gains.capitalGains) }}
      </p>
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
        quantity: 0,
        purchaseDate: "",
      },
      show: false,
      gains: {
        name: "",
        capitalGains: "",
      },
      api: "http://localhost:3000",
    };
  },
  methods: {
    async getFromAPI() {
      try {
        const url = `${this.api}/stocks/${this.input.name}/gains?purchasedAmount=${this.input.quantity}&purchasedAt=${this.input.purchaseDate}`;
        const response = await axios.get(url);
        this.gains = response.data;
        this.show = true;
      } catch (error) {
        this.show = false;
      }
    },
    parseMoney(price: any): string {
      return price.toFixed(2).replace(".", ",");
    },
  },
});
</script>

<style lang="scss" scoped>
.gains {
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
}
</style>