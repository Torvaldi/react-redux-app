import React from 'react';

import AuthLayout from '../components/AuthLayout/AuthLayout';
import Image from '../components/LoginImage/LoginImage';
import ImageLogin from '../asset/login.jpg';
import RegisterForm from './RegisterForm';

const Register = (props) => {
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

export default Register;
