import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar'
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import SideTags from './SideTags';
import M from 'materialize-css';
import LoadingScreen from '../../images/LoadingScreen.gif';
import empty from '../../images/emptyProfile.svg'


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

    const followUser = ()=>{
        fetch('/follow',{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followID:props.match.params.id
            })
        }).then(res=>res.json()).then(woho=>{
            console.log(woho);
            props.updateUser(woho.result.followers,woho.result.following);
            localStorage.setItem("user",JSON.stringify(woho.result));
            setPerson((prevState)=>{
                console.log(prevState)
                return{
                    ...prevState,
                    followers:[...prevState.followers,props.user._id]
                }
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowID:props.match.params.id
            })
        }).then(res=>res.json()).then(woho=>{
            console.log(woho);
            props.updateUser(woho.result.followers,woho.result.following);
            localStorage.setItem("user",JSON.stringify(woho.result));
            setPerson((prevState)=>{
                const newFollowerList = prevState.followers.filter(item=>{
                    return item !== props.user._id
                })
                return{
                    ...prevState,
                    followers:newFollowerList
                }
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    if(props.user){
        if(props.match.params.id.toString()===props.user._id.toString()) return <Redirect to='/profile' />
    }
    return (
        // wrapper div
        <>
        {
            props.user && profile!==0  && person.length!==0 ? (
                <div>
                    <Navbar />
                    <div style={{maxWidth:'80%',margin:'0px auto'}}>
                        <div className="container detContainer center row"
                            >
                            {/* image div */}
                            <div style={{padding:'0 20px'}} className="col s12 m8 offset-m2 l6 xl4 center">
                                <img 
                                src={person.photo} 
                                className="responsive-img"
                                style={{
                                    borderRadius:"1000px",
                                    marginBottom:"20px"
                                }} 
                                alt="Profile pic"/>
                            </div>
                            {/* detail div */}
                            <div className="col s12 l6 xl8">
                                <h3 className="flow-text s8 offset-s2 l6 xl12">
                                    { person.fname +" "+person.lname }
                                </h3>
                                <div 
                                    className="col s12 m12 xl12 center"
                                >
                                    <h6 className="flow-text col s12 l8 offset-l2 xl4 center">{profile.length} posts</h6>
                                    <h6 className="flow-text col s12 l8 offset-l2 xl4 center">{person.followers.length} followers</h6>
                                    <h6 className="flow-text col s12 l8 offset-l2 xl4 center">{person.following.length} following</h6>
                                </div>
                                {
                                    props.user.following.includes(props.match.params.id) ? 
                                    <a 
                                    className="btn btn-small updatePic modal-trigger waves-effect waves-light red col s12 m8 center offset-m2 l12 xl6 offset-xl3"
                                        href="#!"
                                        onClick={()=>{unfollowUser()}}
                                        onMouseUp={()=>{
                                            document.querySelectorAll(".waves-ripple ").forEach(item=>{item.style.opacity=0})
                                         }}
                                    >
                                        <i className="material-icons left">person</i>
                                    UNFOLLOW
                                    </a>
                                    :
                                    <a 
                                    className="btn btn-small updatePic modal-trigger waves-effect waves-light green col s12 m8 center offset-m2 l12 xl6 offset-xl3"
                                    href="#!"
                                    onClick={()=>{followUser()}}
                                    onMouseUp={()=>{
                                        document.querySelectorAll(".waves-ripple ").forEach(item=>{item.style.opacity=0})
                                     }}
                                >
                                    <i className="material-icons left">person_add</i>
                                FOLLOW
                                </a>
                                }
                                
                            </div>
                        </div>
                        <hr className="seperation"/>
                        <div className="gallery row">
                            {
                                profile.length!==0? (
                                    profile.map(post=>{
                                        return(
                                            <div className="item z-depth-2 col s10 offset-s1 m6 offset-m3 l5 offset-l1 xl3 offset-l1" key={post._id} style={{marginRight:"auto"}}>
                                                <div className="chip flow-text col s8 center"  
                                                style={{margin:"5px 20px", textAlign:"start",maxWidth:"max-content",overflow:"hidden"}}
                                                >{ post.tag }</div>
                                                <Link to={`/post/${post._id}`}>
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
                                                </Link>
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
        updateUser:(followers,following)=>dispatch({
            type:"UPDATE",
            payload:{
                followers,
                following
            }
        })
    }
}

const mapStateToProps = (state)=>{
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
