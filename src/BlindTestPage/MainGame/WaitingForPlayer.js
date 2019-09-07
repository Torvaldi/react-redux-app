import React from 'react';
import { connect } from 'react-redux';

import './css/waitingForPlayer.css';

const mapStateToProps = (state, ownProps) => ({...state.mainGame, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
});

class WaitingForPlayer extends React.Component {

  render(){
    return(
     <section>
       Waiting for player to join the game !
       Wait until the creator launch the game
     </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitingForPlayer);
