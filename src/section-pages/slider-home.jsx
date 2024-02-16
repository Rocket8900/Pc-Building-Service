import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from "react-router-dom";


const Slider = () => {
  return (
    <Swiper className="mainslider"
      // install Swiper modules
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      navigation
      autoplay={{ delay: 4000 }} 
      pagination={{
        clickable: false,
        renderBullet: function (index, className) {
          return `<span class="${className}">${index + 1} <span className="swiper-pagination-current">/ 4</span></span>`;
        },
      }}
      >
      <SwiperSlide>
        <div className="swiper-inner" style={{
                                              backgroundImage: `url("./img/slider/1.webp")`,
                                              width: '100%',
                                              height: '100%',
                                            }}>
            <div className="sw-caption">
                <div className="container">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-8 mb-sm-30">
                            <div className="subtitle blink mb-4">Servers Are Available</div>
                            <h1 className="slider-title text-uppercase mb-1">Galactic Odyssey</h1>
                        </div>
                        <div className="col-lg-6">
                            <p className="slider-text">Aute esse non magna elit dolore dolore dolor sit est. Ea occaecat ea duis laborum reprehenderit id cillum tempor cupidatat qui nisi proident nostrud dolore.</p>
                            <div className="sw-price wp">
                                <div className="d-starting">
                                    Starting at
                                </div>
                                <div className="d-price">
                                    <span className="d-cur">$</span>
                                    <span className="d-val">9.99</span>
                                    <span className="d-period">/monthly</span>
                                </div>
                            </div>
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
                                              backgroundImage: `url("./img/slider/2.webp")`,
                                              width: '100%',
                                              height: '100%',
                                            }}>
            <div className="sw-caption">
                <div className="container">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-8 mb-sm-30">
                            <div className="subtitle blink mb-4">Servers Are Available</div>
                            <h1 className="slider-title text-uppercase mb-1">Mystic Racing</h1>
                        </div>
                        <div className="col-lg-6">
                            <p className="slider-text">Aute esse non magna elit dolore dolore dolor sit est. Ea occaecat ea duis laborum reprehenderit id cillum tempor cupidatat qui nisi proident nostrud dolore.</p>
                            <div className="sw-price ">
                                <div className="d-starting">
                                    Starting at
                                </div>
                                <div className="d-price">
                                    <span className="d-cur">$</span>
                                    <span className="d-val">12.99</span>
                                    <span className="d-period">/monthly</span>
                                </div>
                            </div>
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
                                              backgroundImage: `url("./img/slider/3.webp")`,
                                              width: '100%',
                                              height: '100%',
                                            }}>
            <div className="sw-caption">
                <div className="container">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-8 mb-sm-30">
                            <div className="subtitle blink mb-4">Servers Are Available</div>
                            <h1 className="slider-title text-uppercase mb-1">Silent Wrath</h1>
                        </div>
                        <div className="col-lg-6">
                            <p className="slider-text">Aute esse non magna elit dolore dolore dolor sit est. Ea occaecat ea duis laborum reprehenderit id cillum tempor cupidatat qui nisi proident nostrud dolore.</p>
                            <div className="sw-price ">
                                <div className="d-starting">
                                    Starting at
                                </div>
                                <div className="d-price">
                                    <span className="d-cur">$</span>
                                    <span className="d-val">14.99</span>
                                    <span className="d-period">/monthly</span>
                                </div>
                            </div>
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
                                              backgroundImage: `url("./img/slider/4.webp")`,
                                              width: '100%',
                                              height: '100%',
                                            }}>
            <div className="sw-caption">
                <div className="container">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-8 mb-sm-30">
                            <div className="subtitle blink mb-4">Servers Are Available</div>
                            <h1 className="slider-title text-uppercase mb-1">Funk Dungeon</h1>
                        </div>
                        <div className="col-lg-6">
                            <p className="slider-text">Aute esse non magna elit dolore dolore dolor sit est. Ea occaecat ea duis laborum reprehenderit id cillum tempor cupidatat qui nisi proident nostrud dolore.</p>
                            <div className="sw-price ">
                                <div className="d-starting">
                                    Starting at
                                </div>
                                <div className="d-price">
                                    <span className="d-cur">$</span>
                                    <span className="d-val">15.99</span>
                                    <span className="d-period">/monthly</span>
                                </div>
                            </div>
                            <div className="spacer-10"></div>
                            <Link className="btn-main mb10" to="/">Order Your Game Server Now</Link>
                        </div>
                    </div>
                </div>
            </div>                                
            <div className="sw-overlay"></div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
export default Slider;