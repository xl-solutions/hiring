import React, { Component } from 'react';
import GlobalStyle from '../../styles/global';
import { Container, Header, ValueInfos, GainsInfos, Search, Item } from './styles'
import Api from '../../services/api'
import { Chart } from 'react-google-charts'


class App extends Component {

    state = {
        value: 0,
        search_stock_name: 'PETR4.SA',
        stock_name: '',
        pricedAt: '',
        errorSearch: "",
        errorGains: '',
        errorHistory: '',
        from: (new Date((new Date()).setDate(1))).toISOString().substring(0, 10),
        to: (new Date()).toISOString().substring(0, 10),
        purchasedAt: (new Date()).toISOString().substring(0, 10),
        purchasedAmount: 0,
        gains: {
            priceAtDate: 0,
            lastPrice: 0,
            capitalGains: 0
        },
        historyToChart: null,
        history: [],
        selectedChartItem: null
    }

    componentDidMount() {
        this.handleSearch()
    }


    handleSearch = async () => {

        try {
            if (this.state.search_stock_name === '')
                return;
            const response = (await Api.get(`/stocks/${this.state.search_stock_name}/quote`)).data

            this.setState({
                value: response.lastPrice,
                pricedAt: response.pricedAt,
                stock_name: response.name,
                errorSearch: '',
                errorGains: ''

            })

            this.handleHistory()
        } catch (err) {
            console.log(err)
            this.setState({ errorSearch: err.response ? err.response.data ? err.response.data.erro : err.toString() : "Houve um problema na consulta." })
        }
    }

    handleHistory = async () => {


        try {
            this.setState({ historyToChart: null, history: null, selectedChartItem: null })
            if (this.state.search_stock_name === '')
                return;

            const response = (await Api.get(`/stocks/${this.state.search_stock_name}/history?from=${this.state.from}&to=${this.state.to}`)).data
            var historyToChart = [['Data', 'Valor']];
            console.log(historyToChart.length)


            response.prices.forEach(e => {
                historyToChart.push([`${e.pricedAt.split('-')[2]}/${e.pricedAt.split('-')[1]}`, e.closing])
            })

            this.setState({ historyToChart, history: response })



        } catch (err) {
            console.log(err)
            this.setState({ historyToChart: null, history: null, selectedChartItem: null })
            this.setState({ errorHistory: err.response ? (err.response.data.erro ? err.response.data.erro : "Houve um problema na consulta.") : "Houve um erro ao buscar o historico" })
        }


    }


    handleGains = async () => {

        try {
            if (this.state.search_stock_name === '')
                return;

            console.log(this.state.search_stock_name, this.state.purchasedAmount, this.state.purchasedAt)
            const response = (await Api.get(`/stocks/${this.state.search_stock_name}/gains?purchasedAmount=${this.state.purchasedAmount}&purchasedAt=${this.state.purchasedAt}`)).data

            console.log(response)
            this.setState({ gains: response, errorGains: '' })

        } catch (err) {
            console.log(err)
            this.setState({
                gains: {
                    priceAtDate: 0,
                    lastPrice: 0,
                    capitalGains: 0
                }
            })

            this.setState({ errorGains: err.response ? err.response.data ? err.response.data.erro : err.toString() : "Houve um problema na simulaçao." })
        }



    }





