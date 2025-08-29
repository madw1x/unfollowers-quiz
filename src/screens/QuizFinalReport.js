import React, { useEffect } from "react";
import styles from "./QuizFinalReport.module.css";
import InstagramEmoji from "../components/InstagramEmoji";

const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1200) return 'tablet';
  return 'desktop';
};

export default function QuizFinalReport({ username, answers, onShowPaywall }) {
  useEffect(() => {
    if (window.trackEvent) {
      window.trackEvent('quiz_analysis_shown', {
        perc_nonmutual: 25,
        perc_bots: 7,
        perc_inactive: 15,
        device_type: getDeviceType(),
        timestamp: Date.now()
      });
    }
  }, []);

  const handleShowPaywall = () => {
    if (window.trackEvent) {
      window.trackEvent('quiz_report_cta_click', {
        perc_nonmutual: 25,
        perc_bots: 7,
        perc_inactive: 15,
        device_type: getDeviceType(),
        timestamp: Date.now()
      });
    }
    onShowPaywall();
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>We Found:</h2>
        
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statIcon}>
                <InstagramEmoji emoji="💔" size={24} />
              </div>
              <div className={styles.statInfo}>
                <div className={styles.statNumberWrapper}>
                  <div className={styles.statNumber}>178</div>
                </div>
                <div className={styles.statLabel}>Non-Mutual</div>
              </div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statIcon}>
                <InstagramEmoji emoji="🤖" size={24} />
              </div>
              <div className={styles.statInfo}>
                <div className={styles.statNumberWrapper}>
                  <div className={styles.statNumber}>48</div>
                </div>
                <div className={styles.statLabel}>Suspicious Bots</div>
              </div>
            </div>
          </div>
          
          <div className={styles.statCardFull}>
            <div className={styles.statContent}>
              <div className={styles.statIcon}>
                <InstagramEmoji emoji="🔻" size={24} />
              </div>
              <div className={styles.statInfo}>
                <div className={styles.statNumberWrapper}>
                  <div className={styles.statNumber}>178</div>
                </div>
                <div className={styles.statLabel}>Inactive In Last Year</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.desc}>
          <div className={styles.detail}>
            <strong>Detailed Analytics Available After Cleanup!</strong>
          </div>
          
          <div className={styles.ctaNote}>
            <div className={styles.noteIcon}>
              <InstagramEmoji emoji="👥" size={20} />
            </div>
            <div className={styles.noteText}>
              <div className={styles.todayText}>Today We Detected 94 Unwanted Followers</div>
              <div className={styles.subText}>— Removing Them Can Increase Engagement By <strong>15%!</strong></div>
            </div>
          </div>
        </div>
      </div>
      
      <button className={styles.cta} onClick={handleShowPaywall}>
        Show full report & start cleanup →
      </button>
    </div>
  );
}
