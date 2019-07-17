import React from 'react';
import {tokenVerify, getCookie, tokenDecode} from '../helper/auth';
import { Redirect } from 'react-router-dom';

const AuthRoute = ({component: Component}) => {
  let token = getCookie('token');
  let user = tokenDecode(token);

  if(token && tokenVerify(token)){
    return <Component token={token} user={user.payload} />;
  }
  return <Redirect to='/login' />
  
}

export default AuthRoute;
