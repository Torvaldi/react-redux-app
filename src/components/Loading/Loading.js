import React, { Fragment } from 'react';
import propTypes from 'prop-types';

import './loading.css';

/**
 * Loading css
 * Source : https://codepen.io/bradtraversy/pen/Xwxvzp & https://www.youtube.com/watch?v=BwhTKJFpKSw
 */
const Loading = (props) => {

  return(
    <Fragment>
      <h1>{props.title}</h1>
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
    </div>
    </Fragment>
  );
}

Loading.propTypes = {
  title: propTypes.string.isRequired,
}

export default Loading;
