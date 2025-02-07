import { useState, useEffect, useCallback, useRef } from 'react';
import styles from "./Slider.module.scss"

const ImageCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartXRef = useRef(0);
  const autoPlayRef = useRef(null);

  const goToNext = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(current => (current + 1) % images.length);
    }
  }, [images.length, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(current => (current - 1 + images.length) % images.length);
    }
  }, [images.length, isTransitioning]);

  const goToSlide = useCallback((index) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index);
    }
  }, [isTransitioning]);

  // Gestion du défilement automatique
  useEffect(() => {
    autoPlayRef.current = setInterval(goToNext, 5000);
    return () => clearInterval(autoPlayRef.current);
  }, [goToNext]);

  // Gestion des touches du clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  // Gestion du swipe sur mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 50) { // Seuil minimum pour le swipe
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  if (!images.length) return null;

  return (
    <div 
      className={styles.container}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className={styles.slideContainer}
        onTransitionEnd={() => setIsTransitioning(false)}
      >
        {images.map((image, index) => (
          <div key={index} className={styles.slide}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className={styles.image}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className={`${styles.button} ${styles.prevButton}`}
        aria-label="Image précédente"
      >
        ‹
      </button>
      
      <button
        onClick={goToNext}
        className={`${styles.button} ${styles.nextButton}`}
        aria-label="Image suivante"
      >
        ›
      </button>

      <div className={styles.dots}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={styles.dot}
            style={{
              backgroundColor: index === currentIndex 
                ? 'rgba(255, 255, 255, 0.9)' 
                : 'rgba(255, 255, 255, 0.5)',
            }}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;