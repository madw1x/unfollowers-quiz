import React, { useEffect } from "react";
import styles from "./QuizResult.module.css";
import InstagramEmoji from "../components/InstagramEmoji";

const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1200) return 'tablet';
  return 'desktop';
};

export default function QuizResult({ onShowReport }) {
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

  const handleShowReport = () => {
    if (window.trackEvent) {
      window.trackEvent('quiz_report_cta_click', {
        perc_nonmutual: 25,
        perc_bots: 7,
        perc_inactive: 15,
        device_type: getDeviceType(),
        timestamp: Date.now()
      });
    }
    onShowReport();
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Analyze Now — See Results<br />
          Faster Than Most!
        </h1>

        <div className={styles.statsCard}>
          <div className={styles.chartContainer}>
            <div className={styles.bar} style={{height: '45%', background: '#34d399'}}></div>
            <div className={styles.bar} style={{height: '65%', background: '#3b82f6'}}></div>
            <div className={styles.bar} style={{height: '100%', background: '#8b5cf6'}}></div>
            <div className={styles.bar} style={{height: '85%', background: '#f59e0b'}}></div>
          </div>
          <div className={styles.statsText}>
            <div className={styles.percentageText}>
              You're Ahead Of <span className={styles.highlight}>82% Of Users</span>
            </div>
            <div className={styles.subText}>
              — Already Caring About Your<br />
              Profile Health!
            </div>
          </div>
        </div>

        <div className={styles.benefitText}>
          <strong>Gain Up To 30% More Likes<br />
          — Learn How!</strong>
        </div>

        <div className={styles.findingCard}>
          <div className={styles.findingIcon}>
            <InstagramEmoji emoji="🔥" size={28} />
          </div>
          <div className={styles.findingContent}>
            <div className={styles.findingTitle}>Leaving Unwanted Followers</div>
            <div className={styles.findingDesc}>Reduces Your Real Reach And<br />Attention</div>
          </div>
        </div>

        <div className={styles.resultCard}>
          <div className={styles.resultIcon}>
            <InstagramEmoji emoji="💔" size={24} />
          </div>
          <div className={styles.resultText}>
            <strong>We Found<br />
            7% of your following aren’t mutual.</strong><br />
            <span className={styles.percentage}>These accounts don’t follow you back and may lower engagement.</span>
          </div>
        </div>

        <div className={styles.warningCard}>
          <div className={styles.warningIcon}>
            <InstagramEmoji emoji="⚠️" size={24} />
          </div>
          <div className={styles.warningText}>
            <strong>4% of accounts detected may be suspicious.<br />
            </strong>Removing them can improve your profile’s health and safety.<br />
          
          </div>
        </div>

        <button className={styles.cta} onClick={handleShowReport}>
          Show detailed report
        </button>
      </div>
    </div>
  );
}
