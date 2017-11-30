import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

import './DemoCarousel.css';

export default class DemoCarousel extends Component {
    render() {
        return (
            <Carousel infiniteLoop={true} autoPlay={true} showStatus={false} showThumbs={false} width="100%" transitionTime={900} interval={7000}>
                <div>
                    <img className="carousel-image" src="http://www.gap.com/Asset_Archive/GPWeb/content/0014/433/164/assets/desktop/01A_DESK_IMG.jpg" />
                    
                </div>
                <div>
                    <img src="http://www.gap.com/Asset_Archive/GPWeb/content/0014/433/164/assets/desktop/01B_DESK_IMG.jpg" />
                    
                </div>
                <div>
                    <img className="carousel-image"src="http://www.gap.com/Asset_Archive/GPWeb/content/0014/433/164/assets/desktop/01C_DESK_IMG.jpg" />
                   
                </div>
            </Carousel>
        );
    }
};

