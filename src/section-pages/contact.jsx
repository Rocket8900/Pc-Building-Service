import React from 'react';
import emailjs from '@emailjs/browser';
import { useEffect } from "react";
import  Aos from 'aos';
import "aos/dist/aos.css";


export default function Contactus() {
    useEffect(() => {
    Aos.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
    }, []);

    function sendEmail(e) {

    const success = document.getElementById("success");
    const button = document.getElementById("send_message");
    const failed = document.getElementById("failed");
    e.preventDefault();

    emailjs.sendForm('gmail', 'template_csfdEZiA', e.target, 'user_zu7p2b3lDibMCDutH5hif') //change with your api
      .then((result) => {
          console.log(result.text);
          success.classList.add('show');
          button.classList.add('show');
          failed.classList.remove('show');
      }, (error) => {
          console.log(error.text);
          failed.classList.add('show');
      });
  }

    return(
      <div className="container">
            <div className="row">
                    <div className="col-lg-10 offset-lg-1"
                            data-aos="fade-up"
                                data-aos-once="true"
                                data-aos-delay="200"
                                data-aos-duration="1000"
                                data-aos-easing="ease"
                            >
                            <p className="lead">
                            Please read our <a href="faq.html">faq page</a> first. 
                            If you got any questions, please do not hestitae to send us a message.
                            </p>

                            <div className="contact_form_wrapper">
                                <form name="contactForm" id="contact_form" className="form-border" onSubmit={sendEmail}>
                                    <div className="row">
                                        <div className="col-lg-6 mb10">
                                            <div className="field-set">
                                                <span className="d-label">Name</span>
                                                <input type="text" name="Name" id="name" className="form-control" placeholder="Your Name" required/>
                                            </div>
                                        
                                            <div className="field-set">
                                                <span className="d-label">Email</span>
                                                <input type="text" name="Email" id="email" className="form-control" placeholder="Your Email" required/>
                                            </div>
                                        
                                            <div className="field-set">
                                                <span className="d-label">Phone</span>
                                                <input type="text" name="phone" id="phone" className="form-control" placeholder="Your Phone" required/>
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                                <div className="field-set">
                                                    <span className="d-label">Message</span>
                                                    <textarea name="message" id="message" className="form-control" placeholder="Your Message" required></textarea>
                                                </div>
                                        </div>
                                        <div className="col-12">
                                            <div id='success' className='hide'>Your message has been sent...</div>
                                            <div id='failed' className='hide'>Message failed...</div>
                                            <div id='submit' className="mt30">
                                                <button type='submit' id='send_message' className="btn-main">
                                                    Send Message
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
    );
}
