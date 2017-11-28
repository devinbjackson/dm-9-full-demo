import React from 'react';
import './SubHeader.css';
import {Link} from "react-router-dom";



const SubHeader = () => {

    return (
        <div className="subHeader-whole">
            <h1>EXTRA 0% OFF <span className="the-red">NOTHING</span></h1>
            <div className="sh-quadrants">
            <div className="sh-top-left">
            <h2 class="the-blue">THINGS</h2>
            <h3>Deals for Days</h3>
            <section>Here are some pictures.</section>
            </div>
            <div className="sh-top-right">
            </div>
            <div className="sh-bottom-left">
            </div>
            <div className="sh-bottom-right">
            </div>
            </div>
        </div>
    )
}

export default SubHeader;