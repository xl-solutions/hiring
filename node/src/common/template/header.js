import React from "react";

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

//import logo from '../../assets/logo.png'

const Header = () => {
    return(
       <Navbar bg="white" expand="lg">
        <Container>
            <Navbar.Brand href="home">
                {/* <img 
                    src={logo}
                    alt="logo"
                /> */}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="search">Procurar Ação</Nav.Link>
                <Nav.Link href="quote">Cotação</Nav.Link>
                <Nav.Link href="history">Histórico</Nav.Link>
                <Nav.Link href="compare">Comparar</Nav.Link>
                <Nav.Link href="project">Projetar</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default Header; 