import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Parallax } from "react-parallax";
import { Link } from "react-router-dom"; 
import Navbar from '../layout/Navbar';
import Preloader from '../layout/preloader';
import Footer from '../section-pages/footer';
import ScrollToTopBtn from '../layout/ScrollToTop';
import { createGlobalStyle } from 'styled-components';

const image1 ="./img/background/5.webp";

const GlobalStyles = createGlobalStyle`
  .react-parallax-bgimage {
    transform: translate3d(-50%, 0, 0px) !important;
  }
`;

export default function Home() {
  useEffect(() => {
      if (typeof window !== 'undefined') {
          const loader = document.getElementById('mainpreloader');
          if (loader)
          setTimeout(() => {
            loader.classList.add("fadeOut");
            loader.style.display = 'none';
          }, 600)
      }
    }, []);
  return (
    <>
    {/* HEAD */}
    <Helmet>
      <link rel="icon" href="./img/icon.png" />
      <title>Playhost - Game Hosting Website Template</title>
    </Helmet>

    <GlobalStyles/>

    {/* LOADER */}
    <div id='mainpreloader'>
      <Preloader/>
    </div>

    {/* MENU */}
    <div className="home dark-scheme">
      <header id="header-wrap">
         <Navbar />
      </header>

      {/* section */}
      <Parallax className="" bgImage={image1} strength={5}>  
        <div className="de-gradient-edge-top"></div>
        <div className="de-gradient-edge-bottom"></div>
        <section className="no-bg">
          <div className="container z-9">
            <div className="row align-items-center">
                            <div className="col-lg-8 offset-lg-2">
                                <div className="p-5 rounded-10 shadow-soft bg-dark-1" id="login">
                                    <form name="contactForm" id='contact_form' className="form-border">
                                        <h4>Don&apos;t have an account? Register now.</h4>
                                        <p>Welcome to Plahost. We&apos;re excited to have you on board. By creating an account with us, you&apos;ll gain access to a range of benefits and convenient features that will enhance your car rental experience.</p>
                                        <div className="row">

                                            <div className="col-md-6">
                                                <div className="field-set">
                                                    <label>Name:</label>
                                                    <input type='text' name='name' id='name' className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="field-set">
                                                    <label>Email Address:</label>
                                                    <input type='text' name='email' id='email' className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="field-set">
                                                    <label>Choose a Username:</label>
                                                    <input type='text' name='username' id='username' className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="field-set">
                                                    <label>Phone:</label>
                                                    <input type='text' name='phone' id='phone' className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="field-set">
                                                    <label>Password:</label>
                                                    <input type='text' name='password' id='password' className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="field-set">
                                                    <label>Re-enter Password:</label>
                                                    <input type='text' name='re-password' id='re-password' className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 offset-lg-3 text-center my-3">
                                                <div id='submit'>
                                                    <input type='submit' id='send_message' value='Register Now' className="btn-main color-2"/>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 offset-lg-3">
                                                <div className="title-line">Or&nbsp;sign&nbsp;up&nbsp;with</div>
                                                <div className="row g-2">
                                                    <div className="col-lg-6">
                                                        <Link className="btn-sc btn-fullwidth mb10" to="/"><img src="./img/svg/google_icon.svg" alt=""/>Google</Link>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <Link className="btn-sc btn-fullwidth mb10" to="/"><img src="./img/svg/facebook_icon.svg" alt=""/>Facebook</Link>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
          </div>
        </section>
      </Parallax>

      {/* footer */}
      <Footer/>


    </div>
    <ScrollToTopBtn />
    </>
  )
}
