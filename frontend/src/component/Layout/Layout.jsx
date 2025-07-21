import { Outlet} from "react-router-dom";
import React from "react";
import Navbar from "../Navbar/Navbar.jsx";
import Scrolling from "../../Helper/Scrolling/Scrolling.jsx";
import ScrollTop from "../ScrollTop/ScrollTop.jsx";
import Footer from "../Footer/Footer.jsx";

const Layout = () => {

  return (
    <React.Fragment>
      <Navbar />
      <Scrolling />
      <ScrollTop />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
