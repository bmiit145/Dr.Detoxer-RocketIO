'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AppImage from '@/components/ui/AppImage';

const ingredients = [
{
  name: 'Neem Extract',
  emoji: '🌿',
  tagline: 'Nature\'s most powerful antimicrobial',
  description:
  'Used in Ayurvedic medicine for 4,000 years, Neem\'s active compound Azadirachtin disrupts the cellular structure of bacteria, fungi, and pesticide residues — breaking them down safely and completely.',
  benefit: 'Antimicrobial · Antifungal · Pesticide Breakdown',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_15396b531-1773145706689.png",
  imageAlt: 'Fresh neem leaves on a branch — natural antimicrobial ingredient in Dr. Detoxer',
  color: 'from-primary-50 to-surface',
  accentColor: 'bg-primary text-white',
  number: '01'
},
{
  name: 'Tulsi Extract',
  emoji: '🌱',
  tagline: 'The sacred cleanser of Indian tradition',
  description:
  'Ocimum sanctum (Holy Basil) contains eugenol and rosmarinic acid — powerful phytochemicals that neutralize bacterial colonies and chemical contaminants on produce surfaces without affecting taste or nutrition.',
  benefit: 'Antibacterial · Antioxidant · Surface Cleansing',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_15e9120ab-1773145709062.png",
  imageAlt: 'Fresh tulsi holy basil leaves — antibacterial ingredient in Dr. Detoxer formula',
  color: 'from-blue-pale to-surface',
  accentColor: 'bg-blue-brand text-white',
  number: '02'
},
{
  name: 'Lemon Extract',
  emoji: '🍋',
  tagline: 'Citric acid that cleans at the molecular level',
  description:
  'Citric acid from lemon extract lowers the pH of the wash solution, creating an environment hostile to bacteria and breaking the chemical bonds that hold pesticide residues to produce skin.',
  benefit: 'pH Balancing · Chemical Removal · Natural Brightening',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f7912eb2-1773145706619.png",
  imageAlt: 'Fresh lemons cut open showing citric acid rich flesh — natural cleaning agent in Dr. Detoxer',
  color: 'from-amber-50 to-surface',
  accentColor: 'bg-gold text-foreground',
  number: '03'
}];


export default function IngredientsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="ingredients"
      ref={ref}
      className="py-32 lg:py-40 bg-surface"
      aria-labelledby="ingredients-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-20 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}>
          
          <span className="text-xs font-semibold tracking-widest uppercase text-muted mb-4 block">
            The Science of Nature
          </span>
          <h2
            id="ingredients-heading"
            className="section-headline font-display font-light text-foreground">
            
            Three ingredients.
            <br />
            <span className="italic text-gradient-green">Thousands of years</span> of proof.
          </h2>
        </motion.div>

        {/* Ingredient cards — alternating layout */}
        <div className="space-y-12 lg:space-y-20">
          {ingredients?.map((ingredient, i) =>
          <motion.article
            key={ingredient?.name}
            className={`ingredient-card grid grid-cols-12 gap-8 lg:gap-16 items-center bg-gradient-to-br ${ingredient?.color} rounded-5xl p-8 lg:p-14 border border-border overflow-hidden relative`}
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1,
              delay: 0.2 + i * 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{ y: -6 }}
            aria-label={`${ingredient?.name} — natural ingredient in Dr. Detoxer`}>
            
              {/* Background number */}
              <div
              className="absolute top-6 right-8 font-display font-light opacity-[0.06] select-none pointer-events-none"
              style={{ fontSize: '12rem', lineHeight: 1 }}
              aria-hidden="true">
              
                {ingredient?.number}
              </div>

              {/* Image — alternates sides */}
              <div
              className={`col-span-12 md:col-span-5 ${i % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
              
                <div className="relative rounded-4xl overflow-hidden shadow-medium aspect-[4/3]">
                  <AppImage
                  src={ingredient?.image}
                  alt={ingredient?.imageAlt}
                  width={700}
                  height={525}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                
                  <div className="absolute top-4 left-4">
                    <span
                    className={`${ingredient?.accentColor} px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide`}>
                    
                      {ingredient?.number}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div
              className={`col-span-12 md:col-span-7 ${i % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
              
                <span className="text-4xl mb-4 block">{ingredient?.emoji}</span>
                <p className="text-muted text-xs tracking-widest uppercase font-semibold mb-2">
                  {ingredient?.tagline}
                </p>
                <h3 className="font-display text-4xl lg:text-5xl font-light text-foreground mb-6">
                  {ingredient?.name}
                </h3>
                <p className="text-muted text-base leading-relaxed font-light mb-6">
                  {ingredient?.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {ingredient?.benefit?.split(' · ')?.map((b) =>
                <span
                  key={b}
                  className="bg-white/70 text-foreground text-xs px-3 py-1.5 rounded-full border border-border font-medium">
                  
                      {b}
                    </span>
                )}
                </div>
              </div>
            </motion.article>
          )}
        </div>
      </div>
    </section>);


}