import React, { useState, useLayoutEffect, useRef, type FC } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-scroll';
import { motion, type Variants } from 'framer-motion';
import { gsap } from 'gsap';

const menuVariants: Variants = {
    open: {
        x: 0,
        transition: {
            stiffness: 20,
            damping: 15
        }
    },
    closed: {
        x: '-100%',
        transition: {
            stiffness: 20,
            damping: 15
        }
    }
};

const Header: FC = () => {
    const [nav, setNav] = useState(false);
    const jaymiRef = useRef<HTMLAnchorElement>(null); 

    const toggleNav = () => {
        setNav(!nav);
    };

    const closeNav = () => {
        setNav(false);
    };
    
    // --- GSAP Animation for "Jaymi" ---
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(jaymiRef.current, {
                opacity: 0,
                y: -20,
                rotation: 360,
                scale: 0.8,
                duration: 1.5,
                ease: "elastic.out(1, 0.5)",
            });
        }, jaymiRef);

        return () => ctx.revert();
    }, []);

    const transitionClass = 'transition-colors duration-500';

    return (
        // 🚨 INVERSE THEME LOGIC APPLIED HERE 🚨
        // Light Mode (<html> has NO 'dark' class): Use dark colors for the header
        // Dark Mode (<html> HAS 'dark' class): Use light colors for the header (the 'dark:' prefix will apply the light colors)
        <div className={`fixed top-0 left-0 w-full z-50 
            
            // 1. DEFAULT (Light Page): Header is DARK
            bg-bg-dark bg-opacity-80 backdrop-blur-md 
            
            // 2. DARK MODE OVERRIDE (Dark Page): Header is LIGHT
            dark:bg-bg-light dark:bg-opacity-80
            
            ${transitionClass}`}
        >
            <div className={`max-w-[1300px] mx-auto flex justify-between 
            text-xl items-center px-12 h-20 
            
            // 3. DEFAULT (Light Page): Text is LIGHT (dark background)
            text-text-dark 
            
            // 4. DARK MODE OVERRIDE (Dark Page): Text is DARK (light background)
            dark:text-text-light`} 
            >
                <a 
                    href="#" 
                    ref={jaymiRef} 
                    // Accent color stays constant for contrast in both modes
                    className={`text-3xl font-bold cursor-pointer text-primary-accent ${transitionClass}`}
                >
                    Jaymi
                </a>

                <ul className='hidden md:flex gap-12 z-10 cursor-pointer'>
                    <li><Link to="about" onClick={closeNav} smooth={true} offset={-80} duration={500}>About</Link></li>
                    <li><Link to="skills" onClick={closeNav} smooth={true} offset={-80} duration={500}>Skills</Link></li>
                    <li><Link to="project" onClick={closeNav} smooth={true} offset={-80} duration={500}>Projects</Link></li>
                    <li><Link to="contact" onClick={closeNav} smooth={true} offset={-80} duration={500}>Contact</Link></li>
                </ul>

                {/* Theme-aware menu icons */}
                <div onClick={toggleNav} className={`md:hidden z-50 text-text-dark dark:text-text-light ${transitionClass}`}>
                    {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
                </div>

                <motion.div
                    initial={false}
                    animate={nav ? 'open' : 'closed'}
                    variants={menuVariants}
                    // Mobile menu background flips with the header's primary background
                    className={`fixed left-0 top-0 w-full min-h-screen z-40 ${transitionClass}
                        bg-bg-dark/95 dark:bg-bg-light/95`} 
                >
                    <ul className='font-semibold text-2xl space-y-8 mt-24 text-center '>
                        <li><Link to="about" onClick={closeNav} smooth={true} offset={-80} duration={500}>About</Link></li>
                        <li><Link to="skills" onClick={closeNav} smooth={true} offset={-80} duration={500}>Skills</Link></li>
                        <li><Link to="project" onClick={closeNav} smooth={true} offset={-80} duration={500}>Projects</Link></li>
                        <li><Link to="contact" onClick={closeNav} smooth={true} offset={-80} duration={500}>Contact</Link></li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default Header;