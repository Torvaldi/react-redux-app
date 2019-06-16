import React from 'react';

import './loginImage.css';
import image from './login.jpg';

const LoginImage = (props) => {
  return (
      <img src={image} alt="image" className="imageLogin" />
  );
}

export default LoginImage;
