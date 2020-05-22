import React, { Component }from 'react';

import LoginForm from './LoginForm';
import Image from '../components/LoginImage/LoginImage';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import image from '../asset/login.jpg';
import { isLogIn } from './../helper/auth';
import { withRouter } from 'react-router-dom';

class Login extends Component {

  render(){

    // prevent from accessing the page if the user is already log in
    isLogIn().then((response) => {

    if(response === false) return
    
    this.props.history.push('/game');

    });

    return (
        <AuthLayout
        text={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vesti"
        }
        left={
          <LoginForm />
        } 
        right={
          <Image image={image} />
        }
        />
    );
}
  }
  

export default withRouter(Login)
