import React from 'react';

// create one clickable number
const Number = (props) => (
    <p onClick={() => {props.onClick(props.number)}}>{props.number}</p>
);

export default Number;