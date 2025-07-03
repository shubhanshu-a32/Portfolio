import { useState, useEffect } from "react";
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import { motion, useAnimation } from 'framer-motion';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });

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

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .send(import.meta.env.VITE_EMAILJS_SERVICE_ID,
                 import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                  form,
                   import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
            .then(() => {
                toast.success('Message sent!');
                setForm({ name: '', email: '', message: '' });
            })
            .catch(() => toast.error('Failed to send'));
    };

    return (
        <section
            id="contact"
            className="relative min-h-[60vh] flex flex-col justify-center items-center text-center px-4 sm:px-8 overflow-hidden"
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
            <h2 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white">Contact Me</h2>

            <motion.form
                onSubmit={sendEmail}
                className="w-full max-w-xl mx-auto flex flex-col gap-6 bg-white dark:bg-gray-700 p-10 rounded-2xl shadow-2xl"
                animate={{
                    y: [0, -10, 0, 10, 0],
                    scale: [1, 1.025, 1, 0.98, 1]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: 'easeInOut',
                }}
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    className="p-4 w-full rounded-lg border text-lg dark:bg-gray-600"
                    required />

                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    className="p-4 w-full rounded-lg border text-lg dark:bg-gray-600"
                    required />

                <textarea
                    name="message"
                    rows="7"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    className="p-4 w-full rounded-lg border text-lg dark:bg-gray-600"
                    required />
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-accent text-white py-3 text-lg rounded-lg hover:bg-blue-600 shadow-md"
                >Send Message
                </motion.button>
            </motion.form>
        </section>
    );
}