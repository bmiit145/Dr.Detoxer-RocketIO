'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import AppImage from '@/components/ui/AppImage';

const highlights = [
{ icon: '🌿', text: 'Natural Formula' },
{ icon: '☠️', text: 'Pesticide Removal' },
{ icon: '🦠', text: 'Kills 99% Bacteria' },
{ icon: '💧', text: 'Safe Daily Use' },
{ icon: '🧴', text: '500ml Bottle' },
{ icon: '🇮🇳', text: 'Made in India' }];


export default function ProductShowcase() {
  const ref = useRef(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [quantity, setQuantity] = useState(1);

  // 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [8, -8]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-8, 8]), { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const totalPrice = 299 * quantity;

  return (
    <section
      id="product"
      ref={ref}
      className="py-32 lg:py-40 bg-surface"
      aria-labelledby="product-heading">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}>
          
          <span className="text-xs font-semibold tracking-widest uppercase text-muted">
            The Product
          </span>
        </motion.div>

        <div className="grid grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: 3D product image */}
          <motion.div
            className="col-span-12 lg:col-span-6"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            
            <motion.div
              ref={imageRef}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative cursor-none">
              
              {/* Glow */}
              <div
                className="absolute inset-0 m-auto rounded-full opacity-25 blur-3xl pointer-events-none"
                style={{
                  width: '70%',
                  height: '70%',
                  background: 'radial-gradient(circle, #2d6b4f 0%, #2a7fbf 60%, transparent 80%)'
                }}
                aria-hidden="true" />
              

              <div className="relative rounded-5xl overflow-hidden shadow-green-lg">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_148fe1592-1773145714679.png"
                  alt="Dr. Detoxer 500ml vegetable and fruit wash liquid bottle — complete product view"
                  width={700}
                  height={700}
                  className="w-full object-cover"
                  style={{ height: '520px' }} />
                
                {/* Shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 glass px-5 py-3 rounded-3xl shadow-medium text-center"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                
                <p className="font-display text-2xl font-semibold text-primary">500ml</p>
                <p className="text-muted text-xs">Premium Bottle</p>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 glass px-5 py-3 rounded-3xl shadow-medium"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>
                
                <p className="text-xs font-semibold text-primary">✨ Lab Tested</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Purchase UI */}
          <motion.div
            className="col-span-12 lg:col-span-6"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            
            <div className="space-y-8">
              {/* Product name */}
              <div>
                <span className="text-xs tracking-widest uppercase text-muted font-semibold block mb-3">
                  Dr. Detoxer
                </span>
                <h2
                  id="product-heading"
                  className="font-display text-4xl lg:text-5xl font-light text-foreground leading-tight">
                  
                  Vegetable & Fruit
                  <br />
                  <span className="italic text-gradient-green">Wash Liquid</span>
                </h2>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="font-display text-5xl font-semibold text-foreground">₹299</span>
                <span className="text-muted line-through text-xl">₹499</span>
                <span className="bg-primary text-white text-xs px-3 py-1.5 rounded-full font-semibold">
                  40% OFF
                </span>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-3">
                {highlights.map((h) =>
                <div
                  key={h.text}
                  className="flex items-center gap-2.5 bg-white rounded-2xl px-4 py-3 border border-border">
                  
                    <span className="text-xl">{h.icon}</span>
                    <span className="text-foreground text-sm font-medium">{h.text}</span>
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">Quantity</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-2xl overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="qty-btn w-12 h-12 flex items-center justify-center text-foreground font-bold text-lg border-r border-border"
                      aria-label="Decrease quantity">
                      
                      −
                    </button>
                    <span className="w-14 text-center font-semibold text-foreground">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="qty-btn w-12 h-12 flex items-center justify-center text-foreground font-bold text-lg border-l border-border"
                      aria-label="Increase quantity">
                      
                      +
                    </button>
                  </div>
                  <span className="text-muted text-sm">
                    Total:{' '}
                    <span className="font-semibold text-foreground">₹{totalPrice}</span>
                  </span>
                </div>
              </div>

              {/* Buy button */}
              <button
                className="btn-primary w-full py-5 rounded-2xl font-semibold text-lg tracking-wide shadow-green-lg"
                aria-label={`Buy ${quantity} Dr. Detoxer for ₹${totalPrice}`}>
                
                Buy Now — ₹{totalPrice}
              </button>

              {/* Trust micro-copy */}
              <div className="flex flex-wrap gap-6 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <span>🔒</span> Secure Checkout
                </span>
                <span className="flex items-center gap-1.5">
                  <span>🚚</span> Fast Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <span>↩️</span> Easy Returns
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}