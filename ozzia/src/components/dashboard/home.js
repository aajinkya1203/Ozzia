import React,{ useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


const Home=(props)=> {
    const [data,setData] = useState("");
    useEffect(()=>{
        fetch('/home',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            method:"GET"
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            setData(data.posts);
        })
    },[])
    if(props.user===null && localStorage.getItem("jwt")){
        props.updateRedux()
    }
    console.log(props)
    if(!props.user) return <Redirect to='/' />
    return (
        <div>
            <Navbar />
            <div className="home">
                {
                    data && data.map(item=>{
                        return(
                            <div className="card homeCard" key={item._id}>
                                <Link to="/profile/:id">
                                    <div className="chip" style={{margin:"5px 20px"}}>
                                        <img alt="post" src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                                        { item.PostedBy.fname + item.PostedBy.lname }
                                    </div>
                                    <div className="chip" style={{margin:"5px 20px"}}>
                                        { item.tag }
                                    </div>

                                </Link>
                                <hr className="sepeation" />
                                <div className="card-image">
                                    <img href="#!" alt="post" src={ item.photo } />
                                    <a className="btn-floating btn-large halfway-fab waves-effect waves-light red"><i className="material-icons">favorite</i></a>
                                </div>
                                <div className="card-content">
                                    <span className="card-title">{ item.title }</span>
                                    <p>{ item.description }</p>
                                </div>
                                <div className="card-action input-field">
                                    <input className=""  type="text" placeholder="Comment on the post..."/>
                                </div>
                            </div>
                            
                        )
                    })
                }
                
            </div>
        </div>
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
