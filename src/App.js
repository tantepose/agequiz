// dependencies
import React, { Component } from 'react';

// components
import Swiper from './components/swiper.js';
import Question from './components/question.js';
import Image from './components/image.js';

import imageUrlBuilder from '@sanity/image-url';

// sanity init
const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: 'qu4ls7hf',
  dataset: 'production',
  useCdn: false
});

// sanity image url builder
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source)
}

class App extends Component {
  constructor (props) {
    super();

    this.state = {
      questions: [],
      loading: true
    };
  }

  componentWillMount() { 
    const query = '*[ _type == "question"] {movie, actor, year, answer, image}';

    client
      .fetch(query)

      .then(questions => {
        var fetchedQuestions = [];
        questions.map((question) => fetchedQuestions.push(question));
        
        this.setState({questions: fetchedQuestions}, () => {
          console.log("questions fetched: ", this.state.questions);
          this.setState({loading: false});
        });
      })

      .catch(err => {
        console.error('Oh no, error occured: ', err)
      });
  }

  // getRandom () {
  //   const randomNumber = Math.floor(Math.random()*questions.length);
  //   return randomNumber;
  // }

  swiperClick (number) {
    console.log('click: ', number);
  }

  render() {
    return (
      <div className="App">

        <div className="top">
          <p>1,2,<span className="active">3</span>,4,5</p>
        </div>

        { (this.state.loading) 
            ? null
            : <Question question={this.state.questions[0]} />
        }
        
        { (this.state.loading) 
            ? null
            : <Image image={urlFor(this.state.questions[0].image)} />
        }

        <Swiper onClick={this.swiperClick} />

      </div>
    );
  }
}

export default App;
