'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

interface SocialPost {
    _id: string;
    embedCode: string;
    platform: string;
    createdAt: string;
}

export default function SocialFeed() {
    const [posts, setPosts] = useState<SocialPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [visibleCount, setVisibleCount] = useState(3); // Show 3 posts initially (1 row)

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        // Re-initialize Instagram embeds when posts change, script loads, or visible count changes
        if (scriptLoaded && posts.length > 0 && typeof window !== 'undefined') {
            const instgrm = (window as any).instgrm;
            if (instgrm) {
                // Small delay to ensure DOM is updated
                setTimeout(() => {
                    instgrm.Embeds.process();
                }, 100);
            }
        }
    }, [posts, scriptLoaded, visibleCount]);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/social-posts');
            const data = await res.json();
            if (data.success) {
                setPosts(data.data);
            }
        } catch (error) {
            console.error('Error fetching social posts:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section id="socials" className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-8 lg:px-16 py-20 bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
            </section>
        );
    }

    if (posts.length === 0) {
        return null;
    }

    return (
        <>
            {/* Instagram Embed Script */}
            <Script
                src="//www.instagram.com/embed.js"
                strategy="lazyOnload"
                onLoad={() => setScriptLoaded(true)}
            />

            <section
                id="socials"
                className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-8 lg:px-16 py-20 bg-black overflow-hidden"
            >
                {/* BACKGROUND DECOR */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute top-20 left-20 w-96 h-96 rotate-45 border border-zinc-600"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 -rotate-45 border border-zinc-600"></div>
                </div>

                <div className="relative w-full max-w-7xl mx-auto">
                    {/* HEADER */}
                    <div className="text-center mb-16">
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-zinc-100 mb-6">
                            OUR SOCIALS
                        </h2>
                        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
                            Follow our journey and stay connected with our fitness community
                        </p>
                    </div>

                    {/* INSTAGRAM-STYLE GALLERY GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.slice(0, visibleCount).map((post) => (
                            <div
                                key={post._id}
                                className="group relative bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-400/10"
                            >
                                {/* Embed Container */}
                                <div
                                    className="w-full"
                                    dangerouslySetInnerHTML={{ __html: post.embedCode }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* View More Button and Follow Button */}
                    {posts.length > 0 && (
                        <div className="text-center mt-12 space-y-4">
                            {/* View More Button */}
                            {visibleCount < posts.length && (
                                <button
                                    onClick={() => {
                                        setVisibleCount((prev) => Math.min(prev + 3, posts.length));
                                        // Re-process embeds after a short delay to ensure new posts are rendered
                                        setTimeout(() => {
                                            const instgrm = (window as any).instgrm;
                                            if (instgrm) {
                                                instgrm.Embeds.process();
                                            }
                                        }, 100);
                                    }}
                                    className="inline-flex items-center gap-2 px-8 py-3 bg-zinc-800 border border-yellow-400/30 text-yellow-400 font-bold rounded-lg hover:bg-yellow-400/10 hover:border-yellow-400/50 transition-all duration-300"
                                >
                                    View More
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            )}

                            {/* Follow Button */}
                            <div>
                                <a
                                    href="https://www.instagram.com/hulkfitness_eachur/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                    Follow @hulkfitness_eachur
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </section>

        </>
    );
}
