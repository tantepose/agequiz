import React from 'react';

// draw question text
const Question = props => (
    <div className="main">
        <p>{props.question.actor} </p><img src="/face.svg" alt="" /><br/>
        <p>{props.question.movie} </p><img src="/movie.svg" alt=""/><br/>
        <p>{props.question.year} </p><img src="/eye.svg" alt=""/><br/>
    </div>
);

export default Question;