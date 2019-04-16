import React from 'react';
import Number from './number';

var numbers = [];
for (var i=1; i<100; i++) {
    numbers.push(i);
}
console.log(numbers);

const Swiper = (props) => (
    <div className="bottom">
    {numbers.map((number) => <Number number={number} onClick={props.onClick} key={number} /> ) }
    </div>
);

export default Swiper;