'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const trustBadges = [
{
  icon: '🧪',
  title: 'Lab Tested',
  description: 'Independently tested for efficacy and safety in certified laboratories.',
  bg: 'bg-primary-50',
  border: 'border-primary-100'
},
{
  icon: '🌿',
  title: '100% Natural',
  description: 'Zero synthetic chemicals. Every ingredient is plant-derived and biodegradable.',
  bg: 'bg-surface',
  border: 'border-border'
},
{
  icon: '👨‍👩‍👧',
  title: 'Family Safe',
  description: 'Safe for infants, children, pregnant women, and the elderly.',
  bg: 'bg-blue-pale',
  border: 'border-blue-brand/20'
},
{
  icon: '🏆',
  title: 'Quality Certified',
  description: 'Manufactured in GMP-certified facilities following strict quality standards.',
  bg: 'bg-amber-50',
  border: 'border-amber-100'
}];


const testimonials = [
{
  name: 'Priya Sharma',
  location: 'Mumbai',
  role: 'Mother of two',
  quote:
  'I never realized how much residue was left on vegetables after regular washing. Dr. Detoxer gave me real peace of mind for my kids\' food.',
  rating: 5,
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1adc3d003-1763299095837.png",
  avatarAlt: 'Priya Sharma, mother from Mumbai, Dr. Detoxer customer'
},
{
  name: 'Rajesh Nair',
  location: 'Bengaluru',
  role: 'Health & Fitness Coach',
  quote:
  'As someone obsessed with clean eating, this is now non-negotiable in my kitchen. The lemon and neem smell is subtle but reassuring.',
  rating: 5,
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fa965c95-1772532604600.png",
  avatarAlt: 'Rajesh Nair, fitness coach from Bengaluru, Dr. Detoxer customer'
},
{
  name: 'Ananya Krishnan',
  location: 'Chennai',
  role: 'Nutritionist',
  quote:
  'I recommend Dr. Detoxer to all my clients. It\'s the most practical food safety step you can add to your daily routine.',
  rating: 5,
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1cb046198-1772972300061.png",
  avatarAlt: 'Ananya Krishnan, nutritionist from Chennai, Dr. Detoxer customer'
}];


export default function TrustSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="trust"
      ref={ref}
      className="py-32 lg:py-40 bg-white"
      aria-labelledby="trust-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}>
          
          <span className="text-xs font-semibold tracking-widest uppercase text-muted mb-4 block">
            Why Families Trust Us
          </span>
          <h2
            id="trust-heading"
            className="section-headline font-display font-light text-foreground">
            
            Science-backed.
            <br />
            <span className="italic text-gradient-green">Nature-powered.</span>
          </h2>
        </motion.div>

        {/* Trust badges — asymmetric */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {trustBadges?.map((badge, i) =>
          <motion.div
            key={badge?.title}
            initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -1 : 1 }}
            animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`${badge?.bg} border ${badge?.border} rounded-4xl p-8 trust-badge text-center`}>
            
              <span className="text-5xl mb-5 block">{badge?.icon}</span>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {badge?.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{badge?.description}</p>
            </motion.div>
          )}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials?.map((t, i) =>
          <motion.div
            key={t?.name}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`bg-surface border border-border rounded-4xl p-8 trust-badge ${i === 1 ? 'lg:mt-8' : ''}`}>
            
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t?.rating })?.map((_, si) =>
              <span key={si} className="text-gold text-lg">★</span>
              )}
              </div>

              <blockquote className="font-display italic text-xl font-light text-foreground leading-relaxed mb-8">
                "{t?.quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-100 shrink-0">
                  <AppImage
                  src={t?.avatar}
                  alt={t?.avatarAlt}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover" />
                
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t?.name}</p>
                  <p className="text-muted text-xs">
                    {t?.role} · {t?.location}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);


}

// Need AppImage in trust section
import AppImage from '@/components/ui/AppImage';