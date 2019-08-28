import React from 'react';

import './counter.css'
import propTypes from 'prop-types';

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

  render(){
      return (
        <section className="counterBlock">
            <span className="counterText">Remaining time : <span className="counterSecond">{this.state.currentCount}</span></span>
        </section>
      );
  }
}


export default Counter;
