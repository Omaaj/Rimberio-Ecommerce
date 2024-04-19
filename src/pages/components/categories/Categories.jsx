import React from "react";
import "./Categories.css";
import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <div className="categories">
      <div className="first">
        <div className="img_box one">
          <img src="./img/imgIns/ins4.jpg" alt="" />
          <button>
            <Link className="links" to="/stores">
              Affordable
            </Link>{" "}
          </button>
        </div>
        <div className="img_box two">
          <img src="./img/imgIns/ins12.jpg" alt="" />

          <button>
            <Link className="links" to="/stores">
              Newly Curated
            </Link>{" "}
          </button>
        </div>
      </div>
      <div className="second">
        <div className="img_box three">
          <img src="./img/pexels-photo-6764007.jpeg" alt="" />
          <button>
            <Link className="links" to="/stores">
              Timeless
            </Link>{" "}
          </button>
        </div>
      </div>
      <div className="third">
        <div className="third1">
          <div className="img_box four">
            <img src="./img/fashion-601562_1280.jpg" alt="" className="one" />
            <button>
              <Link className="links" to="/stores">
                Limited Editions
              </Link>{" "}
            </button>
          </div>
          <div className="img_box five">
            <img src="./img/imgIns/ins6.jpg" alt="" />
            <button>
              <Link className="links" to="/stores">
                New Collections
              </Link>{" "}
            </button>
          </div>
        </div>
        <div className="third2">
          <div className="img_box six">
            <img src="./img/pexels-photo-1152077.jpeg" alt="" />
            <button>
              <Link className="links" to="/stores">
                Latest Trends
              </Link>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
