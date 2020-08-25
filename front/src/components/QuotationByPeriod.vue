<template>
  <div>
    <v-form>
      <v-container>
        <v-row cols="12">
          <v-text-field v-model="action" :rules="actionField" label="Ação" :counter="9" required />
        </v-row>

        <v-row cols="12">
          <v-col cols="6">
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              :return-value.sync="de"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="de"
                  label="Data Início"
                  prepend-icon="far fa-calendar-alt"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker v-model="de" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu1.save(de)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="6">
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :return-value.sync="to"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="to"
                  label="Data Fim"
                  prepend-icon="far fa-calendar-alt"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker v-model="to" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu2.save(to)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row cols="12" md="4" class="v-virtual-scroll">
          <v-btn color="success" class="mr-4" @click="periud">Pesquisar</v-btn>
        </v-row>

        <div v-if="this.historic" class="row col-12">
          <v-card v-for="day in historic" :key="day.pricedAt" class="col-6">
            <v-card-title class="v-date-picker-title">{{ day.pricedAt }}</v-card-title>

            <v-card-content class="d-flex">
              <v-row>Abertura: {{ day.opening | money }}</v-row>
              <v-row>Máxima: {{ day.high | money }}</v-row>
              <v-row>Mínima: {{ day.low | money }}</v-row>
              <v-row>Fechamento: {{ day.closing | money }}</v-row>
            </v-card-content>
          </v-card>
        </div>

        <v-row>
          <v-alert v-if="error" type="error">Houve um erro inesperado.</v-alert>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuotationByPeriod",

  data: () => ({
    error: false,

    action: "PETR4.SAO",

    de: "2020-07-20",
    to: "2020-07-23",

    menu1: false,
    menu2: false,

    actionField: [
      (v) => !!v || "Ação deve ser informada",
      (v) =>
        v.length === 9 ||
        "O código da ação deve conter 9 digitos, ex: PETR4.SAO",
    ],

    historic: null,
  }),

  filters: {
    money: (value) => {
      if (value) {
        return value.replace(".", ",").substring(-2, value.length - 2);
      }
    },
  },

  methods: {
    async periud() {
      await axios
        .get(
          `http://127.0.0.1:3333/stocks/${this.action}/history?from=${this.de}&to=${this.to}`
        )
        .then(({ data }) => {
          this.historic = data;
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