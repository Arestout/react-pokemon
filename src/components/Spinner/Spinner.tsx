import React, { useEffect, useState } from 'react';

import './Spinner.styles.scss';

export const Spinner = (): JSX.Element | null => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(true), 750);

    return () => clearTimeout(timer);
  });

  if (showSpinner) {
    return (
      <div className="spinner-overlay">
        <div className="spinner-container"></div>
      </div>
    );
  }

  return null;
};
