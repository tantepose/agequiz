// dependencies
import React, { Component } from 'react';

// local files

// components
import Swiper from './components/swiper.js';
import Question from './components/question.js';
import Image from './components/image.js';

class App extends Component {

  constructor (props) {
    super();

    this.state = {
      question: {
        actor: "Julia Roberts",
        movie: "Pretty Woman",
        year: 1990,
        answer: 30,
        image: "/roberts-prettywoman.jpg"
      }
    };
  }

  // componentWillMount () {
  //   this.setState({
  //     question: questions[this.getRandom()]
  //   });
  // }

  // getRandom () {
  //   const randomNumber = Math.floor(Math.random()*questions.length);
  //   return randomNumber;
  // }

  swiperClick () {
    console.log('click!');
  }

  render() {
    return (
      <div className="App">

        <div className="top">
          <p>1,2,<span className="active">3</span>,4,5</p>
        </div>

        <Question question={this.state.question} />

        <Image image={this.state.question.image} />

        <Swiper onClick={() => {this.swiperClick()}} />

      </div>
    );
  }
}

export default App;
