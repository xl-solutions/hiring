<template>
    <div class="container custom-input">
        <h1>
            Dashboard
        </h1>
        <br/>
        <input id="add-name" v-model="stockName" style="text-transform: uppercase" placeholder="Digite o símbolo da ação (ex: PETR4)">
        <button id="add-btn" class="waves-effect waves-light btn" @click="addStock" :disabled="queringData">
            Cadastrar
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
                    R${{ s.lastPrice && s.lastPrice.toString().replace('.', ',') }}<br/>
                    {{ s.pricedAt && new Date(s.pricedAt).toLocaleDateString() }}
                </p>
            </div>
            <button class="waves-effect waves-light btn" @click="getHistory(s.name)">
                Histórico
            </button>
            <button class="waves-effect waves-light btn" @click="getProjection(s.name)">
                Projeção
            </button>
            </li>
        </ul>
        <div v-show="alert" class="modal-top">
            <div>
                <h4>
                    Erro
                </h4>
                <p>
                    Não foi possível encontrar dados da ação solicitada
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
export default {
    name: 'home',
    created() {
        this.$store.commit('INITIALISE_STOCKS_NAMES');
        this.stocksData = this.$store.state.stocksData;
        if (this.stocksData.length) {
            return;
        }
        const stocksNames = this.$store.state.stocksNames.slice(0, this.$store.state.stocksNames.length);
        if (!stocksNames.length) {
            return;
        }
        this.$http
            .put(`${process.env.API}/stocks/${stocksNames.shift()}/compare`, {
            stocks: stocksNames
            }, {
            'Content-Type': 'application/json'
            })
            .then(response => {
                const stocks = response.body.lastPrices.filter(s => s.lastPrice);
                this.$store.commit('UPDATE_STOCKS_DATA', stocks);
                this.stocksData = this.$store.state.stocksData.slice(0, this.$store.state.stocksData.length);
                this.$store.commit('UPDATE_STOCKS_NAME', stocks.map(s => s.name));
            })
            .catch(err => console.log(err));
    },
    data () {
        return {
            alert: false,
            queringData: false,
            stocksData: [],
            stockName: ''
        };
    },
    methods: {
        addStock() {
            this.queringData = true;
            const stockName = this.stockName.toUpperCase();
            if (!stockName || this.$store.state.stocksNames.find(e => e == stockName)) {
                this.resetInput();
                return;
            }
            this.$store.commit('INSERT_STOCK_NAME', stockName);
            this.$http
                .get(`${process.env.API}/stocks/${stockName}/quote`)
                .then(response => {
                    if (response.body) {
                        this.$store.commit('INSERT_STOCK_DATA', response.body);
                        this.stocksData = this.$store.state.stocksData.slice(0, this.$store.state.stocksData.length);
                    } else {
                        this.$store.commit('REMOVE_STOCK_NAME', stockName);
                    }
                    this.resetInput();
                }, responseError => {
                    this.alert = true;
                    this.$store.commit('REMOVE_STOCK_NAME', stockName);
                    this.resetInput();
                })
                .catch(err => {
                    this.resetInput();
                    console.log(err);
                });
        },
        getHistory(stockName) {
            this.$router.push({
                name: 'history',
                params: {
                    stock: stockName
                }
            });
        },
        getProjection(stockName) {
            this.$router.push({
                name: 'projection',
                params: {
                    stock: stockName
                }
            });
        },
        hideModal() {
            this.alert = false;
        },
        resetInput() {
            this.queringData = false;
            this.stockName = '';
        }
    }
}
</script>
