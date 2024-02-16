import React from 'react';
import { Link } from "react-router-dom";

const server = () => {
    return(
        <div className="container">
            <div className="row align-items-center gx-5">
                <div className="col-lg-6">
                    <img width="1000" height="600" src="./img/misc/server.webp" className="img-fluid mb-sm-30" alt=""/>
                </div>

                <div className="col-lg-6">
                    <div className="subtitle  mb-3">Server locations</div>
                    <h2 className=""><span className="text-gradient">25</span> servers available worldwide for your game.</h2>
                    <p className="">Our collection of game server hosting options encompasses the most in-demand platforms of today. Within our offerings, you&apos;ll discover an extensive array of specialized tools and features tailored to each game, all of which we diligently keep up to date in sync with game and mod updates.</p>

                    <ul className="de-server">
                        <li>London, England</li>
                        <li>Paris, France</li>
                        <li>Frankut, Germany</li>
                        <li>Amsterdam, Netherlands</li>
                        <li>Stockholm, Sweden</li>
                        <li>Helsinki, Finland</li>
                        <li>Los Angeles, USA</li>
                        <li><Link to="/">View all available servers</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
}

export default server;