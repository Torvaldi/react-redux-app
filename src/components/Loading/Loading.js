import React, { Fragment } from 'react';
import './loading.css';

/**
 * Loading css
 * Source : https://codepen.io/bradtraversy/pen/Xwxvzp & https://www.youtube.com/watch?v=BwhTKJFpKSw
 */
const Loading = (props) => {

  return(
    <Fragment>
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
    </div>
    </Fragment>
  );
}

export default Loading;
