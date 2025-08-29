import React, { useState, useEffect } from "react";
import styles from "./QuizStep9.module.css";
import InstagramEmoji from "../components/InstagramEmoji";

const options = [
  { 
    emoji: "🔕", 
    label: "Less noise and fake followers",
    id: "less_noise"
  },
  { 
    emoji: "📈", 
    label: "Higher reach and engagement",
    id: "higher_reach"
  },
  { 
    emoji: "😍", 
    label: "More real and active followers",
    id: "real_followers"
  },
  { 
    emoji: "👌", 
    label: "Better profile appearance",
    id: "better_profile"
  },
  { 
    emoji: "❓", 
    label: "Other",
    id: "other"
  }
];

const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1200) return 'tablet';
  return 'desktop';
};

export default function QuizStep9({ onContinue }) {
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
        step_index: 8,
        option_index: idx,
        option_text: options[idx].label,
        device_type: getDeviceType(),
        timestamp: Date.now()
      });
    }
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      if (window.trackEvent) {
        window.trackEvent('quiz_step_completed', {
          step_index: 8,
          step_id: 'cleaning_improvements',
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
      <div className={styles.header}>
        <h2 className={styles.title}>
          What Improvements Do You Notice After Cleaning?
        </h2>
        <p className={styles.subtitle}>Select one or more options</p>
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
                <InstagramEmoji emoji={opt.emoji} size={20} />
              </div>
              <span className={styles.optionText}>{opt.label}</span>
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
  );
}
