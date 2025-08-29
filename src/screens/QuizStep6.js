import React, { useState, useEffect } from "react";
import styles from "./QuizStep6.module.css";
import InstagramEmoji from "../components/InstagramEmoji";

const options = [
  { 
    emoji: "🔔", 
    label: "Yes, please remind me",
    id: "remind_yes"
  },
  { 
    emoji: "🛠️", 
    label: "No, I'll do it myself",
    id: "remind_no"
  },
  { 
    emoji: "⏳", 
    label: "Maybe later",
    id: "remind_later"
  }
];

const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1200) return 'tablet';
  return 'desktop';
};

export default function QuizStep6({ onContinue }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    window.stepStartTime = Date.now();
  }, []);

  const handleOptionClick = (idx) => {
    setSelected(idx);

    if (window.trackEvent) {
      window.trackEvent('quiz_option_selected', {
        step_index: 5,
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
          step_index: 5,
          step_id: 'reminder_preference',
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
          Would You Like Us To Remind You Regularly To Clean Your Followers?
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
