import React from 'react';
import "../CSS/variable.css"

import './LandingPageHeader.css';
import Logo from '../../component-assets/logo123.svg'
import { Link, NavLink } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { provider_id } from '../../util/localStorage';

const LandingPageHeader = () => {
    const isLoggedIn = provider_id !== null;

    const scrollToFeatures = () => {
        scroll.scrollTo(document.getElementById('features').offsetTop, {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        });
    };


    return (
        <header className="header">
            <div className="header__logo">
                <img src={Logo} alt="Logo" />
            </div>
            <nav className="header__nav">
                <ul className="header__nav-list">
                    <li className="header__nav-item"><Link to="/landing-page">Features</Link></li>
                    <li className="header__nav-item"><Link to="/team">Team</Link></li>
                </ul>
            </nav>
            <div className="header__actions">
                 {isLoggedIn ? ( // Check if user is logged in
                    <Link to="/dashboard" className="header__button header__dashboard">Dashboard</Link>
                ) : (
                    <>
                        <Link to="/login-page" className="header__button header__login">Login</Link>
                        <Link to="/login-page" className="header__button header__signup">Sign Up</Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default LandingPageHeader;