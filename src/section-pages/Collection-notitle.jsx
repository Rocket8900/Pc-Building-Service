import React from 'react';
import { Link } from "react-router-dom";

const image1 = '../img/covers/1.webp';
const image2 = '../img/covers/2.webp';
const image3 = '../img/covers/3.webp';
const image4 = '../img/covers/4.webp';
const image5 = '../img/covers/5.webp';
const image6 = '../img/covers/6.webp';
const image7 = '../img/covers/7.webp';
const image8 = '../img/covers/8.webp';

const collection = () => {
    return(
        <div className="container">
            <div className="row g-4 sequence">

            <div className="col-lg-3 col-md-6 gallery-item">
                <div className="de-item wow">
                    <div className="d-overlay">
                        <div className="d-label">
                            20% OFF
                        </div>
                        <div className="d-text">
                            <h4>Thunder and City</h4>
                            <p className="d-price">Starting at <span className="price">$14.99</span></p>
                            <Link className="btn-main btn-fullwidth" to="/">Order Now</Link>
                        </div>
                    </div>
                    <img src={image1} className="img-fluid " alt=""/>
                </div>
            </div>

            <div className="col-lg-3 col-md-6 gallery-item">
                <div className="de-item wow">
                    <div className="d-overlay">
                        <div className="d-label">
                            20% OFF
                        </div>
                        <div className="d-text">
                            <h4>Mystic Racing Z</h4>
                            <p className="d-price">Starting at <span className="price">$14.99</span></p>
                            <Link className="btn-main btn-fullwidth" href="#">Order Now</Link>
                        </div>
                    </div>
                    <img src={image2} className="img-fluid " alt=""/>
                </div>
            </div>

            <div className="col-lg-3 col-md-6 gallery-item">
                <div className="de-item wow">
                    <div className="d-overlay">
                        <div className="d-label">
                            20% OFF
                        </div>
                        <div className="d-text">
                            <h4>Silent Wrath</h4>
                            <p className="d-price">Starting at <span className="price">$14.99</span></p>
                            <Link className="btn-main btn-fullwidth" href="#">Order Now</Link>
                        </div>
                    </div>
                    <img src={image3} className="img-fluid " alt=""/>
                </div>
            </div>

            <div className="col-lg-3 col-md-6 gallery-item">
                <div className="de-item wow">
                    <div className="d-overlay">
                        <div className="d-label">
                            20% OFF
                        </div>
                        <div className="d-text">
                            <h4>Funk Dungeon</h4>
                            <p className="d-price">Starting at <span className="price">$14.99</span></p>
                            <Link className="btn-main btn-fullwidth" href="#">Order Now</Link>
                        </div>
                    </div>
                    <img src={image4} className="img-fluid " alt=""/>
                </div>
            </div>

            <div className="col-lg-3 col-md-6 gallery-item">
                <div className="de-item wow">
                    <div className="d-overlay">
                        <div className="d-label">
                            20% OFF
                        </div>
                        <div className="d-text">
                            <h4>Galactic Odyssey</h4>
                            <p className="d-price">Starting at <span className="price">$14.99</span></p>
                            <Link className="btn-main btn-fullwidth" href="#">Order Now</Link>
                        </div>
                    </div>
                    <img src={image5} className="img-fluid " alt=""/>
                </div>
            </div>

            <div className="col-lg-3 col-md-6 gallery-item">
                <div className="de-item wow">
                    <div className="d-overlay">
                        <div className="d-label">
                            20% OFF
                        </div>
                        <div className="d-text">
                            <h4>Warfare Legends</h4>
                            <p className="d-price">Starting at <span className="price">$14.99</span></p>
                            <Link className="btn-main btn-fullwidth" href="#">Order Now</Link>
                        </div>
                    </div>
                    <img src={image6} className="img-fluid " alt=""/>
                </div>
            </div>

            <div className="col-lg-3 col-md-6 gallery-item">
                <div className="de-item wow">
                    <div className="d-overlay">
                        <div className="d-label">
                            20% OFF
                        </div>
                        <div className="d-text">
                            <h4>Raceway Revolution</h4>
                            <p className="d-price">Starting at <span className="price">$14.99</span></p>
                            <Link className="btn-main btn-fullwidth" href="#">Order Now</Link>
                        </div>
                    </div>
                    <img src={image7} className="img-fluid " alt=""/>
                </div>
            </div>

            <div className="col-lg-3 col-md-6 gallery-item sandbox">
                <div className="de-item wow">
                    <div className="d-overlay">
                        <div className="d-label">
                            20% OFF
                        </div>
                        <div className="d-text">
                            <h4>Starborne Odyssey</h4>
                            <p className="d-price">Starting at <span className="price">$14.99</span></p>
                            <Link className="btn-main btn-fullwidth" href="#">Order Now</Link>
                        </div>
                    </div>
                    <img src={image8} className="img-fluid" alt=""/>
                </div>
            </div>

            </div>

        </div>
    );
}

export default collection;