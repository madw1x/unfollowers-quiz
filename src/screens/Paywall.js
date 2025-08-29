import React, { useEffect, useState } from "react";
import styles from "./Paywall.module.css";
import logo from "../assets/logo.svg";
import rocketIcon from "../assets/rocket.png";
import starIcon from "../assets/star.png";
import InstagramEmoji from "../components/InstagramEmoji";

const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1200) return 'tablet';
  return 'desktop';
};

export default function Paywall({ onPurchase }) {
  const [timer, setTimer] = useState(179);
  const [selectedPlan, setSelectedPlan] = useState('yearly');

  useEffect(() => {
    if (window.trackEvent) {
      window.trackEvent('paywall_shown', {
        offer_type: 'subscription',
        price: 19.99,
        plan: 'yearly',
        device_type: getDeviceType(),
        timestamp: Date.now()
      });
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const id = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(id);
    }
  }, [timer]);

  const timerDisplay = `${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(timer % 60).padStart(2, "0")}`;

  const handlePurchase = () => {
    if (window.trackEvent) {
      window.trackEvent('paywall_cta_click', {
        offer_type: 'subscription',
        price: selectedPlan === 'yearly' ? 19.99 : 4.99,
        plan: selectedPlan,
        step_index: 12,
        device_type: getDeviceType(),
        timestamp: Date.now()
      });
    }
    onPurchase();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <div className={styles.headerIcons}>
          <img src={rocketIcon} alt="Rocket" className={styles.rocketIcon} />
          <img src={starIcon} alt="Star" className={styles.starIcon} />
        </div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>
          Unlock Real Growth — Instantly<br />
          See Who Isn't Following You!
        </h1>

        <ul className={styles.features}>
          <li className={styles.feature}>
            <InstagramEmoji emoji="🔍" size={16} />
            <span>Find Ghost Followers, Bots, And Inactive Users Dragging Your Engagement Down</span>
          </li>
          <li className={styles.feature}>
            <InstagramEmoji emoji="⚡" size={16} />
            <span>Fast, Easy Cleanup To Boost Real Reach</span>
          </li>
          <li className={styles.feature}>
            <InstagramEmoji emoji="🤖" size={16} />
            <span>Smart AI Suggestions On Who To Keep Or Remove</span>
          </li>
          <li className={styles.feature}>
            <InstagramEmoji emoji="🔒" size={16} />
            <span>Full Privacy — No Instagram Login Needed</span>
          </li>
        </ul>

        <div className={styles.timerWrapper}>
          <div className={styles.timerBlock}>{timerDisplay}</div>
          <div className={styles.timerDesc}>Limited time: 80% off on yearly access — $0.38/week!</div>
        </div>

        <div className={styles.planSelection}>
          <div className={styles.planWrapper}>
            <div className={styles.saveBadge}>Save 80%</div>
            <div 
              className={`${styles.planOption} ${selectedPlan === 'yearly' ? styles.selected : ''}`}
              onClick={() => setSelectedPlan('yearly')}
            >
              <InstagramEmoji emoji="🎁" size={20} />
              <div className={styles.planDetails}>
                <div className={styles.planTitle}>Yearly Plan Only $0.38/week*</div>
                <div className={styles.planSubtitle}>Billed $19.99 annually</div>
              </div>
            </div>
          </div>

          <div 
            className={`${styles.planOption} ${selectedPlan === 'weekly' ? styles.selected : ''}`}
            onClick={() => setSelectedPlan('weekly')}
          >
            <InstagramEmoji emoji="💡" size={20} />
            <div className={styles.planDetails}>
              <div className={styles.planTitle}>Weekly plan also available</div>
              <div className={styles.planSubtitle}>$4.99/week</div>
            </div>
          </div>
        </div>

        <div className={styles.infoCards}>
          <div className={styles.infoRow}>
            <div className={styles.infoCard}>
              <InstagramEmoji emoji="⭐" size={24} />
              <div className={styles.infoNumber}>4.7</div>
              <div className={styles.infoText}>The App Store<br />(7,800+ Reviews)</div>
            </div>
            <div className={styles.infoCard}>
              <InstagramEmoji emoji="👥" size={24} />
              <div className={styles.infoText}>Trusted By Over</div>
              <div className={styles.infoNumber}>120k+</div>
              <div className={styles.infoText}>Users Worldwide</div>
            </div>
          </div>
          
          <div className={styles.infoRow}>
            <div className={styles.infoCard}>
              <InstagramEmoji emoji="🔒" size={20} />
              <div className={styles.infoLabel}>PRIVACY</div>
              <div className={styles.infoText}>We Don't Store Or<br />Save Your Data</div>
            </div>
            <div className={styles.infoCard}>
              <InstagramEmoji emoji="💰" size={20} />
              <div className={styles.infoLabel}>30-DAY</div>
              <div className={styles.infoText}>Money-Back<br />Guarantee</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.cta} onClick={handlePurchase}>
          Clean My Followers — Let's Go!
        </button>
      </div>
    </div>
  );
}
