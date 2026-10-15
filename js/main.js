/**
 * ARYAN HERITAGE SCHOOL - Main Interactive Logic
 * Handles navigation, modals, gallery filtering, lightbox, form validation, and map config.
 */

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  applySchoolConfig();
  initNavbar();
  initHeroRotator();
  initNoticeBoard();
  initScrollSpy();
  initModals();
  initAcademicsModal();
  initGallery();
  initAdminShowcaseModal();
  initEnquiryForm();
  initNewsletter();
  initBackToTop();
}

/**
 * Sync values from config.js to the DOM elements
 */
function applySchoolConfig() {
  if (typeof SCHOOL_CONFIG === "undefined") return;

  // Update map iframe src and buttons
  const mapIframe = document.getElementById("mapEmbedIframe");
  if (mapIframe && SCHOOL_CONFIG.location.mapEmbedUrl) {
    mapIframe.src = SCHOOL_CONFIG.location.mapEmbedUrl;
  }

  const getDirectionsBtn = document.getElementById("getDirectionsBtn");
  if (getDirectionsBtn && SCHOOL_CONFIG.location.directionsUrl) {
    getDirectionsBtn.href = SCHOOL_CONFIG.location.directionsUrl;
  }

  const openGoogleMapsLink = document.getElementById("openGoogleMapsLink");
  if (openGoogleMapsLink && SCHOOL_CONFIG.location.googleMapsLink) {
    openGoogleMapsLink.href = SCHOOL_CONFIG.location.googleMapsLink;
  }

  const locationAddressEl = document.getElementById("locationAddressText");
  if (locationAddressEl) {
    locationAddressEl.textContent = SCHOOL_CONFIG.location.fullAddress || SCHOOL_CONFIG.location.addressLine1;
  }

  const locationNoticeEl = document.getElementById("locationDemoNotice");
  if (locationNoticeEl && SCHOOL_CONFIG.location.statusNote) {
    const span = locationNoticeEl.querySelector("span");
    if (span) {
      span.textContent = SCHOOL_CONFIG.location.statusNote;
    } else {
      locationNoticeEl.textContent = SCHOOL_CONFIG.location.statusNote;
    }
    if (!SCHOOL_CONFIG.location.isDemo) {
      locationNoticeEl.className = "official-location-banner";
    }
  }
}

/**
 * Sticky Navbar & Mobile Drawer
 */
function initNavbar() {
  const navbar = document.querySelector(".navbar-wrapper");
  const mobileToggle = document.getElementById("mobileToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileBackdrop = document.getElementById("mobileBackdrop");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  // Sticky header shadow on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  function toggleMobileMenu(open) {
    const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains("active");
    mobileDrawer.classList.toggle("active", isOpen);
    mobileBackdrop.classList.toggle("active", isOpen);
    mobileToggle.classList.toggle("active", isOpen);
    mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  mobileToggle?.addEventListener("click", () => toggleMobileMenu());
  mobileBackdrop?.addEventListener("click", () => toggleMobileMenu(false));

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => toggleMobileMenu(false));
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileDrawer?.classList.contains("active")) {
      toggleMobileMenu(false);
    }
  });
}

/**
 * Scrollspy for active nav link
 */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

/**
 * Generic Modal Logic
 */
function initModals() {
  const modalOverlays = document.querySelectorAll(".modal-overlay");

  modalOverlays.forEach((overlay) => {
    const closeBtn = overlay.querySelector(".modal-close-btn");
    
    // Close on backdrop click
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });

    closeBtn?.addEventListener("click", () => closeModal(overlay));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".modal-overlay.active");
      if (activeModal) closeModal(activeModal);
    }
  });

  // Story Modal Trigger
  const storyBtn = document.getElementById("discoverStoryBtn");
  const storyModal = document.getElementById("storyModal");
  if (storyBtn && storyModal) {
    storyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(storyModal);
    });
  }
}

function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove("active");
  document.body.style.overflow = "";
}

/**
 * Academics Stage Details Modal
 */
