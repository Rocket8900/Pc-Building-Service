import React from 'react';
import { Link } from "react-router-dom";

const Section = () => {
    return(
        <div className="container">
                    <div className="row align-items-center gx-5">

                        <div className="col-lg-6">
                            <div className="subtitle fadeInUp mb-3">Level Up Your Game</div>
                            <h2 className="wow fadeInUp">Your victory begins with ultra performance</h2>
                            <p className="wow fadeInUp">Welcome to the ultimate gaming experience! Our game hosting 
                              service is designed to take your gaming adventures to the next level. With lightning-fast servers, unbeatable reliability, and 24/7 support, we&apos;re here to ensure your gaming experience is seamless and stress-free. 
                              Join us and let&apos;s embark on an epic gaming journey together. Your victory begins here!
                            </p>

                            <div className="spacer-10"></div>
                            <Link className="btn-main" to="/">Order Your Game Server Now</Link>

                        </div>

                        <div className="col-lg-6" >
                            <div className="d_wrap">
                                <img src="./img/misc/server-2.webp" className="img-fluid fadeIn" alt=""/>
                                <div className="d_wrap_sm-box d-lg-block d-none b1 zoomIn">
                                    <i className="bg-gradient fa fa-users"></i>
                                    <h3>15425</h3>
                                    <h6>Happy Gamers</h6>
                                </div>

                                <div className="d_wrap_sm-box d-lg-block d-none b2 zoomIn">
                                    <i className="fa-solid fa-rotate"></i>
                                    <h3>99.99%</h3>
                                    <h6>Uptime</h6>
                                </div>

                                <div className="d_wrap_sm-box d-lg-block d-none b3 zoomIn">
                                    <i className="bg-gradient fa fa-thumbs-up"></i>
                                    <h3>15 Years</h3>
                                    <h6>Experiences</h6>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
    );
}

export default Section;