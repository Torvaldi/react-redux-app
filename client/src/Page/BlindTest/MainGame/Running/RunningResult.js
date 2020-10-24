import React from 'react';

import OpeningVideo from 'components/OpeningVideo/OpeningVideo';
import ScoreTable from 'components/ScoreTable/ScoreTable';
import Counter from 'components/Counter/Counter';

import waitingTrun from 'waitingTrun.json';

import './css/runningResult.css';

import socketEvent from 'socketEvent.json';

class RunningResult extends React.Component {

  componentDidMount = () => {
    this.props.changeStatus(socketEvent.CHANGE_STATUS_2_TO_0);
  }

  printScoreOfTheTurn = (turnResult) => {

    if(turnResult.length > 4){
      // split the array in 2 array of the same size
      let halfwayThrough = Math.floor(turnResult.length / 2)
  
      let arrayFirstHalf = turnResult.slice(0, halfwayThrough);
      let arraySecondHalf = turnResult.slice(halfwayThrough, turnResult.length);
  
      return(
        <div className="scoreTableContainer">
          <ScoreTable turnResult={arrayFirstHalf} />
          <ScoreTable turnResult={arraySecondHalf} />
        </div>
      );

    }

    return(
      <ScoreTable turnResult={turnResult} />
    );

  }

  render(){
    const { turnResult, animeToGuess } = this.props;
    return(
     <section className="runningBlock">
        <div className="infoSong">
          <div className="infoSongScroll">
            <Counter startingNumber={waitingTrun.WAITING_TURN_3} />
            { animeToGuess ? <OpeningVideo animes={animeToGuess} /> : ''}
          </div>
        </div>
        <div className="listSongAndScore">
          { turnResult ? this.printScoreOfTheTurn(turnResult) : ''}
        </div>
     </section>
    );
  }
}

export default RunningResult;
