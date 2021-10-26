import React, { useState } from "react";

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import {
    quoteStock
} from "../api/AppRequests";

const Search = () => {
    const [tickers, setTickers] = useState("");
    const [lastPrice, setLastPrice] = useState("");
    const [pricedAt, setPricedAt] = useState("");

    const handleResponse = (res) =>{
        if (res){
            if (res.hasOwnProperty("name")){
                setLastPrice(res["lastPrice"]);
                setPricedAt(res["pricedAt"]);
            }
        }else{
            setLastPrice("");
            setPricedAt("");
        }
    }

    const handleClick = () =>{
        if (tickers){
            let findTickers = quoteStock(tickers);
            findTickers.then(
              response => {
                handleResponse(response)
              }
            )
        }else{
            handleResponse("")
        }
    }

    return(
    <Container fluid="sm">
    <Row>
        <Col md={{ span: 8, offset: 2 }}>
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Cotação de uma ação</Form.Label>
            <Form.Control value={tickers} onChange={e => setTickers(e.target.value)} type="text" placeholder="Insira uma ação" />
            <Button onClick={handleClick}> Cotar </Button>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <div>
                <Form.Label>Último preço:</Form.Label> {lastPrice}
            </div>
            <div>
                <Form.Label>Data Cotação:</Form.Label> {pricedAt}
            </div>
        </Form.Group>
        </Form>
        </Col>
    </Row>
    </Container>
    )
}

export default Search; 
