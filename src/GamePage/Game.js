import React from 'react';

import GameLayout from './../components/GameLayout/GameLayout';
import GameAvalaible from './GameAvalaible';
import CreateGameForm from './CreateGameForm';
import io from '../socket';

const Game = ({token, user}) => {
    // pass user.payload as props to component

    io.emit('NEW_PLAYER', user);
    return (
      <GameLayout
        left={
          <GameAvalaible user={user} token={token} io={io}/>
        } 
        right={
          <CreateGameForm token={token} io={io}/>
        }
        />
    );
}

export default Game;
