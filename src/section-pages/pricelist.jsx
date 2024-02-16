import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { Link } from "react-router-dom";

const Server = () => {
    // select GB
    const [selected, setSelected] = useState('GB'); // Change 'GB' to the desired country code
    const handleSelect = (countryCode) => {
    setSelected(countryCode);
    };

    // select GB
    const [selected1, setSelected1] = useState('GB'); // Change 'GB' to the desired country code
    const handleSelect1 = (countryCode) => {
    setSelected1(countryCode);
    };

    // select GB
    const [selected2, setSelected2] = useState('GB'); // Change 'GB' to the desired country code
    const handleSelect2 = (countryCode) => {
    setSelected2(countryCode);
    };

    // select GB
    const [selected3, setSelected3] = useState('GB'); // Change 'GB' to the desired country code
    const handleSelect3 = (countryCode) => {
    setSelected3(countryCode);
    };

    //switch
    const [isChecked, setIsChecked] = useState(false);
    const handleToggle = () => {
    setIsChecked((prevState) => !prevState);
    };
    const switchClassName = isChecked ? 'switch checked' : 'switch';
    const otherElementClassName = isChecked ? 'other-element active' : 'other-element';

    return(
        <>
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
                        <div className="col-xl-3 col-md-6 mb-sm-30 fadeInRight" >
                            <div className={`de_pricing-table type-2 ${otherElementClassName}`}>
                                <div className="d-head">
                                    <h3>4 Slots</h3>
                                </div>
                                <div className="d-price">
                                    <h4 className="opt-1">$3.59<span>/mo</span></h4>
                                    <h4 className="opt-2">$2.59<span>/mo</span></h4>
                                    <p>Normally <s>$9.99</s></p>
                                </div>                                
                                <div className="d-location">
                                    <h4>Server Location</h4>
                                    <ReactFlagsSelect
                                        className="flags"
                                        countries={["GB", "FR", "DE", "NL", "SE", "FI", "US", "QC", "AU", "BR", "TH", "ID"]}
                                        customLabels={{ 
                                        GB: "London, England", 
                                        FR: "Paris, France", 
                                        DE: "Frankurt, Germany", 
                                        NL: "Amsterdam, Netherlands", 
                                        SE: "Stockholm, Sweden", 
                                        FI: "Helsinki, Finland", 
                                        US: "Los Angeles, USA", 
                                        QC: "Quebec, Canada",
                                        AU: "Sydney, Australia", 
                                        BR: "Sau Paulo, Brazil", 
                                        TH: "Bangkok, Thailand", 
                                        ID: "Jakarta, Indonesia"
                                        }}
                                        selected={selected}
                                        onSelect={handleSelect}
                                        searchable={false}
                                    />
                                </div>
                                <div className="spacer-5"></div>
                                <div className="d-group">
                                    <h4>Top Features</h4>
                                    <ul className="d-list">
                                        <li>Super Quick Setup</li>
                                        <li>Premium Hardware</li>
                                        <li>DDos Protection</li>
                                        <li>24/7 Customer Support</li>
                                    </ul>
                                </div>
                                <div className="d-action">
                                    <Link to="/" className="btn-main opt-1 w-100">Get Monthly Plan</Link>
                                    <Link to="/" className="btn-main opt-2 w-100">Get Yearly Plan</Link>
                                    <p>Auto re-news at regular rate</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-sm-30 fadeInRight" >
                            <div className={`de_pricing-table type-2 ${otherElementClassName}`}>
                                <div className="d-head">
                                    <h3>10 Slots</h3>
                                </div>
                                <div className="d-price">
                                    <h4 className="opt-1">$5.59<span>/mo</span></h4>
                                    <h4 className="opt-2">$3.59<span>/mo</span></h4>
                                    <p>Normally <s>$15.99</s></p>
                                </div>
                                <div className="d-location">
                                    <h4>Server Location</h4>
                                    <ReactFlagsSelect
                                        className="flags"
                                        countries={["GB", "FR", "DE", "NL", "SE", "FI", "US", "QC", "AU", "BR", "TH", "ID"]}
                                        customLabels={{ 
                                        GB: "London, England", 
                                        FR: "Paris, France", 
                                        DE: "Frankurt, Germany", 
                                        NL: "Amsterdam, Netherlands", 
                                        SE: "Stockholm, Sweden", 
                                        FI: "Helsinki, Finland", 
                                        US: "Los Angeles, USA", 
                                        QC: "Quebec, Canada",
                                        AU: "Sydney, Australia", 
                                        BR: "Sau Paulo, Brazil", 
                                        TH: "Bangkok, Thailand", 
                                        ID: "Jakarta, Indonesia"
                                        }}
                                        selected={selected1}
                                        onSelect={handleSelect1}
                                        searchable={false}
                                    />
                                </div>
                                <div className="d-group">
                                    <h4>Top Features</h4>
                                    <ul className="d-list">
                                        <li>Super Quick Setup</li>
                                        <li>Premium Hardware</li>
                                        <li>DDos Protection</li>
                                        <li>24/7 Customer Support</li>
                                    </ul>
                                </div>
                                <div className="d-action">
                                    <Link to="/" className="btn-main opt-1 w-100">Get Monthly Plan</Link>
                                    <Link to="/" className="btn-main opt-2 w-100">Get Yearly Plan</Link>
                                    <p>Auto re-news at regular rate</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6 mb-sm-30 fadeInRight">
                            <div className={`de_pricing-table type-2 rec ${otherElementClassName}`}>
                                <div className="d-recommend">Best Seller</div>
                                <div className="d-head">
                                    <h3>20 Slots</h3>
                                </div>
                                <div className="d-price">
                                    <h4 className="opt-1">$8.59<span>/mo</span></h4>
                                    <h4 className="opt-2">$5.59<span>/mo</span></h4>
                                    <p>Normally <s>$24.99</s></p>
                                </div>
                                <div className="d-location">
                                    <h4>Server Location</h4>
                                    <ReactFlagsSelect
                                        className="flags"
                                        countries={["GB", "FR", "DE", "NL", "SE", "FI", "US", "QC", "AU", "BR", "TH", "ID"]}
                                        customLabels={{ 
                                        GB: "London, England", 
                                        FR: "Paris, France", 
                                        DE: "Frankurt, Germany", 
                                        NL: "Amsterdam, Netherlands", 
                                        SE: "Stockholm, Sweden", 
                                        FI: "Helsinki, Finland", 
                                        US: "Los Angeles, USA", 
                                        QC: "Quebec, Canada",
                                        AU: "Sydney, Australia", 
                                        BR: "Sau Paulo, Brazil", 
                                        TH: "Bangkok, Thailand", 
                                        ID: "Jakarta, Indonesia"
                                        }}
                                        selected={selected2}
                                        onSelect={handleSelect2}
                                        searchable={false}
                                    />
                                </div>
                                <div className="d-group">
                                    <h4>Top Features</h4>
                                    <ul className="d-list">
                                        <li>Super Quick Setup</li>
                                        <li>Premium Hardware</li>
                                        <li>DDos Protection</li>
                                        <li>24/7 Customer Support</li>
                                    </ul>
                                </div>                                
                                <div className="d-action">
                                    <Link to="/" className="btn-main opt-1 w-100">Get Monthly Plan</Link>
                                    <Link to="/" className="btn-main opt-2 w-100">Get Yearly Plan</Link>
                                    <p>Auto re-news at regular rate</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6 mb-sm-30 fadeInRight" >
                            <div className={`de_pricing-table type-2 rec ${otherElementClassName}`}>
                                <div className="d-head">
                                    <h3>Custom</h3>
                                </div>
                                <div className="d-price">
                                    <h4 className="opt-1">$15.59<span>/mo</span></h4>
                                    <h4 className="opt-2">$10.59<span>/mo</span></h4>
                                    <p>Normally <s>$36.99</s></p>
                                </div>
                                <div className="d-location">
                                    <h4>Server Location</h4>
                                    <ReactFlagsSelect
                                        className="flags"
                                        countries={["GB", "FR", "DE", "NL", "SE", "FI", "US", "QC", "AU", "BR", "TH", "ID"]}
                                        customLabels={{ 
                                        GB: "London, England", 
                                        FR: "Paris, France", 
                                        DE: "Frankurt, Germany", 
                                        NL: "Amsterdam, Netherlands", 
                                        SE: "Stockholm, Sweden", 
                                        FI: "Helsinki, Finland", 
                                        US: "Los Angeles, USA", 
                                        QC: "Quebec, Canada",
                                        AU: "Sydney, Australia", 
                                        BR: "Sau Paulo, Brazil", 
                                        TH: "Bangkok, Thailand", 
                                        ID: "Jakarta, Indonesia"
                                        }}
                                        selected={selected3}
                                        onSelect={handleSelect3}
                                        searchable={false}
                                    />
                                </div>
                                <div className="d-group">
                                    <h4>Top Features</h4>
                                    <ul className="d-list">
                                        <li>Super Quick Setup</li>
                                        <li>Premium Hardware</li>
                                        <li>DDos Protection</li>
                                        <li>24/7 Customer Support</li>
                                    </ul>
                                </div>
                                <div className="d-action">
                                    <Link to="/" className="btn-main opt-1 w-100">Get Monthly Plan</Link>
                                    <Link to="/" className="btn-main opt-2 w-100">Get Yearly Plan</Link>
                                    <p>Auto re-news at regular rate</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </>
    );
}

export default Server;