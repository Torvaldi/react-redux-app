import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({...state.mainGame, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
});

class RunningResult extends React.Component {

  componentDidMount = () => {
    this.props.changeStatus();
  }

  printScoreOfTheTurn = (scores) => {
    return (
      <ul>
        {scores.map((score) => {
          return <li>{score.data.username} - {score.data.turnScore}</li>
        })}
      </ul>
    )
  }

  render(){
    const { scores } = this.props;
    
    return(
     <Fragment>
       {scores.turnScore ? this.printScoreOfTheTurn(scores.turnScore) : ''}
     </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunningResult);
