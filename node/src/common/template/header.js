import React, { useState }  from "react";

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

//import logo from '../../assets/logo.png'
import '../../App.css';

const URLhas= () =>{
    return window.location.pathname
}
const Header = (props) => {

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
                <Nav.Link 
                    className={URLhas().includes("search")?"header-selected":null} 
                    href="search"
                    >Procurar Ação
                </Nav.Link>
                <Nav.Link 
                    className={URLhas().includes("quote")?"header-selected":null} 
                    href="quote"
                    >Cotação
                </Nav.Link>
                <Nav.Link 
                    href="history"
                    className={URLhas().includes("history")?"header-selected":null} 
                    >Histórico
                </Nav.Link>
                <Nav.Link 
                    href="compare"
                    className={URLhas().includes("compare")?"header-selected":null} 
                    >
                        Comparar
                </Nav.Link>
                <Nav.Link 
                    href="project"
                    className={URLhas().includes("project")?"header-selected":null} 
                    >
                        Projetar
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default Header; 