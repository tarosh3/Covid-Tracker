import React from "react";
import "./Footer.css";
function Footer() {
  const date = new Date();
  var n = date.getFullYear();
  return (
    <div className="footer">
      <div className="row">
        <a href="https://www.facebook.com/tarosh.mathuria.77">
          <i className="fa fa-facebook"></i>
        </a>
        <a href="https://www.instagram.com/tarosh3/">
          <i className="fa fa-instagram"></i>
        </a>
        <a href="https://github.com/tarosh3">
          <i className="fa fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/tarosh-mathuria-785090138/">
          <i className="fa fa-linkedin"></i>
        </a>
      </div>

      <div className="row">
        <ul>
          <li>
            <span>Contact us</span>
          </li>
          <li>
            <span>Our Services</span>
          </li>
          <li>
            <span>Privacy Policy</span>
          </li>
          <li>
            <span>Terms & Conditions</span>
          </li>
          <li>
            <span>Career</span>
          </li>
        </ul>
      </div>

      <div className="row">
        Copyright © {n} Tarosh - All rights reserved || Designed By: Tarosh
      </div>
    </div>
  );
}

export default Footer;
