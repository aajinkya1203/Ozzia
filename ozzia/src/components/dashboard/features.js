import React from 'react'
import feature1 from '../../images/featureContent.gif';
import feature2 from '../../images/featureLike.gif';
import feature3 from '../../images/featureFollow.gif';

const features=()=>{
    return(
        <div className="section white">
                <div className="row container">
                    <img src={ feature1 } alt="feature 1" className="featImg col s4 responsive-img"/>
                    <h2 className="header col s8">Browse as per your desired topics!</h2>
                    <p className="grey-text text-darken-3 lighten-3 col s8">
                        Tune into any topic that interests you and share 
                        your stories and experience with others on that
                        topic!
                    </p>
                </div>
                <div className="row container">
                    <h2 className="header col s8">Like and comment as per your wish!</h2>
                    <p className="grey-text text-darken-3 lighten-3 col s8">
                        Real-time like and commenting feature included just
                        like any of your normal app, so you dont miss any of
                        those features!
                    </p>
                    <img src={ feature2 } alt="feature 1" className="featImg col s4 responsive-img"/>
                </div>
                <div className="row container">
                    <img src={ feature3 } alt="feature 1" className="featImg col s4 responsive-img"/>
                    <h2 className="header col s8">Expand your reach!</h2>
                    <p className="grey-text text-darken-3 lighten-3 col s8">
                        Follow your friends to look at their posts on an individual
                        pane! Less clutter, more content!
                    </p>
                </div>
            </div>
    )
}

export default features;
