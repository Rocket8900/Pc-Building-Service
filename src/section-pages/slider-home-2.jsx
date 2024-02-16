import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const image1 ="../img/slider/creative-1.webp";
const image2 ="../img/slider/creative-2.webp";
const image3 ="../img/slider/creative-3.webp";

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
          return `<span class="${className}">${index + 1} <span className="swiper-pagination-current">/ 3</span></span>`;
        },
      }}
      >
      <SwiperSlide>
        <div className="swiper-inner">
            <div className="sw-caption">
                <div className="container">
                    <div className="row gx-4 align-items-center">
                        <div className="spacer-single"></div>
                        <div className="col-lg-5 mb-sm-30">
                            <div className="subtitle blink mb-4">Servers Are Available</div>
                            <h1 className="slider-title s2 text-uppercase mb-1">Galactic Odyssey Server Hosting</h1>
                            <p className="slider-text">Your own game server is only 5 minutes away!</p>
                            <div className="spacer-10"></div>
                            <a className="btn-main mb10" href="pricing-table-one.html"><span>Order Your Game Server Now</span></a>
                        </div>

                        <div className="col-lg-7">
                            <img src={image1} className="img-fluid sw-image" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sw-overlay"></div>
        </div> 
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-inner">
            <div className="sw-caption">
                <div className="container">
                    <div className="row gx-4 align-items-center">
                        <div className="spacer-single"></div>
                        <div className="col-lg-5 mb-sm-30">
                            <div className="subtitle blink mb-4">Servers Are Available</div>
                            <h1 className="slider-title s2 text-uppercase mb-1">Warfare Legends Server Hosting</h1>
                            <p className="slider-text">Your own game server is only 5 minutes away!</p>
                            <div className="spacer-10"></div>
                            <a className="btn-main mb10" href="pricing-table-one.html"><span>Order Your Game Server Now</span></a>
                        </div>

                        <div className="col-lg-7">
                            <img src={image2} className="img-fluid sw-image" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sw-overlay"></div>
        </div>         
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-inner">
            <div className="sw-caption">
                <div className="container">
                      <div className="row gx-4 align-items-center">
                          <div className="spacer-single"></div>
                          <div className="col-lg-5 mb-sm-30">
                              <div className="subtitle blink mb-4">Servers Are Available</div>
                              <h1 className="slider-title s2 text-uppercase mb-1">Cyber Nexus Server Hosting</h1>
                              <p className="slider-text">Your own game server is only 5 minutes away!</p>
                              <div className="spacer-10"></div>
                              <a className="btn-main mb10" href="pricing-table-one.html"><span>Order Your Game Server Now</span></a>
                          </div>

                          <div className="col-lg-7">
                              <img src={image3} className="img-fluid sw-image" alt=""/>
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