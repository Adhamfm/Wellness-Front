import { useState } from 'react';
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styles from "./Slider.module.css";

export default function Slider(props) {
  const [retry, setRetry] = useState(0);

  const renderSlides = () => {
    try {
      return props.images.map((slide, index) => (
        <div className={styles.slide} key={index}>
          <div
            className={styles.imageContainer}
            style={{ backgroundImage: `url(${props.images[index]})` }}
          ></div>
        </div>
      ));
    } catch (error) {
      console.error("Error while mapping images:", error);
      throw error;
    }
  };

  const handleRetry = () => {
    setRetry(prev => prev + 1);
  };

  return (
    <div className={styles.container}>
      <Slide easing="ease">
        {(() => {
          try {
            return renderSlides();
          } catch (error) {
            return (
              <div className={styles.error}>
                <p>Failed to load images.</p>
                <button onClick={handleRetry} className={styles.retryButton}>Retry</button>
              </div>
            );
          }
        })()}
      </Slide>
    </div>
  );
}
