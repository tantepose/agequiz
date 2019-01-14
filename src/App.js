import React, { Component } from 'react';

import './App.css';

import Swiper from './components/swiper.js';
import Question from './components/question.js';
import Image from './components/image.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Question />
        <Image />
        <Swiper />
      </div>
    );
  }
}

export default App;
