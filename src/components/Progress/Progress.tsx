import React from 'react';
import { motion } from 'framer-motion';

import './Progress.styles.scss';

interface IProgress {
  value: number;
  label: string;
}

export const Progress = ({ value, label }: IProgress): JSX.Element => {
  const base = 255;
  const percentage = (value * 100) / base;

  return (
    <div className="progress-wrapper">
      <div className="progress-label">{label}</div>
      <div className="progress">
        <motion.div
          className="progress-bar"
          initial={{
            opacity: 0,
            width: '0%',
          }}
          animate={{
            opacity: 1,
            width: `${percentage}%`,
          }}
        >
          {value}
        </motion.div>
      </div>
    </div>
  );
};
