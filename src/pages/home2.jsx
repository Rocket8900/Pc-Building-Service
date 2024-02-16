import React, { useEffect } from 'react';
import { Parallax } from "react-parallax";
import { Helmet } from 'react-helmet-async';
import Navbar from '../layout/Navbar';
import Preloader from '../layout/preloader';
import Homestatic from '../section-pages/homestatic';
import Marquee from '../section-pages/marquee';
import Pricelist from '../section-pages/pricelist';
import Section1 from '../section-pages/section-1';
import Reviews from '../section-pages/CustomerReviews';
import Collection from '../section-pages/Collection';
import Help from '../section-pages/help';
import Payment from '../section-pages/Payment';
import Footer from '../section-pages/footer';
import ScrollToTopBtn from '../layout/ScrollToTop';
import { createGlobalStyle } from 'styled-components';

const image2 ="./img/background/4.webp";
const image3 ="./img/background/5.webp";

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
      <Parallax className="bgcolor" bgImage={image2} strength={300}>  
        <section id="content" className="pt60 no-bottom">
          <Homestatic />
        </section>
       </Parallax>
      
      {/* section */}
      <section className="no-bottom">
        <Marquee/>
      </section>

      {/* section */}
      <Parallax className="" bgImage={image3} strength={150}> 
      <section className="no-bg pt60 no-bottom">
        <Pricelist/>
      </section>
      </Parallax>

      {/* section */}
      <section className="no-bottom">
        <Collection/>
      </section>

      {/* section */}
      <section className="no-bottom">
        <Section1/>
      </section>

      {/* section 3 */}
      <Parallax className="" bgImage={image3} strength={300}> 
      <div className="de-gradient-edge-top"></div>
      <div className="de-gradient-edge-bottom"></div>
      <section className="no-bg no-bottom">
        <Reviews/>
      </section>
      </Parallax>

      {/* section */}
      <section className="no-bottom">
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
