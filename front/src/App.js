import React, { Component } from 'react'
import http from './services/httpService'
import { FaMoon, FaSun } from 'react-icons/fa'
import * as Yup from 'yup'

import {
  Modal,
  Alert,
  Col,
  Row,
  Spinner,
  Table,
  Container,
  Button,
} from 'react-bootstrap'
import { ErrorMessage, Field } from 'formik'

import './App.css'
import AppForm from './forms/AppForm'
import Header from './components/Header'
import Switch from '@material-ui/core/Switch'

class App extends Component {
  constructor() {
    super()
    this.state = {
      stocks: [],
      stockHis: [],
      history: [],
      showHistory: false,
      historyData: {},
      stockGains: [],
      gains: [],
      showGains: false,
      gainsData: {},
      spinner: false,
      thereIsErro: false,
      thereIsErroMessage: '',
      thereIsErroVariant: '',
      theme: localStorage.getItem('theme'),
      switchState: localStorage.getItem('theme') == 'dark' ? true : false,
    }

    this.addStock = this.addStock.bind(this)
    this.renderHistoryTable = this.renderHistoryTable.bind(this)
    this.historyModal = this.historyModal.bind(this)
    this.changeHistory = this.changeHistory.bind(this)
    this.gainsModal = this.gainsModal.bind(this)
    this.changeGains = this.changeGains.bind(this)
    this.handleThemeChange = this.handleThemeChange.bind(this)
  }

  validationSchemaStock = Yup.object().shape({
    stockName: Yup.string().required(),
  })
  validationSchemaHistory = Yup.object().shape({
    initialDate: Yup.date().required(),
    finalDate: Yup.date().required(),
  })
  validationSchemaGains = Yup.object().shape({
    quantity: Yup.number().required().positive().integer(),
    purchasedAt: Yup.date().required(),
  })

  handleThemeChange = () => {
    this.setState({ switchState: !this.state.switchState })
    if (this.state.theme === 'light') {
      this.setState({ theme: 'dark' })
      localStorage.setItem('theme', 'dark')
    } else {
      this.setState({ theme: 'light' })
      localStorage.setItem('theme', 'light')
    }
  }

  _preventDuplicates(stockName) {
    for (let stock of this.state.stocks) {
      if (this.state.stocks.length == 0) return true
      if (stock.name.toUpperCase() == stockName.toUpperCase()) {
        this.setState({
          thereIsErroMessage: 'Already inserted',
          thereIsErroVariant: 'warning',
          thereIsErro: true,
        })

        return false
      }
    }
    return true
  }

  async addStock(values) {
    const stocks = this.state.stocks
    let ret
    if (!this._preventDuplicates(values.stockName)) return
    try {
      ret = await http.get(`/stocks/${values.stockName}/quote`)
      stocks.push(ret.data)
      this.setState({ stocks })
    } catch (e) {
      this.setState({
        thereIsErroMessage:
          'Something went wrong! Try another stock. (Ex: TTT, IBM)',
        thereIsErroVariant: 'warning',
        thereIsErro: true,
      })

      console.log('Problem adding stock')
    }
  }

  renderStockTable() {
    if (this.state.stocks.length === 0) return null
    return (
      <Table variant={this.state.theme} striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Price</th>
            <th>Close Date</th>
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>{this.stockData()}</tbody>
      </Table>
    )
  }

  stockData() {
    const handleShowHistory = (stock) =>
      this.setState({ showHistory: true, stockHis: stock })
    const handleShowGains = (stock) =>
      this.setState({ showGains: true, stockGains: stock })
    const handleRemoveStock = (stock) => {
      let newStock = this.state.stocks.filter((item) => item.name !== stock)
      this.setState({ stocks: newStock })
    }
    return this.state.stocks.map((stock) => {
      return (
        <tr key={stock.name}>
          <td>{stock.name.toUpperCase()}</td>
          <td>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(stock.lastPrice)}
          </td>
          <td>{stock.pricedAt}</td>
          <td>
            <Row>
              <Col>
                <Button
                  variant='warning'
                  onClick={() => handleShowHistory(stock.name)}
                >
                  History
                </Button>
              </Col>
              <Col>
                <Button
                  variant='primary'
                  onClick={() => handleShowGains(stock.name)}
                >
                  Gains
                </Button>
              </Col>
              <Col>
                <Button
                  variant='danger'
                  onClick={() => handleRemoveStock(stock.name)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          </td>
        </tr>
      )
    })
  }

