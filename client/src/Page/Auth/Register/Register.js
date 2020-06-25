import React, { Component } from 'react';

import AuthLayout from 'components/AuthLayout/AuthLayout';
import Image from 'components/LoginImage/LoginImage';
import ImageLogin from 'asset/login.jpg';
import RegisterForm from './RegisterForm';
import { isLogIn } from 'helper/auth';
import { withRouter, Redirect } from 'react-router-dom';

class Register extends Component {

  render(){

    // prevent from accessing the page if the user is already log in
    isLogIn().then((response) => {

      if(response === false) return
      
      this.props.history.push('/game');
      return <Redirect to="/game" />
  
    });

    return (
      <AuthLayout
      text={
        "This is the register page"
      }
      left={
        <RegisterForm />
      }
      right={
        <Image image={ImageLogin} />
      }
      />
    );
  }
}

export default withRouter(Register);
