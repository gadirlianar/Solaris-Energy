export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Solution", href: "#solutions" },
  { label: "Projects", href: "#projects" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const HERO_CONTENT = {
  trustedBadge: {
    highlight: "Trusted",
    text: "by 500+ Homeowners",
  },
  titleLine1: "Solar energy that moves",
  titleLine2: "the world forward",
  subtitle:
    "Powering homes and businesses with clean, renewable solar solutions. Reduce your carbon footprint and energy costs today.",
  ctaText: "Get Consultation",
};

export const ABOUT_CONTENT = {
  eyebrow: "About",
  titleLine1: "Smart Solar Solutions",
  titleLine2: "for Modern Homes",
  paragraph:
    "We design and install high-performance solar systems that help homeowners reduce electricity bills and transition to clean energy.",
  buttonText: "Explore Solar Solutions",
  slides: [
    {
      id: 1,
      image: "/images/about-slide-1.jpg",
      date: "10/04/2026",
      title: "Residential Solar Installation",
      caption:
        "Installing efficient rooftop solar panels to power homes with clean renewable energy solutions daily.",
    },
    {
      id: 2,
      image: "/images/about-slider-2.jpg",
      date: "12/04/2026",
      title: "Commercial Solar Array",
      caption:
        "High-output commercial rooftop solar systems engineered for peak efficiency and industrial sustainability.",
    },
    {
      id: 3,
      image: "/images/about-slider-3.jpg",
      date: "15/04/2026",
      title: "Smart Inverter & Battery Storage",
      caption:
        "Intelligent home energy storage and hybrid inverters providing seamless backup power and bill optimization.",
    },
    {
      id: 4,
      image: "/images/about-slider-4.jpg",
      date: "18/04/2026",
      title: "Certified Technical Inspection",
      caption:
        "Rigorous quality verification, voltage diagnostics, and safety testing on every panel connection.",
    },
    {
      id: 5,
      image: "/images/about-slider-5.jpg",
      date: "22/04/2026",
      title: "Sustainable Architecture Integration",
      caption:
        "Aesthetic solar roofing seamlessly integrated with contemporary architectural design and modern landscapes.",
    },
  ],
  stats: [
    {
      targetNumber: 10,
      suffix: "+",
      startText: "0+",
      label: "Solar Industry Experience",
      description:
        "Delivering reliable solar energy solutions with years of expertise in residential and commercial installations.",
      icon: "shield-check",
    },
    {
      targetNumber: 500,
      suffix: "+",
      startText: "0+",
      label: "Solar Projects Installed",
      description:
        "Successfully installed solar systems powering homes and businesses with clean renewable energy solutions worldwide.",
      icon: "wrench",
    },
    {
      targetNumber: 25,
      suffix: " Years",
      startText: "0Years",
      label: "Panel Performance Warranty",
      description:
        "High-quality solar panels designed to deliver long-term performance and sustainable energy production.",
      icon: "circle-check",
    },
  ],
};

export const SOLUTIONS_CONTENT = {
  eyebrow: "Our Solar Solutions",
  titleLine1: "Smart Solar Solutions Designed for",
  titleLine2: "Homes and Businesses",
  subtitle: "Smart solar solutions designed to power homes and businesses efficiently.",
  cards: [
    {
      id: "home-install",
      icon: "sun",
      title: "Home Solar Installation",
      description: "Custom rooftop solar systems designed for maximum energy production.",
      illustrationType: "home-install",
    },
    {
      id: "cost-savings",
      icon: "banknote",
      title: "Cost Savings",
      description: "Enjoy up to 70% savings on energy bills with solar panels and smart storage.",
      illustrationType: "cost-savings",
    },
    {
      id: "smart-monitoring",
      icon: "presentation",
      title: "Smart Monitoring",
      description: "Smart monitoring and AI optimization keep your system performing 24/7.",
      illustrationType: "smart-monitoring",
    },
    {
      id: "quick-install",
      icon: "wrench",
      title: "Quick Installation",
      description: "Professional installation completed by certified technicians.",
      illustrationType: "quick-install",
    },
    {
      id: "sustainability",
      icon: "leaf",
      title: "Sustainability",
      description: "Clean renewable energy for a cleaner greener and sustainable future.",
      illustrationType: "sustainability",
    },
    {
      id: "energy-efficiency",
      icon: "gauge",
      title: "Energy Efficiency",
      description: "Optimize your home energy consumption with smart solar systems.",
      illustrationType: "energy-efficiency",
    },
  ],
};

export const HOW_IT_WORKS_CONTENT = {
  eyebrow: "How It Works",
  titleLine1: "From Consultation to Clean",
  titleLine2: "Energy in 4 Simple Steps",
  subtitle:
    "We make switching to solar energy simple. Our streamlined process ensures you get best solar solution quickly.",
  steps: [
    {
      number: "01",
      title: "Home Assessment",
      items: [
        "Virtual or in-person site evaluation",
        "Customized solar system design",
        "Detailed energy savings analysis",
      ],
    },
    {
      number: "02",
      title: "Personalized Quote",
      items: [
        "System specifications and pricing",
        "Flexible financing options explained",
        "Permits and documentation handled",
      ],
    },
    {
      number: "03",
      title: "Expert Installation",
      items: [
        "Certified solar technicians",
        "Quick and safe installation",
        "Quality inspection included",
      ],
    },
    {
      number: "04",
      title: "System Activation",
      items: [
        "Utility connection and testing",
        "Monitoring system setup",
        "Start generating clean solar energy",
      ],
    },
  ],
};

export const PROJECTS_CONTENT = {
  eyebrow: "Solar Projects",
  title: "Recent Solar Installations",
  subtitle: "See our latest residential and commercial solar projects.",
  projects: [
    {
      id: "residential-rooftop",
      title: "Residential Rooftop Solar",
      description:
        "10kW rooftop solar system installed for a modern family home to reduce electricity bills and generate clean renewable energy.",
      image: "/images/project-1.jpg",
      isWide: false,
    },
    {
      id: "commercial-solar",
      title: "Commercial Solar Installation",
      description:
        "40kW solar system installed on a commercial facility to power daily operations and significantly reduce energy costs.",
      image: "/images/project-2.jpg",
      isWide: true,
    },
    {
      id: "home-panel-setup",
      title: "Home Solar Panel Setup",
      description:
        "High-efficiency rooftop solar panels installed with smart inverter technology for optimized energy production.",
      image: "/images/project-3.jpg",
      isWide: true,
    },
    {
      id: "system-inspection",
      title: "Solar System Inspection",
      description:
        "Routine inspection and maintenance to ensure maximum solar panel performance and long-term energy savings.",
      image: "/images/project-4.jpg",
      isWide: false,
    },
  ],
};

export const BENEFITS_CONTENT = {
  eyebrow: "Solar Benefits",
  titleLine1: "Why Solar Energy is a Smart",
  titleLine2: "Long-Term Investment",
  subtitle: "We're here to help and answer any questions you may have.",
  image: "/images/benefits-woman-hd.jpg",
  items: [
    {
      id: "bills",
      icon: "gauge",
      title: "Lower Electricity Bills",
      description: "Generate solar power and reduce monthly electricity costs.",
    },
    {
      id: "independence",
      icon: "shield-check",
      title: "Energy Independence",
      description:
        "Produce your own clean power and rely less on the grid and rising utility rates.",
    },
    {
      id: "property",
      icon: "trending-up",
      title: "Increase Property Value",
      description:
        "Homes with solar systems are more attractive to buyers and often sell at a premium.",
    },
    {
      id: "eco",
      icon: "leaf",
      title: "Eco Impact",
      description:
        "Cut your carbon footprint with clean, renewable energy every day.",
    },
    {
      id: "incentives",
      icon: "circle-check",
      title: "Government Incentives",
      description:
        "Take advantage of tax credits, rebates and financing programs that lower upfront costs.",
    },
    {
      id: "long-term",
      icon: "wrench",
      title: "Long-Term Energy Savings",
      description:
        "Lock in predictable energy costs and save for decades with a durable system.",
    },
  ],
};

export const TESTIMONIALS_CONTENT = {
  eyebrow: "Testimonials",
  titleLine1: "Trusted Solar Solutions for",
  titleLine2: "Sustainable Living",
  subtitle: "We're here to help and answer any questions you may have.",
  testimonials: [
    {
      id: 1,
      name: "Madina Xanayeva",
      quote:
        "Great experience from consultation to installation. The team was knowledgeable and very efficient.",
      image: "/images/testimonial-1.jpg",
      stars: 5,
    },
    {
      id: 2,
      name: "James Walker",
      quote:
        "Reliable solar installation with clear guidance and outstanding customer service from start to finish.",
      image: "/images/testimonial-2.jpg",
      stars: 5,
    },
    {
      id: 3,
      name: "Anar Gadirli",
      quote:
        "Switching to solar with this team was seamless. Our electricity bills dropped significantly within the first month.",
      image: "/images/testimonial-3.jpg",
      stars: 5,
    },
    {
      id: 4,
      name: "Michael Brooks",
      quote:
        "Professional installation and excellent support throughout the entire process. Highly recommend their solar solutions.",
      image: "/images/testimonial-4.jpg",
      stars: 5,
    },
    {
      id: 5,
      name: "Emily Parker",
      quote:
        "The solar system works perfectly and the monitoring tools help track our energy production daily.",
      image: "/images/testimonial-5.jpg",
      stars: 5,
    },
  ],
};

export const FAQ_CONTENT = {
  eyebrow: "FAQS",
  title: "Your Question Answered",
  subtitle:
    "Have questions about Solaris Energy? Here are some of the most common queries to help you get started.",
  helpCard: {
    title: "Need More Help?",
    text: "Have questions about solar installation, pricing, or maintenance? Our experts are ready to assist.",
    buttonText: "Contact Us",
  },
  faqs: [
    {
      id: 1,
      question: "What solar services do you offer?",
      answer:
        "We provide end-to-end solar solutions: site assessment, custom system design, permitting, professional installation, smart monitoring, and ongoing maintenance for homes and businesses.",
    },
    {
      id: 2,
      question: "How much can I save with solar panels?",
      answer:
        "Most customers cut their electricity bills by 50–70%, depending on system size, roof orientation, local rates and usage. Your consultation includes a detailed savings estimate.",
    },
    {
      id: 3,
      question: "How long does solar installation take?",
      answer:
        "A typical residential installation takes 1–3 days on site. From first consultation to activation, the full process usually takes 4–8 weeks including permits and utility approval.",
    },
    {
      id: 4,
      question: "Do solar panels work during cloudy weather?",
      answer:
        "Yes. Panels still generate electricity on cloudy days at reduced output. Modern high-efficiency panels capture diffuse light, and net metering or storage balances the difference.",
    },
    {
      id: 5,
      question: "How long do solar panels last?",
      answer:
        "Quality solar panels last 25–30+ years and come with a 25-year performance warranty, degrading only slightly each year.",
    },
    {
      id: 6,
      question: "Do you offer system maintenance and support?",
      answer:
        "Yes. We offer monitoring, routine inspections, cleaning and prompt repair support so your system keeps performing at its best.",
    },
  ],
};

export const CTA_FOOTER_CONTENT = {
  h2Line1: "Innovative solar energy solutions",
  h2Line2: "for sustainable living",
  subtitle:
    "Powering homes and businesses with clean, renewable solar solutions. Reduce your carbon footprint and energy costs today.",
  ctaButton: "Get a Quote",
  solarFieldImage: "/images/cta-solar-field.jpg",
  brandDescription:
    "Clean renewable energy solutions to help homes and businesses reduce electricity costs.",
  socials: [
    { name: "Twitter", href: "#", icon: "x" },
    { name: "Facebook", href: "#", icon: "facebook" },
    { name: "Instagram", href: "#", icon: "instagram" },
  ],
  quickLinksTitle: "Quick Links:",
  quickLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Solutions", href: "#solutions" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  contactTitle: "Contact Us:",
  contactEmail: "projects@solaris.com",
  contactPhone: "+1 (994) 717-1255",
  contactAddress: "4020 University Dr, Fairfax, VA, USA",
};

export const CONTACT_CONTENT = {
  eyebrow: "Contact us",
  titleLine1: "Let's Talk About",
  titleLine2: "Your Solar Needs",
  subtitle:
    "Contact us for consultations, inquiries, or support — our team is here to guide you every step of the way.",
  location: {
    name: "Solaris Energy HQ",
    address: "4020 University Dr, Fairfax, VA 22030",
    phone: "+1 (994) 717-1255",
    email: "projects@solaris.com",
    rating: "4.9",
    reviewsCount: "54",
    mapUrl: "https://maps.google.com/?q=4020+University+Dr,+Fairfax,+VA+22030",
    embedUrl:
      "https://maps.google.com/maps?q=4020+University+Dr,+Fairfax,+VA+22030&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },
  form: {
    services: [
      "Residential Solar Installation",
      "Commercial Solar Systems",
      "Battery Storage & Backup",
      "System Maintenance & Inspection",
      "Free Energy Audit & Consultation",
    ],
  },
};

