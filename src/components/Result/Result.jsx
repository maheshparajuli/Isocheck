import React from 'react';
import styles from './Result.module.css';

export const Result = ({ result }) => {
  return (
    <div className={`${styles.container} ${result.isIsomorphic ? styles.success : styles.failure}`}>
      <h2 className={styles.title}>
        Results - {result.algorithm} Algorithm
      </h2>
      <div className={styles.content}>
        <div className={styles.resultItem}>
          <span className={styles.label}>Isomorphic:</span>
          <span className={styles.value}>
            {result.isIsomorphic ? 'Yes' : 'No'}
          </span>
        </div>
      </div>
    </div>
  );
};
