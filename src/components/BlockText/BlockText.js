import React from 'react';

import './blockText.css';

const Blocktext = (props) => {
  return (
    <article className="authText">
      <h1 className="title">Lorem ipsum dolor sit amet consectetur </h1>
      <span className="text">{props.text}</span>
    </article>
  );
}

export default Blocktext;
