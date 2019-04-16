import React from 'react';

// draw image from current question
const Image = props => (
    <div className="picture">
        <img src={props.image} alt="" />    
    </div>
);

export default Image;