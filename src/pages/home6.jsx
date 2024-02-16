import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Parallax } from "react-parallax";
import { Link } from "react-router-dom"; 
import Navbar from '../layout/Navbar';
import Preloader from '../layout/preloader';
import SwiperComponent from '../section-pages/slider-home-2';
import Section1 from '../section-pages/section-1-notitle';
import Collection from '../section-pages/Collection-notitle';
import Section2 from '../section-pages/section-2-1';
import Reviews from '../section-pages/CustomerReviews-notitle';
import Servers from '../section-pages/Server';
import Help from '../section-pages/help-no-title';
import Download from '../section-pages/Download-notitle';
import Payment from '../section-pages/Payment';
import Footer from '../section-pages/footer';
import ScrollToTopBtn from '../layout/ScrollToTop';
import { createGlobalStyle } from 'styled-components';

const image1 ="../../img/background/9.webp";

const GlobalStyles = createGlobalStyle`
    h1.slider-title.s2 {
      font-size: 64px;
      letter-spacing: -2px;
      text-transform: none !important;
    }
    * {
      --primary-color: #E51284;
      --primary-color-rgb: 229, 18, 132;
      --secondary-color: #575AFF;
      --secondary-color-rgb: 87, 90, 255;
      --tertiary-color: #097dff;
      --tertiary-color-rgb: rgba(9, 125, 255, 1.0);
      --bg-dark-1: #000002;
      --bg-dark-1-rgb: 0 ,0 ,2;
      --bg-dark-2: #060608;
      --bg-dark-3: #383339;
      --dark-body-font-color: #9a99b1;
      --gradient-text: 45deg,#ffffff 0%, #aaaaaa 100%;
      --body-font-weight: 400;
    }
    .text-gradient {
      background: -webkit-linear-gradient(45deg,var(--primary-color) 0%, var(--secondary-color) 100%);
      background: -moz-linear-gradient(45deg,var(--primary-color) 0%, var(--secondary-color) 100%);
      background: linear-gradient(45deg,var(--primary-color) 0%, var(--secondary-color) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .de-gradient-edge-bottom{
      background: linear-gradient(0deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
    }
    .de-gradient-edge-top{
      background: linear-gradient(0deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%);
    }
    .widget{
      margin-top:30px;
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

      {/* slider */}
      <Parallax className="" bgImage={image1} strength={50}>  
        <div className="de-gradient-edge-top"></div>
        <div className="de-gradient-edge-bottom"></div>
        <section className="no-padding no-bg">
          <SwiperComponent />
        </section>
      </Parallax>

      {/* section */}
      <section className="no-bottom tex-center">
        <div className="container">
          <div className="row">
              <div className="col-lg-12">
                  <div className="subtitle mb-3">Incredibly features</div>
                  <h2 className="mb20"><span className="text-gradient">Premium</span> Game Server</h2>
              </div>
          </div>
        </div>
        <Section1/>
      </section>

      {/* section */}
      <Parallax className="" bgImage={image1} strength={300}>  
        <div className="de-gradient-edge-top"></div>
        <div className="de-gradient-edge-bottom"></div>
        <section className="no-bg">
        <div className="container">
            <div className="row">
              <div className="col-md-6">
                  <div className="subtitle mb20">Most complete</div>
                  <h2 className="wow fadeInUp">Game <span className="text-gradient">Collection</span></h2>
                  <div className="spacer-20"></div>
              </div>
              <div className="col-lg-6 text-lg-end">
                  <Link className="btn-main mb-sm-30" to="/">View all games</Link>
              </div>
            </div>
            </div>
          <Collection/>
        </section>
      </Parallax>

      {/* section 2 */}
      <section className="no-bottom">
        <Section2/>
      </section>

      {/* section 3 */}
      <section className="no-bottom">
      <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="subtitle mb20">Customer reviews</div>
                    <h2 className="wow fadeInUp"><span className="text-gradient">4.85</span> out of 5</h2>
                    <div className="spacer-20"></div>
                </div>
            </div>
        </div>
        <Reviews/>
      </section>

      {/* section 4 */}
      <section className="no-bottom">
        <Servers/>
      </section>

      {/* section */}
      <section className="no-bottom">
      <div className="container">
            <div className="row">
                <div className="col-lg-6">                            
                    <div className="subtitle  mb-3">Do you have</div>
                    <h2 className=" mb20">Any <span className="text-gradient">questions?</span> </h2>
                </div>
            </div>
        </div>
        <Help/>
      </section>

      {/* section */}
      <section className="no-bottom">
        <Download/>
      </section>

      {/* section */}
      <section className="">
        <Payment/>
      </section>

      {/* footer */}
      <Footer/>


    </div>
    <ScrollToTopBtn />
    </>
  )
}
