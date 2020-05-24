import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'


const SignedInLinks=(props)=> {
    return (
        <ul id="nav-mobile" className={props.classID}>
            <li><Link to="/create" className="waves-effect waves-light">Create Post</Link></li>
            <li><Link to="/create" className="waves-effect waves-light">Notifications</Link></li>
            <li><Link to="/subbed" className="waves-effect waves-light">Your Friends' Posts</Link></li>
            <li><Link className="waves-effect waves-light"
                onClick={()=>{
                    localStorage.clear();
                    props.logout();
                    // props.history.push('/');
                }}
                >Logout</Link></li>
            <li>
                <Link to="/profile"
                onMouseUp={()=>{
                    document.querySelectorAll(".waves-ripple ").forEach(item=>{item.style.opacity=0})
                 }}
                className="btn btn-floating prof waves-effect waves-light z-depth-0 btn-large tooltipped" data-position="bottom" data-tooltip="Your Profile">
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
