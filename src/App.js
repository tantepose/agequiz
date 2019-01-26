// dependencies
import React, { Component } from 'react';

// local files
import './App.css';
import questions from './data/questions.js';

// components
import Swiper from './components/swiper.js';
import Question from './components/question.js';
import Image from './components/image.js';

class App extends Component {

  // constructor (props) {
  //   super();
  // }

  componentWillMount () {
    this.setState({
      question: questions[this.getRandom()].text
    });
  }

  getRandom () {
    const randomNumber = Math.floor(Math.random()*questions.length);
    return randomNumber;
  }

  render() {
    return (
      <div className="App">
        <Question text={this.state.question} />
        <Image />
        <Swiper />
      </div>
    );
  }
}

export default App;
