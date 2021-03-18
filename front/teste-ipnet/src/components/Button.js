import React from 'react';

function Button(props) {
    console.log(props)
    return(
        <button onClick={props.action}>{props.oi}</button>
    )
}

export default Button;