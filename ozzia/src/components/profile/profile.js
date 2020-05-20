import React from 'react';
import Navbar from '../layout/Navbar'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const profile=(props)=> {
    if(props.user===null && localStorage.getItem("jwt")){
        props.updateRedux()
    }
    if(!props.user) return <Redirect to='/' />
    return (
        // wrapper div
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
                        <h3>Aajinkya Singh</h3>
                        <div style={{
                            display:"flex",
                            justifyContent:"space-between",
                            width:"110%"
                        }}>
                            <h6>40 posts</h6>
                            <h6>40 followers</h6>
                            <h6>40 following</h6>
                        </div>
                    </div>
                </div>
                <hr className="seperation"/>
                <div className="gallery">
                    <div className="item z-depth-2">
                        <div className="chip" style={{margin:"5px 20px"}}>Funny</div>
                        <img className="itemImg" src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="post"/>
                        <i className="material-icons like right">favorite_border</i>
                    </div>
                    <div className="item z-depth-2">
                        <div className="chip" style={{margin:"5px 20px"}}>Funny</div>
                        <img className="itemImg" src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="post"/>
                        <i className="material-icons like right">favorite_border</i>
                    </div>
                    <div className="item z-depth-2">
                        <div className="chip" style={{margin:"5px 20px"}}>Funny</div>
                        <img className="itemImg" src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="post"/>
                        <i className="material-icons like right">favorite_border</i>
                    </div>
                    <div className="item z-depth-2">
                        <div className="chip" style={{margin:"5px 20px"}}>Funny</div>
                        <img className="itemImg" src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="post"/>
                        <i className="material-icons like right">favorite_border</i>
                    </div>
                    <div className="item z-depth-2">
                        <div className="chip" style={{margin:"5px 20px"}}>Funny</div>
                        <img className="itemImg" src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="post"/>
                        <i className="material-icons like right">favorite_border</i>
                    </div>
                    <div className="item z-depth-2">
                        <div className="chip" style={{margin:"5px 20px"}}>Funny</div>
                        <img className="itemImg" src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="post"/>
                        <i className="material-icons like right">favorite_border</i>
                    </div>
                </div>
            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(profile)
