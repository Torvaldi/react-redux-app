import React from 'react';
import {tokenVerify, getCookie} from '../helper/auth';
import { Redirect } from 'react-router-dom';

const AuthRoute = ({component: Component}) => {
  let token = getCookie('token');
  if(token && tokenVerify(token)){
    return <Component/> 
  }
  return <Redirect to='/login' />
  
}

export default AuthRoute;
