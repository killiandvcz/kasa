import React, { useState, useEffect } from 'react';
import styles from './Slider.module.scss';

const ImageSlider = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (images.length === 0) return;
    
    if (currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [images, currentIndex]);

  const goToNext = () => {
    if (isTransitioning || images.length <= 1) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToPrevious = () => {
    if (isTransitioning || images.length <= 1) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  if (!images.length) {
    return <div className={styles.emptyMessage}>Aucune image à afficher</div>;
  }

  return (
    <div className={styles.container}>
      <div 
        className={styles.slider}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className={styles.slide}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      <button 
        onClick={goToPrevious}
        className={`${styles.navigationButton} ${styles.prev}`}
      >
        {"<"}
      </button>

      <button 
        onClick={goToNext}
        className={`${styles.navigationButton} ${styles.next}`}
      >
        {">"}
      </button>

      <div className={styles.indicators}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;