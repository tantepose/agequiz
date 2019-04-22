import React from 'react';

// render top text with current round highlighted 
// in an incredibly stupid way, mind you
const RoundCount = (props) => (
    <div className="top">

        { (props.round === 1)
            ? <p><span className="active">1</span>,2,3,4,5</p>
            : null
        }

        { (props.round === 2)
            ? <p>1,<span className="active">2</span>,3,4,5</p>
            : null
        }

        { (props.round === 3)
            ? <p>1,2,<span className="active">3</span>,4,5</p>
            : null
        }

        { (props.round === 4)
            ? <p>1,2,3,<span className="active">4</span>,5</p>
            : null
        }

        { (props.round === 5)
            ? <p>1,2,3,4,<span className="active">5</span></p>
            : null
        }
        
        { (props.round === 0)
            ? <p>1,2,3,4,5</p>
            : null
        }    
        
    </div>
);

export default RoundCount;