import React, {useState, useEffect} from "react";

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {
    searchTickers
} from "../api/AppRequests";

const Search = () => {
    const [tickers, setTickers] = useState("");
    const [foundTickers, setFoundTickers] = useState("");

    useEffect(() => {
        if (tickers){
            let findTickers = searchTickers(tickers);
            findTickers.then(
              response => {
                (response)?
                    setFoundTickers(response.map(e => e["1. symbol"]))
                :
                    setFoundTickers("Not Found")
              }
            )
        }else{
            setFoundTickers("")
        }
    }, [tickers])

    return(
    <Container fluid="sm">
    <Row>
        <Col md={{ span: 8, offset: 2 }}>
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Busque por uma ação</Form.Label>
            <Form.Control value={tickers} onChange={e => setTickers(e.target.value)} type="text" placeholder="Insira uma ação" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Tickers Encontrados</Form.Label>
            <Form.Control as="textarea" value={foundTickers} rows={3} readOnly/>
        </Form.Group>
        </Form>
        </Col>
    </Row>
    </Container>
    )
}

export default Search; 