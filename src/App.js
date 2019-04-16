// dependencies
import React, { Component } from 'react';

// components
import Swiper from './components/swiper.js';
import Question from './components/question.js';
import Image from './components/image.js';

// setting up sanity

// sanity client
const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: 'qu4ls7hf',
  dataset: 'production',
  useCdn: false
});

// sanity image url builder
const imageUrlBuilder = require('@sanity/image-url');
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source)
}

class App extends Component {
  // set initial state
  constructor (props) {
    super();
    this.state = {
      questions: [],
      round: 1,
      loading: true
    };

    this.startRound = this.startRound.bind(this);
  }

  componentWillMount() { 
    // make query to sanity for all possible questions
    const query = '*[ _type == "question"] {movie, actor, year, answer, image}';
    
    client
      .fetch(query)
      
      .then(questions => {
        this.setState({
          questions: questions,
          question: {},
          loading: false
        });
        this.startRound();
      })

      .catch(err => {
        console.error('Oh no, error occured: ', err)
      });
  }

  startRound () {
    // get random question number
    const questionNumber = this.getRandomQuestionNumber();
    
    // set corresponding question to be current question in state
    this.setState({
      question: this.state.questions[questionNumber]
    });

    // remove current question from questions pool in state
    this.state.questions.splice(questionNumber, 1); 
  }

  // get a random number, based on length of questions array in state
  getRandomQuestionNumber () {
    return Math.floor(Math.random() * this.state.questions.length);
  }

  // clicks on numbers in swiper
  numberClick (number) {
    console.log('click: ', number);
    this.startRound(); // doesnt work :(
  }

  render() {
    return (
      <div className="App">

        <div className="top">
          <p>1,2,<span className="active">3</span>,4,5</p>
        </div>

        { (this.state.loading) 
            ? null
            : <Question question={this.state.question} />
        }
        
        { (this.state.loading) 
            ? null
            : <Image image={urlFor(this.state.question.image)} />
        }

        <Swiper onClick={this.numberClick} />

      </div>
    );
  }
}

export default App;
