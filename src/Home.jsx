import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import StatsSection from './components/StatsSection';
import SectionConnector from './components/SectionConnector';

const Home = () => {
    return (
        <div className="home-page">
            <Hero />
            <SectionConnector />
            <StatsSection />
            <SectionConnector />
            <About />
        </div>
    );
};

export default Home;
