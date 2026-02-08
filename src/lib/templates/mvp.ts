/**
 * MVP Nigerian Templates
 * BLDR-3TPL-003: Create 10 MVP Nigerian Templates
 * 
 * All templates are Nigeria-specific with Naira formatting and WhatsApp integration.
 * Reference: 08-TEMPLATE-LIBRARY.md
 */

import type { TemplateType } from './types';

/**
 * 10 MVP Nigerian Templates
 * All templates include:
 * - Naira (₦) currency formatting
 * - Square meters (sqm) measurements
 * - WhatsApp CTA integration
 * - Nigerian property features
 */
export const MVP_TEMPLATES: TemplateType[] = [
  // 1. Standard Property Listing
  {
    id: 'tmpl_listing_standard_ng',
    name: 'Standard Property Listing',
    description: 'Clean, professional property page for residential listings',
    category: 'listing',
    isPremium: false,
    nigeriaSpecific: true,
    tags: ['listing', 'residential', 'duplex', 'flat'],
    code: `<div class="property-listing">
  <header class="hero">
    <img src="{{heroImage}}" alt="{{propertyTitle}}" class="hero-image" />
    <div class="hero-overlay">
      <span class="property-badge">For Sale</span>
    </div>
  </header>
  
  <section class="stats-bar">
    <div class="stat"><span class="value">₦{{formatNaira(price)}}</span><span class="label">Price</span></div>
    <div class="stat"><span class="value">{{beds}}</span><span class="label">Beds</span></div>
    <div class="stat"><span class="value">{{baths}}</span><span class="label">Baths</span></div>
    <div class="stat"><span class="value">{{sqm}} sqm</span><span class="label">Area</span></div>
  </section>
  
  <section class="property-details">
    <h1>{{propertyTitle}}</h1>
    <p class="location">📍 {{location}}</p>
    <p class="description">{{description}}</p>
  </section>
  
  <section class="features">
    <h2>Features & Amenities</h2>
    <ul class="feature-grid">
      {{#each features}}
      <li class="feature-item">✓ {{this}}</li>
      {{/each}}
    </ul>
  </section>
  
  <section class="cta">
    <a href="https://wa.me/{{whatsappNumber}}?text={{encodedMessage}}" class="whatsapp-btn">
      <svg class="whatsapp-icon"><!-- WhatsApp icon --></svg>
      Chat on WhatsApp
    </a>
  </section>
</div>`,
  },

  // 2. Duplex Showcase
  {
    id: 'tmpl_listing_duplex_ng',
    name: 'Duplex Showcase',
    description: 'Dedicated template for duplex properties with per-floor breakdown',
    category: 'listing',
    isPremium: false,
    nigeriaSpecific: true,
    tags: ['listing', 'duplex', 'detached', 'semi-detached'],
    code: `<div class="duplex-showcase">
  <header class="hero full-width">
    <img src="{{heroImage}}" alt="{{propertyTitle}}" />
    <div class="badge-container">
      <span class="badge duplex-type">{{duplexType}}</span>
    </div>
  </header>
  
  <section class="stats-bar bg-trust-blue">
    <div class="stat"><span class="value">₦{{formatNaira(price)}}</span></div>
    <div class="stat"><span class="value">{{beds}} Beds</span></div>
    <div class="stat"><span class="value">{{baths}} Baths</span></div>
    <div class="stat"><span class="value">{{sqm}} sqm</span></div>
    <div class="stat"><span class="value">{{bq}} BQ</span></div>
  </section>
  
  <section class="floor-breakdown">
    <h2>Per-Floor Layout</h2>
    <div class="floor ground">
      <h3>Ground Floor</h3>
      <p>Living room, Kitchen, Guest toilet, BQ</p>
    </div>
    <div class="floor first">
      <h3>First Floor</h3>
      <p>{{beds}} Bedrooms (all ensuite), Family lounge</p>
    </div>
  </section>
  
  <section class="nigerian-features">
    <h2>Property Features</h2>
    <div class="feature-grid">
      <div class="feature"><span class="icon">💧</span> Bore Hole</div>
      <div class="feature"><span class="icon">⚡</span> Generator House</div>
      <div class="feature"><span class="icon">🏠</span> Boys Quarters</div>
      <div class="feature"><span class="icon">🔒</span> Security Post</div>
      <div class="feature"><span class="icon">🚗</span> {{parking}} Parking Spaces</div>
      <div class="feature"><span class="icon">🧱</span> Interlocked Compound</div>
    </div>
  </section>
  
  <section class="cta sticky-bottom">
    <a href="https://wa.me/{{whatsappNumber}}?text={{encodedMessage}}" class="whatsapp-btn">
      💬 Chat on WhatsApp
    </a>
  </section>
</div>`,
  },

  // 3. Land Sale Page
  {
    id: 'tmpl_land_plot_ng',
    name: 'Land Sale Page',
    description: 'Marketing page for land plots with document status',
    category: 'land',
    isPremium: false,
    nigeriaSpecific: true,
    tags: ['land', 'plot', 'investment'],
    code: `<div class="land-sale">
  <header class="hero">
    <img src="{{heroImage}}" alt="Land at {{location}}" />
    <div class="price-tag">₦{{formatNaira(price)}}</div>
  </header>
  
  <section class="plot-specs">
    <div class="spec"><span class="value">{{sqm}} sqm</span><span class="label">Total Area</span></div>
    <div class="spec"><span class="value">₦{{formatNaira(pricePerSqm)}}</span><span class="label">Per sqm</span></div>
    <div class="spec"><span class="value">{{dimensions}}</span><span class="label">Dimensions</span></div>
  </section>
  
  <section class="document-status">
    <h2>📄 Documentation Status</h2>
    <ul class="document-list">
      <li class="{{#if hasCofO}}verified{{/if}}">
        <span class="icon">{{#if hasCofO}}✅{{else}}⏳{{/if}}</span>
        Certificate of Occupancy (C of O)
      </li>
      <li class="{{#if hasSurvey}}verified{{/if}}">
        <span class="icon">{{#if hasSurvey}}✅{{else}}⏳{{/if}}</span>
        Survey Plan
      </li>
      <li class="{{#if hasConsent}}verified{{/if}}">
        <span class="icon">{{#if hasConsent}}✅{{else}}⏳{{/if}}</span>
        Governor's Consent
      </li>
    </ul>
  </section>
  
  <section class="location-advantages">
    <h2>📍 Location: {{location}}</h2>
    <ul class="advantages">
      {{#each advantages}}
      <li>{{this}}</li>
      {{/each}}
    </ul>
  </section>
  
  <section class="cta">
    <a href="https://wa.me/{{whatsappNumber}}?text=I'm interested in the {{sqm}}sqm land at {{location}}" 
       class="whatsapp-btn">
      💬 Inquire on WhatsApp
    </a>
  </section>
</div>`,
  },

  // 4. Agent Bio Page
  {
    id: 'tmpl_agent_bio_ng',
    name: 'Agent Bio Page',
    description: 'Professional Nigerian agent profile with credentials',
    category: 'agent',
    isPremium: false,
    nigeriaSpecific: true,
    tags: ['agent', 'profile', 'realtor'],
    code: `<div class="agent-bio">
  <header class="hero">
    <img src="{{agentPhoto}}" alt="{{agentName}}" class="agent-photo" />
    <div class="agent-info">
      <h1>{{agentName}}</h1>
      <p class="title">{{title}}</p>
      <div class="trust-badges">
        {{#if isVerified}}<span class="badge verified">✓ Verified Agent</span>{{/if}}
        {{#if rcNumber}}<span class="badge rc">RC: {{rcNumber}}</span>{{/if}}
      </div>
    </div>
  </header>
  
  <section class="credentials">
    <h2>Professional Credentials</h2>
    <ul class="credential-list">
      {{#if niesv}}<li>🏛️ NIESV Member</li>{{/if}}
      {{#if redan}}<li>🏢 REDAN Member</li>{{/if}}
      {{#if estateSurveyor}}<li>📋 Licensed Estate Surveyor</li>{{/if}}
    </ul>
  </section>
  
  <section class="about">
    <h2>About Me</h2>
    <p>{{bio}}</p>
  </section>
  
  <section class="specializations">
    <h2>Areas of Expertise</h2>
    <ul class="area-list">
      {{#each areas}}
      <li>📍 {{this}}</li>
      {{/each}}
    </ul>
  </section>
  
  <section class="active-listings">
    <h2>My Active Listings</h2>
    <div class="listing-grid">
      <!-- Listings populated dynamically -->
    </div>
  </section>
  
  <section class="cta">
    <a href="https://wa.me/{{whatsappNumber}}?text=Hello {{agentName}}, I'd like to inquire about your services" 
       class="whatsapp-btn primary">
      💬 Chat with {{firstName}}
    </a>
    <div class="social-links">
      {{#if instagram}}<a href="{{instagram}}" class="social instagram">📸 Instagram</a>{{/if}}
      {{#if linkedin}}<a href="{{linkedin}}" class="social linkedin">💼 LinkedIn</a>{{/if}}
    </div>
  </section>
</div>`,
  },

  // 5. Short-Let Apartment
  {
    id: 'tmpl_shortlet_standard_ng',
    name: 'Short-Let Apartment',
    description: 'Booking page for furnished short-stay apartments',
    category: 'shortlet',
    isPremium: false,
    nigeriaSpecific: true,
    tags: ['shortlet', 'apartment', 'furnished', 'vi', 'lekki'],
    code: `<div class="shortlet-apartment">
  <header class="hero gallery">
    <img src="{{heroImage}}" alt="{{propertyTitle}}" />
    <div class="quick-specs">
      <span class="badge">{{beds}} Bed</span>
      <span class="badge">{{baths}} Bath</span>
      <span class="badge">Max {{maxGuests}} guests</span>
    </div>
  </header>
  
  <section class="pricing-table">
    <h2>💰 Rates</h2>
    <div class="rate"><span class="period">Per Night</span><span class="price">₦{{formatNaira(perNight)}}</span></div>
    <div class="rate"><span class="period">Weekly</span><span class="price">₦{{formatNaira(weekly)}}</span></div>
    <div class="rate"><span class="period">Monthly</span><span class="price">₦{{formatNaira(monthly)}}</span></div>
  </section>
  
  <section class="amenities">
    <h2>🏠 Amenities</h2>
    <div class="amenity-grid">
      <div class="amenity">📶 WiFi</div>
      <div class="amenity">❄️ AC</div>
      <div class="amenity">🍳 Kitchen</div>
      <div class="amenity">📺 Netflix</div>
      <div class="amenity">🅿️ Parking</div>
      <div class="amenity">⚡ 24/7 Power</div>
      <div class="amenity">🔒 Security</div>
      <div class="amenity">🧹 Cleaning</div>
    </div>
  </section>
  
  <section class="house-rules">
    <h2>📋 House Rules</h2>
    <ul>
      <li>Check-in: 2:00 PM / Check-out: 12:00 PM</li>
      <li>No smoking</li>
      <li>No parties</li>
    </ul>
  </section>
  
  <section class="location">
    <h2>📍 {{location}}</h2>
    <p>{{locationDescription}}</p>
  </section>
  
  <section class="cta sticky-bottom">
    <a href="https://wa.me/{{whatsappNumber}}?text=I'd like to book {{propertyTitle}} for [dates]" 
       class="whatsapp-btn">
      📱 Book on WhatsApp
    </a>
  </section>
</div>`,
  },

  // 6. Property Inspection Event
  {
    id: 'tmpl_event_inspection_ng',
    name: 'Property Inspection Event',
    description: 'Book property inspections - Nigerian open house',
    category: 'inspection',
    isPremium: false,
    nigeriaSpecific: true,
    tags: ['inspection', 'event', 'viewing', 'open-house'],
    code: `<div class="property-inspection">
  <header class="hero">
    <img src="{{heroImage}}" alt="{{propertyTitle}}" />
    <div class="event-badge">🏠 Property Inspection</div>
  </header>
  
  <section class="event-details">
    <h1>{{propertyTitle}}</h1>
    <div class="datetime">
      <div class="date">📅 {{inspectionDate}}</div>
      <div class="time">🕐 {{inspectionTime}}</div>
    </div>
    <p class="location">📍 {{location}}</p>
  </section>
  
  <section class="property-preview">
    <h2>Property Highlights</h2>
    <div class="stats-bar">
      <div class="stat">₦{{formatNaira(price)}}</div>
      <div class="stat">{{beds}} Beds</div>
      <div class="stat">{{baths}} Baths</div>
      <div class="stat">{{sqm}} sqm</div>
    </div>
    <ul class="highlights">
      {{#each highlights}}
      <li>✓ {{this}}</li>
      {{/each}}
    </ul>
  </section>
  
  <section class="what-to-expect">
    <h2>What to Expect</h2>
    <ul>
      <li>🎯 Guided property tour</li>
      <li>📋 Documentation review</li>
      <li>💬 Q&A with agent</li>
      <li>📏 Measurements verification</li>
    </ul>
  </section>
  
  <section class="rsvp">
    <h2>Reserve Your Spot</h2>
    <a href="https://wa.me/{{whatsappNumber}}?text=I'd like to RSVP for the inspection at {{location}} on {{inspectionDate}}" 
       class="whatsapp-btn">
      ✅ RSVP on WhatsApp
    </a>
  </section>
  
  <section class="directions">
    <h2>📍 Directions</h2>
    <p>{{directions}}</p>
  </section>
</div>`,
  },

  // 7. Off-Plan Estate
  {
    id: 'tmpl_estate_offplan_ng',
    name: 'Off-Plan Estate',
    description: 'Pre-construction marketing for new estate developments',
    category: 'estate',
    isPremium: false,
    nigeriaSpecific: true,
    tags: ['estate', 'off-plan', 'development', 'investment'],
    code: `<div class="offplan-estate">
  <header class="hero">
    <img src="{{renderImage}}" alt="{{estateName}}" class="render-3d" />
    <div class="estate-badge">🏗️ Off-Plan Development</div>
  </header>
  
  <section class="estate-overview">
    <h1>{{estateName}}</h1>
    <p class="tagline">{{tagline}}</p>
    <p class="location">📍 {{location}}</p>
  </section>
  
  <section class="unit-types">
    <h2>Available Unit Types</h2>
    <div class="unit-grid">
      {{#each unitTypes}}
      <div class="unit-card">
        <h3>{{type}}</h3>
        <p class="unit-price">From ₦{{formatNaira(startingPrice)}}</p>
        <p class="unit-size">{{sqm}} sqm</p>
      </div>
      {{/each}}
    </div>
  </section>
  
  <section class="estate-amenities">
    <h2>Estate Infrastructure</h2>
    <div class="amenity-grid">
      <div class="amenity">⚡ 24/7 Power Supply</div>
      <div class="amenity">💧 Central Bore Hole</div>
      <div class="amenity">🔒 Gated Community</div>
      <div class="amenity">🛣️ Interlocked Roads</div>
      <div class="amenity">🌳 Green Areas</div>
      <div class="amenity">🏊 Swimming Pool</div>
    </div>
  </section>
  
  <section class="payment-plans">
    <h2>💳 Payment Plans</h2>
    <div class="plan-options">
      <div class="plan">
        <h3>Outright Payment</h3>
        <p>5% discount</p>
      </div>
      <div class="plan">
        <h3>6-Month Plan</h3>
        <p>30% initial deposit</p>
      </div>
      <div class="plan">
        <h3>12-Month Plan</h3>
        <p>20% initial deposit</p>
      </div>
    </div>
  </section>
  
  <section class="timeline">
    <h2>📅 Delivery Timeline</h2>
    <p>Expected completion: {{deliveryDate}}</p>
  </section>
  
  <section class="developer">
    <h2>Developer</h2>
    <p><strong>{{developerName}}</strong></p>
    {{#if rcNumber}}<p>RC: {{rcNumber}}</p>{{/if}}
  </section>
  
  <section class="cta">
    <a href="https://wa.me/{{whatsappNumber}}?text=I'm interested in {{estateName}}. Please send more information." 
       class="whatsapp-btn">
      📞 Register Interest
    </a>
  </section>
</div>`,
  },

  // 8. Team/Agency Page
  {
    id: 'tmpl_agent_team_ng',
    name: 'Team/Agency Page',
    description: 'Showcase entire agency team for established firms',
    category: 'agency',
    isPremium: false,
    nigeriaSpecific: true,
    tags: ['agency', 'team', 'company', 'about'],
    code: `<div class="agency-page">
  <header class="hero">
    <img src="{{heroImage}}" alt="{{agencyName}}" />
    <div class="agency-info">
      <h1>{{agencyName}}</h1>
      <p class="tagline">{{tagline}}</p>
      <div class="trust-badges">
        {{#if isVerified}}<span class="badge verified">✓ Verified Agency</span>{{/if}}
        {{#if rcNumber}}<span class="badge rc">RC: {{rcNumber}}</span>{{/if}}
      </div>
    </div>
  </header>
  
  <section class="about">
    <h2>Our Story</h2>
    <p>{{aboutUs}}</p>
  </section>
  
  <section class="team">
    <h2>Meet Our Team</h2>
    <div class="team-grid">
      {{#each team}}
      <div class="team-member">
        <img src="{{photo}}" alt="{{name}}" />
        <h3>{{name}}</h3>
        <p class="title">{{title}}</p>
        <a href="https://wa.me/{{whatsapp}}" class="whatsapp-link">💬</a>
      </div>
      {{/each}}
    </div>
  </section>
  
  <section class="coverage">
    <h2>📍 Areas We Cover</h2>
    <div class="area-grid">
      {{#each coverageAreas}}
      <span class="area-badge">{{this}}</span>
      {{/each}}
    </div>
  </section>
  
  <section class="featured-listings">
    <h2>Featured Properties</h2>
    <div class="listing-grid">
      <!-- Dynamic listings -->
    </div>
  </section>
  
  <section class="offices">
    <h2>📍 Our Offices</h2>
    {{#each offices}}
    <div class="office">
      <h3>{{city}}</h3>
      <p>{{address}}</p>
      <p>📞 {{phone}}</p>
    </div>
    {{/each}}
  </section>
  
  <section class="cta">
    <a href="https://wa.me/{{whatsappNumber}}?text=Hello {{agencyName}}, I'd like to know more about your services" 
       class="whatsapp-btn">
      💬 Contact Us on WhatsApp
    </a>
  </section>
</div>`,
  },

  // 9. Area Guide
  {
    id: 'tmpl_location_guide_ng',
    name: 'Area Guide',
    description: 'Neighborhood marketing for specific areas',
    category: 'listing',
    isPremium: false,
    nigeriaSpecific: true,
    tags: ['location', 'guide', 'area', 'neighborhood'],
    code: `<div class="area-guide">
  <header class="hero">
    <img src="{{heroImage}}" alt="{{areaName}}" />
    <h1>Living in {{areaName}}</h1>
    <p class="subtitle">Your Complete Area Guide</p>
  </header>
  
  <section class="why-live-here">
    <h2>Why Live in {{areaName}}?</h2>
    <ul class="reasons">
      {{#each reasons}}
      <li>✓ {{this}}</li>
      {{/each}}
    </ul>
  </section>
  
  <section class="amenities">
    <h2>🏪 Local Amenities</h2>
    <div class="category">
      <h3>🏫 Schools</h3>
      <ul>{{#each schools}}<li>{{this}}</li>{{/each}}</ul>
    </div>
    <div class="category">
      <h3>🏥 Hospitals</h3>
      <ul>{{#each hospitals}}<li>{{this}}</li>{{/each}}</ul>
    </div>
    <div class="category">
      <h3>🛒 Shopping</h3>
      <ul>{{#each shopping}}<li>{{this}}</li>{{/each}}</ul>
    </div>
  </section>
  
  <section class="price-guide">
    <h2>💰 Property Price Ranges</h2>
    <div class="price-grid">
      <div class="price-card">
        <h3>3 Bedroom Flat</h3>
        <p>₦{{formatNaira(flat3bed.min)}} - ₦{{formatNaira(flat3bed.max)}}</p>
      </div>
      <div class="price-card">
        <h3>4 Bedroom Duplex</h3>
        <p>₦{{formatNaira(duplex4bed.min)}} - ₦{{formatNaira(duplex4bed.max)}}</p>
      </div>
      <div class="price-card">
        <h3>Land (per sqm)</h3>
        <p>₦{{formatNaira(landPerSqm.min)}} - ₦{{formatNaira(landPerSqm.max)}}</p>
      </div>
    </div>
  </section>
  
  <section class="featured-properties">
    <h2>🏠 Available in {{areaName}}</h2>
    <div class="property-grid">
      <!-- Dynamic properties -->
    </div>
  </section>
  
  <section class="transport">
    <h2>🚗 Transportation</h2>
    <p>{{transportInfo}}</p>
  </section>
  
  <section class="cta">
    <a href="https://wa.me/{{whatsappNumber}}?text=I'm interested in properties in {{areaName}}" 
       class="whatsapp-btn">
      💬 Find Properties in {{areaName}}
    </a>
  </section>
</div>`,
  },

  // 10. Seller Services
  {
    id: 'tmpl_company_sellers_ng',
    name: 'Seller Services',
    description: 'Landing page for seller lead generation',
    category: 'agency',
    isPremium: false,
    nigeriaSpecific: true,
    tags: ['sellers', 'valuation', 'listing', 'lead-gen'],
    code: `<div class="seller-services">
  <header class="hero">
    <h1>Sell Your Property with {{agencyName}}</h1>
    <p class="subtitle">Get the best price for your property in Nigeria</p>
  </header>
  
  <section class="value-props">
    <h2>Why List With Us?</h2>
    <div class="prop-grid">
      <div class="prop">
        <span class="icon">📸</span>
        <h3>Professional Photography</h3>
        <p>High-quality photos that attract buyers</p>
      </div>
      <div class="prop">
        <span class="icon">📱</span>
        <h3>Maximum Exposure</h3>
        <p>Listed on all major Nigerian property portals</p>
      </div>
      <div class="prop">
        <span class="icon">💰</span>
        <h3>Best Price Guarantee</h3>
        <p>Data-driven pricing for maximum returns</p>
      </div>
      <div class="prop">
        <span class="icon">✓</span>
        <h3>Verified Buyers</h3>
        <p>We pre-qualify all potential buyers</p>
      </div>
    </div>
  </section>
  
  <section class="process">
    <h2>Our Selling Process</h2>
    <ol class="process-steps">
      <li><span class="step">1</span> Free Property Valuation</li>
      <li><span class="step">2</span> Professional Photography</li>
      <li><span class="step">3</span> Multi-Platform Marketing</li>
      <li><span class="step">4</span> Buyer Negotiations</li>
      <li><span class="step">5</span> Closing & Handover</li>
    </ol>
  </section>
  
  <section class="testimonials">
    <h2>Success Stories</h2>
    <div class="testimonial-grid">
      {{#each testimonials}}
      <blockquote class="testimonial">
        <p>"{{quote}}"</p>
        <cite>— {{name}}, {{location}}</cite>
      </blockquote>
      {{/each}}
    </div>
  </section>
  
  <section class="stats">
    <h2>Our Track Record</h2>
    <div class="stat-grid">
      <div class="stat"><span class="value">500+</span><span class="label">Properties Sold</span></div>
      <div class="stat"><span class="value">₦50B+</span><span class="label">Total Value</span></div>
      <div class="stat"><span class="value">30</span><span class="label">Days Average</span></div>
    </div>
  </section>
  
  <section class="cta valuation-form">
    <h2>Get Your Free Valuation</h2>
    <a href="https://wa.me/{{whatsappNumber}}?text=I'd like a free valuation for my property at [your address]" 
       class="whatsapp-btn large">
      💬 Request Free Valuation
    </a>
    <p class="disclaimer">No obligations. Valuation within 24 hours.</p>
  </section>
</div>`,
  },
];

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: string): TemplateType[] {
  return MVP_TEMPLATES.filter(t => t.category === category);
}

/**
 * Get template by ID
 */
export function getTemplateById(id: string): TemplateType | undefined {
  return MVP_TEMPLATES.find(t => t.id === id);
}
