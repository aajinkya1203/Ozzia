import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar'
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import SideTags from './SideTags';
import LoadingScreen from '../../images/LoadingScreen.gif'
import empty from '../../images/empty1.svg'

const Profile=(props)=> {
    const [myPost,setPosts] = useState([]);
    useEffect(()=>{
        console.log(props.user)
        window.$(document).ready(function(){
            window.$('.sidenav').sidenav();
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


    return (
        <>
        {
            props.user && myPost ? (
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
                                }} alt="Profile pic"
                                    className="responsive-img"
                                />
                            </div>
                            {/* detail div */}
                            <div>
                                <h3 className="flow-text">{ props.user.fname +" "+props.user.lname }</h3>
                                <div style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    width:"110%"
                                }}>
                                    <h6 className="flow-text">{myPost.length} posts</h6>
                                    <h6 className="flow-text">{props.user.followers.length} followers</h6>
                                    <h6 className="flow-text">{props.user.following.length} following</h6>
                                </div>
                            </div>
                        </div>
                        <hr className="seperation"/>
                        <div className="gallery">
                            {
                                myPost.length!==0? (
                                    myPost.map(post=>{
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
        updateRedux: ()=>dispatch({type:"ALL"})
    }
}

const mapStateToProps = (state)=>{
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
