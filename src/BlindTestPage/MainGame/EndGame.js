import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class EndGame extends React.Component {

  printWinners = (winners) => {
    return(
      <ul>
        {winners.map((winner) => {
          return <li>{winner.username} - {winner.score}</li>
        })}
      </ul>
    )
  }

  render(){
    const { winners } = this.props;
    return(
     <Fragment>
         end of the game
         {winners ? this.printWinners(winners) : ''}
         <Link to="/game">
          <Button size="large" variant="outlined" color="secondary">
            Leave
          </Button>
         </Link>
     </Fragment>
    );
  }
}

export default EndGame;
