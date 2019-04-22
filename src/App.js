// dependencies
import React, { Component } from 'react';

// components
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
      round: 1,
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
        console.error('Oh no, error occured: ', err)
      });
  }

  newRound () {
    // get random question number
    const questionNumber = this.getRandomQuestionNumber();
    
    // set corresponding question to be current question in state
    this.setState({
      loading: true,
      currentQuestion: this.state.allQuestions[questionNumber]
    }, () => {
      this.setState({
        loading: false
      })
    });

    // remove current question from questions pool in state
    this.state.allQuestions.splice(questionNumber, 1); 
  }

  // clicks on numbers in swiper
  numberClick (number) {
    console.log('click: ', number);
    console.log('this:', this);
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

        <div className="top">
          <p>1,2,<span className="active">3</span>,4,5</p>
        </div>

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
