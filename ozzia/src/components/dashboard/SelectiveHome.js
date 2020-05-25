import React,{ useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import M from 'materialize-css';
import SideTags from '../profile/SideTags'
import LoadingScreen from '../../images/LoadingScreen.gif'
import empty from '../../images/empty1.svg'


const Home=(props)=> {
    console.log(props)
    const [data,setData] = useState("");
    useEffect(()=>{
        window.$(document).ready(function(){
            window.$('.sidenav').sidenav();
        });
        fetch(`/home/${props.match.params.tag}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            method:"GET"
        }).then(res=>res.json()).then(datai=>{
            console.log(datai)
            setData(datai.group);
        })
    },[props.match.params.tag])
    if(props.user===null && localStorage.getItem("jwt")){
        props.updateRedux()
    }
    if(!props.user) return <Redirect to='/' />

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
            const newData = data.map(item=>{
                if(result.message._id==item._id){
                    return result.message;
                }else{
                    return item;
                }
            })
            setData(newData);
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
            const newData = data.map(item=>{
                if(result.message._id===item._id){
                    return result.message;
                }else{
                    return item;
                }
            })
            setData(newData);
        }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (e,text,PostID)=>{
        e.preventDefault();
        fetch('/comment',{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                text,
                PostID
            })
        }).then(res=>res.json()).then(result=>{
            console.log(result);
            const newData = data.map(item=>{
                if(result.message._id===item._id){
                    return result.message;
                }else{
                    return item;
                }
            })
            setData(newData);
        }).catch(err=>{
            console.log(err);
        })
    }
    const DeletePost=(postID)=>{
        fetch(`/delete/${postID}`,{
            method:"DELETE",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json()).then(result=>{
            console.log(result);
            const newData = data.filter(item=>{
                return item._id !== result.result._id
            })
            setData(newData)
        }).catch(err=>{
            console.log(err);
        })
    }
    const DeleteComment=(commentID,postID)=>{
        console.log(commentID)
        fetch(`/delete/comment/${postID}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                commentID
            })
        }).then(res=>res.json()).then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                if(item._id === result.message._id){
                    return result.message
                }else{
                    return item
                }
            })
            setData(newData)
            M.toast({html:result.title});
        }).catch(err=>{
            console.log(err);
        })
    }

    return (
        <>
        {
            props.user && data ? (
                <div>
                    <Navbar />
                    <div className="home">
                        {
                            data.length !== 0 ? data.map(item=>{
                                console.log(item)
                                return(
                                    <div className="card homeCard" key={item._id} style={{padding:'14px'}}>
                                        <Link to={
                                            item.PostedBy._id.toString() === props.user._id.toString() ?
                                            '/profile' :
                                            `/profile/${ item.PostedBy._id }`
                                            }>
                                            <div className="chip flow-text col s8 center"
                                            style={{margin:"5px 20px", textAlign:"start",maxWidth:"max-content",overflow:"hidden"}}
                                            >
                                                <img alt="post" 
                                                src={item.PostedBy.photo} />
                                                { item.PostedBy.fname + item.PostedBy.lname }
                                            </div>
                                            {/* <span style={{ padding:"0 5px" }}>|</span> */}
                                            <div className="chip flow-text col s8 center"
                                             style={{margin:"5px 20px", textAlign:"start",maxWidth:"max-content",overflow:"hidden"}}
                                             >
                                                { item.tag }
                                            </div>
                                        </Link>
                                        {
                                            item.PostedBy._id.toString() == props.user._id.toString()
                                                && <i className="material-icons col s2 offset-s1" title="Delete Post?"
                                                style={{float:"right",cursor:"pointer",margin:"10px"}}
                                                onClick={()=>{
                                                    if(window.confirm("Permanently Delete this Post?")===true){
                                                        DeletePost(item._id)
                                                    }
                                                }}
                                            >delete_forever</i>
                                        }
                                        
                                        <hr className="sepeation col s12 offset-s1" />
                                        <div className="card-image col s12">
                                            <img href="#!" alt="post" src={ item.photo } />
                                            <a className="col s12 btn-floating #FFB74D orange lighten-2 btn-small halfway-fab waves-effect waves-light red"
                                                id="effectLike"
                                            onMouseUp={()=>{
                                                document.querySelectorAll(".waves-ripple ").forEach(item=>{item.style.opacity=0})
                                            }}>
                                                {
                                                    item.likes.includes(props.user._id) ? (

                                                        <i className="material-icons heart"
                                                        onClick={(e)=>{
                                                            window.$(e.target).toggleClass("heart");
                                                            if(e.target.className.includes('heart')){
                                                                likePost(item._id);
                                                            }else{
                                                                unlikePost(item._id);
                                                            }
                                                        }}
                                                        >favorite</i>

                                                    ) : (
                                                        
                                                        <i className="material-icons"
                                                        onClick={(e)=>{
                                                            window.$(e.target).toggleClass("heart");
                                                            if(e.target.className.includes('heart')){
                                                                likePost(item._id);
                                                            }else{
                                                                unlikePost(item._id);
                                                            }
                                                        }}
                                                        >favorite</i>

                                                    )
                                                }
                                                
                                            </a>
                                        </div>
                                        <div className="card-content col s12" style={{padding:"16px"}}>
                                            <span className="card-title col s3 flow-text likeText"
                                                style={{fontSize:"7vw"}}
                                            >{ item.likes.length } likes</span>
                                            <span className="card-title flow-text postTitle"
                                            style={{fontSize:"10vw"}}
                                            >{ item.title }</span>
                                            <p style={{fontsize:"8vw"}} className="bodyText">{ item.description }</p>
                                            {
                                                item.comments && item.comments.map(comment=>{
                                                return(
                                                <h6 key={comment._id} className="col s8 flow-text commentText">
                                                        <span className="col s8 flow-text" style={{fontWeight:"bolder", padding:"0 5px"}}>{ comment.postedBy.fname +' '+ comment.postedBy.lname }</span> { comment.text }
                                                        {
                                                            comment.postedBy._id.toString() == props.user._id.toString()
                                                            ? <i className="material-icons col s2 offset-s1"  title="Delete Post?"
                                                                style={{float:"right",cursor:"pointer"}}
                                                                onClick={()=>{
                                                                    if(window.confirm("Permanently Delete this Comment?")===true){
                                                                        DeleteComment(comment._id,item._id)
                                                                    }
                                                                }}
                                                            >delete_sweep</i> : null
                                                        }
                                                </h6>)
                                                })
                                            }
                                            
                                        </div>
                                        <form className="card-action input-field" onSubmit={(e)=>{
                                            makeComment(e,e.target[0].value,item._id);
                                            e.target[0].value = ""
                                        }}>
                                            <input className=""  type="text" placeholder="Comment on the post..."/>
                                        </form>
                                    </div>
                                    
                                )
                            }) : (
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
                    <SideTags />
                </div>
    
            ):(
                <div className="loading">
                    <img src={LoadingScreen} className="responsive-img" alt="loading..." />
                </div>
            )
        }
        </>
        
    )
}

const mapStateToProps = (state)=>{
    return{
        user:state.user
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        updateRedux:()=>dispatch({type:"ALL"})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
