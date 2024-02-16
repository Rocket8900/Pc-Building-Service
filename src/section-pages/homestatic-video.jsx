import React from 'react';
import { Parallax } from 'react-parallax';
import YouTubePlayer from './youtubeplayer';
import { Link } from "react-router-dom";


const Section = () => {
   const videoId = 'QB2DfxkaBeU';
    return(
        <Parallax className="home-video">
                <div className="iframeyoutube"><YouTubePlayer videoId={videoId} /></div>
                
                <div className="de-gradient-edge-top"></div>
                <div className="de-gradient-edge-bottom"></div>
                <div className="overlay-bg t50 no-top no-bottom">
                    <div className="v-center">
                        <div className="container z-1000">
                            <div className="row align-items-center">                        
                                <div className="col-lg-10 offset-lg-1 text-center">
                                    <div className="subtitle blink mb-4">Servers Are Available</div>
                                    <h1 className="mb-0 ">Minecraft Server Hosting</h1>                                    
                                </div>
                                <div className="col-lg-6 offset-lg-3 text-center text-white">
                                    <p className="">Aute velit non excepteur in eiusmod proident aute qui ullamco incididunt aliqua aliqua velit cillum deserunt dolore consectetur excepteur magna dolor enim voluptate dolore irure nulla culpa sint nulla do.</p>
                                    <Link className="btn-main" to="/">Compare Our Plans</Link>

                                    <div className="spacer-single"></div>

                                    <div className="de-rating-ext">
                                        <span className="d-stars">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </span>
                                        <span className="d-val">4.85</span>
                                        based on <strong>14086</strong> reviews.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Parallax>
    );
}

export default Section;