import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Beta Test</h1>
        

        <Link to="/login">Login</Link>
        <br/>
         <Link to="/register">Register</Link>


      </div>
    );
  }
}

export default Home;
