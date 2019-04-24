import React, { Component } from 'react';

// render start menu
class Menu extends Component {

    componentWillMount () {

    }

    componentDidMount() {

    }

    render () {
        return (
            <div className="menu">
                <h1>age.quiz</h1>
                <button type="button" onClick={() => {window.location.reload()}}>start</button>
                <p>Swipe the numbers to guess the actor's age when their movie premiered.</p>
                <br/>
                <p>Maximum 5 points for each guess, -1 for each year off.</p>
                <br />
                <p>Made for mobile with React, Sanity.io and Figma, by Ole Petter Baugerød Stokke.</p>
            </div>

        )
    }
}

export default Menu;