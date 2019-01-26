import React from 'react';
import Typist from 'react-typist';

const Question = (props) => (
    <div className="question">
        <Typist>
            <h1>{props.text}</h1>
        </Typist>
    </div> 
);

export default Question;