    render() {



        return (
            <Container>
                {/* <GlobalStyle /> */}

                <Header>
                    <div className="top-header">
                        <div className="value-div" >
                            <p className="cipher">R$</p>
                            <p className="main-value">{this.state.value}</p>
                            <p className="main-pricedAt">{'Ultima Atualização'}<br />{this.state.pricedAt}</p>
                            <p className="main-stock-name">{this.state.stock_name}</p>
                        </div>
                        <div className="search-div" >

                            <Search>
                                <input
                                    type="text"
                                    placeholder="Busca por Ativo"
                                    onChange={e => this.setState({ search_stock_name: e.target.value })}
                                />
                                <button


                                    onClick={() => {
                                        this.handleSearch()
                                    }}
                                >
                                    Buscar
                                </button>

                            </Search>
                            <div className="divErrorSearch">
                                {this.state.errorSearch ? <p> {this.state.errorSearch} </p> : null}
                            </div>



                        </div>
                    </div>
                    <div className="bottom-header">

                        <Item>
                            <label htmlFor="from">Data Incial</label>
                            <input type="date" id="from" name="from"
                                value={this.state.from}
                                onChange={e => this.setState({ from: e.target.value })}
                            />

                        </Item>
                        <Item>
                            <label htmlFor="to">Data Final</label>
                            <input type="date" id="to" name="to"
                                value={this.state.to}
                                onChange={e => this.setState({ to: e.target.value })}
                            />
                        </Item>
                        <Item>
                            <button
                                onClick={() => {
                                    this.handleHistory()
                                }}
                            >
                                Atualizar Historico
                            </button>
                        </Item>
                    </div>
                </Header >
                <ValueInfos>
                    <div className={'chartDiv'}>

                        {this.state.historyToChart ? this.state.historyToChart.length === 1 ? <p>Grafico Vazio</p> :
                            <Chart
                                width={'100%'}
                                height={'100%'}
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={this.state.historyToChart}
                                options={{
                                    hAxis: {
                                        title: 'Dia',
                                    },
                                    vAxis: {
                                        title: 'Valor',
                                    },
                                }}
                                rootProps={{ 'data-testid': '1' }}
                                chartEvents={[
                                    {
                                        eventName: 'select',
                                        callback: ({ chartWrapper }) => {
                                            const chart = chartWrapper.getChart()
                                            const selection = chart.getSelection()
                                            if (selection.length === 1) {
                                                const [selectedItem] = selection

                                                const { row } = selectedItem


                                                this.setState({ selectedChartItem: this.state.history.prices[row] })


                                                // alert(
                                                //     'You selected : ' +
                                                //     JSON.stringify({
                                                //         row,
                                                //         column,
                                                //         value: dataTable.getValue(row, column),
                                                //     }),
                                                //     null,
                                                //     2,
                                                // )
                                            }
                                            console.log(selection)
                                        },
                                    },
                                ]}
                            /> : this.state.errorHistory ?
                                <p>{this.state.errorHistory}</p> :
                                <p>Carregando Grafico...</p>}

                    </div>
                    <div className={'infosDiv'}>
                        {
                            !this.state.selectedChartItem ?
                                <p style={{ textAlign: 'center' }}>Selecione um item do grafico para mais informaçoes.</p> :
                                <div >
                                    <h4>Abertura</h4>
                                    <p>R$ {this.state.selectedChartItem.opening.toFixed(2)}</p>
                                    <br />
                                    <h4>Baixa</h4>
                                    <p>R$ {this.state.selectedChartItem.low.toFixed(2)}</p>
                                    <br />
                                    <h4>Alta</h4>
                                    <p>R$ {this.state.selectedChartItem.high.toFixed(2)}</p>
                                    <br />
                                    <h4>Fechamento</h4>
                                    <p>R$ {this.state.selectedChartItem.closing.toFixed(2)}</p>
                                    <br />
                                    <h4>Data</h4>
                                    <p>{this.state.selectedChartItem.pricedAt}</p>

                                </div>
                        }


                    </div>

                </ValueInfos>
                <GainsInfos>
                    <div className={"title-gains"}>
                        <h3>Simulação de Ganhos</h3>
                    </div>
                    <div className={'body-gains'}>

                        <div>
                            <label htmlFor="purchasedAmount">Quantidade de Ações</label>
                            <input
                                type="number"
                                id="purchasedAmount"
                                name="purchasedAmount"
                                value={this.state.purchasedAmount}
                                min={0}
                                onChange={e => this.setState({ purchasedAmount: e.target.value >= 0 ? e.target.value : 0 })}
                            /> <br />

                            <label htmlFor="purchasedAt">Data de Compra</label>
                            <input type="date" id="purchasedAt" name="purchasedAt"
                                value={this.state.purchasedAt}
                                max={(new Date()).toISOString().substring(0, 10)}
                                onChange={e => this.setState({ purchasedAt: e.target.value })}
                            />
                        </div>
                        <div className={'divButtonResult'}>


                            <button
                                onClick={() => {
                                    this.handleGains()
                                }}
                            >
                                Simular
                            </button>

                            <div className="divErrorGains">
                                {this.state.errorGains ? <p> {this.state.errorGains} </p> : null}
                            </div>
                        </div>
                        <div className={"divResult"}>
                            <p>Preço de compra </p>
                            <h1>{this.state.gains.priceAtDate.toFixed(2)}</h1>

                        </div>
                        <div className={"divResult"}>
                            <p>Ultimo preço</p>
                            <h1>{this.state.gains.lastPrice.toFixed(2)}</h1>
                        </div>
                        <div className={"divResult"}>
                            <p>Ganho capital</p>
                            <h1>{this.state.gains.capitalGains.toFixed(2)}</h1>
                        </div>
                    </div>

                </GainsInfos>

                <GlobalStyle />
            </Container >
        );

    }
}

export default App;
