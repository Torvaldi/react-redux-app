import React from 'react';

import AuthLayout from '../components/AuthLayout/AuthLayout';
import Image from '../components/LoginImage/LoginImage';

const Register = (props) => {
    return (
      <AuthLayout
      text={
        "This is the register page"
      }
      left={
        "form"
      }
      right={
        <Image />
      }
      />
    );
}

export default Register;
