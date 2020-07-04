import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './css/endGame.css';

import OpeningVideo from 'components/OpeningVideo/OpeningVideo';
import ScoreTable from 'components/ScoreTable/ScoreTable';

class EndGame extends React.Component {

  printWinners = (winners) => {
    let count = 0;
    return(
      <ul>
        {winners.map((winner) => {
          count++;
          return <li key={count} >{winner.userName} - {winner.score}</li>
        })}
      </ul>
    );
  }

  render(){
    const { winners, lastAnimePlayed, turnResult } = this.props;
    return(
      <article className="winnerBlock">
        end of the game
        {winners ? this.printWinners(winners) : ''}

        {lastAnimePlayed !== null ? <OpeningVideo animes={lastAnimePlayed} /> : ''}
        {turnResult ? <ScoreTable turnResult={turnResult} /> : '' }

        <Link to="/game">
          <Button size="large" variant="outlined" color="secondary">
            Leave
          </Button>
        </Link>
      </article>
    );
  }
}

export default EndGame;
