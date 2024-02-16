import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Parallax } from "react-parallax";
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Preloader from '../layout/preloader';
import Footer from '../section-pages/footer';
import ScrollToTopBtn from '../layout/ScrollToTop';
import { createGlobalStyle } from 'styled-components';

const image1 ="./img/background/2.webp";

const GlobalStyles = createGlobalStyle`
  .react-parallax-bgimage {
    transform: translate3d(-50%, 0, 0px) !important;
  }
  .h-100{
    height: 100vh !important;
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
        <section className="no-bg h-100">
          <div className="container z-9">
              <div className="row align-items-center">
                <div className="col-lg-4 offset-lg-4">
                    <div className="padding40 rounded-10 shadow-soft bg-dark-1" id="login">
                        <div className="text-center">
                            <h4>Sign in to your account</h4>
                        </div>
                        <div className="spacer-10"></div>
                        <form id="form_register" className="form-border">
                            <div className="field-set">
                                <label>Username or email</label>
                                <input type='text' name='name' id='name' className="form-control"/>
                            </div>
                            <div className="field-set">
                                <label>Password</label>
                                <input type='text' name='password' id='password' className="form-control"/>
                            </div>
                            <div className="field-set">
                                <input type="checkbox" checked id="html" name="fav_language"/>
                                <label><span className="op-5">&nbsp;Remember me</span></label><br/>
                            </div>
                            <div className="spacer-20"></div>
                            <div id="submit">
                                <input id="send_message" value="Sign In" className="btn-main btn-fullwidth rounded-3" />
                            </div>
                        </form>
                        <div className="title-line">Or&nbsp;login&nbsp;up&nbsp;with</div>
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
