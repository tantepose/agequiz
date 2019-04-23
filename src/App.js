// dependencies
import React, { Component } from 'react';

// components
import RoundCount from './components/roundCount.js';
import Swiper from './components/swiper.js';
import Question from './components/question.js';
import Image from './components/image.js';
import Summary from './components/summary.js';

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
    // not done yet, start new round
    if (this.state.round < 5) {
      
      // get random question, set to be current question in state
      const questionNumber = this.getRandomQuestionNumber();
      
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
    } 
    
    // all rounds done, initiate summary
    else {
      this.setState({
        mode: "summary"
      })
    }
  }

  // clicks on numbers in swiper
  numberClick (number) {
    // numbers for calculating points (max - offset)
    const answer = this.state.currentQuestion.answer;
    const guess = number; 
    const offset = Math.abs(answer - guess);
    
    const maxPoints = 5;
    var newPoints;
    if (maxPoints - offset > 0) {
      newPoints = maxPoints - offset;
    } else {
      newPoints = 0;
    }

    console.log("You clicked", guess);
    console.log("The answer is", answer);

    // give points, if any to give
    if (newPoints > 0) {
      this.setState({
        points: this.state.points + newPoints
      });
      console.log("...giving you the new points:", newPoints);
    }

    // store current question and answer in questionLog for summary
    this.setState(prevState => ({
      questionLog: [...prevState.questionLog, {
        question: prevState.currentQuestion,
        guess: guess,
        points: newPoints
      }]
    }));

    this.newRound();
  }

  // get a random number, based on length of questions array in state
  getRandomQuestionNumber () {
    return Math.floor(Math.random() * this.state.allQuestions.length);
  }

  // render the whole app, loading or not
  render() {

    // render play area if mode is play
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

    // render summary if mode is summary
    else if (this.state.mode === "summary") {
      return (
        <div className="App">
          <Summary questionLog={this.state.questionLog} points={this.state.points}/>
        </div>
      )
    }
  }

}

export default App;