function initAcademicsModal() {
  const stageButtons = document.querySelectorAll(".academic-learn-more-btn");
  const stageModal = document.getElementById("stageModal");
  if (!stageModal) return;

  const modalStageBadge = document.getElementById("modalStageBadge");
  const modalStageTitle = document.getElementById("modalStageTitle");
  const modalStageSub = document.getElementById("modalStageSub");
  const modalStageDesc = document.getElementById("modalStageDesc");
  const modalStageHighlights = document.getElementById("modalStageHighlights");
  const modalStageNote = document.getElementById("modalStageNote");

  stageButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const stageId = button.getAttribute("data-stage");
      const stageData = SCHOOL_CONFIG?.academicStages?.find((s) => s.id === stageId);

      if (stageData) {
        if (modalStageBadge) modalStageBadge.textContent = stageData.ageRange;
        if (modalStageTitle) modalStageTitle.textContent = stageData.title;
        if (modalStageSub) modalStageSub.textContent = stageData.subtitle;
        if (modalStageDesc) modalStageDesc.textContent = stageData.description;
        if (modalStageNote) modalStageNote.textContent = stageData.curriculumNote;

        if (modalStageHighlights) {
          modalStageHighlights.innerHTML = "";
          stageData.highlights.forEach((item) => {
            const li = document.createElement("li");
            li.className = "modal-list-item";
            li.innerHTML = `
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>${item}</span>
            `;
            modalStageHighlights.appendChild(li);
          });
        }

        openModal(stageModal);
      }
    });
  });
}

/**
 * Shared Local Storage Helpers for Notices & Gallery
 */
const DEFAULT_SCHOOL_NOTICES = [
  {
    id: "n-1",
    title: "Registration Open for Annual Inter-School Athletic Meet",
    category: "Sports",
    priority: "Urgent",
    date: "14 Oct 2026",
    content: "Students from Grades 4 through 12 are invited to register for track, sprint, football, and athletic field selections with their respective sports masters."
  },
  {
    id: "n-2",
    title: "Term-1 Parent-Educator Interactive Conference Schedule",
    category: "Academic",
    priority: "Normal",
    date: "10 Oct 2026",
    content: "Individual parent appointment schedules have been finalized. Discussion slots will focus on mid-term holistic academic and behavioral evaluations."
  },
  {
    id: "n-3",
    title: "Science & Robotics Innovation Fair — Project Submissions",
    category: "Examination",
    priority: "Normal",
    date: "05 Oct 2026",
    content: "Working prototypes and digital exhibits for the senior campus STEM competition must be registered with the Science Faculty by month-end."
  },
  {
    id: "n-4",
    title: "Admissions Open for Academic Session 2025–26",
    category: "General",
    priority: "Urgent",
    date: "01 Oct 2026",
    content: "Enquiries and registrations for Kindergarten, Primary, Middle, and Senior Secondary admissions are currently active."
  }
];

/**
 * Remove test cards (notice "hello" and custom test gallery upload) from storage
 */
function cleanupTestCards() {
  try {
    const stored = localStorage.getItem("ahs_school_notices");
    if (stored) {
      let notices = JSON.parse(stored);
      // Remove test notice titled "hello"
      notices = notices.filter(n => n.title && n.title.trim().toLowerCase() !== "hello");
      localStorage.setItem("ahs_school_notices", JSON.stringify(notices));
    }
  } catch (e) { }

  try {
    // Clear custom test gallery photos
    localStorage.removeItem("ahs_custom_gallery");
  } catch (e) { }
}

function getStoredSchoolNotices() {
  cleanupTestCards();
  const stored = localStorage.getItem("ahs_school_notices");
  if (stored) {
    try {
      let parsed = JSON.parse(stored);
      parsed = parsed.filter(n => n.title && n.title.trim().toLowerCase() !== "hello");
      return parsed;
    } catch (e) { }
  }
  return DEFAULT_SCHOOL_NOTICES;
}

function saveSchoolNotices(notices) {
  localStorage.setItem("ahs_school_notices", JSON.stringify(notices));
}

function getStoredCustomGallery() {
  const stored = localStorage.getItem("ahs_custom_gallery");
  if (stored) {
    try { return JSON.parse(stored); } catch (e) { }
  }
  return [];
}

function saveCustomGallery(photos) {
  localStorage.setItem("ahs_custom_gallery", JSON.stringify(photos));
}

