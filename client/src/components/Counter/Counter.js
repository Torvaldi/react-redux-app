import React, { Fragment } from 'react';
import './counter.css'

class Counter extends React.Component {

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
          <span className="counterText">Remaining time : <span className="counterSecond">{this.state.currentCount}</span></span>
      </section>
    );
  }

  renderErrorTimeout = () => {
    return (
      <section className="counterBlock">
          <span className="counterTextTimeout">Error while connecting with the game's creator, wait until they come back or leave the game</span>
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

export default Counter;
