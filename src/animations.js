import gsapCore from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export const initLenis = () => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";

    const lenis = new Lenis({
        duration: 1.6,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 2.0,
        infinite: false,
        syncTouch: true,
        syncTouchLerp: 0.1,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsapCore.ticker.add(time => lenis.raf(time * 1000));
    gsapCore.ticker.lagSmoothing(0);

    let bar = document.getElementById("scroll-progress");
    if (!bar) {
        bar = document.createElement("div");
        bar.id = "scroll-progress";
        bar.style.cssText = "position:fixed;top:0;left:0;height:3px;width:0%;background:linear-gradient(90deg,#8733E8,#c266ff);z-index:9999;pointer-events:none;transform-origin:left;box-shadow:0 0 10px #8733E8;";
        document.body.appendChild(bar);
    }
    lenis.on("scroll", ({ progress }) => { bar.style.width = progress * 100 + "%"; });

    return lenis;
};

export const initAnimations = (lenis) => {
    const gsap = gsapCore;

    // Optimize ScrollTrigger for mobile
    ScrollTrigger.config({ ignoreMobileResize: true });

    function disableStack() { return window.innerHeight < 500; }
    function isMobile() { return window.innerWidth <= 1024; }

    const logoWrapper = document.querySelector(".logo-wrapper");
    const introSection = document.querySelector(".intro");
    const heroSection = document.querySelector(".hero-section");

    const floatsUp = document.querySelectorAll(".intro-float[data-dir='up']");
    const floatsDown = document.querySelectorAll(".intro-float[data-dir='down']");
    const allFloats = document.querySelectorAll(".intro-float");

    const heroNavbar = document.querySelector(".navbar");
    const heroPill = heroSection?.querySelector(".tag-pill");
    const heroH1 = heroSection?.querySelector("h1");
    const heroP = heroSection?.querySelector(".hero-content p");
    const heroFloats = heroSection?.querySelectorAll(".float");
    const servicesTitle = document.querySelector(".services-title");

    function lockServicesTitle() {
        if (!servicesTitle) return;
        gsap.killTweensOf(servicesTitle);
        gsap.set(servicesTitle, { clearProps: "transform,opacity,visibility,y,x" });
    }

    let _pvX = 0, _pvY = 0, _lW = 0, _lH = 0;
    function measureLogo() {
        if (!logoWrapper) return;
        const r = logoWrapper.getBoundingClientRect();
        _lW = r.width;
        _lH = r.height;
        _pvX = window.innerWidth / 2;
        _pvY = window.innerHeight / 2 - _lH * 0.15;
    }

    function aGapClip(s) {
        const apexRY = -0.22 * _lH;
        const baseRY = 0.13 * _lH;
        const baseRX = 0.21 * _lW;
        const ax = _pvX, ay = _pvY + apexRY * s;
        const rx = _pvX + baseRX * s, ry = _pvY + baseRY * s;
        const lx = _pvX - baseRX * s;
        return `polygon(${ax.toFixed(1)}px ${ay.toFixed(1)}px, ${rx.toFixed(1)}px ${ry.toFixed(1)}px, ${lx.toFixed(1)}px ${ry.toFixed(1)}px)`;
    }

    function setInitialState() {
        if (logoWrapper) gsap.set(logoWrapper, { scale: 1, force3D: true });
        measureLogo();

        if (heroSection) {
            gsap.set(heroSection, {
                opacity: 0,
                zIndex: 25,
                clipPath: isMobile() ? "none" : aGapClip(1),
            });
        }
        gsap.set([heroPill, heroH1, heroP], { opacity: 1, y: 0 });
        gsap.set(heroFloats, { opacity: 1, y: 0, scale: 1 });
        gsap.set(allFloats, { opacity: 1, y: 0, rotation: 0, scale: 1 });
        if (introSection) gsap.set(introSection, { opacity: 1, backgroundColor: "rgba(135,51,232,1)" });
        if (heroNavbar) gsap.set(heroNavbar, { opacity: 0, pointerEvents: "none" });
        lockServicesTitle();
    }
    setInitialState();

    let introST;
    let navbarShown = false;

    function createIntro() {
        if (introST) introST.kill();
        navbarShown = false;
        if (heroNavbar) gsap.set(heroNavbar, { opacity: 0, pointerEvents: "none" });

        const scrollDist = window.innerHeight * 1.8;
        const introEl = document.querySelector(".intro");
        if (!introEl) return;

        introST = ScrollTrigger.create({
            trigger: introEl,
            start: "top top",
            end: `+=${scrollDist}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,

            onUpdate: self => {
                const p = self.progress;
                if (logoWrapper) gsap.set(logoWrapper, { scale: 1 + p * 17, opacity: 1, force3D: true });

                floatsUp.forEach((el, i) => {
                    const fp = gsap.utils.clamp(0, 1, (p - 0.03 - i * 0.02) / 0.22);
                    gsap.set(el, { y: -fp * 150 + "vh", opacity: 1 - fp });
                });
                floatsDown.forEach((el, i) => {
                    const fp = gsap.utils.clamp(0, 1, (p - 0.05 - i * 0.02) / 0.22);
                    gsap.set(el, { y: fp * 150 + "vh", opacity: 1 - fp });
                });

                const s = 1 + p * 17;
                const fade = gsap.utils.clamp(0, 1, (p - 0.93) / 0.07);

                if (heroSection) {
                    if (!isMobile()) {
                        heroSection.style.clipPath = aGapClip(s);
                    } else {
                        heroSection.style.clipPath = "none";
                    }
                    gsap.set(heroSection, { opacity: fade });
                }
                if (introSection) gsap.set(introSection, { opacity: 1 - fade });

                if (fade > 0.6 && !navbarShown) {
                    navbarShown = true;
                    if (heroNavbar) gsap.to(heroNavbar, { opacity: 1, duration: 0.5, ease: "power4.out", pointerEvents: "auto" });
                } else if (fade <= 0.6 && navbarShown) {
                    navbarShown = false;
                    if (heroNavbar) gsap.to(heroNavbar, { opacity: 0, duration: 0.4, ease: "power3.inOut", pointerEvents: "none" });
                }
            },

            onLeave: () => {
                if (introSection) gsap.set(introSection, { opacity: 0, backgroundColor: "#100318", visibility: "hidden" });
                if (heroSection) gsap.set(heroSection, { opacity: 1, zIndex: -1, clipPath: "none" });
            },

            onEnterBack: () => {
                if (logoWrapper) gsap.set(logoWrapper, { scale: 1, force3D: true });
                measureLogo();
                if (introSection) gsap.set(introSection, { visibility: "visible", backgroundColor: "rgba(135,51,232,1)" });
                if (heroSection) gsap.set(heroSection, { opacity: 0, zIndex: 25, clipPath: isMobile() ? "none" : aGapClip(1) });
            },
        });
    }
    createIntro();

    function initNavbarVisibility() {
        const aboutServices = document.querySelector(".about-services");
        if (!aboutServices || !heroNavbar) return;

        ScrollTrigger.create({
            trigger: aboutServices,
            start: "top top",
            onEnter: () => {
                gsap.to(heroNavbar, { opacity: 0, duration: 0.45, ease: "power4.out", pointerEvents: "none" });
            },
            onLeaveBack: () => {
                if (navbarShown) {
                    gsap.to(heroNavbar, { opacity: 1, duration: 0.45, ease: "power4.out", pointerEvents: "auto" });
                }
            },
        });
    }
    initNavbarVisibility();

    let serviceST;
    function createServices() {
        if (serviceST) { serviceST.kill(); serviceST = null; }
        if (disableStack()) return;

        const scene = document.querySelector(".service-stack-scene");
        const cards = gsap.utils.toArray(".service-card");

        if (!scene || !cards.length) return;

        const reversed = [...cards].reverse();
        const peekY = [0, 20, 40, 60];
        const peekScale = [1, 0.97, 0.94, 0.91];

        reversed.forEach((card, i) => {
            gsap.set(card, { y: peekY[i] || 0, scale: peekScale[i] || 1, zIndex: reversed.length - i });
        });

        const scrollPerCard = window.innerHeight * 0.7;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scene,
                start: "top 12%",
                end: `+=${(reversed.length - 1) * scrollPerCard}`,
                scrub: 1,
                pin: true,
                pinType: "transform",
                anticipatePin: 1,
                fastScrollEnd: true,
            },
        });

        serviceST = tl.scrollTrigger;

        for (let i = 0; i < reversed.length - 1; i++) {
            const remaining = reversed.slice(i + 1);
            tl.to(reversed[i], {
                y: "-130%", opacity: 0,
                rotation: gsap.utils.random(-4, 4),
                scale: 0.92, ease: "power3.inOut", duration: 1,
            }, i);
            remaining.forEach((card, j) => {
                tl.to(card, { y: peekY[j] || 0, scale: peekScale[j] || 1, ease: "power4.out", duration: 1 }, i);
            });
        }

        document.querySelectorAll(".premium-car").forEach((el, i) => {
            gsap.to(el, {
                y: isMobile() ? 6 : 12,
                rotation: i % 2 === 0 ? 4 : -4,
                duration: 3.2 + i * 0.4,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: i * 0.3,
            });
        });
    }
    createServices();

    function initAbout() {
        const card = document.querySelector(".about-card");
        const textH = document.querySelector(".about-text h2");
        const textP = document.querySelector(".about-text p");
        const img = document.querySelector(".about-main-img");
        const glow1 = document.querySelector(".about-services-glow");
        const glow2 = document.querySelector(".about-card-bg-glow");

        if (!card) return;

        gsap.from(card, {
            scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
            y: 80, scale: 0.95, opacity: 0, duration: 1.6, ease: "power4.out",
            onComplete: lockServicesTitle,
            onReverseComplete: lockServicesTitle,
        });

        if (textH && textP) {
            gsap.from([textH, textP], {
                scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none reverse" },
                y: 40, opacity: 0, duration: 1.6, stagger: 0.08, ease: "power4.out", delay: 0.2,
                onComplete: lockServicesTitle,
                onReverseComplete: lockServicesTitle,
            });
        }

        if (img) {
            gsap.fromTo(img,
                { y: 80, rotation: -15, scale: 0.85 },
                { y: -80, rotation: 5, scale: 1.15, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1 } }
            );
        }

        if (glow1) {
            gsap.to(glow1, {
                rotation: 180, scale: 2.2, opacity: 0.4, ease: "none",
                scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1.5 }
            });
        }
        if (glow2) {
            gsap.to(glow2, {
                rotation: -180, scale: 2.2, opacity: 0.4, ease: "none",
                scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1.5 }
            });
        }
        setTimeout(lockServicesTitle, 300);
    }
    initAbout();

    function initPartners() {
        const title = document.querySelector(".partners-title");
        const cards = gsap.utils.toArray(".partner-card1, .partner-card2, .partner-card3, .partner-card4, .partner-card5");
        const imgs = document.querySelectorAll(".partner-main-img");
        const glows = document.querySelectorAll(".partner-glow");

        if (!cards.length) return;

        if (title) {
            gsap.from(title, {
                scrollTrigger: { trigger: title, start: "top 88%", toggleActions: "play none none reverse" },
                y: 60, scale: 0.95, opacity: 0, duration: 1.6, ease: "power4.out",
            });
        }

        const row2Cards = gsap.utils.toArray(".row-2 .partner-card2, .row-2 .partner-card1");
        const row3Cards = gsap.utils.toArray(".row-3 .partner-card3, .row-3 .partner-card4, .row-3 .partner-card5");

        [row2Cards, row3Cards].forEach((group, gi) => {
            if (group.length) {
                gsap.from(group, {
                    scrollTrigger: { trigger: group[0], start: "top 88%", toggleActions: "play none none reverse" },
                    y: 90, opacity: 0, scale: 0.94, duration: 1.6, stagger: 0.08, ease: "power4.out", delay: gi * 0.1,
                });
            }
        });

        imgs.forEach((img, i) => {
            const card = img.closest("[class^='partner-card']");
            if (card) {
                const rotDir = i % 2 === 0 ? 15 : -15;
                gsap.fromTo(img,
                    { y: 40, rotation: -rotDir, scale: 0.8 },
                    { y: -40, rotation: rotDir, scale: 1.15, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1 } }
                );
            }
        });

        glows.forEach((glow) => {
            const card = glow.closest("[class^='partner-card']");
            if (card) {
                gsap.to(glow, {
                    rotation: 180, scale: 5.5, opacity: 0.3, ease: "none",
                    scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1.5 }
                });
            }
        });

        cards.forEach(card => {
            card.addEventListener("mousemove", e => {
                const r = card.getBoundingClientRect();
                const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -8;
                const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 8;
                gsap.to(card, { rotateX: rx, rotateY: ry, scale: 1.03, duration: 0.5, ease: "power4.out", transformPerspective: 800 });
            });
            card.addEventListener("mouseleave", () => {
                gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.55, ease: "power4.out" });
            });
        });
    }
    initPartners();

    function initProjects() {
        const title = document.querySelector(".projects-title");
        const strip = document.querySelector(".logo-strip");

        if (title) gsap.from(title, {
            scrollTrigger: { trigger: title, start: "top 88%", toggleActions: "play none none reverse" },
            y: 55, opacity: 0, duration: 1.6, ease: "power4.out",
        });
        if (strip) gsap.from(strip, {
            scrollTrigger: { trigger: strip, start: "top 90%", toggleActions: "play none none reverse" },
            opacity: 0, duration: 1.6, ease: "power4.out",
        });
    }
    initProjects();

    function initPageStack() {
        const page2 = document.querySelector(".page-2-wrapper");
        const page3 = document.querySelector(".page-3-wrapper");

        if (!page2 || !page3) return;

        ScrollTrigger.create({
            trigger: page2,
            start: "bottom bottom",
            end: () => "+=" + page3.offsetHeight,
            pin: true,
            pinSpacing: false,
            id: "pageStack"
        });
    }
    initPageStack();

    function initWhy() {
        const whySection = document.querySelector(".why-section");
        const newsletter = document.querySelector(".newsletter-section");

        if (whySection) {
            const whyCard = whySection.querySelector(".why-card");
            const whyImg = whySection.querySelector(".why-main-img");
            const whyGlow = whySection.querySelector(".why-glow");

            if (whyCard) gsap.from(whyCard, { scrollTrigger: { trigger: whySection, start: "top 85%", toggleActions: "play none none reverse" }, y: 60, scale: 0.95, opacity: 0, duration: 1.6, ease: "power4.out" });
            if (whyImg) gsap.fromTo(whyImg, { y: 60, rotation: 10, scale: 0.9 }, { y: -60, rotation: -10, scale: 1.1, ease: "none", scrollTrigger: { trigger: whySection, start: "top bottom", end: "bottom top", scrub: 1 } });
            if (whyGlow) gsap.to(whyGlow, { rotation: -180, scale: 4.5, x: 50, ease: "none", scrollTrigger: { trigger: whySection, start: "top bottom", end: "bottom top", scrub: 1.5 } });
        }

        if (newsletter) {
            const newsContainer = newsletter.querySelector(".newsletter-container");
            const radar = newsletter.querySelector(".newsletter-radar");

            if (newsContainer) gsap.from(newsContainer, { scrollTrigger: { trigger: newsletter, start: "top 85%", toggleActions: "play none none reverse" }, y: 60, scale: 0.95, opacity: 0, duration: 1.6, ease: "power4.out" });
            if (radar) gsap.fromTo(radar, { y: 80, rotation: -15, scale: 0.85 }, { y: -80, rotation: 15, scale: 1.15, ease: "none", scrollTrigger: { trigger: newsletter, start: "top bottom", end: "bottom top", scrub: 1 } });
        }
    }
    initWhy();

    function initContact() {
        if (isMobile()) return;
        const card = document.querySelector(".contact-card");
        const left = document.querySelector(".contact-left");
        const right = document.querySelector(".contact-right");
        const fields = document.querySelectorAll(".form-group");

        if (!card) return;

        gsap.from(card, { scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" }, y: 70, scale: 0.95, opacity: 0, duration: 1.6, ease: "power4.out" });
        if (left) gsap.from(left, { scrollTrigger: { trigger: card, start: "top 83%", toggleActions: "play none none reverse" }, x: -40, opacity: 0, duration: 1.6, ease: "power4.out", delay: 0.15 });
        if (right) gsap.from(right, { scrollTrigger: { trigger: card, start: "top 83%", toggleActions: "play none none reverse" }, x: 40, opacity: 0, duration: 1.6, ease: "power4.out", delay: 0.15 });
        if (fields.length) gsap.from(fields, { scrollTrigger: { trigger: right, start: "top 80%", toggleActions: "play none none reverse" }, y: 30, opacity: 0, stagger: 0.08, duration: 1, ease: "power4.out", delay: 0.3 });
    }
    initContact();

    function initFooter() {
        const footer = document.querySelector(".rad-footer");
        const vector = document.querySelector(".footer-vector");
        const ellipse = document.querySelector(".footer-ellipse");
        const logo = document.querySelector(".footer-logo");
        const cols = document.querySelectorAll(".footer-col");

        if (!footer) return;

        if (vector) gsap.from(vector, { scrollTrigger: { trigger: footer, start: "top bottom", toggleActions: "play none none reverse" }, opacity: 0, y: 40, duration: 1.5, ease: "power4.out" });
        if (ellipse) gsap.from(ellipse, { scrollTrigger: { trigger: footer, start: "top 95%", toggleActions: "play none none reverse" }, scale: 0.85, opacity: 0, duration: 1.5, ease: "power4.out", delay: 0.2 });
        if (logo) gsap.from(logo, { scrollTrigger: { trigger: footer, start: "top 90%", toggleActions: "play none none reverse" }, y: -40, opacity: 0, duration: 1.6, ease: "back.out(1.7)", delay: 0.2 });
        if (cols.length) gsap.from(cols, { scrollTrigger: { trigger: footer, start: "top 85%", toggleActions: "play none none reverse" }, y: 35, opacity: 0, stagger: 0.08, duration: 1.6, ease: "power4.out", delay: 0.3 });
    }
    initFooter();

    let resizeTimer;
    let lastW = window.innerWidth;
    let lastH = window.innerHeight;

    function rebuild() {
        ScrollTrigger.getAll().forEach(st => st.kill());
        setInitialState();
        createIntro();
        createServices();
        initAbout();
        initPartners();
        initProjects();
        initPageStack();
        initWhy();
        initContact();
        initFooter();
        initNavbarVisibility();
        lockServicesTitle();
        ScrollTrigger.refresh(true);
    }

    function scheduleRebuild() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const w = window.innerWidth, h = window.innerHeight;
            if (Math.abs(w - lastW) > 30 || Math.abs(h - lastH) > 120) {
                lastW = w; lastH = h; rebuild();
            }
        }, 250);
    }

    window.addEventListener("resize", scheduleRebuild);
    window.addEventListener("orientationchange", scheduleRebuild);
};
