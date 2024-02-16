import React from 'react';
import { Parallax } from "react-parallax";
import { Link } from 'react-router-dom';

const image2 ='../../img/background/space.webp';

const Download = () => {
    return(
        <div className="container">
            <div className="row position-relative">
                <div className="col-lg-12">
                    <Parallax className="padding60 sm-padding40" bgImage={image2} strength={400}> 
                        <div className="col-lg-6">
                            <div className="subtitle wow fadeInUp mb-3">Download now</div>
                            <h2 className="wow fadeInUp" data-wow-delay=".2s"><span className="text-gradient">Manage</span> your server from mobile device</h2>
                            <p>Enim sit laborum enim ut in excepteur aliqua consequat est ut aliquip nostrud sunt deserunt consequat fugiat adipisicing minim aliquip do adipisicing cupidatat esse ut irure incididunt ullamco dolor laboris anim ea do ut anim.</p>                            
                            <Link to="/"><img width="180" height="100" src="../../img/misc/download-appstore.webp" className="img-fluid mb-sm-20" alt="download"/></Link>&nbsp;
                            <Link to="/"><img width="180" height="100" src="../../img/misc/download-playstore.webp" className="img-fluid mb-sm-20" alt="download"/></Link>
                        </div>
                    </Parallax>
                    <img width="700" height="550" src="../../img/misc/man-with-phone.webp" className="max-content sm-hide position-absolute bottom-0 end-0"  alt=""/>
                </div>
            </div>
        </div>
    );
}

export default Download;