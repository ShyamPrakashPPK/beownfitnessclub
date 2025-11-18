'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function VideoBanner() {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        // Load Vimeo player script
        const script = document.createElement('script');
        script.src = 'https://player.vimeo.com/api/player.js';
        script.async = true;
        document.body.appendChild(script);

        // Hide thumbnail after video starts playing
        const handleMessage = (event: MessageEvent) => {
            if (event.data === 'ready' || event.data?.event === 'play') {
                setIsVideoLoaded(true);
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="relative w-full bg-black overflow-hidden h-screen md:h-auto">
            {/* Responsive video container */}
            {/* Mobile: Full screen height with scaled video */}
            <div className="relative w-full h-full md:hidden overflow-hidden">
                <iframe
                    ref={iframeRef}
                    src="https://player.vimeo.com/video/1137572394?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1&responsive=1"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute top-1/2 left-1/2 w-[177.78vh] h-screen"
                    title="Fitness Cinematic video _ Gym commercial _ Cinematic fitness film _ Fitness commercial"
                    onLoad={() => {
                        setTimeout(() => setIsVideoLoaded(true), 1000);
                    }}
                    style={{
                        opacity: isVideoLoaded ? 1 : 0,
                        transition: 'opacity 0.5s ease-in',
                        filter: 'grayscale(100%)',
                        transform: 'translate(-50%, -50%)',
                        objectFit: 'cover'
                    }}
                />
            </div>
            {/* Desktop: 16:9 aspect ratio - original size, no scaling */}
            <div className="hidden md:block relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                    src="https://player.vimeo.com/video/1137572394?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1&responsive=1"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute top-0 left-0 w-full h-full"
                    title="Fitness Cinematic video _ Gym commercial _ Cinematic fitness film _ Fitness commercial"
                    onLoad={() => {
                        setTimeout(() => setIsVideoLoaded(true), 1000);
                    }}
                    style={{
                        opacity: isVideoLoaded ? 1 : 0,
                        transition: 'opacity 0.5s ease-in',
                        filter: 'grayscale(100%)'
                    }}
                />
            </div>

            {/* Logo overlay - always visible on top of video */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4">
                <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                        src="/common/goldenlogo.png"
                        alt="Be Own Fitness Club Logo"
                        width={400}
                        height={400}
                        className="object-contain w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] h-auto opacity-90 drop-shadow-2xl"
                        priority
                        sizes="(max-width: 640px) 300px, (max-width: 768px) 350px, (max-width: 1024px) 400px, (max-width: 1280px) 450px, 500px"
                    />
                </div>
            </div>
        </div>
    );
}