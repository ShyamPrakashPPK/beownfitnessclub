'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";

// Note: If images don't load, the folder name "slides " has a trailing space
// Consider renaming the folder to "slides" (without space) for better compatibility
const gymImages = [
    "/slides/1.png",
    "/slides/2.png",
    "/slides/3.png",
];

export default function About() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(
            () => setCurrentImageIndex((prev) => (prev + 1) % gymImages.length),
            4000
        );
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="about"
            className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-8 lg:px-16 py-20 bg-black overflow-hidden select-none"
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
        >
            {/* BACKGROUND DECOR */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-10 right-20 w-96 h-96 rotate-45 border border-zinc-600"></div>
                <div className="absolute bottom-10 right-40 w-96 h-96 -rotate-45 border border-zinc-600"></div>
            </div>

            <div className="relative w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[40%_60%] gap-[5%] items-center">
                {/* LEFT — IMAGE SLIDER */}
                <div className="relative w-full h-[380px] sm:h-[500px] lg:h-[650px] rounded-xl overflow-hidden shadow-2xl bg-zinc-900">
                    {gymImages.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-700 select-none ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                                }`}
                            onDragStart={(e) => e.preventDefault()}
                        >
                            <Image
                                src={image}
                                alt={`Gym facility ${index + 1}`}
                                fill
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                className="object-cover pointer-events-none"
                                priority={index === 0}
                                draggable={false}
                                onDragStart={(e) => e.preventDefault()}
                            />
                        </div>
                    ))}

                    {/* SLIDER DOTS */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {gymImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                                    ? "w-8 bg-yellow-400"
                                    : "w-2 bg-zinc-600 hover:bg-zinc-400"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="relative flex w-full items-start ">
                    {/* VERTICAL TEXT EXACT LIKE REFERENCE */}
                    <div className="hidden lg:flex flex-col justify-center items-center select-none">
                        <span
                            className="text-white font-extrabold text-[130px] tracking-widest rotate-180 [writing-mode:vertical-rl]"
                        >
                            ABOUT
                        </span>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="flex-1 text-zinc-300 space-y-6 max-w-2xl select-none">
                        <p className="text-lg sm:text-xl leading-relaxed font-medium">
                            Be Own Fitness Club is your premier destination for achieving your
                            fitness goals. Our state-of-the-art facility is fully equipped with
                            modern equipment and world-class amenities. Spread across a spacious
                            area, we provide you with an opportunity to work with expert trainers
                            who specialize in various fitness disciplines.
                        </p>

                        <p className="text-lg sm:text-xl leading-relaxed font-medium">
                            Apart from our regular trainers, we continuously bring in fitness
                            experts and professionals to work with you and help you improve even
                            more. Whether you're a beginner or an advanced athlete, we have the
                            resources and expertise to support your fitness journey.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}