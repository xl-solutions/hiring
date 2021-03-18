import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import Home from './pages/Home/Home';
import InfoUser from './pages/InfoUser/InfoUser';
import Repository from './pages/Repository/Repository';
import Issue from './pages/Issue/Issue';


function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/details" exact component={InfoUser}/>
        <Route path="/repo" component={Repository}/>
        <Route path="/issue" component={Issue}/>
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
