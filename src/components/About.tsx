import React, { useRef, useLayoutEffect, useState, useEffect, type FC } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const bioRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const underlineRef = useRef<HTMLDivElement>(null);
    const [scrambledTitle, setScrambledTitle] = useState('');

    const originalTitle = "About Me";
    const scrambleDuration = 1000;
    const scrambleStartDelay = 1000;

    const scrambleText = (text: string) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        return text.split('').map(char => {
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
    };

    const animateUnderline = () => {
        if (underlineRef.current) {
            gsap.fromTo(underlineRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    transformOrigin: "left center"
                }
            );
        }
    };

    const unscrambleText = () => {
        const duration = scrambleDuration;
        const steps = 30;
        const stepDuration = duration / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            const newText = originalTitle.split('').map((char) => {
                const shouldReveal = Math.random() < progress;
                if (shouldReveal || char === ' ') {
                    return char;
                }
                return scrambleText(char);
            }).join('');

            setScrambledTitle(newText);

            if (currentStep >= steps) {
                clearInterval(interval);
                setScrambledTitle(originalTitle);

                animateUnderline();
            }
        }, stepDuration);

        return interval;
    };

    useEffect(() => {
        setScrambledTitle(scrambleText(originalTitle));

        const timer = setTimeout(() => {
            unscrambleText();
        }, scrambleStartDelay);

        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // Set underline to hidden initially
            if (underlineRef.current) {
                gsap.set(underlineRef.current, {
                    scaleX: 0,
                    transformOrigin: 'left center'
                });
            }

            if (imageRef.current) {
                gsap.from(imageRef.current, {
                    opacity: 0,
                    x: -100,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    }
                });
            }

            // 🚨 FIX: Bio Masked Line Animation 🚨
            if (bioRef.current) {
                // Target the inner <p> elements (which are children of the bioRef div)
                const textLines = bioRef.current.querySelectorAll('.bio-line');

                gsap.from(textLines, {
                    yPercent: 100, // Start the inner text 100% down (hidden below the mask)
                    opacity: 0,
                    stagger: 0.2, // Stagger reveal between lines
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                        toggleActions: "play none none reverse",
                    }
                });
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            data-theme="dark"
            className="h-auto min-h-screen flex flex-col justify-center items-center
                bg-bg-dark text-text-dark 
                dark:bg-bg-light dark:text-text-light
                transition-colors duration-500 ease-in-out"
        >
            <div className="w-full px-4 md:px-12">

                {/* Title */}
                <h2
                    ref={titleRef}
                    className="text-6xl md:text-8xl font-extrabold text-left mb-0
                        text-text-dark dark:text-text-light leading-tight w-full"
                >
                    {scrambledTitle}
                </h2>

                {/* Underline Element */}
                <div
                    ref={underlineRef}
                    className="h-1 bg-primary-accent mb-8 w-full"
                ></div>


                <div className="flex flex-col md:flex-row gap-8">
                    {/* Image - Mobile: Top, Desktop: Right */}
                    <div className="order-first md:order-last w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
                        <img
                            ref={imageRef}
                            src="https://via.placeholder.com/400x400/007ACC/FFFFFF?text=Your+Profile+Pic"
                            alt="Profile"
                            className="rounded-full shadow-lg w-64 h-64 md:w-80 md:h-80 object-cover"
                        />
                    </div>

                    {/* 🚨 BIO: New Structure for Masked Animation 🚨 */}
                    <div ref={bioRef} className="order-last md:order-first w-full md:w-1/2 text-left space-y-6">
                        {/* Wrapper for mask effect */}
                        <div className="overflow-hidden"> 
                            {/* Inner text element to be animated */}
                            <p className="bio-line text-lg md:text-xl leading-relaxed">
                                Hello there! I'm Jaymi, a passionate developer with a knack for creating engaging user experiences.
                                I thrive on bringing ideas to life through clean, efficient code and love the challenge of learning new technologies.
                            </p>
                        </div>
                        
                        {/* Additional Paragraphs for demonstration */}
                       
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;