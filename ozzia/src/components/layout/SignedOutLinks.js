import React from 'react';
import { Link } from 'react-router-dom'

const SignedOutLinks=(props)=> {
    return (
        <ul id="nav-mobile" className={props.classID}>
            <li><Link className="waves-effect waves-light" to="/login">Log In</Link></li>
            <li><Link className="waves-effect waves-light" to="/signup">Sign Up</Link></li>

        </ul>
    )
}

export default SignedOutLinks
