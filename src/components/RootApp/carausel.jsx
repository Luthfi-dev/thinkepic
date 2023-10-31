import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ImageCarousel = () => {
  const [Uwidth, setWidth] = useState(300);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const slides = [
    {
      imageSrc: '/assets/gambar/slide/1.jpg',
      label: 'Hello World',
      description: 'Description for slide pertama.',
    },
    
  ];

  function setWidthBasedOnScreen() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (screenWidth <= 768) {
      setWidth(200);
    } else {
      setWidth(400);
    }
  }

  useEffect(() => {
    setWidthBasedOnScreen();
    window.addEventListener('resize', setWidthBasedOnScreen);

    return () => {
      window.removeEventListener('resize', setWidthBasedOnScreen);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-bs-pause="hover"
    >
      <div className="carousel-inner" style={{backgroundColor: "silver"}}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item shadow-lg ${activeIndex === index ? 'active bg-success' : ''}`}
            style={{ height: `${Uwidth}px` }}
          >
            <div
              className="zoomable-image"
              style={{
                width: '100%',
                height: '100%',
                transition: 'transform 3s ease',
                transform: activeIndex === index ? 'scale(1.4)' : 'scale(1)',
              }}
            >
              <Image
                src={slide.imageSrc}
                className="d-block w-100"
                alt={slide.label}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="carousel-caption d-md-block" style={{marginBottom:"-40px"}}>
              <h3><b style={{color:"#4352EF",background:"rgba(255,255,255,0.5)", padding:"0 5px"}}>{slide.label}</b></h3>
              <p className="d-none d-md-block">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