/**
 * Notice Board Dynamic Rendering
 */
function initNoticeBoard() {
  const grid = document.getElementById("liveNoticesGrid");
  if (!grid) return;

  const notices = getStoredSchoolNotices();
  grid.innerHTML = "";

  notices.forEach((n) => {
    const isCustom = !DEFAULT_SCHOOL_NOTICES.some(d => d.id === n.id);
    const card = document.createElement("div");
    card.className = `notice-card ${n.priority === "Urgent" ? "urgent" : ""}`;
    card.innerHTML = `
      <div>
        <div class="notice-card-header">
          <span class="notice-badge ${n.priority === "Urgent" ? "urgent-badge" : ""}">${n.category}</span>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="notice-date">${n.date}</span>
            ${isCustom ? `<button class="notice-delete-btn" data-delete-id="${n.id}" title="Remove this card" style="background: none; border: 1px solid #fee2e2; color: #dc2626; border-radius: 4px; padding: 2px 6px; font-size: 0.6875rem; font-weight: 700; cursor: pointer;">✕ Delete</button>` : ''}
          </div>
        </div>
        <h4 class="notice-title">${n.title}</h4>
        <p class="notice-snippet">${n.content}</p>
      </div>
      <div>
        <button class="notice-read-btn" data-id="${n.id}">
          <span>Read Circular Details</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    `;
    grid.appendChild(card);
  });

  // Notice Delete Click Handlers
  grid.querySelectorAll(".notice-delete-btn").forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-delete-id");
      let storedNotices = getStoredSchoolNotices();
      storedNotices = storedNotices.filter((item) => item.id !== id);
      saveSchoolNotices(storedNotices);
      initNoticeBoard();
    };
  });

  // Notice Read Modal Click Handlers
  const detailModal = document.getElementById("noticeDetailModal");
  const modalCategory = document.getElementById("noticeModalCategory");
  const modalDate = document.getElementById("noticeModalDate");
  const modalTitle = document.getElementById("noticeModalTitle");
  const modalPriority = document.getElementById("noticeModalPriority");
  const modalBody = document.getElementById("noticeModalBody");

  grid.querySelectorAll(".notice-read-btn").forEach((btn) => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      const notice = notices.find((item) => item.id === id);
      if (notice && detailModal) {
        if (modalCategory) modalCategory.textContent = notice.category;
        if (modalDate) modalDate.textContent = notice.date;
        if (modalTitle) modalTitle.textContent = notice.title;
        if (modalBody) modalBody.textContent = notice.content;
        if (modalPriority) {
          modalPriority.innerHTML = notice.priority === "Urgent"
            ? '<span style="background: #fee2e2; color: #dc2626; padding: 3px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 700;">Urgent Circular</span>'
            : '<span style="color: var(--color-slate-500); font-size: 0.8125rem;">General Circular</span>';
        }
        openModal(detailModal);
      }
    };
  });
}

/**
 * Campus Gallery Filtering, Lightbox & Custom Images
 */
