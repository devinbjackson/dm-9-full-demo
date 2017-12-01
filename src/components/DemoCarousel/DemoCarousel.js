import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import bricks from './bricks.jpg'
import rocksJeans from './rocksJeans.jpg'
import people from './people.jpg'

import './DemoCarousel.css';

export default class DemoCarousel extends Component {
    render() {
        return (
            <Carousel infiniteLoop={true} autoPlay={true} showStatus={false} showThumbs={false} width="100%" transitionTime={900} interval={7000}>
                <div>
                    <img className="carousel-image" src={bricks} />
                    
                </div>
                <div>
                    <img className="carousel-image" src={rocksJeans}/>
                    
                </div>
                <div>
                    <img className="carousel-image"src={people}/>
                   
                </div>
            </Carousel>
        );
    }
};

