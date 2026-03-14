'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import AppImage from '@/components/ui/AppImage';

type Variant = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

type CheckoutForm = {
  customerName: string;
  mobileNumber: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
};

type OrderReceipt = {
  orderId: string;
  orderNumber: string;
  amount: number;
};

type PaymentSession = {
  orderId: string;
  orderNumber: string;
  amount: number;
  amountPaise: number;
  currency: string;
  razorpayOrderId: string;
  razorpayKeyId: string;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, callback: (response: { error?: { description?: string } }) => void) => void;
    };
  }
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
const checkoutStorageKey = 'drdetoxer_checkout_profile_v1';

const initialCheckoutForm: CheckoutForm = {
  customerName: '',
  mobileNumber: '',
  email: '',
  addressLine1: '',
  addressLine2: '',
  landmark: '',
  city: '',
  state: '',
  pincode: '',
};

function getStoredCheckoutForm(): CheckoutForm | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(checkoutStorageKey);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<CheckoutForm>;

    return {
      customerName: typeof parsed.customerName === 'string' ? parsed.customerName : '',
      mobileNumber: typeof parsed.mobileNumber === 'string' ? parsed.mobileNumber : '',
      email: typeof parsed.email === 'string' ? parsed.email : '',
      addressLine1: typeof parsed.addressLine1 === 'string' ? parsed.addressLine1 : '',
      addressLine2: typeof parsed.addressLine2 === 'string' ? parsed.addressLine2 : '',
      landmark: typeof parsed.landmark === 'string' ? parsed.landmark : '',
      city: typeof parsed.city === 'string' ? parsed.city : '',
      state: typeof parsed.state === 'string' ? parsed.state : '',
      pincode: typeof parsed.pincode === 'string' ? parsed.pincode : '',
    };
  } catch {
    return null;
  }
}

