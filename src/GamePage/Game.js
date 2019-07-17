import React from 'react';

import GameLayout from './../components/GameLayout/GameLayout';
import GameAvalaible from './GameAvalaible';
import CreateGameForm from './CreateGameForm';

const Game = ({token, user}) => {
    // pass user.payload as props to component
    return (
      <GameLayout
        left={
          <GameAvalaible user={user} token={token} />
        } 
        right={
          <CreateGameForm token={token} />
        }
        />
    );
}

export default Game;
