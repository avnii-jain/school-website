# ARYAN HERITAGE SCHOOL — Premium School Website

A modern, responsive, and visually impressive demonstration website created for **Aryan Heritage School**. Designed to showcase premier educational web development capabilities to school leadership and management teams.

---

## 🎨 Visual Identity & Design System

- **Color Palette:**
  - **Primary Navy:** Deep Navy Blue (`#0b1930`, `#0f2347`)
  - **Secondary Royal:** Royal Blue (`#1d4ed8`, `#2563eb`)
  - **Accent Gold:** Warm Heritage Gold (`#d97706`, `#f59e0b`, `#fef3c7`)
  - **Backgrounds:** Clean White (`#ffffff`) with subtle soft-blue sections (`#f6f9fc`, `#f8fafc`)
- **Typography:**
  - Headings: *Playfair Display* & *Cinzel* (Google Fonts)
  - Body & UI: *Plus Jakarta Sans* (Google Fonts)
- **Aesthetic:** Modern, academic, disciplined, and welcoming with balanced whitespace, subtle elevation shadows, and refined micro-interactions.

---

## 📂 Project Structure

```
SCHOOL Website/
├── index.html          # Semantic HTML5 architecture, live notice board & interactive modals
├── admin.html          # Dedicated School Admin Showcase Portal (Notices & Gallery Manager)
├── assets/
│   └── favicon.svg     # Hand-crafted SVG crest emblem (AHS monogram & laurels)
├── css/
│   └── style.css       # Complete vanilla CSS design system & responsive layout
├── js/
│   ├── config.js       # Central configuration file for school details & map settings
│   └── main.js         # Navigation, modals, gallery filtering, lightbox, form logic
└── README.md           # Documentation and client customization guide
```

---

## ✨ Features & Included Sections

1. **Top Notice Bar:** Displays current admissions session status, campus visit hours, and an **Admin Portal** quick access link.
2. **Sticky Responsive Navigation Bar:**
   - Custom SVG crest with "AHS" monogram.
   - School name: *ARYAN HERITAGE SCHOOL*.
   - Navigation links: Home, About Us, Notices, Academics, Facilities, Gallery, Admissions, Contact Us.
   - Quick **“Admin”** trigger button and prominent gold **“Enquire Now”** CTA button.
   - Full mobile menu with smooth hamburger animation and slide-out drawer.
3. **Hero Section with Dynamic Spotlight:**
   - Full-width campus photography with fine dark navy overlay.
   - Small Eyebrow: `WELCOME TO ARYAN HERITAGE SCHOOL`.
   - Main Heading: `Building Bright Minds. Shaping Tomorrow.`.
   - Dual CTAs (*Explore Our School* & *Enquire About Admissions*) and four core quick-pillar badges.
   - Glassmorphic spotlight card auto-cycling 4 showcase slides (Academics, STEM Labs, Values & Ethics, Sports & Arts) with real-time progress bar.
4. **School Notice Board & Circulars Section:**
   - Live notice board connected to `localStorage` displaying active circulars with date, category tags, urgent priority badges, and an interactive "Read Circular" modal.
5. **Welcome & About Our School:**
   - Split layout with interactive floating badge (*Values-Led Education*).
   - Heading: `A Place Where Every Child Matters`.
   - Detailed coverage of Academic Excellence, Character Building, Creativity, Confidence, and Holistic Development.
   - Interactive *“Discover Our Story”* modal outlining core tenets.
6. **Key Highlights (4 Pillars):**
   - Academic Excellence, Experienced Educators, Modern Learning Environment, Holistic Development.
7. **Academics Section:**
   - 4 modular stages: Foundational Learning (Ages 3–6), Primary Education (Grades 1–5), Middle School (Grades 6–8), and Secondary Education (Grades 9–12).
   - Interactive *“View Curriculum Details”* modal showing learning pillars for each stage.
   - Adaptability to CBSE, ICSE, Cambridge, or State boards.
8. **School Facilities (6 Photo Cards):**
   - Smart Classrooms, Science & Computer Laboratories, Library & Reading Zone, Sports & Outdoor Activities, Arts & Creative Learning, and Transport Facilities.
9. **Why Choose Aryan Heritage School:**
   - Split-layout with school-life photo, philosophy quote card, and 5 bespoke educational value cards.
   - *“Plan a School Visit”* CTA button.
10. **Campus Gallery:**
    - Curated school campus photos across diverse categories.
    - Filter pills: *All*, *Campus & Building*, *Classrooms & Labs*, *Sports & Arts*, and *School Events*.
    - Fullscreen Lightbox with Next/Previous navigation, counter, image titles, keyboard arrow navigation, and Escape key close.
11. **Admissions Section & Enquiry Form:**
    - 4-step admission journey cards.
    - Functional frontend enquiry form with real-time field validation (Parent Name, Phone, Email, Student Name, Class Selection, Message).
    - Client-side persistence: submissions are saved to browser `localStorage` and immediately populate the Admin Portal leads table without requiring any backend server.
12. **Dedicated Admin Portal (`admin.html`) & In-Page Quick Modal:**
    - **Publish Notices:** Publish circulars instantly to the live website notice board.
    - **Add Gallery Photos:** Upload local photos or paste image URLs to immediately add new images into the live Campus Gallery.
    - **Admissions Leads Desk:** View, manage, and delete all incoming prospective student enquiries.
    - **One-Click Reset:** Reset sample showcase data anytime.
13. **Google Maps — Campus Location:**
    - Direct embedded Google Map centered on Aryan Heritage School (Roshanabad, Uttarakhand).
    - Location information card, visiting hours, and direct links for *“Get Directions”* and *“Open in Google Maps”*.
14. **Footer:**
    - School crest, tagline, quick links, academic directory, newsletter signup simulation, and back-to-top floating button.

---

## 🛠️ School Details & Location Configuration

All school information is centralized in [`js/config.js`](file:///c:/Users/ASUS/Downloads/SCHOOL%20Website/js/config.js):

```javascript
const SCHOOL_CONFIG = {
  schoolName: "Aryan Heritage School",
  location: {
    isDemo: false,
    statusNote: "Official Campus Location — Roshanabad, Aneki Hetmapur, Uttarakhand",
    addressLine1: "Roshanabad - Hetampur - Anneki - Aurangabad Rd",
    addressLine2: "Roshanabad, Aneki Hetmapur, Uttarakhand",
    fullAddress: "Roshanabad - Hetampur - Anneki - Aurangabad Rd, Roshanabad, Aneki Hetmapur, Uttarakhand",
    mapEmbedUrl: "https://maps.google.com/maps?q=Aryan+Heritage+School,+Roshanabad+-+Hetampur+-+Anneki+-+Aurangabad+Rd,+Roshanabad,+Aneki+Hetmapur,+Uttarakhand&t=&z=16&ie=UTF8&iwloc=&output=embed",
    googleMapsLink: "https://maps.google.com/maps?cid=15473775087595393311",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Aryan+Heritage+School,+Roshanabad+-+Hetampur+-+Anneki+-+Aurangabad+Rd,+Roshanabad,+Aneki+Hetmapur,+Uttarakhand"
  }
};
```

---

## 🚀 Running the Project Locally

No build tools or npm installation required. Simply:
1. Double click [`index.html`](file:///c:/Users/ASUS/Downloads/SCHOOL%20Website/index.html) to open in any web browser, **or**
2. Run any static server:
   ```bash
   python -m http.server 8080
   ```
   and visit `http://localhost:8080`.
