import React, { useState, useEffect } from 'react'
import pewdsBG from '../../images/pewdsBG.png'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

const SideTags=(props)=>{
    // if(props.user===null && localStorage.getItem("jwt")){
    //     props.updateRedux()
    // }
    // if(!props.user) return <Redirect to= {`/profile/${props.match.params.id}`} />
    // if(!localStorage.getItem("user")) return <Redirect to='/' />
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
                                {/* <a href="#user"><img className="circle" src="images/yuna.jpg"/></a> */}
                                <a href="javascript:void(0)">
                                <span className="white-text name flow-text">{ props.user.fname +" "+props.user.lname }</span>
                                </a>
                                <a href="javascript:void(0)">
                                    <span className="white-text email flow-text">{ props.user.email }</span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <a href="javascript:void(0)">
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
                        <li><Link className="waves-effect flow-text" to="/home/Ask Ozzia">Ask Ozzia</Link></li>
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
