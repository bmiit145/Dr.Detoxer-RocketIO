'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AppImage from '@/components/ui/AppImage';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }
  })
};

const floatingBadge = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.8 + i * 0.15, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bottleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleBuyNow = () => {
    document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLearnMore = () => {
    document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
      aria-label="Dr. Detoxer hero">
      
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-bl from-primary-50 via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[50%] bg-gradient-to-tr from-blue-pale via-transparent to-transparent opacity-50" />
      </div>

      {/* Decorative large background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true">
        
        <span
          className="hidden md:block font-display font-light italic text-primary-50 opacity-30"
          style={{ fontSize: 'clamp(8rem, 25vw, 22rem)', lineHeight: 0.85 }}>
          
          DETOX
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20 w-full">
        <div className="grid grid-cols-12 gap-8 items-center min-h-[80vh]">
          {/* Left: Text */}
          <motion.div
            className="col-span-12 lg:col-span-6 order-2 lg:order-1"
            style={{ y: textY, opacity }}>
            
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mb-6">
              
              <span className="inline-flex items-center gap-2 bg-primary-50 text-primary px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary-100">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Natural Formula · Chemical Free
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="hero-headline font-display font-light text-foreground mb-6">
              
              Wash{' '}
              <span className="italic text-gradient-green">Smart.</span>
              <br />
              Live{' '}
              <span className="italic" style={{ color: 'var(--color-blue)' }}>
                Safe.
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-muted text-lg leading-relaxed max-w-md mb-10 font-light">
              
              The first natural wash liquid that removes pesticides, bacteria, and
              hidden dirt from your fruits and vegetables — powered by Neem,
              Tulsi, and Lemon extracts.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 mb-14">
              
              <button
                onClick={handleBuyNow}
                className="btn-primary px-10 py-4 rounded-2xl font-semibold text-sm tracking-wide shadow-green"
                aria-label="Buy Dr. Detoxer now">
                
                Buy Now — ₹299
              </button>
              <button
                onClick={handleLearnMore}
                className="px-10 py-4 rounded-2xl font-semibold text-sm tracking-wide border border-border text-foreground hover:border-primary hover:text-primary transition-all duration-300"
                aria-label="Learn more about Dr. Detoxer">
                
                Learn More ↓
              </button>
            </motion.div>

            {/* Floating stat badges */}
            <div className="flex flex-wrap gap-4">
              {[
              { label: '100%', sub: 'Natural' },
              { label: '99%', sub: 'Pesticide Removal' },
              { label: '5 Min', sub: 'Soak Time' }].
              map((stat, i) =>
              <motion.div
                key={stat.sub}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={floatingBadge}
                className="glass px-5 py-3 rounded-2xl shadow-soft">
                
                  <p className="font-display font-semibold text-primary text-xl leading-none">
                    {stat.label}
                  </p>
                  <p className="text-muted text-xs mt-0.5">{stat.sub}</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right: Product bottle */}
          <div className="col-span-12 lg:col-span-6 order-1 lg:order-2 flex items-center justify-center relative">
            {/* Glow behind bottle */}
            <div
              className="absolute inset-0 m-auto rounded-full opacity-20 blur-3xl"
              style={{
                width: '60%',
                height: '60%',
                background: 'radial-gradient(circle, #2d6b4f 0%, #2a7fbf 50%, transparent 80%)'
              }}
              aria-hidden="true" />
            

            {/* Orbiting ring */}
            <div
              className="absolute w-80 h-80 rounded-full border border-primary-100 animate-rotate-slow opacity-30"
              aria-hidden="true" />
            
            <div
              className="absolute w-96 h-96 rounded-full border border-dashed border-blue-brand/20 animate-rotate-slow opacity-20"
              style={{ animationDirection: 'reverse', animationDuration: '30s' }}
              aria-hidden="true" />
            

            <motion.div
              className="relative z-10 animate-float"
              style={{ y: bottleY }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
              
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1b5243496-1773145707661.png"
                alt="Dr. Detoxer vegetable and fruit wash liquid bottle — natural formula"
                width={480}
                height={560}
                priority
                className="w-full h-auto object-contain rounded-5xl shadow-green-lg" />
              

              {/* Floating ingredient pills */}
              <motion.div
                className="absolute left-2 lg:left-0 top-1/4 glass px-4 py-2.5 rounded-2xl shadow-medium"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                
                <p className="text-xs font-semibold text-primary">🌿 Neem Extract</p>
              </motion.div>
              <motion.div
                className="absolute right-2 lg:right-0 top-1/2 glass px-4 py-2.5 rounded-2xl shadow-medium"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
                
                <p className="text-xs font-semibold text-primary">🍋 Lemon Extract</p>
              </motion.div>
              <motion.div
                className="absolute -left-4 bottom-1/4 glass px-4 py-2.5 rounded-2xl shadow-medium"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}>
                
                <p className="text-xs font-semibold text-primary">🌱 Tulsi Extract</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ opacity }}
          aria-hidden="true">
          
          <span className="text-muted text-xs tracking-widest uppercase font-medium">Scroll</span>
          <div className="w-px h-14 bg-border relative overflow-hidden rounded-full">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-primary rounded-full animate-scroll-line" />
          </div>
        </motion.div>
      </div>
    </section>);

}