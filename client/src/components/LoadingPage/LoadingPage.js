import React from 'react';
import './style.css';
import Loading from 'components/Loading/Loading';

/**
 * @param {*} error boolean
 * @param {*} overlay boolean 
 * @param {*} message string|null
 */
const LoadingPage = ({error, overlay, message}) => {

  let displayError;
  if(error === true){
    displayError = <div><p className="loadingErrorMessage" >An error occured, please refresh the screen</p></div>
  }

  let loadingClass = "loadingScreen page";
  if(overlay === true){
    loadingClass = "loadingScreen LoadingOverlay";
  }

  let displayMessage;
  if(message !== null){
    displayMessage = <div><p className="loadingMessage">message</p></div>
  }

  return(
    <div className={loadingClass}>
      <Loading/>
      {error === true ? displayError : ''}
      {message !== null ? displayMessage : ''}
    </div>
  );
}

LoadingPage.defaultProps = {
  error: false,
  overlay: false,
  message: null
}

export default LoadingPage;
