import { useState, useEffect } from 'react';
import './ImageSlider.css'; 

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const images = [
    './images/image1.jpg',
    './images/image2.jpg',
    './images/image3.jpg',
    './images/image4.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="studio-images">
      {images.map((image, index) => (
        <div 
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </div>
  );
};

export default ImageSlider;