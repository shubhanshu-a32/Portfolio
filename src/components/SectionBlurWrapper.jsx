import { useEffect, useRef, useState } from 'react';

export default function SectionBlurWrapper({ children }) {
    const sectionRefs = useRef([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [scrollDir, setScrollDir] = useState(null);
    const lastScrollY = useRef(window.scrollY);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            if (currentY > lastScrollY.current) {
                setScrollDir('down');
            } else if (currentY < lastScrollY.current) {
                setScrollDir('up');
            }
            lastScrollY.current = currentY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = Number(entry.target.dataset.idx);
                        setCurrentIdx(idx);
                    }
                });
            },
            { threshold: 0.5 }
        );
        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });
        return () => observer.disconnect();
    }, [children]);

    return (
        <div>
            {Array.isArray(children)
                ? children.map((child, idx) => (
                    <div
                        key={idx}
                        ref={el => sectionRefs.current[idx] = el}
                        data-idx={idx}
                        className={
                            scrollDir === 'down' && idx < currentIdx
                                ? 'blur-sm transition-all duration-700 ease-in-out'
                                : scrollDir === 'up' && idx > currentIdx
                                    ? 'blur-sm transition-all duration-700 ease-in-out'
                                    : 'transition-all duration-700 ease-in-out'
                        }
                    >
                        {child}
                    </div>
                ))
                : children}
        </div>
    );
} 