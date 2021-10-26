import React, {useState} from "react";

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import DatePicker from "react-datepicker";

import {
    projectStock
} from "../api/AppRequests";

import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import pt from 'date-fns/locale/pt';
registerLocale('pt', pt)

const convDateStringTOISO = (date) => {
    return date.toISOString().split("T")[0]
}

const convDateToBr = (date) => {
    console.log("date", date)
    if (date)
        return  date.split("-").reverse().join("/");
}

const Project = () => {
    const [stockName, setStockName] = useState(null);
    const [purchasedAmount, setPurchasedAmount] = useState(null);
    const [purchasedAtN, setPurchasedAt] = useState(null);
    const [gainsProjected, setGainsProjected] = useState(null);

    const handleClick = () =>{
        // console.log(stockName)
        // console.log(purchasedAmount)
        // console.log(convDateStringTOISO(purchasedAt))
        let purchasedAt= convDateStringTOISO(purchasedAtN)
        if (stockName && purchasedAmount && purchasedAtN){
            let gains = projectStock({stockName, purchasedAmount, purchasedAt});
            gains.then(
              response => {
                setGainsProjected(response)
              }
            )
        }else{
            setGainsProjected(null)
        }
    }

    return(
    <Container fluid="sm">
    <Row>
        <Col md={{ span: 8, offset: 2 }}>
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Projetar uma ação</Form.Label>
            <Form.Control 
                value={stockName} 
                onChange={e => setStockName(e.target.value)} 
                type="text" 
                placeholder="Insira uma ação" />
            <Form.Label>Quantidade:</Form.Label>
            <Form.Control 
                value={purchasedAmount} 
                onChange={e => setPurchasedAmount(e.target.value)} 
                type="text" 
                placeholder="Insira a quantidade comprada:" />
            <Form.Label>Data da compra:</Form.Label>
            <DatePicker 
                locale="pt" 
                dateFormat= 'dd/MM/yyyy' 
                selected={purchasedAtN} 
                onChange={(purchasedAtN) => setPurchasedAt(purchasedAtN)} />
            <Button onClick={handleClick}> Projetar </Button>
        </Form.Group>
        {(gainsProjected)?
            <ListGroup>
                <div> Nome:  {gainsProjected["name"]} </div>
                <ListGroup.Item>Data da compra: {convDateToBr(gainsProjected["purchasedAt"])}</ListGroup.Item>
                <ListGroup.Item>Preço na data: {gainsProjected["priceAtDate"]}</ListGroup.Item>
                <ListGroup.Item>Quantidade: {gainsProjected["purchasedAmount"]}</ListGroup.Item>
                <ListGroup.Item>Último preço: {gainsProjected["lastPrice"]}</ListGroup.Item>
                <ListGroup.Item>
                    {gainsProjected["capitalGains"]>=0? "Ganhos ": "Perdas: "}
                    {gainsProjected["capitalGains"]}
                </ListGroup.Item>
            </ListGroup>
        :
            null
        }
        </Form>
        </Col>
    </Row>
    </Container>
    )
}

export default Project; 
