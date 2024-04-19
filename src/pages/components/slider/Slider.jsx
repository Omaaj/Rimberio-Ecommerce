import React, { useEffect, useState } from "react";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import "./Slider.css";
import { sliders } from "./SliderDetails";

export default function Slider() {
  const [currentSLide, setCurrentSLide] = useState(0);

  const sliderLength = sliders.length;

  const prevSlide = () => {
    setCurrentSLide(currentSLide === 0 ? sliderLength - 1 : currentSLide - 1);
  };
  const nextSlide = () => {
    setCurrentSLide(currentSLide === sliderLength - 1 ? 0 : currentSLide + 1);
  };

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  useEffect(() => {
    setCurrentSLide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSLide, slideInterval, autoScroll]);

  return (
    <div>
      <div className="slider">
        {sliders.map((item, index) => {
          return (
            <div
              className={index === currentSLide ? "slide current" : "slide"}
              key={index}
            >
              {index === currentSLide && (
                <div>
                  <div className="image1">
                    <img src={item.img1} alt="women" />
                    <p>{item.imgP}</p>
                  </div>
                  <div className="joined">
                    <div className="lines"></div>
                    <div className="lines one"></div>
                    <div className="lines two"></div>
                  </div>
                  <div className="alpha">
                    <div className="exclus">{item.exclus}</div>
                    <div className="collec">{item.coll}</div>
                    <div className="lines"></div>
                  </div>
                  <div className="pra">
                    <p>on sale</p>
                  </div>
                  <div className="image2">
                    <img src={item.img2} alt="women" />
                    <p>{item.imgP1}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div className="iconss">
          <div className="icons">
            <div className="icon one" onClick={prevSlide}>
              <WestOutlinedIcon sx={{ fontSize: "20px" }} />
            </div>
            <div className="icon" onClick={nextSlide}>
              <EastOutlinedIcon sx={{ fontSize: "20px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
