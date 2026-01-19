"use client";
import { motion, Variants } from 'motion/react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

const Contact = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setStatus('success');
                toast.success('Message sent successfully!');
                form.reset();
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                setStatus('error');
                toast.error(result.error || 'Something went wrong. Please try again.');
                setTimeout(() => setStatus('idle'), 3000);
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
            toast.error('Failed to send message.');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };




    return (
        <section className="pt-24 md:pt-48 pb-10 md:pb-28 px-5 md:px-12 lg:px-20 bg-neutral-50 overflow-hidden" id="contact">
            <Toaster position="top-right" />
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center gap-6 md:mb-24 mb-16">
                    <div className="max-w-3xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6 font-jakarta text-neutral-900"
                        >
                            Let&apos;s Talk!
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-2xl"
                    >
                        <p className="md:text-lg font-medium text-neutral-500 font-jakarta leading-relaxed">
                            Send us a message and we will get back to you within 24 hours to arrange a call!
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="bg-white p-6 md:p-12 rounded-[2rem] border border-neutral-100 shadow-sm"
                    >
                        <form className="space-y-8 md:space-y-12" onSubmit={handleSubmit}>
                            {/* Honeypot field */}
                            <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
                            <div className="space-y-4 md:space-y-6">
                                {[
                                    { label: "Name", type: "text", placeholder: "Your name", name: "name" },
                                    { label: "Email", type: "email", placeholder: "Enter Your Email", name: "email" }
                                ].map((field, idx) => (
                                    <div key={idx} className="flex flex-col gap-2">
                                        <label className="text-xs md:text-sm font-semibold text-neutral-500 uppercase tracking-widest ml-1">{field.label}</label>
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            required
                                            placeholder={field.placeholder}
                                            className="w-full bg-neutral-50 border border-neutral-100 rounded-xl md:rounded-2xl px-4 py-3 md:px-6 md:py-4 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-rose-600/10 focus:border-rose-600/30 transition-all font-jakarta text-sm md:text-base"
                                        />
                                    </div>
                                ))}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs md:text-sm font-semibold text-neutral-500 uppercase tracking-widest ml-1">More for you</label>
                                    <textarea
                                        rows={5}
                                        name="message"
                                        required
                                        placeholder="More about your project"
                                        className="w-full bg-neutral-50 border border-neutral-100 rounded-xl md:rounded-2xl px-4 py-3 md:px-6 md:py-4 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-rose-600/10 focus:border-rose-600/30 transition-all font-jakarta resize-none text-sm md:text-base"
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={status === 'loading'}
                                className="  bg-gradient-to-t border border-neutral-600 from-[#626161] via-[#030303] to-[#1a1919] shadow-lg shadow-rose-100 hover:bg-neutral-800 text-white rounded-xl md:rounded-2xl px-3 md:px-7 py-3 md:py-4   flex items-center justify-center gap-3 transition-all duration-300 group hover:shadow-rose-600/20 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span className="text-sm md:text-base font-bold font-jakarta">Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-sm md:text-base font-bold font-jakarta">Send an inquiry</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;