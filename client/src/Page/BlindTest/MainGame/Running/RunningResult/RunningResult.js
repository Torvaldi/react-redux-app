import React from 'react';
import { connect } from 'react-redux';

import OpeningVideo from 'components/OpeningVideo/OpeningVideo';
import ScoreTable from 'components/ScoreTable/ScoreTable';
import Counter from 'components/Counter/Counter';
import Button from '@material-ui/core/Button';
import waitingTrun from 'waitingTrun.json';
import { clickNext, clickNextReset } from './action';
import socketEvent from 'socketEvent.json';
import './style.css';


const mapStateToProps = (state, ownProps) => ({...state.runningResult, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
  onClickNext: () =>
    dispatch(clickNext()),
  onSetClickNextSong: () =>
    dispatch(clickNextReset())
});

class RunningResult extends React.Component {

  componentDidMount = () => {
    this.props.changeStatus(socketEvent.CHANGE_STATUS_2_TO_0);
    this.props.onSetClickNextSong();
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

  /**
   * @return {void}
   */
  nextTurn = () => {
    this.props.onClickNext();

    const { io, gameId, authUser } = this.props;

    io.emit(socketEvent.VOTE_NEXT_SONG, {
      gameId,
      username: authUser.username,
    });
  }

  render(){
    const { turnResult, animeToGuess, clickNext } = this.props;
    
    return(
     <section className="runningResultBlock">
       <Counter startingNumber={waitingTrun.WAITING_TURN_3} />
       { animeToGuess ? <OpeningVideo animes={animeToGuess} /> : ''}
       { turnResult ? this.printScoreOfTheTurn(turnResult) : ''}
       <Button 
            variant="contained"
            color="secondary"
            size="small"
            onClick={this.nextTurn}
            disabled={clickNext}
            >
            Next song
          </Button>
     </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunningResult);