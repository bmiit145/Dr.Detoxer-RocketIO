'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type TrackingType = 'order' | 'phone' | 'email';

type TrackingTimelineItem = {
  status: string;
  label: string;
  at: string;
  note?: string;
};

type TrackedOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  mobileNumber: string;
  email: string;
  variantName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  paymentStatus: string;
  trackingStatus: string;
  trackingTimeline: TrackingTimelineItem[];
  createdAt: string;
  updatedAt: string;
};

type PaginationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
};

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const trackingStageOrder = ['order_placed', 'confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered'];

const trackingStatusLabel: Record<string, string> = {
  order_placed: 'Order Placed',
  confirmed: 'Confirmed',
  packed: 'Packed',
  shipped: 'Shipped',
  out_for_delivery: 'Out For Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export default function TrackOrderPage() {
  const searchParams = useSearchParams();
  const [trackingType, setTrackingType] = useState<TrackingType>('order');
  const [queryInput, setQueryInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<TrackedOrder[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({ page: 1, limit: 10, totalItems: 0, totalPages: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const placeholder = useMemo(() => {
    if (trackingType === 'phone') {
      return 'Enter 10-digit mobile number';
    }

    if (trackingType === 'email') {
      return 'Enter email address';
    }

    return 'Enter Order Number or Order ID';
  }, [trackingType]);

  function formatCurrency(value: number) {
    return new Intl.NumberFormat('en-IN').format(value || 0);
  }

  function normalizeTrackingQuery(value: string, type: TrackingType = trackingType) {
    if (type === 'phone') {
      return value.replace(/\D/g, '').slice(-10);
    }

    return value.trim();
  }

  useEffect(() => {
    const paramType = String(searchParams.get('type') || '').toLowerCase();
    const paramQuery = String(searchParams.get('query') || '');

    if (!paramQuery) {
      return;
    }

    const resolvedType: TrackingType = paramType === 'phone' || paramType === 'email' || paramType === 'order' ? paramType : 'order';
    const normalizedQuery = normalizeTrackingQuery(paramQuery, resolvedType);

    if (!normalizedQuery) {
      return;
    }

    setTrackingType(resolvedType);
    setQueryInput(normalizedQuery);
    setSearchQuery(normalizedQuery);
    setErrorMessage('');

    loadTrackingOrders(resolvedType, normalizedQuery, 1).catch((error) => {
      setOrders([]);
      setPagination({ page: 1, limit: 10, totalItems: 0, totalPages: 0 });
      setErrorMessage(error instanceof Error ? error.message : 'Unable to track order');
    });
  }, [searchParams]);

  async function loadTrackingOrders(type: TrackingType, query: string, page = 1) {
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        type,
        query,
        page: String(page),
        limit: '10',
      });

      const response = await fetch(`${apiBaseUrl}/orders/track?${params.toString()}`);
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || 'Unable to track order');
      }

      setOrders(Array.isArray(payload.data?.items) ? payload.data.items : []);
      setPagination(payload.data?.pagination || { page: 1, limit: 10, totalItems: 0, totalPages: 0 });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleTrackOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage('');

    const normalizedQuery = normalizeTrackingQuery(queryInput);

    if (!normalizedQuery) {
      setErrorMessage('Please enter a valid value to track order.');
      return;
    }

    setSearchQuery(normalizedQuery);

    try {
      await loadTrackingOrders(trackingType, normalizedQuery, 1);
    } catch (error) {
      setOrders([]);
      setPagination({ page: 1, limit: 10, totalItems: 0, totalPages: 0 });
      setErrorMessage(error instanceof Error ? error.message : 'Unable to track order');
    }
  }

  async function handlePageChange(nextPage: number) {
    if (nextPage < 1 || nextPage > pagination.totalPages || !searchQuery || isLoading) {
      return;
    }

    try {
      await loadTrackingOrders(trackingType, searchQuery, nextPage);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to load more results');
    }
  }

  return (
    <>
      <Header />
      <main className="bg-surface pt-28">
        <section className="px-6 pb-20 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-5xl space-y-6">
            <div className="rounded-4xl border border-border bg-white p-6 shadow-soft lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Order Tracking</p>
              <h1 className="mt-3 font-display text-3xl text-foreground lg:text-4xl">Track your order instantly</h1>
              <p className="mt-2 text-sm text-muted">Search using Order Number/Order ID, mobile number, or email address.</p>

              <form className="mt-6 space-y-4" onSubmit={handleTrackOrder}>
                <div className="grid gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => setTrackingType('order')}
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${trackingType === 'order' ? 'border-primary bg-primary text-white' : 'border-border bg-white text-foreground'}`}
                  >
                    Order ID
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrackingType('phone')}
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${trackingType === 'phone' ? 'border-primary bg-primary text-white' : 'border-border bg-white text-foreground'}`}
                  >
                    Phone Number
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrackingType('email')}
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${trackingType === 'email' ? 'border-primary bg-primary text-white' : 'border-border bg-white text-foreground'}`}
                  >
                    Email ID
                  </button>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={queryInput}
                    onChange={(event) => setQueryInput(event.target.value)}
                    placeholder={placeholder}
                    className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary rounded-2xl px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? 'Tracking...' : 'Track Order'}
                  </button>
                </div>
              </form>

              {errorMessage ? <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{errorMessage}</p> : null}
            </div>

            {orders.length > 0 ? (
              <section className="space-y-4">
                {orders.map((order) => {
                  const currentStageIndex = trackingStageOrder.indexOf(order.trackingStatus);

                  return (
                    <article key={order.id} className="rounded-4xl border border-border bg-white p-6 shadow-soft lg:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Order Number</p>
                          <p className="mt-1 text-base font-semibold text-foreground">{order.orderNumber || order.id}</p>
                          <p className="mt-1 text-sm text-muted">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                        </div>
                        <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
                          {trackingStatusLabel[order.trackingStatus] || order.trackingStatus}
                        </span>
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <p className="text-sm text-foreground"><span className="text-muted">Customer:</span> {order.customerName}</p>
                        <p className="text-sm text-foreground"><span className="text-muted">Mobile:</span> {order.mobileNumber}</p>
                        <p className="text-sm text-foreground"><span className="text-muted">Email:</span> {order.email}</p>
                        <p className="text-sm text-foreground"><span className="text-muted">Amount:</span> ₹{formatCurrency(order.totalAmount)}</p>
                      </div>

                      <div className="mt-5">
                        <p className="text-sm font-semibold text-foreground">Tracking Progress</p>
                        <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
                          {trackingStageOrder.map((stage, index) => {
                            const isActive = currentStageIndex >= index;
                            const isCancelled = order.trackingStatus === 'cancelled';

                            return (
                              <div
                                key={stage}
                                className={`rounded-xl border px-3 py-2 text-center text-xs font-semibold ${isCancelled ? 'border-red-200 bg-red-50 text-red-700' : isActive ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-white text-muted'}`}
                              >
                                {trackingStatusLabel[stage]}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {Array.isArray(order.trackingTimeline) && order.trackingTimeline.length > 0 ? (
                        <div className="mt-5 rounded-2xl border border-border bg-surface p-4">
                          <p className="text-sm font-semibold text-foreground">Timeline</p>
                          <div className="mt-3 space-y-2">
                            {order.trackingTimeline.map((item, index) => (
                              <div key={`${order.id}-${item.status}-${index}`} className="flex items-start justify-between gap-3 text-sm">
                                <p className="text-foreground">{item.label}</p>
                                <p className="text-muted">{new Date(item.at).toLocaleString()}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </article>
                  );
                })}

                <div className="flex items-center justify-between rounded-3xl border border-border bg-white px-4 py-3">
                  <p className="text-sm text-muted">Page {pagination.page} of {Math.max(pagination.totalPages, 1)} · {pagination.totalItems} orders</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page <= 1 || isLoading}
                      className="rounded-xl border border-border px-3 py-2 text-xs font-semibold text-foreground disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page >= pagination.totalPages || isLoading}
                      className="rounded-xl border border-border px-3 py-2 text-xs font-semibold text-foreground disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}