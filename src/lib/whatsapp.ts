/**
 * Centralized WhatsApp Configuration
 * 
 * Update the WHATSAPP_NUMBER below to change the WhatsApp business number
 * across the entire website. All booking buttons, floating widgets, and
 * contact links will automatically use this number.
 */

/** WhatsApp number in international format without '+' (e.g. "918778639989") */
export const WHATSAPP_NUMBER =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_WHATSAPP_NUMBER)
    ? String(import.meta.env.VITE_WHATSAPP_NUMBER).replace(/[^0-9]/g, "")
    : "918778639989";

/** Formatted display version of the WhatsApp number */
export const WHATSAPP_DISPLAY =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_WHATSAPP_DISPLAY)
    ? String(import.meta.env.VITE_WHATSAPP_DISPLAY)
    : "+91 8778639989";

/**
 * Generates a WhatsApp chat URL with an optional pre-filled message.
 * @param message - Optional pre-filled message text
 * @returns Full WhatsApp URL
 */
export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export interface ApplicationFormData {
  serviceCategory: string;
  courseProgram: string;
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  requireAccommodation: string;
  accommodationPreference?: string;
  checkInDate?: string;
  checkOutDate?: string;
  numberOfNights?: string;
  // Retreat fields
  practisedYoga?: string;
  howLongPracticing?: string;
  yogaStyle?: string;
  healthConditions?: string;
  healthDetails?: string;
  dietaryRequirement?: string;
  dietaryOther?: string;
  dietaryDetails?: string;
  expectations?: string;
  specialArrangements?: string;
  // Certification fields
  certPreviousExperience?: string;
  certExperienceDescription?: string;
  certPreviousInstitute?: string;
  certTechniques?: string;
  certYearsOfPractice?: string;
  certGoals?: string;
  certLearnDevelop?: string;
  certProfessionalUse?: string;
  certHealthConditions?: string;
  certHealthDetails?: string;
  certMedication?: string;
  certMedicationDetails?: string;
  certAdditionalInfo?: string;
  // Common
  hearAboutUs?: string;
  hearAboutUsOther?: string;
}

/**
 * Builds a neatly formatted WhatsApp message containing all submitted application details.
 */
export function buildApplicationWhatsAppMessage(data: ApplicationFormData): string {
  const isCert = data.serviceCategory === "Certification Courses";
  const lines: string[] = [];

  lines.push(`🌿 *NEW APPLICATION SUBMISSION*`);
  lines.push(`*Dr. Vikram Yoga & Wellness Centre*`);
  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(``);

  lines.push(`📋 *PROGRAM SELECTION*`);
  lines.push(`• *Category:* ${data.serviceCategory}`);
  lines.push(`• *Course / Program:* ${data.courseProgram}`);
  lines.push(``);

  lines.push(`👤 *PERSONAL INFORMATION*`);
  lines.push(`• *Name:* ${data.firstName.trim()} ${data.surname.trim()}`);
  lines.push(`• *Email:* ${data.email.trim()}`);
  lines.push(`• *Phone / WhatsApp:* ${data.phone.trim()}`);
  lines.push(`• *Age:* ${data.age.trim()}`);
  lines.push(`• *Gender:* ${data.gender}`);
  lines.push(``);

  lines.push(`🏡 *ACCOMMODATION*`);
  lines.push(`• *Require Accommodation:* ${data.requireAccommodation}`);
  if (data.requireAccommodation === "Yes") {
    if (data.accommodationPreference) lines.push(`• *Preference:* ${data.accommodationPreference}`);
    if (data.checkInDate) lines.push(`• *Check-in Date:* ${data.checkInDate}`);
    if (data.checkOutDate) lines.push(`• *Check-out Date:* ${data.checkOutDate}`);
    if (data.numberOfNights) lines.push(`• *Number of Nights:* ${data.numberOfNights}`);
  }
  lines.push(``);

  if (isCert) {
    lines.push(`🎓 *COURSE & TRAINING EXPERIENCE*`);
    lines.push(`• *Previous Experience:* ${data.certPreviousExperience || "N/A"}`);
    if (data.certExperienceDescription) lines.push(`• *Experience Details:* ${data.certExperienceDescription}`);
    if (data.certPreviousInstitute) lines.push(`• *Institute:* ${data.certPreviousInstitute}`);
    if (data.certTechniques) lines.push(`• *Techniques Practised:* ${data.certTechniques}`);
    if (data.certYearsOfPractice) lines.push(`• *Years of Practice:* ${data.certYearsOfPractice}`);
    lines.push(``);

    lines.push(`🎯 *GOALS & INTENTIONS*`);
    if (data.certGoals) lines.push(`• *Primary Goals:* ${data.certGoals}`);
    if (data.certLearnDevelop) lines.push(`• *Skills to Develop:* ${data.certLearnDevelop}`);
    if (data.certProfessionalUse) lines.push(`• *Intended Use:* ${data.certProfessionalUse}`);
    lines.push(``);

    lines.push(`🩺 *HEALTH INFORMATION*`);
    lines.push(`• *Physical Conditions / Limitations:* ${data.certHealthConditions || "No"}`);
    if (data.certHealthDetails) lines.push(`• *Health Details:* ${data.certHealthDetails}`);
    lines.push(`• *Prescription Medication:* ${data.certMedication || "No"}`);
    if (data.certMedicationDetails) lines.push(`• *Medication Details:* ${data.certMedicationDetails}`);
    if (data.certAdditionalInfo) lines.push(`• *Additional Info:* ${data.certAdditionalInfo}`);
  } else {
    lines.push(`🧘 *YOGA & WELLNESS EXPERIENCE*`);
    lines.push(`• *Practised Yoga Before:* ${data.practisedYoga || "N/A"}`);
    if (data.howLongPracticing) lines.push(`• *Duration of Practice:* ${data.howLongPracticing}`);
    if (data.yogaStyle) lines.push(`• *Yoga Style:* ${data.yogaStyle}`);
    lines.push(``);

    lines.push(`🩺 *HEALTH & DIETARY INFORMATION*`);
    lines.push(`• *Health Conditions / Ailments:* ${data.healthConditions || "No"}`);
    if (data.healthDetails) lines.push(`• *Health Details:* ${data.healthDetails}`);
    const diet = data.dietaryRequirement === "Other" && data.dietaryOther
      ? `Other (${data.dietaryOther})`
      : data.dietaryRequirement || "None";
    lines.push(`• *Dietary Requirement:* ${diet}`);
    if (data.dietaryDetails) lines.push(`• *Dietary Details:* ${data.dietaryDetails}`);
    lines.push(``);

    lines.push(`✨ *EXPECTATIONS & ARRANGEMENTS*`);
    if (data.expectations) lines.push(`• *Expectations:* ${data.expectations}`);
    if (data.specialArrangements) lines.push(`• *Special Arrangements:* ${data.specialArrangements}`);
  }
  lines.push(``);

  if (data.hearAboutUs) {
    const hear = data.hearAboutUs === "Other" && data.hearAboutUsOther
      ? `Other (${data.hearAboutUsOther})`
      : data.hearAboutUs;
    lines.push(`📢 *HEARD ABOUT US:* ${hear}`);
    lines.push(``);
  }

  lines.push(`✅ *Declaration:* Agreed to terms & conditions`);
  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`_Submitted via Dr. Vikram Yoga & Wellness Centre Website_`);

  return lines.join("\n");
}

