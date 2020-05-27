import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';
import M from 'materialize-css';
import { Redirect } from 'react-router-dom';
import * as emailjs from 'emailjs-com';

class Reset extends Component {
    state={
        email:""
    }
    componentDidMount(){
        window.$(document).ready(function(){
            M.updateTextFields();
            window.$("input.toChange").val("").trigger("change");
        })
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        document.getElementById("loader").className="progress";
        fetch('/reset-password',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:this.state.email
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            if(data.error){
                document.getElementById("loader").className="";
                M.toast({html:data.error});
            }else{
                console.log(data.EMAIL);
                var templateParams = {
                    token:data.token,
                    to_name:this.state.email,
                    EMAIL:data.EMAIL
                };
                emailjs.send('gmail',data.RESET_API,templateParams,data.USER_API)
                .then((response)=>{
                    console.log('SUCCESS!', response.status, response.text);
                  }).catch(err=>{
                    console.log('FAILED...', err);
                });
                M.toast({html:data.message});
                this.props.history.push('/login');
            }
        })
    }
    render() {
        if(this.props.user===null && localStorage.getItem("jwt")){
            this.props.updateRedux()
        }
        if(this.props.user) return <Redirect to='/home' />
        return (
            <div className="row" id="signrow">
                <div className="sidebar col s12 m10 offset-m1 l4">
                    <Link to="/">
                        <h2 className="signupTitle">
                            Ozzia
                        </h2>
                    </Link>
                    <p className="signupBody">
                        <i>
                            Your own personal space!
                        </i>
                    </p>
                    <h5 className="redirect center likeText"
                        style={{fontSize:"6vw"}}
                    >
                        Remember your password?
                        <br />
                        <Link to="/login" className="hyper">
                              Log in now!
                        </Link>
                    </h5>
                </div>
                <form className="col s12 m10 offset-m1 l8" id="formbar" onSubmit={this.handleSubmit}>
                    <h4 className="formTitle postTitle"
                        style={{fontSize:"10vw"}}
                    >
                        Reset your Password !
                    </h4>
                    <hr/>
                    <div className="container formContainer">
                        <div className="input-field">
                            <input className="toChange" onChange={this.handleChange} value={this.state.email} type="email" id="email" name="email" required/>
                            <label htmlFor="email">Email ID:</label>
                        </div>
                        <div className="input-field">
                            <input type="submit" id="sbmt" value="RESET PASSWORD!" className="pink lighten-3 btn waves-effect waves-light" required/>
                        </div>
                        <div className="" id="loader">
                            <div className="indeterminate"></div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Reset
