import React from 'react';
import { Link } from "react-router-dom"; 


const Section = () => {
    return(
        <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 offset-lg-3 text-center">
                            <div className="subtitle wow fadeInUp mb-3">Latest From Us</div>
                            <h2 className="wow fadeInUp" data-wow-delay=".2s">News &amp; Promo</h2>
                            <div className="spacer-20"></div>
                        </div>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6 mb10">
                        <div className="bloglist item">
                                <div className="post-content">
                                    <div className="post-image">
                                        <div className="d-tagline">
                                            <span>games</span>
                                            <span>guide</span>
                                        </div>
                                        <img src="./img/news/1.webp" alt=""/>
                                    </div>
                                    <div className="post-text">
                                        <div className="d-date">25.10.2023</div>
                                        <h4><Link to="/">How to Set Up Your Own Game Server<span></span></Link></h4>
                                        <p>Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-4 col-md-6 mb10">
                        <div className="bloglist item">
                                <div className="post-content">
                                    <div className="post-image">
                                        <div className="d-tagline">
                                            <span>games</span>
                                            <span>guide</span>
                                        </div>
                                        <img src="./img/news/2.webp" alt=""/>
                                    </div>
                                    <div className="post-text">
                                        <div className="d-date">25.10.2023</div>
                                        <h4><Link to="/">Rise in Demand for Private Game Servers<span></span></Link></h4>
                                        <p>Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-4 col-md-6 mb10">
                        <div className="bloglist item">
                                <div className="post-content">
                                    <div className="post-image">
                                        <div className="d-tagline">
                                            <span>games</span>
                                            <span>guide</span>
                                        </div>
                                        <img src="./img/news/3.webp" alt=""/>
                                    </div>
                                    <div className="post-text">
                                        <div className="d-date">25.10.2023</div>
                                        <h4><Link to="/">Top Hosting Providers for Game Servers<span></span></Link></h4>
                                        <p>Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
    );
}

export default Section;