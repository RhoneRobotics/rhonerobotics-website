"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Laptop, Shirt, TrendingUp, Loader2, CheckCircle2 } from "lucide-react";
import { Toaster, toast } from "sonner";


const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } } // Premium ease
};

const staggerContainer = {
    visible: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function HiringPage() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        phone: "",
        hasPhotoshop: "",
        hasLaptop: "",
        portfolio: "",
        reason: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Map form state to API expected fields
        const payload = {
            name: formState.name,
            email: formState.email,
            phone: formState.phone,
            photoshopSkill: formState.hasPhotoshop === 'yes' ? 'Beginner/Pro' : (formState.hasPhotoshop === 'no' ? 'None' : ''),
            device: formState.hasLaptop === 'yes' ? 'Laptop/PC' : (formState.hasLaptop === 'no' ? 'Neither' : ''),
            portfolioLink: formState.portfolio,
            motivation: formState.reason
        };

        try {
            const response = await fetch('/api/trainee', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                toast.success("Application submitted successfully!");
                setIsSubmitted(true);
                // Optional: Reset form state if they want to submit another
                setFormState({
                    name: "",
                    email: "",
                    phone: "",
                    hasPhotoshop: "",
                    hasLaptop: "",
                    portfolio: "",
                    reason: ""
                });
            } else {
                toast.error(result.error || "Something went wrong.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Failed to submit application.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    return (
        <main className="min-h-screen w-full bg-[#FAFAFA] text-[#0a0a0a] font-sans selection:bg-black selection:text-white overflow-x-hidden">
            <Toaster position="top-right" />
            {/* 1. HERO SECTION */}
            <section className="relative z-10 pt-24 pb-16 md:pt-36 md:pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="flex flex-col items-center max-w-4xl"
                >
                    {/* Badge: Ultra minimal, monochrome */}
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm text-[10px] md:text-[11px] uppercase tracking-widest font-semibold text-gray-600 mb-8 md:mb-10">
                        <span className="relative flex h-1.5 w-1.5">
                            {/* Subtle red pulse only here */}
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
                        </span>
                        Remote Opportunity
                    </motion.div>

                    {/* Headline: Black & Gray, No Red Text */}
                    <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-6 md:mb-8 text-black leading-[1.1] md:leading-[1.05]">
                        Join us as a <br className="hidden md:block" />
                        <span className="text-gray-400">Digital Draper Trainee.</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-gray-500 max-w-xl md:max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed font-light tracking-tight px-2">
                        We are looking for creative minds to train and work on real clothing brand designs. <span className="text-black font-normal">Fully remote.</span>
                    </motion.p>

                    <motion.div variants={fadeInUp}>
                        {/* Button: Minimal Red interaction, primarily Black/Dark */}
                        <a href="#apply" className="group relative inline-flex items-center justify-center px-8 py-3.5 md:px-10 md:py-4 text-base font-medium text-white bg-black hover:bg-red-600 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-red-600 left-0 top-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
                            <span className="relative z-10 flex items-center">
                                Apply Now
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </span>
                        </a>
                    </motion.div>
                </motion.div>
            </section>

            {/* 2. WHY JOIN US - Clean Grid, Swiss Style */}
            <section className="relative z-10 py-20 md:py-32 px-6 border-t border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-16">
                        {[
                            { icon: TrendingUp, title: "Training First", desc: "We invest in your skills. Specialized workflow training provided before commercial work." },
                            { icon: Shirt, title: "Real Clothing Startup", desc: "Work on actual fashion & apparel campaigns. See your designs go live." },
                            { icon: Laptop, title: "Work From Home", desc: "100% remote freedom. Your setup, your schedule, your best work." },
                        ].map((col, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15, duration: 0.8 }}
                                className="group"
                            >
                                {/* Icon: Minimal, thin stroke, turns red on hover */}
                                <div className="mb-5 md:mb-6 inline-flex items-center justify-center w-12 h-12 border border-gray-200 rounded-full text-black group-hover:border-red-600 group-hover:text-red-600 transition-colors duration-300 bg-white">
                                    <col.icon className="w-5 h-5" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-semibold mb-3 md:mb-4 text-black tracking-tight">{col.title}</h3>
                                <p className="text-gray-500 leading-7 font-light text-base md:text-[17px]">{col.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. OPEN ROLE - Minimal Split */}
            <section className="relative z-10 py-20 md:py-32 px-6 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

                    <motion.div
                        className="flex-1 w-full"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        {/* Tag */}
                        <div className="inline-flex items-center gap-2 mb-6">
                            <span className="w-2 h-2 rounded-full bg-red-600"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Active Role</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-6 md:mb-8 text-black">
                            Digital Draper <br className="hidden lg:block" /> Trainee
                        </h2>

                        <div className="prose prose-lg text-gray-500 font-light mb-8 md:mb-10 max-w-xl text-base md:text-lg">
                            <p className="mb-6">
                                Perfect for beginners with basic Photoshop knowledge. Use this opportunity to bridge the gap between amateur skills and professional industry standards.
                            </p>
                            <p>
                                Training provided. Paid role upon successful completion.
                            </p>
                        </div>

                        <a href="#apply" className="text-black font-semibold border-b border-black/20 pb-0.5 hover:border-red-600 hover:text-red-600 transition-all text-base md:text-lg inline-flex items-center gap-2 group">
                            Apply for Training
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>

                    {/* Requirements List - Clean & Sharp */}
                    <div className="flex-1 w-full lg:pt-14">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6 md:space-y-8"
                        >
                            {[
                                "Basic knowledge of Adobe Photoshop",
                                "Own Laptop or PC (Windows/Mac)",
                                "Stable high-speed internet",
                                "Interest in streetwear aesthetics",
                                "Willingness to learn"
                            ].map((req, idx) => (
                                <div key={idx} className="flex items-center gap-5 md:gap-6 group border-b border-gray-100 pb-5 md:pb-6 last:border-0">
                                    <div className="text-gray-300 group-hover:text-red-600 transition-colors font-mono text-sm">
                                        0{idx + 1}
                                    </div>
                                    <span className="text-lg md:text-xl text-gray-800 font-light group-hover:translate-x-2 transition-transform duration-300">{req}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 5. JOURNEY / FLOW */}
            <section className="relative z-10 py-20 md:py-32 px-6 bg-[#FAFAFA] border-t border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                        {[
                            { step: "01", title: "Apply", sub: "Submit your details below." },
                            { step: "02", title: "Training", sub: "Learn our design workflow." },
                            { step: "03", title: "Hired", sub: "Join the production team." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="flex flex-col border-l border-gray-200 pl-8 relative"
                            >
                                <div className="absolute top-0 left-[-5px] w-[9px] h-[9px] bg-black rounded-full ring-4 ring-[#FAFAFA]"></div>
                                <span className="text-xs font-mono text-gray-400 mb-3 md:mb-4 tracking-widest uppercase">Step {item.step}</span>
                                <h3 className="text-2xl md:text-3xl font-medium text-black mb-2 tracking-tight">{item.title}</h3>
                                <p className="text-gray-500 font-light text-sm md:text-base">{item.sub}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. APPLICATION FORM - Ultra Minimal */}
            <section id="apply" className="relative z-10 py-16 md:py-32 px-6 bg-white">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-10 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-2 md:mb-4 text-black tracking-tight">Application</h2>
                        <p className="text-gray-500 font-light text-base md:text-xl">Quick and simple.</p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        {isSubmitted ? (
                            <div className="py-20 text-center bg-gray-50 rounded-[2rem]">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-medium text-black mb-2">Received</h3>
                                <p className="text-gray-500 mb-8">We'll contact you shortly.</p>
                                <button onClick={() => setIsSubmitted(false)} className="text-sm font-semibold border-b border-black pb-0.5 hover:text-gray-600 hover:border-gray-600">
                                    Submit Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
                                {/* Honeypot field */}
                                <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-12">
                                    <div className="group">
                                        <label className="block text-xs md:text-sm font-medium text-gray-400 mb-1 md:mb-2 uppercase tracking-widest group-focus-within:text-black transition-colors">Name</label>
                                        <input
                                            required
                                            name="name"
                                            value={formState.name}
                                            onChange={handleInputChange}
                                            className="w-full   border-gray-200 py-2 px-3 md:px-3 md:py-4 focus:outline-none focus:border-black transition-all text-sm md:text-xl text-black bg-neutral-50 placeholder:text-gray-200 rounded-xl "
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-xs md:text-sm font-medium text-gray-400 mb-1 md:mb-2 uppercase tracking-widest group-focus-within:text-black transition-colors">Email</label>
                                        <input
                                            required
                                            name="email"
                                            type="email"
                                            value={formState.email}
                                            onChange={handleInputChange}
                                            className="w-full   border-gray-200 py-2 px-3 md:px-3 md:py-4 focus:outline-none focus:border-black transition-all text-sm md:text-xl text-black bg-neutral-50 placeholder:text-gray-200 rounded-xl"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-xs md:text-sm font-medium text-gray-400 mb-1 md:mb-2 uppercase tracking-widest group-focus-within:text-black transition-colors">Phone</label>
                                    <input
                                        required
                                        name="phone"
                                        type="tel"
                                        value={formState.phone}
                                        onChange={handleInputChange}
                                        className="w-full   border-gray-200 py-2 px-3 md:px-3 md:py-4 focus:outline-none focus:border-black transition-all text-sm md:text-xl text-black bg-neutral-50 placeholder:text-gray-200 rounded-xl"
                                        placeholder="+91 888 000 0000"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-12">
                                    <div className="group">
                                        <label className="block text-xs md:text-sm font-medium text-gray-400 mb-3 md:mb-4 uppercase tracking-widest">Photoshop Skill</label>
                                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                            <label className="flex items-center gap-3 cursor-pointer group/radio">
                                                <input type="radio" name="hasPhotoshop" value="yes" onChange={handleInputChange} required className="peer hidden" />
                                                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border border-gray-300 peer-checked:border-black peer-checked:bg-black transition-all shrink-0"></div>
                                                <span className="text-sm md:text-lg text-gray-600 peer-checked:text-black">Beginner/Pro</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer group/radio">
                                                <input type="radio" name="hasPhotoshop" value="no" onChange={handleInputChange} className="peer hidden" />
                                                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border border-gray-300 peer-checked:border-black peer-checked:bg-black transition-all shrink-0"></div>
                                                <span className="text-sm md:text-lg text-gray-600 peer-checked:text-black">None</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="block text-xs md:text-sm font-medium text-gray-400 mb-3 md:mb-4 uppercase tracking-widest">Device</label>
                                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                            <label className="flex items-center gap-3 cursor-pointer group/radio">
                                                <input type="radio" name="hasLaptop" value="yes" onChange={handleInputChange} required className="peer hidden" />
                                                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border border-gray-300 peer-checked:border-black peer-checked:bg-black transition-all shrink-0"></div>
                                                <span className="text-sm md:text-lg text-gray-600 peer-checked:text-black">Laptop/PC</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer group/radio">
                                                <input type="radio" name="hasLaptop" value="no" onChange={handleInputChange} className="peer hidden" />
                                                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border border-gray-300 peer-checked:border-black peer-checked:bg-black transition-all shrink-0"></div>
                                                <span className="text-sm md:text-lg text-gray-600 peer-checked:text-black">Neither</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-xs md:text-sm font-medium text-gray-400 mb-1 md:mb-2 uppercase tracking-widest group-focus-within:text-black transition-colors">Portfolio Link (Optional)</label>
                                    <input
                                        name="portfolio"
                                        type="url"
                                        value={formState.portfolio}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border-b border-gray-200 py-2 md:py-4 focus:outline-none focus:border-black transition-all text-sm md:text-xl text-black px-2 placeholder:text-gray-200"
                                        placeholder="drive.google.com/..."
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-xs md:text-sm font-medium text-gray-400 mb-1 md:mb-2 uppercase tracking-widest group-focus-within:text-black transition-colors">Motivation</label>
                                    <textarea
                                        name="reason"
                                        value={formState.reason}
                                        onChange={handleInputChange}
                                        rows={2}
                                        className="w-full bg-transparent border-b border-gray-200 py-2 md:py-4 focus:outline-none focus:border-black transition-all text-sm md:text-xl text-black px-2 placeholder:text-gray-200 resize-none"
                                        placeholder="Why should we train you?"
                                    />
                                </div>

                                <div className="pt-8 flex justify-start">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group relative cursor-pointer inline-flex items-center justify-center px-5 py-3.5 md:px-10 md:py-4 text-base font-medium text-white bg-black hover:bg-red-600 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-red-600 left-0 top-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
                                        <span className="relative z-10 flex items-center">
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="animate-spin w-5 h-5 mr-2" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    Submit Application
                                                    <ArrowRight className="ml-2 w-4 h-4" />
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>
        </main>
    );
}