function initGallery() {
  const galleryGrid = document.getElementById("galleryGrid");
  if (!galleryGrid) return;

  // Prepend custom photos added via Admin Portal
  const customPhotos = getStoredCustomGallery();
  galleryGrid.querySelectorAll(".custom-gallery-item").forEach((el) => el.remove());

  customPhotos.forEach((p) => {
    const item = document.createElement("div");
    item.className = "gallery-item custom-gallery-item";
    item.setAttribute("data-category", p.category);
    item.setAttribute("data-title", p.title);
    item.innerHTML = `
      <img src="${p.url}" alt="${p.title}" loading="lazy">
      <button class="gallery-card-remove-btn" data-delete-photo="${p.id}" title="Remove this photo" style="position: absolute; top: 10px; left: 10px; z-index: 5; background: rgba(220, 38, 38, 0.9); color: #fff; border: none; border-radius: 4px; padding: 3px 8px; font-size: 0.6875rem; font-weight: 700; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">✕ Remove</button>
      <div class="gallery-zoom-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </div>
      <div class="gallery-item-overlay">
        <span class="gallery-item-category">${p.category.toUpperCase()} • NEW</span>
        <h4 class="gallery-item-title">${p.title}</h4>
      </div>
    `;

    item.querySelector(".gallery-card-remove-btn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      let photos = getStoredCustomGallery();
      photos = photos.filter(photo => photo.id !== p.id);
      saveCustomGallery(photos);
      initGallery();
    });

    galleryGrid.prepend(item);
  });

  const filterButtons = document.querySelectorAll(".gallery-filter-btn:not(.admin-trigger-btn)");
  const galleryItems = document.querySelectorAll(".gallery-item");

  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  let currentIndex = 0;
  let activeItemsList = Array.from(galleryItems);

  // Category Filtering
  filterButtons.forEach((btn) => {
    btn.onclick = () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      activeItemsList = [];
      galleryItems.forEach((item) => {
        const itemCat = item.getAttribute("data-category");
        if (filterValue === "all" || itemCat === filterValue) {
          item.style.display = "block";
          activeItemsList.push(item);
        } else {
          item.style.display = "none";
        }
      });
    };
  });

  // Lightbox Open
  galleryItems.forEach((item) => {
    item.onclick = () => {
      currentIndex = activeItemsList.indexOf(item);
      if (currentIndex === -1) currentIndex = 0;
      updateLightbox();
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    };
  });

  function updateLightbox() {
    if (activeItemsList.length === 0) return;
    const currentItem = activeItemsList[currentIndex];
    const imgEl = currentItem.querySelector("img");
    const title = currentItem.getAttribute("data-title") || "Campus Gallery";

    lightboxImg.src = imgEl.src;
    lightboxImg.alt = imgEl.alt;
    lightboxTitle.textContent = title;
    lightboxCounter.textContent = `${currentIndex + 1} of ${activeItemsList.length}`;
  }

  function showNext() {
    if (activeItemsList.length === 0) return;
    currentIndex = (currentIndex + 1) % activeItemsList.length;
    updateLightbox();
  }

  function showPrev() {
    if (activeItemsList.length === 0) return;
    currentIndex = (currentIndex - 1 + activeItemsList.length) % activeItemsList.length;
    updateLightbox();
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (closeBtn) closeBtn.onclick = closeLightbox;
  if (nextBtn) nextBtn.onclick = showNext;
  if (prevBtn) prevBtn.onclick = showPrev;

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "Escape") closeLightbox();
  });
}

/**
 * Admin Quick Showcase Modal Handlers
 */
