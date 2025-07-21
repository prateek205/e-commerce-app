import React from "react";
import "./Breadscrum.css";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../../context/storeContext";

const Breadscrum = () => {
  const formatName = (segment) => {
    return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const { selectCategory, selectBrand } = useStore();

  return (
    <React.Fragment>
      <div className="breadscrum">
        <span className="value">
          <Link to="/">Home</Link>
        </span>
        {pathnames.map((segment, index) => {
          const fullPath = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          return (
            <span key={fullPath} className="pathName">
              <span className="seperator">
                <i className="fa-solid fa-angle-right"></i>
              </span>
              {isLast ? (
                <span className="current">{formatName(segment)}</span>
              ) : (
                <span className="value">
                  <Link to={fullPath}>{formatName(segment)}</Link>
                </span>
              )}
            </span>
          );
        })}

        {selectCategory.map((cat, index) => {
          return (
            <span key={index}>
              <span className="seperator">
                <i className="fa-solid fa-angle-right"></i>
              </span>
              <span className="current">{formatName(cat)}</span>
            </span>
            
          );
        })}

        {selectBrand.map((brand, index) => {
          return (
            <span key={index}>
              <span className="seperator">
                <i className="fa-solid fa-angle-right"></i>
              </span>
              <span className="current">{formatName(brand)}</span>
            </span>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Breadscrum;
