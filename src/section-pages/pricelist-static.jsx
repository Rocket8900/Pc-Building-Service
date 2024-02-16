import React from "react";
import { Link } from "react-router-dom"; 

import { createGlobalStyle } from 'styled-components';


const GlobalStyles = createGlobalStyle`
  .de_pricing-table .d-recommend{
    background: var(--primary-color);
  }
  .de_pricing-table.type-2.rec {
      border: solid 5px var(--primary-color) !important;
    }
    .dark-scheme .de_pricing-table.type-2{
        border: 0px;
    }
    .de_pricing-table .d-price h4{
        font-family: var(--body-font);
        span{
            font-size: 14px;
        }
    }
`;


const Server = () => {


    return(
        <>
            <GlobalStyles/>
                <div className="de-gradient-edge-top"></div>
                <div className="de-gradient-edge-bottom"></div>
                <div className="container z-9">
                    <div className="row">

                        <div className="clearfix"></div>
                        <div className="col-xl-4 col-md-6 mb-sm-30 fadeInRight" >
                            <div className="de_pricing-table type-2">
                                <div className="d-head mb-1">
                                </div>
                                <div className="d-title">Warrior</div>
                                <div className="d-stars"><i className="fa fa-star"></i></div>
                                <div className="spacer-20"></div>
                                <div className="d-specs">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="d-item">
                                                40<span>Player Slots</span>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="d-item">
                                                4GB<span>Memory</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="spacer-20"></div>
                                <div className="d-price text-center mb-0">
                                    <h4 className="opt-1 mb-0">$14.99 <span>/monthly</span></h4>
                                    <h4 className="opt-2 mb-0">$9.99 <span>/monthly</span></h4>
                                    <p className="opt-1">$0.50 per slot </p>
                                    <p className="opt-2">$0.25 per slot </p>
                                </div>                                
                                <div className="d-action">
                                    <Link to="/" className="btn-main w-100">Order Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6 mb-sm-30 fadeInRight" >
                            <div className="de_pricing-table type-2 rec">
                                <div className="d-head mb-1">
                                    <div className="d-recommend">Top Seller</div>
                                </div>
                                <div className="d-title">General</div>
                                <div className="d-stars"><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i></div>
                                <div className="spacer-20"></div>
                                <div className="d-specs">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="d-item">
                                                60<span>Player Slots</span>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="d-item">
                                                8GB<span>Memory</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="spacer-20"></div>
                                <div className="d-price text-center mb-0">
                                    <h4 className="opt-1 mb-0">$19.99 <span>/monthly</span></h4>
                                    <h4 className="opt-2 mb-0">$14.99 <span>/monthly</span></h4>
                                    <p className="opt-1">$0.50 per slot </p>
                                    <p className="opt-2">$0.25 per slot </p>
                                </div>
                                <div className="d-action">
                                    <Link to="/" className="btn-main w-100">Order Now</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-md-6 mb-sm-30 fadeInRight">
                            <div className="de_pricing-table type-2">
                                <div className="d-head mb-1">
                                </div>
                                <div className="d-title">Commander</div>
                                <div className="d-stars"><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i></div>
                                <div className="spacer-20"></div>
                                <div className="d-specs">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="d-item">
                                                125<span>Player Slots</span>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="d-item">
                                                16GB<span>Memory</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="spacer-20"></div>
                                <div className="d-price text-center mb-0">
                                    <h4 className="opt-1 mb-0">$29.99 <span>/monthly</span></h4>
                                    <h4 className="opt-2 mb-0">$24.99 <span>/monthly</span></h4>
                                    <p className="opt-1">$0.50 per slot </p>
                                    <p className="opt-2">$0.25 per slot </p>
                                </div>                            
                                <div className="d-action">
                                    <Link to="/" className="btn-main w-100">Order Now</Link>
                                </div>
                            </div>
                        </div>

                        </div>

                        <div className="spacer-double"></div>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="subtitle mb-3">Incredibly</div>
                                <h2 className="mb20">Features</h2>
                            </div>

                            <div className="col-lg-6"></div>

                            <div className="col-lg-3 col-md-6 mb-sm-20" >
                                <div className="padding30 rounded-10 bgcustom">
                                    <img src="./img/icons/1.png" className="mb20" alt=""/>
                                    <h4>Super Quick Setup</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-sm-20">
                                <div className="padding30 rounded-10 bgcustom">
                                    <img src="./img/icons/2.png" className="mb20" alt=""/>
                                    <h4>Premium Hardware</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-sm-20">
                                <div className="padding30 rounded-10 bgcustom">
                                    <img src="./img/icons/3.png" className="mb20" alt=""/>
                                    <h4>DDos Protection</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-sm-20">
                                <div className="padding30 rounded-10 bgcustom">
                                    <img src="./img/icons/4.png" className="mb20" alt=""/>
                                    <h4>Fast Support</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                                </div>
                            </div>
                        </div>

                        <div className="spacer-double"></div>

                        <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="subtitle wow fadeInUp mb-3">Payment Methods</div>
                            <h2 className="wow fadeInUp" data-wow-delay=".2s">We accept</h2>
                        </div>
                        <div className="col-lg-6">
                            <div className="row g-4">
                                <div className="col-sm-2 col-4">
                                    <div className="p-2 rounded-10 bg-half-white">
                                        <img width="70" height="50" src="./img/payments/visa.webp" className="img-fluid" alt=""/>
                                    </div>
                                </div>
                                <div className="col-sm-2 col-4">
                                    <div className="p-2 rounded-10 bg-half-white">
                                        <img width="70" height="50" src="./img/payments/mastercard.webp" className="img-fluid" alt=""/>
                                    </div>
                                </div>
                                <div className="col-sm-2 col-4">
                                    <div className="p-2 rounded-10 bg-half-white">
                                        <img width="70" height="50" src="./img/payments/paypal.webp" className="img-fluid" alt=""/>
                                    </div>
                                </div>
                                <div className="col-sm-2 col-4">
                                    <div className="p-2 rounded-10 bg-half-white">
                                        <img width="70" height="50" src="./img/payments/skrill.webp" className="img-fluid" alt=""/>
                                    </div>
                                </div>
                                <div className="col-sm-2 col-4">
                                    <div className="p-2 rounded-10 bg-half-white">
                                        <img width="70" height="50" src="./img/payments/jcb.webp" className="img-fluid" alt=""/>
                                    </div>
                                </div>
                                <div className="col-sm-2 col-4">
                                    <div className="p-2 rounded-10 bg-half-white">
                                        <img width="70" height="50" src="./img/payments/american-express.webp" className="img-fluid" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    </div>
        </>
    );
}

export default Server;