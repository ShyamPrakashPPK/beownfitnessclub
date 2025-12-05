'use client';
import React, { useState } from 'react';
import ScrollAnimation from '@/components/ui/ScrollAnimation';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        Name: '',
        Phone: '',
        Message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error message when user starts typing
        if (submitStatus === 'error') {
            setSubmitStatus('idle');
            setErrorMessage('');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setSubmitStatus('success');
                setFormData({ Name: '', Phone: '', Message: '' });
                // Reset success message after 5 seconds
                setTimeout(() => {
                    setSubmitStatus('idle');
                }, 5000);
            } else {
                setSubmitStatus('error');
                setErrorMessage(data.error || 'Failed to submit form. Please try again.');
            }
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-8 lg:px-16 py-20 bg-black overflow-hidden"
        >
            {/* BACKGROUND DECOR */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-20 left-20 w-96 h-96 rotate-45 border border-zinc-600"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 -rotate-45 border border-zinc-600"></div>
            </div>

            <div className="relative w-full max-w-4xl mx-auto">
                <ScrollAnimation className="fade-in-up">
                    {/* HEADING */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-100 mb-4">
                            Contact Us
                        </h2>
                        <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                            Get in touch with us for more information. We'd love to hear from you.
                        </p>
                    </div>

                    {/* FORM */}
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 sm:p-10 lg:p-12 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* NAME FIELD */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="Name"
                                    className="block text-sm font-medium text-zinc-300"
                                >
                                    Name <span className="text-yellow-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="Name"
                                    name="Name"
                                    value={formData.Name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* PHONE FIELD */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="Phone"
                                    className="block text-sm font-medium text-zinc-300"
                                >
                                    Phone Number <span className="text-yellow-400">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="Phone"
                                    name="Phone"
                                    value={formData.Phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            {/* MESSAGE FIELD */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="Message"
                                    className="block text-sm font-medium text-zinc-300"
                                >
                                    Message <span className="text-yellow-400">*</span>
                                </label>
                                <textarea
                                    id="Message"
                                    name="Message"
                                    value={formData.Message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 resize-none"
                                    placeholder="Tell us how we can help you..."
                                />
                            </div>

                            {/* SUBMIT BUTTON */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 px-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-yellow-400/20"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg
                                            className="animate-spin h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : (
                                    'Send Message'
                                )}
                            </button>

                            {/* SUCCESS MESSAGE */}
                            {submitStatus === 'success' && (
                                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-center animate-fade-in">
                                    <p className="flex items-center justify-center gap-2">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        Message sent successfully! We'll get back to you soon.
                                    </p>
                                </div>
                            )}

                            {/* ERROR MESSAGE */}
                            {submitStatus === 'error' && (
                                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-center animate-fade-in">
                                    <p className="flex items-center justify-center gap-2">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                        {errorMessage}
                                    </p>
                                </div>
                            )}
                        </form>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
}

