import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../layout/Navbar';
import Preloader from '../layout/preloader';
import SwiperComponent from '../section-pages/slider-home-1';
import Popular from '../section-pages/popular';
import Location from '../section-pages/Location-nomarq';
import Section2 from '../section-pages/section-2-1';
import Reviews from '../section-pages/CustomerReviews';
import Help from '../section-pages/help';
import Download from '../section-pages/Download-1';
import Payment from '../section-pages/Payment';
import Footer from '../section-pages/footer';
import ScrollToTopBtn from '../layout/ScrollToTop';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  
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
      <section className="no-padding">
        <SwiperComponent />
      </section>

      {/* section */}
      <section className="no-bottom tex-center">
        <Popular/>
      </section>

      {/* section */}
      <section className="no-bottom">
        <Location/>
      </section>

      {/* section 2 */}
      <section className="no-bottom">
        <Section2/>
      </section>

      {/* section 3 */}
      <section className="no-bottom">
        <Reviews/>
      </section>

      {/* section */}
      <section className="no-bottom">
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
