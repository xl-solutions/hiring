<template>
  <div class="quote">
    <h3>Cotação mais recente</h3>

    <div class="quote-form">
      <label for="">Digite aqui o código da ação:</label>
      <input
        type="text"
        placeholder="Ex.: USIM5.SA"
        v-model="input"
        @blur="getFromAPI"
      />
    </div>

    <div class="quote-return" v-if="show">
      <p class="quote-return-title">
        O valor de {{ quote.name }} para {{ parseDate() }} é R$
        {{ quote.lastPrice }}
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
      input: "",
      show: false,
      quote: {
        name: "",
        lastPrice: 0,
        pricedAt: "",
      },
      api: "http://localhost:3000",
    };
  },
  methods: {
    async getFromAPI() {
      try {
        const url = `${this.api}/stocks/${this.input}/quote`;
        const response = await axios.get(url);
        this.quote = response.data;
        this.show = true;
      } catch (error) {
        this.show = false;
      }
    },
    parseDate(): string {
      return `
      ${moment(this.quote.pricedAt).format("DD/MM/YYYY")} 
        às ${moment(this.quote.pricedAt).format("HH:mm")}`;
    },
  },
});
</script>

<style lang="scss" scoped>
.quote {
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