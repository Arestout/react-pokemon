import React from 'react';
import { motion } from 'framer-motion';

import { Heading } from 'components/Heading';

import './ErrorMessage.styles.scss';

const easing = [0.175, 0.85, 0.42, 0.96];
const animationVariants = {
  exit: {
    y: 150,
    opacity: 0,
    transition: { duration: 0.5, ease: [0.175, 0.85, 0.42, 0.96] },
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easing,
    },
  },
};

type ErrorMessage = { errorMessage: string };

export const ErrorMessage = ({ errorMessage }: ErrorMessage): JSX.Element => {
  return (
    <motion.div
      initial="exit"
      animate="enter"
      exit="exit"
      variants={animationVariants}
      className="error__wrapper"
    >
      <div className="error__image-wrapper">
        <img src="https://i.imgur.com/5MZ2VS0.png" alt="pikachu" width="200" />
      </div>
      <div className="error__content">
        <Heading tag="h4" className="error__heading">
          Oh! Something went wrong!
        </Heading>
        {errorMessage}
      </div>
    </motion.div>
  );
};
