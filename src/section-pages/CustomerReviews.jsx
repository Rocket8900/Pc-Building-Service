import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Customerreviews = () => {
  return (
    <>
    <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="subtitle mb20">Customer reviews</div>
                    <h2 className="wow fadeInUp">4.85 out of 5</h2>
                    <div className="spacer-20"></div>
                </div>
            </div>
        </div>
    <Swiper className="smallslider"
      // install Swiper modules
      modules={[Pagination]}
      spaceBetween={20}
      slidesPerView="auto"
      pagination={{ clickable: true }}
      centeredSlides
      loop
      slideToClickedSlide
      >
      <SwiperSlide>
        <div className="swiper-inner">
            <div className="de_testi type-2">
              <blockquote>
                  <div className="de-rating-ext">
                      <span className="d-stars">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                      </span>
                  </div>
                  <p>&quot;I&apos;ve been using Playhost for my game server needs, and I couldn&apos;t be happier. The server uptime is fantastic, and the customer support team is always quick to assist with any issues.&quot;
                  </p>
                  <div className="de_testi_by">
                      <img alt="" src="./img/people/1.jpg"/> <span>Michael S.</span>
                  </div>
              </blockquote>
          </div>
        </div> 
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-inner">
            <div className="de_testi type-2">
                <blockquote>
                    <div className="de-rating-ext">
                        <span className="d-stars">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </span>
                    </div>
                    <p>&quot;Running a game server used to be a hassle, but Playhost makes it easy. The control panel is user-friendly, and I love how they handle server maintenance and updates.&quot;</p>
                    <div className="de_testi_by">
                        <img alt="" src="./img/people/2.jpg"/> <span>Robert L.</span>
                    </div>
                </blockquote>
            </div>
        </div>         
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-inner">
            <div className="de_testi type-2">
                <blockquote>
                    <div className="de-rating-ext">
                        <span className="d-stars">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </span>
                    </div>
                    <p>&quot;I&apos;ve tried several hosting providers in the past, and Playhost is by far the best. Their server performance is top-notch, and I&apos;ve never experienced lag while playing with friends.&quot;</p>
                    <div className="de_testi_by">
                        <img alt="" src="./img/people/3.jpg"/> <span>Jake M.</span>
                    </div>
                </blockquote>
            </div>
        </div> 
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-inner">
            <div className="de_testi type-2">
                  <blockquote>
                      <div className="de-rating-ext">
                          <span className="d-stars">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                          </span>
                      </div>
                      <p>As a new server owner, I was worried about setup and configuration, but Playhost made it a breeze. They have detailed tutorials and helpful support, which made the process smooth.&quot;</p>
                      <div className="de_testi_by">
                          <img alt="" src="./img/people/4.jpg"/> <span>Alex P.</span>
                      </div>
                  </blockquote>
              </div>
        </div>         
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-inner">
            <div className="de_testi type-2">
                <blockquote>
                    <div className="de-rating-ext">
                        <span className="d-stars">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </span>
                    </div>
                    <p>&quot;The flexibility Playhost offers is incredible. I can easily switch between game servers or even host multiple games on the same plan. It&apos;s a gamer&apos;s dream come true!&quot;</p>
                    <div className="de_testi_by">
                        <img alt="" src="./img/people/5.jpg"/> <span>Carlos R.</span>
                    </div>
                </blockquote>
            </div>
        </div> 
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-inner">
            <div className="de_testi type-2">
                <blockquote>
                    <div className="de-rating-ext">
                        <span className="d-stars">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </span>
                    </div>
                    <p>&quot;I&apos;ve been a loyal customer of Playhost for years now. Their dedication to keeping their hardware up-to-date ensures my gaming experience is always optimal.&quot;</p>
                    <div className="de_testi_by">
                        <img alt="" src="./img/people/6.jpg"/> <span>Edward B.</span>
                    </div>
                </blockquote>
            </div>
        </div>         
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-inner">
            <div className="de_testi type-2">
                <blockquote>
                    <div className="de-rating-ext">
                        <span className="d-stars">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </span>
                    </div>
                    <p>&quot;When our community needed a reliable server for our esports tournaments, we turned to Playhost, and they&apos;ve never let us down. Their servers are perfect for competitive gaming.&quot;</p>
                    <div className="de_testi_by">
                        <img alt="" src="./img/people/7.jpg"/> <span>Daniel H.</span>
                    </div>
                </blockquote>
            </div>
        </div> 
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-inner">
            <div className="de_testi type-2">
                <blockquote>
                    <div className="de-rating-ext">
                        <span className="d-stars">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </span>
                    </div>
                    <p>&quot;The DDoS protection from Playhost is a lifesaver. We used to get attacked regularly, but since switching to their servers, we haven&apos;t had any downtime.&quot;</p>
                    <div className="de_testi_by">
                        <img alt="" src="./img/people/8.jpg"/> <span>Bryan G.</span>
                    </div>
                </blockquote>
            </div>
        </div>         
      </SwiperSlide>
    </Swiper>
    </>
  );
};
export default Customerreviews;