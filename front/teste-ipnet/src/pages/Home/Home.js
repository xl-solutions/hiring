import React from 'react'
import { Title, Container, Username } from './style';
import logo from '../../imgs/github-logo-white.png'
import Form from '../../components/Form';

function Home(props) {

    return(
        <Container>
            <img src={logo} alt=""/>
            <Title>GitHub Search</Title>
            <Form/>
        </Container>
    );
}

export default Home;
