import React, { useState, useEffect } from "react";
import styles from "./QuizStep7.module.css";
import InstagramEmoji from "../components/InstagramEmoji";

const options = [
  { 
    emoji: "📅", 
    label: "Monthly",
    id: "monthly"
  },
  { 
    emoji: "⏳", 
    label: "Every 3-6 months",
    id: "quarterly"
  },
  { 
    emoji: "📆", 
    label: "Once a year",
    id: "yearly"
  },
  { 
    emoji: "⚠️", 
    label: "Only when I notice a problem",
    id: "problem_based"
  }
];

const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1200) return 'tablet';
  return 'desktop';
};

export default function QuizStep7({ onContinue }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    window.stepStartTime = Date.now();
  }, []);

  const handleOptionClick = (idx) => {
    setSelected(idx);
    
    if (window.trackEvent) {
      window.trackEvent('quiz_option_selected', {
        step_index: 6,
        option_index: idx,
        option_text: options[idx].label,
        device_type: getDeviceType(),
        timestamp: Date.now()
      });
    }
  };

  const handleContinue = () => {
    if (selected !== null) {
      if (window.trackEvent) {
        window.trackEvent('quiz_step_completed', {
          step_index: 6,
          step_id: 'cleaning_frequency',
          value: options[selected].id,
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
      <div className={styles.header}>
        <h2 className={styles.title}>
          How often do you think cleaning followers should happen?
        </h2>
        <p className={styles.subtitle}>Select one option</p>
      </div>

      <div className={styles.options}>
        {options.map((opt, idx) => (
          <div
            key={opt.id}
            className={`${styles.option} ${selected === idx ? styles.selected : ""}`}
            onClick={() => handleOptionClick(idx)}
          >
            <div className={styles.optionContent}>
              <div className={styles.emojiWrapper}>
                <InstagramEmoji emoji={opt.emoji} size={22} />
              </div>
              <span className={styles.optionText}>{opt.label}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        className={selected !== null ? styles.ctaEnabled : styles.ctaDisabled}
        disabled={selected === null}
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
