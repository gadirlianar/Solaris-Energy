"use client";

import React, { useState } from "react";
import { ExternalLink, ChevronDown, CheckCircle2, Navigation, Compass, Layers } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useTranslation } from "@/context/LanguageContext";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";

function FairfaxMapGraphic({
  location = {
    name: "Solaris Energy HQ",
    address: "4020 University Dr, Fairfax, VA 22030",
    rating: "4.9",
    reviewsCount: "54",
    mapUrl: "https://maps.google.com/?q=4020+University+Dr,+Fairfax,+VA+22030",
  },
}: {
  location?: {
    name: string;
    address: string;
    rating: string;
    reviewsCount: string;
    mapUrl: string;
  };
}) {
  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[520px] bg-[#F1EFE8] overflow-hidden select-none">
      {/* SVG Vector Map of Fairfax VA */}
      <svg
        className="absolute inset-0 w-full h-full object-cover"
        viewBox="0 0 600 500"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E3DC" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Base Land */}
        <rect width="600" height="500" fill="#F4F3F0" />
        <rect width="600" height="500" fill="url(#grid-pattern)" />

        {/* Parks / Green Areas */}
        {/* Van Dyck Park */}
        <path
          d="M 380,40 C 420,45 490,60 520,110 C 500,160 450,170 410,150 C 370,130 360,70 380,40 Z"
          fill="#D4E6D2"
        />
        <text x="440" y="105" fill="#4D7C50" fontSize="10" fontWeight="600" fontFamily="sans-serif">
          Van Dyck Park
        </text>

        {/* Kutner Park */}
        <path
          d="M 50,320 C 110,310 160,340 170,390 C 140,430 80,440 40,400 C 30,360 40,330 50,320 Z"
          fill="#D4E6D2"
        />
        <text x="80" y="375" fill="#4D7C50" fontSize="10" fontWeight="600" fontFamily="sans-serif">
          Kutner Park
        </text>

        {/* Waterway (Accotink Creek tributary) */}
        <path
          d="M 0,220 Q 90,240 180,210 T 360,260 T 540,230 T 600,250"
          fill="none"
          stroke="#B5D0EE"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 0,220 Q 90,240 180,210 T 360,260 T 540,230 T 600,250"
          fill="none"
          stroke="#93BAE5"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Residential Blocks */}
        <rect x="230" y="90" width="80" height="60" rx="4" fill="#EAE7DE" stroke="#DCD7CC" strokeWidth="1" />
        <rect x="120" y="90" width="80" height="60" rx="4" fill="#EAE7DE" stroke="#DCD7CC" strokeWidth="1" />
        <rect x="120" y="170" width="90" height="70" rx="4" fill="#EAE7DE" stroke="#DCD7CC" strokeWidth="1" />
        <rect x="330" y="180" width="100" height="80" rx="4" fill="#EAE7DE" stroke="#DCD7CC" strokeWidth="1" />
        <rect x="230" y="300" width="90" height="90" rx="4" fill="#EAE7DE" stroke="#DCD7CC" strokeWidth="1" />
        <rect x="350" y="290" width="110" height="100" rx="4" fill="#EAE7DE" stroke="#DCD7CC" strokeWidth="1" />
        <rect x="110" y="270" width="90" height="70" rx="4" fill="#EAE7DE" stroke="#DCD7CC" strokeWidth="1" />

        {/* Minor Local Streets (White with subtle border) */}
        <g stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
          <line x1="60" y1="90" x2="560" y2="90" />
          <line x1="80" y1="160" x2="540" y2="160" />
          <line x1="60" y1="380" x2="560" y2="380" />
          <line x1="60" y1="440" x2="560" y2="440" />
          <line x1="110" y1="40" x2="110" y2="470" />
          <line x1="220" y1="40" x2="220" y2="470" />
          <line x1="450" y1="40" x2="450" y2="470" />
          <line x1="530" y1="40" x2="530" y2="470" />
        </g>

        {/* Major Arterial Roads (Warm Gold with Border) */}
        {/* VA-236 / Main St */}
        <line x1="0" y1="270" x2="600" y2="270" stroke="#F6C667" strokeWidth="16" strokeLinecap="square" />
        <line x1="0" y1="270" x2="600" y2="270" stroke="#FDE598" strokeWidth="12" strokeLinecap="square" />

        {/* University Dr */}
        <line x1="320" y1="0" x2="320" y2="500" stroke="#F6C667" strokeWidth="18" strokeLinecap="square" />
        <line x1="320" y1="0" x2="320" y2="500" stroke="#FDE598" strokeWidth="14" strokeLinecap="square" />

        {/* Chain Bridge Rd / VA-123 */}
        <line x1="40" y1="480" x2="490" y2="20" stroke="#F8B155" strokeWidth="18" strokeLinecap="round" />
        <line x1="40" y1="480" x2="490" y2="20" stroke="#FEE180" strokeWidth="14" strokeLinecap="round" />

        {/* Street Names */}
        <text
          x="326"
          y="130"
          fill="#4A4E54"
          fontSize="11"
          fontWeight="600"
          fontFamily="system-ui, sans-serif"
          transform="rotate(90 326 130)"
        >
          University Dr
        </text>

        <text
          x="326"
          y="410"
          fill="#4A4E54"
          fontSize="11"
          fontWeight="600"
          fontFamily="system-ui, sans-serif"
          transform="rotate(90 326 410)"
        >
          University Dr (GMU)
        </text>

        <text
          x="440"
          y="266"
          fill="#4A4E54"
          fontSize="11"
          fontWeight="600"
          fontFamily="system-ui, sans-serif"
        >
          Main St (VA-236)
        </text>

        <text
          x="120"
          y="266"
          fill="#4A4E54"
          fontSize="11"
          fontWeight="600"
          fontFamily="system-ui, sans-serif"
        >
          Main St
        </text>

        <text
          x="200"
          y="325"
          fill="#4A4E54"
          fontSize="11"
          fontWeight="600"
          fontFamily="system-ui, sans-serif"
          transform="rotate(-45 200 325)"
        >
          Chain Bridge Rd (VA-123)
        </text>

        <text x="120" y="85" fill="#71767C" fontSize="9" fontWeight="500" fontFamily="system-ui, sans-serif">
          North St
        </text>
        <text x="120" y="155" fill="#71767C" fontSize="9" fontWeight="500" fontFamily="system-ui, sans-serif">
          Armstrong St
        </text>

        {/* Nearby Points of Interest */}
        {/* Old Town Square */}
        <circle cx="280" cy="245" r="4" fill="#EA4335" />
        <text x="275" y="235" fill="#1A73E8" fontSize="10" fontWeight="600" fontFamily="system-ui, sans-serif" textAnchor="end">
          Old Town Plaza
        </text>

        {/* Fairfax City Library */}
        <circle cx="360" cy="225" r="4" fill="#1A73E8" />
        <text x="372" y="228" fill="#1A73E8" fontSize="10" fontWeight="600" fontFamily="system-ui, sans-serif">
          City Hall & Library
        </text>

        {/* George Mason University Campus hint */}
        <circle cx="320" cy="460" r="5" fill="#0F9D58" />
        <text x="335" y="464" fill="#0F9D58" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif">
          George Mason University
        </text>
      </svg>

      {/* Primary Red Location Pin (Centered on 4020 University Dr) */}
      <div className="absolute top-[52%] left-[53.3%] -translate-x-1/2 -translate-y-full z-20 flex flex-col items-center pointer-events-none">
        {/* Pulsing ring */}
        <div className="absolute -bottom-1 w-6 h-6 rounded-full bg-[#EA4335]/30 animate-ping" />
        <div className="absolute -bottom-0.5 w-3 h-1.5 rounded-full bg-black/25 blur-[1px]" />

        {/* Label Badge */}
        <div className="px-2.5 py-1 rounded-md bg-white shadow-md border border-black/10 text-[11px] font-semibold text-[#111111] mb-1 flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E4F86E] ring-2 ring-[#111111]/20" />
          Solaris Energy HQ
        </div>

        {/* Google Pin Icon */}
        <svg
          className="w-9 h-9 text-[#EA4335] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] transition-transform hover:scale-110"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          <circle cx="12" cy="9" r="2.5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Floating Info Box (Top-Left, Matching Reference Screenshot) */}
      <div className="absolute top-4 left-4 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-black/5 max-w-[270px] pointer-events-auto">
        <div className="flex items-start justify-between gap-2.5">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E4F86E] ring-4 ring-[#E4F86E]/40" />
              <h4 className="font-semibold text-[15px] text-[#111111] leading-tight">
                {location.name}
              </h4>
            </div>
            <p className="text-[12px] text-[#666666] mt-1.5 leading-snug">
              {location.address}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <a
              href={location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-[#F4F4F5] hover:bg-[#E4F86E] transition-colors text-[#111111] shrink-0"
              title="Open in Google Maps"
              aria-label="Open in Google Maps"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-[#111111] hover:bg-[#E4F86E] hover:text-[#111111] transition-colors text-white shrink-0"
              title="Get Directions"
              aria-label="Get Directions"
            >
              <Navigation className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-black/[0.06] flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-1">
            <span className="font-bold text-[#111111]">{location.rating}</span>
            <div className="flex text-amber-400 text-[11px]" aria-label="5 stars">
              ★★★★★
            </div>
            <span className="text-[#888888]">({location.reviewsCount})</span>
          </div>
          <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            Open Now
          </span>
        </div>
      </div>

      {/* Map Controls (Bottom Right - Zoom / Compass) */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1.5 pointer-events-auto">
        <a
          href={location.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-sm shadow-sm border border-black/5 flex items-center justify-center text-[#555555] hover:text-black hover:bg-[#E4F86E] transition-colors"
          title="Layer View"
          aria-label="Layer View"
        >
          <Layers className="w-4 h-4" />
        </a>
        <a
          href={location.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-sm shadow-sm border border-black/5 flex items-center justify-center text-[#555555] hover:text-black hover:bg-[#E4F86E] transition-colors"
          title="Compass"
          aria-label="Compass"
        >
          <Compass className="w-4 h-4" />
        </a>
      </div>

      {/* Bottom Bar: Google Brand & Attribution (Matching Reference) */}
      <div className="absolute bottom-3 left-4 z-20 flex items-center gap-2 pointer-events-none">
        <span className="font-semibold text-[13px] tracking-tight text-[#5F6368] drop-shadow-sm">
          Google
        </span>
      </div>
      <div className="absolute bottom-2 right-14 z-20 hidden sm:flex items-center gap-2 text-[10px] text-[#5F6368] pointer-events-none">
        <span>Map data ©2026 Google</span>
        <span>Terms</span>
      </div>
    </div>
  );
}

export function Contact() {
  const { t, language } = useTranslation();
  const contactData = t.contact;
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate brief network submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    });
    setSubmitted(false);
  };

  return (
    <section id="contact" className="w-full max-w-[1288px] mx-auto px-4 sm:px-6 md:px-9 scroll-mt-24 pt-[50px] pb-[80px] md:pb-[100px]">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-[760px] mx-auto mb-10 md:mb-14">
        <Reveal direction="up" distance={12} duration={400}>
          <Eyebrow>{contactData.eyebrow}</Eyebrow>
        </Reveal>

        <SplitReveal
          as="h2"
          delay={0.1}
          className="text-[34px] sm:text-[42px] md:text-[48px] font-medium leading-[1.12] tracking-[-0.03em] text-[#111111] mt-3.5 mb-4"
        >
          <span>{contactData.titleLine1} {contactData.titleLine2}</span>
        </SplitReveal>

        <Reveal direction="up" delay={0.2} distance={16} duration={500}>
          <p className="text-[16px] sm:text-[17px] leading-[1.55] text-[#555555] max-w-[620px]">
            {contactData.subtitle}
          </p>
        </Reveal>
      </div>

      {/* Main Combined Card: Map on Left + Form on Right */}
      <Reveal direction="up" delay={0.25} distance={24} duration={650}>
        <div className="w-full bg-white rounded-[28px] sm:rounded-[32px] border border-[#E5E7EB] p-4 sm:p-6 lg:p-7 shadow-[0_4px_30px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Map Graphic */}
          <div className="relative w-full h-[380px] sm:h-[440px] lg:h-full min-h-[380px] lg:min-h-[520px] rounded-[20px] sm:rounded-[24px] overflow-hidden border border-[#E5E7EB]">
            <FairfaxMapGraphic location={contactData.location} />
          </div>

          {/* Right Column: Contact Form */}
          <div className="flex flex-col justify-center px-1 sm:px-2 py-2">
            {submitted ? (
              <div className="py-12 sm:py-16 px-4 flex flex-col items-center text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#E4F86E]/25 border border-[#E4F86E] flex items-center justify-center text-[#111111] mb-5">
                  <CheckCircle2 className="w-8 h-8 text-[#111111]" />
                </div>
                <h3 className="text-[22px] sm:text-[24px] font-medium text-[#111111]">
                  {contactData.form.successTitle}
                </h3>
                <p className="text-[15px] text-[#555555] mt-2 max-w-[420px] leading-relaxed">
                  {contactData.form.successText.replace("{name}", formData.name || "")}
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-[#F4F4F5] hover:bg-[#111111] hover:text-white text-[#111111] font-medium text-[14px] transition-all cursor-pointer"
                >
                  {contactData.form.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-4.5">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-[13px] font-medium text-[#222222] mb-1.5">
                    {contactData.form.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={contactData.form.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] border border-[#E9ECEF] text-[#111111] placeholder:text-[#999999] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#E4F86E] focus:border-black/30 focus:bg-white transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="contact-phone" className="block text-[13px] font-medium text-[#222222] mb-1.5">
                    {contactData.form.phoneLabel}
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={contactData.form.phonePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] border border-[#E9ECEF] text-[#111111] placeholder:text-[#999999] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#E4F86E] focus:border-black/30 focus:bg-white transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-[13px] font-medium text-[#222222] mb-1.5">
                    {contactData.form.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={contactData.form.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] border border-[#E9ECEF] text-[#111111] placeholder:text-[#999999] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#E4F86E] focus:border-black/30 focus:bg-white transition-all"
                  />
                </div>

                {/* Solar Solution (Select Dropdown) */}
                <div>
                  <label htmlFor="contact-service" className="block text-[13px] font-medium text-[#222222] mb-1.5">
                    {contactData.form.serviceLabel}
                  </label>
                  <div className="relative">
                    <select
                      id="contact-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 pr-10 rounded-xl bg-[#F8F9FA] border border-[#E9ECEF] text-[#111111] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#E4F86E] focus:border-black/30 focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        {contactData.form.servicePlaceholder}
                      </option>
                      {contactData.form.services.map((srv) => (
                        <option key={srv} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#777777] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-[13px] font-medium text-[#222222] mb-1.5">
                    {language === "az" ? "Əlavə qeydlər" : "Дополнительные пожелания"}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={language === "az" ? "Eviniz, cari elektrik xərciniz və ya suallarınız haqqında yazın..." : "Расскажите о вашем объекте, примерных расходах или вопросах..."}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] border border-[#E9ECEF] text-[#111111] placeholder:text-[#999999] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#E4F86E] focus:border-black/30 focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#111111] text-white font-medium text-[15px] hover:bg-[#222222] hover:shadow-md active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {contactData.form.submitting}
                    </span>
                  ) : (
                    <span>{contactData.form.submitBtn}</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
