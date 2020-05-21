import React from 'react';

import GameAvalaible from './GameAvalaible';
import io from '../socket';

const Game = ({token, user}) => {
    // pass user.payload as props to component
    return (
      <GameAvalaible user={user} token={token} io={io}/>
    );
}

export default Game;
