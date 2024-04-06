import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import frame from '../../../component-assets/Frame 1.svg'

const ProfileCard = ({ image, name, designation, description, linkedin, linkedinText }) => {


  return (
    <div className="profile-card">
      {/* <div className="bg-image-container">
        <img src={frame} alt="Profile" />
      </div> */}
      <div className="image-container">
        <img src={image} alt="Profile" />
      </div>
      <div className="profile-info">
        <h2>{name}</h2>
        <h3>{designation}</h3>
        <p>{description}</p>
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin}  />
          {linkedinText}
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;