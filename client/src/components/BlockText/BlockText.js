import React from 'react';
import propTypes from 'prop-types';
import './blockText.css';


const BlockText = (props) => {
  return (
    <article className="authText">
      <h1 className="authText_title">Lorem ipsum dolor sit amet consectetur </h1>
      <span className="authText_text">{props.text}</span>
    </article>
  );
}

BlockText.prototype = {
  text : propTypes.string.isRequired,
}


export default BlockText;
