import React from 'react';
import {Switch, Route, Redirect} from 'react-router';

import Home from'../components/home/Home';
import Desafio1 from '../components/user/Desafio1';
import Desafio2 from '../components/user/Desafio2';



export default props =>
    <Switch>
        <Route exact path ="/" component={Home}/>
        <Route  path ="/desafio1" component={Desafio1}/>
        <Route  path ="/desafio2" component={Desafio2}/>
        
        <Redirect from='*' to='/' />
    </Switch>