function loadRazorpayScript() {
  if (typeof window === 'undefined') {
    return Promise.resolve(false);
  }

  if (window.Razorpay) {
    return Promise.resolve(true);
  }

  return new Promise<boolean>((resolve) => {
    const existingScript = document.querySelector('script[data-razorpay-checkout="true"]') as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true), { once: true });
      existingScript.addEventListener('error', () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.dataset.razorpayCheckout = 'true';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

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
  const submitLockRef = useRef(false);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [quantity, setQuantity] = useState(1);
  const [variants, setVariants] = useState<Variant[]>([{ id: 'default-500ml', name: '500ml', price: 299, stock: 500 }]);
  const [selectedVariantId, setSelectedVariantId] = useState('default-500ml');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>(initialCheckoutForm);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [orderReceipt, setOrderReceipt] = useState<OrderReceipt | null>(null);

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

  useEffect(() => {
    async function loadVariants() {
      try {
        const response = await fetch(`${apiBaseUrl}/products/landing`);
        const payload = await response.json();

        if (!response.ok || !Array.isArray(payload?.data?.variants) || payload.data.variants.length === 0) {
          return;
        }

        setVariants(payload.data.variants);
        setSelectedVariantId(payload.data.variants[0].id);
      } catch {
        // Keep fallback variant for resilient landing-page rendering
      }
    }

    loadVariants();
  }, []);

  useEffect(() => {
    const storedCheckoutForm = getStoredCheckoutForm();

    if (storedCheckoutForm) {
      setCheckoutForm(storedCheckoutForm);

      // State recovery: Check if there's a recently paid order that matches this mobile number
      // We check for orders created in the last 15 minutes
      if (storedCheckoutForm.mobileNumber) {
        const recoverState = async () => {
          try {
            const res = await fetch(`${apiBaseUrl}/orders/track?type=phone&query=${storedCheckoutForm.mobileNumber}&limit=1`);
            const payload = await res.json();
            const latestOrder = payload?.data?.items?.[0];

            if (latestOrder && latestOrder.paymentStatus === 'paid') {
              const orderTime = new Date(latestOrder.createdAt).getTime();
              const now = new Date().getTime();
              const fifteenMinutes = 15 * 60 * 1000;

              if (now - orderTime < fifteenMinutes) {
                // If the user is not already looking at a successful order receipt, show this one
                setOrderReceipt({
                  orderId: latestOrder.id,
                  orderNumber: latestOrder.orderNumber,
                  amount: latestOrder.totalAmount,
                });
                setIsCartOpen(true);
              }
            }
          } catch {
            // Passive recovery fail is fine
          }
        };

        recoverState();
      }
    }
  }, []);

  const selectedVariant = variants.find((variant) => variant.id === selectedVariantId) || variants[0];
  const selectedPrice = selectedVariant?.price || 299;

  const totalPrice = selectedPrice * quantity;

  function updateFormField(field: keyof CheckoutForm, value: string) {
    setCheckoutForm((prev) => {
      const next = { ...prev, [field]: value };

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(checkoutStorageKey, JSON.stringify(next));
      }

      return next;
    });
  }

  async function handlePayNow(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitLockRef.current || isSubmittingOrder || orderReceipt) {
      return;
    }

    if (!selectedVariant) {
      setCheckoutError('Selected variant not found');
      return;
    }

    submitLockRef.current = true;

    setIsSubmittingOrder(true);
    setCheckoutError('');
    setOrderReceipt(null);

    let shouldReleaseLock = true;

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded || !window.Razorpay) {
        throw new Error('Unable to load Razorpay checkout. Please try again.');
      }

      const response = await fetch(`${apiBaseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...checkoutForm,
          variantId: selectedVariant.id,
          quantity,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || 'Unable to create order');
      }

      const paymentSession: PaymentSession = {
        orderId: String(payload.data.orderId),
        orderNumber: String(payload.data.orderNumber || payload.data.orderId),
        amount: Number(payload.data.amount || totalPrice),
        amountPaise: Number(payload.data.amountPaise || totalPrice * 100),
        currency: String(payload.data.currency || 'INR'),
        razorpayOrderId: String(payload.data.razorpayOrderId || ''),
        razorpayKeyId: String(payload.data.razorpayKeyId || ''),
      };

      const razorpay = new window.Razorpay({
        key: paymentSession.razorpayKeyId,
        amount: paymentSession.amountPaise,
        currency: paymentSession.currency,
        name: 'Dr. Detoxer',
        description: `Order ${paymentSession.orderNumber}`,
        order_id: paymentSession.razorpayOrderId,
        prefill: {
          name: checkoutForm.customerName,
          email: checkoutForm.email,
          contact: checkoutForm.mobileNumber,
        },
        notes: {
          localOrderId: paymentSession.orderId,
          orderNumber: paymentSession.orderNumber,
        },
        theme: {
          color: '#2d6b4f',
        },
        modal: {
          ondismiss: () => {
            setCheckoutError('Payment was cancelled before completion.');
            setIsSubmittingOrder(false);
            submitLockRef.current = false;
          },
        },
        handler: async (paymentResponse: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyResponse = await fetch(`${apiBaseUrl}/orders/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                localOrderId: paymentSession.orderId,
                ...paymentResponse,
              }),
            });

            const verifyPayload = await verifyResponse.json();

            if (!verifyResponse.ok) {
              throw new Error(verifyPayload.message || 'Payment verification failed');
            }

            setOrderReceipt({
              orderId: String(verifyPayload.data.orderId),
              orderNumber: String(verifyPayload.data.orderNumber || paymentSession.orderNumber),
              amount: Number(verifyPayload.data.amount || paymentSession.amount),
            });
            setQuantity(1);
          } catch (error) {
            setCheckoutError(error instanceof Error ? error.message : 'Payment verification failed');
          } finally {
            setIsSubmittingOrder(false);
            submitLockRef.current = false;
          }
        },
      });

      razorpay.on('payment.failed', (failureResponse) => {
        setCheckoutError(failureResponse?.error?.description || 'Payment failed. Please try again.');
        setIsSubmittingOrder(false);
        submitLockRef.current = false;
      });

      shouldReleaseLock = false;
      razorpay.open();
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'Unable to create order');
    } finally {
      if (shouldReleaseLock) {
        setIsSubmittingOrder(false);
        submitLockRef.current = false;
      }
    }
  }

  return (
    <section
      id="product"
      ref={ref}
      className="py-32 lg:py-40 bg-surface overflow-hidden"
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
                  className="w-full h-auto aspect-square object-cover" />
                
                {/* Shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 right-0 lg:-right-4 glass px-5 py-3 rounded-3xl shadow-medium text-center"
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
                <span className="font-display text-5xl font-semibold text-foreground">₹{selectedPrice}</span>
                <span className="text-muted line-through text-xl">₹499</span>
                <span className="bg-primary text-white text-xs px-3 py-1.5 rounded-full font-semibold">
                  40% OFF
                </span>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                <p className="text-sm font-semibold text-foreground mb-3">Variant</p>
                <div className="mb-5">
                  <select
                    value={selectedVariantId}
                    onChange={(event) => setSelectedVariantId(event.target.value)}
                    className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm font-medium text-foreground outline-none focus:border-primary"
                    aria-label="Select product variant"
                  >
                    {variants.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.name} — ₹{variant.price} {variant.stock <= 0 ? '(Out of stock)' : `(${variant.stock} in stock)`}
                      </option>
                    ))}
                  </select>
                </div>

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
                type="button"
                onClick={() => {
                  setIsCartOpen(true);
                  setCheckoutError('');
                  setOrderReceipt(null);
                }}
                disabled={!selectedVariant || selectedVariant.stock <= 0}
                className="btn-primary w-full py-5 rounded-2xl font-semibold text-lg tracking-wide shadow-green-lg"
                aria-label={`Buy ${quantity} ${selectedVariant?.name || 'Dr. Detoxer'} for ₹${totalPrice}`}>
                
                {selectedVariant && selectedVariant.stock > 0 ? `Buy Now — ₹${totalPrice}` : 'Out of Stock'}
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

      {isCartOpen ? (
        <div className="fixed inset-0 z-50 bg-black/50" role="dialog" aria-modal="true" aria-label="Checkout cart">
          <button
            type="button"
            aria-label="Close cart backdrop"
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default"
          />

          <aside className="absolute right-0 top-0 h-full w-full overflow-y-auto bg-white shadow-strong sm:max-w-xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-white px-5 py-4 sm:px-6">
              <h3 className="font-display text-2xl text-foreground">Checkout Cart</h3>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground"
              >
                Close
              </button>
            </div>

            <div className="p-5 sm:p-6">
              <div className="mb-6 rounded-2xl border border-border bg-surface p-4">
                <p className="text-sm text-muted">Selected</p>
                <p className="mt-1 text-base font-semibold text-foreground">{selectedVariant?.name} × {quantity}</p>
                <p className="mt-1 text-base font-semibold text-foreground">Total: ₹{totalPrice}</p>
              </div>

              <form className="space-y-4" onSubmit={handlePayNow}>
                <input
                  type="text"
                  value={checkoutForm.customerName}
                  onChange={(event) => updateFormField('customerName', event.target.value)}
                  autoComplete="name"
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                  placeholder="Full Name"
                  required
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="tel"
                    value={checkoutForm.mobileNumber}
                    onChange={(event) => updateFormField('mobileNumber', event.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                    autoComplete="tel-national"
                    className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                    placeholder="Mobile Number (10 digits)"
                    required
                  />
                  <input
                    type="email"
                    value={checkoutForm.email}
                    onChange={(event) => updateFormField('email', event.target.value)}
                    autoComplete="email"
                    className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                    placeholder="Email ID"
                    required
                  />
                </div>

                <input
                  type="text"
                  value={checkoutForm.addressLine1}
                  onChange={(event) => updateFormField('addressLine1', event.target.value)}
                  autoComplete="address-line1"
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                  placeholder="House No, Building, Street, Area"
                  required
                />

                <input
                  type="text"
                  value={checkoutForm.addressLine2}
                  onChange={(event) => updateFormField('addressLine2', event.target.value)}
                  autoComplete="address-line2"
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                  placeholder="Apartment, Floor (optional)"
                />

                <input
                  type="text"
                  value={checkoutForm.landmark}
                  onChange={(event) => updateFormField('landmark', event.target.value)}
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                  placeholder="Landmark (optional)"
                />

                <div className="grid gap-4 sm:grid-cols-3">
                  <input
                    type="text"
                    value={checkoutForm.city}
                    onChange={(event) => updateFormField('city', event.target.value)}
                    autoComplete="address-level2"
                    className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                    placeholder="City"
                    required
                  />
                  <input
                    type="text"
                    value={checkoutForm.state}
                    onChange={(event) => updateFormField('state', event.target.value)}
                    autoComplete="address-level1"
                    className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                    placeholder="State"
                    required
                  />
                  <input
                    type="text"
                    value={checkoutForm.pincode}
                    onChange={(event) => updateFormField('pincode', event.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                    autoComplete="postal-code"
                    className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                    placeholder="Pincode"
                    required
                  />
                </div>

                {checkoutError ? <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{checkoutError}</p> : null}

                {orderReceipt ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-2xl border border-green-200 bg-green-50 p-4"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 0.6 }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-lg text-white"
                      >
                        ✓
                      </motion.div>
                      <div>
                        <p className="text-sm font-semibold text-green-800">Order placed successfully</p>
                        <p className="text-xs text-green-700">Order Number: {orderReceipt.orderNumber}</p>
                      </div>
                    </div>

                    <p className="text-sm text-green-800">Amount: ₹{orderReceipt.amount}</p>

                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            window.location.href = `/home/track-order?type=order&query=${encodeURIComponent(orderReceipt.orderNumber)}`;
                          }
                        }}
                        className="rounded-xl border border-green-700 bg-white px-3 py-2 text-xs font-semibold text-green-800"
                      >
                        Track Order
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setOrderReceipt(null);
                          setCheckoutError('');
                        }}
                        className="rounded-xl border border-green-200 bg-green-100 px-3 py-2 text-xs font-semibold text-green-800"
                      >
                        Place Another
                      </button>
                    </div>
                  </motion.div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmittingOrder || Boolean(orderReceipt)}
                  className="btn-primary w-full py-4 rounded-2xl font-semibold text-base tracking-wide disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmittingOrder ? 'Processing...' : orderReceipt ? 'Order Placed' : `Pay Now — ₹${totalPrice}`}
                </button>
              </form>
            </div>
          </aside>
        </div>
      ) : null}
    </section>);

}