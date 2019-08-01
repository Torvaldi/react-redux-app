import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({...state.mainGame, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
});

class WaitingForPlayer extends React.Component {

  render(){
    return(
     <section className="">
       waiting for player
     </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitingForPlayer);
