import React, { Component } from 'react';
import Number from './number';

class Swiper extends Component {

    componentWillMount () {
        // create all numbers needed for swiper
        var numbers = [];
        for (var i=1; i<100; i++) {
            numbers.push(i);
        }

        // make them accessible from renderer
        this.setState({
            numbers: numbers
        });

        // create ref for scrolling
        this.swiper = React.createRef();
    }

    componentDidMount() {
        // scroll swiper halft way
        this.swiper.current.scrollLeft = this.swiper.current.scrollWidth / 4.3;
    }

    render () {
        // draw the swiper with numbers from array
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

