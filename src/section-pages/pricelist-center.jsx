import React, { useState } from "react";
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

    //switch
    const [isChecked, setIsChecked] = useState(false);
    const handleToggle = () => {
    setIsChecked((prevState) => !prevState);
    };
    const switchClassName = isChecked ? 'switch checked' : 'switch';
    const otherElementClassName = isChecked ? 'other-element active' : 'other-element';

    return(
        <>
            <GlobalStyles/>
                <div className="de-gradient-edge-top"></div>
                <div className="de-gradient-edge-bottom"></div>
                <div className="container z-9">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 text-center">
                            <div className="subtitle fadeInUp mb-3">Pricing Plans</div>
                            <h2 className="fadeInUp mb20">Choose plan for you</h2>                       
                            <div className="switch-set">
                                <div>Monthly Plan</div>
                                <div>
                                    <input
                                      id="sw-1"
                                      className={switchClassName}
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={handleToggle}
                                    />
                                </div>
                                <div>Yearly Plan</div>
                                <div className="spacer-20"></div>
                            </div>
                        </div>

                        <div className="clearfix"></div>
                        <div className="col-xl-4 col-md-6 mb-sm-30 fadeInRight" >
                            <div className={`de_pricing-table type-2 ${otherElementClassName}`}>
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
                            <div className={`de_pricing-table type-2 rec ${otherElementClassName}`}>
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
                            <div className={`de_pricing-table type-2 ${otherElementClassName}`}>
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
                    </div>
        </>
    );
}

export default Server;