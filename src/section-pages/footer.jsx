import React from 'react';
import { Link } from "react-router-dom";

const footer = () => {
    const currentYear = new Date().getFullYear();
    return(
        <footer>
            <div className="container">
                <div className="row gx-5">
                    <div className="col-lg-4">
                        <img src="./img/logo.png" alt="" />
                        <div className="spacer-20"></div>
                        <p>Lorem ipsum culpa tempor tempor eu laboris adipisicing sunt excepteur enim laborum officia eiusmod laborum sint do aliqua incididunt est aute deserunt in elit non sed ut velit ullamco aliquip. Nulla cupidatat elit amet sed labore ut et consequat nostrud laboris aliqua ex est fugiat quis aliqua duis quis esse dolor laboris non duis sunt.</p>
                    </div>
                    <div className="col-lg-4">
                        <div className="row">
                            <div className="col-lg-6 col-sm-6">
                                <div className="widget">
                                    <h5>Game Server</h5>
                                    <ul>
                                        <li><Link to="/">Thunder and City</Link></li>
                                        <li><Link to="/">Mystic Racing Z</Link></li>
                                        <li><Link to="/">Silent Wrath</Link></li>
                                        <li><Link to="/">Funk Dungeon</Link></li>
                                        <li><Link to="/">Galactic Oddsey</Link></li>
                                        <li><Link to="/">Warfare Legend</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-6">
                                <div className="widget">
                                    <h5>Pages</h5>
                                    <ul>
                                        <li><Link to="/">Game Server</Link></li>
                                        <li><Link to="/">Knowledgebase</Link></li>
                                        <li><Link to="/">About Us</Link></li>
                                        <li><Link to="/">Affliates</Link></li>
                                        <li><Link to="/">Locations</Link></li>
                                        <li><Link to="/">News</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="widget">
                            <h5>Newsletter</h5>
                            <form action="blank.php" className="row form-dark" id="form_subscribe" method="post" name="form_subscribe">
                            <div className="col text-center">
                                <input className="form-control" id="txt_subscribe" name="txt_subscribe" placeholder="enter your email" type="text" /> <Link to="/" id="btn-subscribe"><i className="arrow_right bg-color-secondary"></i></Link>
                                <div className="clearfix"></div>
                            </div>
                            </form>
                            <div className="spacer-10"></div>
                            <small>Your email is safe with us. We don&apos;t spam.</small>
                            <div className="spacer-30"></div>
                            <div className="widget">
                                <h5>Follow Us on</h5>
                                <div className="social-icons">
                                    <Link to="/"><i className="fa-brands fa-facebook-f"></i></Link>
                                    <Link to="/"><i className="fa-brands fa-twitter"></i></Link>
                                    <Link to="/"><i className="fa-brands fa-discord"></i></Link>
                                    <Link to="/"><i className="fa-brands fa-tiktok"></i></Link>
                                    <Link to="/"><i className="fa-brands fa-youtube"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="subfooter">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-sm-6">
                           Copyright {currentYear} - Playhost by Designesia
                        </div>
                        <div className="col-lg-6 col-sm-6 text-lg-end text-sm-start">
                            <ul className="menu-simple">
                                <li><Link to="/">Terms &amp; Conditions</Link></li>
                                <li><Link to="/">Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default footer;