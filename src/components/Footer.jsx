import React from 'react';

const Footer = () => {
    return (
        <footer className="rad-footer">
            <img src="/assets/vector.png" className="footer-vector" alt="RAD WORLDWIDE" />
            <img src="/assets/ellipse 47.png" className="footer-ellipse" alt="" />
            <div className="footer-logo">
                <img src="/assets/purp_gif-1.gif" alt="RAD Logo" />
            </div>

            <div className="footer-links">
                <div className="footer-col">
                    <a href="#">Who are we</a>
                    <a href="#">Services</a>
                    <a href="#">Who we partner with</a>
                    <a href="#">About</a>
                    <a href="#">Projects/Clients</a>
                    <a href="#">Why Rad Worldwide</a>
                </div>
                <div className="footer-col footer-newsletter">
                    <span className="newsletter-title">Subscribe to<br />Licensing Radar<br />Newsletter</span>
                    <a href="#" className="newsletter-btn">READ THE NEWSLETTER</a>
                </div>
                <div className="footer-col footer-col-2">
                    <a href="#">Terms &amp; Conditions</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Cookie Policy</a>
                    <a href="#">Accessibility</a>
                    <div className="footer-social">
                        <span className="social-label">Follow us on</span>
                        <div className="social-icons">
                            <a href="#" className="social-icon si-fb">
                                <img src="/assets/facebook.png" alt="" />
                            </a>
                            <a href="#" className="social-icon si-ig">
                                <img src="/assets/instagram.png" alt="" />
                            </a>
                            <a href="#" className="social-icon si-li">
                                <img src="/assets/linkedinlogo.png" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom-bar">
                <span className="footer-copy">©RADWORLDWIDE 2026</span>
                <span className="footer-tagline">Let’s build something RAD!</span>
            </div>
        </footer>
    );
};

export default Footer;
