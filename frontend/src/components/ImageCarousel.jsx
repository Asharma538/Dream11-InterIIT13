import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageCarousel = () => {
    const images = [
    'src/assets/carousel-2.png',
    'src/assets/carousel-1.png',
    ]
  return (
    <Carousel showThumbs={false} autoPlay infiniteLoop>
        {images.map((image, index) => (
            <div key={index}>
            <img src={image} alt="carousel" />
            </div>
        ))}
    </Carousel>
  );
};

export default ImageCarousel;
