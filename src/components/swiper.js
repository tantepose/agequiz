import React from 'react';
import Number from './number';

// creating array from 1 to 99 for numbers in swiper
var numbers = [];
for (var i=1; i<100; i++) {
    numbers.push(i);
}

// draw the swiper with numbers from array
const Swiper = (props) => (
    <div className="bottom">
    {numbers.map((number) => 
        <Number number={number} onClick={props.onClick} key={number} /> 
    )}
    </div>
);

export default Swiper;