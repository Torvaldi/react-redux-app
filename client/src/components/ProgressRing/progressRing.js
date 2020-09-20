import React from 'react';
import './progressRing.css';

class ConstructRing extends React.Component {
    constructor(props) {
      super(props);
      
      const { radius, stroke } = this.props;
      
      this.normalizedRadius = radius - stroke * 2;
      this.circumference = this.normalizedRadius * 2 * Math.PI;
      

    }
    
    
    render() {
      const { radius, stroke, progress } = this.props;
  
      const strokeDashoffset = this.circumference - progress / 100 * this.circumference;

    
      return (
        <div id="progressRing">
            <span id="textprogressRing">{ this.props.currentCount }</span>
            <svg
            className="progressRing"
            height={radius * 2}
            width={radius * 2}
            >
            <circle
                stroke="#eeeeee"
                fill="transparent"
                strokeWidth={ stroke + 2}
                r={ this.normalizedRadius }
                cx={ radius }
                cy={ radius }
            />
            <circle 
                className="currentTime"
                fill="transparent"
                strokeWidth={ stroke }
                strokeDasharray={ this.circumference + ' ' + this.circumference }
                style={ { strokeDashoffset } }
                r={ this.normalizedRadius }
                cx={ radius }
                cy={ radius }
            />
            </svg>
        </div>
      );
    }
  }
  
  class ProgressRing extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        time: this.props.time,
        time_multiple: 5,
        progress: 100
      };

      if(this.state.time < 10){
        this.state.time_multiple = 10;
        }
      
    }
    
    componentDidMount() {
        // emulating progress
        const interval = setInterval(() => {
          if(this.state.time < 10){
            this.setState({time_set: 10});
          }
          else{
            this.setState({time_set: 0.5});
          }

          this.setState({ progress: this.state.progress + -this.state.time_set });
          if (this.state.progress === 0)
            clearInterval(interval);
        }, (this.props.time * this.state.time_multiple));
      }
    
    render() {
      return (
        <ConstructRing
          radius={ this.props.radius }
          stroke={ this.props.stroke }
          currentCount={ this.props.currentCount }
          time={ this.props.time }
          progress={ this.state.progress }
        />
      );
      
    }
  }
  
  export default ProgressRing;