function initAdminShowcaseModal() {
  const adminModal = document.getElementById("adminQuickModal");
  if (!adminModal) return;

  const triggerButtons = document.querySelectorAll(".admin-trigger-btn");
  const tabBtnNotice = document.getElementById("tabBtnNotice");
  const tabBtnGallery = document.getElementById("tabBtnGallery");
  const paneNotice = document.getElementById("adminTabContentNotice");
  const paneGallery = document.getElementById("adminTabContentGallery");

  triggerButtons.forEach((btn) => {
    btn.onclick = (e) => {
      const reqTab = btn.getAttribute("data-admin-tab");
      if (reqTab === "gallery") {
        switchTab("gallery");
      } else {
        switchTab("notice");
      }
      openModal(adminModal);
    };
  });

  function switchTab(tab) {
    if (tab === "gallery") {
      tabBtnGallery?.classList.add("btn-primary");
      tabBtnGallery?.classList.remove("btn-outline");
      tabBtnNotice?.classList.remove("btn-primary");
      tabBtnNotice?.classList.add("btn-outline");
      if (paneGallery) paneGallery.style.display = "block";
      if (paneNotice) paneNotice.style.display = "none";
    } else {
      tabBtnNotice?.classList.add("btn-primary");
      tabBtnNotice?.classList.remove("btn-outline");
      tabBtnGallery?.classList.remove("btn-primary");
      tabBtnGallery?.classList.add("btn-outline");
      if (paneNotice) paneNotice.style.display = "block";
      if (paneGallery) paneGallery.style.display = "none";
    }
  }

  tabBtnNotice?.addEventListener("click", () => switchTab("notice"));
  tabBtnGallery?.addEventListener("click", () => switchTab("gallery"));

  // Quick preset clicks for gallery
  const presetBtns = adminModal.querySelectorAll(".quick-preset-btn");
  const galleryUrlInput = document.getElementById("quickGalleryUrl");
  presetBtns.forEach((btn) => {
    btn.onclick = () => {
      if (galleryUrlInput) {
        galleryUrlInput.value = btn.getAttribute("data-url");
      }
    };
  });

  // Handle Quick Notice Submit
  const quickNoticeForm = document.getElementById("quickNoticeForm");
  quickNoticeForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("quickNoticeTitle").value.trim();
    const category = document.getElementById("quickNoticeCategory").value;
    const priority = document.getElementById("quickNoticePriority").value;
    const content = document.getElementById("quickNoticeContent").value.trim();

    if (!title || !content) return;

    const notices = getStoredSchoolNotices();
    const newNotice = {
      id: "n-" + Date.now(),
      title: title,
      category: category,
      priority: priority,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      content: content
    };

    notices.unshift(newNotice);
    saveSchoolNotices(notices);
    quickNoticeForm.reset();
    initNoticeBoard();
    closeModal(adminModal);

    // Smooth scroll to Notice Board
    const noticeSection = document.getElementById("notices");
    noticeSection?.scrollIntoView({ behavior: "smooth" });
  });

  // Handle Quick Gallery Submit
  const quickGalleryForm = document.getElementById("quickGalleryForm");
  quickGalleryForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("quickGalleryTitle").value.trim();
    const category = document.getElementById("quickGalleryCategory").value;
    let url = galleryUrlInput ? galleryUrlInput.value.trim() : "";

    if (!url) {
      url = "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80";
    }

    const photos = getStoredCustomGallery();
    const newPhoto = {
      id: "p-" + Date.now(),
      title: title,
      category: category,
      url: url
    };

    photos.unshift(newPhoto);
    saveCustomGallery(photos);
    quickGalleryForm.reset();
    initGallery();
    closeModal(adminModal);

    // Smooth scroll to gallery
    const gallerySection = document.getElementById("gallery");
    gallerySection?.scrollIntoView({ behavior: "smooth" });
  });
}

/**
 * Admissions Frontend Enquiry Form Validation & Simulation
 */
