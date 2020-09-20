import React from 'react';

import OpeningVideoEndGame from 'components/OpeningVideoEndGame/OpeningVideoEndGame';
import ScoreTableEndGame from 'components/ScoreTable/ScoreTableEndGame/ScoreTableEndGame';

class EndGame extends React.Component {

  printWinners = (winners) => {
    let count = 0;
    return(
      <ul>
        {winners.map((winner) => {
          count++;
          return <li key={0} >{winner.userName} - {winner.score}</li>
        })}
      </ul>
      
    );
  }

  render(){
    const { winners, lastAnimePlayed, turnResult } = this.props;
    return(
        <section className="runningBlock">
          <div className="infoSong">
            <section className="counterBlock">
              <span className="counterText">End of the game</span>
            </section>
            {lastAnimePlayed !== null ? <OpeningVideoEndGame animes={lastAnimePlayed} /> : ''}
          </div>
          <div className="listSongAndScore">
            <p className="infoTableWinner">
              <h1 className="infoTable">Winner :</h1>
              {winners ? this.printWinners(winners) : ''}
              <hr/>
            </p>
          {turnResult ? <ScoreTableEndGame turnResult={turnResult} /> : '' }
          </div>
        </section>
    );
  }
}

export default EndGame;
