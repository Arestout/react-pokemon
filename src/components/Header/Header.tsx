import React from 'react';
import { Link } from 'react-router-dom';

import './Header.styles.scss';

export const Header = (): JSX.Element => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="header__logo">
          <img
            src="https://cdn2.bulbagarden.net/upload/4/4b/Pok%C3%A9dex_logo.png"
            alt="logo"
            width="100"
          />
        </Link>
      </div>
    </header>
  );
};
