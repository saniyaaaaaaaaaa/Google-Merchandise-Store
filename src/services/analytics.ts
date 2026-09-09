import { GA4Event, Product } from '../types';

// GA4 Baseline Research Dataset (28 Days)
export const GA4_RESEARCH_DATA = {
  activeUsers: 85000,
  newUsers: 75000,
  returningUsers: 14000,
  avgEngagementTimeSec: 53,
  homepageViews: 100000,
  homepageBounceRate: 0.67,
  traffic: {
    direct: 64000,
    organicSearch: 25000,
    paidSearch: 11000,
    referral: 1000
  },
  topCities: [
    { city: 'New York', share: '32%', tag: 'High Commercial Intent' },
    { city: 'Mountain View', share: '24%', tag: 'Core Campus Tech Hub' },
    { city: 'San Francisco', share: '18%', tag: 'Design & Engineering' },
    { city: 'Sunnyvale', share: '14%', tag: 'Developer Center' },
    { city: 'San Jose', share: '12%', tag: 'Silicon Valley Metro' }
  ],
  funnelBaseline: {
    sessionToProductViewRate: 0.21, // The massive 79% dropoff!
    productViewToCartRate: 0.225,
    cartToCheckoutRate: 0.503,
    checkoutToPurchaseRate: 0.520,
    beginCheckoutToAddDelivery: 0.986,
    addDeliveryToAddPayment: 0.711,
    addPaymentToPurchase: 0.718
  },
  retro1998Stats: {
    views: 7800,
    activeUsers: 5600,
    bounceRate: 0.095, // 9.5% vs 67% baseline!
    topPromotion: 'Retro Vibes in Full Color (Top Performer)'
  },
  designInterventions: [
    {
      targetMetric: 'Session → Product View Rate (21% → Target 48%)',
      problem: '79% of visitors bounced before seeing a single product because the old homepage had vague banner imagery and buried navigation.',
      solution: 'Discovery-First Homepage with "New here? Start with the essentials" (6 starter paths), instant Quick View modals, and prominent search with preview cards.'
    },
    {
      targetMetric: 'Homepage Bounce Rate (67% → Target 28%)',
      problem: '75K new users had to guess what was sold and left within 53 seconds.',
      solution: 'High-contrast editorial hero featuring the #1 performing "1998 Retro" collection (9.5% bounce rate) + visible category tiles + trending product carousels.'
    },
    {
      targetMetric: 'Returning User Retention (14K / 85K → Target 35K)',
      problem: 'Retention plummeted sharply after the first session due to lack of personalization or recurring drop anticipation.',
      solution: '"Made for your next scroll" personalized recommendations + "Fresh from the Store" drop schedule + Wishlist sync + drop notification signups.'
    },
    {
      targetMetric: 'Campaign Conversion ("RETRO REWIND")',
      problem: 'Generic promotions had low click-through; retro themes had 3.8x higher conversion.',
      solution: 'Dedicated "RETRO REWIND" campaign landing hub with limited countdowns, garage heritage archives, and 1-click bundle styling.'
    }
  ]
};

// Event listeners for UI live stream
type Listener = (events: GA4Event[]) => void;
const listeners: Set<Listener> = new Set();
let eventStream: GA4Event[] = [];

export function getEventStream(): GA4Event[] {
  return [...eventStream];
}

// Initialize with page view
export function initializeAnalytics() {
  trackEvent('page_view', {
    page_title: 'Google Merchandise Store — Home',
    page_location: window.location.href,
    user_type: 'new_visitor',
    city_affinity: 'Mountain View / New York / San Francisco'
  }, 'User entered the store (Homepage loaded)');
}

export function subscribeToAnalytics(listener: Listener) {
  listeners.add(listener);
  listener([...eventStream]);
  return () => {
    listeners.delete(listener);
  };
}

