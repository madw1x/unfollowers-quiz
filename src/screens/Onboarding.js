import React, { useEffect } from "react";
import styles from "./Onboarding.module.css";
import storiesBlock from "../assets/Stories.png";
import rocketIcon from "../assets/rocket.png";
import starIcon from "../assets/star.png";

const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1200) return 'tablet';
  return 'desktop';
};

export default function Onboarding({ onStart }) {
  useEffect(() => {
    // Event: quiz_viewed - Пользователь зашел на первую страницу квиза
    if (window.trackEvent) {
      window.trackEvent('quiz_viewed', {
        referrer: document.referrer || 'direct',
        device_type: getDeviceType(),
        timestamp: Date.now()
      });
    }
  }, []);

  const handleStart = () => {
    // Event: quiz_started - Нажата кнопка стартовки квиза
    if (window.trackEvent) {
      window.trackEvent('quiz_started', {
        step_index: 0,
        device_type: getDeviceType(),
        timestamp: Date.now()
      });
    }
    onStart();
  };

  return (
    <div className={styles.wrapper}>
   
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            Discover The Truth About Your Instagram Followers — Is Your Audience Really Engaged?
          </h2>
          <p className={styles.subtitle}>
            Unlock your follower secrets! Find ghost followers, bots, and inactive accounts dragging your engagement down
          </p>
        </header>

        <div className={styles.storiesSection}>
          <div className={styles.leftBubble}>
            <img src={rocketIcon} alt="rocket" className={styles.iconImg} />
          </div>
          <div className={styles.rightBubble}>
            <img src={starIcon} alt="star" className={styles.iconImg} />
          </div>
          
          <div className={styles.speechBubble}>
            Who's Really Following You?
            <div className={styles.bubbleArrow}></div>
          </div>
          
          <img src={storiesBlock} className={styles.storiesBg} alt="Stories" draggable={false} />
        </div>

        <div className={styles.steps}>
          You're <b>0</b> steps away from a cleaner,<br/>healthier profile
        </div>

      
        <button className={`${styles.cta} ${styles.ctaMobile}`} onClick={handleStart}>
          Start the quiz
        </button>
      </div>

     
      <div className={styles.stickyFooter}>
        <button className={styles.ctaDesktop} onClick={handleStart}>
          Start the quiz
        </button>
      </div>
    </div>
  );
}
