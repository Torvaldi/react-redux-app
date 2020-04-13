import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import socketEvent from '../socketEvent.json';
import { getGameStatus } from '../helper/game';

import Player from '../components/Player/Player';
import Button from '@material-ui/core/Button';
import './css/listPlayer.css';

import profilePic from './../asset/profilePic.png';
import { getAuthUserTurnInfo } from './../helper/player';

const mapStateToProps = (state, ownProps) => ({...state.player, ...ownProps});

const mapDispatchToProps = (dispatch) => ({});

class ListPlayer extends React.Component {

  /**
   * Emit and receipe join game related evenement
   */
  componentDidMount() {
    const { io, game, authUser, token } = this.props;
    
    io.emit(socketEvent.USER_JOIN_GAME, { game, authUser, token });

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

  /**
   * Print player list with their name and score
   */
  printLeftBar() {
    const { authUser, players } = this.props;

    // get authUser score and rank
    let authUserInfo = getAuthUserTurnInfo(players, authUser.username);
    let count = 0;

    return(
      <section className="listPlayerLayout">
          <section className="listPlayerInfo">

            <article className="listPlayerInfoUser">
              <article className="listPlayerInfoUserProfilePicLayout">
                  <img className="listPlayerInfoUserProfilePic" src={profilePic}></img>
              </article>
              <article className="listPlayerInfoUserRight">
                <h1 className="listPlayerInfoUserUsername">{authUser.username}</h1>
                <span className="listPlayerInfoUserScore">Score: {authUserInfo.score}</span>
                <span className="listPlayerInfoUserRank">#{authUserInfo.rank}</span>
              </article>
            </article>

          </section>
          <section className="listPlayerLabel">
            <span className="playerLabel">Players</span>
            <span className="playerScore">Score</span>
          </section>
          <ul className="listPlayer">
            {players.map((player) => {
              count++;
              return <Player key={count} player={player} authUser={authUser} count={count} />;
            })}
          </ul>
          <Button 
            variant="contained" players
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
    const { players, token } = this.props;
    console.log(players);
    return(
      <Fragment>
        { players ? this.printLeftBar() : '' }
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPlayer);