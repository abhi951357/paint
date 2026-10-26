export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  image: string;
  badge?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
  duration: string;
  highlight: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  avatarInitial: string;
  projectType: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  code: string;
  mood: string;
  collection: string;
}

export const SITE_DATA = {
  companyName: "Colorix Painting Services",
  tagline: "Let’s bring new color to your space — Get a free painting quote today!",
  emailPrimary: "hello@colorixpaint.com",
  emailSecondary: "info@colorixpainting.co.uk",
  phonePrimary: "(555) 123-4567",
  phoneLondon: "+44 20 1234 5678",
  address: "West London, United Kingdom Victoria 3000, London",
  heroSubtitle: "Colorix provides expert interior and exterior painting for homes and businesses across West London, delivering smooth finishes.",
  stats: [
    { number: "35k+", label: "Painting Projects Completed", detail: "Residential, commercial & heritage properties across London" },
    { number: "99%", label: "Overall Client Satisfaction Rate", detail: "Independently verified 5-star customer reviews" },
    { number: "25", unit: "yrs", label: "Combined Painting Experience", detail: "Master accredited craftsmen & interior specialists" },
    { number: "75%", label: "Projects From Repeated Clients", detail: "Trusted by top property managers & homeowners" },
  ],
  services: [
    {
      id: "waterproof-coating",
      title: "Waterproof Coating",
      category: "Wall & Masonry Protection",
      description: "Protect your walls from dampness, leaks, & moisture with advanced waterproof solutions engineered for British weather.",
      features: ["Breathable elastomeric membranes", "Anti-fungal & damp barrier", "10-year weather protection warranty"],
      image: "/images/exterior.jpg",
      badge: "Weather Shield",
    },
    {
      id: "wood-painting-polish",
      title: "Wood Painting & Polish",
      category: "Joinery & Woodwork",
      description: "Enhance wooden surfaces with premium paint, polish, and protective finishes for bespoke cabinetry and architectural mouldings.",
      features: ["Hand-rubbed satin & lacquer finishes", "Stain resistance & grain enhancement", "Cabinetry, sashes & panelling"],
      image: "/images/wood.jpg",
      badge: "Artisan Polish",
    },
    {
      id: "decorative-wall-design",
      title: "Decorative Wall Design",
      category: "Bespoke Feature Walls",
      description: "Add style to your space with creative textures, patterns, and feature wall designs including Venetian plaster and limewash.",
      features: ["Italian Venetian plaster & micro-cement", "Subtle organic limewash textures", "Geometric & metallic accent designs"],
      image: "/images/decorative.jpg",
      badge: "Signature Art",
    },
    {
      id: "crack-gap-filling",
      title: "Crack & Gap Filling",
      category: "Preparation & Restoration",
      description: "Seal all cracks and gaps properly to achieve a smooth and flawless wall finish ready for paint application.",
      features: ["Precision skim-coating & plaster repair", "Flexible acoustic caulk for baseboards", "Invisible seamless finish"],
      image: "/images/hero.jpg",
      badge: "Flawless Prep",
    },
  ],
  projects: [
    {
      id: "luxury-living-space",
      title: "Luxury Living Space Design",
      category: "Accent & Feature Walls",
      location: "Kensington, West London",
      description: "Deep bespoke teal wall panelling complemented by natural alabaster lime wash plaster and brass trim detailing.",
      image: "/images/hero.jpg",
      duration: "5 Days",
      highlight: "Hand-Crafted Panelling",
    },
    {
      id: "victorian-townhouse-exterior",
      title: "Full Exterior Repaint",
      category: "Exterior Painting",
      location: "Notting Hill, London",
      description: "Complete stucco restoration and masonry repainting in crisp off-white with high-gloss black front door and ironwork.",
      image: "/images/exterior.jpg",
      duration: "2 Weeks",
      highlight: "Heritage Restoration",
    },
    {
      id: "modern-living-room-refresh",
      title: "Modern Living Room Refresh",
      category: "Interior Painting",
      location: "Chelsea, London",
      description: "Complete transformation with warm acoustic textures, ceiling refresh, and flawless satin trim coats.",
      image: "/images/decorative.jpg",
      duration: "4 Days",
      highlight: "Flawless Finish",
    },
    {
      id: "commercial-boutique-painting",
      title: "Commercial Painting",
      category: "Commercial Painting",
      location: "Mayfair & West End",
      description: "Architectural arches finished in muted terracotta and limestone wash for a premier luxury boutique.",
      image: "/images/commercial.jpg",
      duration: "3 Nights",
      highlight: "Zero Downtime",
    },
    {
      id: "artisan-wood-cabinetry",
      title: "Wood Painting & Polish",
      category: "Accent & Feature Walls",
      location: "Richmond, West London",
      description: "Hand-rubbed lacquer finish on custom oak and walnut joinery, bringing out deep grain brilliance.",
      image: "/images/wood.jpg",
      duration: "1 Week",
      highlight: "Bespoke Joinery",
    },
  ],
  processSteps: [
    {
      number: "01",
      title: "Free Consultation",
      description: "We start by understanding your vision, preferred colors, timeline, and budget. Our colour consultant provides samples on-site.",
      icon: "CalendarCheck",
    },
    {
      number: "02",
      title: "Surface Preparation",
      description: "A flawless finish begins with proper preparation. We protect your furniture and floors with heavy-duty drop cloths and seal all cracks.",
      icon: "ShieldCheck",
    },
    {
      number: "03",
      title: "Professional Painting",
      description: "Our skilled painters apply high-quality paints using proven techniques for even, seamless, and long-lasting coat coverage.",
      icon: "Paintbrush",
    },
    {
      number: "04",
      title: "Final Inspection",
      description: "Once the painting is complete, we walk through the project with you to ensure every line is sharp and every corner meets perfection.",
      icon: "CheckCircle",
    },
  ],
  testimonials: [
    {
      id: "1",
      quote: "We’ve hired Colorix for multiple rental properties, and they always deliver consistent, high-quality work. They’re reliable, on time, and leave every unit looking fresh.",
      name: "David Thompson",
      role: "Property Manager",
      location: "South Kensington",
      rating: 5,
      avatarInitial: "DT",
      projectType: "Multi-Property Portfolio",
    },
    {
      id: "2",
      quote: "Colorix completely refreshed our living room and kitchen, and the difference is incredible. The painters were polite, careful, and very detail-oriented. The walls look brand new!",
      name: "Emma Richardson",
      role: "Homeowner",
      location: "Fulham, London",
      rating: 5,
      avatarInitial: "ER",
      projectType: "Full Interior Repaint",
    },
    {
      id: "3",
      quote: "Our retail shop needed a full repaint, and Colorix handled everything professionally. They worked around our schedule and completed the project with minimal disruption to our shoppers.",
      name: "Sophia Patel",
      role: "Business Owner",
      location: "King's Road, Chelsea",
      rating: 5,
      avatarInitial: "SP",
      projectType: "Boutique Commercial",
    },
  ],
  benefits: [
    {
      number: "01",
      title: "Professional Finishes",
      description: "Our experienced painters focus on clean lines, smooth coverage, and attention to detail, giving your space a polished look that elevates every room.",
    },
    {
      number: "02",
      title: "Increased Property Value",
      description: "Fresh, professionally applied paint improves curb appeal and interior aesthetics, making your home or business significantly more attractive and valuable.",
    },
    {
      number: "03",
      title: "Long-Lasting Protection",
      description: "We use premium paints and proper preparation techniques to protect surfaces from moisture, wear, UV light, and environmental elements.",
    },
    {
      number: "04",
      title: "Hassle-Free Service",
      description: "We protect your furniture and flooring, work neatly with HEPA dust extractors, and leave your space spotlessly clean and ready to enjoy immediately.",
    },
    {
      number: "05",
      title: "Reliable Professionals",
      description: "Our team communicates clearly, respects your property and privacy, and is always ready to answer your questions with friendly support along the way.",
    },
  ],
  colorSwatches: [
    { name: "Kensington Teal", hex: "#19424c", code: "CX-802", mood: "Luxe & Sophisticated", collection: "Heritage Edition" },
    { name: "Mayfair Alabaster", hex: "#f3ede3", code: "CX-104", mood: "Serene & Luminous", collection: "Warm Neutrals" },
    { name: "Chelsea Terracotta", hex: "#ab5a42", code: "CX-320", mood: "Warm & Earthy", collection: "Artisan Ochre" },
    { name: "Richmond Sage", hex: "#7a8c77", code: "CX-412", mood: "Organic & Calming", collection: "Botanical Grove" },
    { name: "Belgravia Midnight", hex: "#18263a", code: "CX-910", mood: "Dramatic & Regal", collection: "Royal Velvet" },
    { name: "Chiswick Clay", hex: "#c9bba8", code: "CX-215", mood: "Contemporary Neutral", collection: "Modern Stone" },
  ],
};
