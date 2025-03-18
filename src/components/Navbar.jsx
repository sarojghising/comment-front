// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        {/* <li style={styles.li}>
          <Link to="/comments" style={styles.link}>Comments</Link>
        </li>
        <li style={styles.li}>
          <Link to="/comments/create" style={styles.link}>Create Comment</Link>
        </li>
        <li style={styles.li}>
          <Link to="/login" style={styles.link}>Login</Link>
        </li>
        <li style={styles.li}>
          <Link to="/register" style={styles.link}>Register</Link>
        </li> */}
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#333',
    padding: '10px',
  },
  ul: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'end',
    margin: 0,
    padding: 0,
  },
  li: {
    margin: '0 10px',
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    fontSize: '18px',
  },
};

export default Navbar;