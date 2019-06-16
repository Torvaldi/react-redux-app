import React from 'react';

import './alerte.css';

const Alert = (props) => {
  return (
    <article className="alertBlock">
      <span className="alertText">{props.message}</span>
    </article>
  );
}

export default Alert;
