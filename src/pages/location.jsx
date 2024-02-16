import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Parallax } from "react-parallax";
import Navbar from '../layout/Navbar';
import Preloader from '../layout/preloader';
import Location from '../section-pages/Location';
import Section2 from '../section-pages/section-2';
import Footer from '../section-pages/footer';
import ScrollToTopBtn from '../layout/ScrollToTop';
import { createGlobalStyle } from 'styled-components';

const image1 ="./img/background/bg-grid.webp";

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

      {/* section */}
      <Parallax className="" bgImage={image1} strength={5}>  
        <div className="de-gradient-edge-top"></div>
        <div className="de-gradient-edge-bottom"></div>
        <section className="no-bg">
          <Location/>
        </section>
      </Parallax>

      {/* section */}
      <section className="">
        <Section2/>
      </section>

      {/* footer */}
      <Footer/>


    </div>
    <ScrollToTopBtn />
    </>
  )
}
