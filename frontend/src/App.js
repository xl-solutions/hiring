import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

import Stocks from './components/Stock'
import Button from '@material-ui/core/Button';
import History from './components/History';
import Wallet from './components/Wallet'


import './App.css';


function App() {

  const [data, setData] = useState();
  const [stock_name, setStock_name] = useState("IBM");
  const [history, setHistory] = useState();
  const [datarow, setDataRow] = useState([]);
  const [compareGains, setCompareGains] = useState([]);
  const [projectionGain, setProjectionGain] = useState();

  function click() {
    setStock_name(document.getElementById("stockField").value);
    console.log(stock_name);
    document.getElementById("stockField").value = '';
  }


  function addRow() {
    const row = []
    for (let i = 0; i < 5; i++) {
      let data = {
        id: i,
        pricedAt: history?.['prices'][i]["pricedAt"],
        open: parseFloat(history?.['prices'][i]["opening"]).toFixed(2) || 0,
        low: parseFloat(history?.['prices'][i]['low']).toFixed(2) || 0,
        high: parseFloat(history?.['prices'][i]['high']).toFixed(2) || 0,
        close: parseFloat(history?.['prices'][i]['closing']).toFixed(2) || 0
      }
      row.push(data)
    }

    setDataRow(row)
  }

  function addCompareStocks() {
    const elements = [];

    for (let i = 0; i <= 2; i++) {
      const el = (
        <div className="dataStockWallet">
          <div >{compareGains[i]?.name}</div>
          <div >{compareGains[i]?.lastPrice}</div>
          <div >{compareGains[i]?.pricedAt}</div>
        </div>
      );
      elements.push(el)
    }
    return elements;
  }


  // Use Effects --

  useEffect(() => {
    try {
      if (stock_name !== "") {

        const from = "2021-02-10"
        const to = "2020-05-30"
        axios.get(`stocks/${stock_name}/history?from=${from}&to=${to}`).then(response => {
          let info2 = response.data
          setHistory(info2);
          console.log('history', info2)
        });

        axios.get(`stocks/${stock_name}/quote`).then(response => {
          if (response.status === 200) {
            let info = response.data
            console.log('quote:', info)
            setData(info);

          } else if (response.status === 400) {
            console.log("Wait for an Stock Name !")
          }
        });


        axios.post(`/stocks/IBM/compare`, { "stocks": ["IBM", "IBM", "IBM"] }).then((response) => {
          if (response.status === 200) {
            let info3 = response.data
            setCompareGains(info3)
            console.log('Compare:', info3);
          } else if (response.status === 400) {
            console.log('Wait for stocks')
          }
        })




        axios.get(`stocks/${stock_name}/gains?purchasedAmount=25&purchasedAt=2020-06-30`).then(response => {
          if (response.status === 200) {
            let info4 = response.data
            setProjectionGain(info4)
            console.log('Projection_Gain:', info4);
          } else if (response.status === 400) {
            console.log('Wait for stocks')
          }
        });



      }
    } catch (err) {
      console.error("Quote:", err)
    }

    setStock_name("")
  }, [stock_name]);

  useEffect(() => {

    addRow();

  }, [history])




  return (
    <div id='App'>

      <div id="nav"> {/* className="App-header" */}
        <h1> ! Finance </h1>
        <TextField id="stockField" label="Stock" variant="outlined" />
        <Button className="bt-search" variant="contained" color="primary" onClick={click}> Search </Button>
        <div className="testStocks">
          <div>USIM5.SA</div>
          <div>PETR4.SA</div>
          <div>IBM</div>
        </div>
      </div>


      <div id="bodyApp">
        {/* Stock Data */}
        <div clasName="firstDiv">
          <Stocks
            nome={data?.name}
            price={data?.lastPrice | 0}
            date={data?.pricedAT}
          />

          <div className="stockHistory">
            <History datasrow={datarow} />
          </div>
        </div>


        {/* Wallet */}
        <Wallet
          name={data?.name}
          lastPrice={parseFloat(data?.lastPrice).toFixed(2)}
          pricedAT={data?.pricedAT}
        />

        <div className="div3">

          <div className="divCompare">
            <div className="divCompareGain">
              <div className="divtitle">
                <h3> COMPARE GAINS</h3>
              </div>
              <div className="divCompareStocks">
                <TextField id="stockField1" label="Stock1" variant="outlined" />
                <TextField id="stockField2" label="Stock2" variant="outlined" />
                <TextField id="stockField3" label="Stock3" variant="outlined" />
              </div>
            </div>


            <div className="divValuesStocks">
              {addCompareStocks()}
            </div>
          </div>

          <div className="divprojectionGain">
            <div className="divtitle2">
              <h3> PROJECAO DE GANHOS </h3>
            </div>

            <div className="divValuesStocks">
              <div className="infoProjectionsStocks">  </div>

              <div className="dataStockProjection">
                <div className="dataStockWallet2">
                  <div >Amount</div>
                  <div >{projectionGain?.purchasedAmount | 0}</div>
                </div>

                <div className="dataStockWallet2">
                  <div >PurchasedAt</div>
                  <div > {projectionGain?.purchasedAt}</div>
                </div>

                <div className="dataStockWallet2">
                  <div >Price at Date</div>
                  <div >{projectionGain?.priceAtDate | 0}</div>
                </div>

                <div className="dataStockWallet2">
                  <div >Last Price</div>
                  <div >{(projectionGain?.lastPrice) | 0}</div>
                </div>

                <div className="dataStockWallet2">
                  <div >Capital Gains</div>
                  <div >{projectionGain?.capitalGains}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
