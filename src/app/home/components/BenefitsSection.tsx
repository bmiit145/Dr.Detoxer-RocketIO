'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';


const benefits = [
  {
    icon: '🧫',
    title: 'Removes Pesticides',
    description: 'Breaks down and lifts pesticide residues that cling to produce skin — invisible to the naked eye.',
    size: 'large',
    bg: 'bg-primary-50',
    accent: 'text-primary',
  },
  {
    icon: '🦠',
    title: 'Kills Bacteria',
    description: 'Eliminates E. coli, Salmonella, and surface bacteria on contact.',
    size: 'small',
    bg: 'bg-blue-pale',
    accent: 'text-blue-brand',
  },
  {
    icon: '✨',
    title: 'Chemical Free',
    description: 'Zero synthetic chemicals. Safe for the whole family including children.',
    size: 'small',
    bg: 'bg-amber-50',
    accent: 'text-gold-dark',
  },
  {
    icon: '🌿',
    title: 'Natural Ingredients',
    description: 'Powered by Neem, Tulsi, and Lemon — time-tested natural cleansers.',
    size: 'medium',
    bg: 'bg-primary-50',
    accent: 'text-primary',
  },
  {
    icon: '🛡️',
    title: 'Safe Every Day',
    description: 'Gentle enough for daily use. Tough on contaminants, kind to produce.',
    size: 'medium',
    bg: 'bg-blue-pale',
    accent: 'text-blue-brand',
  },
  {
    icon: '💧',
    title: 'Easy to Use',
    description: 'Just 20ml per litre of water. Soak, wait 5 minutes, rinse. Done.',
    size: 'large',
    bg: 'bg-surface',
    accent: 'text-primary-light',
  },
];

export default function BenefitsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const handleBuyNow = () => {
    document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="benefits"
      ref={ref}
      className="py-32 lg:py-40 bg-white"
      aria-labelledby="benefits-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-12 gap-8 mb-20">
          <motion.div
            className="col-span-12 lg:col-span-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-muted mb-4 block">
              Why Dr. Detoxer
            </span>
            <h2
              id="benefits-heading"
              className="section-headline font-display font-light text-foreground"
            >
              Engineered for{' '}
              <span className="italic text-gradient-green">protection.</span>
              <br />
              Crafted for{' '}
              <span className="italic" style={{ color: 'var(--color-blue)' }}>
                purity.
              </span>
            </h2>
          </motion.div>
          <motion.div
            className="col-span-12 lg:col-span-5 lg:col-start-8 flex flex-col justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-muted text-lg leading-relaxed font-light">
              Six core benefits that make Dr. Detoxer the most complete
              produce-cleaning solution for modern Indian homes.
            </p>
          </motion.div>
        </div>

        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits?.map((benefit, i) => (
            <motion.div
              key={benefit?.title}
              initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -1 : 1 }}
              animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -8,
                rotate: i % 2 === 0 ? 0.5 : -0.5,
                transition: { duration: 0.3 },
              }}
              className={`${benefit?.bg} rounded-4xl p-8 lg:p-10 border border-border cursor-default
                ${benefit?.size === 'large' ? 'md:col-span-2 lg:col-span-1' : ''}
              `}
            >
              <span className="text-5xl mb-6 block">{benefit?.icon}</span>
              <h3 className={`font-display text-2xl font-semibold mb-3 ${benefit?.accent}`}>
                {benefit?.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{benefit?.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <button
            onClick={handleBuyNow}
            className="btn-primary px-12 py-5 rounded-2xl font-semibold text-base tracking-wide shadow-green-lg"
            aria-label="Buy Dr. Detoxer"
          >
            Buy Now — ₹299
          </button>
          <p className="text-muted text-sm mt-4">Free delivery on orders above ₹499</p>
        </motion.div>
      </div>
    </section>
  );
}