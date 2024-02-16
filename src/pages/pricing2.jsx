import React, {useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Parallax } from "react-parallax";
import Navbar from '../layout/Navbar';
import Preloader from '../layout/preloader';
import Pricelist from '../section-pages/pricelist-static';
import Footer from '../section-pages/footer';
import ScrollToTopBtn from '../layout/ScrollToTop';
import { createGlobalStyle } from 'styled-components';

const image2 ="./img/background/galactic-oddsey.webp";

const GlobalStyles = createGlobalStyle`
  .dark-scheme .de_pricing-table.type-2{
    background: rgba(30, 31, 34, .75);
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

      <Parallax className="bgcolor" bgImage={image2} strength={5}>  
      <div className="de-gradient-edge-top"></div>
      <div className="de-gradient-edge-bottom"></div>
      <section className="no-bg">
        <div className="container z-9">
          <div className="row align-items-center">
              <div className="col-lg-12">
                  <div className="subtitle wow fadeInUp mb-3">Server Hosting</div>
              </div>
              <div className="col-lg-6">
                  <h2 className="wow fadeInUp" data-wow-delay=".2s">Galactic Odyssey</h2>
                  <div className="spacer-20"></div>
              </div>
          </div>
        </div>
        <Pricelist/>
      </section>
      </Parallax>

      {/* footer */}
      <Footer/>


    </div>
    <ScrollToTopBtn />
    </>
  )
}
