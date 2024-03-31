import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  function directToBuild() {
    navigate("/build-pc");
  }

  return (
    <div className="home-page mb-10">
      <Slider {...settings} className="slider-container">
        <div className="slider-item">
          <div className="h-64">
            {" "}
            {/* Fixed height container */}
            <img
              src="src/assets/pc1.jpg"
              alt="PC Building"
              className="w-full h-full object-cover" // Ensures the image covers the area without distortion
            />
          </div>
          <div className="slider-content p-4 bg-black">
            <h2 className="text-2xl font-bold text-white">
              Build Your Dream PC
            </h2>
            <p className="text-lg text-white">
              Discover the perfect components for your next PC build.
            </p>
            <button
              onClick={directToBuild}
              className="cta-button bg-white text-black font-bold py-2 px-4 rounded mt-4"
            >
              Start Building
            </button>
          </div>
        </div>
        <div className="slider-item">
          <div className="h-64">
            {" "}
            {/* Fixed height container */}
            <img
              src="src/assets/pc2.jpg"
              alt="PC Gaming"
              className="w-full h-full object-cover" // Ensures the image covers the area without distortion
            />
          </div>
          <div className="slider-content p-4 bg-black">
            <h2 className="text-2xl font-bold text-white">For Gamers</h2>
            <p className="text-lg text-white">
              Optimized for the latest games and graphics.
            </p>
            <button
              onClick={directToBuild}
              className="cta-button bg-white text-black font-bold py-2 px-4 rounded mt-4"
            >
              Shop Now
            </button>
          </div>
        </div>
        <div className="slider-item">
          <div className="h-64">
            {" "}
            {/* Fixed height container */}
            <img
              src="src/assets/pc3.jpg"
              alt="PC Workstation"
              className="w-full h-full object-cover" // Ensures the image covers the area without distortion
            />
          </div>
          <div className="slider-content p-4 bg-black">
            <h2 className="text-2xl font-bold text-white">Workstation PCs</h2>
            <p className="text-lg text-white">
              Powerful components for professional use.
            </p>
            <button
              onClick={directToBuild}
              className="cta-button bg-white text-black font-bold py-2 px-4 rounded mt-4"
            >
              Explore Workstations
            </button>
          </div>
        </div>
      </Slider>
    </div>
  );
}
