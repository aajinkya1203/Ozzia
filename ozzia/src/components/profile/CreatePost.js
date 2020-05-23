import React, { Component } from 'react';
import Navbar from '../layout/Navbar';
import M from 'materialize-css'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SideTags from './SideTags'

class CreatePost extends Component{
    state={
        title:"",
        description:"",
        photo:"",
        tag:"Funny",
        url:""
    }
    componentDidMount(){
        window.$(document).ready(function(){
            window.$('.modal').modal();
            window.$('select').formSelect();
            window.$('.sidenav').sidenav();
        });
        if(this.props.user===null && localStorage.getItem("jwt")){
            this.props.updateRedux()
        }    
    }
    PostDetails=(e)=>{
        e.preventDefault();
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
            fetch('/create',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title:this.state.title,
                    description:this.state.description,
                    tag:this.state.tag,
                    picUrl:this.state.url
                })
            }).then(res=>res.json()).then(data=>{
                // console.log(data)
                if(data.error){
                    M.toast({html:data.error});
                }else{
                    M.toast({html:"Post Created!"});
                    this.props.history.push('/home');
                }
            }).catch(err=>{
                console.log(err)
            })

        }).catch(err=>{
            console.log(err);
            return err
        })

    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    render(){
        // console.log(this.props)
        if(this.props.user===null && !localStorage.getItem("jwt")){
            return <Redirect to='/' />
        }
        return(
            <>
            {
                this.props.user ? 
                (
                    <div>
                    <Navbar />
                    <div className="row createContainer" style={{
                        height:"max-content",
                    }}>
                        <div className="col s3">
                            <div className="card-panel teal" style={{
                            height:"350px"
                        }}> 
                                <h5 className="white-text">
                                    Create A Post
                                </h5>
                                <hr style={{backgroundColor:"white",margin:"20px auto"}}/>
                                <span className="white-text" style={{letterSpacing:"0.05em",fontWeight:"lighter"}}>
                                    Create a post and let everyone in the world know
                                    about it by adding tags!
                                    <br /><br />
                                    NOTE: Be sure to select a picture!
                                </span>
                            </div>
                        </div>
                        
                        <div className="col s8">
                            <form onSubmit={this.PostDetails}>
                            <div className="input-field">
                                <label htmlFor="title">Title:</label>
                                <input className="toChange" onChange={this.handleChange} value={this.state.title} id="title" type="text" required />
                            </div>
                            <div className="input-field">
                                <label htmlFor="description">Description:</label>
                                <input className="toChange" onChange={this.handleChange} value={this.state.description} id="description" type="text" required />
                            </div>
                            <label style={{display:"inline-block",fontSize:'1.1em'}}>Select a Picture: </label>
                            <a href="#modal1" className="btn-floating btn-large modal-trigger waves-effect waves-light red" style={{
                                display:"inline-block",
                                margin:"0 20px"
                            }}>
                                <i className="material-icons">camera_alt</i>
                            </a>
                            
                            <div className="input-field col s12" style={{
                                display:"block",
                                fontWeight:"500",
                            }}>
                                <select id="tag" defaultValue="Funny" onChange={this.handleChange}>
                                    <option value="" disabled>Choose your option</option>
                                    <option value="Funny">Funny</option>
                                    <option value="Animals">Animals</option>
                                    <option value="Meme">Meme</option>
                                    <option value="Anime">Anime</option>
                                    <option value="Ask ozzia">Ask ozzia</option>
                                    <option value="Car">Car</option>
                                    <option value="Gaming">Gaming</option>
                                    <option value="Music">Music</option>
                                    <option value="Travel & Photography">Travel & Photography</option>
                                    <option value="Tech">Tech</option>
                                    <option value="Information">Information</option>
                                    <option value="Political & News">Political & News</option>
                                    <option value="Health & Fitness">Health & Fitness</option>
                                    <option value="Personal">Personal</option>
                                </select>
                                <label style={{
                                    fontSize:'18px'
                                }}>Select A Tag:</label>
                            </div>

                            <div id="modal1" className="modal">
                                <div className="modal-content">
                                    <h4>Upload a picture</h4>
                                        <div className="file-field input-field">
                                            <div className="btn">
                                                <span>File</span>
                                                <input type="file" onChange={(e)=>{this.setState({photo:e.target.files[0]})}} id="photo"/>
                                            </div>
                                            <div className="file-path-wrapper">
                                                <input className="file-path validate" type="text" required/>
                                            </div>
                                        </div>
                                </div>
                                <div className="modal-footer">
                                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">SELECT</a>
                                </div>
                            </div>
                            
                            <div className="input-field">
                                <input className="btn" type="submit" value="POST!" />
                            </div>
                        </form>
                        </div>
                    </div>
                    <SideTags />
                </div>
                
                ) : (
                    <h2>Loading...</h2>
                )
            }
            </> 
        )
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        updateRedux:()=>dispatch({type:"ALL"})
    }
}

const mapStateToProps=(state)=>{
    return{
        user: state.user
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreatePost);