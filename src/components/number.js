import React from 'react';

// one clickable number in swiper
const Number = (props) => (
    <p onClick={() => {props.onClick(props.number)}}>{props.number}</p>
);

export default Number;