import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import pewdsBG from '../../images/pewdsBG.png'

const Navbar=(props)=> {
    const [search,setSearch] = useState('');
    const [userDetails,setUserDetails] = useState([]);
    useEffect(()=>{
        window.$(document).ready(function(){
            window.$('.sidenav').sidenav();
            window.$('.modal').modal();
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

                <li><Link data-target="modal12" className="waves-effect waves-light modal-trigger">
                <i className="material-icons">search</i>
                </Link></li>
                <li><Link to="/create" className="waves-effect waves-light">Create Post</Link></li>
                {/* <li><Link to="/create" className="waves-effect waves-light">Notifications</Link></li> */}
                <li><Link to="/subbed" className="waves-effect waves-light">Your Friends' Posts</Link></li>
                <li><Link to='#!' className="waves-effect waves-light"
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
    
    const SearchUsers = (query) =>{
        // console.log(query)
        setSearch(query);
        fetch('/search-users',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                query
            })
        }).then(res=>res.json()).then(result=>{
            setUserDetails(result.result);
        }).catch(err=>{
            console.log(err)
        })
    }
    
    return (
        <div>
            <nav className="z-depth-0">
                <div className="nav-wrapper">
                    <Link to='/' className="brand-logo headNav">ozzia</Link>
                    <Link to="#" data-target="mobile-demo" className="black-text sidenav-trigger"><i className="material-icons">menu</i></Link>
                        <div>
                            { renderLinks }
                        </div>
                </div>
            </nav>
            { sideRender }
            <div id="modal12" className="modal">
                <div className="modal-content">
                <div className="input-field">
                    <input className="toChange" onChange={(e)=>SearchUsers(e.target.value)} value={search} type="text" id="searc" name="searc" required/>
                    <label htmlFor="searc">Search Your Friends:</label>
                </div>
                <ul className="collection">
                {
                    userDetails.length!==0? (
                        userDetails.map(user=>{
                            return(
                                <li className="collection-item avatar">
                                    <Link to={user._id.toString()===props.user._id.toString()?`/profile`:`/profile/${user._id}`}>
                                        <img src={user.photo} alt="Avatar" className="circle" />
                                        <span className="title">{ user.fname +' '+user.lname }</span>
                                        <p>{ user.email }</p>
                                        <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                                    </Link>
                                </li>
                            )
                        })
                    ): null
                }
                </ul>
                </div>
                <div className="modal-footer">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat"
                    onClick={()=>setSearch('')}
                >CLOSE</a>
                </div>
            </div>
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
