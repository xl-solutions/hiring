import React, { Component } from 'react';
import { Table, Container, Row, Col, Button, Input, Form, FormGroup, Alert } from 'reactstrap';
import axios from 'axios';
import api from '../services/api';
import './App.css';
import Header from './Header';
import SectionTitle from './SectionTitle';
import Options from './Options';

class App extends Component {
    constructor() {
        super();
        this.state = {
            actionName: '',
            stocks: [],
            visible: true,
            errorMessage: '',
            alertLevel: 'danger',
            showHistory: false,
            showProjectGains: false,
            showCompare: false,
            actionHistory: {
                stockName: '',
                from: '',
                to: '',
            },
            actionHistoryResults: {},
            selectedMethod: 'Nenhuma ação selecionada',
            actionProjectGains: {
                stockName: '',
                purchasedAmount: 0,
                purchasedAt: '',
            },
            actionProjectGainsResults: {},
        };

        this.addAction = this.addAction.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.handleHistory = this.handleHistory.bind(this);
        this.handleProjectGains = this.handleProjectGains.bind(this);
        this.showHistoryForm = this.showHistoryForm.bind(this);
        this._retrieveActions = this._retrieveActions.bind(this);
        this._validateDuplicatedStocks = this._validateDuplicatedStocks.bind(this);
        this._validateEmptyStock = this._validateEmptyStock.bind(this);
    }

    _validateDuplicatedStocks(actionName) {
        let isValid = true;

        if (!this.state.stocks.length) {
            return isValid;
        }

        this.state.stocks.forEach((stock) => {
            if (stock.name === actionName) {
                this.setState({ errorMessage: 'Ação já adicionada', alertLevel: 'danger', visible: true });
                isValid = false
            }
        });

        return isValid;

    }

    _validateEmptyStock() {
        const actionName = this.state.actionName;

        if (!actionName) {
            this.setState({ errorMessage: 'Insira o nome da ação', alertLevel: 'danger', visible: true });
            return false;
        }

        return true;
    }

    _removeAction(actionName) {
        const actions = localStorage.getItem('actions');
        let actionsDecoded = JSON.parse(actions);
        const index = actionsDecoded.indexOf(actionName);
        actionsDecoded.splice(index, 1);
        localStorage.setItem('actions', JSON.stringify(actionsDecoded));
    }

    _saveAction(actionName) {
        const actions = localStorage.getItem('actions');
        let actionsDecoded = [];

        if (actions) {
            actionsDecoded = JSON.parse(actions);
        }

        actionsDecoded.push(actionName);
        localStorage.setItem('actions', JSON.stringify(actionsDecoded))
    }

     _retrieveActions() {
        const actions = localStorage.getItem('actions');

        if (!actions) {
            return false;
        }

        const actionsDecoded = JSON.parse(actions);

        const requests = actionsDecoded.map((action) => {
            return api.get(`/stocks/${action}/quote`);
        });

        axios.all(requests)
            .then((results) => {
                const stocks = [];
                results.forEach((result) => {
                    stocks.push(result.data);
                });
                this.setState({ stocks });
            })
            .catch((err) => {
                console.log(err);
                localStorage.clear();
            });
    }

    componentDidMount() {
        this._retrieveActions();
    }

    addAction(event) {
        event.preventDefault();
        const actionName = this.state.actionName;

        const validateDuplicated = this._validateDuplicatedStocks(actionName);
        const validateEmpty = this._validateEmptyStock();

        if (!validateDuplicated || !validateEmpty) {
            return false;
        }

        api.get(`/stocks/${actionName}/quote`)
            .then((res) => {
                const stocks = this.state.stocks;
                stocks.push(res.data);
                this._saveAction(actionName);
                this.setState({ stocks });
            })
            .catch((err) => {
                let errors = {...err};
                const message = errors.response.data.message;
                console.log(message);
                this.setState({ errorMessage: message, alertLevel: 'danger', visible: true });
            });
    }

