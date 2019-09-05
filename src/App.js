import Login from './LoginPage/Login';
import Register from './RegisterPage/Register';
import Home from './HomePage/Home';
import BlindTest from './BlindTestPage/BlindTest';

import AuthRoute from './Route/AuthRoute';
import Game from './GamePage/Game';

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render(){
    return (
        <BrowserRouter>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route exact path='/game' component={() => <AuthRoute component={Game} />} />
              <Route path='/game/running' component={() => <AuthRoute component={BlindTest} />} />
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
