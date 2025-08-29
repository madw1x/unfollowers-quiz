import React, { useState, useEffect } from "react";
import styles from "./QuizStep1.module.css";
import InstagramEmoji from "../components/InstagramEmoji";

const options = [
  {
    text: "Ghost followers silently killing my engagement",
    icon: "👻",
    id: "ghost_followers"
  },
  {
    text: "People who don't follow me back", 
    icon: "🚫",
    id: "non_mutuals"
  },
  {
    text: "Fake accounts and bots cluttering my list",
    icon: "🤖", 
    id: "bots"
  },
  {
    text: "Low activity and weak interaction",
    icon: "📉",
    id: "low_activity"  
  },
  {
    text: "Let you find all issues for me!",
    icon: "👀",
    id: "find_all"
  }
];

const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1200) return 'tablet';
  return 'desktop';
};

export default function QuizStep1({ onContinue }) {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    window.stepStartTime = Date.now();
  }, []);

  const handleOptionClick = (idx) => {
    const newSelected = selected.includes(idx) 
      ? selected.filter(i => i !== idx)
      : [...selected, idx];
    
    setSelected(newSelected);

    if (window.trackEvent) {
      window.trackEvent('quiz_option_selected', {
        step_index: 0,
        option_index: idx,
        option_text: options[idx].text,
        device_type: getDeviceType(),
        timestamp: Date.now()
      });
    }
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      if (window.trackEvent) {
        window.trackEvent('quiz_step_completed', {
          step_index: 0,
          step_id: 'concerns_selection',
          value: selected.map(i => options[i].id),
          ms_spent: Date.now() - (window.stepStartTime || Date.now()),
          device_type: getDeviceType(),
          timestamp: Date.now()
        });
      }
      onContinue(selected);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h2 className={styles.title}>Ready To Discover Who's Really Following You?</h2>
          <p className={styles.subtitle}>
            What concerns you most: ghost followers, non-mutuals, bots, or low engagement?
          </p>
        </div>

        <div className={styles.options}>
          {options.map((opt, idx) => (
            <div
              key={opt.id}
              className={`${styles.option} ${
                selected.includes(idx) ? styles.selected : ""
              }`}
              onClick={() => handleOptionClick(idx)}
            >
              <div className={styles.optionContent}>
                <div className={styles.iconWrapper}>
                  <InstagramEmoji emoji={opt.icon} size={20} />
                </div>
                <span className={styles.optionText}>{opt.text}</span>
                <div className={styles.radioWrapper}>
                  {selected.includes(idx) ? (
                    <div className={styles.checkmark}>✓</div>
                  ) : (
                    <div className={styles.radio}></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.buttonSection}>
        <button
          className={selected.length > 0 ? styles.ctaEnabled : styles.ctaDisabled}
          disabled={selected.length === 0}
          onClick={handleContinue}
        >
          Continue
        </button>
        
        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>
      </div>
    </div>
  );
}
