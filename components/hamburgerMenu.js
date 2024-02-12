// components/HamburgerMenu.js
import React from 'react';
import { slide as Menu } from 'react-burger-menu';

const HamburgerMenu = () => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/about">
        About
      </a>
      <a className="menu-item" href="/contact">
        Contact
      </a>
    </Menu>
  );
};

export default HamburgerMenu;