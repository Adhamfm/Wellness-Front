import { useEffect, useState } from 'react';
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styles from "./Slider.module.css";

export default function Slider({ images = [] }) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (Array.isArray(images) && images.length > 0) {
      const preloadImages = () => {
        const loadImage = (src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        };

        Promise.all(images.map(src => loadImage(src)))
          .then(() => setImagesLoaded(true))
          .catch(() => setImagesLoaded(false));
      };
      preloadImages();
    } else {
      setImagesLoaded(false);
    }
  }, [images, retry]);

  const renderSlides = () => {
    return images.map((slide, index) => (
      <div className={styles.slide} key={index}>
        <div
          className={styles.imageContainer}
          style={{ backgroundImage: `url(${slide})` }}
        ></div>
      </div>
    ));
  };

  const handleRetry = () => {
    setImagesLoaded(false);
    setRetry(prev => prev + 1);
  };

  return (
    <div className={styles.container}>
      {imagesLoaded ? (
        <Slide easing="ease">
          {renderSlides()}
        </Slide>
      ) : (
        <div className={styles.error}>
          <p>Loading Images</p>
          <button onClick={handleRetry} className={styles.retryButton}>Retry</button>
        </div>
      )}
    </div>
  );
}
