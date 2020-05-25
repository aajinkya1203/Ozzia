import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar'
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import SideTags from './SideTags';
import LoadingScreen from '../../images/LoadingScreen.gif'
import empty from '../../images/empty1.svg'
import M from 'materialize-css'

const Profile=(props)=> {
    const [myPost,setPosts] = useState([]);
    const [photo,setPhoto] = useState("");
    const [url,setUrl] = useState("");
    useEffect(()=>{
        console.log(props.user)
        window.$(document).ready(function(){
            window.$('.sidenav').sidenav();
            window.$('.modal').modal();
        });
        if(props.user===null && localStorage.getItem("jwt")){
            props.updateRedux()
        }
        fetch('/myposts',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt") 
            },
            method:"GET"
        }).then(res=>res.json()).then(data=>{
            setPosts(data.myposts);
        })
    },[])
    
    const likePost=(id)=>{
        fetch('/like',{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                PostID:id
            })
        }).then(res=>res.json()).then(result=>{
            const newData = myPost.map(item=>{
                if(result.message._id==item._id){
                    return result.message;
                }else{
                    return item;
                }
            })
            setPosts(newData);
        }).catch(err=>{
            console.log(err)
        })
    }
    const unlikePost=(id)=>{
        fetch('/unlike',{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                PostID:id
            })
        }).then(res=>res.json()).then(result=>{
            // console.log(data);
            const newData = myPost.map(item=>{
                if(result.message._id===item._id){
                    return result.message;
                }else{
                    return item;
                }
            })
            setPosts(newData);
        }).catch(err=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        if(photo){
            const fileData = new FormData();
            fileData.append("file",photo);
            fileData.append("upload_preset","enigma");
            fileData.append("cloud_name","engima");

            // saving to cloud first
            fetch('https://api.cloudinary.com/v1_1/engima/image/upload',{
                method:"POST",
                body:fileData
            }).then(res=>res.json()).then(data=>{
                // setUrl(data.url);
                fetch('/updatePic',{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        photo: data.url
                    })
                }).then(res=>res.json()).then(result=>{
                    localStorage.setItem("user",JSON.stringify({...props.user,photo:result.result.photo}));
                    props.updatePic(result.result.photo);
                    console.log(result)
                    M.toast({html:"Profile Picture updated!"})
                }).catch(err=>{
                    console.log(err)
                    M.toast({html:"This is embarrasing! Couldn't update your profile! Please try again later!"})
                })
            }).catch(err=>{
                console.log(err);
                M.toast({html:"Something didn't go right! Try again!"})
                return err
            })
        }

    },[photo])

    if(props.user===null && !localStorage.getItem("jwt")){
        return <Redirect to='/' />
    }
    const updateProfile = (file)=>{
        setPhoto(file)
        M.toast({html:"Updating Profile Picture! Hold on!"});
    }
    return (
        <>
        {
            props.user && myPost ? (
                <div>
                    <Navbar />
                    <div style={{maxWidth:'80%',margin:'0px auto'}}>
                        <div className="container detContainer center row"
                            >
                            {/* image div */}
                            <div style={{padding:'0 20px'}} className="col s12 m8 offset-m2 l6 xl4 center">
                                <img 
                                src={props.user.photo} 
                                className="responsive-img"
                                style={{
                                    borderRadius:"1000px",
                                    marginBottom:"20px"
                                }} 
                                alt="Profile pic"
                                />
                            </div>
                            {/* detail div */}
                            <div className="col s12 l6 xl8">
                                <h3 className="flow-text s8 offset-s2 l6 xl12">
                                    { props.user.fname +" "+props.user.lname }
                                </h3>
                                <div
                                    className="col s12 m12 xl12 center" 
                                >
                                    <h6 className="flow-text col s12 l8 offset-l2 xl4 center">{myPost.length} posts</h6>
                                    <h6 className="flow-text col s12 l8 offset-l2 xl4 center">{props.user.followers.length} followers</h6>
                                    <h6 className="flow-text col s12 l8 offset-l2 xl4 center">{props.user.following.length} following</h6>
                                </div>
                                <a href="#modal1"
                                    onMouseUp={()=>{
                                    document.querySelectorAll(".waves-ripple ").forEach(item=>{item.style.opacity=0})
                                    }}
                                    className="btn btn-small updatePic modal-trigger waves-effect waves-light red col s12 m8 center offset-m2 l12 xl6 offset-xl3"
                                >
                                    <i className="material-icons left">crop_original</i>
                                Update Profile Picture
                                </a>
                                <div id="modal1" className="modal">
                                    <div className="modal-content center">
                                        <h4 className="flow-text">Upload a picture</h4>
                                            <div className="file-field input-field">
                                                <div className="btn flow-text" style={{
                                                    margin:"15px auto",
                                                    borderRadius:"24px",
                                                }}>
                                                    <span className="flow-text">Select and Upload</span>
                                                    <input type="file" onChange={(e)=>{updateProfile(e.target.files[0])}} id="photo"/>
                                                </div>
                                                <div className="file-path-wrapper">
                                                    <input className="file-path validate" type="text" required/>
                                                </div>
                                            </div>
                                    </div>
                                    <div className="modal-footer">
                                        <a href="#!" className="modal-close waves-effect waves-green btn-flat flow-text">CLOSE</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="seperation"/>
                        <div className="gallery row">
                            {
                                myPost.length!==0? (
                                    myPost.map(post=>{
                                        return(
                                            <div className="item z-depth-2 col s10 offset-s1 m6 offset-m3 l5 offset-l1 xl3 offset-l1" key={post._id} style={{marginRight:"auto"}}>
                                                <div className="chip flow-text col s10 center" 
                                                style={{margin:"5px 20px", textAlign:"start",maxWidth:"max-content",overflow:"hidden"}}
                                                >{ post.tag }</div>
                                                <div className="col s12"
                                                    style={{
                                                        display:"block",
                                                        overflow:"hidden",
                                                        height:"199px",
                                                        textAlign:"center"
                                                    }}
                                                >
                                                    <img className="itemImg"
                                                    style={{height:"100%",width:"auto",margin:"5px auto"}}
                                                    src={ post.photo } 
                                                    alt="post"/>
                                                </div>
                                                {
                                                    post.likes.includes(props.user._id) ? (
                                                        <i className="material-icons like red-text right"
                                                            onClick={()=>{
                                                                unlikePost(post._id)  
                                                            }}
                                                        >favorite</i>
                                                    ) : (
                                                        <i className="material-icons like right"
                                                            onClick={()=>{
                                                                likePost(post._id)
                                                            }}
                                                        >favorite_border</i>
                                                    )
                                                }
                                            </div>
                                        )
                                    })
                                ) : (
                                
                                    <div className="container notFound">
                                        <img src={empty} className="responsive-img" alt="empty" />
                                        <Link to='/create' className="waves-effect waves-light btn flow-text">
                                            <i className="material-icons left flow-text">add</i>
                                        CREATE POST
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <SideTags />
                </div>
    
            ) : (
                <div className="loading">
                    <img src={LoadingScreen} className="responsive-img" alt="loading..." />
                </div>
            ) 
        }
        </>
        
    )
}

const mapDispatchToProps = (dispatch) =>{
    return{
        updateRedux: ()=>dispatch({type:"ALL"}),
        updatePic:(url)=>dispatch({type:"UPDATEPIC",payload:url})
    }
}

const mapStateToProps = (state)=>{
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
