import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white py-16 px-6 lg:px-12" aria-label="Footer">
      <div className="max-w-7xl mx-auto">
        {/* Pattern 7: Arc Browser Split */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          {/* Left: Logo + tagline */}
          <div className="flex flex-col gap-3">
            <Link href="/home" className="flex items-center gap-3" aria-label="Dr. Detoxer home">
              <AppLogo size={32} />
              <span className="font-display font-semibold text-lg text-foreground tracking-tight">
                Dr. Detoxer
              </span>
            </Link>
            <p className="text-muted text-sm font-light max-w-xs">
              Natural vegetable & fruit wash. Powered by Neem, Tulsi & Lemon.
            </p>
          </div>

          {/* Right: Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 lg:gap-x-10 mt-4 lg:mt-0">
            {[
              { label: 'Benefits', href: '#benefits' },
              { label: 'Ingredients', href: '#ingredients' },
              { label: 'How It Works', href: '#how-it-works' },
              { label: 'Privacy Policy', href: '#' },
              { label: 'Terms of Use', href: '#' },
            ]?.map((link) => (
              <a
                key={link?.label}
                href={link?.href}
                className="text-sm font-medium text-muted hover:text-foreground transition-colors duration-200 min-h-[44px] flex items-center"
              >
                {link?.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">
            © 2026 Dr. Detoxer. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { label: 'Instagram', href: '#', icon: '📸' },
              { label: 'Twitter', href: '#', icon: '🐦' },
              { label: 'Facebook', href: '#', icon: '👥' },
            ]?.map((social) => (
              <a
                key={social?.label}
                href={social?.href}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-border text-muted hover:border-primary hover:text-primary transition-all duration-200"
                aria-label={`Dr. Detoxer on ${social?.label}`}
              >
                <span className="text-base">{social?.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}