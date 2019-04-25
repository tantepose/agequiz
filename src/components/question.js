import React from 'react';

// render questions with icons
const Question = props => (
    <div className="main">
        <p>{props.question.actor} </p><img src="/face.svg" alt="actor" /><br/>
        <p>{props.question.movie} </p><img src="/movie.svg" alt="movie"/><br/>
        <p>{props.question.year} </p><img src="/eye.svg" alt="realesed"/><br/>
    </div>
);

export default Question;