import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';
import M from 'materialize-css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

class Login extends Component {
    state={
        email:"",
        password:""
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
        console.log(this.state);
        e.preventDefault();
        fetch('/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:this.state.email,
                password:this.state.password
            })
        }).then(res=>res.json()).then(data=>{
            console.log(this.props)
            if(data.error){
                M.toast({html:data.error});
            }else{
                localStorage.setItem("jwt",data.token);
                localStorage.setItem("user",JSON.stringify(data.user));
                this.props.userDetail(data.user);
                M.toast({html:data.message});
                this.props.history.push('/home');
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
                <div className="sidebar col s5">
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
                    <h5 className="redirect">
                        Do not have an account?
                        <br />
                        <Link to="/signup" className="hyper">
                              Create one now!
                        </Link>
                    </h5>
                </div>
                <form className="col s7" id="formbar" onSubmit={this.handleSubmit}>
                    <h4 className="formTitle">
                        Log Into Your Account !
                    </h4>
                    <hr/>
                    <div className="container formContainer">
                        <div className="input-field">
                            <input className="toChange" onChange={this.handleChange} value={this.state.email} type="email" id="email" name="email" required/>
                            <label htmlFor="email">Email ID:</label>
                        </div>
                        <div className="input-field">
                            <label className="toChange" htmlFor="password">Desired Password:</label>
                            <input onChange={this.handleChange} value={this.state.password} type="password" id="password" name="password" required/>
                        </div>
                        <div className="input-field">
                            <input type="submit" id="sbmt" value="LOG IN!" className="pink lighten-3 btn waves-effect waves-light" required/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    console.log(state);
    return{
        user:state.user
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        userDetail:(dets)=>dispatch({type:"USER",payload:dets}),
        updateRedux:()=>dispatch({type:"ALL"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
