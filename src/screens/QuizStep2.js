import React, { useState, useEffect } from "react";
import styles from "./QuizStep2.module.css";
import instagramIcon from "../assets/instagram.png";
import InstagramEmoji from "../components/InstagramEmoji";

const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1200) return 'tablet';
  return 'desktop';
};

export default function QuizStep2({ onContinue }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    window.stepStartTime = Date.now();
  }, []);

  const handleUsernameChange = (e) => {
    let value = e.target.value;
    if (value.startsWith('@')) {
      value = value.slice(1);
    }
    setUsername(value);
    
    if (value.length > 2 && window.trackEvent) {
      window.trackEvent('quiz_username_entered', {
        step_index: 1,
        username: `@${value}`.replace(/./g, '*'),
        device_type: getDeviceType(),
        timestamp: Date.now()
      });
    }
  };

  const handleContinue = () => {
    if (username.length > 0) {
      if (window.trackEvent) {
        window.trackEvent('quiz_step_completed', {
          step_index: 1,
          step_id: 'username_input',
          value: `@${username}`.replace(/./g, '*'),
          ms_spent: Date.now() - (window.stepStartTime || Date.now()),
          device_type: getDeviceType(),
          timestamp: Date.now()
        });
      }
      onContinue(`@${username}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputSection}>
        <div className={styles.instagramWrapper}>
          <img 
            src={instagramIcon} 
            alt="Instagram" 
            className={styles.instagramIcon}
          />
        </div>
        
        <h2 className={styles.title}>
          Enter Your Instagram<br />Handle To Start
        </h2>
        
        <div className={styles.subtitle}>
          <span className={styles.lockIcon}>
            <InstagramEmoji emoji="🔒" size={18} />
          </span>
          <span>Your data is safe with us. We don't save your personal information or passwords</span>
        </div>

        <div className={styles.inputWrapper}>
          <span className={styles.atSymbol}>@</span>
          <input
            className={styles.input}
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            autoFocus
            spellCheck="false"
            autoComplete="off"
            autoCapitalize="none"
          />
        </div>
      </div>

      <button
        className={username.length > 0 ? styles.ctaEnabled : styles.ctaDisabled}
        disabled={username.length === 0}
        onClick={handleContinue}
      >
        Continue
      </button>
      
      <div className={styles.progressBar}>
        <div className={styles.progressFill}></div>
      </div>
    </div>
  );
}
