import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <React.Fragment>
      <div className="footer">
        <div className="footer_item_list">
          <div className="footer_content">
            <h2>About</h2>
            <ul className="about_item">
              <li>About us</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div className="footer_content">
            <h2>Group of Companies</h2>
            <ul className="grpOfCompanies">
              <li>Myntra</li>
              <li>Cleartrip</li>
            </ul>
          </div>
          <div className="footer_content">
            <h2>Help</h2>
            <ul className="help">
              <li>Payment</li>
              <li>Shipping</li>
              <li>Cancellation & Return</li>
            </ul>
          </div>
          <div className="footer_contact">
            <div className="footer_content">
              <h2>Mail us</h2>
              <p>prateekbahad70@gmail.com</p>
              <p>+91-9529645479</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_copyright">
        <p> &copy; {currentYear} eMall.com | All Right Reserved</p>
      </div>
    </React.Fragment>
  );
};

export default Footer;
