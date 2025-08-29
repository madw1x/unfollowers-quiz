import React from "react";
import styles from "./Success.module.css";

export default function Success() {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrap}>
        <span className={styles.icon}>🎉</span>
      </div>
      <h2 className={styles.title}>Access Unlocked!</h2>
      <p className={styles.text}>
        You've unlocked all insights and tools.<br/>
        Start cleaning your followers and watch your engagement grow!
      </p>
      <button
        className={styles.cta}
        onClick={() => window.location.reload()}
      >
        Go to Dashboard
      </button>
    </div>
  );
}
