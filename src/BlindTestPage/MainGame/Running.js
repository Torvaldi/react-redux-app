import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import RunningWaiting from './Running/RunningWaiting';
import RunningMusic from './Running/RunningMusic';
import RunningResult from './Running/RunningResult';

import { getAnimeToGuess } from '../../helper/mainGame';

import { setAnimeToGuess, setAnimeToGuessCall } from '../../actions/mainGame';
import socketEvent from '../../socketEvent.json';

const mapStateToProps = (state, ownProps) => ({...state.mainGame, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
    onSetAnimeToGuess: (animeToGuess) =>
      dispatch(setAnimeToGuess(animeToGuess)),
    onSetAnimeToGuessCall : (bool) =>
      dispatch(setAnimeToGuessCall(bool)),
});

class Running extends React.Component {

  componentDidMount = () => {
    // change every x second
    const { io } = this.props;

    // get animes to guess that were send by the creator
    io.on(socketEvent.SEND_ANIME_TO_GUESS, (animeToGuess) => {
        this.props.onSetAnimeToGuess(animeToGuess);
    });
  }

  /**
   * Send animes that can be played during this game to users
   * So every players has the possibility to "host" the game in case the creator leave
   */
  sendAnimeToGuess = () => {
    const { io, animes, game : { id, answer } } = this.props;
    // search new anime opening random
    let animeToGuess = getAnimeToGuess(animes, answer);
    // send event with new anime to the socket
    let data = { animeToGuess, gameId: id };

    this.props.onSetAnimeToGuess(animeToGuess);

    io.emit(socketEvent.SEND_ANIME_TO_GUESS, data);
  }

  /**
   * Change game status
   * This method is called by children compenent
   */
  changeStatus = (ioStatusEvent) => {
    const { io, runningStatus, authUser, game : { id, creator } } = this.props;

    // the creator handle all the change status of the game
    if(authUser.username === creator){
      let data = { 
        gameId: id, 
        runningStatus,
      };
      io.emit(ioStatusEvent, data);

      if(runningStatus === 0){
        this.props.checkIfWinner();
      }

    }
    
  }

  render(){
    const { authUser, 
      runningStatus, 
      game : { id,  creator }, 
      animeToGuess, 
      io, 
      animeToGuessCall,
      turnResult,
      turnNumber,
    } = this.props;
    // every turn load new anime opening to guess

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

       {runningStatus === 0 ? 
        <RunningWaiting 
          changeStatus={this.changeStatus} 
        /> : ''}

       {runningStatus === 1 ? 
        <RunningMusic 
          gameId={id} 
          authUser={authUser} 
          io={io} 
          animeToGuess={animeToGuess}
          answerOnceDefault={false}
          changeStatus={this.changeStatus}
        /> : ''}

        {runningStatus === 2 ? 
        <RunningResult
          animeToGuess={animeToGuess}
          changeStatus={this.changeStatus}
          turnResult={turnResult}
          turnNumber={turnNumber}
        /> : ''}
          
     </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Running);
