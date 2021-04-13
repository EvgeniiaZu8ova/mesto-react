import React from 'react';

import logoPath from '../images/vector.svg';

function Header() {
  return (
    <header className="header">
      <img src={logoPath} alt="Логотип" className="logo" />
    </header>
  );
}

export default Header;