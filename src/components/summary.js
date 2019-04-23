import React from 'react';

// draw the swiper with numbers from array
const Summary = (props) => (
    <div className="summary">
        {props.questionLog.map((question, key) =>
            <div className="summary-item">
                <p>{question.question.actor} was <span className="active">{question.question.answer}</span> in {question.question.movie}. You guessed <span className="active">{question.guess}</span>, and got {question.points} points.</p>
            </div>
        )}
        <div className="summary-points">
            <p>All in all, you got <span className="active">{props.points}</span> points.</p>
        </div>
    </div>
);

export default Summary;