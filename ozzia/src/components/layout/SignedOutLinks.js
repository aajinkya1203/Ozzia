import React from 'react';
import { Link } from 'react-router-dom'

const SignedOutLinks=()=> {
    return (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link className="waves-effect waves-light" to="/login">Log In</Link></li>
            <li><Link className="waves-effect waves-light" to="/signup">Sign Up</Link></li>

        </ul>
    )
}

export default SignedOutLinks
