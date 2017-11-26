import React from 'react';
import './PreFooter.css';
import {Link} from "react-router-dom";



const PreFooter = () => {

    function getRandomInt() {
          return Math.floor(Math.random() * (5 - 0 + 1)) + 0;
        }
    const imageArray = [
        'http://www.lemon-grass.ru/files/bg/2.jpg',
        'http://www.lemon-grass.ru/files/bg/3.jpg',
        'https://cdn.pixabay.com/photo/2015/03/31/04/07/texture-700516_960_720.jpg',
        'https://cdn.pixabay.com/photo/2017/11/12/10/44/purple-2942105_960_720.jpg',
        'https://static.pexels.com/photos/236028/pexels-photo-236028.jpeg',
        'https://c1.staticflickr.com/4/3743/10862732055_d7ce171a71_b.jpg'
    ]

    return (
        <div className="preFooter-whole" style={{backgroundImage: `url(${imageArray[getRandomInt()]})`}}>
            CHECK US OUT :
        </div>
    )
}

export default PreFooter;