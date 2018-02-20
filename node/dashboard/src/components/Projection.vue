<template>
    <div class="container custom-input">
        <div>{{ stock }}</div>
        <div class="input-field">
            <span>
                Data da compra
            </span>
            <input id="start-date" type="date" :max="maxDate" v-model="searchedDate">
        </div>
        <div class="input-field">
            <span>
                Número de ações
            </span>
            <input type="number" v-model="stockNumber">
        </div>
        <button id="search-btn" class="waves-effect waves-light btn" @click="project" :disabled="queringData">
            Buscar
        </button>
        <div v-if="stockData" class="card">
            <div class="card-content">
                <span class="card-title">
                    {{ stockData.name }}
                </span>
                <p>
                    Data da compra: {{ stockData.purchasedAt }}<br/>
                    Quantidade: {{ stockData.purchasedAmount }}<br/>
                    Cotação na compra: R${{ stockData.priceAtDate && stockData.priceAtDate.toString().replace('.', ',') }}<br/>
                    Cotação atual: R${{ stockData.lastPrice && stockData.lastPrice.toString().replace('.', ',') }}<br/>
                    Ganhos: R${{ stockData.capitalGains && stockData.capitalGains.toFixed(2).replace('.', ',') }}<br/>
                </p>
            </div>
        </div>
        <div v-show="alert" class="modal-top">
            <div>
                <h4>
                    Erro
                </h4>
                <p>
                    Não foi possível realizar a busca. Certifique-se de que os campos foram devidamente preenchidos
                </p>
            </div>
            <div>
                <button class="waves-effect waves-light btn" @click="hideModal">
                    Ok
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'projection',
    props: ['stock'],
    created() {
        if (!this.stock) {
            this.$router.replace('/');
        }
    },
    data () {
        return  {
            alert: false,
            queringData: false,
            maxDate: moment().format('YYYY-MM-DD'),
            searchedDate: moment().format('YYYY-MM-DD'),
            stockNumber: 0,
            stockData: null
        };
    },
    methods: {
        project() {
            if (!this.stock) {
                this.$router.replace('/');
            }
            this.stockNumber = parseInt(this.stockNumber);
            if (!this.stockNumber || this.stockNumber < 1) {
                this.alert = true;
            }
            this.queringData = true;
            this.$http
                .get(`${process.env.API}/stocks/${this.stock}/gains?purchasedAmount=${this.stockNumber}&purchasedAt=${this.searchedDate}`)
                .then(response => {
                    this.stockData = response.body;
                    this.queringData = false;
                }, responseError => {
                    this.stockData = null;
                    this.alert = true;
                    this.queringData = false;
                })
                .catch(err => {});
        },
        hideModal() {
            this.alert = false;
        }
    }
}
</script>
