import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import './css/mainGame.css';
import WaitingForPlayer from './MainGame/WaitingForPlayer';
import Running  from './MainGame/Running';
import EndGame from './MainGame/EndGame';
import TopBar from './../components/MainGame/TopBar/TopBar';

import socketEvent from '../socketEvent.json';

import { switchRunningStatus, getAnimes, setTurnResult, setAnimeToGuess } from '../actions/mainGame';

const mapStateToProps = (state, ownProps) => ({...state.mainGame, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
  onGetAnimes: (data) =>
    getAnimes(dispatch, data),
  onSwitchRunningStatus: (status) =>
    dispatch(switchRunningStatus(status)),
  onSetTurnResult: (turnResult) =>
    dispatch(setTurnResult(turnResult)),
  onSetAnimeToGuess: (animeToGuess) =>
    dispatch(setAnimeToGuess(animeToGuess)),
});

class MainGame extends React.Component {

  /**
   * handle io event here and get animes use for the blind test
   */
  componentDidMount = () => {
    const { token, game : { level, musicType }, io } = this.props;
    let data = { token, level, musicType };
    this.props.onGetAnimes(data);

     // switch running game status every x second
     io.on(socketEvent.CHANGE_STATUS_0_TO_1, (data) => {
       const { animes } = data;
      this.props.onSwitchRunningStatus(1);
      this.props.onSetAnimeToGuess(animes);
    });

    io.on(socketEvent.CHANGE_STATUS_1_TO_2, (data) => {
      const { turnResult, players } = data;
      
      this.props.setPlayers(players);
      this.props.onSetTurnResult(turnResult);
      
      this.props.onSwitchRunningStatus(2);
    });

    io.on(socketEvent.CHANGE_STATUS_2_TO_0, (data) => {
      this.props.onSwitchRunningStatus(0);
    });

    io.on(socketEvent.SET_DEFAULT_STATUS, (data) => {
      const { status } = data;
      this.props.onSwitchRunningStatus(status);
    });

    io.on(socketEvent.UPDATE_GAME_STATUS, (data) => {
      const { status } = data;
      this.props.onSwitchRunningStatus(status);
    });

    io.on(socketEvent.GAME_FINISH, (data) => {
      const { winners } = data;
      this.props.gameFinish(winners);
    });

  }

  /**
   * Render a different container depending of the game status
   * 1 waiting for player
   * 2 running
   * 3 finish
   */
  render(){
    const { gameStatus, animes, io, game, authUser, runningStatus, turnResult, winners, token } = this.props;
    return(
     <Fragment>
          <article className="mainGameContentLayout">
            <article className="mainGametopBar">
              <TopBar game={game} />
            </article>
            <article className="mainGameContent">
              {gameStatus === 1 ? 
              <WaitingForPlayer 
                launchGame={this.props.launchGame}
                game={game} 
                authUser={authUser} 
              /> : ''}
              {gameStatus === 2 && animes ? 
                <Running 
                  animes={animes} 
                  io={io} 
                  game={game} 
                  authUser={authUser} 
                  runningStatus={runningStatus}
                  turnResult={turnResult}
                  token={token}
                /> : ''}
                {gameStatus === 3 && winners ? <EndGame winners={winners} /> : ''}
                {gameStatus === undefined ? 'Loading' : ''}
            </article>
          </article>
     </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainGame);
