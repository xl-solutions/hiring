import React from 'react';
import { NavLink } from "react-router-dom"
import { Logo } from '../Logo';
import styles from './Header.module.sass';

const Header = ({user}) => (
    <header className={styles['main-header']}>
      <Logo className={styles.logo} />
      <nav className={styles['header-nav']}>
          <NavLink to="/" className={styles['nav-button']}>Home</NavLink>
      </nav>
      <div className={styles['person-info']}>
        <span className="bold">{user.name}</span>
        <span>{user.role}</span>
      </div>
    </header>
);

export default Header;