import React from 'react';
import { withStyles } from '@material-ui/styles';

import '../css/blockText.css';

const Blocktext = (props) => {
  return (
    <article className="authText">
      <h1 className="title">Lorem ipsum dolor sit amet consectetur </h1>
      <span className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur reprehenderit velit explicabo </span>
    </article>
  );
}

export default Blocktext;
