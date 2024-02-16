import React from 'react';
import { Link } from 'react-router-dom';

const collection = () => {
    return(
        <div className="container">
            <div className="row">
              <div className="col-md-6">
                  <div className="subtitle mb20">Most complete</div>
                  <h2 className="wow fadeInUp">Game Collection</h2>
                  <div className="spacer-20"></div>
              </div>
              <div className="col-lg-6 text-lg-end">
                  <Link className="btn-main mb-sm-30" to="/">View all games</Link>
              </div>
            </div>
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
                    <img src="./img/covers/1.webp" className="img-fluid " alt=""/>
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
                            <Link className="btn-main btn-fullwidth" to="/">Order Now</Link>
                        </div>
                    </div>
                    <img src="./img/covers/2.webp" className="img-fluid " alt=""/>
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
                            <Link className="btn-main btn-fullwidth" to="/">Order Now</Link>
                        </div>
                    </div>
                    <img src="./img/covers/3.webp" className="img-fluid " alt=""/>
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
                            <Link className="btn-main btn-fullwidth" to="/">Order Now</Link>
                        </div>
                    </div>
                    <img src="./img/covers/4.webp" className="img-fluid " alt=""/>
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
                            <Link className="btn-main btn-fullwidth" to="/">Order Now</Link>
                        </div>
                    </div>
                    <img src="./img/covers/5.webp" className="img-fluid " alt=""/>
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
                            <Link className="btn-main btn-fullwidth" to="/">Order Now</Link>
                        </div>
                    </div>
                    <img src="./img/covers/6.webp" className="img-fluid " alt=""/>
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
                            <Link className="btn-main btn-fullwidth" to="/">Order Now</Link>
                        </div>
                    </div>
                    <img src="./img/covers/7.webp" className="img-fluid " alt=""/>
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
                            <Link className="btn-main btn-fullwidth" to="/">Order Now</Link>
                        </div>
                    </div>
                    <img src="./img/covers/8.webp" className="img-fluid" alt=""/>
                </div>
            </div>

            </div>

        </div>
    );
}

export default collection;