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
        password:"",
        photo:"",
        url:"https://res.cloudinary.com/engima/image/upload/v1590309246/default_yotaqs.png"
    }
    componentDidMount(){
        window.$(document).ready(function(){
            M.updateTextFields();
            window.$('.modal').modal();
            window.$("input.toChange").val("").trigger("change");
        })
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    PostDetails=(e)=>{
        e.preventDefault();
        document.getElementById("loader").className="progress";
        if(this.state.photo){
            const fileData = new FormData();
            fileData.append("file",this.state.photo);
            fileData.append("upload_preset","enigma");
            fileData.append("cloud_name","engima");

            // saving to cloud first
            fetch('https://api.cloudinary.com/v1_1/engima/image/upload',{
                method:"POST",
                body:fileData
            }).then(res=>res.json()).then(data=>{
                // console.log(data);
                this.setState({
                    url:data.url
                });
                // saving to db
                this.PostData();
            }).catch(err=>{
                console.log(err);
                document.getElementById("loader").className="";
                M.toast({html:"Something didn't go right! Try again!"})
                return err
            })
        }else{
            this.PostData();
        }

    }
    PostData=(e)=>{
        fetch('/signup',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                fname:this.state.fname,
                lname:this.state.lname,
                email:this.state.email,
                password:this.state.password,
                picUrl:this.state.url
            })
        }).then(res=>res.json()
        ).then(data=>{
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
                        Already have an account? 
                        <br />
                        <Link to="/login" className="hyper">
                              Log into your account!
                        </Link>
                    </h5>
                </div>
                <form className="col s12 m10 offset-m1 l8" id="formbar" onSubmit={this.PostDetails}>
                    <h4 className="formTitle postTitle"
                        style={{fontSize:"10vw"}}
                    >
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
                        {/* btn for file upload */}
                        <label style={{display:"inline-block",fontSize:'1.1em'}}>Select a Profile Picture: </label>
                        <a href="#modal1" className="btn-floating btn-large modal-trigger waves-effect waves-light red" style={{
                            display:"inline-block",
                            margin:"0 20px"
                        }}>
                            <i className="material-icons">camera_alt</i>
                        </a>
                        <p className="grey-text">
                            <i>You can add / edit your profile picture later too!</i>
                        </p>
                        {/* file upload */}
                        <div id="modal1" className="modal">
                            <div className="modal-content">
                                <h4>Upload a Profile Picture</h4>
                                    <div className="file-field input-field">
                                        <div className="btn">
                                            <span>File</span>
                                            <input type="file" onChange={(e)=>{this.setState({photo:e.target.files[0]})}} id="photo"/>
                                        </div>
                                        <div className="file-path-wrapper">
                                            <input className="file-path validate" type="text"/>
                                        </div>
                                    </div>
                            </div>
                            <div className="modal-footer">
                                <a href="#!" className="modal-close waves-effect waves-green btn-flat">SELECT</a>
                            </div>
                        </div>
                        
                        <div className="input-field">
                            <input type="submit" id="sbmt" value="CREATE!" className="pink lighten-3 btn waves-effect waves-light" required/>
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
