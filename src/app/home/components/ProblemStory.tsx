'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const threats = [
{
  icon: '☠️',
  label: 'Pesticides',
  description: 'Up to 67% of produce tests positive for pesticide residues that plain water cannot remove.',
  color: 'from-red-50 to-orange-50',
  border: 'border-red-100',
  textColor: 'text-red-700'
},
{
  icon: '🦠',
  label: 'Bacteria',
  description: 'E. coli, Salmonella, and other harmful bacteria cling to produce surfaces even after rinsing.',
  color: 'from-amber-50 to-yellow-50',
  border: 'border-amber-100',
  textColor: 'text-amber-700'
},
{
  icon: '🏭',
  label: 'Chemicals',
  description: 'Wax coatings, preservatives, and chemical sprays are applied post-harvest to extend shelf life.',
  color: 'from-blue-50 to-slate-50',
  border: 'border-blue-100',
  textColor: 'text-blue-700'
}];


export default function ProblemStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="problem"
      ref={ref}
      className="py-32 lg:py-40 relative overflow-hidden"
      aria-labelledby="problem-heading">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-surface to-white pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16">
          
          <span className="text-xs font-semibold tracking-widest uppercase text-muted border-b border-border pb-1">
            The Hidden Danger
          </span>
        </motion.div>

        {/* Split layout */}
        <div className="grid grid-cols-12 gap-12 lg:gap-20 items-center mb-24">
          {/* Left: Big statement */}
          <motion.div
            className="col-span-12 lg:col-span-5"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            
            <h2
              id="problem-heading"
              className="section-headline font-display font-light text-foreground mb-8">
              
              Your fruits look{' '}
              <span className="italic text-gradient-green">clean.</span>
              <br />
              They're{' '}
              <span className="italic" style={{ color: '#c0392b' }}>
                not.
              </span>
            </h2>
            <p className="text-muted text-lg leading-relaxed font-light mb-8">
              Plain water removes only visible dirt. The invisible threat — pesticide residues,
              bacterial biofilms, and chemical coatings — remains on every piece of produce
              you bring home.
            </p>
            <div className="divider-organic mb-8" />
            <p className="text-foreground font-semibold text-base">
              Every day, your family consumes trace amounts of chemicals
              that accumulate silently in the body.
            </p>
          </motion.div>

          {/* Right: Image with overlay */}
          <motion.div
            className="col-span-12 lg:col-span-7 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            
            <div className="relative rounded-5xl overflow-hidden shadow-strong">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_17a6616ec-1773145711889.png"
                alt="Fresh vegetables and fruits that appear clean but may contain pesticides and bacteria"
                width={900}
                height={560}
                className="w-full object-cover"
                style={{ height: '420px' }} />
              
              {/* Dark overlay with text */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="font-display italic text-2xl font-light mb-1">
                    "Looks clean. Tests positive."
                  </p>
                  <p className="text-white/60 text-sm">— Food Safety Research, 2024</p>
                </div>
              </div>
            </div>

            {/* Floating stat */}
            <motion.div
              className="absolute -top-6 -right-4 lg:-right-8 glass px-6 py-4 rounded-3xl shadow-medium"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
              
              <p className="font-display text-3xl font-semibold text-red-600">67%</p>
              <p className="text-muted text-xs mt-0.5">of produce has pesticide residue</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Threat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {threats?.map((threat, i) =>
          <motion.div
            key={threat?.label}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`bg-gradient-to-br ${threat?.color} border ${threat?.border} rounded-4xl p-8 trust-badge`}>
            
              <span className="text-4xl mb-4 block">{threat?.icon}</span>
              <h3 className={`font-display text-2xl font-semibold mb-3 ${threat?.textColor}`}>
                {threat?.label}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{threat?.description}</p>
            </motion.div>
          )}
        </div>

        {/* Solution bridge */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}>
          
          <p className="text-muted text-sm tracking-widest uppercase mb-4">The Solution</p>
          <h3 className="font-display text-4xl lg:text-5xl font-light italic text-foreground">
            Dr. Detoxer was built for this{' '}
            <span className="text-gradient-green not-italic font-semibold">exact problem.</span>
          </h3>
        </motion.div>
      </div>
    </section>);


}