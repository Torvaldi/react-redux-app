import React from 'react';
import { tokenDecode, getCookie } from '../helper/auth';

import GameLayout from './../components/GameLayout/GameLayout';
import GameAvalaible from './GameAvalaible';
import CreateGameForm from './CreateGameForm';

const Game = () => {

  let token = getCookie('token');
  let user = tokenDecode(token);
    // pass user.payload as props to component
    return (
      <GameLayout
        left={
          <GameAvalaible user={user.payload} token={token} />
        } 
        right={
          <CreateGameForm />
        }
        />
    );
}

export default Game;
