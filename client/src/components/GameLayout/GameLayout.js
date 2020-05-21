import React from 'react';

import './gameLayout.css';
import propTypes from 'prop-types';

const GameLayout = (props) => {
  return (
    <section className="gameLayout" >
          <article className="listBlock">
            {props.left}
          </article>
          <article className="createBlock">
            {props.right}
          </article>
    </section>
  );
}

GameLayout.propTypes = {
    left: propTypes.element.isRequired,
    right: propTypes.element.isRequired,
}

export default GameLayout;
