import React, { useEffect } from 'react';
import { Parallax } from "react-parallax";
import { Helmet } from 'react-helmet-async';
import Navbar from '../layout/Navbar';
import Preloader from '../layout/preloader';
import SwiperComponent from '../section-pages/slider';
import Sectioncol from '../section-pages/section-3col';
import Location from '../section-pages/Location';
import Section1 from '../section-pages/section-1';
import Collection from '../section-pages/Collection';
import Help from '../section-pages/help';
import Download from '../section-pages/Download';
import Payment from '../section-pages/Payment';
import Footer from '../section-pages/footer';
import ScrollToTopBtn from '../layout/ScrollToTop';
import { createGlobalStyle } from 'styled-components';

const image1 ="../../img/background/3.webp";

const GlobalStyles = createGlobalStyle`
  .navbar-brand .imginit{
      display: block ;
    }
    .navbar-brand .imgsaly{
      display: none !important;
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
      <section className="no-padding">
        <SwiperComponent />
      </section>

      {/* section 1 */}
      <section className="no-bottom">
        <Sectioncol/>
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
      <section className="no-bottom">
        <Location/>
      </section>

      {/* section */}
      <section className="no-bottom">
        <Section1/>
      </section>

      {/* section */}
      <section className="">
        <Download/>
      </section>

      {/* section */}
      <section className="no-top no-bottom">
        <Help/>
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
