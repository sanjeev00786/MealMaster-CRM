import React, { useEffect, useRef } from "react";
import './LandingPage.css';
import LandingPageHeader from "./LandingPageHeader";
import Section1Image from '../../component-assets/Graph-no-bg.png';
import CustomerDataImage from '../../component-assets/customer-data-image.svg';
import TrackingImage from '../../component-assets/TrackDelivery.svg';
import Scooter from '../../component-assets/scooter.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { Fade, Slide } from "react-awesome-reveal";

const LandingPage = () => {
    const scooterRef = useRef(null);

    useEffect(() => {
        AOS.init({
            duration: 500,
            easing: 'ease-in-out',
        });

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.body.clientHeight;
            const minOffset = 50;

            if (scooterRef.current) {
                const maxOffset = documentHeight - windowHeight;
                const percentage = (scrollTop / maxOffset) * 100;
                const offset = Math.max(minOffset, percentage * (window.innerWidth / 100));
                scooterRef.current.style.transform = `translateX(calc(-100% + ${offset}px))`;
            }
        };

        handleScroll();
        
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        AOS.refresh();
    });

    return (
        <div className="landing-page-container">
            <LandingPageHeader />
            <div className="first">
                <section className="landing-page-section">
                    <div className="landing-page-content">
                        <Slide>
                            <h1 className="landing-page-heading">Empower Your Tiffin Business with MealMaster CRM</h1>
                        </Slide>
                        <Fade delay={500} cascade damping={0.1} className="landing-page-subheading">
                            <p className="para1">Unlock Seamless Management, Efficient Delivery, And Data-Driven Growth with the CRM designed for Tiffin Businesses</p>
                        </Fade>
                        <div className="landing-page-buttons">
                            <button className="explore-feature-button" data-aos="fade-right">Explore Features</button>
                            <button className="get-started-button" data-aos="fade-left">Get Started</button>
                        </div>
                    </div>
                </section>
                <section className="landing-page-section">
                    <img src={Section1Image} alt="Tiffin Business" className="landing-page-image"/>
                </section>
            </div>

            <div id="features" className="second">
                <div className="customer-data-image">
                    <img src={CustomerDataImage} alt="Tiffin Business" className="image" data-aos="fade-right" />
                </div>
                <div className="second-right-content">
                    <h1 className="heading" data-aos="fade-left">Keep track of your customers effortlessly</h1>
                    <Fade delay={500} cascade damping={0.1} className="subheading">
                        <p className="para">Effortlessly add, edit, disable and manage customer information</p>
                    </Fade>
                </div>
            </div>

            <div className="third">
                <div className="tracking-data-image">
                    <img src={TrackingImage} alt="Tiffin Business" className="image" data-aos="fade-right" />
                </div>
                <div className="third-right-content">
                    <h1 className="heading" data-aos="fade-left">Live Delivery Tracking</h1>
                    <Fade delay={500} cascade damping={0.1} className="subheading">
                        <p className="para">Stay updated with live tracking of your deliveries in real-time.</p>
                    </Fade>
                </div>
            </div>
            <div className="scooter-image">
                <img src={Scooter} alt="scooter" className="image" ref={scooterRef} />
            </div>
        </div>

    );
};

export default LandingPage;