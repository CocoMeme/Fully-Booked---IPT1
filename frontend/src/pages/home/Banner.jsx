import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import bannerImg1 from "../../assets/banner.png";
import bannerImg2 from "../../assets/banner2.png";
import bannerImg3 from "../../assets/banner3.png";
import bannerImg4 from "../../assets/banner4.png";
import bannerImg5 from "../../assets/banner5.png";

// Styled components for the carousel
const CarouselContainer = styled("div")(() => ({
  position: "relative",
  perspective: "1000px",
  width: "50%", // Reduced width for side alignment
  height: "500px",
  overflow: "hidden",
}));

const CarouselTrack = styled("div")(() => ({
  position: "relative",
  width: "100%",
  height: "100%",
  transformStyle: "preserve-3d",
  transition: "transform 1s ease-in-out",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const CarouselSlide = styled("div")(() => ({
  position: "absolute",
  width: "200px",
  height: "200px",
  transformOrigin: "center",
  transition: "transform 1s ease-in-out, opacity 1s ease-in-out, zIndex 1s ease-in-out",
}));

const CarouselImage = styled("img")(() => ({
  width: "150%",
  height: "140%",
  objectFit: "cover",
  borderRadius: "1%", // Makes the images circular
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
}));

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [bannerImg1, bannerImg2, bannerImg3, bannerImg4, bannerImg5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex flex-col md:flex-row py-16 justify-between items-center gap-12">
      {/* Content */}
      <div className="md:w-1/2 w-full">
        <div className="flex items-center mb-10">
          <div className="mr-4">
            <img
              src="/android-chrome-512x512.png"
              alt="Logo"
              style={{
                width: "120px", // Enlarged logo
                height: "auto",
              }}
            />
          </div>
          <div>
            <h1 className="font-extrabold text-7xl mb-0">
              <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                FULLY
              </span>
              &nbsp;
              <span className="bg-gradient-to-r from-green-300 to-green-700 bg-clip-text text-transparent">
                BOOKED
              </span>
            </h1>
          </div>
        </div>

        <div className="ml-6">
          <h1 className="md:text-5xl text-lg font-medium mb-7">Newly Released Books!</h1>
          <h3 className="mb-5">
            This is a project done by <strong>Andrei Co</strong> & <strong>Rean Joy Cicat</strong>.
          </h3>
          <p className="mb-10">
            It's time to update your reading list with some of the latest and greatest releases in
            the literary world. From heart-pumping thrillers to captivating memoirs, this week's
            new releases offer something for everyone.
          </p>
          <button className="btn-special shadow-md">Shop Now!</button>
        </div>
      </div>

      {/* Carousel on the Right Side */}
      <CarouselContainer>
        <CarouselTrack>
          {images.map((src, index) => (
            <CarouselSlide
              key={index}
              style={{
                transform: `rotateY(${(index - currentIndex) * 60}deg) translateZ(250px)`,
                opacity: index === currentIndex ? 1 : 0.5,
                zIndex: index === currentIndex ? 1 : 0,
              }}
            >
              <CarouselImage src={src} alt={`Slide ${index + 1}`} />
            </CarouselSlide>
          ))}
        </CarouselTrack>
      </CarouselContainer>
    </div>
  );
};

export default Banner;
