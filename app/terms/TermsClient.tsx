"use client";
import React, { useState, useEffect, useRef } from "react";
import { 
  Scale, 
  FileText, 
  AlertTriangle, 
  HelpCircle, 
  Info, 
  CheckCircle, 
  DollarSign, 
  FileCheck, 
  Shield, 
  Globe, 
  Mail, 
  ExternalLink 
} from "lucide-react";

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string[];
  alert?: {
    type: "warning" | "info";
    text: string;
    link?: { label: string; url: string };
  };
  emailLink?: string;
}

const termsSections: Section[] = [
  {
    id: "agreeing-to-terms",
    title: "Agreeing to these terms",
    icon: <Scale className="w-5 h-5" />,
    content: [
      "By using our Site you confirm that you accept these terms (\"Terms\") and agree to comply with them.",
      "If you don't accept them, please don't use the site.",
      "We recommend keeping a copy of these Terms for your records."
    ]
  },
  {
    id: "other-terms",
    title: "Other applicable terms",
    icon: <FileText className="w-5 h-5" />,
    content: [
      "These Terms should be read alongside our Privacy Notice.",
      "They apply to your order and our supply of services to you (\"Contract\"), to the exclusion of any other terms you may try to introduce or that may be implied by law, custom, practice or previous dealings.",
      "The Contract is the entire agreement between you and us in relation to its subject matter. You acknowledge that you have not relied on any statement, promise, representation, assurance or warranty that isn't expressly written into the Contract."
    ]
  },
  {
    id: "updates",
    title: "Updates to terms & site",
    icon: <FileCheck className="w-5 h-5" />,
    content: [
      "We update these Terms from time to time. Each visit, please re-read them to know which version currently applies. We may update or change the Site at any time without warning.",
      "We can't guarantee that the Site, or its content, will always be available or remain free of disruption. We may suspend, withdraw or restrict any part of the site for business or operational reasons."
    ]
  },
  {
    id: "where-applies",
    title: "Where the site applies",
    icon: <Globe className="w-5 h-5" />,
    content: [
      "The Site is intended for users in England.",
      "The Site is directed at people based in England. We make no representations that the content is suitable for use, or available, in other jurisdictions."
    ]
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    content: [
      "The content on the Site is provided \"as is\" without representation and without warranty of any kind, express or implied — including implied warranties of satisfactory quality, fitness for a particular purpose, compatibility, non-infringement, accuracy and security. It is not advice you should rely on. Get professional or specialist advice before doing or refraining from doing anything based on the Site.",
      "We expressly disclaim all liability for any direct, indirect or consequential loss or damage arising from use of, or inability to use, the site — whether as a direct or indirect result of inaccuracies, defects, viruses, errors, omissions, out-of-date information or otherwise."
    ],
    alert: {
      type: "info",
      text: "Please obtain professional or specialist advice before refraining from or doing anything based on the content of this site."
    }
  },
  {
    id: "linking",
    title: "Linking & third-party sites",
    icon: <ExternalLink className="w-5 h-5" />,
    content: [
      "Where the Site contains links to other websites and resources operated by third parties, those links are provided for your convenience only. They aren't an endorsement of the linked sites or any information you may obtain through them.",
      "We have no control over the content of those external sites. You may link to our Site provided you do so in a way that is fair and lawful and doesn't damage or take advantage of our reputation.",
      "You must not establish a link in any manner that suggests association, approval or endorsement where none exists. You must not link from a website you don't own. The Site must not be framed within any other site, and you may not link to any part other than the home page. We reserve the right to withdraw linking permission without notice."
    ]
  },
  {
    id: "orders",
    title: "Submitting & confirming orders",
    icon: <CheckCircle className="w-5 h-5" />,
    content: [
      "Follow the on-screen prompts to place your order and form a Contract. Orders may only be placed through the route shown on the Site. Each order is your offer to buy the services as described, subject to these Terms.",
      "Our order process gives you a chance to spot and correct mistakes before submitting. Please review your order at every stage — you're responsible for making sure it's complete and accurate.",
      "Once submitted, we'll email an acknowledgement — but please note this isn't yet acceptance.",
      "Acceptance happens when we email confirming acceptance, which is the moment the Contract comes into existence. The Contract relates only to the services confirmed in that email.",
      "If for any reason we can't provide the services we'll let you know by email and won't process the order. If you've already paid, we'll refund the full amount."
    ]
  },
  {
    id: "cancellations",
    title: "Cancellations & refunds",
    icon: <DollarSign className="w-5 h-5" />,
    content: [
      "You may cancel and receive a refund provided you tell us within 3 days of receiving the order confirmation. You can't cancel after we've supplied the services, even if the 3-day window hasn't elapsed. To cancel, email us at the address below with your order details. Cancellation takes effect on the date you send your email — you'll have given notice in time so long as you email before midnight on that day. We'll email back to confirm receipt of your cancellation.",
      "If you cancel, we'll refund the full price you paid through your original payment method. We may deduct from the refund any amount for services already supplied up to the time you gave notice."
    ]
  },
  {
    id: "liability",
    title: "Liability & limits",
    icon: <Info className="w-5 h-5" />,
    content: [
      "We don't exclude or limit liability where it would be unlawful to do so. This includes liability for death or personal injury caused by our negligence (or that of our employees, agents or subcontractors), and for fraud or fraudulent misrepresentation.",
      "We exclude all implied conditions, warranties, representations or other terms that may otherwise apply.",
      "We won't be liable for any loss or damage — whether in contract, tort (including negligence), breach of statutory duty or otherwise, even if foreseeable — arising from or in connection with use of, or inability to use, the site, or use of or reliance on any content.",
      "In particular, we won't be liable for any indirect or consequential loss or damage.",
      "The site is intended for domestic and private use only. You agree not to use it for commercial or business purposes, and we have no liability for any loss of profit, business, business interruption or business opportunity.",
      "If the information you provide is incomplete or incorrect, we expressly disclaim all liability for any direct, indirect or consequential loss or damage — including any charge made under a Charging Scheme imposed by Regulation 4 of the Road User Charging (Charges and Penalty Charges) Regulations 2001/2285 (\"2001 Regulations\"), as amended."
    ]
  },
  {
    id: "caz-charge",
    title: "Clean Air Zone (CAZ) charge",
    icon: <AlertTriangle className="w-5 h-5 text-emerald-500" />,
    content: [
      "This site is not gov.uk and is in no way connected to gov.uk. CleanCityAir lets you pay the Clean Air Zone (CAZ) charge through a streamlined mobile-first journey. A £5.00 service fee is added on top of the charge collected by gov.uk for the equivalent service. We exclude all liability for orders submitted with an incorrect registration plate, incorrect travel dates, orders covering days with no gov.uk charge, or where the vehicle is exempt from any such gov.uk charge. You alone are responsible for providing accurate information and verifying whether a gov.uk charge actually applies.",
      "It has been clearly stated within these Terms and during the order journey that we are not gov.uk and have no affiliation with gov.uk. If you'd prefer not to use this site, you can pay directly via gov.uk at:"
    ],
    alert: {
      type: "warning",
      text: "CleanCityAir is an independent provider. We charge a service fee of £5.00. You can avoid this fee by paying directly on the official GOV.UK portal.",
      link: {
        label: "Pay directly via gov.uk",
        url: "https://www.gov.uk/clean-air-zones"
      }
    }
  },
  {
    id: "personal-data",
    title: "Personal data",
    icon: <Shield className="w-5 h-5" />,
    content: [
      "Your personal data will only be used as set out in our Privacy Notice."
    ]
  },
  {
    id: "governing-law",
    title: "Governing law",
    icon: <Scale className="w-5 h-5" />,
    content: [
      "These terms, their subject matter and their formation are governed by English law. You and we both agree that the courts of England and Wales have exclusive jurisdiction, except that residents of Northern Ireland may also bring proceedings in Northern Ireland, and residents of Scotland in Scotland."
    ]
  },
  {
    id: "contact",
    title: "Contact",
    icon: <Mail className="w-5 h-5" />,
    content: [
      "If you'd like to raise concerns about anything on the site, please email us at the address below."
    ],
    emailLink: "info@vehiclezones.co.uk"
  }
];

