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
 * Automatically rotates and changes all 4 divs through curated school pillar themes,
 * with live progress bar, staggered transition animations, and pause-on-hover.
 */
function initHeroRotator() {
  const container = document.getElementById("heroPillarsRotator");
  const progressFill = document.getElementById("heroPillarsProgressFill");
  const cycleIndicator = document.getElementById("pillarsCycleIndicator");
  const dots = document.querySelectorAll(".pillars-dot");
  const pauseBtn = document.getElementById("pillarsPauseBtn");
  const pauseIcon = document.getElementById("pillarsPauseIcon");
  const pillarSlots = document.querySelectorAll(".hero-pillar-item");

  if (!container || pillarSlots.length === 0) return;

  // 4 Curated Sets of 4 Divs for Aryan Heritage School
  const PILLAR_THEMES = [
    {
      name: "Theme 1 / 4 • Core Foundations",
      items: [
        {
          title: "Academic Excellence",
          desc: "Rigorous conceptual growth",
          iconSvg: `<path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path>`
        },
        {
          title: "Character & Ethics",
          desc: "Lifelong moral grounding",
          iconSvg: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>`
        },
        {
          title: "Modern Campus",
          desc: "Equipped STEM & smart spaces",
          iconSvg: `<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>`
        },
        {
          title: "Holistic Well-being",
          desc: "Nurturing every individuality",
          iconSvg: `<circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>`
        }
      ]
    },
    {
      name: "Theme 2 / 4 • Sports & Creative Arts",
      items: [
        {
          title: "Sports & Athletics",
          desc: "Expansive turfs & team spirit",
          iconSvg: `<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.45 1-1 1H7v2h10v-2h-2c-.55 0-1-.45-1-1v-2.34"></path><path d="M18 4H6v7a6 6 0 0 0 12 0V4z"></path>`
        },
        {
          title: "Creative & Fine Arts",
          desc: "Music, visual arts & theatre",
          iconSvg: `<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>`
        },
        {
          title: "Student Leadership",
          desc: "Public speaking & clubs",
          iconSvg: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>`
        },
        {
          title: "Global Perspective",
          desc: "Multilingual cultural mindset",
          iconSvg: `<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>`
        }
      ]
    },
    {
      name: "Theme 3 / 4 • Innovation & Safety",
      items: [
        {
          title: "Robotics & STEM Labs",
          desc: "Hands-on coding & AI hubs",
          iconSvg: `<rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>`
        },
        {
          title: "Rich Knowledge Media",
          desc: "Curated books & research hub",
          iconSvg: `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>`
        },
        {
          title: "Safe & Caring Campus",
          desc: "24/7 CCTV & dedicated clinic",
          iconSvg: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path>`
        },
        {
          title: "Distinguished Mentors",
          desc: "Passionate student-first faculty",
          iconSvg: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>`
        }
      ]
    },
    {
      name: "Theme 4 / 4 • Experiential & Eco",
      items: [
        {
          title: "Experiential Learning",
          desc: "Field research & experiments",
          iconSvg: `<path d="M10 2v7.31"></path><path d="M14 9.3V2"></path><path d="M8.5 2h7"></path><path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path><path d="M5.52 16h12.96"></path>`
        },
        {
          title: "Green Eco-Campus",
          desc: "Solar powered & botanical grounds",
          iconSvg: `<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>`
        },
        {
          title: "CBSE Aligned Rigor",
          desc: "Structured board excellence",
          iconSvg: `<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>`
        },
        {
          title: "Future-Ready Skills",
          desc: "Critical thinking & tech fluency",
          iconSvg: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>`
        }
      ]
    }
  ];

  const totalThemes = PILLAR_THEMES.length; // 4 Themes
  const cycleDuration = 4200; // 4.2 seconds per theme rotation
  const progressStep = 40; // 40ms interval

  let currentThemeIndex = 0;
  let elapsedTime = 0;
  let isPaused = false;
  let timerId = null;

  // Render Theme with Staggered Transition across the 4 Divs
  function applyTheme(themeIndex, immediate = false) {
    currentThemeIndex = (themeIndex + totalThemes) % totalThemes;
    const theme = PILLAR_THEMES[currentThemeIndex];

    // Update cycle indicator text & dots
    if (cycleIndicator) {
      cycleIndicator.textContent = theme.name;
    }

    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentThemeIndex);
    });

    // Update the 4 Divs with a staggered ripple transition
    pillarSlots.forEach((slot, slotIdx) => {
      const itemData = theme.items[slotIdx];
      if (!itemData) return;

      const titleEl = document.getElementById(`pillarTitle${slotIdx}`);
      const descEl = document.getElementById(`pillarDesc${slotIdx}`);
      const iconEl = document.getElementById(`pillarIcon${slotIdx}`);

      if (immediate) {
        if (titleEl) titleEl.textContent = itemData.title;
        if (descEl) descEl.textContent = itemData.desc;
        if (iconEl) {
          iconEl.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${itemData.iconSvg}</svg>`;
        }
      } else {
        // Stagger animation: Slot 0 -> Slot 1 -> Slot 2 -> Slot 3
        const staggerDelay = slotIdx * 70;
        setTimeout(() => {
          slot.classList.add("slot-transitioning");

          setTimeout(() => {
            if (titleEl) titleEl.textContent = itemData.title;
            if (descEl) descEl.textContent = itemData.desc;
            if (iconEl) {
              iconEl.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${itemData.iconSvg}</svg>`;
            }

            slot.classList.remove("slot-transitioning");
            slot.classList.add("slot-updated");

            setTimeout(() => {
              slot.classList.remove("slot-updated");
            }, 350);
          }, 180);
        }, staggerDelay);
      }
    });

    elapsedTime = 0;
    if (progressFill) progressFill.style.width = "0%";
  }

  // Timer loop
  function tick() {
    if (!isPaused) {
      elapsedTime += progressStep;
      const progressPercent = Math.min((elapsedTime / cycleDuration) * 100, 100);

      if (progressFill) {
        progressFill.style.width = `${progressPercent}%`;
      }

      // Dynamic sub-highlight wave flowing across Div 0 -> 1 -> 2 -> 3
      const quarterTime = cycleDuration / 4;
      const activeSlotIndex = Math.floor(elapsedTime / quarterTime) % 4;
      pillarSlots.forEach((slot, idx) => {
        slot.classList.toggle("active", idx === activeSlotIndex);
      });

      if (elapsedTime >= cycleDuration) {
        applyTheme(currentThemeIndex + 1);
      }
    }
  }

  // Start continuous loop
  timerId = setInterval(tick, progressStep);

  // Pause on hover so the user can easily read the 4 divs
  container.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  container.addEventListener("mouseleave", () => {
    // If not manually paused, resume
    if (!pauseBtn?.classList.contains("manually-paused")) {
      isPaused = false;
    }
  });

  // Manual Pause/Play Button
  pauseBtn?.addEventListener("click", () => {
    const isManuallyPaused = pauseBtn.classList.toggle("manually-paused");
    isPaused = isManuallyPaused;

    if (isManuallyPaused) {
      pauseIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
      pauseBtn.setAttribute("title", "Resume Auto-Rotation");
      pauseBtn.style.color = "var(--color-gold-300)";
    } else {
      pauseIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
      pauseBtn.setAttribute("title", "Pause Auto-Rotation");
      pauseBtn.style.color = "";
    }
  });

  // Indicator dots click to jump to theme
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const cycleIdx = parseInt(dot.getAttribute("data-cycle"), 10);
      if (!isNaN(cycleIdx)) {
        applyTheme(cycleIdx);
      }
    });
  });

  // Clicking any of the 4 divs highlights it
  pillarSlots.forEach((slot, slotIdx) => {
    slot.addEventListener("click", () => {
      pillarSlots.forEach((s) => s.classList.remove("active"));
      slot.classList.add("active");

      // Visual feedback pulse
      slot.style.transform = "scale(1.02)";
      setTimeout(() => {
        slot.style.transform = "";
      }, 250);
    });
  });
}


