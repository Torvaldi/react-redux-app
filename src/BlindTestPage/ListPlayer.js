import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import socketEvent from '../socketEvent.json';
import { getGameStatus } from '../helper/game';

import Player from '../components/Player/Player';
import Button from '@material-ui/core/Button';
import './css/listPlayer.css';

const mapStateToProps = (state, ownProps) => ({...state.player, ...ownProps});

const mapDispatchToProps = (dispatch) => ({});

class ListPlayer extends React.Component {

  /**
   * Emit and receipe join game related evenement
   */
  componentDidMount() {
    const { io, game, authUser } = this.props;
    
    io.emit(socketEvent.USER_JOIN_GAME, {game, authUser});

    io.on(socketEvent.USER_JOIN_GAME, (player) => {
      this.props.addNewPlayer(player);
    });

    io.on(socketEvent.GAME_JOINED_SUCCESSFULLY, (players) => {
      this.props.setPlayers(players);
    });

    io.on(socketEvent.USER_LEAVE_GAME, (data) => {
      const { player } = data;
      this.props.removePlayer(player);
    });
    
  }


  printLauchButton() {
    return(
      <Button 
        className="buttonLauchGame" 
        variant="contained" 
        color="secondary"
        onClick={this.props.launchGame}
      >
      Launch the game !
      </Button>
    );
  }

  /**
   * Print player list with their name and score
   */
  printLeftBar() {
    const { authUser, game, gameStatus, players } = this.props;

    let status;
    if(gameStatus === 1) {
      status = getGameStatus(1);
    } else if(gameStatus === 2) {
      status = getGameStatus(2);
    } else {
      status = getGameStatus(3);
    }

    let count = 0;

    return(
      <section className="listPlayerLayout">
          <section className="listPlayerInfo">
            <h1 className="playerTitle">{game.creator} 's game</h1>
            <span className="playerScoreToWin">Winning score : <span className="playerScoreToWinData">{game.score_to_win}</span></span>
            <span className="playerLevel">Level : <span className="playerLevelData">{game.level}</span></span>
            <span className="playerStatus">Status :  <span className="playerStatusData">{status}</span></span>
            {game.creator === authUser.username && gameStatus === 1 ? this.printLauchButton() : ''}
          </section>
        <ul className="listPlayer">
          <section className="listPlayerLabel">
            <span className="playerLabel">Players</span>
            <span className="playerScore">Score</span>
          </section>
          {players.map((player) => {
            count++;
            return <Player key={count} player={player} authUser={authUser} />;
          })}
        </ul>
          <Button 
            variant="contained" 
            color="secondary"
            size="small"
            onClick={this.props.leaveGame}
            >
            Leave
          </Button>
      </section>
    )
  }

  render(){
    const { players } = this.props;
    return(
      <Fragment>
        { players ? this.printLeftBar() : '' }
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPlayer);