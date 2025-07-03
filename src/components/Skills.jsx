import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import cursorLogo from '../assets/cursor.svg';
import vscodeLogo from '../assets/icons8-visual-studio-code.svg';
import gitLogo from '../assets/icons8-git.svg';
// import {Cursor} from '../assets/cursor.svg';
import {
    FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGithub,
    FaJava, FaGit
} from 'react-icons/fa';
import {
    SiExpress, SiOpenai, SiTailwindcss, SiMongodb, SiVercel,
    SiRender, SiRailway, SiVscodium
} from 'react-icons/si';

const skills = [
    { name: 'HTML5', icon: <FaHtml5 className='text-orange-500' /> },
    { name: 'CSS3', icon: <FaCss3Alt className='text-blue-600' /> },
    { name: 'JavaScript', icon: <FaJs className='text-yellow-400' /> },
    { name: 'ReactJS', icon: <FaReact className='text-sky-500' /> },
    { name: 'NodeJS', icon: <FaNodeJs className='text-green-600' /> },
    { name: 'ExpressJS', icon: <SiExpress className='text-gray-800 dark: text-gray-200' /> },
    { name: 'Git', icon: <img src={gitLogo} alt='Git' className='w-9 h-9 object-contain' /> },
    { name: 'GitHub', icon: <FaGithub className='text-black dark:text-white' /> },
    { name: 'ChatGPT', icon: <SiOpenai className='text-pink-500' /> },
    { name: 'TailwindCSS', icon: <SiTailwindcss className='text-teal-400' /> },
    { name: 'MongoDB', icon: <SiMongodb className='text-green-800' /> },
    { name: 'Java', icon: <FaJava className='text-red-600' /> },
    { name: 'Vercel', icon: <SiVercel className='text-black' /> },
    { name: 'Render', icon: <SiRender className='text-indigo-600' /> },
    { name: 'Railway', icon: <SiRailway className='text-red-400' /> },
    { name: 'VSCode', icon: <img src={vscodeLogo} alt='VSCode' className='w-9 h-9 object-contain' /> },
    { name: 'Cursor', icon: <img src={cursorLogo} alt='Cursor' className='w-9 h-9 object-contain bg-white dark:bg-white rounded border border-gray-300 p-1' /> },
];

export default function Skills() {
    // Rainbow blob logic
    const controls = useAnimation();
    const [blobPos, setBlobPos] = useState({ x: 300, y: 200 });
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if (!isFollowing) {
            const interval = setInterval(() => {
                const x = Math.random() * window.innerWidth * 0.7 + window.innerWidth * 0.15;
                const y = Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.2;
                setBlobPos({ x, y });
                controls.start({ x, y, transition: { duration: 2, ease: 'easeInOut' } });
            }, 2500);
            return () => clearInterval(interval);
        }
    }, [isFollowing, controls]);

    const handleMouseMove = (e) => {
        setIsFollowing(true);
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setBlobPos({ x, y });
        controls.start({ x, y, transition: { duration: 0.5, ease: 'easeOut' } });
    };
    const handleMouseLeave = () => {
        setIsFollowing(false);
    };

    return (
        <section
            id='skills'
            className='relative min-h-[60vh] flex flex-col justify-center items-center text-center px-4 sm:px-8 overflow-hidden'
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Blurred Rainbow Blob Background */}
            <motion.div
                className="absolute z-0 pointer-events-none"
                style={{
                    width: 320,
                    height: 320,
                    left: 0,
                    top: 0,
                    x: blobPos.x - 160,
                    y: blobPos.y - 160,
                    filter: 'blur(80px)',
                    opacity: 0.6,
                    background: 'conic-gradient(from 90deg at 50% 50%, #ff00cc, #3333ff, #00ffcc, #ffcc00, #ff00cc)',
                    borderRadius: '50%',
                }}
                animate={controls}
                initial={false}
            >
                <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'conic-gradient(from 90deg at 50% 50%, #ff00cc, #3333ff, #00ffcc, #ffcc00, #ff00cc)',
                }} />
            </motion.div>
            {/* End Animated 3D Background Shapes */}
            <h2 className='relative z-10 text-3xl font-bold mb-12 text-gray-800 dark:text-white'>My Skills</h2>
            <div className='relative z-10 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 sm:gap-8 justify-items-center items-center'>
                {skills.map((skill, i) => (
                    <motion.div
                        key={i}
                        className='flex flex-col items-center text-4xl relative group'
                        whileHover={{ scale: 1.12, rotateX: 8, rotateY: -8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    >
                        {/* Tooltip */}
                        <span
                            className='absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs pointer-events-none whitespace-nowrap z-20 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                        >
                            {skill.name}
                        </span>
                        <div className='w-14 h-14 flex items-center justify-center rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm mb-2 transition-colors'>
                            {skill.icon}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}