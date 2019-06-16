import Login from './LoginPage/Login';
import Register from './RegisterPage/Register';
import Home from './HomePage/Home';

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
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
