import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Scrolling = () => {
  const { pathName, search } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top:0,
      left:0,
      behavior:"smooth"
    });
  }, [pathName, search]);

  return null;
};

export default Scrolling;
