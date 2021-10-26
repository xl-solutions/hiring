import React, {useState, useEffect} from "react";

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

import {
    compareStocks
} from "../api/AppRequests";

const convDateToBr = (date) => {
    if (date)
        return  date.split("-").reverse().join("/");
}

function ListStockInfo(props) {
    const {
        pricedAt,
        lastPrice,
        name
    } = props
    return (            
    <ListGroup>
        <div> Data: {convDateToBr(pricedAt)} </div>
        <ListGroup.Item>Nome: {name}</ListGroup.Item>
        <ListGroup.Item>Fechamento: {lastPrice}</ListGroup.Item>
    </ListGroup>
    )
}

function StockInputs (props) {
    const {
        stockList,
        setStockList
    } = props

    return (
        <>
        {stockList?
            stockList.map((stock, i) =>
                <div>
                    <Form.Control key={`ren${i}`} value={stock} onChange={e => setStockList(i, e.target.value)} type="text" placeholder="Insira uma ação" />
                    <br></br>
                </div>
            )
            :
                null
        }
        </>
    )
    
}

const StockHistory = (props) => {
    const {
        history
    } = props

    return (
        <>
        {history.length>1?
            history.map((dateInfo) =>
                <ListStockInfo
                    pricedAt={dateInfo["pricedAt"]}
                    name={dateInfo["name"]}
                    lastPrice={dateInfo["lastPrice"]}/>)
            :
                null
        }
        </>
    )
}

const Compare = () => {
    const [stockList, setStockList] = useState(["", ""]);
    const [history, setHistory] = useState([""]);
    
    const stockInvalid= () =>{
        return stockList.some( e => (e === "" || e === undefined || e === null))
    }

    const handleQuoteClick = () =>{
        
        if (!stockInvalid()){
            let stocksCompared = compareStocks({stockList});
            stocksCompared.then(
              response => {
                setHistory(response["lastPrices"])
              }
            )
        }else{
            setHistory("")
            alert("Preencha o nome da ação , a data de início e fim")
        }
    }

    const addStock = (value) => {
        setStockList([...stockList, ""])
    }

    const handleStockList = (index, value) => {
        const newArr= stockList.map( (e,i) => index===i? (value): e)
        setStockList(newArr)
    }

    return(
    <Container fluid="sm">
    <Row>
        <Col md={{ span: 8, offset: 2 }}>
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Compare ações</Form.Label>
            <StockInputs 
                stockList={stockList}
                setStockList= {handleStockList}
            />
            <Button onClick={addStock}> + Mais Ações </Button>
            
            <div>
                <Button onClick={handleQuoteClick}> Cotar </Button>
            </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <StockHistory 
                history={history}                
            />
        </Form.Group>
        </Form>
        </Col>
    </Row>
    </Container>
    )
}

export default Compare; 