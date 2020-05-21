import React from 'react';
import propTypes from 'prop-types';
import './loginImage.css';


const LoginImage = (props) => {
  return (
      <img src={props.image} alt="login_ilustration" className="imageLogin" />
  );
}

LoginImage.propTypes = {
  image: propTypes.string.isRequired,
}


export default LoginImage;
