import React from 'react';
import { connect } from 'react-redux';

import Loading from 'components/Loading/Loading';
import ScoreTableWaiting from 'components/ScoreTable/ScoreTableWaiting/ScoreTableWaiting';
import Counter from 'components/Counter/Counter';

import waitingTrun from 'waitingTrun.json';

import socketEvent from 'socketEvent.json';

const mapStateToProps = (state, ownProps) => ({...state.runningMusic, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
});



class RunningWaiting extends React.Component {

  componentDidMount = () => {
    this.props.changeStatus(socketEvent.CHANGE_STATUS_0_TO_1);
  }

  printPositionOfTheTurn = (turnResult) => {

    if(turnResult.length > 4){
      // split the array in 2 array of the same size
      let halfwayThrough = Math.floor(turnResult.length / 2)
  
      let arrayFirstHalf = turnResult.slice(0, halfwayThrough);
      let arraySecondHalf = turnResult.slice(halfwayThrough, turnResult.length);
  
      return(
        <div className="scoreTableContainer">
          <ScoreTableWaiting turnResult={arrayFirstHalf} />
          <ScoreTableWaiting turnResult={arraySecondHalf} />
        </div>
      );

    }

    return(
      <ScoreTableWaiting turnResult={turnResult} />
    );

  }


  

  render(){
    const { turnResult } = this.props;
    return(
      <section className="runningBlock">
        <div className="infoSong">
          <Counter startingNumber={waitingTrun.WAITING_TURN_1} />
          <Loading />
        </div>
        <div className="listSongAndScore">
          { turnResult ? this.printPositionOfTheTurn(turnResult) : ''}
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunningWaiting);
