import React from 'react';

import LoginForm from './LoginForm';
import BlockText from '../components/BlockText/BlockText';
import Image from '../components/LoginImage/LoginImage';

import './login.css';  

const Login = (props) => {
  return (
        <section className="authLayout" >
          <article className="authBlock">
            <BlockText />
            <LoginForm />
          </article>
          <article className="imageLayout">
            <Image />
          </article>
        </section>
    );
}

export default Login
