import React, { useEffect } from 'react'
import introCover from '../../images/introCover1.svg';
import introCovered from '../../images/introCover.gif';
import Features from './features';
import IntroFooter from './introFooter';
import Navbar from '../layout/Navbar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

const Intro = (props) => {
    useEffect(()=>{
        window.$(document).ready(function(){ window.$('.parallax').parallax();});
    },[])
    if(props.user===null && localStorage.getItem("jwt")){
        props.updateRedux()
    }
    if(props.user) return <Redirect to='/home' />
    return (
        <div>
            <Navbar />
            <div className="section white">
                <div className="row container introSection">
                    <h2 className="header">ozzia</h2>
                    <p className="grey-text text-darken-3 lighten-3">
                        <i>
                            A place to share, discuss and enjoy!
                        </i>
                    </p>
                    <img src={introCovered} alt="cover" />

                </div>
            </div>

            <div className="parallax-container">
                <div className="parallax">
                    <img src={introCover} alt="cover" />
                </div>
            </div>
            <Features />
            <IntroFooter />
            
        </div>
    )
}

const mapDispatchToProps=(dispatch)=>{
    return{
        updateRedux:()=>dispatch({type:"ALL"})
    }
}
const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Intro)
