import React from 'react';
import { Link } from 'react-router-dom';


const Section = () => {
    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="subtitle mb-3">Popular</div>
                    <h2 className="mb20" data-wow-delay=".2s">Game Servers</h2>
                </div>

                <div className="col-lg-6">
                    <div className="row g-3">
                        <div className="col-lg-3 col-md-4 col-6 text-center">
                            <Link to="/">
                                <img src="../../img/covers-square/1.webp" className="img-fluid rounded-10 mb-3" alt=""/>
                                <h6>Thunder and City</h6>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6 text-center">
                            <Link to="/">
                                <img src="../../img/covers-square/2.webp" className="img-fluid rounded-10 mb-3" alt=""/>
                                <h6>Mystic Racing</h6>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6 text-center">
                            <Link to="/">
                                <img src="../../img/covers-square/3.webp" className="img-fluid rounded-10 mb-3" alt=""/>
                                <h6>Silent Wrath</h6>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6 text-center">
                            <Link to="/">
                                <img src="../../img/covers-square/4.webp" className="img-fluid rounded-10 mb-3" alt=""/>
                                <h6>Funk Dungeon</h6>
                            </Link>
                        </div>                                
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="row g-3">
                        <div className="col-lg-3 col-md-4 col-6 text-center">
                            <Link to="/">
                                <img src="../../img/covers-square/5.webp" className="img-fluid rounded-10 mb-3" alt=""/>
                                <h6>Galactic Odyssey</h6>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6 text-center">
                            <Link to="/">
                                <img src="../../img/covers-square/6.webp" className="img-fluid rounded-10 mb-3" alt=""/>
                                <h6>Warfare Legends</h6>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6 text-center">
                            <Link to="/">
                                <img src="../../img/covers-square/7.webp" className="img-fluid rounded-10 mb-3" alt=""/>
                                <h6>Raceway Revolutions</h6>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6 text-center">
                            <Link to="/">
                                <img src="../../img/covers-square/8.webp" className="img-fluid rounded-10 mb-3" alt=""/>
                                <h6>Starborne Odyssey</h6>
                            </Link>
                        </div>                                
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Section;