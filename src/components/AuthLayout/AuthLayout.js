import React from 'react';

import './authLayout.css';
import BlockText from '../BlockText/BlockText';
import propTypes from 'prop-types';

const AuthLayout = (props) => {
  return (
    <section className="authLayout" >
          <article className="authBlock">
            <article class="authBlock_left">
              <BlockText text={props.text} />
              {props.left}
            </article>
          </article>
          <article className="imageLayout">
            {props.right}
          </article>
    </section>
  );
}

AuthLayout.propTypes = {
  text: propTypes.string.isRequired,
  left: propTypes.element.isRequired,
  right: propTypes.element.isRequired,
}

export default AuthLayout;
