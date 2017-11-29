import React from 'react';
import './Footer.css';
import {Link} from "react-router-dom";



const Footer = () => {
    return (
        <div className="footer-whole">
        <div id="footer-departments">
        <h2>DEPARTMENTS</h2><br/>
        <div className="contact-section-items"><Link to="/men">Men<br/></Link></div>
        <div className="contact-section-items"><Link to="/women">Women<br/></Link></div>
        <div className="contact-section-items"><Link to="/accessories">Accessories</Link></div>
        </div>
        <div id="footer-contact">
        <h2>CONTACT</h2><br/>
        <div className="contact-section-items">Email us:</div>
        <div className="contact-section-items">info@test.com</div>
        <div className="contact-section-items">Call: 1 800 445 8904</div>
        </div>
         <div className="nav-logo">
         <img style={{width: "100px"}} src="https://shopual.com/wp-content/uploads/2017/02/UAL-logo-white.png" alt="logo"/>
               TITLE
         </div>
        </div>
    )
}

export default Footer;