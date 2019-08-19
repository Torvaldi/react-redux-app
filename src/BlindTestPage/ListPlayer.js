import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import { USER_JOIN_GAME } from '../socket';
import { getPlayer } from '../actions/player';
import { getGameStatus } from '../helper/game';

import Player from '../components/Player/Player';
import Button from '@material-ui/core/Button';
import './css/listPlayer.css';

const mapStateToProps = (state, ownProps) => ({...state.player, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
  onGetPlayer: (data) => 
    getPlayer(dispatch, data),
});

class ListPlayer extends React.Component {

  /**
   * Emit and receipe join game related evenement
   */
  componentDidMount = () => {
    const { io, token, game, authUser } = this.props;

    io.emit(USER_JOIN_GAME, {game, authUser})
    this.props.onGetPlayer({token, game});

    io.on(USER_JOIN_GAME, (data) => {
      this.props.refreshScore(data.score);
      this.props.onGetPlayer({token, game});
    });

  }

  printLauchButton = () => {
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
  printPlayers() {
    const { authUser, scores, game, gameStatus, players } = this.props;

    let status;
    if(gameStatus === 1) {
      status = getGameStatus(1);
    } else if(gameStatus === 2) {
      status = getGameStatus(2);
    } else {
      status = getGameStatus(3);
    }

    return(
      <section className="listPlayerLayout">
          <section className="listPlayerInfo">
            <h1 className="playerTitle">{game.creator} 's game</h1>
            <span className="playerScoreToWin">Winning score : <span className="playerScoreToWinData">{game.score_to_win}</span></span>
            <span className="playerScoreToWin">Level : <span className="playerLevelData">{game.level}</span></span>
            <span className="playerScoreToWin">Status :  <span className="playerLevelData">{status}</span></span>
            {game.creator === authUser.username && gameStatus === 1 ? this.printLauchButton() : ''}
          </section>
        <ul className="listPlayer">
          <section className="listPlayerLabel">
            <span className="playerLabel">Players</span>
            <span className="playerScore">Score</span>
          </section>
          {players.map((player) => {
            return <Player key={player.id} player={player} scores={scores} authUser={authUser} />;
          })}
        </ul>
        
      </section>
    )
  }

  render(){
    const { players, scores } = this.props;
    return(
      <Fragment>
        { players && scores ? this.printPlayers() : '' }
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPlayer);