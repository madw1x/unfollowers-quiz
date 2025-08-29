import React, { useEffect, useState } from "react";
import styles from "./QuizStep12.module.css";
import InstagramEmoji from "../components/InstagramEmoji";

const analysisSteps = [
  "Analyzing Your Instagram Followers...",
  "Checking for fake accounts...",
  "Scanning for bots and inactive users...",
  "Calculating engagement rates...",
  "Detecting non-mutual connections...",
  "Analyzing follower quality...",
  "Processing account activity...",
  "Generating insights...",
  "Preparing your detailed report...",
  "Almost ready..."
];

const getUserInitial = (username) => {
  if (!username) return 'U';
  return username.replace('@', '').charAt(0).toUpperCase();
};

const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1200) return 'tablet';
  return 'desktop';
};

export default function QuizStep12({ username, onContinue }) {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const userInitial = getUserInitial(username);

  useEffect(() => {
    if (window.trackEvent) {
      window.trackEvent('analysis_started', {
        username: username?.replace(/./g, '*'),
        device_type: getDeviceType(),
        timestamp: Date.now()
      });
    }
  }, [username]);

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        const newProgress = Math.min(progress + 10, 100);
        setProgress(newProgress);
        
        const newStepIndex = Math.floor((newProgress / 100) * analysisSteps.length);
        setCurrentStepIndex(Math.min(newStepIndex, analysisSteps.length - 1));
        
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [progress]); 

  useEffect(() => {
    if (progress >= 100) {
      if (window.trackEvent) {
        window.trackEvent('analysis_completed', {
          username: username?.replace(/./g, '*'),
          device_type: getDeviceType(),
          timestamp: Date.now()
        });
      }
      
      const completionTimer = setTimeout(() => onContinue(), 1000);
      return () => clearTimeout(completionTimer);
    }
  }, [progress, onContinue, username]); 

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.usernameHeader}>
          Analyzing {username}
        </div>

        <div className={styles.animationArea}>
          <div className={styles.floatingEmoji} style={{"--delay": "0s"}}>
            <InstagramEmoji emoji="❌" size={20} />
          </div>
          <div className={styles.floatingEmoji} style={{"--delay": "0.5s"}}>
            <InstagramEmoji emoji="⭐" size={20} />
          </div>
          <div className={styles.floatingEmoji} style={{"--delay": "1s"}}>
            <InstagramEmoji emoji="🔥" size={20} />
          </div>
          <div className={styles.floatingEmoji} style={{"--delay": "1.5s"}}>
            <InstagramEmoji emoji="👥" size={20} />
          </div>
          <div className={styles.floatingEmoji} style={{"--delay": "2s"}}>
            <InstagramEmoji emoji="📊" size={20} />
          </div>
          <div className={styles.floatingEmoji} style={{"--delay": "2.5s"}}>
            <InstagramEmoji emoji="💎" size={20} />
          </div>
          
          <div className={styles.userInitialWrapper}>
            <div className={styles.userInitial}>
              {userInitial}
            </div>
          </div>
        </div>

        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>
            {analysisSteps[currentStepIndex]}
          </h2>
        </div>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={styles.progressText}>
          {progress}% Complete
        </div>
      </div>
    </div>
  );
}
