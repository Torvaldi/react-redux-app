import './../css/App.css';
import Login from './Login';
import Register from './Register';
import Home from './Home';

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
