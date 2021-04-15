<template>
  <div class="compare">
    <h3>Compare</h3>

    <div class="compare-form">
      <label for="">Digite aqui o código da ação:</label>
      <input type="text" placeholder="Ex.: USIM5.SA" v-model="input" />
    </div>

    <div class="compare-form">
      <label for="">Digite aqui a ação para comparar:</label>
      <input type="text" placeholder="Ex.: PETR4.SA" @blur="addToCompare" />
    </div>

    <div class="compare-form">
      <button @click="getFromAPI">Compare</button>
    </div>

    <div class="list" v-if="compare.length >= 1">
      <h4>Stocks para comparar</h4>
      <ul class="compare-list">
        <li v-for="(item, index) in compare" :key="index">
          <small @click="removeCompare(item)">x</small>
          <p>{{ item }}</p>
        </li>
      </ul>
    </div>

    <div class="compare-return" v-if="show">
      <div
        class="compare-return--item"
        v-for="(item, index) in result"
        :key="index"
      >
        <p>{{ item.name }}</p>
        <p>R$ {{ parseMoney(item.lastPrice) }}</p>
        <p>{{ parseDate(item.pricedAt) }}</p>
      </div>
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
      compare: [],
      api: "http://localhost:3000",
      result: [],
    };
  },
  methods: {
    async getFromAPI() {
      try {
        const url = `${this.api}/stocks/${this.input}/compare`;
        const response = await axios({
          method: "POST",
          url,
          data: {
            stocks: this.compare,
          },
        });
        this.result = response.data;
        this.show = true;
        this.compare = [];
      } catch (error) {
        this.show = false;
      }
    },
    addToCompare(ev: any) {
      const newVal = ev.target.value;

      if (this.compare.indexOf(newVal) !== -1) {
        console.log(this.compare);
      } else {
        this.compare = [...this.compare, ev.target.value];
      }
    },
    removeCompare(item: string) {
      const index = this.compare.indexOf(item);
      if (index > -1) {
        this.compare.splice(index, 1);
      }
    },
    parseMoney(price: any): string {
      return price.toFixed(2).replace(".", ",");
    },
    parseDate(date: string): string {
      return `
      ${moment(date).format("DD/MM/YYYY")} 
        às ${moment(date).format("HH:mm")}`;
    },
  },
});
</script>

<style lang="scss" scoped>
.compare {
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
  &-list {
    padding: 0;
    margin: 0;
    display: flex;
    gap: 10px;
    list-style: none;
    li {
      background: white;
      padding: 10px;
      border-radius: 3px;
      box-shadow: 0 0 10px -2px lightgray;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      small {
        color: red;
        font-weight: bold;
        cursor: pointer;
      }
      p {
        margin: 0;
        font-size: 0.9em;
        font-weight: bold;
      }
    }
  }
  &-return {
    display: flex;
    gap: 20px;
    margin: 20px 0;
    &--item {
      background: white;
      padding: 0 10px;
      border-radius: 3px;
      box-shadow: 0 0 10px -2px lightgray;
      p {
        &:first-of-type {
          font-weight: bold;
          font-size: 0.9em;
        }
      }
    }
  }
}
</style>