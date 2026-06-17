"use client";
import React, { useState, useEffect, useRef } from "react";
import { 
  Shield, 
  Database, 
  HelpCircle, 
  Cpu, 
  Lock, 
  Share2, 
  Cookie, 
  UserCheck, 
  RefreshCw, 
  Check, 
  Mail, 
  ExternalLink 
} from "lucide-react";

interface PrivacySection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content?: string;
  subtitle?: string;
  items?: string[];
}

const privacySections: PrivacySection[] = [
  {
    id: "collect",
    title: "1. What we collect",
    icon: <Database className="w-5 h-5" />,
    subtitle: "When you use the CleanCityAir checker we may handle:",
    items: [
      "Number plates (queried live, never retained)",
      "Anonymous usage statistics",
      "Technical details (IP, browser, device)"
    ]
  },
  {
    id: "use",
    title: "2. Why we use it",
    icon: <Cpu className="w-5 h-5" />,
    subtitle: "The information powers:",
    items: [
      "Running the vehicle compliance check",
      "Improving the platform over time",
      "Reviewing usage patterns to refine the experience",
      "Keeping the service safe and reliable"
    ]
  },
  {
    id: "safe",
    title: "3. Keeping it safe",
    icon: <Lock className="w-5 h-5" />,
    content: "We apply suitable technical and organisational measures to protect your personal data from unauthorised access, modification, disclosure or destruction. Number plates are processed live and never stored on our servers."
  },
  {
    id: "third-party",
    title: "4. Third-party services",
    icon: <Share2 className="w-5 h-5" />,
    content: "The platform calls third-party APIs to gather vehicle information. Those providers maintain their own privacy notices, which we encourage you to read. We don't share your personal data with third parties beyond what's needed to deliver the service."
  },
  {
    id: "cookies",
    title: "5. Cookies & tracking",
    icon: <Cookie className="w-5 h-5" />,
    content: "We use cookies and similar tools to improve your experience and gauge how the site is used. You can adjust cookie preferences in your browser. Switching them off may impact some features."
  },
  {
    id: "rights",
    title: "6. Your rights",
    icon: <UserCheck className="w-5 h-5" />,
    subtitle: "Under UK data protection law you may:",
    items: [
      "Access the personal data we hold about you",
      "Request that incorrect details are corrected",
      "Ask us to delete your data",
      "Object to certain processing",
      "Request a portable copy of your data"
    ]
  },
  {
    id: "changes",
    title: "7. Changes to this notice",
    icon: <RefreshCw className="w-5 h-5" />,
    content: "We may revise this privacy notice from time to time. Updates will appear on this page — please check back to see the latest version."
  },
  {
    id: "contact",
    title: "8. Contact",
    icon: <HelpCircle className="w-5 h-5" />,
    content: "For any questions about this notice or how we handle your data, please get in touch through our website."
  }
];

export default function PrivacyClient() {
  const [activeSection, setActiveSection] = useState(privacySections[0].id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
    });

    privacySections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observerRef.current?.observe(element);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#02182b] to-[#0b3558] text-white py-20 lg:py-24">
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#00b875]/20 text-[#00b875] border border-[#00b875]/30 mb-6 uppercase tracking-wider">
              Privacy Notice
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-white">
              Privacy Notice
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl leading-relaxed mb-6">
              Learn how we protect, handle, and secure your personal data at CleanCityAir.
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Last updated: April 2026
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Navigation (Sticky) */}
          <aside className="lg:col-span-4 sticky top-24 hidden lg:block bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 px-3">
              Sections
            </h3>
            <div className="space-y-1 max-h-[calc(100vh-280px)] overflow-y-auto pr-2 custom-scrollbar">
              {privacySections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-200 text-sm font-bold group ${
                      isActive
                        ? "bg-emerald-50/70 text-emerald-800 border-l-4 border-emerald-500"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className={`transition-transform duration-200 ${isActive ? "scale-110 text-emerald-600" : "text-slate-400 group-hover:text-slate-600"}`}>
                      {section.icon}
                    </span>
                    <span className="truncate">{section.title.replace(/^\d+\.\s*/, "")}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Privacy Content Panel */}
          <main className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100">
              
              {/* Introduction Box */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 mb-8 flex gap-4 items-start">
                <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-sm text-slate-600 leading-relaxed font-medium">
                  We are committed to protecting your privacy. Number plates processed through the compliance checker are processed live and never stored on our servers.
                </div>
              </div>

              {/* Sections list */}
              <div className="divide-y divide-slate-100 space-y-10">
                {privacySections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="pt-10 scroll-mt-24 first:pt-0"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                        {section.icon}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        {section.title}
                      </h2>
                    </div>

                    <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base font-medium">
                      {section.content && <p>{section.content}</p>}
                      
                      {section.subtitle && <p className="font-semibold text-slate-800">{section.subtitle}</p>}
                      
                      {section.items && (
                        <ul className="space-y-2.5 mt-2">
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-3">
                              <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3 h-3" />
                              </span>
                              <span className="text-slate-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </section>
                ))}
              </div>

            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
