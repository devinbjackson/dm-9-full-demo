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
                       <div style={{color: 'white', marginTop:"-90vh", fontSize: '4em', display: 'flex'}}>

                        <div className="left">  

                        <div>WEAR OLD CLOTHES</div>
                        <div>_________</div>
                        <div>LIKE THEY'RE <span className="the-red" style={{backgroundColor: 'white', padding: '-2px 10px -2px 10px'}}>NEW</span></div>

                        </div>
                        
                        </div>
                </div>
                <div>
                    <img className="carousel-image" src={rocksJeans}/>
                    
                    
                </div>
                <div>
                    <img className="carousel-image" src={people}/>

                   
                </div>
            </Carousel>
        );
    }
};

