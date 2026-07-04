(function() {
  const D = PORTFOLIO_DATA;

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function setRichText(id, value) {
    const el = document.getElementById(id);
    if (!el || !value) return;
    const blocks = String(value).split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
    if (blocks.length <= 1) {
      el.textContent = value;
      return;
    }
    el.textContent = "";
    blocks.forEach((b, i) => {
      const p = document.createElement("p");
      p.textContent = b;
      if (i > 0) p.style.marginTop = "1em";
      el.appendChild(p);
    });
  }

  function setSrc(id, value) {
    const el = document.getElementById(id);
    if (el) el.src = value;
  }

  setText("logo-name", D.identity.pseudo);
  setText("hero-title-1", D.identity.title1);
  setText("hero-title-2", D.identity.title2);
  setText("hero-tagline", D.identity.tagline);

  setSrc("portrait-img", D.about.portrait);
  setText("about-lead", D.about.lead);
  setRichText("about-p1", D.about.paragraph1);

  const skillsList = document.getElementById("skills-list");
  if (skillsList && D.about.skills) {
    skillsList.innerHTML = "";
    D.about.skills.forEach(s => {
      const span = document.createElement("span");
      span.className = "skill";
      span.textContent = s;
      skillsList.appendChild(span);
    });
  }

  const emailEl = document.getElementById("contact-email");
  if (emailEl) {
    emailEl.href = D.contact.emailLink;
    emailEl.querySelector(".contact-link-value").textContent = D.contact.email;
  }
  const linkedinEl = document.getElementById("contact-linkedin");
  if (linkedinEl) {
    linkedinEl.href = D.contact.linkedinLink;
    linkedinEl.target = "_blank";
    linkedinEl.rel = "noopener noreferrer";
    linkedinEl.querySelector(".contact-link-value").textContent = D.contact.linkedin;
  }
  const githubEl = document.getElementById("contact-github");
  if (githubEl) {
    githubEl.href = D.contact.githubLink;
    githubEl.target = "_blank";
    githubEl.rel = "noopener noreferrer";
    githubEl.querySelector(".contact-link-value").textContent = D.contact.github;
  }

  const cvButton = document.getElementById("cv-button");
  if (cvButton && D.contact.cvFile) {
    cvButton.href = D.contact.cvFile;
    const label = document.getElementById("cv-button-label");
    if (label && D.contact.cvLabel) label.textContent = D.contact.cvLabel;
  }

  const cvViewButton = document.getElementById("cv-button-view");
  if (cvViewButton && D.contact.cvFile) {
    cvViewButton.href = D.contact.cvFile;
    const viewLabel = document.getElementById("cv-button-view-label");
    if (viewLabel && D.contact.cvViewLabel) viewLabel.textContent = D.contact.cvViewLabel;
  }

  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear() + " — " + D.identity.pseudo;

  function buildProjectUrl(id) {
    return `projet.html?id=${encodeURIComponent(id)}`;
  }

  function renderProjects(containerId, projects) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";

    projects.forEach((p, i) => {
      const article = document.createElement("a");
      article.className = "project-card";
      article.href = buildProjectUrl(p.id);
      article.style.setProperty("--delay", (i * 0.08) + "s");

      article.innerHTML = `
        <div class="project-image-wrap">
          <img src="${p.cover}" alt="${p.title}" class="project-image" loading="lazy" ${p.coverFit ? `style="object-fit:${p.coverFit}"` : ""} onerror="this.classList.add('img-missing'); this.removeAttribute('src');">
          <span class="project-image-overlay">LEARN MORE →</span>
        </div>
        <div class="project-info">
          <div class="project-meta">${p.year}</div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-description">${p.shortDescription}</p>
        </div>
      `;
      container.appendChild(article);
    });
  }

  if (document.getElementById("projects-list")) {
    renderProjects("projects-list", D.projects);
  }

  const ctaLatest = document.getElementById("cta-latest-project");
  if (ctaLatest && D.projects && D.projects.length) {
    const latest = D.projects[0];
    ctaLatest.href = buildProjectUrl(latest.id);
    const titleEl = ctaLatest.querySelector(".cta-title");
    if (titleEl) titleEl.textContent = latest.title;
  }

  const detailContainer = document.getElementById("project-detail");
  if (detailContainer) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const backUrl = "projets.html";
    const backLabel = "Projects";
    const project = (D.projects || []).find(p => p.id === id);

    if (!project) {
      detailContainer.innerHTML = `
        <div class="detail-empty">
          <p>Project not found.</p>
          <a href="index.html" class="detail-back">← Back to home</a>
        </div>
      `;
    } else {
      const d = project.details || {};
      function buildMediaHtml(item, projectTitle) {
        const url = typeof item === "string" ? item : item.url;
        if (!url) return "";

        let type = typeof item === "object" && item.type ? item.type : null;

        if (!type) {
          const u = url.toLowerCase();
          if (u.includes("youtube.com") || u.includes("youtu.be")) type = "youtube";
          else if (u.match(/\.(mp4|webm|ogg|mov)(\?|$)/)) type = "video";
          else type = "image";
        }

        if (type === "youtube") {
          let id = "";
          const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/);
          if (m) id = m[1];
          if (!id) return "";
          return `<div class="detail-gallery-video">
            <iframe src="https://www.youtube.com/embed/${id}" title="${projectTitle}"
              frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen loading="lazy"></iframe>
          </div>`;
        }

        if (type === "video") {
          const poster = (typeof item === "object" && item.poster) ? ` poster="${item.poster}"` : "";
          return `<div class="detail-gallery-video">
            <video controls preload="metadata"${poster}>
              <source src="${url}">
              Your browser does not support the video tag.
            </video>
          </div>`;
        }

        return `<img src="${url}" alt="${projectTitle}" class="detail-gallery-img" loading="lazy" onerror="this.classList.add('img-missing'); this.removeAttribute('src');">`;
      }

      const galleryHtml = (d.gallery || []).map(item =>
        buildMediaHtml(item, project.title)
      ).join("");

      const infoRows = [
        ["Year", project.year],
        ["Role", d.role],
        ["Team", d.team],
        ["Publisher", d.publisher],
        ["Duration", d.duration],
        ["Engine", d.engine],
        ["Platform", d.platform]
      ].filter(r => r[1]).map(([label, value]) =>
        `<div class="detail-info-row"><span class="detail-info-label">${label}</span><span class="detail-info-value">${value}</span></div>`
      ).join("");

      const PLATFORM_ICONS = {
        steam: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L1.11 15.6C2.239 20.363 6.612 24 11.979 24 18.617 24 24 18.617 24 11.979 24 5.342 18.617 0 11.979 0M7.54 18.21l-1.473-.608c.264.55.717.994 1.325 1.246 1.365.562 2.929-.088 3.492-1.453.271-.66.269-1.386-.006-2.046s-.79-1.174-1.451-1.445c-.674-.278-1.412-.264-2.045-.007l1.527.63c1.007.419 1.485 1.576 1.066 2.583-.42 1.008-1.577 1.487-2.584 1.067m9.146-9.128c0-1.667-1.353-3.026-3.02-3.026-1.669 0-3.023 1.359-3.023 3.026s1.354 3.025 3.023 3.025 3.02-1.358 3.02-3.025m-5.293-.005c0-1.259 1.019-2.28 2.278-2.28 1.26 0 2.28 1.021 2.28 2.28s-1.02 2.278-2.28 2.278c-1.259 0-2.278-1.019-2.278-2.278"/></svg>',
        itch: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.13 1.34C2.13 1.93.13 4.23 0 4.84v1c0 1.27 1.18 2.38 2.25 2.38a2.5 2.5 0 001.94-1 2.5 2.5 0 001.93 1 2.5 2.5 0 001.94-1 2.5 2.5 0 001.94 1 2.5 2.5 0 001.93-1 2.5 2.5 0 001.94 1 2.5 2.5 0 001.94-1 2.5 2.5 0 001.93 1 2.5 2.5 0 001.94-1 2.5 2.5 0 001.94 1c1.06 0 2.25-1.1 2.25-2.38v-1c-.13-.61-2.13-2.91-3.13-3.5C20.84 1.07 17.69 1 12 1S3.16 1.07 3.13 1.34zM10.5 8.83c-.4.69-1.16 1.33-2.06 1.33a2.45 2.45 0 01-1.95-.95c-.42.6-1.13.95-1.92.95-.18 0-.34-.02-.5-.06-.06.6-.07 1.16-.07 1.4v1.66c0 1.97.05 3.34.18 4.43.13 1.05.35 1.69.7 2.18.74 1.05 2.05 1.41 4.02 1.5.92.04 2.62.06 3.1.06s2.18-.02 3.1-.06c1.97-.09 3.28-.45 4.02-1.5.35-.49.57-1.13.7-2.18.13-1.09.18-2.46.18-4.43v-1.66c0-.24-.01-.8-.07-1.4-.16.04-.32.06-.5.06-.79 0-1.5-.35-1.92-.95a2.45 2.45 0 01-1.95.95c-.9 0-1.66-.64-2.06-1.33-.4.69-1.16 1.33-2.06 1.33s-1.66-.64-2.06-1.33zm-1.4 3.74c.78 0 1.47 0 2.32.93.67-.07 1.42-.07 1.92-.07h.32c.5 0 1.25 0 1.92.07.85-.93 1.54-.93 2.32-.93.37 0 1.85 0 2.88 2.9l.11.31c1.18 3.39 1.05 4.13.84 4.13-.32 0-.79-.74-1.84-1.96-.05.69-.42 2.05-.95 2.05-.27 0-.74-.45-1.21-1.06-1.79.7-3.66.7-4.69.7-1.03 0-2.9 0-4.69-.7-.47.61-.94 1.06-1.21 1.06-.53 0-.9-1.36-.95-2.05-1.05 1.22-1.52 1.96-1.84 1.96-.21 0-.34-.74.84-4.13l.11-.31c1.03-2.9 2.51-2.9 2.88-2.9zM12 14.06s-2.41 2.16-2.84 2.66l.46.02c.73.02 1.4.05 2.38.05.98 0 1.65-.03 2.38-.05l.46-.02C14.41 16.22 12 14.06 12 14.06z"/></svg>',
        gamejolt: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.5 4.5h-9l-1.7 3h9l-4.4 7.7h-3.6l1.4-2.5h-3.6L9 15.6h3.6L11 18.5H7.4l4.4-7.7H8.2l-3 5.2H1.5L8.6 3.7c.2-.4.5-.7.9-.7h13z"/></svg>',
        github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.4-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.3.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .3"/></svg>',
        web: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>'
      };

      const PLATFORM_LABELS = {
        steam: "Steam",
        itch: "itch.io",
        gamejolt: "GameJolt",
        github: "GitHub",
        web: "Website"
      };

      function detectPlatform(url) {
        if (!url) return "web";
        const u = url.toLowerCase();
        if (u.includes("steampowered.com") || u.includes("steamcommunity.com")) return "steam";
        if (u.includes("itch.io")) return "itch";
        if (u.includes("gamejolt.com")) return "gamejolt";
        if (u.includes("github.com")) return "github";
        return "web";
      }

      let links = [];
      if (Array.isArray(d.links) && d.links.length) {
        links = d.links;
      } else if (d.link && d.link !== "#") {
        links = [{ url: d.link, label: d.linkLabel || "View project" }];
      }

      const linksHtml = links.map(l => {
        const platform = l.platform || detectPlatform(l.url);
        const icon = PLATFORM_ICONS[platform] || PLATFORM_ICONS.web;
        const label = l.label || PLATFORM_LABELS[platform] || "View project";
        return `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="detail-link detail-link-${platform}">
          <span class="detail-link-icon">${icon}</span>
          <span class="detail-link-label">${label}</span>
          <span class="detail-link-arrow">↗</span>
        </a>`;
      }).join("");

      function formatText(text) {
        if (!text) return "";
        const escapeAttr = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const inline = s => escapeAttr(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

        return text.split(/\n\s*\n/).map(block => {
          const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
          if (!lines.length) return "";

          if (lines.length === 1 && /^##\s+/.test(lines[0])) {
            return `<h3 class="detail-subtitle">${inline(lines[0].replace(/^##\s+/, ""))}</h3>`;
          }

          if (lines.every(l => /^[-*]\s+/.test(l))) {
            const items = lines.map(l => `<li>${inline(l.replace(/^[-*]\s+/, ""))}</li>`).join("");
            return `<ul class="detail-list">${items}</ul>`;
          }

          return `<p class="detail-paragraph">${lines.map(inline).join("<br>")}</p>`;
        }).join("");
      }

      detailContainer.innerHTML = `
        <div class="detail-header">
          <a href="${backUrl}" class="detail-back">← ${backLabel}</a>
          <div class="detail-meta">${project.year}</div>
          <h1 class="detail-title">${project.title}</h1>
          <p class="detail-tagline">${project.shortDescription}</p>
        </div>

        <div class="detail-cover">
          <img src="${project.coverDetail || project.cover}" alt="${project.title}" ${project.coverDetailFit ? `style="object-fit:${project.coverDetailFit}"` : ""} onerror="this.classList.add('img-missing'); this.removeAttribute('src');">
        </div>

        <div class="detail-body">
          <aside class="detail-info">
            ${infoRows}
            ${linksHtml ? `<div class="detail-links">${linksHtml}</div>` : ""}
          </aside>

          <div class="detail-content">
            ${d.about ? `<h2 class="detail-section-title">About<span class="dot">.</span></h2>${formatText(d.about)}` : ""}
            ${d.contribution ? `<h2 class="detail-section-title">My contribution<span class="dot">.</span></h2>${formatText(d.contribution)}` : ""}
          </div>
        </div>

        ${galleryHtml ? `<div class="detail-gallery">${galleryHtml}</div>` : ""}

        <div class="detail-footer">
          <a href="${backUrl}" class="detail-back-bottom">← ${backLabel}</a>
        </div>
      `;
    }
  }

  const experienceList = document.getElementById("experience-list");
  if (experienceList && Array.isArray(D.experience)) {
    const items = [...D.experience].sort((a, b) => {
      const ae = a.endYear == null ? 9999 : a.endYear;
      const be = b.endYear == null ? 9999 : b.endYear;
      if (ae !== be) return be - ae;
      return (b.startYear || 0) - (a.startYear || 0);
    });

    const TYPE_LABEL = {
      education: "Education",
      work: "Experience"
    };

    experienceList.innerHTML = "";
    items.forEach((item, i) => {
      const article = document.createElement("article");
      article.className = "timeline-item";
      if (item.endYear == null) article.classList.add("is-current");
      article.style.setProperty("--delay", (i * 0.08) + "s");

      const start = item.startLabel || String(item.startYear || "");
      const isPresent = item.endYear == null;
      const end = isPresent
        ? "Present"
        : (item.endLabel || String(item.endYear || ""));

      const datesHtml = `
        <div class="timeline-dates">
          <span>${start}</span>
          <span class="timeline-dash">—</span>
          <span>${end}</span>
          ${isPresent ? '<span class="timeline-current-pill">Now</span>' : ""}
        </div>
      `;

      const typeLabel = TYPE_LABEL[item.type] || "";
      const typeHtml = typeLabel
        ? `<div class="timeline-type">${typeLabel}</div>`
        : "";

      const subtitleHtml = item.subtitle
        ? `<div class="timeline-subtitle">${item.subtitle}</div>`
        : "";

      const locationHtml = item.location
        ? `<div class="timeline-location">${item.location}</div>`
        : "";

      const descriptionHtml = item.description
        ? `<p class="timeline-description">${item.description}</p>`
        : "";

      const tagsHtml = (Array.isArray(item.tags) && item.tags.length)
        ? `<div class="timeline-tags">${item.tags.map(t => `<span class="timeline-tag">${t}</span>`).join("")}</div>`
        : "";

      const titleHtml = item.link
        ? `<h3 class="timeline-title"><a href="${item.link}" target="_blank" rel="noopener noreferrer" class="timeline-title-link">${item.title}<span class="timeline-title-arrow">↗</span></a></h3>`
        : `<h3 class="timeline-title">${item.title}</h3>`;

      article.innerHTML = `
        ${datesHtml}
        ${typeHtml}
        ${titleHtml}
        ${subtitleHtml}
        ${locationHtml}
        ${descriptionHtml}
        ${tagsHtml}
      `;

      experienceList.appendChild(article);
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -8% 0px" });

    document.querySelectorAll(".project-card, .about-grid, .cta-block, .timeline-item, .timeline-intro").forEach(el => {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".project-card, .about-grid, .cta-block, .timeline-item, .timeline-intro").forEach(el => {
      el.classList.add("in-view");
    });
  }

  let lightboxOverlay = null;
  function closeLightbox() {
    if (!lightboxOverlay) return;
    lightboxOverlay.remove();
    lightboxOverlay = null;
    document.removeEventListener("keydown", onLightboxKey);
  }
  function onLightboxKey(e) {
    if (e.key === "Escape") closeLightbox();
  }
  document.addEventListener("click", (e) => {
    const img = e.target.closest(".detail-gallery-img");
    if (!img || !img.src) return;
    lightboxOverlay = document.createElement("div");
    lightboxOverlay.className = "lightbox-overlay";
    lightboxOverlay.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <img src="${img.src}" alt="${img.alt || ""}" class="lightbox-img">
    `;
    lightboxOverlay.addEventListener("click", (ev) => {
      if (ev.target === lightboxOverlay || ev.target.classList.contains("lightbox-close")) closeLightbox();
    });
    document.body.appendChild(lightboxOverlay);
    document.addEventListener("keydown", onLightboxKey);
  });

})();
