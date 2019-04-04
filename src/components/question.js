import React from 'react';
import Typist from 'react-typist';

const Question = props => (
    <div className="main">
        <p>{props.question.actor} </p><img src="/face.svg" /><br/>
        <p>{props.question.movie} </p><img src="/movie.svg" /><br/>
        <p>{props.question.year} </p><img src="/eye.svg" /><br/>
    </div>
);

export default Question;