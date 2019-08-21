import React from 'react';
import { connect } from 'react-redux';

import './css/mainGame.css';
import { getAnimes } from '../actions/mainGame';
import WaitingForPlayer from './MainGame/WaitingForPlayer';
import Running  from './MainGame/Running';

import { SWITCH_RUNNING_STATUS } from '../socket';
import { switchRunningStatus } from '../actions/mainGame';

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
     io.on(SWITCH_RUNNING_STATUS, (data) => {
      const { score, status } = data;

      if(score){
        this.props.refreshScore(score);
      }
      this.props.onSwitchRunningStatus(status);
    });
  }

  /**
   * Render a different container depending of the game status
   * 1 waiting for player
   * 2 running
   * 3 finish
   */
  render(){
    const { gameStatus, animes, io, game, authUser, runningStatus, scores } = this.props;
    
    return(
     <section className="">
       {gameStatus === 1 ? <WaitingForPlayer /> : ''}
       {gameStatus === 2 && animes ? 
        <Running 
          animes={animes} 
          io={io} game={game} 
          authUser={authUser} 
          runningStatus={runningStatus}
          scores={scores}
        /> : 'loading running'}
     </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainGame);
