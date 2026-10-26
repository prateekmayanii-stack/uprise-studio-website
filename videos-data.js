/**
 * UPRISE STUDIO — REAL CLIENT VIDEO LIBRARY DATASET
 * 27 client video productions from the user's "Videos to host" folder
 * Shuffled order, web-optimized H.264 streams with dedicated poster thumbnails
 */

(function () {
  'use strict';

  var UPRISE_REELS = [
    {
      id: "reel-01",
      index: 1,
      title: "Client Production #01",
      videoSrc: "videos/reel-01.mp4",
      posterSrc: "thumbnails/reel-01.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "The Fundamental Retail Rule",
      quote: "People don't walk into shops they've never heard of. When your showroom appears on their phone every single day, your counter becomes their first choice.",
      author: "— The Modern Retail Law",
      takeaway: "30 daily reels keep your showroom top-of-mind before customers decide where to spend their weekend budget."
    },
    {
      id: "reel-02",
      index: 2,
      title: "Client Production #02",
      videoSrc: "videos/reel-02.mp4",
      posterSrc: "thumbnails/reel-02.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "The 4 PM Showroom Law",
      quote: "If an offline customer doesn't see your fresh arrivals on their phone by 4 PM, they will buy from the competitor who showed it to them at 11 AM.",
      author: "— Inventory Velocity Principle",
      takeaway: "Daily short-form video creates immediate purchase urgency and stops buyers from heading to competitor showrooms."
    },
    {
      id: "reel-03",
      index: 3,
      title: "Client Production #03",
      videoSrc: "videos/reel-03.mp4",
      posterSrc: "thumbnails/reel-03.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "Billboard vs. Phone",
      quote: "A roadside hoarding gets 2 seconds of distracted glance from a passing car. A 9:16 in-store reel gets 30 seconds of undivided customer attention right on their sofa.",
      author: "— Attention Economics in India",
      takeaway: "Reels deliver 10x the attention of outdoor hoardings at a fraction of the cost, targeted directly to local pin codes."
    },
    {
      id: "reel-04",
      index: 4,
      title: "Client Production #04",
      videoSrc: "videos/reel-04.mp4",
      posterSrc: "thumbnails/reel-04.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "The New Showroom Window",
      quote: "Instagram isn't an entertainment app for retail owners; it is your digital showroom window. If your window is dark, customers assume your shop has nothing new.",
      author: "— Visual Merchandising 2.0",
      takeaway: "Active social feeds signal a thriving, fresh, and trustworthy business that customers are excited to visit."
    },
    {
      id: "reel-05",
      index: 5,
      title: "Client Production #05",
      videoSrc: "videos/reel-05.mp4",
      posterSrc: "thumbnails/reel-05.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "Hyper-Local Power",
      quote: "You don't need 1 million followers across the country. You need 15,000 paying families living within 10 kilometers of your shop to see your collection every week.",
      author: "— City-Centric Footfall Formula",
      takeaway: "Pin-code targeted distribution brings actual local customers directly to your physical billing counter."
    },
    {
      id: "reel-06",
      index: 6,
      title: "Client Production #06",
      videoSrc: "videos/reel-06.mp4",
      posterSrc: "thumbnails/reel-06.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "Pre-Purchase Psychology",
      quote: "Customers no longer wander through markets for 4 hours. They scroll Instagram for 20 minutes, pick their store, and travel straight there with cash in hand.",
      author: "— The Modern Shopper Journey",
      takeaway: "When a customer steps into your showroom after watching your reels, 80% of their buying decision is already made."
    },
    {
      id: "reel-07",
      index: 7,
      title: "Client Production #07",
      videoSrc: "videos/reel-07.mp4",
      posterSrc: "thumbnails/reel-07.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "In-Store Authenticity",
      quote: "Glossy corporate ads feel fake. Authentic videos shot inside your real showroom with your real staff build unbreakable local trust.",
      author: "— The Transparency Multiplier",
      takeaway: "Showing your actual racks, price points, and lighting eliminates customer hesitation before they visit."
    },
    {
      id: "reel-08",
      index: 8,
      title: "Client Production #08",
      videoSrc: "videos/reel-08.mp4",
      posterSrc: "thumbnails/reel-08.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "Word of Mouth Scaled",
      quote: "Traditional word-of-mouth used to take months over casual conversations. Today, a single reel forwarded on family WhatsApp groups fills your store by Saturday.",
      author: "— Digital Referral Engine",
      takeaway: "Shareable short-form videos empower happy customers to act as your daily marketing ambassadors."
    },
    {
      id: "reel-09",
      index: 9,
      title: "Client Production #09",
      videoSrc: "videos/reel-09.mp4",
      posterSrc: "thumbnails/reel-09.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "Counter Conversion",
      quote: "The best sales pitch isn't delivered across the glass display counter. It is delivered the night before through a video that proves your quality.",
      author: "— Frictionless Selling",
      takeaway: "Customers who visit from social media ask fewer questions, haggle less, and make faster purchasing decisions."
    },
    {
      id: "reel-10",
      index: 10,
      title: "Client Production #10",
      videoSrc: "videos/reel-10.mp4",
      posterSrc: "thumbnails/reel-10.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "Consistency Over Luck",
      quote: "Going viral once won't build a retail legacy. 30 high-retention reels a month builds compounding brand authority that crushes local competitors.",
      author: "— The Daily Flywheel Rule",
      takeaway: "Consistent daily posting keeps your brand in customer feeds during festive, wedding, and payday shopping cycles."
    },
    {
      id: "reel-11",
      index: 11,
      title: "Client Production #11",
      videoSrc: "videos/reel-11.mp4",
      posterSrc: "thumbnails/reel-11.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "Festive Hype Advantage",
      quote: "Festival and wedding seasons are won weeks before the rush. The showroom that builds hype on reels ahead of time captures 70% of advance bookings.",
      author: "— Peak Season Strategy",
      takeaway: "Showcase bridal and festive collections 30 days early to lock in customer purchase plans before rivals start advertising."
    },
    {
      id: "reel-12",
      index: 12,
      title: "Client Production #12",
      videoSrc: "videos/reel-12.mp4",
      posterSrc: "thumbnails/reel-12.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "The 1-in-7 Breakout",
      quote: "Every 7th reel is an algorithm breakout that organically reaches thousands of new families who never knew your shop existed.",
      author: "— Organic Algorithm Power",
      takeaway: "Consistent production guarantees regular viral breakouts that keep expanding your showroom's local customer base."
    },
    {
      id: "reel-13",
      index: 13,
      title: "Client Production #13",
      videoSrc: "videos/reel-13.mp4",
      posterSrc: "thumbnails/reel-13.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "Unlimited Capacity",
      quote: "Your physical shop has fixed square footage and opening hours. Your Instagram video showroom is open 24/7 with unlimited capacity to welcome buyers.",
      author: "— Scaled Retail Economics",
      takeaway: "Customers browse your catalogue late at night from home and arrive ready to buy when you open the shutter next morning."
    },
    {
      id: "reel-14",
      index: 14,
      title: "Client Production #14",
      videoSrc: "videos/reel-14.mp4",
      posterSrc: "thumbnails/reel-14.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "Dead Stock Liquidation",
      quote: "Every unmoving item on your display shelf is trapped working capital. Video styling and feature spotlights unlock dead inventory into instant cashflow.",
      author: "— Working Capital Velocity",
      takeaway: "Highlighting overlooked collections on video rekindles buyer demand and accelerates stock turnover."
    },
    {
      id: "reel-15",
      index: 15,
      title: "Client Production #15",
      videoSrc: "videos/reel-15.mp4",
      posterSrc: "thumbnails/reel-15.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "The E-Commerce Shield",
      quote: "Online apps can deliver a cardboard box in 3 days, but they can't match the instant touch, feel, trial, and personal warmth of your showroom. Show that on video.",
      author: "— The Offline Counter-Attack",
      takeaway: "Showcasing fabric drape, diamond sparkle, and immediate in-store take-home wins the battle against online delivery delays."
    },
    {
      id: "reel-16",
      index: 16,
      title: "Client Production #16",
      videoSrc: "videos/reel-16.mp4",
      posterSrc: "thumbnails/reel-16.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "Human Connection",
      quote: "People buy from people they like and trust. When shop owners and staff passionately present products on camera, customer loyalty becomes permanent.",
      author: "— Showroom Personal Branding",
      takeaway: "Putting a recognizable, welcoming face to your showroom creates emotional connection that no chain store can copy."
    },
    {
      id: "reel-17",
      index: 17,
      title: "Client Production #17",
      videoSrc: "videos/reel-17.mp4",
      posterSrc: "thumbnails/reel-17.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "Paper Pamphlet vs. Reel",
      quote: "Paper newspaper inserts get tossed into the wastebasket in 10 seconds. In-store reels get saved, bookmarked, and forwarded directly to spouses with: 'Let's buy this.'",
      author: "— Zero Waste Advertising",
      takeaway: "Digital video builds a permanent, searchable archive of your inventory that works for your business forever."
    },
    {
      id: "reel-18",
      index: 18,
      title: "Client Production #18",
      videoSrc: "videos/reel-18.mp4",
      posterSrc: "thumbnails/reel-18.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "High Ticket Magnet",
      quote: "Discounts attract bargain hunters who never return. High-production storytelling reels attract premium buyers who respect craftsmanship and pay full price.",
      author: "— Premium Positioning",
      takeaway: "Cinematic lighting and macro detail shots elevate your store's perceived value and attract higher-ticket customers."
    },
    {
      id: "reel-19",
      index: 19,
      title: "Client Production #19",
      videoSrc: "videos/reel-19.mp4",
      posterSrc: "thumbnails/reel-19.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "Silent Objections",
      quote: "Before walking into an unfamiliar store, customers fear high prices or pushy salespeople. Videos answer those unspoken fears and make visiting feel effortless.",
      author: "— Walk-in Psychology",
      takeaway: "Transparent pricing hints and a friendly on-camera tone remove the psychological barrier of entering your store."
    },
    {
      id: "reel-20",
      index: 20,
      title: "Client Production #20",
      videoSrc: "videos/reel-20.mp4",
      posterSrc: "thumbnails/reel-20.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "The 10km Dominance",
      quote: "The retailer who controls the local Instagram feed controls the local market. Whoever wins attention on smartphones wins footfall at the cash counter.",
      author: "— Modern Market Share",
      takeaway: "Dominating your city's mobile feeds makes your store the undisputed landmark in your retail category."
    },
    {
      id: "reel-21",
      index: 21,
      title: "Client Production #21",
      videoSrc: "videos/reel-21.mp4",
      posterSrc: "thumbnails/reel-21.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "Visual Emotion",
      quote: "Offline retail is 100% emotional. Video captures the gleam of gold, the softness of silk, and the crackle of festive lights in ways static photos never could.",
      author: "— Sensory Merchandising",
      takeaway: "Dynamic motion and authentic store sounds trigger emotional purchase impulses that photos simply cannot match."
    },
    {
      id: "reel-22",
      index: 22,
      title: "Client Production #22",
      videoSrc: "videos/reel-22.mp4",
      posterSrc: "thumbnails/reel-22.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "The Saturday Rush Secret",
      quote: "A busy weekend doesn't happen by accident. It is engineered by the 5 reels your local audience watched between Tuesday and Friday evening.",
      author: "— Weekend Traffic Engineering",
      takeaway: "Mid-week video previews build anticipation and ensure your showroom is packed during Saturday and Sunday peak hours."
    },
    {
      id: "reel-23",
      index: 23,
      title: "Client Production #23",
      videoSrc: "videos/reel-23.mp4",
      posterSrc: "thumbnails/reel-23.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "Zero-Risk Customer Proof",
      quote: "Watching another customer smiling at your billing counter is the most persuasive advertisement ever created. Social proof is the engine of footfall.",
      author: "— The Social Validation Law",
      takeaway: "Capturing real in-store energy and bustle reassures new buyers that your store is the most popular choice in town."
    },
    {
      id: "reel-24",
      index: 24,
      title: "Client Production #24",
      videoSrc: "videos/reel-24.mp4",
      posterSrc: "thumbnails/reel-24.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "Price vs. Value",
      quote: "When customers understand the craftsmanship, warranty, and service behind your product through video, price ceases to be their main obstacle.",
      author: "— Value Communication",
      takeaway: "Explaining the unique features of your inventory on video justifies your margins and prevents unnecessary price cuts."
    },
    {
      id: "reel-25",
      index: 25,
      title: "Client Production #25",
      videoSrc: "videos/reel-25.mp4",
      posterSrc: "thumbnails/reel-25.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "Neighborhood Pride",
      quote: "Local shoppers want to support local institutions. Show them your showroom is vibrant, modern, and dedicated to serving their family with integrity.",
      author: "— Community Commerce",
      takeaway: "Positioning your store as a proud local destination strengthens customer loyalty and shields against corporate retail chains."
    },
    {
      id: "reel-26",
      index: 26,
      title: "Client Production #26",
      videoSrc: "videos/reel-26.mp4",
      posterSrc: "thumbnails/reel-26.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "The Daily Reminder",
      quote: "Running a showroom without daily video is like keeping your signboard turned off at night. Turn on the lights and let the whole city know you are open.",
      author: "— Visibility Imperative",
      takeaway: "Daily posting acts as a glowing neon sign that reminds 10,000+ local buyers every single morning that you are open for business."
    },
    {
      id: "reel-27",
      index: 27,
      title: "Client Production #27",
      videoSrc: "videos/reel-27.mp4",
      posterSrc: "thumbnails/reel-27.jpg",
      badge: "Real Retail Shoot",
      format: "9:16 Vertical Reel",
      quoteCategory: "The Footfall Compounder",
      quote: "The fastest way to double your in-store sales isn't moving to a more expensive street. It is deploying 30 high-impact reels a month to the customers living right around you.",
      author: "— The 30-Day Growth Engine",
      takeaway: "A consistent monthly video system generates reliable, compounding footfall month after month, season after season."
    }
  ];

  /**
   * ACCURATE RETAIL NICHES (100% English & Tailored for Real Offline Indian Retailers)
   */
  var RETAIL_NICHES = [
    {
      id: "cloth-showroom",
      name: "Cloth & Apparel Showroom",
      icon: "👗",
      badge: "Ethnic & Western Wear",
      subtitle: "Bridal Sarees, Lehengas, Menswear & Designer Boutiques",
      description: "We capture fabric textures, dynamic model trials, festive arrival drops, and drape flows that compel shoppers to visit for fittings.",
      keyHook: "“Before you buy your wedding outfit, see the real flare in natural showroom light…”",
      avgTicket: "₹2,500 - ₹12,000",
      whatsappMsg: "Namaste Prateek & Unnati! I own a Cloth & Apparel Showroom and want footfall reels for my store."
    },
    {
      id: "hardware-sanitary",
      name: "Hardware & Sanitaryware",
      icon: "🚿",
      badge: "Bathware & Tiles",
      subtitle: "Luxury Faucets, Tiles, Bath Fittings, Plywood & Modular Kitchens",
      description: "Hands-on scratch and water-pressure demonstrations that convince interior designers, contractors, and home renovators to visit in person.",
      keyHook: "“Why top architects in our city recommend this waterproof finish for modern homes…”",
      avgTicket: "₹4,000 - ₹35,000",
      whatsappMsg: "Namaste Prateek & Unnati! I own a Hardware & Sanitaryware Showroom and want footfall reels for my store."
    },
    {
      id: "footwear-sneakers",
      name: "Footwear & Sneaker Store",
      icon: "👟",
      badge: "Comfort & Style",
      subtitle: "Formal Leather, Trendy Sneakers, Sports Shoes & Family Footwear",
      description: "Sole-flex stress tests, unboxing hype, and cushion comfort comparisons that convert scrolling youth and parents into immediate buyers.",
      keyHook: "“Testing 24-hour sole comfort: why this sneaker beat three 5x priced brands…”",
      avgTicket: "₹1,200 - ₹4,500",
      whatsappMsg: "Namaste Prateek & Unnati! I own a Footwear & Sneaker Store and want footfall reels for my store."
    },
    {
      id: "gifting-wholesale",
      name: "Gifting & Wholesale Store",
      icon: "🎁",
      badge: "Bulk & Corporate",
      subtitle: "Festive Hampers, Corporate Gifting, Novelties & Bulk Merchandise",
      description: "Bulk variety showcases, packaging unboxings, and wholesale price comparisons that drive direct shop visits from festival buyers and corporates.",
      keyHook: "“Festive season wholesale secret: 5 luxury gifting hampers under direct factory rates…”",
      avgTicket: "₹1,500 - ₹8,000",
      whatsappMsg: "Namaste Prateek & Unnati! I own a Gifting & Wholesale Trading Store and want bulk inquiry reels for my store."
    },
    {
      id: "sweets-cafe",
      name: "Sweets & Food Cafe",
      icon: "🍬",
      badge: "Pure Ghee & Delicacies",
      subtitle: "Traditional Mithai, Premium Confectionery & Live Evening Counters",
      description: "Steaming hot syrup pours, pure ghee texture breaks, and hygiene proofs that trigger evening cravings and family weekend visits.",
      keyHook: "“Made fresh every afternoon with 100% pure desi ghee: watch the melt-in-mouth test…”",
      avgTicket: "₹400 - ₹1,800",
      whatsappMsg: "Namaste Prateek & Unnati! I own a Sweets & Food Cafe and want viral food reels for my store."
    },
    {
      id: "jewelry-luxury",
      name: "Jewelry & Luxury Ornaments",
      icon: "💍",
      badge: "Hallmarked Gold & Polki",
      subtitle: "Bridal Gold, Diamond Sets, Polki & Hallmark Silver",
      description: "Macro sparkle lighting, transparent weight/making charge breakdowns, and authentic family trust building inside your showroom.",
      keyHook: "“Look at the intricate meenakari work behind this lightweight bridal choker…”",
      avgTicket: "₹15,000 - ₹1,50,000",
      whatsappMsg: "Namaste Prateek & Unnati! I own a Jewelry Showroom and want footfall reels for my store."
    },
    {
      id: "electronics-mobile",
      name: "Electronics & Mobile Store",
      icon: "📱",
      badge: "Smartphones & Appliances",
      subtitle: "Flagship Mobiles, 4K TVs, Laptops & Home Appliances",
      description: "Camera shootouts, side-by-side durability comparisons, and zero-down-payment EMI walk-in triggers filmed right at your billing counter.",
      keyHook: "“Before you buy this phone online, see our instant in-store festival exchange bonus…”",
      avgTicket: "₹8,000 - ₹45,000",
      whatsappMsg: "Namaste Prateek & Unnati! I own an Electronics & Mobile Showroom and want footfall reels for my store."
    },
    {
      id: "optical-eyewear",
      name: "Optical & Eyewear Studio",
      icon: "🕶️",
      badge: "Vision Care & Luxury Frames",
      subtitle: "Designer Frames, Blue-Cut Lenses, Sunglasses & Contact Lenses",
      description: "Face-shape frame guides, scratch tests, and 10-minute computer vision test proofs that draw daily walk-ins from students and professionals.",
      keyHook: "“Stop buying the wrong frames: here is how to match frame shape to your exact jawline…”",
      avgTicket: "₹1,200 - ₹5,500",
      whatsappMsg: "Namaste Prateek & Unnati! I own an Optical & Eyewear Studio and want footfall reels for my store."
    }
  ];

  // Expose globally
  window.UPRISE_REELS = UPRISE_REELS;
  window.UPRISE_VIDEOS = UPRISE_REELS; // Backward compatibility
  window.RETAIL_NICHES = RETAIL_NICHES;
})();
