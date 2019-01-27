import React from 'react';
import Typist from 'react-typist';
import styled from 'styled-components'

// https://css-tricks.com/multi-line-padded-text/

const H1 = styled.h1`
    font-family: 'Quicksand', sans-serif;
    font-size: 2em;
    font-weight: lighter;
    margin: 1em;
    color: white;
    text-transform: uppercase;

    span {
        background: rgb(255, 0, 140);
        color: white; 
        display: inline;
        padding: .3em;
        line-height: 1.7;
        /* Needs prefixing */
        box-decoration-break: clone;
        -webkit-box-decoration-break: clone;
    }
`;

const Question = (props) => (
    <Typist>
        <H1> <span>{props.text}</span> </H1>
    </Typist>
);

export default Question;