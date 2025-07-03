import { motion, useAnimation } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaGoogle, FaHtml5, FaJs, FaNodeJs, FaReact } from 'react-icons/fa';
import { SiExpress, SiTailwindcss, SiMongodb, SiVercel, SiRender, SiRailway, SiSocketdotio, SiCss3 } from 'react-icons/si';
import { useState, useEffect } from 'react';

const projects = [
    {
        title: 'ChatApp+',
        description: 'Real time Chatting Website with Google-OAuth, Socket.IO, Redis and hosted on Vercel.',
        liveLink: 'https://chat-app-front-end-amber.vercel.app/',
        repoLink: 'https://github.com/shubhanshu-a32/ChatApp-Front-End-',
        tech: [
            <FaReact className='text-sky-500' />,
            <SiTailwindcss className='text-teal-400' />,
            <FaNodeJs className='text-green-600' />,
            <SiExpress className='text-gray-800 dark:text-gray-200' />,
            <SiSocketdotio className='text-indigo-500' />,
            <FaGoogle className='text-red-500' />,
            <SiVercel className='text-black' />,
            <SiRender className='text-indigo-600' />
        ],
    },

    {
        title: '3I-MERN',
        description: 'Website Created to post unique ideas and showcase to others, Used MERN-STACK and JWT authentication.',
        liveLink: 'https://3-i-front-end.vercel.app/',
        repoLink: 'https://github.com/shubhanshu-a32/3I-Front-End',
        tech: [
            <FaReact className='text-sky-500' />,
            <SiTailwindcss className='text-teal-400' />,
            <FaNodeJs className='text-green-600' />,
            <SiExpress className='text-gray-800 dark:text-gray-200' />,
            <SiVercel className='text-black' />,
            <SiRailway className='text-red-400' />
        ],
    },

    {
        title: 'Cricket-Score Website',
        description: 'Website created personally to see Live Cricket Matches, Used React.js and TailwindCSS.',
        liveLink: 'https://cricket-score-website.vercel.app/',
        repoLink: 'https://github.com/shubhanshu-a32/Cricket-Score-Website',
        tech: [
            <FaJs className='text-yellow-400' />,
            <FaReact className='text-sky-500' />,
            <SiTailwindcss className='text-teal-400' />,
            <SiVercel className='text-black' />
        ],
    },

    {
        title: 'Weather-Website',
        description: 'Created a backend based weather website to fetch real time weather data, Deployed on Render. ',
        liveLink: 'https://weather-dashboard-xcqy.onrender.com/',
        repoLink: 'https://github.com/shubhanshu-a32/Weather-dashboard',
        tech: [
            <FaHtml5 className='text-orange-500' />,
            <SiCss3 className='text-blue-600' />,
            <FaJs className='text-yellow-400' />,
            <FaNodeJs className='text-green-600' />,
            <SiExpress className='text-gray-800 dark:text-gray-200' />,
            <SiRender className='text-indigo-600' />
        ],
    },
];

const techNames = {
    FaReact: 'React',
    SiTailwindcss: 'TailwindCSS',
    FaNodeJs: 'Node.js',
    SiExpress: 'Express',
    SiSocketdotio: 'Socket.IO',
    FaGoogle: 'Google OAuth',
    SiVercel: 'Vercel',
    SiRender: 'Render',
    SiRailway: 'Railway',
    FaJs: 'JavaScript',
    FaHtml5: 'HTML5',
    SiCss3: 'CSS3',
    SiMongodb: 'MongoDB',
};

function getTechName(icon) {
    if (!icon || !icon.type) return '';
    const name = icon.type.displayName || icon.type.name;
    return techNames[name] || name;
}

export default function Projects() {
    const [hovered, setHovered] = useState({}); // { [projectIndex]: hoveredIconIndex }
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
            id='projects'
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
            <h2 className='text-3xl font-bold mb-12 text-gray-800 dark:text-white'>Projects</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto'>
                {projects.map((project, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.03 }}
                        animate={{ y: [0, -10, 0, 10, 0] }}
                        transition={{
                            duration: 3 + i * 0.2,
                            repeat: Infinity,
                            repeatType: 'loop',
                            ease: 'easeInOut',
                            delay: i * 0.2
                        }}
                        className='relative group rounded-xl overflow-hidden shadow-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 text-left'>
                        <div className='absolute top-3 right-3 flex flex-wrap gap-1 z-10'>
                            {project.tech.map((icon, j) => (
                                <motion.div
                                    key={j}
                                    className='relative group bg-white dark:bg-gray-700 p-0.5 rounded flex items-center justify-center w-8 h-8 cursor-pointer'
                                    onMouseEnter={() => setHovered({ ...hovered, [i]: j })}
                                    onMouseLeave={() => setHovered({ ...hovered, [i]: null })}
                                    onClick={() => setHovered({ ...hovered, [i]: j })}
                                    animate={{ y: hovered[i] === j ? 16 : 0 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                >
                                    {/* Tooltip: only show for hovered icon */}
                                    {hovered[i] === j && (
                                        <span className='absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-gray-900 text-white text-xs pointer-events-none whitespace-nowrap z-50 shadow-lg opacity-100 transition-opacity duration-200'>
                                            {getTechName(icon)}
                                        </span>
                                    )}
                                    {icon && typeof icon.type === 'function'
                                        ? (
                                            <span className="text-2xl leading-none font-normal w-full h-full flex items-center justify-center">
                                                {icon}
                                            </span>
                                        )
                                        : icon}
                                </motion.div>
                            ))}
                        </div>

                        <h3 className='text-xl font-semibold mb-3 text-gray-900 dark:text-white mt-10'>{project.title} </h3>
                        <p className='text-sm text-gray-600 dark:text-gray-300 mb-4'>{project.description} </p>
                        <div className='flex flex-wrap gap-4'>
                            <a
                                href={project.liveLink}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center gap-2 px-3 py-2 text-sm bg-accent text-white rounded hover:bg-blue-600'>
                                <FaExternalLinkAlt /> Live-Link
                            </a>

                            <a 
                            href={project.repoLink}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex items-center gap-2 px-3 py-2 text-sm bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600'>
                                <FaGithub /> GitHub-Repo
                            </a>
                        </div>

                    </motion.div>
                ))}
            </div>
        </section>
    );
}