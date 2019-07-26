import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import BlindTestLayout from '../components/BlindTestLayout/BlindTestLayout';
import Chat from './Chat';
import ListPlayer from './ListPlayer';
import MainGame from './MainGame';

import io from '../socket';

import { getGame } from '../actions/runningGame';

const mapStateToProps = (state, ownProps) => ({...state.runningGame, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
  onGetGame: (token) => 
    getGame(dispatch, token),
});

class BlindTest extends React.Component {
  
  componentDidMount = () => {
    const { token } = this.props;
    this.props.onGetGame(token);
  }

  printGame = () => {
    const { token, game, user } = this.props;
    return(
      <BlindTestLayout 
          left={<ListPlayer io={io} game={game} token={token} authUser={user} />}
          center={<MainGame />}
          right={<Chat io={io} game={game} authUser={user} />}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(BlindTest);