export default function TermsClient() {
  const [activeSection, setActiveSection] = useState(termsSections[0].id);
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

    termsSections.forEach((section) => {
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
              Terms of Service
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-white">
              Terms of Service
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl leading-relaxed mb-6">
              By using our platform you agree to be bound by the terms below. Please read these terms carefully.
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
              Table of Contents
            </h3>
            <div className="space-y-1 max-h-[calc(100vh-280px)] overflow-y-auto pr-2 custom-scrollbar">
              {termsSections.map((section) => {
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
                    <span className="truncate">{section.title}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Terms Content Panel */}
          <main className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100">
              
              {/* Introduction Box */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 mb-8 flex gap-4 items-start">
                <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-sm text-slate-600 leading-relaxed font-medium">
                  Please read these Terms carefully before using the Site. These terms apply to your order and our supply of services to you, to the exclusion of any other terms you may try to introduce.
                </div>
              </div>

              {/* Sections list */}
              <div className="divide-y divide-slate-100 space-y-10">
                {termsSections.map((section, idx) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className={`pt-10 scroll-mt-24 first:pt-0`}
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
                      {section.content.map((paragraph, pIdx) => (
                        <p key={pIdx}>
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Check if section has custom alerts or links */}
                    {section.alert && (
                      <div className="mt-5 p-5 rounded-2xl bg-amber-50/50 border border-amber-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex gap-3 items-start">
                          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <p className="text-sm text-amber-900 font-semibold leading-relaxed">
                            {section.alert.text}
                          </p>
                        </div>
                        {section.alert.link && (
                          <a
                            href={section.alert.link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-amber-900 text-xs font-bold border border-amber-200 shadow-sm transition shrink-0 self-start sm:self-center"
                          >
                            {section.alert.link.label}
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    )}

                    {/* Check if contact section */}
                    {section.emailLink && (
                      <div className="mt-6">
                        <a
                          href={`mailto:${section.emailLink}`}
                          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-[#02182b] hover:bg-[#0b3558] text-white font-bold text-sm shadow-md transition duration-300"
                        >
                          <Mail className="w-4 h-4" />
                          Email {section.emailLink}
                        </a>
                      </div>
                    )}
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
