import React from 'react';

import propTypes from 'prop-types';
import './blindTestLayout.css';

const BlindTestLayout = (props) => {
  return (
    <section className="blindTestLayout">
          <article className="playerListLayout ">
            {props.left}
          </article>
          <article className="mainGameLayout">
            {props.center}
          </article>
          <article className="chatLayout">
            {props.right}
          </article>
    </section>
  );
}

BlindTestLayout.propTypes = {
  left: propTypes.element.isRequired,
  center: propTypes.element.isRequired,
  right: propTypes.element.isRequired,
}

export default BlindTestLayout;
