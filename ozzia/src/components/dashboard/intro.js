import React, { useEffect } from 'react'
import introCover from '../../images/introCover1.svg';
import introCovered from '../../images/introCover.gif';
import Features from './features';
import IntroFooter from './introFooter';
import Navbar from '../layout/Navbar';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'

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
            <div className="section white row">
                <div className="container introSection col s12">
                    <img src={introCovered} alt="cover" className="col s12" />
                    <h2 className="header col s12 center">ozzia</h2>
                    <p className="grey-text text-darken-3 lighten-3 col s12 center">
                        <i>
                            A place to share, discuss and enjoy!
                        </i>
                    </p>

                </div>
            </div>

            {/* <div className="parallax-container col s12">
                <div className="parallax col s12">
                    <img src={introCover} alt="cover" className="col s12 responsive-img" />
                </div>
            </div> */}

            <div id="index-banner" className="parallax-container">
                <div className="section no-pad-bot">
                    <div className="container">
                        <br /><br />
                        <h1 className="header center white-text text-lighten-2">Features</h1>
                        <div className="row center">
                            <h5 className="header white-text col s12 light">Learn what all ozzia can do!</h5>
                        </div>
                        <div className="row center">
                        <Link to="/login" id="download-button" className="btn-large waves-effect waves-light teal lighten-1">Get Started</Link>
                        </div>
                        <br /><br />
                    </div>
                </div>
                <div className="parallax">
                    <img src={introCover} alt="Features Cover Picture" />
                </div>
            </div>

            <Features />
            {/* <IntroFooter /> */}
            
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
