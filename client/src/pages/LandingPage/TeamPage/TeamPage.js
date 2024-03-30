import React, { useEffect, useRef } from "react";
import ProfileCard from './ProfileCard';
import SanjeevImg from '../../../component-assets/Sanjeev.svg'
import './TeamPage.css'
const TeamPage = () => {

    return (
        <div>
            <h2>The Team That Made It Possible</h2>
      <ProfileCard
        name="Name"
        title="iOS Developer, Full Stack Developer"
        description="Passionate software developer with a proven track record in iOS development, now expanding expertise in web and mobile design & development at Langara College. Skilled in app optimization and committed to driving innovation and success in every project undertaken."
        socialLinkText=""
        socialLink="https://www.example.com"
        img={SanjeevImg}
      />
      </div>
    );
}

export default TeamPage;