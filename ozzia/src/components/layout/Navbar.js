import React,{useEffect} from 'react';
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import pewdsBG from '../../images/pewdsBG.png'

const Navbar=(props)=> {
    useEffect(()=>{
        window.$(document).ready(function(){
            window.$('.sidenav').sidenav();
        });
    },[])
    const renderLinks = props.user ? <SignedInLinks classID="right hide-on-med-and-down" fname={props.user.fname} lname={props.user.lname}/> :
     <SignedOutLinks classID="right hide-on-med-and-down" />;
    const sideRender = props.user ? (
            <ul id="mobile-demo" className="sidenav black flow-text">
                <li>
                    <div className="user-view">
                        <div className="background">
                            <img src={ pewdsBG } />
                        </div>
                        <Link to="/profile"
                            onMouseUp={()=>{
                                document.querySelectorAll(".waves-ripple ").forEach(item=>{item.style.opacity=0})
                            }}
                        >
                            <img className="circle" src={props.user.photo}/>
                        </Link>
                        <Link to="/profile"
                            onMouseUp={()=>{
                                document.querySelectorAll(".waves-ripple ").forEach(item=>{item.style.opacity=0})
                            }}
                        >
                        <span className="white-text name flow-text">{ props.user.fname +" "+props.user.lname }</span>
                        </Link>
                        <Link to="/profile"
                            onMouseUp={()=>{
                                document.querySelectorAll(".waves-ripple ").forEach(item=>{item.style.opacity=0})
                            }}
                        >
                            <span className="white-text email flow-text">{ props.user.email }</span>
                        </Link>
                    </div>
                </li>

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
            </ul>
        ) : (
            <ul id="mobile-demo" className="sidenav black flow-text">
                <li>
                    <div className="user-view">
                        <div className="background">
                            <img src={ pewdsBG } />
                        </div>
                        <Link to='/'>OZZIA</Link>
                    </div>
                </li>
                <li><Link className="waves-effect waves-light" to="/login">Log In</Link></li>
                <li><Link className="waves-effect waves-light" to="/signup">Sign Up</Link></li>    
            </ul>
        );
    
    return (
        <div>
            <nav className="z-depth-0">
                <div className="nav-wrapper">
                    <Link to='/' className="brand-logo headNav">ozzia</Link>
                    <Link to="#" data-target="mobile-demo" className="black-text sidenav-trigger"><i class="material-icons">menu</i></Link>
                        <div>
                            { renderLinks }
                        </div>
                </div>
            </nav>
            { sideRender }
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        logout:()=>dispatch({type:"LOGOUT"})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
