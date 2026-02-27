import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <header className="navbar">
            <div className="nav-left-desktop">
                <a href="#">HOME</a>
                <a href="#">SERVICES</a>
                <a href="#">ABOUT US</a>
            </div>
            <div className="nav-center">
                <img src="/assets/logo-rad.png" alt="RAD Logo" />
            </div>
            <div className="nav-right-desktop">
                <a href="#" className="contact-btn">NEWSLETTER</a>
                <a href="#" className="contact-btn">CONTACT US</a>
            </div>
            <button
                className={`hamburger ${isOpen ? 'active' : ''}`}
                id="hamburger"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span></span><span></span><span></span>
            </button>
            <nav className={`nav-menu ${isOpen ? 'active' : ''}`} id="navMenu">
                <a href="#" onClick={closeMenu}>HOME</a>
                <a href="#" onClick={closeMenu}>SERVICES</a>
                <a href="#" onClick={closeMenu}>ABOUT US</a>
                <a href="#" onClick={closeMenu}>CLIENTS</a>
                <a href="#" className="contact-btn" onClick={closeMenu}>CONTACT US</a>
                <a href="#" className="contact-btn" onClick={closeMenu}>NEWSLETTER</a>
            </nav>
        </header>
    );
};

export default Navbar;