    handleChange(event, key) {
        key = key || '';

        event.preventDefault();

        const inputName = event.target.name;
        const inputValue = event.target.value;

        if (key) {
            const state = this.state[key];
            state[inputName] = inputValue;
            this.setState({[key]: state});
            return;
        }

        this.setState({
            [inputName]: event.target.value,
            errorMessage: '',
            visible: false,
        });
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    showHistoryForm(event, actionName) {
        event.preventDefault();
        const actionHistory = this.state.actionHistory;
        actionHistory.stockName = actionName;
        this.setState({
            actionHistory,
            selectedMethod: `Histórico de preços: ${actionName}`,
            actionHistoryResults: {},
            actionProjectGainsResults: {},
            showHistory: true,
            showProjectGains: false,
        });
    }

    showProjectGainsForm(event, actionName) {
        event.preventDefault();
        const actionProjectGains = this.state.actionProjectGains;
        actionProjectGains.stockName = actionName;
        this.setState({
            actionProjectGains,
            selectedMethod: `Projeção de ganhos: ${actionName}`,
            actionHistoryResults: {},
            actionProjectGainsResults: {},
            showProjectGains: true,
            showHistory: false,
        });
    }

    handleHistory(event) {
        event.preventDefault();
        const actionName = this.state.actionHistory.stockName;
        const from = this.state.actionHistory.from;
        const to = this.state.actionHistory.to;

        api.get(`/stocks/${actionName}/history?from=${from}&to=${to}`)
            .then((res) => {
                this.setState({ actionHistoryResults: res.data });
            })
            .catch((err) => {
                let errors = {...err};
                const message = errors.response.data.message;
                this.setState({ errorMessage: message, alertLevel: 'danger', visible: true });
            })
    }

    handleProjectGains(event) {
        event.preventDefault();
        const actionName = this.state.actionProjectGains.stockName;
        const purchasedAmount = this.state.actionProjectGains.purchasedAmount;
        const purchasedAt = this.state.actionProjectGains.purchasedAt;

        api.get(`/stocks/${actionName}/gains?purchasedAmount=${purchasedAmount}&purchasedAt=${purchasedAt}`)
            .then((res) => {
                this.setState({ actionProjectGainsResults: res.data });
            })
            .catch((err) => {
                let errors = {...err};
                const message = errors.response.data.message;
                this.setState({ errorMessage: message, alertLevel: 'danger', visible: true });
            })
    }

    removeAction(event, actionName) {
        event.preventDefault();
        this._removeAction(actionName);
        this._retrieveActions();
    }

    render() {
        const stockRows = () => {
            if (!this.state.stocks.length) {
                return (
                    <tr>
                        <td className="text-center" colSpan={5}>
                            Nenhuma ação adicionada
                        </td>
                    </tr>
                );
            }

            return this.state.stocks.map((stock) => {
                return (
                    <tr key={ stock.name }>
                        <td>{ stock.name.toUpperCase() }</td>
                        <td>R$ { stock.lastPrice }</td>
                        <td>{ stock.pricedAt }</td>
                        <td className="text-center">
                            <Button onClick={ (event) => { this.showHistoryForm(event, stock.name); } }>Ver histórico</Button>
                            <Button onClick={ (event) => { this.showProjectGainsForm(event, stock.name); } }>Projetar ganhos</Button>
                            <Button color="danger" outline onClick={ (event) => { this.removeAction(event, stock.name); } }>Remover</Button>
                        </td>
                    </tr>
                );
            });
        };

        const stockRowsHistory = () => {
            if (!this.state.actionHistoryResults.prices) {
                return (
                    <tr>
                        <td className="text-center" colSpan={5}>
                            Nenhuma ação adicionada
                        </td>
                    </tr>
                );
            }

            return this.state.actionHistoryResults.prices.map((stock, index) => {
                return (
                    <tr key={ index }>
                        <td>R$ { stock.opening }</td>
                        <td>R$ { stock.low }</td>
                        <td>R$ { stock.high }</td>
                        <td>R$ { stock.closing }</td>
                        <td>{ stock.pricedAt }</td>
                    </tr>
                );
            });
        };

        const stockRowsProjectGains = () => {
            if (!Object.keys(this.state.actionProjectGainsResults).length) {
                return (
                    <tr>
                        <td className="text-center" colSpan={5}>
                            Nenhuma ação adicionada
                        </td>
                    </tr>
                );
            }

            return (
                <tr>
                    <td>{ this.state.actionProjectGainsResults.name }</td>
                    <td>{ this.state.actionProjectGainsResults.purchasedAmount }</td>
                    <td>{ this.state.actionProjectGainsResults.purchasedAt }</td>
                    <td>{ this.state.actionProjectGainsResults.priceAtDate }</td>
                    <td>{ this.state.actionProjectGainsResults.lastPrice }</td>
                    <td>{ this.state.actionProjectGainsResults.capitalGains }</td>
                </tr>
            );
        };

        return (
            <div className="app">
                <Header title="Aplicação da bolsa de valores" />
                <Container>
                    <SectionTitle title="Meu portfólio" />
                    {
                        this.state.errorMessage ?
                            <Row>
                                <Col sm={12}>
                                    <Alert color={ this.state.alertLevel } isOpen={this.state.visible} toggle={this.onDismiss}>
                                        { this.state.errorMessage }
                                    </Alert>
                                </Col>
                            </Row> :
                            ''
                    }
                    <Row>
                        <Col sm={12}>
                            <Table className="app-stock-table">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Último preço</th>
                                        <th>Data de fechamento</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { stockRows(this.state.stocks) }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <Options>
                                <Form onSubmit={ this.addAction } inline>
                                    <FormGroup>
                                        <Input
                                            type="text"
                                            name="actionName"
                                            placeholder="Adicionar ação -  ex: VALE5"
                                            value={ this.state.actionName }
                                            onChange={ this.handleChange } />
                                        <Button type="submit">Adicionar ao portfólio</Button>
                                    </FormGroup>
                                </Form>
                            </Options>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <SectionTitle title={ this.state.selectedMethod } />
                            {
                                this.state.showHistory ?
                                    <Form onSubmit={ this.handleHistory } inline>
                                        <FormGroup>
                                            <Input
                                                type="text"
                                                name="from"
                                                placeholder="Data ínicio - ex: 2017-08-30"
                                                value={ this.state.actionHistory.from }
                                                onChange={ (event) => { this.handleChange(event, 'actionHistory') } } />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input
                                                type="text"
                                                name="to"
                                                placeholder="Data final - ex: 2017-09-01"
                                                value={ this.state.actionHistory.to }
                                                onChange={ (event) => { this.handleChange(event, 'actionHistory') } } />
                                            <Button type="submit">Buscar</Button>
                                        </FormGroup>
                                    </Form> : ''
                            }
                            {
                                Object.keys(this.state.actionHistoryResults).length ?
                                    <Table className="app-stock-table">
                                        <thead>
                                        <tr>
                                            <th>Abertura</th>
                                            <th>Baixa</th>
                                            <th>Alta</th>
                                            <th>Fechada</th>
                                            <th>Data de fechamento</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            { stockRowsHistory() }
                                        </tbody>
                                    </Table> : ''
                            }

                            {
                                this.state.showProjectGains ?
                                    <Form onSubmit={ this.handleProjectGains } inline>
                                        <FormGroup>
                                            <Input
                                                type="number"
                                                name="purchasedAmount"
                                                placeholder="Quantidade adquirida"
                                                value={ this.state.actionProjectGains.purchasedAmount }
                                                onChange={ (event) => { this.handleChange(event, 'actionProjectGains') } } />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input
                                                type="text"
                                                name="purchasedAt"
                                                placeholder="Data da compra - ex: 2017-08-30"
                                                value={ this.state.actionProjectGains.purchasedAt }
                                                onChange={ (event) => { this.handleChange(event, 'actionProjectGains') } } />
                                            <Button type="submit">Projetar ganhos</Button>
                                        </FormGroup>
                                    </Form> : ''
                            }
                            {
                                Object.keys(this.state.actionProjectGainsResults).length ?
                                    <Table className="app-stock-table">
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Quantidade adquirida</th>
                                                <th>Data de aquisição</th>
                                                <th>Preço adquirido</th>
                                                <th>Preço recente</th>
                                                <th>Ganho projetado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { stockRowsProjectGains() }
                                        </tbody>
                                    </Table> : ''
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
