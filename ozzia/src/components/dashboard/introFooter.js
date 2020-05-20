import React, { useEffect } from 'react'

const IntroFooter=()=> {
    useEffect(()=>{
      let temp= document.createElement('script');
      temp.src = "https://platform.twitter.com/widgets.js";
      document.getElementById("twitter-embed").appendChild(temp);

      let tempAnother = document.createElement('script');
      tempAnother.src = "//cdn.jsdelivr.net/github-cards/latest/widget.js";
      document.getElementById("github-embed").appendChild(tempAnother);
    },[]);
    return (
        <footer className="page-footer">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Follow us on</h5>
                <p className="grey-text text-lighten-4">
                    This is an Open-Source Project!
                    You can find me on Github and contribute to the project! 
                </p>
                <p id="twitter-embed">
                  <a href="https://twitter.com/aajinkya1203?ref_src=twsrc%5Etfw" className="twitter-follow-button" data-show-count="false">Follow @aajinkya1203</a>
                </p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">
                  Made with <span role="img" aria-label="heart">❤️</span>
                </h5>
                <ul>
                  <li id="github-embed">
                  <div className="github-card" data-github="aajinkya1203" data-width="400" data-height="317" data-theme="medium"></div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
              © 2020 Copyright, ozzi.
            </div>
          </div>
        </footer>
    )
}

export default IntroFooter
