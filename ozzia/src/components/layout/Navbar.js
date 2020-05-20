import React from 'react';
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';

const Navbar=(props)=> {
    const renderLinks = props.user ? <SignedInLinks fname={props.user.fname} lname={props.user.lname}/> : <SignedOutLinks />;
    return (
        <nav className="z-depth-0">
            <div className="nav-wrapper">
            <Link to='/' className="brand-logo headNav">ozzia</Link>
                <div>
                    { renderLinks }
                </div>
            </div>
        </nav>

    )
}

const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(Navbar)
