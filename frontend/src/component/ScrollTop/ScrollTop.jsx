import React, { useEffect, useState } from "react";
import "./ScrollTop.css";

const ScrollTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.pageYOffset > 200);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <React.Fragment>
      {visible && (
        <button className="backToTop" onClick={scrollToTop}>
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      )}
    </React.Fragment>
  );
};

export default ScrollTop;
