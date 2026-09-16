/**
 * app.js
 * ------------------------------------------------------------------
 * Wires projectsData.js to the DOM:
 *   - initialises the Globe.gl instance
 *   - renders the semester tab list
 *   - flies the globe to a project's coordinates on click
 *   - renders the attachment modal (Colab / map / Shapefile)
 * ------------------------------------------------------------------
 */

(function () {
  "use strict";

  const semesterLabels = {
    semester1: "Semester 1",
    semester2: "Semester 2",
    semester3: "Semester 3"
  };

  let activeSemester = "semester1";
  let globe;

  // ---------------------------------------------------------------
  // Globe setup
  // ---------------------------------------------------------------
  function initGlobe() {
    const el = document.getElementById("globeViz");

    globe = Globe()(el)
      .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-day.jpg")
      .backgroundColor("rgba(0,0,0,0)")
      .atmosphereColor("#7fae8e")
      .atmosphereAltitude(0.18)
      .pointAltitude(0.02)
      .pointRadius(0.45)
      .pointColor(() => "#b75b2e")
      .pointLabel((d) => `<div class="globe-tooltip">${d.title}</div>`)
      .onPointClick((d) => selectProject(d));

    globe.pointOfView({ lat: 20, lng: 78, altitude: 2.1 }, 0);

    // Gentle auto-rotate until the first interaction
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;
    el.addEventListener(
      "pointerdown",
      () => {
        controls.autoRotate = false;
      },
      { once: true }
    );

    handleResize();
    window.addEventListener("resize", handleResize);

    setSemester(activeSemester);
  }

  function handleResize() {
    const el = document.getElementById("globeViz");
    globe.width(el.clientWidth).height(el.clientHeight);
  }

  // ---------------------------------------------------------------
  // Semester tabs + project list
  // ---------------------------------------------------------------
  function setSemester(key) {
    activeSemester = key;

    document.querySelectorAll("[data-semester-tab]").forEach((btn) => {
      const isActive = btn.dataset.semesterTab === key;
      btn.classList.toggle("tab-active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    const projects = projectsData[key] || [];
    globe.pointsData(projects);

    const list = document.getElementById("projectList");
    list.innerHTML = "";

    projects.forEach((project) => {
      const item = document.createElement("li");
      item.className = "project-item";
      item.setAttribute("role", "button");
      item.setAttribute("tabindex", "0");

      item.innerHTML = `
        <div class="project-item__head">
          <span class="project-item__title">${project.title}</span>
          <span class="project-item__coords">${formatCoords(project.lat, project.lng)}</span>
        </div>
        <div class="project-item__location">${project.locationName}</div>
        <div class="project-item__tags">
          ${project.tools.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
      `;

      const activate = () => selectProject(project);
      item.addEventListener("click", activate);
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      });

      list.appendChild(item);
    });
  }

  function formatCoords(lat, lng) {
    const ns = lat >= 0 ? "N" : "S";
    const ew = lng >= 0 ? "E" : "W";
    return `${Math.abs(lat).toFixed(2)}\u00b0${ns}, ${Math.abs(lng).toFixed(2)}\u00b0${ew}`;
  }

  // ---------------------------------------------------------------
  // Project selection: fly globe + open modal
  // ---------------------------------------------------------------
  function selectProject(project) {
    globe.controls().autoRotate = false;
    globe.pointOfView({ lat: project.lat, lng: project.lng, altitude: 1.15 }, 1600);
    openModal(project);
  }

  // ---------------------------------------------------------------
  // Modal
  // ---------------------------------------------------------------
  function openModal(project) {
    const modal = document.getElementById("projectModal");
    const body = document.getElementById("projectModalBody");

    const attachments = [];

    if (project.colabLink) {
      attachments.push(`
        <a href="${project.colabLink}" target="_blank" rel="noopener" class="attachment-btn attachment-btn--colab">
          Open notebook in Colab
        </a>
      `);
    }

    if (project.shapefileDownload) {
      attachments.push(`
        <a href="${project.shapefileDownload}" target="_blank" rel="noopener" class="attachment-btn attachment-btn--data">
          Download GIS data (.zip)
        </a>
      `);
    }

    if (project.htmlMapEmbed) {
      attachments.push(`
        <a href="${project.htmlMapEmbed}" target="_blank" rel="noopener" class="attachment-btn attachment-btn--map">
          Open interactive map in new tab
        </a>
      `);
    }

    body.innerHTML = `
      <div class="modal-tag">${project.locationName} \u2014 ${formatCoords(project.lat, project.lng)}</div>
      <h3 class="modal-title">${project.title}</h3>
      <p class="modal-summary">${project.summary}</p>
      <div class="project-item__tags modal-tags">
        ${project.tools.map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>
      ${
        project.htmlMapEmbed
          ? `<div class="modal-embed"><iframe src="${project.htmlMapEmbed}" loading="lazy" title="${project.title} interactive map"></iframe></div>`
          : ""
      }
      <div class="attachment-row">
        ${attachments.join("") || '<span class="no-attachments">Attachments not yet linked for this project.</span>'}
      </div>
    `;

    modal.classList.add("modal--open");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    document.getElementById("projectModal").classList.remove("modal--open");
    document.body.classList.remove("modal-open");
  }

  // ---------------------------------------------------------------
  // Bindings
  // ---------------------------------------------------------------
  function bindUI() {
    document.querySelectorAll("[data-semester-tab]").forEach((btn) => {
      btn.addEventListener("click", () => setSemester(btn.dataset.semesterTab));
    });

    document.getElementById("modalClose").addEventListener("click", closeModal);
    document.getElementById("projectModal").addEventListener("click", (e) => {
      if (e.target.id === "projectModal") closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindUI();
    initGlobe();
  });
})();
