/**
 * ARYAN HERITAGE SCHOOL - Global Website Configuration
 * 
 * IMPORTANT: This file centralizes all configurable school information.
 * When real school details (address, coordinates, phone numbers, affiliations)
 * become available, update them directly in this file without altering HTML structure.
 */

const SCHOOL_CONFIG = {
  // Brand & Identity
  schoolName: "Aryan Heritage School",
  schoolShortName: "AHS",
  motto: "Building Bright Minds. Shaping Tomorrow.",
  tagline: "Where knowledge meets values, curiosity inspires learning, and every child reaches their potential.",

  // Location & Map Configuration (Official Verified Location)
  location: {
    isDemo: false,
    statusNote: "Official Campus Location — Roshanabad, Aneki Hetmapur, Uttarakhand",
    addressLine1: "Roshanabad - Hetampur - Anneki - Aurangabad Rd",
    addressLine2: "Roshanabad, Aneki Hetmapur, Uttarakhand",
    fullAddress: "Roshanabad - Hetampur - Anneki - Aurangabad Rd, Roshanabad, Aneki Hetmapur, Uttarakhand",
    landmark: "Roshanabad - Hetampur - Anneki - Aurangabad Road Corridor",

    // Direct Google Maps Embed URL pointing precisely to Aryan Heritage School, Roshanabad
    mapEmbedUrl: "https://maps.google.com/maps?q=Aryan+Heritage+School,+Roshanabad+-+Hetampur+-+Anneki+-+Aurangabad+Rd,+Roshanabad,+Aneki+Hetmapur,+Uttarakhand&t=&z=16&ie=UTF8&iwloc=&output=embed",

    // Official direct Google Maps URL
    googleMapsLink: "https://maps.google.com/maps?cid=15473775087595393311&q=Aryan+Heritage+School,+Roshanabad+-+Hetampur+-+Anneki+-+Aurangabad+Rd,+Roshanabad,+Aneki+Hetmapur,+Uttarakhand",

    // Direct link for "Get Directions"
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Aryan+Heritage+School,+Roshanabad+-+Hetampur+-+Anneki+-+Aurangabad+Rd,+Roshanabad,+Aneki+Hetmapur,+Uttarakhand",

    visitingHours: "Monday – Saturday: 8:30 AM – 3:30 PM",
    admissionsOfficeHours: "Monday – Friday: 9:00 AM – 4:00 PM (Saturday by appointment)"
  },

  // Contact Information (Placeholders for demo)
  contact: {
    phonePrimary: "+91 (0) 123 456 7890",
    phoneAdmissions: "+91 (0) 987 654 3210",
    emailGeneral: "info@aryanheritageschool.demo",
    emailAdmissions: "admissions@aryanheritageschool.demo"
  },

  // Academics Stages (Fully Configurable)
  academicStages: [
    {
      id: "foundational",
      title: "Foundational Learning",
      subtitle: "Early Years & Kindergarten",
      ageRange: "Ages 3 – 6 Years",
      description: "Play-integrated, inquiry-driven early learning designed to nurture curiosity, sensory development, social bonding, and a lifelong love for exploration.",
      highlights: [
        "Activity-based multisensory learning",
        "Foundational literacy and numeracy",
        "Safe, imaginative play zones",
        "Social and emotional development"
      ],
      curriculumNote: "Curriculum framework customizable upon board affiliation."
    },
    {
      id: "primary",
      title: "Primary Education",
      subtitle: "Grades 1 to 5",
      ageRange: "Ages 6 – 11 Years",
      description: "A balanced, engaging academic foundation emphasizing conceptual clarity, expressive communication, collaborative group tasks, and creative expression.",
      highlights: [
        "Core subject mastery (Languages, Math, EVS)",
        "Integrated science labs and digital literacy",
        "Expressive performing arts and physical education",
        "Guided reading and library immersion"
      ],
      curriculumNote: "Adaptable to CBSE / ICSE / Cambridge frameworks."
    },
    {
      id: "middle",
      title: "Middle School",
      subtitle: "Grades 6 to 8",
      ageRange: "Ages 11 – 14 Years",
      description: "Transitioning students toward critical inquiry, scientific rigor, cross-disciplinary problem solving, and disciplined character formation.",
      highlights: [
        "Specialized subject labs (Physics, Chemistry, Bio)",
        "Coding, STEM projects, and logical reasoning",
        "Debating, public speaking, and community outreach",
        "Competitive sports leagues and wellness programs"
      ],
      curriculumNote: "Subject combinations customizable to school charter."
    },
    {
      id: "secondary",
      title: "Secondary & Senior Secondary",
      subtitle: "Grades 9 to 12",
      ageRange: "Ages 14 – 18 Years",
      description: "Rigorous academic preparation combined with university readiness, career counseling, ethical leadership, and advanced laboratory investigations.",
      highlights: [
        "Flexible academic streams (Science, Commerce, Humanities)",
        "Comprehensive board examination readiness",
        "Career guidance, aptitude testing, and college seminars",
        "Student council leadership and peer mentorship"
      ],
      curriculumNote: "Stream offerings to be finalized per client specifications."
    }
  ],

  // Admissions Settings
  admissions: {
    academicYear: "2026 – 2027",
    statusText: "Admissions Open for Select Grades",
    isDemoForm: true
  }
};

// Export to window for global access
if (typeof window !== "undefined") {
  window.SCHOOL_CONFIG = SCHOOL_CONFIG;
}
