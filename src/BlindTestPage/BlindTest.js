import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import BlindTestLayout from '../components/BlindTestLayout/BlindTestLayout';
import Chat from './Chat';
import ListPlayer from './ListPlayer';
import MainGame from './MainGame';

import io from '../socket';
import socketEvent from './../socketEvent.json'

import { getGame, updateStatusState, setPlayers, setWinners } from '../actions/runningGame';
import { updateDatabaseGameStatus, userLeaveGameDatabase } from '../helper/runningGame';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({...state.runningGame, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
  onGetGame: (token) => 
    getGame(dispatch, token),
  onUpdateStatusState: (status) =>
    dispatch(updateStatusState(status)),
  onSetPlayers: (players) =>
    dispatch(setPlayers(players)),
  onSetWinners: (winners) => 
    dispatch(setWinners(winners))
});

class BlindTest extends React.Component {
  
  componentDidMount = () => {
    const { token } = this.props;
    this.props.onGetGame(token);

    io.on(socketEvent.LAUCH_GAME, () => {
      // for other player, keep the game status up to date
      console.log('game launch')
      this.props.onUpdateStatusState(2);
    });



  }

  gameFinish = (winners) => {
    const { token, game } = this.props;
    updateDatabaseGameStatus(token, game.id, 3);
    this.props.onUpdateStatusState(3);
    this.props.onSetWinners(winners);
  }

  /**
   * Refresh the players scores, this method is call by children container when players score is updated
   */
  setPlayers = (players) => {
    this.props.onSetPlayers(players);
  }

  /**
   * Launch the game, called by the creator of the game from a child container (ListPlayer)
   */
  launchGame = (event) => {
    event.preventDefault();
    const { token, game } = this.props;
    // update game status on the database
    updateDatabaseGameStatus(token, game.id, 2);

    // set running state (creator only here)
    this.props.onUpdateStatusState(2);

    // call event game update, so the game lobby will be re-render
    io.emit( socketEvent.GAME_UPDATE);
    // call launch game event 
    io.emit( socketEvent.LAUCH_GAME, game.id);
  }

  leaveGame = (event) => {
    event.preventDefault();
    if(window.confirm("Are you sure you want to leave ? You may not be able to join again and your score won't be save")){
      const { token, game } = this.props;
      userLeaveGameDatabase(token, game.id);
      // todo redirect on game page
      this.props.history.push('/game')
    }
  }

  addNewPlayer = (player) => {
    this.props.onAddNewPlayer();
  }

  printPlayerList = () => {
    const { players } = this.props;

    return(
      <Fragment>
        { players ? <Fragment>okok</Fragment> : '' }
      </Fragment>

    );

  }

  /**
   * Print all 3 part of the layout, each of them have their own state
   * PlayerList : List of all player with their score and basic game information
   * MainGame: The most important part of the game, divided in sub container, its where all the game happend
   * Chat: A simple chat where players can talk to each other
   */
  printGame = () => {
    const { token, game, user, gameStatus, players, winners } = this.props;
    console.log(players)

    return(
      <Fragment>
      { game.id ? 
          <BlindTestLayout
          left={ players ? <ListPlayer 
            io={io} 
            game={game} 
            token={token} 
            authUser={user} 
            launchGame={this.launchGame} 
            leaveGame={this.leaveGame}
            gameStatus={gameStatus}
            setPlayers={this.setPlayers}
            players={players}
            addNewPlayer={this.addNewPlayer}
          /> : ''}
          center={
          <MainGame 
            io={io} 
            game={game} 
            token={token} 
            authUser={user} 
            gameStatus={gameStatus}
            refreshScore={this.onSetPlayers} // fix name
            scores={players} // fix name
            gameFinish={this.gameFinish}
            winners={winners}
          />}
          right={<Chat io={io} game={game} authUser={user} />}
        /> : '404'}
      </Fragment>
    );
  }

  render(){
    const { game } = this.props;
    return(
      <Fragment>
        { game ? this.printGame() : <Fragment>loading</Fragment> }
      </Fragment>
    )
  }
}

let component = connect(mapStateToProps, mapDispatchToProps)(BlindTest);
export default withRouter(component);