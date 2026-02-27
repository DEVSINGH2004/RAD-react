import React from 'react';

const AboutServices = () => {
    return (
        <section className="about-services">
            <div className="about-services-glow">
                <img src="/assets/glow.png" alt="" />
            </div>
            <div className="about-card">
                <img src="/assets/glow.png" className="about-card-bg-glow" alt="" />
                <div className="about-text">
                    <h2>ABOUT US</h2>
                    <p>Fandom is the new frontier of growth, and RAD Worldwide leads it by connecting sports, entertainment, and
                        creator IPs with fans through meaningful products and collaborations. We go beyond licensing to build
                        cultural connections that turn attention into loyalty and relevance into revenue.</p>
                </div>
                <div className="about-image">
                    <img src="/assets/aboutus-img.png" className="about-main-img" alt="About" />
                </div>
            </div>

            <div className="service-stack-scene">
                <h2 className="services-title">SERVICES</h2>
                <div className="service-stack-inner">

                    <div className="service-card premium-card" data-card="4">
                        <img src="/assets/glow.png" className="premium-glow-left" alt="" />
                        <img src="/assets/glow.png" className="premium-glow-right" alt="" />
                        <img src="/assets/grid.png" className="premium-grid" alt="" />
                        <div className="service-content premium-content">
                            <span className="premium-number">04</span>
                            <h3>Fan Engagement<br />& Community</h3>
                            <p>We design fan-first experiences that go beyond content — activations, drops, and community programmes that turn passive audiences into active brand advocates and long-term revenue streams.</p>
                        </div>
                        <img src="/assets/cap.png" className="premium-car" alt="Cap" />
                    </div>

                    <div className="service-card premium-card" data-card="3">
                        <img src="/assets/glow.png" className="premium-glow-left" alt="" />
                        <img src="/assets/glow.png" className="premium-glow-right" alt="" />
                        <img src="/assets/grid.png" className="premium-grid" alt="" />
                        <div className="service-content premium-content">
                            <span className="premium-number">03</span>
                            <h3>Creator & Talent<br />IP Development</h3>
                            <p>We work with creators and talent to build sustainable IP ecosystems — from merchandise strategy and brand partnerships to long-term licensing structures that grow with their audience.</p>
                        </div>
                        <img src="/assets/gamepad.png" className="premium-car" alt="Gamepad" />
                    </div>

                    <div className="service-card premium-card" data-card="2">
                        <img src="/assets/glow.png" className="premium-glow-left" alt="" />
                        <img src="/assets/glow.png" className="premium-glow-right" alt="" />
                        <img src="/assets/grid.png" className="premium-grid" alt="" />
                        <div className="service-content premium-content">
                            <span className="premium-number">02</span>
                            <h3>Brand & IP<br />Partnerships</h3>
                            <p>We connect brands with the right sports, entertainment, and creator IPs to build co-branded products and campaigns that feel culturally authentic and drive measurable commercial results.</p>
                        </div>
                        <img src="/assets/shirt.png" className="premium-car" alt="Shirt" />
                    </div>

                    <div className="service-card premium-card" data-card="1">
                        <img src="/assets/glow.png" className="premium-glow-left" alt="" />
                        <img src="/assets/glow.png" className="premium-glow-right" alt="" />
                        <img src="/assets/grid.png" className="premium-grid" alt="" />
                        <div className="service-content premium-content">
                            <span className="premium-number">01</span>
                            <h3>Licensing Strategy<br />& Commercial Design</h3>
                            <p>We build licensing strategies that scale. From IP positioning and category planning to territory strategy and deal structures, we align creative ambition with revenue goals — creating clear, decision-ready roadmaps for growth.</p>
                        </div>
                        <img src="/assets/car.png" className="premium-car" alt="Car" />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutServices;
