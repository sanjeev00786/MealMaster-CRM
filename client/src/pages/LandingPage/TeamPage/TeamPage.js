import React, { useEffect, useRef } from "react";
import ProfileCard from './ProfileCard';
import SanjeevImg from '../../../component-assets/Sanjeev.svg'
import Aryan from '../../../component-assets/Aryan.svg'
import Rohit from '../../../component-assets/Rohit.svg'
import Gurmeet from '../../../component-assets/Gurmeet.svg'
import Harsimran from '../../../component-assets/Harsimran.svg'
import Jaspreet from '../../../component-assets/Jaspreet.svg'
import Upkar from '../../../component-assets/Upkar.svg'
import Nandan from '../../../component-assets/Nandan.svg'
import './TeamPage.css'
import LandingPageHeader from "../LandingPageHeader";
import Lottie from 'react-lottie';
import animationData from './TeamPageAnimation.json';

const profiles = [
  {
    id: 1,
    name: 'Sanjeev Mehta',
    designation: 'iOS Developer/ Full Stack Developer',
    description: 'Passionate software developer with a proven track record in iOS development, now expanding expertise in web and mobile design & development at Langara College. Skilled in app optimization and committed to driving innovation and success in every project undertaken.',
    linkedin: 'https://www.linkedin.com/in/sanjeev--mehta/',
    image: SanjeevImg,
    linkedinText: '/sanjeev--mehta'
  },{
    id: 2,
    name: 'Rohit Kumar',
    designation: 'Full Stack Developer',
    description: 'Passionate full-stack developer adept in React, JavaScript, Express, and Tailwind CSS, with proficiency in Java and various frameworks. Dedicated to crafting robust and scalable solutions that push the boundaries of innovation.',
    linkedin: 'https://www.linkedin.com/in/rohit0205/',
    image: Rohit,
    linkedinText: '/rohit0205'
  },{
    id: 3,
    name: 'Gurmeet Singh',
    designation: 'Full Stack Developer',
    description: 'Gurmeet Is an enthusiastic Full Stack Developer with a keen interest in both front-end and back-end development. With a passion for design and a drive to master the full stack, He brings a versatile skill set to our team, poised to make valuable contributions across all aspects of development.',
    linkedin: 'https://www.linkedin.com/in/gurmeet--singh/',
    image: Gurmeet,
    linkedinText: '/gurmeet--singh'
  },{
    id: 4,
    name: 'Aryan Negi',
    designation: 'Full Stack Developer',
    description: 'Currently pursuing a career in Full Stack Web Development. I strive`s to make impactful contributions to the ever-evolving landscape of web app development.',
    linkedin: 'https://www.linkedin.com/in/nandan-nishad-179102166/',
    image: Aryan,
    linkedinText: '/aryannegi-'
  },{
    id: 5,
    name: 'Nandan Nishad',
    designation: 'Full Stack Developer',
    description: 'Just a regular dude who likes programming and building cool stuff with fancy tech.',
    linkedin: 'https://www.linkedin.com/in/nandan-nishad-179102166/',
    image: Nandan,
    linkedinText: '/Nandan-Nishad'
  },{
    id: 6,
    name: 'Harsimran Singh Arora',
    designation: 'UI/UX Designer',
    description: 'A UI/UX Designer, having experience at Samsung and Accenture who specializes in creating websites, apps, prototypes, and product interfaces. His work spans projects in insurance and professional learning platforms, both solo and collaborative. He focuses on making user-friendly and visually appealing products.',
    linkedin: 'https://www.linkedin.com/in/harsimransingharora/',
    image: Harsimran,
    linkedinText: '/harsimransingharora'
  },{
    id: 7,
    name: 'Jaspreet Singh',
    designation: 'UI/UX Designer',
    description: 'A passionate UI/UX designer, excel in crafting immersive digital experiences. He loves the world of digital art and spend time creating photo manipulation, that bring a unique and creative touch to his work.',
    linkedin: 'https://www.linkedin.com/in/jaspreetsingh28/',
    image: Jaspreet,
    linkedinText: '/jaspreetsingh28'
  },{
    id: 8,
    name: 'Upkar Singh',
    designation: 'UI/UX Designer',
    description: 'Currently advancing his expertise in Web and Mobile App Design with a Post-Degree Diploma from Langara College, Vancouver. He is passionate about blending creative design with user-centric technology to innovate digital experiences.',
    linkedin: 'https://www.linkedin.com/in/upkarsinghtech/',
    image: Upkar,
    linkedinText: '/upkarsinghtech'
  },
  // Add more profile objects here for other cards
];

const TeamPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

    return (
      <div>
        <LandingPageHeader />
        <h1 className="team-header">The Team That Made It Possible</h1>
        <div className="lottie-background">
        <Lottie options={defaultOptions} />
      </div>
      <div className="profile-grid">
      {profiles.map(profile => (
        <ProfileCard
          key={profile.id}
          name={profile.name}
          designation={profile.designation}
          description={profile.description}
          linkedin={profile.linkedin}
          image={profile.image}
          linkedinText={profile.linkedinText}
        />
      ))}
    </div>
    <div id="rain-container" className="rain-container"></div>
    </div>
    );
}

export default TeamPage;