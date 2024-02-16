import React, {useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Parallax } from "react-parallax";
import Navbar from '../layout/Navbar';
import Preloader from '../layout/preloader';
import Pricelist from '../section-pages/pricelist-horizontal';
import Section1 from '../section-pages/section-1';
import Footer from '../section-pages/footer';
import ScrollToTopBtn from '../layout/ScrollToTop';
import { createGlobalStyle } from 'styled-components';

const image2 ="./img/background/subheader-game.webp";

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

      <Parallax className="bgcolor" bgImage={image2} strength={300}>  
      <div className="de-gradient-edge-bottom"></div>
      <section className="no-bg">
        <div className="container z-1000">
              <div className="row gx-5 align-items-center">
                  <div className="col-lg-2 d-lg-block d-none">
                      <img src="./img/covers/4.webp" className="img-fluid" alt=""/>
                  </div>
                  <div className="col-lg-6">
                      <div className="subtitle mb-3">Server hosting</div>
                      <h2 className="mb-0">Funk Dungeon</h2>
                      <div className="de-rating-ext">
                          <span className="d-stars">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star-half"></i>
                          </span>
                          <span className="d-val">4.75</span>
                          based on <strong>4086</strong> reviews.
                      </div>
                  </div>      
              </div>
          </div>
      </section>
      </Parallax>

      {/* section */}
      <section className="no-top">
        <Pricelist/>
      </section>

      {/* section */}
      <section className="no-top">
        <Section1/>
      </section>

      {/* footer */}
      <Footer/>


    </div>
    <ScrollToTopBtn />
    </>
  )
}
