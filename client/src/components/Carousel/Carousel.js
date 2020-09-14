import React from 'react';
import './Carousel.css';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import 'components/Icons/icons.css';


class Carousel extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            items: this.props.items,
            active: this.props.active,
            direction: ''
        }
        this.rightClick = this.moveRight.bind(this)
        this.leftClick = this.moveLeft.bind(this)
    }

    generateItems() {
        var items = []
        var level
        console.log(this.state.active)
        for (var i = this.state.active - 2; i < this.state.active + 3; i++) {
            var index = i
            if (i < 0) {
                index = this.state.items.length + i
            } 
            else if (i >= this.state.items.length) {
                index = i % this.state.items.length
            }
            level = this.state.active - i
            items.push(
                <Item 
                    key={index} 
                    id={this.state.items[index]} 
                    level={level} 
                    rightClick={this.rightClick}
                    leftClick={this.leftClick}
                />
            )
        }
        return items
    }
    
    moveLeft() {
        var newActive = this.state.active
        newActive--
        this.setState({
            active: newActive < 0 ? this.state.items.length - 1 : newActive,
            direction: 'left'
        })
    }
    
    moveRight() {
        var newActive = this.state.active
        this.setState({
            active: (newActive + 1) % this.state.items.length,
            direction: 'right'
        })
    }
    
    render() {
        return(
            <div id="carousel" className="noselect">
                <div className="under_carousel">
                    <CSSTransitionGroup 
                      transitionName={this.state.direction}>
                      {this.generateItems()}
                    </CSSTransitionGroup>
                </div>
                <div className="arrow arrow-left" onClick={this.leftClick}><i className="icon solid fa-chevron-left"></i></div>
                <div className="arrow arrow-right" onClick={this.rightClick}><i className="icon solid fa-chevron-right"></i></div>
            </div>
        )
    }
}

class Item extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            level: this.props.level
        }
    }
    
    render() {

        const overlayStyle = {
            backgroundImage: `url(${process.env.PUBLIC_URL}'/assets/minimalist_caracter/${this.props.id}.png')`
          }
          
        const className = 'item level' + this.props.level
 
          // {this.props.id} 
        
        if(this.props.level > 0 ){
            return(
                    <div className={className} style={overlayStyle} onClick={this.props.leftClick}>

                    </div>
            )
        }
        else if(this.props.level < 0){
            return(
                <div className={className} style={overlayStyle} onClick={this.props.rightClick}>
                     
                </div>
            )
        }
        else{
            return(
                <div className={className} style={overlayStyle}>
                     
                </div>
            )
        }
        
    }
}


export default Carousel;