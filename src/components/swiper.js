import React, { Component } from 'react';
import Number from './number';

// swiper for age selection
class Swiper extends Component {

    componentWillMount () {
        // create all numbers needed for swiper
        var numbers = [];
        for (var i=1; i<100; i++) {
            numbers.push(i);
        }

        // make numbers accessible from renderer (probably a stupid way to do it)
        this.setState({
            numbers: numbers
        });

        // create ref for scrolling
        this.swiper = React.createRef();
    }

    componentDidMount() {
        // scroll the swiper a bit on mount
        this.swiper.current.scrollLeft = this.swiper.current.scrollWidth / 4.3;
    }

    render () {
        // draw the swiper with number component using all the numbers
        return (
            <div className="bottom" ref={this.swiper}>
                {this.state.numbers.map((number) => 
                    <Number number={number} onClick={this.props.onClick} key={number} /> 
                )}
            </div>

        )
    }
}

export default Swiper;