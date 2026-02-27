import React from 'react';

const Intro = () => {
    return (
        <section className="intro">
            <div className="scene">
                <div className="logo-center">
                    <div className="logo-wrapper">
                        <img src="/chrome logo 1.png" alt="Logo" className="logo" />
                    </div>
                </div>
            </div>

            <img src="/assets/shirt.png" className="intro-float if-shirt" data-dir="up" alt="" />
            <img src="/assets/gamepad.png" className="intro-float if-gamepad" data-dir="up" alt="" />
            <img src="/assets/cap.png" className="intro-float if-cap" data-dir="up" alt="" />

            <img src="/assets/car.png" className="intro-float if-car" data-dir="down" alt="" />
            <img src="/assets/music.png" className="intro-float if-music" data-dir="down" alt="" />
            <img src="/assets/shoe.png" className="intro-float if-shoe" data-dir="down" alt="" />

            <div className="scroll-text">SCROLL DOWN</div>
        </section>
    );
};

export default Intro;
