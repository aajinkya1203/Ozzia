import React, { useState, useEffect } from 'react'
import pewdsBG from '../../images/pewdsBG.png'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

const SideTags=(props)=>{
    useEffect(()=>{
        window.$(document).ready(function(){
            window.$('.sidenav').sidenav();
        });
        if(props.user===null && localStorage.getItem("jwt")){
            props.updateRedux()
        }
    },[])
    return (
        <>
        {
            props.user ? (
                <div>
                    <ul id="slide-out" className="sidenav black flow-text">
                        <li>
                            <div className="user-view">
                                <div className="background">
                                    <img src={ pewdsBG } />
                                </div>
                                <Link to="/profile">
                                    <img className="circle" src={props.user.photo}/>
                                </Link>
                                <Link to="/profile">
                                <span className="white-text name flow-text">{ props.user.fname +" "+props.user.lname }</span>
                                </Link>
                                <Link to="/profile">
                                    <span className="white-text email flow-text">{ props.user.email }</span>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <a href="#!">
                                <i className="material-icons flow-text">lightbulb_outline</i>
                                    Browse More Tags
                            </a>
                        </li>
                        <li>
                            <div className="divider"></div>
                        </li>
                        
                        <li><Link className="waves-effect flow-text" to="/home/Funny">Funny</Link></li>
                        <li><Link className="waves-effect flow-text" to="/home/Animals">Animals</Link></li>
                        <li><Link className="waves-effect flow-text" to="/home/Meme">Meme</Link></li>
                        <li><Link className="waves-effect flow-text" to="/home/Anime">Anime</Link></li>
                        <li><Link className="waves-effect flow-text" to="/home/Ask ozzia">Ask Ozzia</Link></li>
                        <li><Link className="waves-effect flow-text" to="/home/Car">Car</Link></li>
                        <li><Link className="waves-effect flow-text" to="/home/Gaming">Gaming</Link></li>
                        <li><Link className="waves-effect flow-text" to="/home/Music">Music</Link></li>
                        <li><Link className="waves-effect flow-text" to="/home/Travel & Photography">Travel & Photography</Link></li>
                        <li><Link className="waves-effect flow-text" to="/home/Tech">Tech</Link></li>
                        <li><Link className="waves-effect flow-text" to="/home/Information">Information</Link></li>
                        <li><Link className="waves-effect flow-text" to="/home/Political & News">Political & News</Link></li>
                        <li><Link className="waves-effect flow-text" to="/home/Health & Fitness">Health & Fitness</Link></li>
                        <li><Link className="waves-effect flow-text" to="/home/Personal">Personal</Link></li>
                    </ul>
                    <a data-target="slide-out"
                    onMouseUp={()=>{
                        document.querySelectorAll(".waves-ripple ").forEach(item=>{item.style.opacity=0})
                        }}
                        className="btn-floating flow-text btn-large waves-effect waves-light red sidenav-trigger floatAlways">
                        <i className="material-icons">dvr</i>
                    </a>
                </div>
            ) : (<h6>o</h6>)
        }
            
        </>
    )
}

const mapStateToProps=(state)=>{
    return{
        user: state.user
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        updateRedux: ()=>dispatch({type:"ALL"})
    }
}

export default connect(mapStateToProps)(SideTags)
