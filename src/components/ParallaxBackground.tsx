"use client";

import { useEffect, useState } from 'react';

const ParallaxBackground = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Background Pattern */}
            <div
                className="absolute inset-0 opacity-25"
                style={{
                    backgroundImage: 'url(/bg-pattern.svg)',
                    backgroundSize: '200px 200px',
                    transform: `translateY(${scrollY * 0.1}px)`,
                }}
            />

            {/* Tech Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-15"
                style={{
                    backgroundImage: 'url(/tech-pattern.svg)',
                    backgroundSize: '400px 400px',
                    transform: `translateY(${scrollY * -0.05}px) rotate(${scrollY * 0.01}deg)`,
                }}
            />

            {/* Floating Animal Silhouettes */}
            <div
                className="absolute top-20 right-10 w-32 h-20 opacity-20"
                style={{
                    transform: `translateY(${scrollY * 0.15}px) rotate(${scrollY * 0.02}deg)`,
                }}
            >
                <img src="/animal-silhouette.svg" alt="" className="w-full h-full animate-pulse" />
            </div>

            <div
                className="absolute top-96 left-10 w-28 h-18 opacity-15"
                style={{
                    transform: `translateY(${scrollY * -0.1}px) rotate(${-scrollY * 0.01}deg)`,
                }}
            >
                <img src="/animal-silhouette.svg" alt="" className="w-full h-full animate-pulse" />
            </div>

            <div
                className="absolute bottom-40 right-20 w-24 h-16 opacity-12"
                style={{
                    transform: `translateY(${scrollY * 0.08}px) rotate(${scrollY * 0.015}deg)`,
                }}
            >
                <img src="/animal-silhouette.svg" alt="" className="w-full h-full animate-pulse" />
            </div>

            {/* Floating Geometric Shapes */}
            <div
                className="absolute top-60 left-1/4 w-40 h-40 opacity-20"
                style={{
                    transform: `translateY(${scrollY * 0.08}px) translateX(${scrollY * 0.02}px)`,
                }}
            >
                <img src="/floating-shapes.svg" alt="" className="w-full h-full" />
            </div>

            <div
                className="absolute top-80 right-1/3 w-32 h-32 opacity-15"
                style={{
                    transform: `translateY(${scrollY * -0.12}px) translateX(${-scrollY * 0.03}px)`,
                }}
            >
                <img src="/floating-shapes.svg" alt="" className="w-full h-full" />
            </div>

            <div
                className="absolute bottom-60 left-1/3 w-36 h-36 opacity-18"
                style={{
                    transform: `translateY(${scrollY * 0.06}px) translateX(${scrollY * -0.02}px)`,
                }}
            >
                <img src="/floating-shapes.svg" alt="" className="w-full h-full" />
            </div>

            {/* Animated Floating Elements */}
            <div className="floating-orb floating-orb-1" />
            <div className="floating-orb floating-orb-2" />
            <div className="floating-orb floating-orb-3" />
            <div className="floating-orb floating-orb-4" />
            <div className="floating-orb floating-orb-5" />

            {/* Additional smaller orbs for more depth */}
            <div
                className="absolute top-32 left-1/2 w-16 h-16 rounded-full opacity-20"
                style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.3), rgba(34, 197, 94, 0.1), transparent 70%)',
                    transform: `translateY(${scrollY * 0.12}px)`,
                    filter: 'blur(0.5px)',
                    animation: 'floatMove2 15s ease-in-out infinite',
                }}
            />

            <div
                className="absolute bottom-32 right-1/4 w-20 h-20 rounded-full opacity-15"
                style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(132, 204, 22, 0.25), rgba(132, 204, 22, 0.08), transparent 70%)',
                    transform: `translateY(${scrollY * -0.08}px)`,
                    filter: 'blur(0.5px)',
                    animation: 'floatMove4 22s ease-in-out infinite',
                }}
            />

            {/* Gradient Overlay for Depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-transparent to-emerald-50/30 pointer-events-none" />

            {/* Subtle mesh gradient for modern look */}
            <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.1) 0%, transparent 25%),
                        radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 25%),
                        radial-gradient(circle at 75% 25%, rgba(74, 222, 128, 0.08) 0%, transparent 25%),
                        radial-gradient(circle at 25% 75%, rgba(132, 204, 22, 0.08) 0%, transparent 25%)
                    `,
                }}
            />
        </div>
    );
};

export default ParallaxBackground; 