import React, { useState } from 'react';
import logout from '../../component-assets/logout.svg';
import crossIcon from '../../component-assets/cross-small.svg'
import { useNavigate } from 'react-router-dom';
import "../../pages/CSS/variable.css";

import './DriverMenu.css';

function DriverMenu({ isOpen, toggleMenu }) {
    let navigate = useNavigate();

    const closeMenu = () => {
      toggleMenu(); 
    };

    const handleViewPastDeliveries = () => {
        navigate('/past_deliveries');
        toggleMenu();
      };

      const handleLogout = () => {
        navigate('/driver_login');
        toggleMenu();
      };
  
    return (
      <div className="driver-menu">
        {isOpen && (
          <div className="menu">
             <button className='close-button' onClick={closeMenu}>
                  <img src={crossIcon} alt="Logout" style={{ width: '25px' }} />
            </button>
            <ul>
              <li className='li-past-delivery' onClick={handleViewPastDeliveries}>View Past Deliveries</li>
              <li>
                <button className='logout-btn' onClick={handleLogout}>
                  <img src={logout} alt="Logout" style={{ width: '16px' }} />
                  <p className='logout-text'>Logout</p>          
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  };

export default DriverMenu;