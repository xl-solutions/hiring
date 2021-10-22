import React from "react";

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import NavbarBrand from 'react-bootstrap/NavbarBrand'

import '../../styles/Home.css';

const Footer = (props) => {
    const{
        count
    } = props
    return(
        <div className="sto-footer">  
            <Navbar color="dark">
                <Container>
                    <NavbarBrand  data-testid="footer-navbrand">
                        <span className="footer-counter">Contador: {count}</span>
                    </NavbarBrand>
                </Container>
            </Navbar>
        </div>
    )
}

export default Footer; 
