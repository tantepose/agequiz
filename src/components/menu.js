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
                <h1><span role="img" aria-label="age guiz">👨‍👧‍👩‍👧‍👶</span></h1>
                <button type="button" onClick={() => {this.props.play()}}>start</button>
                <p>Swipe and press the numbers to guess the actor's age when their movie premiered.</p>
                <br/>
                <p>5 points per correct guess, -1 point per year off.</p>
                <br />
                <p>Made for handheld devices with React & Sanity.io, by Ole Petter Baugerød Stokke.</p>

            </div>

        )
    }
}

export default Menu;