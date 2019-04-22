// dependencies
import React, { Component } from 'react';

// components
import RoundCount from './components/roundCount.js';
import Swiper from './components/swiper.js';
import Question from './components/question.js';
import Image from './components/image.js';

// local files
// import loading from './public/loading.gif';

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
      allQuestions: [],
      loadingQuestion: {
        actor: "...",
        movie: "...",
        year: "..."
      },
      round: 0,
      points: 0,
      loading: true
    };

    this.newRound = this.newRound.bind(this);
  }

  componentWillMount() { 
    // make query to sanity for all possible questions
    const query = '*[ _type == "question"] {movie, actor, year, answer, image}';
    
    client
      .fetch(query)
      
      .then(questions => {
        this.setState({
          allQuestions: questions,
          currentQuestion: {},
          loading: false
        });
        this.newRound();
      })

      .catch(err => {
        console.error('Oh no, an error occured: ', err)
      });
  }

  newRound () {
    // get random question number
    const questionNumber = this.getRandomQuestionNumber();
    
    // set corresponding question to be current question in state
    this.setState({
      loading: true,
      round: this.state.round + 1,
      currentQuestion: this.state.allQuestions[questionNumber]
    }, () => {
      this.setState({
        loading: false
      })
    });

    // remove current question from questions pool in state
    this.state.allQuestions.splice(questionNumber, 1); 

    console.log("Your current points:", this.state.points);
  }

  // clicks on numbers in swiper
  numberClick (number) {
    // numbers for calculating points (max - offset)
    const answer = this.state.currentQuestion.answer;
    const guess = number; 
    const offset = Math.abs(answer - guess);
    
    const maxPoints = 5;
    const newPoints = maxPoints - offset;

    console.log("You clicked", guess);
    console.log("The answer is", answer);

    // give points, if any to give
    if (newPoints > 0) {
      this.setState({
        points: this.state.points + newPoints
      });
      console.log("...giving you the new points:", newPoints);
    }

    this.newRound();
  }

  // get a random number, based on length of questions array in state
  getRandomQuestionNumber () {
    return Math.floor(Math.random() * this.state.allQuestions.length);
  }

  // render the whole app, loading or not
  render() {
    return (
      <div className="App">

        <RoundCount round={this.state.round}/>

        { (this.state.loading) 
            ? <Question question={this.state.loadingQuestion} />
            : <Question question={this.state.currentQuestion} />
        }
        
        { (this.state.loading) 
            ? <Image image={'/loading.gif'} />
            : <Image image={urlFor(this.state.currentQuestion.image)} />
        }

        { (this.state.loading)
          ? null
          : <Swiper onClick={this.numberClick.bind(this)} />
        }

      </div>
    );
  }
}

export default App;
