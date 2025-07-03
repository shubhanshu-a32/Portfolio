import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const socialLinks = [
    { href: 'https://github.com/shubhanshu-a32', icon: <FaGithub />, brand: 'text-black dark:text-white' },
    { href: 'https://www.linkedin.com/in/shubhanshu-upadhyay-0a249a2a9', icon: <FaLinkedin />, brand: 'text-[#0A66C2]' },
    { href: 'https://www.instagram.com/shubhanshu.upadhyay17?igsh=MTBhbW9qMjR5cWhhdg==', icon: <FaInstagram />, brand: 'text-[#E4405F]' },
    { href: 'https://x.com/shubhanshu177?t=jcpozTCZsqIwZpnDOz-2wQ&s=08', icon: <FaTwitter />, brand: 'text-[#1DA1F2]' },
];

export default function Footer() {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const [iconActive, setIconActive] = useState([false, false, false, false]);

    return (
        <footer className='bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-6 text-center relative'>
            <div className='flex justify-center gap-6 text-2xl mb-4'>
                {socialLinks.map((link, i) => (
                    <motion.a
                        key={i}
                        href={link.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={`transition-colors duration-300 ${iconActive[i] ? link.brand : 'text-gray-700 dark:text-gray-400'}`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        onMouseEnter={() => {
                            const arr = [...iconActive]; arr[i] = true; setIconActive(arr);
                        }}
                        onMouseLeave={() => {
                            const arr = [...iconActive]; arr[i] = false; setIconActive(arr);
                        }}
                        onClick={() => {
                            const arr = [...iconActive]; arr[i] = true; setIconActive(arr);
                            setTimeout(() => {
                                const arr2 = [...iconActive]; arr2[i] = false; setIconActive(arr2);
                            }, 1000);
                        }}
                    >
                        {link.icon}
                    </motion.a>
                ))}
                <motion.button
                    onClick={scrollToTop}
                    whileHover={{ y: -5 }}
                    className='absolute top-3 right-4 p-2 rounded-full bg-accent text-white'>
                    <FaArrowUp />
                </motion.button>
            </div>
            <div className="text-sm font-bold mt-2">
                © {new Date().getFullYear()} Shubhanshu Upadhyay. All rights reserved.
            </div>
        </footer>
    );
}