import React, {useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../layout/Navbar';
import Preloader from '../layout/preloader';
import Homestatic from '../section-pages/homestatic-video';
import Section1 from '../section-pages/section-1-center';
import Location from '../section-pages/Location-center';
import Pricelist from '../section-pages/pricelist-center';
import Collection from '../section-pages/Collection-center';
import Help from '../section-pages/help-center';
import Blog from '../section-pages/Blog';
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

      {/* home static */}
      <section className="no-padding">
        <Homestatic/>
      </section>

      {/* section */}
      <section className="no-bottom tex-center">
        <Section1/>
      </section>

      {/* section */}
      <section className="no-bottom">
        <Pricelist/>
      </section>

      {/* section */}
      <section className="no-bottom">
        <Collection/>
      </section>

      {/* section */}
      <section className="no-bottom">
        <Location/>
      </section>

      {/* section */}
      <section className="no-bottom">
        <Help/>
      </section>

      {/* section */}
      <section className="no-bottom">
        <Blog/>
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
