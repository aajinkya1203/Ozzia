import React from 'react'
import feature1 from '../../images/featureContent.gif';
import feature2 from '../../images/featureLike.gif';
import feature3 from '../../images/featureFollow.gif';

const features=()=>{
    return(
        <div className="section white col s12">
                <div className="row container center featTab">
                    <h2 className="header flow-text postTitle col s12 center"
                        style={{
                            fontSize:"10vw",
                            padding:'0',
                            fontFamily:"Open Sans"
                        }}
                    >Browse as per your desired topics!</h2>
                    <img src={ feature1 } alt="feature 1" className="featImg col s10 offset-s1 l5 responsive-img"/>
                    <p className="grey-text text-darken-3 lighten-3 col s10 offset-s1 l5 offset-l1 center">
                        Tune into any topic that interests you and share 
                        your stories and experience with others on that
                        topic!
                    </p>
                </div>
                <div className="row container center featTab">
                    <h2 className="header flow-text postTitle col s12 center"
                        style={{
                            fontSize:"10vw",
                            padding:'0',
                            fontFamily:"Open Sans"
                            
                        }}
                    >Like and comment as per your wish!</h2>
                    <img src={ feature2 } alt="feature 1" className="featImg col s8 offset-s1 l5 push-l6 responsive-img"/>
                    <p className="grey-text text-darken-3 lighten-3 col s10 offset-s1 l5 pull-l5 center">
                        Real-time like and commenting feature included just
                        like any of your normal app, so you dont miss any of
                        those features!
                    </p>
                </div>
                <div className="row container center featTab">
                    <h2 className="header flow-text postTitle col s12 center"
                        style={{
                            fontSize:"10vw",
                            padding:'0',
                            fontFamily:"Open Sans"
                        }}
                    >Expand your reach!</h2>
                    <img src={ feature3 } alt="feature 1" className="featImg col s8 offset-s1 l5 responsive-img"/>
                    <p className="grey-text text-darken-3 lighten-3 col s10 offset-s1 l5 offset-l1 center">
                        Follow your friends to look at their posts on an individual
                        pane! Less clutter, more content!
                    </p>
                </div>
            </div>
    )
}

export default features;
