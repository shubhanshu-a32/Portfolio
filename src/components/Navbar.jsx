import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaInstagram,
    FaBars,
    FaTimes,
} from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';
import profilePic from '../assets/Shubhanshu-Upadhyay-image.jpg';

const socialLinks = [
    { href: 'https://www.linkedin.com/in/shubhanshu-upadhyay-0a249a2a9', icon: <FaLinkedin />, hoverClass: 'hover:text-[#0A66C2] focus:text-[#0A66C2]' },
    { href: 'https://github.com/shubhanshu-a32', icon: <FaGithub />, hoverClass: 'hover:text-black dark:hover:text-white focus:text-black dark:focus:text-white' },
    { href: "https://www.instagram.com/shubhanshu.upadhyay17?igsh=MTBhbW9qMjR5cWhhdg==", icon: <FaInstagram />, hoverClass: 'hover:text-[#E4405F] focus:text-[#E4405F]' },
    { href: 'https://x.com/shubhanshu177?t=jcpozTCZsqIwZpnDOz-2wQ&s=08', icon: <FaTwitter />, hoverClass: 'hover:text-[#1DA1F2] focus:text-[#1DA1F2]' },
];

const navLinks = ["Home", "Skills", "Projects", "Contact"];

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme-dark');
        return saved === 'true' ? true : false;
    });
    const [isScrolled, setIsScrolled] = useState(false);
    const [active, setActive] = useState("Home");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem('theme-dark', darkMode);
    }, [darkMode]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            //Highlight current section
            const sections = document.querySelectorAll("section");
            sections.forEach((section) => {
                const top = window.scrollY;
                const offset = section.offsetTop - 100;
                const height = section.offsetHeight;
                const id = section.getAttribute("id");
                if (top >= offset && top < offset + height) {
                    setActive(id.charAt(0).toUpperCase() + id.slice(1));
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id) => {
        const element = document.getElementById(id.toLowerCase());
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setMenuOpen(false);
        }
    };

    return (
        <motion.nav
            animate={{ backdropFilter: isScrolled ? "blur(3px)" : "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
                {/* {Logo} */}
                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => scrollTo("home")}
                >
                    <img
                        src={profilePic}
                        alt="My Photo"
                        className="w-10 h-10 rounded-full shadow" />

                    <span className="font-semibold text-lg dark:text-white">Shubhanshu Upadhyay </span>
                </div>

                {/* {Desktop Navigation} */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(link)}
                            className={`cursor-pointer text-sm font-medium ${active === link
                                ? "text-accent"
                                : "text-gray-700 dark:text-gray-300"
                                }`}
                        >
                            {link}
                        </button>
                    ))}

                    {/* {Theme toggle} */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        aria-label="Toggle Dark Mode"
                        className="relative w-16 h-9 flex items-center bg-white/60 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 rounded-full shadow-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                        {/* Track gradient */}
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-20 pointer-events-none" />
                        {/* Sliding thumb */}
                        <motion.span
                            layout
                            className={`absolute top-1 left-1 w-7 h-7 rounded-full flex items-center justify-center shadow-md ring-2 ring-white/70 dark:ring-gray-900/60 transition-transform duration-300 ${darkMode ? 'translate-x-7 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-yellow-400' : 'translate-x-0 bg-gradient-to-br from-white via-blue-100 to-blue-200 text-blue-500'}`}
                            animate={{ x: darkMode ? 28 : 0 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        >
                            {darkMode ? <BsMoon className="drop-shadow-lg" /> : <BsSun className="drop-shadow-lg" />}
                        </motion.span>
                        {/* Track icons for context */}
                        <span className="absolute left-2 text-blue-400 text-lg opacity-80">
                            <BsSun />
                        </span>
                        <span className="absolute right-2 text-yellow-300 text-lg opacity-80">
                            <BsMoon />
                        </span>
                    </button>

                    {/* Social Icons (right side) */}
                    <a
                      href="https://www.linkedin.com/in/shubhanshu-upadhyay-0a249a2a9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-xl text-gray-400 dark:text-gray-500 transition-colors duration-200 hover:text-blue-600 focus:text-blue-600 dark:hover:text-blue-400 dark:focus:text-blue-400"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href="https://github.com/shubhanshu-a32"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-xl text-gray-400 dark:text-gray-500 transition-colors duration-200 hover:text-black focus:text-black dark:hover:text-white dark:focus:text-white"
                    >
                      <FaGithub />
                    </a>
                    <a
                      href="https://www.instagram.com/shubhanshu.upadhyay17?igsh=MTBhbW9qMjR5cWhhdg=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-xl text-gray-400 dark:text-gray-500 transition-colors duration-200 hover:text-pink-500 focus:text-pink-500 dark:hover:text-pink-400 dark:focus:text-pink-400"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="https://x.com/shubhanshu177?t=jcpozTCZsqIwZpnDOz-2wQ&s=08"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-xl text-gray-400 dark:text-gray-500 transition-colors duration-200 hover:text-blue-400 focus:text-blue-400 dark:hover:text-blue-500 dark:focus:text-blue-400"
                    >
                      <FaTwitter />
                    </a>
                </div>

                {/* {Mobile Menu toggle} */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="cursor-pointer text-xl dark:text-white">
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>
            {/* {Mobile Navigation} */}
            {menuOpen && (
                <div className="md:hidden px-6 py-4 bg-white dark:bg-gray-900 border-t dark:border-gray-700">
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link, i) => (
                            <button
                                key={i}
                                onClick={() => scrollTo(link)}
                                className={`cursor-pointer text-base ${active === link ? "text-accent" : "text-gray-700 dark:text-gray-300"}`}
                            >
                                {link}
                            </button>
                        ))}

                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="mt-4 flex items-center justify-center gap-2 p-2 text-sm rounded bg-gray-200 dark:bg-gray-700">
                            {darkMode ? <BsSun /> : <BsMoon />} Toogle Theme
                        </button>
                    </div>
                </div>
            )}
        </motion.nav>
    );
}