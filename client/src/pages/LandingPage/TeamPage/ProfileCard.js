import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const ProfileCard = ({ name, title, description, socialLinkText, socialLink, img}) => {
  return (
    <div className="profile-card">
        <div className='profile-bg'>

        </div>
      <img src="" alt="profile avatar" />  Replace with actual avatar image
      <div className="profile-info">
        <h2>{name}</h2>
        <p>{title}</p>
        <p>{description}</p>
      </div>
      <div className="social-link">
        <a href={socialLink}>{socialLinkText} <FontAwesomeIcon icon={faLinkedin} /></a>
      </div>
    </div>
  );
};

export default ProfileCard;