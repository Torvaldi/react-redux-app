import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import { USER_JOIN_GAME } from '../socket';
import { getPlayer, playerSetScore } from '../actions/player';

import Player from '../components/Player/Player';
import './css/listPlayer.css';

const mapStateToProps = (state, ownProps) => ({...state.player, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
  onGetPlayer: (data) => 
    getPlayer(dispatch, data),
  onPlayerSetScore: (score) =>
    dispatch(playerSetScore(score)),
});

class ListPlayer extends React.Component {

  /**
   * Emit and receipe join game related evenement
   */
  componentDidMount = () => {
    const { io, token, game, authUser } = this.props;

    io.emit(USER_JOIN_GAME, {game, authUser})
    this.props.onGetPlayer({token, game});

    io.on(USER_JOIN_GAME, (scores) => {
      this.props.onPlayerSetScore(scores);
      this.props.onGetPlayer({token, game});
    });

  }

  /**
   * Print player list with their name and score
   */
  printPlayers() {
    const { players, authUser, scores, game } = this.props;

    return(
      <section className="listPlayerLayout">
          <section className="listPlayerInfo">
            <h1 className="playerTitle">{game.creator} 's game</h1>
            <span className="playerScoreToWin">Winning score : <span className="playerScoreToWinData">{game.score_to_win}</span></span>
            <span className="playerScoreToWin">Level : <span className="playerLevelData">{game.level}</span></span>
          </section>
        <ul className="listPlayer">
          <section className="listPlayerLabel">
            <span className="playerLabel">Players</span>
            <span className="playerScore">Score</span>
          </section>
          {players.map((player) => {
            return <Player key={player.id} id={player.id} username={player.username} authId={authUser.id} scores={scores} />;
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

/*
<article className="listPlayerImageLayout">
          <img className="listPlayerImage" src={image} />
        </article>
        */