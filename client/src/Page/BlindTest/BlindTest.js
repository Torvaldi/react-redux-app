import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import BlindTestLayout from 'components/BlindTestLayout/BlindTestLayout';
import LoadingPage from 'components/LoadingPage/LoadingPage';
import Chat from './Chat/Chat';
import ListPlayer from './ListPlayer/ListPlayer';
import MainGame from './MainGame/MainGame';

import io from 'socket';
import socketEvent from 'socketEvent.json'

import { 
  getGame, 
  updateStatusState, 
  setPlayers, 
  setWinners, 
  addPlayer, 
  removePlayer, 
  clearGame, 
  removeUserFromGame, 
  setLastAnimePlayed,  
  setLastTurn
} from './action';

import { withRouter, Redirect } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({...state.runningGame, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
  onGetGame: (token) => 
    getGame(dispatch, token),
  onClearGame: () =>
    dispatch(clearGame()),
  onUpdateStatusState: (status) =>
    dispatch(updateStatusState(status)),
  onSetPlayers: (players) =>
    dispatch(setPlayers(players)),
  onSetWinners: (winners) => 
    dispatch(setWinners(winners)),
  onAddNewPlayer : (player) =>
    dispatch(addPlayer(player)),
  onRemovePlayer : (player) =>
    dispatch(removePlayer(player)),
  onPlayerLeave: (token, gameId) =>
    dispatch(removeUserFromGame(token, gameId)),
  onSetLastAnimePlayed : (animes) =>
    dispatch(setLastAnimePlayed(animes))
});

class BlindTest extends React.Component {
  
  componentDidMount = () => {
    const { token } = this.props;
    this.props.onGetGame(token);

    io.on(socketEvent.LAUCH_GAME, () => {
      // for other player, keep the game status up to date
      this.props.onUpdateStatusState(2);
    });

    io.on(socketEvent.CREATOR_LEAVE_GAME, () => {

      // resend the event to the socket, in order to leave the socket room
      io.emit(socketEvent.CREATOR_LEAVE_GAME, this.props.game.id);

      // redirect other player to game list if the creator leaves the game
      window.alert("The creator of the game left, you are going to be redirect to the game list");
      setTimeout(() => {  
        this.props.history.push('/game'); // redirect on game page; 
      }, 3000);
     
    });

  }

  componentWillUnmount = () => {
    this.props.onClearGame();
  }


  gameFinish = (winners, animes) => {
    this.props.onSetLastAnimePlayed(animes);
    this.props.onUpdateStatusState(3);
    this.props.onSetWinners(winners);
  }

  /**
   * Refresh the players scores, this method is call by children container when players score is updated
   * @param {array} array of object
   */
  setPlayers = (players) => {
    this.props.onSetPlayers(players);
  }

  /**
   * Add a new player to the players list
   * @param {object} player
   */
  addNewPlayer = (player) => {
    this.props.onAddNewPlayer(player);
  }

  /**
   * remove the given player from the player list
   * @param {object} player
   */
  removePlayer = (player) => {
    this.props.onRemovePlayer(player);
  }

  /**
   * Launch the game, called by the creator of the game from a child container (ListPlayer)
   */
  launchGame = (event) => {
    event.preventDefault();
    const { token, game } = this.props;
  
    // call launch game event 
    io.emit(socketEvent.LAUCH_GAME, { gameId: game.id, token});
  }

  /**
   * Called when a player decide to leave the game
   */
  leaveGame = (event) => {
    event.preventDefault();
    if(window.confirm("Are you sure you want to leave ? You may not be able to join again and your score won't be save")){
      const { token, game } = this.props;
      
      // call the userLeave props function
      this.props.onPlayerLeave(token, game.id);
    }
  }

  /**
   * Print all 3 part of the layout, each of them have their own state
   * PlayerList : List of all player with their score and basic game information
   * MainGame: The most important part of the game, divided in sub container, its where all the game happend
   * Chat: A simple chat where players can talk to each other
   */
  printGame = () => {
    const { token, game, user, gameStatus, players, winners, lastAnimePlayed, isUserLeaveLoading, isUserLeaveError } = this.props;
    
    let gameEmpty = false;
    if(Object.keys(game).length === 0){
      gameEmpty = true;
    }
    return(
       <Fragment>
      { gameEmpty === false ? 
          <BlindTestLayout
          left={<ListPlayer 
            io={io} 
            game={game} 
            token={token} 
            authUser={user} 
            launchGame={this.launchGame} 
            leaveGame={this.leaveGame}
            gameStatus={gameStatus}
            setPlayers={this.setPlayers}
            removePlayer={this.removePlayer}
            players={players}
            addNewPlayer={this.addNewPlayer}
          />}
          center={
          <MainGame 
            launchGame={this.launchGame} 
            io={io} 
            game={game} 
            token={token} 
            authUser={user} 
            gameStatus={gameStatus}
            setPlayers={this.setPlayers} // fix name
            scores={players} // fix name
            gameFinish={this.gameFinish}
            winners={winners}
            lastAnimePlayed={lastAnimePlayed}
          />}
          right={<Chat io={io} game={game} authUser={user} />}
        /> : '404'}
        {isUserLeaveLoading === true || isUserLeaveError === true ? <LoadingPage overlay={true} /> : ''}
      </Fragment>
      );

  }

  render(){
    const { game, players, isUserLeave, token, user } = this.props;

    if(isUserLeave === true){
      let data = {
        token, 
        gameId: game.id, 
        player: user
      };
      io.emit(socketEvent.USER_LEAVE_GAME, data);

      return(<Redirect to="/game" />);

    } else {
      return(
        <Fragment>
          { game && players ? this.printGame() : <LoadingPage /> }
        </Fragment>
      )
    }

  }
}

let component = connect(mapStateToProps, mapDispatchToProps)(BlindTest);
export default withRouter(component);