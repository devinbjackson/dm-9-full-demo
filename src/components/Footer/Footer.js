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
         <img style={{width: "100px"}} src="https://cdn.shopify.com/s/files/1/1204/3438/files/Bon-Tot-Edinburgh-Logo_57786928-f63e-4872-be6a-603a79953edd_600x.png?v=1505911147" alt="logo"/>
               TITLE
         </div>
        </div>
    )
}

export default Footer;