import React from 'react';
import image from '../data/image.jpg'
import styled from 'styled-components'

const ImageImage = styled.img`
    width: 80%;
    border-radius: 50%;
    margin-left: 10%;
    margin-right: 10%;
`;

const Image = (props) => (
    <ImageImage src={image} />    
);

export default Image;