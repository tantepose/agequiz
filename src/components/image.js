import React from 'react';

// image with URL from current question in main state
const Image = props => (
    <div className="picture">
        <img src={props.image} alt="" />    
    </div>
);

export default Image;