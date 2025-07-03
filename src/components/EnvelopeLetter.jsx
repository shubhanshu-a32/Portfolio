// src/components/EnvelopeLetter.jsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

export default function EnvelopeLetter() {
    const [isOpen, setIsOpen] = useState(false);
    const letterBoxRef = useRef();
    // For background effect
    const controls = useAnimation();
    const [blobPos, setBlobPos] = useState({ x: 400, y: 200 });
    const [isFollowing, setIsFollowing] = useState(false);
    const sectionRef = useRef();

    // Disable scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    // Move blob randomly every 2.5s if not following cursor
    useEffect(() => {
        if (!isFollowing) {
            const interval = setInterval(() => {
                if (!sectionRef.current) return;
                const rect = sectionRef.current.getBoundingClientRect();
                const x = Math.random() * rect.width * 0.7 + rect.width * 0.15;
                const y = Math.random() * rect.height * 0.5 + rect.height * 0.2;
                setBlobPos({ x, y });
                controls.start({ x: x - 210, y: y - 210, transition: { duration: 2, ease: 'easeInOut' } });
            }, 2500);
            return () => clearInterval(interval);
        }
    }, [isFollowing, controls]);

    // Animate blob to cursor on mouse move
    const handleMouseMove = (e) => {
        setIsFollowing(true);
        const rect = sectionRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setBlobPos({ x, y });
        controls.start({ x: x - 210, y: y - 210, transition: { duration: 0.5, ease: 'easeOut' } });
    };
    const handleMouseLeave = () => {
        setIsFollowing(false);
    };

    // Close when clicking outside the letter box
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
    };

    return (
        <section
            id="letter"
            ref={sectionRef}
            className="relative py-20 bg-gray-100 dark:bg-gray-800 text-center px-4 overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Blurred Rainbow Blob Background (matches Hero) */}
            <motion.div
                className="absolute z-0 pointer-events-none"
                style={{
                    width: 420,
                    height: 420,
                    left: 0,
                    top: 0,
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
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white relative z-10">💌 A Message For You</h2>

            {/* Envelope Container - More Realistic */}
            <div 
                className="relative w-56 h-44 mx-auto cursor-pointer group shadow-2xl border border-gray-200 dark:border-none bg-white/80 dark:bg-transparent rounded-xl z-10"
                style={{ boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18), 0 0 0 2px #e5e7eb" }}
                onClick={() => setIsOpen(true)}
            >
                {/* Envelope Shadow */}
                <div className="absolute w-full h-3/4 left-0 top-1/4 rounded-b-xl z-0" style={{boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)"}} />
                {/* Flap */}
                <motion.div
                    animate={{ rotateX: isOpen ? -60 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute left-0 top-0 w-full h-1/2 z-20"
                    style={{
                        transformOrigin: "bottom center",
                        perspective: 600,
                    }}
                >
                    <div
                        className="w-full h-full border-x border-t border-gray-300 dark:border-gray-600"
                        style={{
                            clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                            background: "linear-gradient(180deg, #f9fafb 80%, #e5e7eb 100%)",
                        }}
                    />
                    {/* Flap shadow for realism */}
                    <div
                        className="absolute left-0 top-0 w-full h-full pointer-events-none"
                        style={{
                            clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                            background: "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0) 80%)",
                            zIndex: 1,
                        }}
                    />
                    {/* Seal */}
                    <div
                        className="absolute left-1/2 -translate-x-1/2 bottom-2 w-7 h-7 bg-red-500 rounded-full border-4 border-white shadow-md z-10 group-hover:scale-110 transition-transform"
                        style={{boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)"}}
                    />
                </motion.div>
                {/* Envelope Body */}
                <div
                    className="absolute left-0 top-1/4 w-full h-3/4 z-10 rounded-b-xl border border-gray-300 dark:border-gray-600"
                    style={{
                        background: "linear-gradient(180deg, #f3f4f6 60%, #e5e7eb 100%)",
                    }}
                />
                {/* Envelope bottom triangle (for realism) */}
                <div
                    className="absolute left-0 bottom-0 w-full h-1/4 z-20"
                    style={{
                        clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                        background: "linear-gradient(180deg, #f9fafb 60%, #e5e7eb 100%)",
                        borderBottom: "1px solid #e5e7eb",
                        borderLeft: "1px solid #e5e7eb",
                        borderRight: "1px solid #e5e7eb",
                    }}
                />
                {/* Paper peeking out (for realism) */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 top-[38%] w-[85%] h-2 rounded-t bg-white z-30 shadow"
                    style={{boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)"}}
                />
            </div>
            <p className="mt-4 text-gray-500 text-xs relative z-10">Click the envelope to open</p>

            {/* Modal Letter with Blur Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
                        onClick={handleOverlayClick}
                    >
                        <motion.div
                            key="letterbox"
                            ref={letterBoxRef}
                            initial={{ y: 80, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 80, opacity: 0, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 120, damping: 18 }}
                            className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white max-w-2xl w-full mx-4 p-8 rounded-lg shadow-2xl relative z-[1000] border border-gray-200 dark:border-gray-700"
                        >
                            <h3 className="text-2xl font-bold mb-4">Dear Visitor,</h3>
                            <p className="text-lg leading-relaxed">
                                Thank you for taking the time to view my portfolio. I hope my skills and passion
                                for building meaningful, modern web experiences shine through every project.
                                If you'd like to connect, collaborate, or just say hi — feel free to scroll down
                                and send me a message. Let's build something amazing together! And at last just want to say that
                                there's more projects and ideas to come, because learning is a never ending process. Also new things always
                                excite me and that's why I am expanding my skills and knowledge in different domains also.
                            </p>
                            <p className="mt-6 font-semibold">– Shubhanshu Upadhyay</p>
                            <button
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold focus:outline-none"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close letter"
                            >
                                ×
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}