import React, { useEffect } from 'react';
import { Parallax } from "react-parallax";
import { Helmet } from 'react-helmet-async';
import Navbar from '../layout/Navbar';
import Preloader from '../layout/preloader';
import SwiperComponent from '../section-pages/slider-3-col';
import Section2 from '../section-pages/section-2';
import Section1 from '../section-pages/section-1';
import Reviews from '../section-pages/CustomerReviews';
import Servers from '../section-pages/Server';
import Collection from '../section-pages/Collection';
import Help from '../section-pages/help';
import Download from '../section-pages/Download';
import Payment from '../section-pages/Payment';
import Footer from '../section-pages/footer';
import ScrollToTopBtn from '../layout/ScrollToTop';
import { createGlobalStyle } from 'styled-components';

const image1 ="./img/background/3.webp";

const GlobalStyles = createGlobalStyle`
  .navbar-brand .imginit{
      display: block ;
    }
    .navbar-brand .imgsaly{
      display: none !important;
    }
    #slider .smallslider{ 
      height: 75vh;
      .img-fluid{
        height: 67vh;
        object-fit: cover;
        object-position: top;
      }
      .de-item .d-overlay .d-text h4 {
          font-size: 32px;
          border-bottom: solid 1px rgba(255, 255, 255, .5);
          padding-bottom: 15px;
          background: linear-gradient(0deg,#888888 0%, #ffffff 75%);
          background-clip: border-box;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
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

      {/* slider */}
      <section className="pt90 no-bottom" id="slider">
        <SwiperComponent />
      </section>

      {/* section */}
      <section className="pt60 no-bottom">
        <Servers/>
      </section>

      {/* section */}
      <section className="no-bottom">
        <Section1/>
      </section>

      {/* section */}
      <section className="no-bottom">
        <Section2/>
      </section>

      {/* section */}
      <section className="no-bottom">
        <Reviews/>
      </section>

      {/* section */}
      <Parallax className="" bgImage={image1} strength={300}>  
        <div className="de-gradient-edge-top"></div>
        <div className="de-gradient-edge-bottom"></div>
        <section className="no-bg">
          <Collection/>
        </section>
      </Parallax>

      {/* section */}
      <section className="no-top no-bottom">
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
