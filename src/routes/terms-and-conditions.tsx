import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer, WhatsAppFloat, PageHero, BookNowFloat } from "./about";
import hero from "@/assets/New/ocean-coast-bali.jpg";
import { ShieldAlert, BookOpen, Clock, AlertTriangle, FileText, Scale } from "lucide-react";

export const Route = createFileRoute("/terms-and-conditions")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Dr. Vikram Yoga & Wellness Centre" },
      {
        name: "description",
        content:
          "Terms & Conditions for Dr. Vikram Yoga & Wellness Centre, including course admissions, refunds, liability waivers, and conduct policies.",
      },
    ],
  }),
});

function TermsPage() {
  const sections = [
    {
      icon: BookOpen,
      title: "1. Admission & Course Registration",
      content: [
        "All applications for certification courses, yoga drop-in sessions, wellness retreats, or therapies must be submitted through the official apply forms or direct coordinator bookings.",
        "Applicants must declare all relevant medical history, existing injuries, and physical or mental health conditions during application.",
        "Admission to professional courses is at the discretion of the center and requires confirmation of deposit payment.",
        "Participants must be at least 18 years of age, or have explicit written consent from a parent or legal guardian.",
      ],
    },
    {
      icon: Clock,
      title: "2. Payment & Reservation Deposits",
      content: [
        "To secure a place in any certification course or retreat, a non-refundable reservation deposit must be paid upon application acceptance.",
        "Payments can be made securely via Wise transfer or UPI to the account details listed on the application page.",
        "The remaining balance of the course or retreat fee must be settled on or before the first day of the course/retreat.",
        "Failure to settle fees on time may result in cancellation of registration and forfeiture of the deposit.",
      ],
    },
    {
      icon: AlertTriangle,
      title: "3. Cancellation & Refund Policy",
      content: [
        "All reservation deposits are strictly non-refundable.",
        "If a participant cancels their registration 30 days or more prior to the start of a course or retreat, the paid deposit can be transferred to a future course or retreat within 12 months from the original start date, subject to availability.",
        "No transfers or refunds will be granted for cancellations made less than 30 days before the course or retreat start date.",
        "Once a course, retreat, or therapy session has commenced, no refunds, partial refunds, or fee transfers will be provided under any circumstances, including early departure or illness.",
      ],
    },
    {
      icon: ShieldAlert,
      title: "4. Health & Medical Waiver",
      content: [
        "Yoga classes, therapeutic bodywork, and retreats involve physical exertion and movement. Participants must consult a physician prior to starting if they have any health concerns.",
        "Participants agree that they are practicing at their own risk. Dr. Vikram Yoga & Wellness Centre, its instructors, and staff are not liable for any injuries, pain, or health complications arising during or after sessions.",
        "If a participant experiences discomfort, pain, or dizziness, they must immediately cease the activity and notify the instructor.",
        "Women who are pregnant must disclose their pregnancy and seek specialized medical advice before participating in any sessions.",
      ],
    },
    {
      icon: FileText,
      title: "5. Code of Conduct & Regulations",
      content: [
        "Participants are expected to maintain a respectful, clean, and quiet environment that supports learning and healing.",
        "The use of alcohol, tobacco, recreational drugs, or non-prescribed medications is strictly prohibited on the centre premises.",
        "Participants must respect the scheduled times for classes, therapies, and silent hours. Repeat disturbances may result in expulsion from the course or retreat without refund.",
        "The centre reserves the right to refuse service or terminate a participant's stay if their behavior violates safety, ethics, or the wellbeing of the community.",
      ],
    },
    {
      icon: Scale,
      title: "6. Limitation of Liability",
      content: [
        "Dr. Vikram Yoga & Wellness Centre is not responsible for the loss, theft, or damage of personal belongings on the premises.",
        "The centre is not liable for any external travel disruptions, visa delays, weather disruptions, or force majeure events that prevent a participant from attending.",
        "All study materials, manuals, and online resources provided are the intellectual property of the centre and cannot be copied, distributed, or resold without explicit written permission.",
      ],
    },
  ];

  return (
    <main className="overflow-x-hidden bg-[#fafafa]">
      <Navbar />
      <PageHero
        title="Terms & Conditions"
        subtitle="Please read our terms, conditions, and waivers carefully before registering."
        bg={hero}
      />

      <section className="py-24 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-gray-100/80">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-serif-display text-[0.65rem] tracking-[0.4em] text-emerald-deep uppercase font-bold">
              RULES & DECLARATIONS
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl text-emerald-deep">
              Sanctuary Guidelines
            </h2>
            <div className="w-16 h-[2px] bg-gold/50 mx-auto mt-6" />
            <p className="mt-6 text-slate-500 text-sm leading-relaxed">
              By using our website, submitting an application, or attending classes, wellness
              therapies, and retreats at Dr. Vikram Yoga & Wellness Centre, you acknowledge that you
              have read, understood, and agreed to be bound by these Terms & Conditions.
            </p>
          </div>

          <div className="space-y-12">
            {sections.map((sect, idx) => {
              const Icon = sect.icon;
              return (
                <div
                  key={idx}
                  className="flex gap-6 items-start animate-fade-up border-b border-gray-100 pb-10 last:border-0 last:pb-0"
                >
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-emerald-deep mb-4 font-semibold">
                      {sect.title}
                    </h3>
                    <ul className="space-y-3">
                      {sect.content.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-3 text-slate-600 text-[0.925rem] leading-relaxed"
                        >
                          <span className="text-gold text-[0.8rem] mt-1 shrink-0">☯</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 p-6 bg-slate-50/80 rounded-2xl border border-gray-200/50 flex flex-col sm:flex-row gap-6 items-center justify-between text-center sm:text-left">
            <div>
              <h4 className="font-semibold text-emerald-deep text-[0.95rem]">
                Have questions about our terms or booking policies?
              </h4>
              <p className="text-slate-500 text-xs mt-1">
                Get in touch with us and we will clarify any details.
              </p>
            </div>
            <a
              href="/contact"
              className="px-6 py-2.5 bg-emerald-deep text-white text-xs font-semibold tracking-wider uppercase rounded-full shadow-md hover:bg-opacity-95 transition-all shrink-0"
            >
              Contact Centre
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
      <BookNowFloat />
    </main>
  );
}
