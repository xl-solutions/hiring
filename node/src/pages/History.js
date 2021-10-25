import React, {useState, useEffect} from "react";

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import DatePicker from "react-datepicker";

import {
    historyStock
} from "../api/AppRequests";

import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import pt from 'date-fns/locale/pt';
registerLocale('pt', pt)

const convDateStringTOISO = (date) => {
    return date.toISOString().split("T")[0]
}

const convDateToBr = (date) => {
    return  date.split("-").reverse().join("/");
}

function ListStockInfo(props) {
    const {
        pricedAt,
        opening,
        low,
        high,
        closing
    } = props
    return (            
    <ListGroup>
        <div> Data: {convDateToBr(pricedAt)} </div>
        <ListGroup.Item>Abertura: {opening}</ListGroup.Item>
        <ListGroup.Item>Mínima: {low}</ListGroup.Item>
        <ListGroup.Item>Maxima: {high}</ListGroup.Item>
        <ListGroup.Item>Fechamento: {closing}</ListGroup.Item>
    </ListGroup>
    )
  }

const StockHistory = (props) => {
    const {
        history
    } = props

    return (
        <>
        {history?
            history.map((dateInfo) =>
                <ListStockInfo 
                    pricedAt={dateInfo["pricedAt"]}
                    opening={dateInfo["opening"]}
                    low={dateInfo["low"]}
                    high={dateInfo["high"]}
                    closing={dateInfo["closing"]}/>)
            :
            null
        }
        </>
    )
    
}


const History = () => {
    const [ticker, setTicker] = useState("");
    const [history, setHistory] = useState("");
    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());

    const handleClick = () =>{
        let fromConv = convDateStringTOISO(from)
        let toConv = convDateStringTOISO(to)
        
        if (ticker && fromConv && toConv){
            let findHistory = historyStock({ticker, fromConv, toConv});
            findHistory.then(
              response => {
                setHistory(response)
              }
            )
        }else{
            setHistory("")
            alert("Preencha o nome da ação , a data de início e fim")
        }
    }

    return(
    <Container fluid="sm">
    <Row>
        <Col md={{ span: 8, offset: 2 }}>
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Histórico de uma ação</Form.Label>
            <Form.Control value={ticker} onChange={e => setTicker(e.target.value)} type="text" placeholder="Insira uma ação" />
            
            <Form.Label>Data Início:</Form.Label> 
            <DatePicker locale="pt" dateFormat= 'dd/MM/yyyy' selected={from} onChange={(date) => setFrom(date)} />
            <Form.Label>Data Fim:</Form.Label>
            <DatePicker locale="pt" dateFormat= 'dd/MM/yyyy' selected={to} onChange={(date) => setTo(date)} />
            <div>
                <Button onClick={handleClick}> Cotar </Button>
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

export default History; 

