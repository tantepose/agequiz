import React, { Component } from 'react';

// components
import RoundCount from './components/roundCount.js';
import Swiper from './components/swiper.js';
import Question from './components/question.js';
import Image from './components/image.js';
import Summary from './components/summary.js';

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
  // set initial state, bindings and refs
  constructor (props) {

    super();

    this.state = {
      allQuestions: [],
      currentQuestion: {
        actor: "...",
        movie: "...",
        year: "..."
      },
      questionLog: [],
      round: 0,
      points: 0,
      loading: true,
      mode: "play"
    };

    this.newRound = this.newRound.bind(this);
  }

  // make query to sanity for all possible questions before mounting
  componentWillMount() { 
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
    // not done yet? start new round
    if (this.state.round < 5) {
      
      // get array index of the new current question
      const questionNumber = this.getRandomQuestionNumber()
      
      // get a new current question
      this.setState({
        round: this.state.round + 1,
        currentQuestion: this.state.allQuestions[questionNumber]
      });

      // remove current question from questions pool in state
      this.state.allQuestions.splice(questionNumber, 1); 
    } 
    
    // all rounds done? initiate summary
    else {
      this.setState({
        mode: "summary"
      })
    }
  }

  // clicks on numbers in swiper
  numberClick (number) {

    // calculating points (max - offset)
    const answer = this.state.currentQuestion.answer;
    const guess = number; 
    const offset = Math.abs(answer - guess);
    const maxPoints = 5;
    var newPoints = maxPoints - offset;

    // give the points, if there actually are any to give
    if (newPoints > 0) {
      this.setState({
        points: this.state.points + newPoints
      });
    } else {
      newPoints = 0;
    }

    // store question, answer & new points in questionLog for summary
    this.setState(prevState => ({
      questionLog: [...prevState.questionLog, {
        question: prevState.currentQuestion,
        guess: guess,
        points: newPoints
      }]
    }));

    // start new round
    this.newRound();
  }

  // get a random number, based on length of questions array in state
  getRandomQuestionNumber () {
    return Math.floor(Math.random() * this.state.allQuestions.length);
  }

  // render the whole app, loading or not
  render() {

    // render play area, if mode is play
    if (this.state.mode === "play") {
      return (
        <div className="App">
  
          <RoundCount round={this.state.round}/>
  
          <Question question={this.state.currentQuestion} />
          
          
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

    // render summary, if mode is summary
    else if (this.state.mode === "summary") {
      return (
        <div className="summary">
          <Summary questionLog={this.state.questionLog} points={this.state.points}/>
        </div>
      )
    }
  }

}

export default App;
