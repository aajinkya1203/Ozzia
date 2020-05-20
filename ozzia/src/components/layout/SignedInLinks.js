import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'



const SignedInLinks=(props)=> {
    console.log(props)
    return (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/create" className="waves-effect waves-light">Create Post</Link></li>
            <li><Link to="/create" className="waves-effect waves-light">Notifications</Link></li>
            <li><Link to="/home" className="waves-effect waves-light">Your Friends' Posts</Link></li>
            <li><Link className="waves-effect waves-light"
                onClick={()=>{
                    localStorage.clear();
                    props.logout();
                    // props.history.push('/');
                }}
                >Logout</Link></li>
            <li>
                <Link to="/profile" className="btn btn-floating prof waves-effect waves-light z-depth-0 btn-large tooltipped" data-position="bottom" data-tooltip="Your Profile">
                    { props.fname[0] + props.lname[0]}
                </Link>
            </li>
        </ul>
    )
}
const mapDispatchToProps=(dispatch)=>{
    return{
        logout:()=>dispatch({type:"LOGOUT"})
    }
}

export default connect(null,mapDispatchToProps)(SignedInLinks)
