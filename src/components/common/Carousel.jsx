import React, { useState } from "react";
import "./Carousel.css";

import img1 from "../../assets/img1.jpeg";
import img2 from "../../assets/img2.jpeg";
import img3 from "../../assets/img3.jpeg";
import img4 from "../../assets/img4.jpeg";
import img5 from "../../assets/img5.jpeg";
import img6 from "../../assets/img6.jpeg";
import img7 from "../../assets/img7.jpeg";
import img8 from "../../assets/img8.jpeg";
import img9 from "../../assets/img9.jpeg";
import img10 from "../../assets/img10.jpeg";
import img11 from "../../assets/img11.jpeg";
import img12 from "../../assets/img12.jpeg";
import img13 from "../../assets/img13.jpeg";


const images = [img1, img2, img3, img4,img5,img6,img7,img8,img9,img10,img11,img12,img13];

export default function Carousel() {
    const [index, setIndex] = useState(0);

    const next = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    const prev = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="carousel-container">
            <img src={images[index]} className="carousel-image" alt="slide" />

            <button className="carousel-btn left" onClick={prev}>Prev</button>
            <button className="carousel-btn right" onClick={next}>Next</button>
        </div>
    );
}
