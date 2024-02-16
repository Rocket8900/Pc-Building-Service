import React from 'react';
import { Link } from 'react-router-dom';


const Section = () => {
    return(
        <div className="container">
            <div className="row g-4">
                <div className="col-lg-4 col-md-6">
                    <div className="de-box-cat h-100">
                        <i className="fa fa-folder-open-o"></i>
                        <Link to="/"><h3>Thunder and City <span>(12)</span></h3></Link>
                        <div className="d-subtitle">Help with Thunder and City</div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="de-box-cat h-100">
                        <i className="fa fa-folder-open-o"></i>
                        <Link to="/"><h3>Mystic Racing Z <span>(19)</span></h3></Link>
                        <div className="d-subtitle">Help with Mystic Racing Z</div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="de-box-cat h-100">
                        <i className="fa fa-folder-open-o"></i>
                        <Link to="/"><h3>Silent Wrath <span>(17)</span></h3></Link>
                        <div className="d-subtitle">Help with Silent Wrath</div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="de-box-cat h-100">
                        <i className="fa fa-folder-open-o"></i>
                        <Link to="/"><h3>Funk Dungeon <span>(18)</span></h3></Link>
                        <div className="d-subtitle">Help with Funk Dungeon</div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="de-box-cat h-100">
                        <i className="fa fa-folder-open-o"></i>
                        <Link to="/"><h3>Galactic Odyssey <span>(17)</span></h3></Link>
                        <div className="d-subtitle">Help with Galactic Odyssey</div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="de-box-cat h-100">
                        <i className="fa fa-folder-open-o"></i>
                        <Link to="/"><h3>Warfare Legends <span>(21)</span></h3></Link>
                        <div className="d-subtitle">Help with Warfare Legends</div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="de-box-cat h-100">
                        <i className="fa fa-folder-open-o"></i>
                        <Link to="/"><h3>Race Revolution <span>(17)</span></h3></Link>
                        <div className="d-subtitle">Help with Race Revolution</div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="de-box-cat h-100">
                        <i className="fa fa-folder-open-o"></i>
                        <Link to="/"><h3>Cyber Nexus <span>(19)</span></h3></Link>
                        <div className="d-subtitle">Help with Cyber Nexus</div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="de-box-cat h-100">
                        <i className="fa fa-folder-open-o"></i>
                        <Link to="/"><h3>Ancient Realms <span>(25)</span></h3></Link>
                        <div className="d-subtitle">Help with Ancient Realms</div>
                    </div>
                </div>
                

                <div className="spacer-double"></div>

                <div className="col-lg-12">
                    <div className="padding40 rounded-10 box-long">
                        <div className="row align-items-center">
                            <div className="col-lg-1">
                                <img src="./img/icons/4.png" alt="" className="img-responsive"/>
                            </div>
                            <div className="col-lg-9">
                                <h4>Cannot find answer? Contact our customer support now.</h4>
                            </div>
                            <div className="col-lg-2 text-lg-end">
                                <Link className="btn-main" to="/">Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Section;