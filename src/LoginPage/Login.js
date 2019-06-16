import React from 'react';

import LoginForm from './LoginForm';
import Image from '../components/LoginImage/LoginImage';
import AuthLayout from '../components/AuthLayout/AuthLayout';
  

const Login = (props) => {
  return (
        <AuthLayout
        text={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vesti"
        }
        left={
          <LoginForm />
        } 
        right={
          <Image />
        }
        />
    );
}

export default Login
