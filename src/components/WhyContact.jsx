import React from 'react';

const WhyContact = () => {
    return (
        <>
            <section className="why-section">
                <div className="why-card">
                    <div className="why-text">
                        <h2>WHY RAD WORLDWIDE</h2>
                        <p>Fandom is the new frontier of growth, and RAD Worldwide leads it by connecting sports, entertainment, and
                            creator IPs with fans through meaningful products and collaborations. We go beyond licensing to build
                            cultural connections that turn attention into loyalty and relevance into revenue.</p>
                    </div>
                    <div className="why-image">
                        <img src="/assets/Glow.png" className="why-glow" alt="" />
                        <img src="/assets/whyimg.png" className="why-main-img" alt="" />
                    </div>
                </div>
                <div className="why-glow2">
                    <img src="/assets/glow.png"  alt="" />
                </div>
            </section>
            
            <section className="newsletter-section">
                
                <div className="newsletter-container">
                    <div className="newsletter-content">
                        <h2 className="newsletter2-title">Stay Ahead Of Where Licensing Is Heading</h2>
                        <p className="newsletter-desc">
                            Licensing RADar delivers weekly insights on sports, creators
                            entertainment, and IP – focused on what’s changing, why it
                            matters and how to act.
                        </p>
                        <a href="#" className="newsletter-btn-main">READ THE NEWSLETTER</a>
                    </div>
                    <div className="newsletter-graphic">
                        <img src="/assets/thumb_LR_Logo.gif" alt="Radar" className="newsletter-radar" />
                    </div>
                </div>
            </section>

            <section className="contact-section">
                <div className="contact-card">
                    <div className="contact-left">
                        <h2>Contact Us</h2>
                        <p>Fill the form with your message to get in touch with the team RAD</p>
                    </div>
                    <div className="contact-right">
                        <div className="form-group inline-field">
                            <label>Name:</label>
                            <input type="text" />
                        </div>
                        <div className="form-group inline-field">
                            <label>Email:</label>
                            <input type="email" />
                        </div>
                        <div className="form-group inline-field">
                            <label>Services:</label>
                            <select defaultValue="select an option">
                                <option value="select an option">select an option</option>
                            </select>
                        </div>
                        <div className="form-group message-field">
                            <label>Message:</label>
                            <textarea rows={3}></textarea>
                        </div>
                        <button className="submit-btn" type="button">Submit</button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WhyContact;
