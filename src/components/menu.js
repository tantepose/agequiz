import React, { Component } from 'react';

// start menu (this should probably be a stateless component)
class Menu extends Component {

    render () {
        return (
            <div className="menu">
                <img src="/face.svg" alt="actor" />
                <p>Swipe and press the numbers to guess the actor's age when their movie premiered.</p>
                <br/>                
                <p>Made for handheld devices with React & Sanity.io by Ole Petter Baugerød Stokke.</p>
                <button type="button" onClick={() => {this.props.play()}}>start</button>
            </div>

        )
    }
}

export default Menu;