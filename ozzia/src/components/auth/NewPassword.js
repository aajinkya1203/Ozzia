import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';
import M from 'materialize-css';
// import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

class Login extends Component {
    state={
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
        e.preventDefault();
        document.getElementById("loader").className="progress";
        fetch('/new-password',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password:this.state.password,
                token:this.props.match.params.token
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            if(data.error){
                document.getElementById("loader").className="";
                M.toast({html:data.error});
            }else{
                M.toast({html:data.message});
                this.props.history.push('/login');
            }
        })
    }
    render() {
        console.log(this.props.match.params.token)
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
                </div>
                <form className="col s12 m10 offset-m1 l8" id="formbar" onSubmit={this.handleSubmit}>
                    <h4 className="formTitle postTitle"
                        style={{fontSize:"10vw"}}
                    >
                        Enter Your New Password !
                    </h4>
                    <hr/>
                    <div className="container formContainer">
                        <div className="input-field">
                            <label className="toChange" htmlFor="password">Desired Password:</label>
                            <input onChange={this.handleChange} value={this.state.password} type="password" id="password" name="password" required/>
                        </div>
                        <div className="input-field">
                            <input type="submit" id="sbmt" value="UPDATE PASSWORD!" className="pink lighten-3 btn waves-effect waves-light" required/>
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

// const mapStateToProps=(state)=>{
//     console.log(state);
//     return{
//         user:state.user
//     }
// }

// const mapDispatchToProps=(dispatch)=>{
//     return{
//         userDetail:(dets)=>dispatch({type:"USER",payload:dets}),
//         updateRedux:()=>dispatch({type:"ALL"})
//     }
// }
// connect(mapStateToProps, mapDispatchToProps)

export default Login
