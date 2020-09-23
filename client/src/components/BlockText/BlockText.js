import React from 'react';
import propTypes from 'prop-types';
import './blockText.css';


const BlockText = (props) => {
  return (
    <article className="authText">
      <h1 className="authText_title">{props.text}</h1>
    </article>
  );
}

BlockText.prototype = {
  text : propTypes.string.isRequired,
}


export default BlockText;