export function trackEvent(eventName: string, params: Record<string, any> = {}, description?: string) {
  const event: GA4Event = {
    id: `ga4_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    eventName,
    params,
    description
  };

  eventStream = [event, ...eventStream].slice(0, 100); // keep last 100 events
  
  // Log to DevTools console in GA4 format
  console.log(`%c[GA4 Event] %c${eventName}`, 'color: #4285F4; font-weight: bold;', 'color: #34A853; font-weight: bold;', params);

  // Notify listeners
  listeners.forEach(l => l([...eventStream]));
}

// Helper methods for required GA4 ecommerce events
export function trackPageView(pageName: string, path?: string) {
  trackEvent('page_view', {
    page_title: pageName,
    page_path: path || `/${pageName.toLowerCase()}`
  }, `Navigated to ${pageName}`);
}

export function trackSearch(searchTerm: string, resultCount: number) {
  trackEvent('search', {
    search_term: searchTerm,
    results_found: resultCount
  }, `Searched for "${searchTerm}" (${resultCount} results)`);
}

export function trackViewItem(product: Product) {
  trackEvent('view_item', {
    currency: 'USD',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      item_brand: product.brand,
      item_collection: product.collection,
      price: product.price,
      quantity: 1
    }]
  }, `Viewed product details: ${product.name}`);
}

export function trackSelectItem(product: Product, listName: string = 'Trending Grid') {
  trackEvent('select_item', {
    item_list_name: listName,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      item_brand: product.brand,
      price: product.price
    }]
  }, `Selected ${product.name} from ${listName}`);
}

export function trackAddToCart(product: Product, quantity: number = 1, selectedColor?: string, selectedSize?: string) {
  trackEvent('add_to_cart', {
    currency: 'USD',
    value: product.price * quantity,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      item_brand: product.brand,
      item_variant: [selectedColor, selectedSize].filter(Boolean).join(' / '),
      price: product.price,
      quantity
    }]
  }, `Added ${quantity}x ${product.name} to Bag`);
}

export function trackRemoveFromCart(product: Product, quantity: number = 1) {
  trackEvent('remove_from_cart', {
    currency: 'USD',
    value: product.price * quantity,
    items: [{
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      quantity
    }]
  }, `Removed ${product.name} from Bag`);
}

export function trackAddToWishlist(product: Product) {
  trackEvent('add_to_wishlist', {
    currency: 'USD',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      price: product.price
    }]
  }, `Saved ${product.name} to Wishlist`);
}

export function trackBeginCheckout(items: { product: Product; quantity: number }[], totalValue: number) {
  trackEvent('begin_checkout', {
    currency: 'USD',
    value: totalValue,
    items: items.map(i => ({
      item_id: i.product.id,
      item_name: i.product.name,
      price: i.product.price,
      quantity: i.quantity
    }))
  }, `Initiated checkout with ${items.length} items ($${totalValue.toFixed(2)})`);
}

export function trackAddShippingInfo(shippingTier: string, totalValue: number) {
  trackEvent('add_shipping_info', {
    currency: 'USD',
    value: totalValue,
    shipping_tier: shippingTier
  }, `Selected shipping tier: ${shippingTier}`);
}

export function trackAddPaymentInfo(paymentMethod: string, totalValue: number) {
  trackEvent('add_payment_info', {
    currency: 'USD',
    value: totalValue,
    payment_type: paymentMethod
  }, `Selected payment method: ${paymentMethod}`);
}

export function trackPurchase(orderId: string, items: { product: Product; quantity: number }[], totalValue: number) {
  trackEvent('purchase', {
    transaction_id: orderId,
    currency: 'USD',
    value: totalValue,
    tax: Number((totalValue * 0.0825).toFixed(2)),
    shipping: totalValue >= 50 ? 0 : 5.99,
    items: items.map(i => ({
      item_id: i.product.id,
      item_name: i.product.name,
      price: i.product.price,
      quantity: i.quantity
    }))
  }, `Completed order ${orderId} for $${totalValue.toFixed(2)}`);
}

export function trackViewCollection(collectionName: string) {
  trackEvent('view_collection', {
    collection_name: collectionName
  }, `Viewed collection: ${collectionName}`);
}

export function trackSelectPromotion(promoName: string, creativeSlot: string) {
  trackEvent('select_promotion', {
    promotion_name: promoName,
    creative_slot: creativeSlot
  }, `Clicked promotion: ${promoName} (${creativeSlot})`);
}

export function trackNewsletterSignup(email: string, source: string) {
  trackEvent('newsletter_signup', {
    source,
    signup_type: 'drop_notifications'
  }, `Subscribed to new drop notifications`);
}

export function trackViewRecommendation(moduleName: string, productCount: number) {
  trackEvent('view_recommendation', {
    recommendation_module: moduleName,
    item_count: productCount
  }, `Viewed recommendation module: ${moduleName}`);
}

export function trackClickRecommendation(product: Product, moduleName: string) {
  trackEvent('click_recommendation', {
    recommendation_module: moduleName,
    item_id: product.id,
    item_name: product.name
  }, `Clicked recommendation: ${product.name} in ${moduleName}`);
}
