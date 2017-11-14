import React from 'react';
import './Footer.css';



const Footer = () => {
    return (
        <div className="footer-whole">
            THIS IS THE FOOTER
        <div id="footer-departments">
        <h1>DEPARTMENTS</h1><br/>
        Men<br/>
        Women<br/>
        Accessories
        </div>
        <div id="footer-contact">
        <h1>CONTACT</h1><br/>
        Email us:<br/>
        info@test.com<br/>
        Call: 1 800 445 8904
        </div>
        <div className="nav-logo"><img style={{width: "100px"}} src="https://cdn.shopify.com/s/files/1/1204/3438/files/Bon-Tot-Edinburgh-Logo_57786928-f63e-4872-be6a-603a79953edd_600x.png?v=1505911147" alt="logo"/>
               </div>
        </div>
    )
}

export default Footer;