  historyModal() {
    const handleClose = () => this.setState({ showHistory: false })
    return (
      <>
        <Modal
          show={this.state.showHistory}
          onHide={handleClose}
          backdrop='static'
          keyboard={false}
        >
          <AppForm
            handleSubmit={this.changeHistory}
            initialValues={{ initialDate: '', finalDate: '' }}
            validationSchema={this.validationSchemaHistory}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Stock Name :{this.state.stockHis} - History
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='Form-Group'>
                <div htmlFor='initialDates'>Initial Date</div>
                <Field
                  autoComplete='off'
                  className='Form-Field'
                  name='initialDate'
                  placeholder='YYYY-MM-DD'
                  type='date'
                />
                <ErrorMessage name='initialDate' />
                <div>Final Date</div>
                <Field
                  autoComplete='off'
                  className='Form-Field'
                  name='finalDate'
                  placeholder='YYYY-MM-DD'
                  type='date'
                />
                <ErrorMessage name='finalDate' />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button color='danger' type='submit'>
                Get History
              </Button>
              {this.spin()}

              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </AppForm>
        </Modal>
      </>
    )
  }

  async changeHistory(values) {
    let history = this.state.history
    let ret

    try {
      this.setState({ spinner: true })
      ret = await http.get(
        `/stocks/${this.state.stockHis}/history?from=${values.initialDate}&to=${values.finalDate}`
      )

      history = ret.data
      this.setState({ history: history, historyData: { values } })
      if (history.prices.length == 0) {
        this.setState({
          thereIsErroMessage:
            'There is no stock value inside this period of time',
          thereIsErroVariant: 'danger',
          thereIsErro: true,
        })
      }
      this.setState({ showHistory: false, gains: [] })
    } catch (e) {
      console.log('Problem changing history')
    }
    this.setState({ spinner: false })
  }

  renderHistoryTable() {
    if (this.state.history.length === 0) {
      return
    }
    return (
      <>
        <h2>
          History for the Stock : {this.state.stockHis} (
          {this.state.historyData.values.initialDate} to{' '}
          {this.state.historyData.values.finalDate} )
        </h2>
        <Table variant={this.state.theme} striped bordered hover>
          <thead>
            <tr>
              <th>Opening</th>
              <th>Low</th>
              <th>High</th>
              <th>Closing</th>
              <th>Priced At (YYYY-MM-DD)</th>
            </tr>
          </thead>
          <tbody>{this.historyData()}</tbody>
        </Table>
      </>
    )
  }

