import { Link } from "react-router-dom";
import "./Hero.css";
import React from "react";

const Hero = () => {
  return (
    <React.Fragment>
      <div className="hero">
        <div className="hero_content">
          <h2>Welcome to our eMall</h2>
          <p>
            Explore the various type of Electronic Appliances, Mobiles with an
            accessories, Laptops, Smartwatches with an exclusive prices and
            discounts.
          </p>
          <Link to="/product">
          <div className="btn">
            <button>Shop Now</button>
          </div>
          </Link>
        </div>
      </div>
      
    </React.Fragment>
  );
};

export default Hero;
