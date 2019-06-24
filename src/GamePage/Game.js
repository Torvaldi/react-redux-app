import React from 'react';
import { tokenDecode, getCookie } from '../helper/auth';
import { Redirect } from 'react-router-dom';

const Game = () => {

    let user = tokenDecode(getCookie('token'));
    // pass user.payload as props to component

    return (
      <div >
          private game route
      </div>
    );
}

export default Game;