  historyData() {
    if (this.state.history.prices.length == 0) return

    return this.state.history.prices.map((history, index) => {
      return (
        <tr key={index}>
          <td>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(history.opening)}
          </td>
          <td>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(history.low)}{' '}
          </td>
          <td>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(history.high)}{' '}
          </td>
          <td>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(history.closing)}{' '}
          </td>
          <td>{history.pricedAt}</td>
        </tr>
      )
    })
  }

  gainsModal() {
    const handleClose = () => this.setState({ showGains: false })
    return (
      <>
        <Modal
          show={this.state.showGains}
          onHide={handleClose}
          backdrop='static'
          keyboard={false}
        >
          <AppForm
            handleSubmit={this.changeGains}
            initialValues={{ purchasedAt: '', quantity: '' }}
            validationSchema={this.validationSchemaGains}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Stock Name : {this.state.stockGains} - Gains
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='Form-Group'>
                <div htmlFor='initialDates'>Initial Date</div>
                <Field
                  autoComplete='off'
                  className='Form-Field'
                  name='purchasedAt'
                  placeholder='YYYY-MM-DD'
                  type='date'
                />
                <ErrorMessage name='purchasedAt' />

                <div>Quantity</div>
                <Field
                  autoComplete='off'
                  className='Form-Field'
                  name='quantity'
                  placeholder='Ex: 50'
                  type='number'
                />
                <ErrorMessage name='quantity' />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button color='danger' type='submit'>
                Project Gains
              </Button>
              {this.spin()}
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </AppForm>
        </Modal>
      </>
    )
  }

  async changeGains(values) {
    let gains = this.state.gains
    let ret
    this.setState({ spinner: true })
    try {
      ret = await http.get(
        `/stocks/${this.state.stockGains}/gains?purchasedAmount=${values.quantity}&purchasedAt=${values.purchasedAt}`
      )

      gains = ret.data

      if (JSON.stringify(gains).includes('Maybe')) {
        this.setState({
          thereIsErroMessage:
            'There is no stock value inside this period of time',
          thereIsErroVariant: 'danger',
          thereIsErro: true,
        })
        this.setState({ spinner: false })
        this.setState({ showGains: false })
        return
      }

      this.setState({ gains })
      this.setState({ showGains: false, history: [] })
    } catch (e) {
      console.log('Problem changing gains projection')
    }
    this.setState({ spinner: false })
  }

  renderGainsTable() {
    if (this.state.gains.length === 0) {
      return
    }
    return (
      <>
        <h2>Gains for the Stock : {this.state.stockGains}</h2>
        <Table variant={this.state.theme} striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Capital Gains</th>
              <th>Purchased Date</th>
              <th>Purchased Price</th>
              <th>Recent Price</th>
            </tr>
          </thead>
          <tbody>{this.gainsData()}</tbody>
        </Table>
      </>
    )
  }

  gainsData() {
    //if (this.state.history.prices.length == 0) return

    return (
      <tr>
        <td>{this.state.gains.name}</td>
        <td>{this.state.gains.purchasedAmount}</td>
        <td>{this.state.gains.capitalGains}</td>
        <td>{this.state.gains.purchasedAt}</td>
        <td>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(this.state.gains.priceAtDate)}
        </td>
        <td>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(this.state.gains.lastPrice)}
        </td>
      </tr>
    )
  }

  AppAlert() {
    if (this.state.thereIsErro) {
      return (
        <Alert
          variant={this.state.thereIsErroVariant}
          onClose={() => this.setState({ thereIsErro: false })}
          dismissible
        >
          <Alert.Heading>{this.state.thereIsErroMessage}</Alert.Heading>
          <p></p>
        </Alert>
      )
    }
  }

  spin() {
    if (!this.state.spinner) return <></>
    return <Spinner animation='border' />
  }

  render() {
    return (
      <div className='App'>
        <Header title='Stock Controller' />
        <Switch
          checked={this.state.switchState}
          onChange={this.handleThemeChange}
          color='primary'
        />
        {this.state.theme == 'dark' ? <FaMoon /> : <FaSun />}
        <Container className='borda'>
          {this.AppAlert()}

          <AppForm
            validationSchema={this.validationSchemaStock}
            handleSubmit={this.addStock}
            initialValues={{ stockName: '' }}
          >
            <div>
              <Field
                className='textInput'
                autoComplete='off'
                name='stockName'
                placeholder='Stock Name (Ex: IBM)'
                type='text'
              />
              <ErrorMessage name='stockName' />
            </div>

            <Button color='danger' type='submit'>
              Add Stock
            </Button>
          </AppForm>
          {this.renderStockTable()}
          {this.historyModal()}
          {this.gainsModal()}
          {this.renderHistoryTable()}
          {this.renderGainsTable()}
        </Container>
      </div>
    )
  }
}

export default App
