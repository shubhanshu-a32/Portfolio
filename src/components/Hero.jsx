import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const fullName = 'Shubhanshu Upadhyay';
const typingSpeed = 100; // ms per character
const erasingSpeed = 60; // ms per character
const delayAfterTyping = 1200; // ms before erasing
const delayAfterErasing = 600; // ms before typing again

export default function Hero() {
  const [displayed, setDisplayed] = useState('');
  const [isErasing, setIsErasing] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Rainbow blob logic
  const controls = useAnimation();
  const [blobPos, setBlobPos] = useState({ x: 400, y: 300 });
  const [isFollowing, setIsFollowing] = useState(false);

  // Move blob randomly every 2.5s if not following cursor
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

  // Animate blob to cursor on mouse move
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

  useEffect(() => {
    let timeout;
    if (!isErasing && charIndex < fullName.length) {
      timeout = setTimeout(() => {
        setDisplayed(fullName.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typingSpeed);
    } else if (!isErasing && charIndex === fullName.length) {
      timeout = setTimeout(() => setIsErasing(true), delayAfterTyping);
    } else if (isErasing && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(fullName.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, erasingSpeed);
    } else if (isErasing && charIndex === 0) {
      timeout = setTimeout(() => setIsErasing(false), delayAfterErasing);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isErasing]);

  return (
    <section
      id='home'
      className='relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-8 overflow-hidden bg-gradient-to-br from-gray-100 via-gray-300 to-gray-500 dark:from-gray-900 dark:via-gray-800 dark:to-black'
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Blurred Rainbow Blob Background */}
      <motion.div
        className="absolute z-0 pointer-events-none"
        style={{
          width: 420,
          height: 420,
          left: 0,
          top: 0,
          x: blobPos.x - 210,
          y: blobPos.y - 210,
          filter: 'blur(90px)',
          opacity: 0.7,
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
      {/* Animated 3D Abstract SVG Background */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(400 300) rotate(90) scale(180 320)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#b3c6ff" />
              <stop offset="1" stopColor="#6366f1" stopOpacity="0.3" />
            </radialGradient>
            <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientTransform="translate(1100 700) rotate(90) scale(120 260)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f9fafb" />
              <stop offset="1" stopColor="#a5b4fc" stopOpacity="0.2" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>
      {/* Section entrance animation */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full flex flex-col items-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='mt-32 text-5xl sm:text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-600 to-white dark:from-white dark:via-gray-400 dark:to-black drop-shadow-lg mb-4 flex flex-col items-center'>
          Hi, I am
          <motion.span
            className='inline-block min-h-[1.2em]'
            animate={{ y: [0, -8, 0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-700 to-white dark:from-white dark:via-gray-400 dark:to-black font-extrabold drop-shadow-lg'>
              {displayed}
            </span>
            <span className='border-r-2 border-black dark:border-white animate-pulse ml-1' />
          </motion.span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className='font-semibold text-base sm:text-lg text-gray-800 dark:text-gray-100 max-w-2xl mb-6 shadow-sm drop-shadow-lg rounded-xl px-4 py-3 bg-white/80 dark:bg-black/40 backdrop-blur-sm'>
          Motivated and detail-oriented <span className="font-bold text-black dark:text-white">Computer Science graduate</span> with a strong passion for <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 dark:from-white dark:via-gray-400 dark:to-gray-700">Full Stack and Web Development</span>.<br/>
          Proficient in modern technologies including <span className="font-semibold text-blue-600 dark:text-blue-400">React.js</span>, <span className="font-semibold text-green-700 dark:text-green-400">Node.js</span>, <span className="font-semibold text-gray-800 dark:text-gray-200">Express</span>, and <span className="font-semibold text-green-900 dark:text-green-300">MongoDB</span>, with hands-on project experience showcased on <span className="font-semibold text-gray-900 dark:text-white">GitHub</span>.<br/>
          Eager to contribute to <span className="font-semibold text-accent">innovative development teams</span>, continuously learn emerging technologies, and solve real-world problems through <span className="font-bold text-white drop-shadow-lg">clean and scalable code</span>.
        </motion.p>
        <motion.a
          href='https://drive.google.com/file/d/1IdhAWEHz-mqbSVBmhkMalTKEV7ma1Teh/view?usp=drivesdk'
          target='_blank'
          rel='noopener noreferrer'
          whileHover={{scale: 1.08, boxShadow: '0 8px 32px 0 rgba(99,102,241,0.15)'}}
          whileTap={{scale:0.97}}
          className='inline-block bg-gradient-to-r from-gray-700 via-gray-500 to-gray-900 dark:from-gray-200 dark:via-gray-500 dark:to-gray-700 text-white dark:text-gray-900 px-8 py-3 rounded-full shadow-lg font-semibold text-lg tracking-wide transition-all duration-300 hover:from-gray-900 hover:to-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 mb-10'
        >
          Resume
        </motion.a>
      </motion.div>
    </section>
  )
}