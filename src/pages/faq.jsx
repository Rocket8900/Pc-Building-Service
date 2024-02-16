import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Parallax } from "react-parallax";
import Navbar from '../layout/Navbar';
import Preloader from '../layout/preloader';
import Help from '../section-pages/help-no-title';
import Footer from '../section-pages/footer';
import ScrollToTopBtn from '../layout/ScrollToTop';
import { createGlobalStyle } from 'styled-components';

const image1 ="../../img/background/subheader-faq.webp";

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
        <section className="no-bg">
          <div className="container z-9">
              <div className="row">
                  <div className="col-lg-12">
                      <div className="subtitle wow fadeInUp mb-3">Do you have</div>
                  </div>
                  <div className="col-lg-6">
                      <h2>Any questions?</h2>
                  </div>                 
              </div>
          </div>
        </section>
      </Parallax>

      {/* section */}
      <section>
        <Help/>
      </section>

      {/* footer */}
      <Footer/>


    </div>
    <ScrollToTopBtn />
    </>
  )
}
