import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import RunningWaiting from './Running/RunningWaiting';
import RunningMusic from './Running/RunningMusic';
import RunningResult from './Running/RunningResult';

import { switchRunningStatus, setAnimeToGuess, setAnimeToGuessCall } from '../../actions/mainGame';
import { getAnimeToGuess } from '../../helper/mainGame';

import { SWITCH_RUNNING_STATUS, SEND_ANIME_TO_GUESS } from '../../socket';

const mapStateToProps = (state, ownProps) => ({...state.mainGame, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
    onSwitchRunningStatus: () =>
      dispatch(switchRunningStatus()),
    onSetAnimeToGuess: (animeToGuess) =>
      dispatch(setAnimeToGuess(animeToGuess)),
    onSetAnimeToGuessCall : (bool) =>
      dispatch(setAnimeToGuessCall(bool)),
});

class Running extends React.Component {

  componentDidMount = () => {
    // change every x second
    const { io } = this.props;

    // switch running game status every x second
    io.on(SWITCH_RUNNING_STATUS, () => {
      console.log('client recieve status change')
        this.props.onSwitchRunningStatus();
    });

    // get animes to guess that were send by the creator
    io.on(SEND_ANIME_TO_GUESS, (animeToGuess) => {
        this.props.onSetAnimeToGuess(animeToGuess);
    });
  }

  sendAnimeToGuess = () => {
    const { io, animes, game : { id, answer } } = this.props;
    // search new anime opening random
    let animeToGuess = getAnimeToGuess(animes, answer);
    // send event with new anime to the socket
    let data = { animeToGuess, gameId: id };

    this.props.onSetAnimeToGuess(animeToGuess);

    io.emit(SEND_ANIME_TO_GUESS, data);
  }

  changeStatus = () => {
    const { io, runningStatus, authUser, game : { id, creator } } = this.props;
    // the creator handle all the change status of the game
    if(authUser.username === creator){
      let data = { 
        gameId: id, 
        runningStatus 
      };
      io.emit(SWITCH_RUNNING_STATUS, data);
    }
  }


  render(){
    const { authUser, runningStatus, game : { id,  creator }, animeToGuess, io, animeToGuessCall } = this.props;
    // every turn load new anime opening to guess
    console.log(runningStatus)

    // the creator of the game call the anime to guess and send it to the other player
    if(runningStatus === 0 && animeToGuessCall === false && authUser.username === creator){
      this.sendAnimeToGuess();  
      this.props.onSetAnimeToGuessCall(true);
    }

    if(runningStatus === 2){
      this.props.onSetAnimeToGuessCall(false);
    }

    return(
     <Fragment>
       {runningStatus === 0 ? <RunningWaiting 
        changeStatus={this.changeStatus} 
        /> : ''}

       {runningStatus === 1 && animeToGuess ? <RunningMusic 
          gameId={id} 
          authUser={authUser} 
          io={io} 
          animeToGuess={animeToGuess}
          answerOnceDefault={false}
          changeStatus={this.changeStatus}
          /> : ''}

        {runningStatus === 2 ? <RunningResult 
          changeStatus={this.changeStatus}
          /> : ''}
          
     </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Running);
