'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Fill 1 Litre of Water',
    description: 'Use a clean bowl or basin. Room temperature water works best for optimal extraction.',
    icon: '💧',
    color: 'bg-blue-pale border-blue-brand/20',
    numColor: 'text-blue-brand',
  },
  {
    number: '02',
    title: 'Add 20ml Dr. Detoxer',
    description: 'Just one capful (20ml) per litre. The formula activates immediately on contact with water.',
    icon: '🧴',
    color: 'bg-primary-50 border-primary-100',
    numColor: 'text-primary',
  },
  {
    number: '03',
    title: 'Soak for 5–10 Minutes',
    description: 'Submerge your fruits and vegetables fully. The natural actives work to break down contaminants.',
    icon: '⏱️',
    color: 'bg-amber-50 border-amber-100',
    numColor: 'text-gold-dark',
  },
  {
    number: '04',
    title: 'Rinse with Clean Water',
    description: 'A final rinse with potable water removes all loosened residues. Your produce is now clean.',
    icon: '✅',
    color: 'bg-primary-50 border-primary-100',
    numColor: 'text-primary',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const handleBuyNow = () => {
    document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-32 lg:py-40 bg-white relative overflow-hidden"
      aria-labelledby="how-heading"
    >
      {/* Background decoration */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-12 gap-8 mb-20">
          <motion.div
            className="col-span-12 lg:col-span-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-muted mb-4 block">
              Simple Process
            </span>
            <h2
              id="how-heading"
              className="section-headline font-display font-light text-foreground"
            >
              Four steps to{' '}
              <span className="italic text-gradient-green">perfectly</span>
              <br />
              clean produce.
            </h2>
          </motion.div>
          <motion.div
            className="col-span-12 lg:col-span-5 lg:col-start-8 flex items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-muted text-lg leading-relaxed font-light">
              No special equipment. No expertise needed. Just water, Dr. Detoxer,
              and 10 minutes between you and truly clean food.
            </p>
          </motion.div>
        </div>

        {/* Steps — visual flow */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div
            className="hidden lg:block absolute top-16 left-0 right-0 h-px step-line opacity-20"
            style={{ top: '3.5rem' }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps?.map((step, i) => (
              <motion.div
                key={step?.number}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                {/* Step number circle */}
                <div className={`relative z-10 w-14 h-14 rounded-full ${step?.color} border-2 flex items-center justify-center mb-8 shadow-soft`}>
                  <span className={`font-display font-semibold text-sm ${step?.numColor}`}>
                    {step?.number}
                  </span>
                </div>

                {/* Content card */}
                <motion.div
                  className={`${step?.color} border rounded-4xl p-8 h-full trust-badge`}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-4xl mb-5 block">{step?.icon}</span>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {step?.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{step?.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <p className="font-display text-2xl lg:text-3xl italic font-light text-foreground mb-8">
            Start cleaning your food safely — today.
          </p>
          <button
            onClick={handleBuyNow}
            className="btn-primary px-12 py-5 rounded-2xl font-semibold text-base tracking-wide shadow-green-lg"
            aria-label="Buy Dr. Detoxer and start cleaning produce safely"
          >
            Buy Now — ₹299
          </button>
        </motion.div>
      </div>
    </section>
  );
}