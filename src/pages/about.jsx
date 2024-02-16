import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Parallax } from "react-parallax";
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Preloader from '../layout/preloader';
import Reviews from '../section-pages/CustomerReviews';
import Footer from '../section-pages/footer';
import ScrollToTopBtn from '../layout/ScrollToTop';
import { createGlobalStyle } from 'styled-components';

const image1 ="./img/background/subheader-about.webp";

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
                      <div className="subtitle  mb-3">About us</div>
                  </div>
                  <div className="col-lg-6">
                      <h2 className=" mb20" data-wow-delay=".2s">This is our story</h2>
                  </div>                 
              </div>
          </div>
        </section>
      </Parallax>

      {/* section */}
      <section>
        <div className="container">
              <div className="row align-items-center gh-5">
                  <div className="col-lg-6 position-relative">
                      <div className="images-deco-1">
                          <img src="./img/misc/building.webp" className="d-img-1" alt=""/>
                          <img src="./img/misc/girl-ai.webp" className="d-img-2" alt=""/>
                          <div className="d-img-3 bg-color"></div>
                      </div>
                  </div>
                  <div className="col-lg-6">
                      <div className="subtitle mb20">We are Playhost</div>
                      <h2 >The beginning</h2>
                      <p >Lorem ipsum ea ut magna nisi amet reprehenderit eu 
                      adipisicing nisi incididunt est sint fugiat deserunt tempor ea culpa nostrud 
                      commodo deserunt et do ullamco non tempor veniam id culpa mollit veniam ut
                      non adipisicing ad commodo laborum esse do sunt in cillum irure incididunt 
                      officia quis ut.
                      </p>
                      <div className="year-card ">
                          <h1><span className="id-color">25</span></h1>
                          <div className="atr-desc">Years<br/>Experience<br/>Hosting</div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* section */}
      <section className="no-top">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <div className="row gx-5">
                        <div className="col-lg-6 col-md-6">
                            <h4>Our Vision</h4>
                            <p>Adipisicing pariatur dolor pariatur officia aliqua ex irure aliqua ut exercitation nulla exercitation esse duis do commodo exercitation sed exercitation aliquip fugiat. Dolor ad amet sed aliqua ad nisi anim fugiat dolor labore ex non amet id mollit amet id magna elit fugiat voluptate aliquip in est quis aliquip aliqua eu. Lorem ipsum irure sed nisi id aute exercitation fugiat.</p>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <h4>Our Mission</h4>
                            <p>Adipisicing pariatur dolor pariatur officia aliqua ex irure aliqua ut exercitation nulla exercitation esse duis do commodo exercitation sed exercitation aliquip fugiat. Ut excepteur deserunt labore exercitation commodo exercitation minim aliquip in aliqua deserunt nulla aliquip officia ut eiusmod irure ullamco sunt sunt velit dolor ex. Enim eu proident in non officia culpa.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* section */}
      <section className="no-top">
        <div className="container">
          <div className="row">
              <div className="col-lg-3">
                  <div className="subtitle mb20">Our solid team</div>
                  <h2 className="mb20 wow fadeInUp">Behind the scene</h2>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-6 mb-sm-30">
                  <div className="f-profile text-center">
                      <div className="fp-wrap f-invert">
                          <div className="fpw-overlay">
                              <div className="fpwo-wrap">
                                  <div className="fpwow-icons">
                                      <Link to="/"><i className="fa-brands fa-facebook fa-lg"></i></Link>
                                      <Link to="/"><i className="fa-brands fa-twitter fa-lg"></i></Link>
                                      <Link to="/"><i className="fa-brands fa-linkedin fa-lg"></i></Link>
                                      <Link to="/"><i className="fa-brands fa-instagram fa-lg"></i></Link>
                                      <Link to="/"><i className="fa-brands fa-tiktok fa-lg"></i></Link>
                                  </div>
                              </div>
                          </div>                                  
                          <div className="fpw-overlay-btm"></div>
                          <img src="./img/team/1.webp" className="fp-image img-fluid" alt=""/>
                      </div>

                      <h4>Robyn Peel</h4>
                      CEO Founder
                  </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-6 mb-sm-30">
                  <div className="f-profile text-center">
                      <div className="fp-wrap f-invert">
                          <div className="fpw-overlay">
                              <div className="fpwo-wrap">
                                  <div className="fpwow-icons">
                                      <Link to="/"><i className="fa-brands fa-facebook fa-lg"></i></Link>
                                      <Link to="/"><i className="fa-brands fa-twitter fa-lg"></i></Link>
                                      <Link to="/"><i className="fa-brands fa-linkedin fa-lg"></i></Link>
                                      <Link to="/"><i className="fa-brands fa-instagram fa-lg"></i></Link>
                                      <Link to="/"><i className="fa-brands fa-tiktok fa-lg"></i></Link>
                                  </div>
                              </div>
                          </div>                                  
                          <div className="fpw-overlay-btm"></div>
                          <img src="./img/team/2.webp" className="fp-image img-fluid" alt=""/>
                      </div>

                      <h4>Anna Shepard</h4>
                      Director
                  </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-6 mb-sm-30">
                  <div className="f-profile text-center">
                      <div className="fp-wrap f-invert">
                          <div className="fpw-overlay">
                              <div className="fpwo-wrap">
                                  <div className="fpwow-icons">
                                      <Link to="/"><i className="fa-brands fa-facebook fa-lg"></i></Link>
                                      <Link to="/"><i className="fa-brands fa-twitter fa-lg"></i></Link>
                                      <Link to="/"><i className="fa-brands fa-linkedin fa-lg"></i></Link>
                                      <Link to="/"><i className="fa-brands fa-instagram fa-lg"></i></Link>
                                      <Link to="/"><i className="fa-brands fa-tiktok fa-lg"></i></Link>
                                  </div>
                              </div>
                          </div>                                  
                          <div className="fpw-overlay-btm"></div>
                          <img src="./img/team/3.webp" className="fp-image img-fluid" alt=""/>
                      </div>

                      <h4>Fynley Wilkinson</h4>
                      Developer
                  </div>
              </div>

          </div>
        </div>
      </section>

      {/* section */}
      <section className="no-top">
       <Reviews/>
      </section>

      {/* section */}
      <section className="no-top">
       <div className="container">
            <div className="row text-center">
                <div className="col-lg-3 col-sm-6 mb-sm-30 position-relative">
                    <div className="de_count text-light wow fadeInUp">
                        <h3 className="timer id-color" >15425</h3>
                        <h4 className="text-uppercase">Happy<br/>Gamers</h4>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 mb-sm-30 position-relative">
                    <div className="de_count text-light wow fadeInUp">
                        <h3 className="timer text-line">8745</h3>
                        <h4 className="text-uppercase">Servers<br/>Ordered</h4>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 mb-sm-30 position-relative">
                    <div className="de_count text-light wow fadeInUp">
                        <h3 className="timer id-color">235</h3>
                        <h4 className="text-uppercase">Awards<br/>Winning</h4>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 mb-sm-30 position-relative">
                    <div className="de_count text-light wow fadeInUp">
                        <h3 className="timer text-line">15</h3>
                        <h4 className="text-uppercase">Years<br/>Experience</h4>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* footer */}
      <Footer/>


    </div>
    <ScrollToTopBtn />
    </>
  )
}
