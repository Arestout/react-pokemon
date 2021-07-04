import React from 'react';
import { useLocation } from 'react-router-dom';

import './PageAnnouncer.styles.scss';

export const PageAnnouncer = (): JSX.Element => {
  const [title, setTitle] = React.useState('');
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (pathname === '/') {
      setTitle(`Navigated to homepage`);
      return;
    }
    setTitle(`Navigated to ${pathname.slice(1)} page`);
  }, [pathname]);

  return (
    <>
      <p
        className="sr-only"
        tabIndex={-1}
        aria-live="polite"
        aria-atomic="true"
      >
        {title}
      </p>
    </>
  );
};
