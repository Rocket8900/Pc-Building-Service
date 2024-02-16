import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { Link } from 'react-router-dom';


const Server = () => {
    // select GB
    const [selected, setSelected] = useState('GB'); // Change 'GB' to the desired country code
    const handleSelect = (countryCode) => {
    setSelected(countryCode);
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

                        <div className="col-md-12">
                            <table className="table table-pricing dark-style text-center">
                              <thead>
                                <tr>
                                  <th scope="col">Package</th>
                                  <th scope="col">Player Slots</th>
                                  <th scope="col">Memory</th>
                                  <th scope="col">Server Locations</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Order</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className={`de_pricing-table ${otherElementClassName}`}>
                                  <th>Rookie</th>
                                  <td><i className="fa fa-user id-color"></i> 10 Players</td>
                                  <td><i className="fa-solid fa-memory id-color"></i> 2 GB</td>
                                  <td className="d-spc py-4">
                                    <ReactFlagsSelect
                                        className="flagstable"
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
                                  </td>
                                  <td className="d-spc"><span className="opt-1">$9.99</span><span className="opt-2">$5.99</span></td>
                                  <td>
                                    <Link to="/" className="btn-main opt-1">Order Now</Link>
                                    <Link to="/" className="btn-main opt-2">Order Now</Link>
                                  </td>
                                </tr>
                                <tr className={`de_pricing-table ${otherElementClassName}`}>
                                  <th>Warrior</th>
                                  <td><i className="fa fa-user id-color"></i> 40 Players</td>
                                  <td><i className="fa-solid fa-memory id-color"></i> 4 GB</td>
                                  <td className="d-spc py-4">
                                    <ReactFlagsSelect
                                        className="flagstable"
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
                                  </td>
                                  <td className="d-spc"><span className="opt-1">$14.99</span><span className="opt-2">$9.99</span></td>
                                  <td>
                                    <Link to="/" className="btn-main opt-1">Order Now</Link>
                                    <Link to="/" className="btn-main opt-2">Order Now</Link>
                                  </td>
                                </tr>
                                
                                <tr className={`de_pricing-table ${otherElementClassName}`}>
                                  <th>General</th>
                                  <td><i className="fa fa-user id-color"></i> 60 Players</td>
                                  <td><i className="fa-solid fa-memory id-color"></i> 8 GB</td>
                                  <td className="d-spc py-4">
                                    <ReactFlagsSelect
                                        className="flagstable"
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
                                  </td>
                                  <td className="d-spc"><span className="opt-1">$19.99</span><span className="opt-2">$14.99</span></td>
                                  <td>
                                    <Link to="/" className="btn-main opt-1">Order Now</Link>
                                    <Link to="/" className="btn-main opt-2">Order Now</Link>
                                  </td>
                                </tr>
                                
                                <tr className={`de_pricing-table ${otherElementClassName}`}>
                                  <th>Commander</th>
                                  <td><i className="fa fa-user id-color"></i> 125 Players</td>
                                  <td><i className="fa-solid fa-memory id-color"></i> 16 GB</td>
                                  <td className="d-spc py-4">
                                    <ReactFlagsSelect
                                        className="flagstable"
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
                                  </td>
                                  <td className="d-spc"><span className="opt-1">$29.99</span><span className="opt-2">$24.99</span></td>
                                  <td>
                                    <Link to="/" className="btn-main opt-1">Order Now</Link>
                                    <Link to="/" className="btn-main opt-2">Order Now</Link>
                                  </td>
                                </tr>
                                
                                <tr className={`de_pricing-table ${otherElementClassName}`}>
                                  <th>Legendary</th>
                                  <td><i className="fa fa-user id-color"></i> 200+ Players</td>
                                  <td><i className="fa-solid fa-memory id-color"></i> 32 GB</td>
                                  <td className="d-spc py-4">
                                    <ReactFlagsSelect
                                        className="flagstable"
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
                                  </td>
                                  <td className="d-spc"><span className="opt-1">$59.99</span><span className="opt-2">$49.99</span></td>
                                  <td>
                                    <Link to="/" className="btn-main opt-1">Order Now</Link>
                                    <Link to="/" className="btn-main opt-2">Order Now</Link>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                        </div>                 


                        </div>
                    </div>
        </>
    );
}

export default Server;