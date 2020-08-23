<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="action" :rules="actionField" label="Ação" :counter="9" required />

            <v-btn :disabled="!valid" color="success" class="mr-4" @click="quote">Pesquisar</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-alert v-if="error" type="error">Houve um erro inesperado.</v-alert>
        </v-row>
      </v-container>
    </v-form>

    <div>
      <v-card v-if="actionSelected.name" max-width="400" class="mx-auto">
        <v-card-title
          class="v-date-picker-title"
          v-if="actionSelected.name"
        >{{ this.actionSelected.name }}</v-card-title>

        <v-card-text
          v-if="actionSelected.price"
          style="font-size: 1.2em"
        >{{ this.actionSelected.price | money }}</v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CurrentQuote",

  data: () => ({
    error: false,
    valid: false,
    action: "PETR4.SAO",

    actionSelected: {
      name: null,
      price: null,
		},
		
		actionField: [
      v => !!v || 'Ação deve ser informada',
      v => v.length === 9 || 'O código da ação deve conter 9 digitos, ex: PETR4.SAO',
    ],
  }),

  filters: {
    money: (value) => {
      if (value) {
        return value.replace(".", ",").substring(-2, value.length - 2);
      }
    },
  },

  methods: {
    async quote() {
      await axios.get(`http://127.0.0.1:3333/stocks/${this.action}/quote`)
        .then(({ data }) => {
          this.error = false;
          this.actionSelected.name = data.name;
          this.actionSelected.price = data.pricedAt;
        })
        .catch(() => {
          this.error = true;
        });
    },
  },
};
</script>

<style>
</style>