/**
 * Returns a full WhatsApp URL pre-filled with the complete application details.
 */
export function getWhatsAppApplicationUrl(data: ApplicationFormData): string {
  const message = buildApplicationWhatsAppMessage(data);
  return getWhatsAppUrl(message);
}

/**
 * Generates a WhatsApp booking URL with a pre-filled message for a specific service.
 * @param serviceName - The name of the service or course being booked
 * @param category - Optional category (e.g. "Yoga Classes", "Wellness Therapies")
 * @returns Full WhatsApp URL with booking message
 */
export function getWhatsAppBookingUrl(serviceName: string, category?: string): string {
  let message = `Hi, I'd like to book a session`;
  if (category) {
    message += ` for *${category}*`;
  }
  if (serviceName) {
    message += ` — *${serviceName}*`;
  }
  message += `.\n\nPlease share the availability and details. Thank you!`;
  return getWhatsAppUrl(message);
}

/**
 * Generates a WhatsApp inquiry URL with a pre-filled query message.
 * @param topic - The topic of the inquiry
 * @returns Full WhatsApp URL with inquiry message
 */
export function getWhatsAppInquiryUrl(topic: string): string {
  const message = `Hi, I have a question about *${topic}*. Could you please provide more details? Thank you!`;
  return getWhatsAppUrl(message);
}

/**
 * Generates a WhatsApp enrollment URL for certification courses.
 * @param courseName - The name of the certification course
 * @returns Full WhatsApp URL with enrollment message
 */
export function getWhatsAppEnrollUrl(courseName?: string): string {
  let message = `Hi, I'm interested in enrolling for`;
  if (courseName) {
    message += ` the *${courseName}*`;
  } else {
    message += ` a Certification Course`;
  }
  message += `.\n\nPlease share the schedule, fees, and enrollment details. Thank you!`;
  return getWhatsAppUrl(message);
}

/**
 * Generates a WhatsApp retreat booking URL.
 * @param retreatName - The name of the retreat program
 * @returns Full WhatsApp URL with retreat booking message
 */
export function getWhatsAppRetreatUrl(retreatName?: string): string {
  let message = `Hi, I'd like to book`;
  if (retreatName) {
    message += ` the *${retreatName}* retreat`;
  } else {
    message += ` a Retreat Program`;
  }
  message += `.\n\nPlease share the available dates, pricing, and accommodation details. Thank you!`;
  return getWhatsAppUrl(message);
}
