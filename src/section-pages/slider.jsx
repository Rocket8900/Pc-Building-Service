import React from 'react';
import { Navigation, Pagination, Autoplay, Thumbs, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from "react-router-dom";


const YourComponent = () => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  return (
    <div className="doubleslider">
    <Swiper
      className="mainslider"
      thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
      modules={[Navigation, Pagination, Autoplay, Thumbs]}
      loop={true}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
    >
      <SwiperSlide>
        <div className="swiper-inner" style={{
                                              backgroundImage: `url("./img/slider/5.webp")`,
                                              width: '100%',
                                              height: '100%',
                                            }}>
            <div className="sw-caption">
                <div className="container">
                    <div className="row gx-5 align-items-center text-center">
                        <div className="col-lg-8 mb-sm-30 mx-auto">
                            <div className="subtitle blink mb-4">Servers Are Available</div>
                            <h1 className="slider-title text-uppercase mb-1">Cyber Nexus</h1>
                        </div>
                        <div className="col-lg-6 mx-auto">
                            <p className="slider-text">Aute esse non magna elit dolore dolore dolor sit est. Ea occaecat ea duis laborum reprehenderit id cillum tempor cupidatat qui nisi proident nostrud dolore.</p>
                            <div className="spacer-10"></div>
                            <Link className="btn-main mb10" to="/">Order Your Game Server Now</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sw-overlay"></div>
        </div> 
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-inner" style={{
                                              backgroundImage: `url("./img/slider/6.webp")`,
                                              width: '100%',
                                              height: '100%',
                                            }}>
            <div className="sw-caption">
                <div className="container">
                    <div className="row gx-5 align-items-center text-center">
                        <div className="col-lg-8 mb-sm-30 mx-auto">
                            <div className="subtitle blink mb-4">Servers Are Available</div>
                            <h1 className="slider-title text-uppercase mb-1">Ancient Realms</h1>
                        </div>
                        <div className="col-lg-6 mx-auto">
                            <p className="slider-text">Aute esse non magna elit dolore dolore dolor sit est. Ea occaecat ea duis laborum reprehenderit id cillum tempor cupidatat qui nisi proident nostrud dolore.</p>
                            <div className="spacer-10"></div>
                            <Link className="btn-main mb10" to="/">Order Your Game Server Now</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sw-overlay"></div>
        </div>         
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-inner" style={{
                                              backgroundImage: `url("./img/slider/7.webp")`,
                                              width: '100%',
                                              height: '100%',
                                            }}>
            <div className="sw-caption">
                <div className="container">
                    <div className="row gx-5 align-items-center text-center">
                        <div className="col-lg-8 mb-sm-30 mx-auto">
                            <div className="subtitle blink mb-4">Servers Are Available</div>
                            <h1 className="slider-title text-uppercase mb-1">Thunder and City</h1>
                        </div>
                        <div className="col-lg-6 mx-auto">
                            <p className="slider-text">Aute esse non magna elit dolore dolore dolor sit est. Ea occaecat ea duis laborum reprehenderit id cillum tempor cupidatat qui nisi proident nostrud dolore.</p>
                            <div className="spacer-10"></div>
                            <Link className="btn-main mb10" to="/">Order Your Game Server Now</Link>
                        </div>
                    </div>
                </div>
            </div>                                
            <div className="sw-overlay"></div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-inner" style={{
                                              backgroundImage: `url("./img/slider/8.webp")`,
                                              width: '100%',
                                              height: '100%',
                                            }}>
            <div className="sw-caption">
                <div className="container">
                    <div className="row gx-5 align-items-center text-center">
                        <div className="col-lg-8 mb-sm-30 mx-auto">
                            <div className="subtitle blink mb-4">Servers Are Available</div>
                            <h1 className="slider-title text-uppercase mb-1">Raceway Revolution</h1>
                        </div>
                        <div className="col-lg-6 mx-auto">
                            <p className="slider-text">Aute esse non magna elit dolore dolore dolor sit est. Ea occaecat ea duis laborum reprehenderit id cillum tempor cupidatat qui nisi proident nostrud dolore.</p>
                            <div className="spacer-10"></div>
                            <Link className="btn-main mb10" to="/">Order Your Game Server Now</Link>
                        </div>
                    </div>
                </div>
            </div>                                
            <div className="sw-overlay"></div>
        </div>
      </SwiperSlide>
      {/* Add more slides here */}
    </Swiper>
    <Swiper
        direction={'vertical'}
        onSwiper={setThumbsSwiper}
        
        freeMode={true}
        spaceBetween={10}
        slidesPerView={3}
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumb-slider"
      >
        <SwiperSlide className="swiper-slide" style={{
                                              backgroundImage: `url("./img/slider/5.webp")`,
                                            }}>
          <div className="sw-caption-thumb">
              <span className="d-tag">
                  15% OFF
              </span>
              <h3>Cyber Nexus</h3>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide" style={{
                                              backgroundImage: `url("./img/slider/6.webp")`,
                                            }}>
          <div className="sw-caption-thumb">
              <span className="d-tag">
                  15% OFF
              </span>
              <h3>Ancient Realms</h3>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide" style={{
                                              backgroundImage: `url("./img/slider/7.webp")`,
                                            }}>
          <div className="sw-caption-thumb">
              <span className="d-tag">
                  15% OFF
              </span>
              <h3>Thunder and City</h3>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide" style={{
                                              backgroundImage: `url("./img/slider/8.webp")`,
                                            }}>
          <div className="sw-caption-thumb">
              <span className="d-tag">
                  15% OFF
              </span>
              <h3>Raceway Revolution</h3>
          </div>
        </SwiperSlide>
        {/* Add more thumbnail slides here */}
      </Swiper>
    </div>
  );
};

export default YourComponent;
