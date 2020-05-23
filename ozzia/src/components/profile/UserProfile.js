import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar'
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import SideTags from './SideTags';
import M from 'materialize-css'


const UserProfile=(props)=> {
    const [profile,setProfile] = useState([]);
    const [person,setPerson] = useState([]);
    useEffect(()=>{
        window.$(document).ready(function(){
            window.$('.sidenav').sidenav();
        });
        if(props.user===null && localStorage.getItem("jwt")){
            props.updateRedux()
        }    
        fetch(`/user/${props.match.params.id}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt") 
            },
            method:"GET"
        }).then(res=>res.json()).then(data=>{
            setProfile(data.posts);
            setPerson(data.user)
        }).catch(err=>{
            console.log(err);
            M.toast({html:"Oopsie! We didn't mean this to happen! Try again!"})
        })
        console.log(profile)
    },[])
    // if(props.user===null && localStorage.getItem("jwt")){
    //     props.updateRedux()
    // }
    // if(!props.user) return <Redirect to= {`/profile/${props.match.params.id}`} />
    // if(!localStorage.getItem("user")) return <Redirect to='/' />
    if(props.user===null && !localStorage.getItem("jwt")){
        return <Redirect to='/' />
    }
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
            const newData = profile.map(item=>{
                if(result.message._id==item._id){
                    return result.message;
                }else{
                    return item;
                }
            })
            setProfile(newData);
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
            const newData = profile.map(item=>{
                if(result.message._id===item._id){
                    return result.message;
                }else{
                    return item;
                }
            })
            setProfile(newData);
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        // wrapper div

        <>
        {
            props.user && profile!==0  && person.length!==0 ? (
                <div>
                    <Navbar />
                    <div style={{maxWidth:'80%',margin:'0px auto'}}>
                        <div className="container detContainer center"
                            style={{
                                display:"flex",
                                justifyContent:"space-around",
                                margin:"18px 0px",
                                
                            }}>
                            {/* image div */}
                            <div style={{padding:'0 20px'}}>
                                <img 
                                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" 
                                style={{
                                    height:"180px",
                                    width:"180px",
                                    borderRadius:"90px",
                                }} alt="Profile pic"/>
                            </div>
                            {/* detail div */}
                            <div>
                                <h3>{ person.fname +" "+person.lname }</h3>
                                <div style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    width:"110%"
                                }}>
                                    <h6>{profile.length} posts</h6>
                                    <h6>40 followers</h6>
                                    <h6>40 following</h6>
                                </div>
                            </div>
                        </div>
                        <hr className="seperation"/>
                        <div className="gallery">
                            {
                                profile.length!==0? (
                                    profile.map(post=>{
                                        return(
                                            <div className="item z-depth-2" key={post._id}>
                                                <div className="chip" style={{margin:"5px 20px"}}>{ post.tag }</div>
                                                <div style={{display:"block",overflow:"hidden",height:"199px",textAlign:"center"}}>
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
                                
                                    <div>
                                        <h6>Wow! So Empty!</h6>
                                        <i class="large material-icons" style={{fontSize:"4rem"}}>wallpaper</i>
                                        <i><Link to='/create'>Create a Post now!</Link></i>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <SideTags />
                </div>
          
            ) : (<h2>Loading</h2>)
        }
        </>
    )
}

const mapDispatchToProps = (dispatch) =>{
    return{
        updateRedux: ()=>dispatch({type:"ALL"})
    }
}

const mapStateToProps = (state)=>{
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
