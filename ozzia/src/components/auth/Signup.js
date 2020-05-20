import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';
import M from 'materialize-css';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Signup extends Component {
    state={
        fname:"",
        lname:"",
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
    PostData=(e)=>{
        e.preventDefault();
        fetch('/signup',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                fname:this.state.fname,
                lname:this.state.lname,
                email:this.state.email,
                password:this.state.password
            })
        }).then(res=>res.json()
        ).then(data=>{
            if(data.error){
                M.toast({html:data.error});
            }else{
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
                        Already have an account? 
                        <br />
                        <Link to="/login" className="hyper">
                              Log into your account!
                        </Link>
                    </h5>
                </div>
                <form className="col s7" id="formbar" onSubmit={this.PostData}>
                    <h4 className="formTitle">
                        Create A New Account !
                    </h4>
                    <hr/>
                    <div className="container formContainer">
                        <div className="input-field">
                            <label htmlFor="fname">First Name:</label>
                            <input className="toChange" onChange={this.handleChange} value={this.state.fname} type="text" id="fname" name="fname" required/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="lname">Last Name:</label>
                            <input className="toChange" onChange={this.handleChange} value={this.state.lname} type="text" id="lname" name="lname" required/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="email">Email ID:</label>
                            <input className="toChange" onChange={this.handleChange} value={this.state.email} type="email" id="email" name="email" required/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Desired Password:</label>
                            <input className="toChange" onChange={this.handleChange} value={this.state.password} type="password" id="password" name="password" required/>
                        </div>
                        <div className="input-field">
                            <input type="submit" id="sbmt" value="CREATE!" className="pink lighten-3 btn waves-effect waves-light" required/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        updateRedux:()=>dispatch({type:"ALL"})
    }
}

const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup)
