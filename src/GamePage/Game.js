import React from 'react';

import GameLayout from './../components/GameLayout/GameLayout';
import GameAvalaible from './GameAvalaible';
import CreateGameForm from './CreateGameForm';
import io from '../socket';

const Game = ({token, user}) => {
    // pass user.payload as props to component
    return (
      <GameAvalaible user={user} token={token} io={io}/>
    );
}

export default Game;
