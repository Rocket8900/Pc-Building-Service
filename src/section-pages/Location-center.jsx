import React from 'react';

const Sectionloc = () => {
    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col-lg-6 offset-lg-3 text-center">
                    <div className="subtitle fadeInUp mb-3">Server locations</div>
                </div>
                <div className="col-lg-6 offset-lg-3 text-center">
                    <h2 className="fadeInUp mb20">25 servers worldwide.</h2>
                </div>

                <div className="spacer-10"></div>

                <div className="col-lg-12 fadeInUp">
                    <div className="p-sm-30 pb-sm-0 mb-sm-0">
                        <div className="de-map-hotspot">
                            <div className="de-spot fadeIn" style={{top:'39%', left:'20%',}}>
                                <span>United&nbsp;States</span>
                                <div className="de-circle-1"></div>
                                <div className="de-circle-2"></div>
                            </div>
                            <div className="de-spot fadeIn" style={{top:'76%', left:'87%'}}>
                                <span>Australia</span>
                                <div className="de-circle-1"></div>
                                <div className="de-circle-2"></div>
                            </div>
                            <div className="de-spot fadeIn" style={{top:'68%', left:'80%'}}>
                                <span>Indonesia</span>
                                <div className="de-circle-1"></div>
                                <div className="de-circle-2"></div>
                            </div>
                            <div className="de-spot fadeIn" style={{top:'23%', left:'18%'}}>
                                <span>Canada</span>
                                <div className="de-circle-1"></div>
                                <div className="de-circle-2"></div>
                            </div>
                            <div className="de-spot fadeIn" style={{top:'68%', left:'33%'}}>
                                <span>Brazil</span>
                                <div className="de-circle-1"></div>
                                <div className="de-circle-2"></div>
                            </div>
                            <div className="de-spot fadeIn" style={{top:'45%', left:'75%'}}>
                                <span>China</span>
                                <div className="de-circle-1"></div>
                                <div className="de-circle-2"></div>
                            </div>
                            <div className="de-spot fadeIn" style={{top:'36%', left:'48%'}}>
                                <span>France</span>
                                <div className="de-circle-1"></div>
                                <div className="de-circle-2"></div>
                            </div>
                            <div className="de-spot fadeIn" style={{top:'23%', left:'51%'}}>
                                <span>Sweden</span>
                                <div className="de-circle-1"></div>
                                <div className="de-circle-2"></div>
                            </div>
                            <div className="de-spot fadeIn" style={{top:'78%', left:'53%'}}>
                                <span>South&nbsp;Africa</span>
                                <div className="de-circle-1"></div>
                                <div className="de-circle-2"></div>
                            </div>
                            <img src="./img/misc/world-map.webp" className="img-fluid" alt=""/>
                        </div>
                    </div>
                </div>                        
            </div>
        </div>
        <div className="no-bottom wow fadeInRight d-flex z-1000">
          <div className="de-marquee-list wow">
            <div className="d-item">
              <span className="d-item-txt">London</span>
              <span className="d-item-display">
                <i className="d-item-block"></i>
              </span>
              <span className="d-item-txt">Paris</span>
              <span className="d-item-display">
                <i className="d-item-block"></i>
              </span>
              <span className="d-item-txt">Frankurt</span>
              <span className="d-item-display">
                <i className="d-item-block"></i>
              </span>
              <span className="d-item-txt">Amsterdam</span>
              <span className="d-item-display">
                <i className="d-item-block"></i>
              </span>
              <span className="d-item-txt">Stockholm</span>
              <span className="d-item-display">
                <i className="d-item-block"></i>
              </span>
              <span className="d-item-txt">Helsinki</span>
              <span className="d-item-display">
                <i className="d-item-block"></i>
              </span>
              <span className="d-item-txt">Los Angeles</span>
              <span className="d-item-display">
                <i className="d-item-block"></i>
              </span>
              <span className="d-item-txt">Quebec</span>
              <span className="d-item-display">
                <i className="d-item-block"></i>
              </span>
              <span className="d-item-txt">Singapore</span>
              <span className="d-item-display">
                <i className="d-item-block"></i>
              </span>
              <span className="d-item-txt">Sydney</span>
              <span className="d-item-display">
                <i className="d-item-block"></i>
              </span>
              <span className="d-item-txt">Sau Paulo</span>
              <span className="d-item-display">
                <i className="d-item-block"></i>
              </span>
              <span className="d-item-txt">Bangkok</span>
              <span className="d-item-display">
                <i className="d-item-block"></i>
              </span>
              <span className="d-item-txt">Jakarta</span>
              <span className="d-item-display">
                <i className="d-item-block"></i>
              </span>
             </div>
          </div>
        </div>
        </>
    );
}

export default Sectionloc;