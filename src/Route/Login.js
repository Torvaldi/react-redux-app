import React from 'react';

import LoginForm from '../containers/form/LoginForm';
import BlockText from '../components/BlockText';
import Image from '../components/LoginImage';

import '../css/loginRoute.css';

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
