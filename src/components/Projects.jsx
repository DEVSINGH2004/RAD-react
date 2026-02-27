import React from 'react';

const Projects = () => {
    return (
        <section className="projects-section">
            <h2 className="projects-title">PROJECTS/CLIENTS</h2>
            <div className="logo-strip">
                <div className="marquee-track">
                    {[1, 2, 3, 4, 5, 6].map((idx) => (
                        <div key={idx} className="marquee-item">
                            <img src="/assets/marquee-icon.png" className="default-img" alt="" />
                            <img src="/assets/marquee-icon2.png" className="hover-img" alt="" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
