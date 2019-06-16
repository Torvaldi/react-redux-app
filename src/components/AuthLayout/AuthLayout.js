import React from 'react';

import './authLayout.css';
import BlockText from '../BlockText/BlockText';

const AuthLayout = (props) => {
  return (
    <section className="authLayout" >
          <article className="authBlock">
            <BlockText text={props.text} />
            {props.left}
          </article>
          <article className="imageLayout">
            {props.right}
          </article>
    </section>
  );
}

export default AuthLayout;
