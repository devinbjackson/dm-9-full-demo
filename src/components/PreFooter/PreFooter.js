import React from 'react';
import './PreFooter.css';
import {Link} from "react-router-dom";
import pic1 from './PreFooterImages/7.jpg';
import pic2 from'./PreFooterImages/2.jpg';
import pic3 from'./PreFooterImages/3.jpg';
import pic4 from'./PreFooterImages/4.jpg';
import pic5 from'./PreFooterImages/5.jpeg';
import pic6 from'./PreFooterImages/6.jpg';



const PreFooter = () => {

    function getRandomInt() {
          return Math.floor(Math.random() * (5 - 0 + 1)) + 0;
        }
    const imageArray = [
        pic2,
        pic3,
        pic4,
        pic4,
        pic5,
        pic6,
        pic1
    ]

    return (
        <div className="preFooter-whole" style={{backgroundImage: `url(${imageArray[getRandomInt()]})`}}>
            CHECK US OUT :
        </div>
    )
}

export default PreFooter;