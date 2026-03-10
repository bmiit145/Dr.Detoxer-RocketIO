'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AppImage from '@/components/ui/AppImage';

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const handleBuyNow = () => {
    document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="final-cta"
      ref={ref}
      className="py-32 lg:py-40 relative overflow-hidden"
      aria-labelledby="cta-heading">
      {/* Accent background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-pale" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
          'radial-gradient(ellipse at 30% 50%, rgba(26,60,46,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(42,127,191,0.06) 0%, transparent 60%)'
        }}
        aria-hidden="true" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            className="col-span-12 lg:col-span-6 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}>
              
              <span className="text-xs font-semibold tracking-widest uppercase text-muted mb-6 block">
                Your Family Deserves Better
              </span>
            </motion.div>

            <motion.h2
              id="cta-heading"
              className="section-headline font-display font-light text-foreground mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              
              Protect your family
              <br />
              from{' '}
              <span className="italic text-gradient-green">harmful pesticides.</span>
            </motion.h2>

            <motion.p
              className="text-muted text-lg leading-relaxed font-light mb-10 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}>
              
              Every meal starts with what you wash. Make that first step count.
              Dr. Detoxer is the simplest, most effective change you can make
              to protect the health of everyone you love.
            </motion.p>

            {/* Price + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-6">
              
              <div className="flex items-center gap-4">
                <span className="font-display text-5xl font-semibold text-foreground">₹299</span>
                <div>
                  <p className="text-muted line-through text-lg">₹499</p>
                  <p className="text-primary text-sm font-semibold">Save ₹200 today</p>
                </div>
              </div>

              <button
                onClick={handleBuyNow}
                className="btn-primary w-full sm:w-auto px-14 py-5 rounded-2xl font-semibold text-lg tracking-wide shadow-green-lg animate-pulse-glow"
                aria-label="Buy Dr. Detoxer — protect your family from pesticides">
                
                Buy Now — Wash Smart. Live Safe.
              </button>

              {/* Payment icons */}
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-muted text-xs">Secure payment via:</span>
                {['UPI', 'Visa', 'Mastercard', 'RuPay', 'Net Banking']?.map((p) =>
                <span
                  key={p}
                  className="bg-white border border-border px-3 py-1.5 rounded-xl text-xs font-semibold text-foreground shadow-soft">
                  
                    {p}
                  </span>
                )}
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap gap-6 text-sm text-muted pt-2">
                <span className="flex items-center gap-1.5">
                  <span>🔒</span> SSL Secured
                </span>
                <span className="flex items-center gap-1.5">
                  <span>🚚</span> Pan-India Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <span>↩️</span> 30-Day Returns
                </span>
                <span className="flex items-center gap-1.5">
                  <span>📞</span> 24/7 Support
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Product image */}
          <motion.div
            className="col-span-12 lg:col-span-5 lg:col-start-8 order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            
            <div className="relative">
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-30 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, #2d6b4f 0%, #2a7fbf 50%, transparent 80%)'
                }}
                aria-hidden="true" />
              
              <motion.div
                className="relative animate-float-slow"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}>
                
                <AppImage
                  src="https://images.unsplash.com/photo-1612975817531-e81150eaa3e1"
                  alt="Dr. Detoxer vegetable and fruit wash liquid — buy now and protect your family"
                  width={500}
                  height={580}
                  className="object-cover rounded-5xl shadow-green-lg"
                  style={{ maxHeight: '520px' }} />
                
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);


}