import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import Navbar from './components/Navbar';
import Intro from './components/Intro';
import Hero from './components/Hero';
import AboutServices from './components/AboutServices';
import Partners from './components/Partners';
import Projects from './components/Projects';
import WhyContact from './components/WhyContact';
import Footer from './components/Footer';

import { initLenis, initAnimations } from './animations';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function App() {
    const container = useRef(null);

    useGSAP(() => {
        // 1. Initialize Lenis inside the GSAP context
        const lenis = initLenis();

        // 2. Initialize all GSAP timelines and scrubbers
        initAnimations(lenis);

        // 3. Cleanup function when component unmounts
        return () => {
            lenis.destroy();
        };
    }, { scope: container });

    return (
        <div ref={container} className="app-container">
            <Navbar />
            <div className="scroll-container">
                <Intro />
                <Hero />
                <div className="page-2-wrapper">
                    <AboutServices />
                    <Partners />
                    <Projects />
                </div>
                <div className="page-3-wrapper">
                    <WhyContact />
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default App;
