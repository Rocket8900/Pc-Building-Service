import React from 'react';

const image1 = '../img/icons/1.png';
const image2 = '../img/icons/2.png';
const image3 = '../img/icons/3.png';
const image4 = '../img/icons/4.png';


const Section = () => {
    return(
        <div className="container">
            <div className="row">

                <div className="col-lg-3 col-md-6 mb-sm-20" >
                    <div>
                        <img src={image1} className="mb20" alt=""/>
                        <h4>Super Quick Setup</h4>
                        <p>Dolor minim in pariatur in deserunt laboris eu pariatur labore excepteur cupidatat cupidatat duis dolor in.</p>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mb-sm-20">
                    <div>
                        <img src={image2} className="mb20" alt=""/>
                        <h4>Premium Hardware</h4>
                        <p>Dolor minim in pariatur in deserunt laboris eu pariatur labore excepteur cupidatat cupidatat duis dolor in.</p>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mb-sm-20">
                    <div>
                        <img src={image3} className="mb20" alt=""/>
                        <h4>DDos Protection</h4>
                        <p>Dolor minim in pariatur in deserunt laboris eu pariatur labore excepteur cupidatat cupidatat duis dolor in.</p>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mb-sm-20">
                    <div>
                        <img src={image4} className="mb20" alt=""/>
                        <h4>Fast Support</h4>
                        <p>Dolor minim in pariatur in deserunt laboris eu pariatur labore excepteur cupidatat cupidatat duis dolor in.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Section;