import React,{ useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import M from 'materialize-css';
import SideTags from '../profile/SideTags'
import LoadingScreen from '../../images/LoadingScreen.gif'
import empty from '../../images/empty2.svg'


const Subbed=(props)=> {
    const [data,setData] = useState("");
    useEffect(()=>{
        window.$(document).ready(function(){
            window.$('.sidenav').sidenav();
        });
        fetch('/subbedPost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            method:"GET"
        }).then(res=>res.json()).then(datai=>{
            console.log(datai)
            setData(datai.posts);
        })
    },[])
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
                            data.length!==0 ? data.map(item=>{
                                return(
                                    <div className="card homeCard" key={item._id}>
                                        <Link to={
                                            item.PostedBy._id.toString() === props.user._id.toString() ?
                                            '/profile' :
                                            `/profile/${ item.PostedBy._id }`
                                            }>
                                            <div className="chip" style={{margin:"5px 20px"}}>
                                                <img alt="post" src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                                                { item.PostedBy.fname + item.PostedBy.lname }
                                            </div>
                                            <span style={{ padding:"0 5px" }}>|</span>
                                            <div className="chip" style={{margin:"5px 20px"}}>
                                                { item.tag }
                                            </div>
                                        </Link>
                                        {
                                            item.PostedBy._id.toString() == props.user._id.toString()
                                                && <i className="material-icons"  title="Delete Post?"
                                                style={{float:"right",cursor:"pointer"}}
                                                onClick={()=>{
                                                    if(window.confirm("Permanently Delete this Post?")===true){
                                                        DeletePost(item._id)
                                                    }
                                                }}
                                            >delete_forever</i>
                                        }
                                        
                                        <hr className="sepeation" />
                                        <div className="card-image">
                                            <img href="#!" alt="post" src={ item.photo } />
                                            <a className="btn-floating #FFB74D orange lighten-2 btn-large halfway-fab waves-effect waves-light red"
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
                                        <div className="card-content">
                                            <span className="card-title"
                                                style={{fontSize:"16px"}}
                                            >{ item.likes.length } likes</span>
                                            <span className="card-title">{ item.title }</span>
                                            <p>{ item.description }</p>
                                            {
                                                item.comments && item.comments.map(comment=>{
                                                return(
                                                <h6 key={comment._id}>
                                                        <span style={{fontWeight:"bolder", padding:"0 5px"}}>{ comment.postedBy.fname +' '+ comment.postedBy.lname }</span> { comment.text }
                                                        {
                                                            comment.postedBy._id.toString() == props.user._id.toString()
                                                            ? <i className="material-icons"  title="Delete Post?"
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
                                    {/* <Link to='/create' className="waves-effect waves-light btn flow-text">
                                        <i className="material-icons left flow-text">add</i>
                                    CREATE POST
                                    </Link> */}
                                </div>
                            )
                        }
                        
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

export default connect(mapStateToProps,mapDispatchToProps)(Subbed)
