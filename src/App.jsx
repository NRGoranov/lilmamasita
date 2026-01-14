import { useState, useEffect } from 'react'
import Snowfall from 'react-snowfall'
import confetti from 'canvas-confetti'
import styles from './App.module.css'
import AnimatedCat from './AnimatedCat'
import { getHeartImages } from './heartImages'

const messages = [
  "No",
  "Really sure??",
  "Think again…",
  "Last chance!",
  "Surely not?",
  "You'll regret this!",
  "Okay, fine 😭"
];

function App() {
  const [messageIndex, setMessageIndex] = useState(1);
  const [yesButtonSize, setYesButtonSize] = useState(20);
  const [heartImages, setHeartImages] = useState([]);
  const [yesClicked, setYesClicked] = useState(false);

  useEffect(() => {
    // Create heart images after component mounts
    const images = getHeartImages();
    setHeartImages(images);
  }, []);

  const handleNoClick = () => {
    if (!yesClicked) {
      setMessageIndex((prev) => (prev + 1) % messages.length);
      setYesButtonSize((prev) => prev * 1.5);
    }
  };

  const handleYesClick = () => {
    if (!yesClicked) {
      setYesClicked(true);
      
      // Create heart shape for confetti
      const heartShape = confetti.shapeFromText({ text: '❤️', scalar: 3 });
      
      // Create heart confetti bursts
      const duration = 3000;
      const end = Date.now() + duration;
      const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#dc143c', '#ff0000', '#8b0000', '#1a1a1a', '#2a2a2a'];

      const interval = setInterval(() => {
        if (Date.now() > end) {
          clearInterval(interval);
          return;
        }

        // Left side burst
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
          shapes: [heartShape],
        });

        // Right side burst
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
          shapes: [heartShape],
        });

        // Center burst
        confetti({
          particleCount: 6,
          angle: 90,
          spread: 60,
          origin: { x: 0.5, y: 0.5 },
          colors: colors,
          shapes: [heartShape],
        });

        // Top center burst
        confetti({
          particleCount: 5,
          angle: 90,
          spread: 70,
          origin: { x: 0.5, y: 0 },
          colors: colors,
          shapes: [heartShape],
        });
      }, 100);

      // Big initial burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.5 },
        colors: colors,
        shapes: [heartShape],
      });
    }
  };

  return (
    <>
      <Snowfall
        images={heartImages}
        snowflakeCount={150}
        speed={[0.5, 2]}
        wind={[-0.5, 0.5]}
        radius={[8, 15]}
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <main className={styles.wrap}>
        {!yesClicked ? (
          <>
            <h1 className={styles.title}>Will you be my Valentine?</h1>

            <div className={styles.buttons}>
              <button 
                className={styles.yesButton} 
                type="button"
                onClick={handleYesClick}
                style={{ fontSize: `${yesButtonSize}px` }}
              >
                Yes
              </button>
              <button 
                className={styles.noButton} 
                type="button"
                onClick={handleNoClick}
              >
                {messages[messageIndex]}
              </button>
            </div>

            <div className={styles.art} aria-hidden="true">
              <AnimatedCat />
            </div>
          </>
        ) : (
          <div className={styles.successContent}>
            <h1 className={styles.successTitle}>Yay! 💖</h1>
            <p className={styles.perfectPairText}>The perfect pair</p>
            <p className={styles.successText}>Best Valentine ever!!!</p>
            <div className={styles.art} aria-hidden="true">
              <AnimatedCat />
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
