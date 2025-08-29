import React, { useEffect } from "react";
import styles from "./QuizStep8.module.css";
import InstagramEmoji from "../components/InstagramEmoji";

const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1200) return 'tablet';
  return 'desktop';
};

export default function QuizStep8({ onContinue }) {
  useEffect(() => {
    window.stepStartTime = Date.now();
  }, []);

  const handleContinue = () => {
    if (window.trackEvent) {
      window.trackEvent('quiz_step_completed', {
        step_index: 7,
        step_id: 'statistics_preview',
        value: 'view_full_report',
        ms_spent: Date.now() - (window.stepStartTime || Date.now()),
        device_type: getDeviceType(),
        timestamp: Date.now()
      });
    }
    onContinue();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Average User Removes<br />
          37 Followers In Cleanup — Ready<br />
          To Beat The Record?
        </h2>
      </div>

      <div className={styles.options}>
        <div className={styles.mainCard}>
          <div className={styles.mainIcon}>
            <InstagramEmoji emoji="👥" size={32} />
          </div>
          <div className={styles.mainStats}>
            <div className={styles.percentageText}>
              <strong>70% Of Cleaned Accounts</strong> See<br />
              Immediate Growth In Reach
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={styles.statIcon}>
              <InstagramEmoji emoji="📊" size={24} />
            </div>
            <div className={styles.statTitle}>
              <strong>Your Followers Are 12%<br />
              Inactive —</strong> Cleaning Them<br />
              Boosts Engagement.
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={styles.statIcon}>
              <InstagramEmoji emoji="🤖" size={24} />
            </div>
            <div className={styles.statTitle}>
              <strong>X Bots Identified —</strong> Removing<br />
              Them Improves Profile Quality
            </div>
          </div>
        </div>
      </div>

      <button className={styles.ctaEnabled} onClick={handleContinue}>
        View full report
      </button>
    </div>
  );
}
