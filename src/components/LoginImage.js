import React from 'react';

import '../css/loginImage.css';
import image from '../img/login.jpg';

const LoginImage = (props) => {
  return (
      <img src={image} alt="image" className="imageLogin" />
  );
}

export default LoginImage;
