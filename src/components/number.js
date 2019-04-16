import React from 'react';

const Number = (props) => (
    <p onClick={() => {props.onClick(props.number)}}>{props.number}</p>
);

export default Number;