import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import './css/mainGame.css';
import WaitingForPlayer from './MainGame/WaitingForPlayer';
import Running  from './MainGame/Running';
import EndGame from './MainGame/EndGame';

import socketEvent from '../socketEvent.json';

import { switchRunningStatus, getAnimes } from '../actions/mainGame';
import { checkWinner } from '../helper/mainGame';

const mapStateToProps = (state, ownProps) => ({...state.mainGame, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
  onGetAnimes: (data) =>
    getAnimes(dispatch, data),
  onSwitchRunningStatus: (status) =>
    dispatch(switchRunningStatus(status)),
});

class MainGame extends React.Component {

  /**
   * handle io event here and get animes use for the blind test
   */
  componentDidMount = () => {
    const { token, game : { level }, io } = this.props;
    let data = { token, level };
    this.props.onGetAnimes(data);

     // switch running game status every x second
     io.on(socketEvent.CHANGE_STATUS_0_TO_1, (data) => {
      this.props.onSwitchRunningStatus(1);
    });

    io.on(socketEvent.CHANGE_STATUS_1_TO_2, (data) => {
      const { score } = data;
      if(score){
        this.props.refreshScore(score);
      }
      this.props.onSwitchRunningStatus(2);
    });

    io.on(socketEvent.CHANGE_STATUS_2_TO_0, (data) => {
      this.props.onSwitchRunningStatus(0);
    });

    io.on(socketEvent.SET_DEFAULT_STATUS, (data) => {
      const { status } = data;
      this.props.onSwitchRunningStatus(status);
    });
  }

  checkIfWinner = () => {
    const { scores, game } = this.props;
    
    if(scores && scores.globalScore){
      let winners = checkWinner(scores.globalScore, game.score_to_win);
      if(winners.length > 0){
        this.props.gameFinish(winners);
      }
    }
  }

  /**
   * Render a different container depending of the game status
   * 1 waiting for player
   * 2 running
   * 3 finish
   */
  render(){
    const { gameStatus, animes, io, game, authUser, runningStatus, scores, winners } = this.props;
    
    return(
     <Fragment>
       {gameStatus === 1 ? <WaitingForPlayer /> : ''}
       {gameStatus === 2 && animes ? 
        <Running 
          animes={animes} 
          io={io} game={game} 
          authUser={authUser} 
          runningStatus={runningStatus}
          scores={scores}
          checkIfWinner={this.checkIfWinner}
        /> : ''}
        {gameStatus === 3 && winners ? <EndGame winners={winners} /> : ''}
        {gameStatus === undefined ? 'Loading' : ''}
     </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainGame);
