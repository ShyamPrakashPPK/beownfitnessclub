'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface Trainer {
    _id: string;
    name: string;
    experience: number;
    specialty: string;
    image?: string;
}

export default function Trainers() {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchTrainers();
    }, []);

    const fetchTrainers = async () => {
        try {
            const res = await fetch('/api/trainers');
            const data = await res.json();
            if (data.success) {
                setTrainers(data.data);
            }
        } catch (error) {
            console.error('Error fetching trainers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (trainers.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % trainers.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [trainers.length]);

    if (loading) {
        return (
            <section id="trainers" className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-8 lg:px-16 py-20 bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
            </section>
        );
    }

    if (trainers.length === 0) {
        return null;
    }

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + trainers.length) % trainers.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % trainers.length);
    };

    return (
        <section
            id="trainers"
            className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-8 lg:px-16 py-20 bg-black overflow-hidden"
        >
            {/* BACKGROUND DECOR */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-20 left-20 w-96 h-96 rotate-45 border border-zinc-600"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 -rotate-45 border border-zinc-600"></div>
            </div>

            <div className="relative w-full max-w-7xl mx-auto">
                {/* HEADER */}
                <div className="text-center ">
                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-zinc-100 mb-6">
                        OUR TRAINERS
                    </h2>
                    <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
                        Meet our expert fitness professionals dedicated to helping you achieve your goals
                    </p>
                </div>

                {/* 3D SLIDER CONTAINER */}
                <div className="relative w-full h-[650px] perspective-1000" ref={containerRef}>
                    <div className="relative w-full h-full flex items-center justify-center">
                        {trainers.map((trainer, index) => {
                            const position = (index - currentIndex + trainers.length) % trainers.length;
                            const isActive = position === 0;
                            const isPrev = position === trainers.length - 1;
                            const isNext = position === 1;

                            // Calculate transform values for 3D effect
                            let translateX = 0;
                            let translateZ = 0;
                            let rotateY = 0;
                            let opacity = 0.4;
                            let scale = 0.75;
                            let brightness = 0.5;

                            if (isActive) {
                                translateX = 0;
                                translateZ = 0;
                                rotateY = 0;
                                opacity = 1;
                                scale = 1;
                                brightness = 1;
                            } else if (isPrev) {
                                translateX = -380;
                                translateZ = -150;
                                rotateY = 25;
                                opacity = 0.4;
                                scale = 0.75;
                                brightness = 0.6;
                            } else if (isNext) {
                                translateX = 380;
                                translateZ = -150;
                                rotateY = -25;
                                opacity = 0.4;
                                scale = 0.75;
                                brightness = 0.6;
                            } else {
                                translateX = position > trainers.length / 2
                                    ? -760 - (position - trainers.length / 2) * 100
                                    : 760 + (trainers.length / 2 - position) * 100;
                                translateZ = -300;
                                opacity = 0;
                                scale = 0.6;
                                brightness = 0.4;
                            }

                            return (
                                <div
                                    key={trainer._id}
                                    className="absolute w-80 transition-all duration-700 ease-out origin-center"
                                    style={{
                                        transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                                        opacity: opacity,
                                        transformStyle: 'preserve-3d',
                                        pointerEvents: isActive ? 'auto' : 'none',
                                        filter: `brightness(${brightness})`,
                                    }}
                                >
                                    {/* 3D CARD */}
                                    <div className="group relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-3xl overflow-visible shadow-2xl transition-all duration-500 hover:shadow-yellow-400/20 border border-zinc-700/50">
                                        {/* IMAGE CONTAINER - Overflowing top */}
                                        <div className="relative -mt-48 mb-2 h-96 flex items-end justify-center overflow-visible">
                                            {trainer.image ? (
                                                <div className="relative w-64 h-96 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-4">
                                                    <Image
                                                        src={trainer.image}
                                                        alt={trainer.name}
                                                        fill
                                                        className="object-contain object-bottom drop-shadow-2xl"
                                                        sizes="256px"
                                                        style={{
                                                            filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))',
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl">
                                                    <div className="w-32 h-32 rounded-full bg-yellow-400/20 flex items-center justify-center">
                                                        <svg className="w-16 h-16 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* EXPERIENCE NUMBER - Large yellow with opacity */}
                                        <div className="absolute -top-4 right-4 pointer-events-none text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="text-[120px] font-black text-yellow-400/20 leading-none select-none">
                                                    {trainer.experience}
                                                </span>
                                                <span className="text-xs font-bold text-yellow-400/30 uppercase tracking-wider mt-1">
                                                    {trainer.experience === 1 ? 'Year' : 'Years'} Experience
                                                </span>
                                            </div>
                                        </div>

                                        {/* CONTENT */}
                                        <div className="px-6 pb-3 pt-2 space-y-2 relative z-10">
                                            {/* Experience badge below image */}


                                            {/* Name */}
                                            <div className="text-center">
                                                {trainer.name.split(' ').length > 1 ? (
                                                    <>
                                                        <div className="text-sm font-semibold text-zinc-400 ">
                                                            {trainer.name.split(' ').slice(0, -1).join(' ')}
                                                        </div>
                                                        <h3 className="text-3xl font-black text-zinc-100 leading-tight">
                                                            {trainer.name.split(' ').slice(-1)[0]}
                                                        </h3>
                                                    </>
                                                ) : (
                                                    <h3 className="text-3xl font-black text-zinc-100 leading-tight">
                                                        {trainer.name}
                                                    </h3>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-center mb-2">
                                                <div className="py-1.5 ">
                                                    <span className="text-yellow-400 text-sm font-bold">
                                                        {trainer.experience} {trainer.experience === 1 ? 'Year' : 'Years'} Experience
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Specialty */}
                                            <div className="pt-2 border-t border-zinc-700/50">
                                                <p className="text-zinc-300 text-sm leading-relaxed text-center font-medium">
                                                    {trainer.specialty}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* NAVIGATION BUTTONS */}
                {trainers.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-zinc-900/80 border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 transition-all duration-300 backdrop-blur-sm"
                            aria-label="Previous trainer"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-zinc-900/80 border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 transition-all duration-300 backdrop-blur-sm"
                            aria-label="Next trainer"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {/* INDICATORS */}
                {trainers.length > 1 && (
                    <div className="flex justify-center gap-2 mt-2">
                        {trainers.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'w-8 bg-yellow-400'
                                    : 'w-2 bg-zinc-700 hover:bg-zinc-600'
                                    }`}
                                aria-label={`Go to trainer ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </section>
    );
}
