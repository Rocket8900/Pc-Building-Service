import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const image1 ="../img/slider/4.webp";
const image2 ="../img/slider/6.webp";
const image3 ="../img/slider/1.webp";
const image4 ="../img/slider/7.webp";

const imageflags1 ="../img/flags/australia.png";
const imageflags2 ="../img/flags/brazil.png";
const imageflags3 ="../img/flags/canada.png";
const imageflags4 ="../img/flags/finland.png";
const imageflags5 ="../img/flags/france.png";
const imageflags6 ="../img/flags/germany.png";
const imageflags7 ="../img/flags/indonesia.png";
const imageflags8 ="../img/flags/netherlands.png";
const imageflags9 ="../img/flags/singapore.png";
const imageflags10 ="../img/flags/thailand.png";
const imageflags11 ="../img/flags/united-kingdom.png";
const imageflags12 ="../img/flags/usa.png";


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
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      pagination={{
        clickable: false,
        renderBullet: function (index, className) {
          return `<span class="${className}">${index + 1} <span className="swiper-pagination-current">/ 4</span></span>`;
        },
      }}
      >
      <SwiperSlide>
        <div className="swiper-inner" style={{
                                              backgroundImage: `url(${image1})`,
                                              width: '100%',
                                              height: '100%',
                                            }}>
            <div className="sw-caption">
                <div className="container">
                                        <div className="row align-items-center">
                                            <div className="col-lg-8 offset-lg-2">
                                                <div className="p-5 rounded-20 bg-gradient-dark">
                                                    <div className="row">
                                                        <div className="col-lg-8">                                    
                                                            <div className="subtitle blink mb-4">Servers Are Available</div>
                                                            <h1 className="slider-title text-uppercase mb-1">Funk Dungeon</h1>
                                                            <p className="slider-text">Aute esse non magna elit dolore dolore dolor sit est. Ea occaecat ea duis laborum reprehenderit id cillum tempor cupidatat qui nisi proident nostrud dolore.</p>
                                                        </div>

                                                            <div className="col-lg-4">
                                                                <div className="sw-price wow fadeInUp">
                                                                <div className="d-starting">
                                                                    Starting at
                                                                </div>
                                                                <div className="d-price">
                                                                    <span className="d-cur">$</span>
                                                                    <span className="d-val">15.99</span>
                                                                    <span className="d-period">/monthly</span>
                                                                </div>

                                                                <div className="spacer-10"></div>
                                                                <a className="btn-main" href="pricing-table-one.html"><span>Order Game Server Now</span></a>

                                                                <div className="spacer-single"></div>

                                                                <div className="d-starting mb-2">
                                                                    Server Locations
                                                                </div>

                                                                <div className="de-flag-small">
                                                                    <img src={imageflags1} alt=""/>
                                                                    <img src={imageflags2} alt=""/>
                                                                    <img src={imageflags3} alt=""/>
                                                                    <img src={imageflags4} alt=""/>
                                                                    <img src={imageflags5} alt=""/>
                                                                    <img src={imageflags6} alt=""/>
                                                                    <img src={imageflags7} alt=""/>
                                                                    <img src={imageflags8} alt=""/>
                                                                    <img src={imageflags9} alt=""/>
                                                                    <img src={imageflags10} alt=""/>
                                                                    <img src={imageflags11} alt=""/>
                                                                    <img src={imageflags12} alt=""/>

                                                                </div>
                                                            </div>

                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
            </div>
            <div className="sw-overlay"></div>
        </div> 
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-inner" style={{
                                              backgroundImage: `url(${image2})`,
                                              width: '100%',
                                              height: '100%',
                                            }}>
            <div className="sw-caption">
                <div className="container">
                                        <div className="row align-items-center">
                                            <div className="col-lg-8 offset-lg-2">
                                                <div className="p-5 rounded-20 bg-gradient-dark">
                                                    <div className="row">
                                                        <div className="col-lg-8">                                    
                                                            <div className="subtitle blink mb-4">Servers Are Available</div>
                                                            <h1 className="slider-title text-uppercase mb-1">Ancient Realms</h1>
                                                            <p className="slider-text">Aute esse non magna elit dolore dolore dolor sit est. Ea occaecat ea duis laborum reprehenderit id cillum tempor cupidatat qui nisi proident nostrud dolore.</p>
                                                        </div>

                                                            <div className="col-lg-4">
                                                                <div className="sw-price wow fadeInUp">
                                                                <div className="d-starting">
                                                                    Starting at
                                                                </div>
                                                                <div className="d-price">
                                                                    <span className="d-cur">$</span>
                                                                    <span className="d-val">12.99</span>
                                                                    <span className="d-period">/monthly</span>
                                                                </div>

                                                                <div className="spacer-10"></div>
                                                                <a className="btn-main" href="pricing-table-one.html"><span>Order Game Server Now</span></a>

                                                                <div className="spacer-single"></div>

                                                                <div className="d-starting mb-2">
                                                                    Server Locations
                                                                </div>

                                                                <div className="de-flag-small">
                                                                    <img src={imageflags1} alt=""/>
                                                                    <img src={imageflags2} alt=""/>
                                                                    <img src={imageflags3} alt=""/>
                                                                    <img src={imageflags4} alt=""/>
                                                                    <img src={imageflags5} alt=""/>
                                                                    <img src={imageflags6} alt=""/>
                                                                    <img src={imageflags7} alt=""/>
                                                                    <img src={imageflags8} alt=""/>
                                                                    <img src={imageflags9} alt=""/>
                                                                    <img src={imageflags10} alt=""/>
                                                                    <img src={imageflags11} alt=""/>
                                                                    <img src={imageflags12} alt=""/>

                                                                </div>
                                                            </div>

                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
            </div>
            <div className="sw-overlay"></div>
        </div>         
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-inner" style={{
                                              backgroundImage: `url(${image3})`,
                                              width: '100%',
                                              height: '100%',
                                            }}>
            <div className="sw-caption">
                <div className="container">
                                        <div className="row align-items-center">
                                            <div className="col-lg-8 offset-lg-2">
                                                <div className="p-5 rounded-20 bg-gradient-dark">
                                                    <div className="row">
                                                        <div className="col-lg-8">                                    
                                                            <div className="subtitle blink mb-4">Servers Are Available</div>
                                                            <h1 className="slider-title text-uppercase mb-1">Galactic Odyssey</h1>
                                                            <p className="slider-text">Aute esse non magna elit dolore dolore dolor sit est. Ea occaecat ea duis laborum reprehenderit id cillum tempor cupidatat qui nisi proident nostrud dolore.</p>
                                                        </div>

                                                            <div className="col-lg-4">
                                                                <div className="sw-price wow fadeInUp">
                                                                <div className="d-starting">
                                                                    Starting at
                                                                </div>
                                                                <div className="d-price">
                                                                    <span className="d-cur">$</span>
                                                                    <span className="d-val">9.99</span>
                                                                    <span className="d-period">/monthly</span>
                                                                </div>

                                                                <div className="spacer-10"></div>
                                                                <a className="btn-main" href="pricing-table-one.html"><span>Order Game Server Now</span></a>

                                                                <div className="spacer-single"></div>

                                                                <div className="d-starting mb-2">
                                                                    Server Locations
                                                                </div>

                                                                <div className="de-flag-small">
                                                                    <img src={imageflags1} alt=""/>
                                                                    <img src={imageflags2} alt=""/>
                                                                    <img src={imageflags3} alt=""/>
                                                                    <img src={imageflags4} alt=""/>
                                                                    <img src={imageflags5} alt=""/>
                                                                    <img src={imageflags6} alt=""/>
                                                                    <img src={imageflags7} alt=""/>
                                                                    <img src={imageflags8} alt=""/>
                                                                    <img src={imageflags9} alt=""/>
                                                                    <img src={imageflags10} alt=""/>
                                                                    <img src={imageflags11} alt=""/>
                                                                    <img src={imageflags12} alt=""/>

                                                                </div>
                                                            </div>

                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
            </div>                                
            <div className="sw-overlay"></div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-inner" style={{
                                              backgroundImage: `url(${image4})`,
                                              width: '100%',
                                              height: '100%',
                                            }}>
            <div className="sw-caption">
                <div className="container">
                                        <div className="row align-items-center">
                                            <div className="col-lg-8 offset-lg-2">
                                                <div className="p-5 rounded-20 bg-gradient-dark">
                                                    <div className="row">
                                                        <div className="col-lg-8">                                    
                                                            <div className="subtitle blink mb-4">Servers Are Available</div>
                                                            <h1 className="slider-title text-uppercase mb-1">Thunder and City</h1>
                                                            <p className="slider-text">Aute esse non magna elit dolore dolore dolor sit est. Ea occaecat ea duis laborum reprehenderit id cillum tempor cupidatat qui nisi proident nostrud dolore.</p>
                                                        </div>

                                                            <div className="col-lg-4">
                                                                <div className="sw-price wow fadeInUp">
                                                                <div className="d-starting">
                                                                    Starting at
                                                                </div>
                                                                <div className="d-price">
                                                                    <span className="d-cur">$</span>
                                                                    <span className="d-val">12.99</span>
                                                                    <span className="d-period">/monthly</span>
                                                                </div>

                                                                <div className="spacer-10"></div>
                                                                <a className="btn-main" href="pricing-table-one.html"><span>Order Game Server Now</span></a>

                                                                <div className="spacer-single"></div>

                                                                <div className="d-starting mb-2">
                                                                    Server Locations
                                                                </div>

                                                                <div className="de-flag-small">
                                                                    <img src={imageflags1} alt=""/>
                                                                    <img src={imageflags2} alt=""/>
                                                                    <img src={imageflags3} alt=""/>
                                                                    <img src={imageflags4} alt=""/>
                                                                    <img src={imageflags5} alt=""/>
                                                                    <img src={imageflags6} alt=""/>
                                                                    <img src={imageflags7} alt=""/>
                                                                    <img src={imageflags8} alt=""/>
                                                                    <img src={imageflags9} alt=""/>
                                                                    <img src={imageflags10} alt=""/>
                                                                    <img src={imageflags11} alt=""/>
                                                                    <img src={imageflags12} alt=""/>

                                                                </div>
                                                            </div>

                                                            
                                                        </div>
                                                    </div>
                                                </div>
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