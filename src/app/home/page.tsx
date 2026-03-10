'use client';

import React from 'react';
import HeroSection from './components/HeroSection';
import ProblemStory from './components/ProblemStory';
import BenefitsSection from './components/BenefitsSection';
import IngredientsSection from './components/IngredientsSection';
import HowItWorks from './components/HowItWorks';
import ProductShowcase from './components/ProductShowcase';
import TrustSection from './components/TrustSection';
import FinalCTA from './components/FinalCTA';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileCTA from './components/StickyMobileCTA';

export default function HomePage() {
  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <Header />
      <main>
        <HeroSection />
        <ProblemStory />
        <BenefitsSection />
        <IngredientsSection />
        <HowItWorks />
        <ProductShowcase />
        <TrustSection />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}