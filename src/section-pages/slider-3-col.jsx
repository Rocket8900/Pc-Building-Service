import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from "react-router-dom";

const Customerreviews = () => {
  return (
    <div className="container-fluid">
        <div className="row">
          <Swiper className="smallslider"
            // install Swiper modules
            modules={[Pagination]}
            spaceBetween={25}
            slidesPerView="4"
            breakpoints={{
              1200: {
                slidesPerView: 4,
              },
              992: {
                slidesPerView: 3,
              },
              500: {
                slidesPerView: 2,
              },
              320: {
                slidesPerView: 1,
              },
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              dynamicMainBullets: 1, // Set the minimum number of bullets to display
            }}
            centeredSlides
            loop
            slideToClickedSlide
            >
            <SwiperSlide>
              <div className="swiper-inner">
                  <div className="de-item wow">
                      <div className="d-overlay">
                          <div className="d-label">
                              20% OFF
                          </div>
                          <div className="d-text">
                              <h4>Thunder and City</h4>
                              <p className="d-price">Starting at <span className="price">$14.99</span></p>
                              <Link className="btn-main btn-fullwidth" to="/">Order Now</Link>
                          </div>
                      </div>
                      <img src="./img/covers/1.webp" className="img-fluid " alt=""/>
                  </div>
              </div> 
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-inner">
                  <div className="de-item wow">
                          <div className="d-overlay">
                              <div className="d-label">
                                  20% OFF
                              </div>
                              <div className="d-text">
                                  <h4>Mystic Racing Z</h4>
                                  <p className="d-price">Starting at <span className="price">$14.99</span></p>
                                  <Link className="btn-main btn-fullwidth" to="/">Order Now</Link>
                              </div>
                          </div>
                          <img src="./img/covers/2.webp" className="img-fluid " alt=""/>
                      </div>
              </div>         
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-inner">
                  <div className="de-item wow">
                          <div className="d-overlay">
                              <div className="d-label">
                                  20% OFF
                              </div>
                              <div className="d-text">
                                  <h4>Silent Wrath</h4>
                                  <p className="d-price">Starting at <span className="price">$14.99</span></p>
                                  <Link className="btn-main btn-fullwidth" to="/">Order Now</Link>
                              </div>
                          </div>
                          <img src="./img/covers/3.webp" className="img-fluid " alt=""/>
                      </div>
              </div> 
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-inner">
                  <div className="de-item wow">
                          <div className="d-overlay">
                              <div className="d-label">
                                  20% OFF
                              </div>
                              <div className="d-text">
                                  <h4>Funk Dungeon</h4>
                                  <p className="d-price">Starting at <span className="price">$14.99</span></p>
                                  <Link className="btn-main btn-fullwidth" to="/">Order Now</Link>
                              </div>
                          </div>
                          <img src="./img/covers/4.webp" className="img-fluid " alt=""/>
                      </div>
              </div>         
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-inner">
                  <div className="de-item wow">
                          <div className="d-overlay">
                              <div className="d-label">
                                  20% OFF
                              </div>
                              <div className="d-text">
                                  <h4>Galactic Odyssey</h4>
                                  <p className="d-price">Starting at <span className="price">$14.99</span></p>
                                  <Link className="btn-main btn-fullwidth" to="/">Order Now</Link>
                              </div>
                          </div>
                          <img src="./img/covers/5.webp" className="img-fluid " alt=""/>
                      </div>
              </div> 
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-inner">
                  <div className="de-item wow">
                          <div className="d-overlay">
                              <div className="d-label">
                                  20% OFF
                              </div>
                              <div className="d-text">
                                  <h4>Warfare Legends</h4>
                                  <p className="d-price">Starting at <span className="price">$14.99</span></p>
                                  <Link className="btn-main btn-fullwidth" to="/">Order Now</Link>
                              </div>
                          </div>
                          <img src="./img/covers/6.webp" className="img-fluid " alt=""/>
                      </div>
              </div>         
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-inner">
                  <div className="de-item wow">
                          <div className="d-overlay">
                              <div className="d-label">
                                  20% OFF
                              </div>
                              <div className="d-text">
                                  <h4>Raceway Revolution</h4>
                                  <p className="d-price">Starting at <span className="price">$14.99</span></p>
                                  <Link className="btn-main btn-fullwidth" to="/">Order Now</Link>
                              </div>
                          </div>
                          <img src="./img/covers/7.webp" className="img-fluid " alt=""/>
                      </div>
              </div> 
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-inner">
                  <div className="de-item wow">
                          <div className="d-overlay">
                              <div className="d-label">
                                  20% OFF
                              </div>
                              <div className="d-text">
                                  <h4>Starborne Odyssey</h4>
                                  <p className="d-price">Starting at <span className="price">$14.99</span></p>
                                  <Link className="btn-main btn-fullwidth" to="/">Order Now</Link>
                              </div>
                          </div>
                          <img src="./img/covers/8.webp" className="img-fluid" alt=""/>
                      </div>
              </div>         
            </SwiperSlide>
          </Swiper>
      </div>   
    </div>   
  );
};
export default Customerreviews;