function initEnquiryForm() {
  const form = document.getElementById("enquiryForm");
  const successBox = document.getElementById("enquirySuccessBox");
  const resetBtn = document.getElementById("resetEnquiryBtn");
  const submitBtn = document.getElementById("submitEnquiryBtn");

  if (!form) return;

  // Validation rules
  function validateField(input) {
    const errorEl = document.getElementById(`${input.id}-error`);
    let isValid = true;
    let errorMsg = "";

    if (input.required && !input.value.trim()) {
      isValid = false;
      errorMsg = "This field is required.";
    } else if (input.type === "email" && input.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        isValid = false;
        errorMsg = "Please enter a valid email address.";
      }
    } else if (input.type === "tel" && input.value.trim()) {
      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      if (input.value.trim().length < 8) {
        isValid = false;
        errorMsg = "Please enter a valid phone number.";
      }
    }

    if (!isValid) {
      input.classList.add("error");
      if (errorEl) {
        errorEl.textContent = errorMsg;
        errorEl.classList.add("show");
      }
    } else {
      input.classList.remove("error");
      if (errorEl) {
        errorEl.classList.remove("show");
      }
    }

    return isValid;
  }

  // Real-time blur validation
  const inputs = form.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.classList.contains("error")) {
        validateField(input);
      }
    });
  });

  // Handle Form Submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let allValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) {
        allValid = false;
      }
    });

    if (!allValid) {
      const firstError = form.querySelector(".error");
      firstError?.focus();
      return;
    }

    // Simulate async submission
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      Processing Enquiry...
    `;

    setTimeout(() => {
      // Capture and store enquiry record into localStorage for admin demonstration
      try {
        const classSelect = document.getElementById("classApplying");
        const classText = classSelect && classSelect.selectedIndex >= 0 ? classSelect.options[classSelect.selectedIndex].text : "General Enquiry";
        const newEnquiry = {
          id: "enq-" + Date.now(),
          parentName: document.getElementById("parentName")?.value.trim() || "Prospective Parent",
          phone: document.getElementById("phone")?.value.trim() || "-",
          email: document.getElementById("email")?.value.trim() || "-",
          studentName: document.getElementById("studentName")?.value.trim() || "Student",
          classApplying: classText,
          message: document.getElementById("message")?.value.trim() || "Interested in admissions.",
          date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
          status: "New Lead"
        };
        const currentEnquiries = JSON.parse(localStorage.getItem("ahs_admissions_enquiries") || "[]");
        currentEnquiries.unshift(newEnquiry);
        localStorage.setItem("ahs_admissions_enquiries", JSON.stringify(currentEnquiries));
      } catch (e) {
        console.warn("Storage warning:", e);
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.style.display = "none";
      successBox.classList.add("show");
    }, 1200);
  });

  resetBtn?.addEventListener("click", () => {
    form.reset();
    inputs.forEach((input) => {
      input.classList.remove("error");
      const err = document.getElementById(`${input.id}-error`);
      if (err) err.classList.remove("show");
    });
    successBox.classList.remove("show");
    form.style.display = "block";
  });
}

/**
 * Newsletter simulated subscription
 */
function initNewsletter() {
  const form = document.getElementById("newsletterForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector(".footer-newsletter-input");
    if (!input || !input.value.trim()) return;

    const originalBtn = form.querySelector("button");
    const originalText = originalBtn.textContent;
    originalBtn.textContent = "Subscribed!";
    originalBtn.style.backgroundColor = "var(--color-gold-400)";
    originalBtn.style.color = "var(--color-navy-950)";
    input.value = "";

    setTimeout(() => {
      originalBtn.textContent = originalText;
      originalBtn.style.backgroundColor = "";
      originalBtn.style.color = "";
    }, 3000);
  });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/**
 * 4 Dynamic Divs Auto-Changing Showcase in Hero Section
/**
 * CAMPUS SPOTLIGHT - 4 CORE PILLARS CONTINUOUS RUNNER MARQUEE
 * Smoothly runs the 4 core pillars horizontally one by one in an infinite loop,
 * with pause-on-hover, pause/resume button control, and interactive smooth scrolling.
 */
function initHeroRotator() {
  const container = document.getElementById("heroPillarsRotator");
  const track = document.getElementById("heroPillarsTrack");
  const cycleIndicator = document.getElementById("pillarsCycleIndicator");
  const pauseBtn = document.getElementById("pillarsPauseBtn");
  const pauseIcon = document.getElementById("pillarsPauseIcon");
  const pillarCards = document.querySelectorAll(".hero-pillar-item");

  if (!container || !track) return;

  let isPaused = false;

  function updatePauseState(paused) {
    isPaused = paused;
    track.classList.toggle("is-paused", isPaused);

    if (isPaused) {
      if (pauseIcon) {
        pauseIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
      }
      pauseBtn?.setAttribute("title", "Resume Marquee");
      pauseBtn?.classList.add("manually-paused");
      if (pauseBtn) pauseBtn.style.color = "var(--color-gold-300)";
      if (cycleIndicator) {
        cycleIndicator.textContent = "Marquee Paused • Click to Resume";
      }
    } else {
      if (pauseIcon) {
        pauseIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
      }
      pauseBtn?.setAttribute("title", "Pause Marquee");
      pauseBtn?.classList.remove("manually-paused");
      if (pauseBtn) pauseBtn.style.color = "";
      if (cycleIndicator) {
        cycleIndicator.textContent = "Running Continuously • Hover to Pause";
      }
    }
  }

  // Toggle button
  pauseBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    updatePauseState(!isPaused);
  });

  // Pause on hover indicator update
  container.addEventListener("mouseenter", () => {
    if (!isPaused && cycleIndicator) {
      cycleIndicator.textContent = "Paused on Hover";
    }
  });

  container.addEventListener("mouseleave", () => {
    if (!isPaused && cycleIndicator) {
      cycleIndicator.textContent = "Running Continuously • Hover to Pause";
    }
  });

  // Clicking any pillar card scrolls smoothly to that pillar's section
  pillarCards.forEach((card) => {
    card.addEventListener("click", () => {
      const targetSelector = card.getAttribute("data-target");
      if (!targetSelector) return;
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    // Keyboard support (Enter/Space)
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });
}


