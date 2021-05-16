import React from 'react';
import { NavLink } from "react-router-dom"
import styles from './Header.module.sass';

const Header = () => (
    <header className={styles['main-header']}>
      <nav className={styles['header-nav']}>
          <NavLink to="/" className={styles['nav-button']}>Home</NavLink>
      </nav>
    </header>
);

export default Header;