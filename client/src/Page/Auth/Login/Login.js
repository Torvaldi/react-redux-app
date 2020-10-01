import React, { Component }from 'react';

import LoginForm from './LoginForm';
import Image from '../../../components/LoginImage/LoginImage';
import AuthLayout from '../../../components/AuthLayout/AuthLayout';
import image from '../../../asset/login.jpg';
import { isLogIn } from '../../../helper/auth';
import { withRouter, Redirect } from 'react-router-dom';

class Login extends Component {

  render(){

    // prevent from accessing the page if the user is already log in
    isLogIn().then((response) => {

      if(response === false) return
      
      return <Redirect to="/game" />

    });

    return (
        <AuthLayout
        text={
          "Login / Sign-in"
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
