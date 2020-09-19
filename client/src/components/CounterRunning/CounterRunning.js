import React, { Fragment } from 'react';
import './CounterRunning.css'
import ProgressRing from '../ProgressRing/progressRing.js';

class CounterRunning extends React.Component {

  state = {
    currentCount: 0,
  }

  componentDidMount = () => {
    const { startingNumber } = this.props;
    this.setState({currentCount: startingNumber});
    setInterval(this.timer, 1000);
  }


  timer = () => {
    this.setState({currentCount: this.state.currentCount - 1});
  }

  renderCounter = () => {
    return (
      <section className="counterBlock">
          <ProgressRing radius={120} stroke={10} time={this.props.startingNumber} currentCount={this.state.currentCount}/>
      </section>
    );
  }

  renderErrorTimeout = () => {
    return (
      <section className="counterBlock">
          <span className="counterTextTimeoutRunning"><p className="counterTextWarning">Warning : </p>Error while connecting with the game's creator, wait until they come back or leave the game</span>
      </section>
    );
  }

  render(){
      return (
        <Fragment>
          {this.state.currentCount >= 0 ? this.renderCounter() : this.renderErrorTimeout()}
        </Fragment>
      );
  }
}

export default CounterRunning;
