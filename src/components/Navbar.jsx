// src/components/Navbar.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../redux/slices/authSlice';

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutUser());
    };
    return (
        <nav style={styles.nav}>
            <ul style={styles.ul}>
                <li style={styles.li}>
                    <Link to="/" style={styles.link}>Home</Link>
                </li>
                {
                    token && (
                       
                            <button style={styles.link} onClick={handleLogout}>Logout</button>
                        
                    )
                }
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