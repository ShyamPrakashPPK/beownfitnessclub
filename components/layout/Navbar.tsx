'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [scrollY, setScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Calculate background opacity based on scroll position (0 to 0.8)
    // Start showing background after scrolling past first section (viewport height)
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    const scrollThreshold = viewportHeight;
    const backgroundOpacity = scrollY > scrollThreshold
        ? Math.min(0.3 + ((scrollY - scrollThreshold) / 300) * 0.5, 0.8)
        : 0;

    const navLinks = [
        { href: '/#about', label: 'About' },
        { href: '/#contact', label: 'Contact Us' },
        { href: '/supplements', label: 'Supplements' },
    ];

    const isActive = (href: string) => {
        if (href === '/supplements') {
            return pathname === '/supplements';
        }
        if (typeof window !== 'undefined' && pathname === '/') {
            return window.location.hash === `#${href.split('#')[1]}`;
        }
        return false;
    };

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
            style={{
                backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})`,
                backdropFilter: backgroundOpacity > 0 ? 'blur(10px)' : 'none',
                WebkitBackdropFilter: backgroundOpacity > 0 ? 'blur(10px)' : 'none',
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center flex-shrink-0">
                        <Image
                            src="/common/goldenlogo.png"
                            alt="Be Own Fitness Club Logo"
                            width={120}
                            height={120}
                            className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm md:text-base font-medium transition-colors duration-200 ${isActive(link.href)
                                    ? 'text-yellow-400'
                                    : 'text-zinc-300 hover:text-yellow-400'
                                    }`}
                                onClick={() => {
                                    if (link.href.startsWith('/#')) {
                                        const hash = link.href.split('#')[1];
                                        const element = document.getElementById(hash);
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-zinc-300 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-lg p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
                        ? 'max-h-64 opacity-100'
                        : 'max-h-0 opacity-0 overflow-hidden'
                        }`}
                >
                    <div className="py-4 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block text-base font-medium transition-colors duration-200 ${isActive(link.href)
                                    ? 'text-yellow-400'
                                    : 'text-zinc-300 hover:text-yellow-400'
                                    }`}
                                onClick={() => {
                                    if (link.href.startsWith('/#')) {
                                        const hash = link.href.split('#')[1];
                                        const element = document.getElementById(hash);
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

