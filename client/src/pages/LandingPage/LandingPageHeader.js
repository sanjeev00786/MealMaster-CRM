import React from 'react';
import './LandingPageHeader.css';
import Logo from '../../component-assets/logo123.svg'
import { Link, NavLink } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

const LandingPageHeader = () => {

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
                    <li className="header__nav-item"><NavLink to="#" onClick={scrollToFeatures}>Features</NavLink></li>
                    <li className="header__nav-item"><a href="#pricing">Pricing</a></li>
                    <li className="header__nav-item"><a href="#about">About Us</a></li>
                </ul>
            </nav>
            <div className="header__actions">
                <Link to="/login-page" className="header__button header__login">Login</Link>
                <Link to="/login-page" className="header__button header__signup">Sign Up</Link>
            </div>
        </header>
    );
};

export default LandingPageHeader;