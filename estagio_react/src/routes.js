import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';


import Albums from './pages/Albums';
import GetPostagens from './pages/Posts';


function Routes (){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/albums" component={Albums}/>
                <Route path="/posts" component={GetPostagens}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;


