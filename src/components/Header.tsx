'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AppLogo from '@/components/ui/AppLogo';
import Link from 'next/link';

const navLinks = [
  { label: 'Benefits', href: '#benefits' },
  { label: 'Ingredients', href: '#ingredients' },
  { label: 'How It Works', href: '#how-it-works' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleBuyNow = () => {
    document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-soft border-b border-border'
          : 'bg-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-3" aria-label="Dr. Detoxer home">
          <AppLogo size={36} />
          <span className="font-display font-semibold text-lg text-foreground tracking-tight">
            Dr. Detoxer
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks?.map((link) => (
            <a
              key={link?.label}
              href={link?.href}
              className="text-sm font-medium text-muted hover:text-foreground transition-colors duration-200"
            >
              {link?.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleBuyNow}
            className="hidden md:block btn-primary px-7 py-3 rounded-xl text-sm font-semibold shadow-green"
            aria-label="Buy Dr. Detoxer now"
          >
            Buy Now — ₹299
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`w-6 h-0.5 bg-foreground rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`w-6 h-0.5 bg-foreground rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`w-6 h-0.5 bg-foreground rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </nav>
      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          className="md:hidden bg-white border-t border-border px-6 py-6 space-y-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {navLinks?.map((link) => (
            <a
              key={link?.label}
              href={link?.href}
              className="block text-base font-medium text-muted hover:text-foreground py-2"
              onClick={() => setMenuOpen(false)}
            >
              {link?.label}
            </a>
          ))}
          <button
            onClick={handleBuyNow}
            className="btn-primary w-full py-4 rounded-xl font-semibold"
          >
            Buy Now — ₹299
          </button>
        </motion.div>
      )}
    </motion.header>
  );
}