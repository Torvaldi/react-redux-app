import Login from './Page/Auth/Login/Login';
import Register from './Page/Auth/Register/Register';
import Home from './Page/Home/Home';
import BlindTest from './Page/BlindTest/BlindTest';
import Game from './Page/Game/Game';

import AuthRoute from './middleware/AuthRoute';

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
