<template>
    <div class="container custom-input">
        <div>{{ stock }}</div>
        <div class="input-field">
            <span>
                Data Inicial
            </span>
            <input id="start-date" type="date" :max="maxDate" v-model="startDate" @change="checkDate">
        </div>
        <div class="input-field">
            <span>
                Data final
            </span>
            <input id="end-date" type="date" :max="maxDate" v-model="endDate" @change="checkDate">
        </div>
        <button id="search-btn" class="waves-effect waves-light btn" @click="search" :disabled="queringData">
            Buscar
        </button>
        <ul class="collection">
            <li v-for="s in stocksData" :key="s.name" class="collection-item">
                <div class="title">
                    <span>
                        {{ s.name }}
                    </span>
                </div>
                <div>
                    <p>
                        Dia: {{ s.pricedAt && new Date(s.pricedAt).toLocaleDateString() }}<br/>
                        Abertura: {{ s.opening }}<br/>
                        Cotação baixa: R${{ s.low && s.low.toString().replace('.', ',') }}<br/>
                        Cotação alta: R${{ s.high && s.high.toString().replace('.', ',') }}<br/>
                        Cotação final: R${{ s.closing && s.closing.toString().replace('.', ',') }}<br/>
                    </p>
                </div>
            </li>
        </ul>
        <div v-show="alert" class="modal-top">
            <div>
                <h4>
                    Erro
                </h4>
                <p>
                    Não foi possível encontrar o intervalo solicitado
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
    name: 'history',
    props: ['stock'],
    created() {
        if (!this.stock) {
            this.$router.replace('/');
        }
    },
    data () {
        return {
            alert: false,
            endDate: moment().format('YYYY-MM-DD'),
            queringData: false,
            maxDate: moment().format('YYYY-MM-DD'),
            startDate: moment().format('YYYY-MM-DD'),
            stocksData: []
        };
    },
    methods: {
        checkDate() {
            if (moment(this.startDate, 'YYYY-MM-DD').diff(moment(this.endDate, 'YYYY-MM-DD')) > 0) {
                this.startDate = this.endDate;
            }
        },
        search() {
            if (!this.stock) {
                this.$router.replace('/');
            }
            this.checkDate();
            this.queringData = true;
            this.$http
                .get(`${process.env.API}/stocks/${this.stock}/history?from=${this.startDate}&to=${this.endDate}`)
                .then(response => {
                    this.stocksData = response.body.prices;
                    this.queringData = false;
                }, responseError => {
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
