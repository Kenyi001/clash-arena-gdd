// Realms of Ruin - GDD & Pitch Deck Application Logic

// Elementos del DOM
const backgroundParticles = document.getElementById("backgroundParticles");
const gddDashboard = document.getElementById("gddDashboard");
const searchInput = document.getElementById("searchInput");
const btnAddNew = document.getElementById("btnAddNew");
const btnReset = document.getElementById("btnReset");

// Visor del GDD (Modal de Lectura)
const viewerOverlay = document.getElementById("viewerOverlay");
const btnCloseViewer = document.getElementById("btnCloseViewer");
const viewerCategoryTag = document.getElementById("viewerCategoryTag");
const btnEditChapter = document.getElementById("btnEditChapter");
const viewerContent = document.getElementById("viewerContent");

// Mazo de Tropas Interactivo (Homepage)
const deckGrid = document.getElementById("deckGrid");
const deckFilterBtns = document.querySelectorAll(".deck-filter-btn");

// Drawer de Edición/Creación
const drawerOverlay = document.getElementById("drawerOverlay");
const drawerTitle = document.getElementById("drawerTitle");
const btnCloseDrawer = document.getElementById("btnCloseDrawer");
const btnCancelDrawer = document.getElementById("btnCancelDrawer");
const chapterForm = document.getElementById("chapterForm");
const chapterIdInput = document.getElementById("chapterId");
const chapterTitleInput = document.getElementById("chapterTitle");
const chapterCategorySelect = document.getElementById("chapterCategory");
const chapterSummaryInput = document.getElementById("chapterSummary");
const chapterContentInput = document.getElementById("chapterContent");

// Modal de Exportación JSON
const jsonModalOverlay = document.getElementById("jsonModalOverlay");
const btnCloseJsonModal = document.getElementById("btnCloseJsonModal");
const btnCopyJson = document.getElementById("btnCopyJson");
const jsonCodePreview = document.getElementById("jsonCodePreview");

// Toast Notification
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

// Estado de la Aplicación
let gddChapters = [];
let activeChapterId = "";
let searchQuery = "";
let activeDeckFilter = "all";

// Lista de Tropas y Enemigos Estructurada (Para renderizado interactivo en el Mazo)
const ENTITY_DECK = [
  {
    id: "card_death_knight",
    name: "Caballero de la Muerte",
    type: "troop",
    role: "Cuerpo a Cuerpo • Tanque",
    description: "Clad en armadura rúnica pesada. Ataca lentamente con un mandoble impregnado de fuego azul y bloquea proyectiles.",
    stats: { "Costo": "4 Cenizas", "HP": "1,100", "Daño": "75/s" },
    icon: `<svg viewBox="0 0 100 100" width="80" height="80">
      <circle cx="50" cy="50" r="40" fill="#06b6d4" opacity="0.15"/>
      <rect x="35" y="30" width="30" height="40" rx="5" fill="#1e293b" stroke="#06b6d4" stroke-width="2"/>
      <path d="M40 45 L60 45 M50 45 L50 65" stroke="#06b6d4" stroke-width="2"/>
      <circle cx="43" cy="40" r="2.5" fill="#00ffff"/>
      <circle cx="57" cy="40" r="2.5" fill="#00ffff"/>
    </svg>`
  },
  {
    id: "card_spectral_crossbow",
    name: "Ballestera Espectral",
    type: "troop",
    role: "A Distancia • DPS",
    description: "Una arquera incorpórea que dispara saetas cargadas de energía helada. Puede atacar a unidades aéreas.",
    stats: { "Costo": "3 Cenizas", "HP": "310", "Daño": "42/s" },
    icon: `<svg viewBox="0 0 100 100" width="80" height="80">
      <circle cx="50" cy="50" r="40" fill="#f59e0b" opacity="0.15"/>
      <path d="M 30 70 A 30 30 0 0 1 70 30" fill="none" stroke="#f59e0b" stroke-width="3"/>
      <path d="M 30 30 L 70 70 M 60 70 L 70 70 L 70 60" fill="none" stroke="#fff" stroke-width="2"/>
    </svg>`
  },
  {
    id: "card_plague_necromancer",
    name: "Nigromante de la Plaga",
    type: "troop",
    role: "Distancia • Invocador",
    description: "Lanza proyectiles necróticos de salpicadura y resucita a dos pequeños esqueletos de combate cada 8 segundos.",
    stats: { "Costo": "5 Cenizas", "HP": "480", "Daño": "55/s" },
    icon: `<svg viewBox="0 0 100 100" width="80" height="80">
      <circle cx="50" cy="50" r="40" fill="#8b5cf6" opacity="0.15"/>
      <path d="M 30 75 Q 50 20 70 75 Z" fill="#1e1b4b" stroke="#8b5cf6" stroke-width="2"/>
      <circle cx="50" cy="55" r="10" fill="#f1f5f9"/>
      <circle cx="46" cy="53" r="2.5" fill="#000"/>
      <circle cx="54" cy="53" r="2.5" fill="#000"/>
    </svg>`
  },
  {
    id: "card_grave_robber",
    name: "Duende Saqueador de Tumbas",
    type: "enemy",
    role: "Veloz • Ladrón de Éter",
    description: "Se escabulle en las sombras. Ignora a tus guerreros y corre directamente a robar el éter de tus Extractores.",
    stats: { "Dificultad": "Baja", "Velocidad": "Muy Rápida", "Objetivo": "Almacenes" },
    icon: `<svg viewBox="0 0 100 100" width="80" height="80">
      <circle cx="50" cy="50" r="40" fill="#ec4899" opacity="0.15"/>
      <path d="M 20 40 L 40 45 L 35 60 L 15 50 Z" fill="#ec4899"/>
      <path d="M 80 40 L 60 45 L 65 60 L 85 50 Z" fill="#ec4899"/>
      <circle cx="50" cy="60" r="15" fill="#7c2d12"/>
    </svg>`
  },
  {
    id: "card_stone_gargoyle",
    name: "Gárgola de Piedra",
    type: "enemy",
    role: "Aéreo • Hostigador",
    description: "Una bestia voladora tallada en granito. Escupe fuego fatuo azul y es inmune a las trampas terrestres.",
    stats: { "Dificultad": "Media", "HP": "550", "Daño": "50/s" },
    icon: `<svg viewBox="0 0 100 100" width="80" height="80">
      <circle cx="50" cy="50" r="40" fill="#3b82f6" opacity="0.15"/>
      <path d="M 15 45 L 50 30 L 85 45 L 50 65 Z" fill="#475569" stroke="#fff" stroke-width="1.5"/>
      <circle cx="50" cy="45" r="12" fill="#334155"/>
    </svg>`
  },
  {
    id: "card_ash_lord",
    name: "Señor de la Ceniza",
    type: "enemy",
    role: "Jefe de Área • Nigromante",
    description: "El guardián supremo de las catacumbas. Invoca lluvias de ceniza que dañan a tus tropas en toda la arena.",
    stats: { "Dificultad": "Extrema", "HP": "8,500", "Daño": "160/s" },
    icon: `<svg viewBox="0 0 100 100" width="80" height="80">
      <circle cx="50" cy="50" r="40" fill="#ef4444" opacity="0.15"/>
      <polygon points="25,35 35,10 50,25 65,10 75,35 50,45" fill="#ef4444" stroke="#fff" stroke-width="2"/>
      <path d="M30 65 Q50 85 70 65 L60 45 L40 45 Z" fill="#4c0519"/>
    </svg>`
  }
];

// Inicialización de la Web App
function init() {
  gddChapters = getGddDatabase();
  generateParticles(20);
  renderDashboard();
  renderDeck();
  setupEventListeners();
}

// Generar partículas CSS flotantes de fondo
function generateParticles(num) {
  for (let i = 0; i < num; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    
    // Posición y escala aleatorias
    p.style.left = `${Math.random() * 100}vw`;
    const size = Math.random() * 8 + 3;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    
    // Retraso de animación aleatorio
    p.style.animationDelay = `${Math.random() * 20}s`;
    
    backgroundParticles.appendChild(p);
  }
}

// Renderizar el Dashboard de Capítulos del GDD
function renderDashboard() {
  gddDashboard.innerHTML = "";
  
  const filtered = gddChapters.filter(ch => {
    const q = searchQuery.toLowerCase().trim();
    return ch.title.toLowerCase().includes(q) ||
           ch.summary.toLowerCase().includes(q) ||
           ch.content.toLowerCase().includes(q);
  });

  if (filtered.length === 0) {
    gddDashboard.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 4rem 2rem;">
        <p>No se encontraron capítulos con esos criterios.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(chapter => {
    const card = document.createElement("div");
    card.className = `dashboard-card cat-${chapter.category}`;
    card.dataset.id = chapter.id;

    const chapterNumberStr = chapter.title.split('.')[0] || "0";
    const cleanTitle = chapter.title.substring(chapter.title.indexOf('.') + 1).trim();

    card.innerHTML = `
      <div class="card-number">Capítulo ${chapterNumberStr}</div>
      <h3 class="dashboard-card-title">${cleanTitle}</h3>
      <p class="dashboard-card-summary">${chapter.summary}</p>
      <span class="card-action-link">
        Examinar
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </span>
    `;

    card.addEventListener("click", () => openViewer(chapter.id));

    gddDashboard.appendChild(card);
  });
}

// Renderizar el Mazo de Tropas Interactivo
function renderDeck() {
  deckGrid.innerHTML = "";
  
  const filtered = ENTITY_DECK.filter(entity => {
    if (activeDeckFilter === "all") return true;
    return entity.type === activeDeckFilter;
  });

  filtered.forEach(entity => {
    const card = document.createElement("div");
    card.className = `gdd-entity-card ${entity.type}`;
    
    // Crear bloque de estadísticas
    let statsHtml = "";
    Object.entries(entity.stats).forEach(([key, val]) => {
      statsHtml += `<span><strong>${key}:</strong> ${val}</span>`;
    });

    card.innerHTML = `
      <div class="gdd-entity-visual">
        ${entity.icon}
      </div>
      <div class="gdd-entity-info">
        <span class="gdd-entity-role">${entity.type === 'troop' ? 'Aliado' : 'Campaña PvE'} • ${entity.role}</span>
        <h4>${entity.name}</h4>
        <p class="gdd-entity-desc">${entity.description}</p>
        <div class="gdd-entity-stats">
          ${statsHtml}
        </div>
      </div>
    `;

    deckGrid.appendChild(card);
  });
}

// Abrir el Visor de Capítulos
function openViewer(id) {
  const chapter = gddChapters.find(ch => ch.id === id);
  if (!chapter) return;

  activeChapterId = id;

  const categories = {
    concept: "Concepto y Visión",
    gameplay: "Mecánicas de Juego",
    pvp_pve: "Sistemas PvP / PvE",
    tech: "Tecnología",
    roadmap: "Roadmap"
  };

  viewerCategoryTag.innerText = categories[chapter.category] || chapter.category;
  viewerCategoryTag.className = `viewer-category-tag tag-${chapter.category}`;
  
  // Renderizar contenido
  viewerContent.innerHTML = `
    <h1>${chapter.title}</h1>
    <div class="viewer-text-body">
      ${chapter.content}
    </div>
  `;

  viewerOverlay.classList.add("open");
}

// Cerrar el Visor de Capítulos
function closeViewer() {
  viewerOverlay.classList.remove("open");
}

// Abrir el Drawer de Edición/Creación
function openDrawer(edit = false) {
  if (edit) {
    const chapter = gddChapters.find(ch => ch.id === activeChapterId);
    if (!chapter) return;

    drawerTitle.innerText = "Editar Grimorio de Diseño";
    chapterIdInput.value = chapter.id;
    chapterTitleInput.value = chapter.title;
    chapterCategorySelect.value = chapter.category;
    chapterSummaryInput.value = chapter.summary;
    chapterContentInput.value = chapter.content.trim();
  } else {
    drawerTitle.innerText = "Revelar Nuevo Capítulo";
    chapterIdInput.value = "";
    chapterTitleInput.value = "";
    chapterCategorySelect.value = "concept";
    chapterSummaryInput.value = "";
    chapterContentInput.value = `<h2>Nueva Sección</h2>
<p>Escribe tu contenido rúnico aquí...</p>

<div class="note-box">
  <strong>Consejo Nigromántico:</strong> Agrega notas o advertencias para el equipo dentro de este contenedor.
</div>`;
  }

  // Cerrar el visor si está abierto
  closeViewer();
  drawerOverlay.classList.add("open");
}

// Cerrar el Drawer
function closeDrawer() {
  drawerOverlay.classList.remove("open");
  chapterForm.reset();
}

// Procesar el formulario de guardado
function handleFormSubmit(e) {
  e.preventDefault();

  const id = chapterIdInput.value;
  const title = chapterTitleInput.value.trim();
  const category = chapterCategorySelect.value;
  const summary = chapterSummaryInput.value.trim();
  const content = chapterContentInput.value.trim();

  const chapterData = {
    id: id || `chapter_${Date.now()}`,
    title,
    category,
    summary,
    content
  };

  if (id) {
    gddChapters = updateChapterInDatabase(chapterData);
    showToast("Capítulo actualizado en el Grimorio local");
  } else {
    gddChapters = addChapterToDatabase(chapterData);
    activeChapterId = chapterData.id;
    showToast("¡Nuevo capítulo escrito en las sombras!");
  }

  renderDashboard();
  closeDrawer();
  
  // Abrir la modal de exportación para guardar en código
  openJsonModal(chapterData);
}

// Mostrar exportador de JSON
function openJsonModal(chapter) {
  const exportable = {
    ...chapter,
    id: chapter.id.replace("chapter_", "")
  };
  jsonCodePreview.innerText = JSON.stringify(exportable, null, 2);
  jsonModalOverlay.classList.add("open");
}

function closeJsonModal() {
  jsonModalOverlay.classList.remove("open");
}

function copyJsonToClipboard() {
  const code = jsonCodePreview.innerText;
  navigator.clipboard.writeText(code).then(() => {
    showToast("¡Código copiado al grimorio físico!");
  }).catch(err => {
    console.error("Error al copiar", err);
  });
}

// Configurar escuchadores de eventos
function setupEventListeners() {
  // Buscador del Dashboard
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderDashboard();
  });

  // Filtros del Mazo de Tropas
  deckFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      deckFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeDeckFilter = btn.dataset.filter;
      renderDeck();
    });
  });

  // Acciones principales
  btnAddNew.addEventListener("click", () => openDrawer(false));
  btnEditChapter.addEventListener("click", () => openDrawer(true));
  
  btnReset.addEventListener("click", () => {
    if (confirm("¿Seguro de que deseas restablecer el Grimorio al estado inicial? Tus capítulos locales se perderán.")) {
      gddChapters = resetGddDatabaseToDefault();
      if (gddChapters.length > 0) activeChapterId = gddChapters[0].id;
      renderDashboard();
      showToast("Grimorio restablecido");
    }
  });

  // Cerrar el visor de lectura
  btnCloseViewer.addEventListener("click", closeViewer);
  viewerOverlay.addEventListener("click", (e) => {
    if (e.target === viewerOverlay) closeViewer();
  });

  // Cerrar el drawer de edición
  btnCloseDrawer.addEventListener("click", closeDrawer);
  btnCancelDrawer.addEventListener("click", closeDrawer);
  drawerOverlay.addEventListener("click", (e) => {
    if (e.target === drawerOverlay) closeDrawer();
  });

  // Exportar JSON Cerrar & Copiar
  btnCloseJsonModal.addEventListener("click", closeJsonModal);
  btnCopyJson.addEventListener("click", copyJsonToClipboard);
  jsonModalOverlay.addEventListener("click", (e) => {
    if (e.target === jsonModalOverlay) closeJsonModal();
  });

  // Envío del formulario
  chapterForm.addEventListener("submit", handleFormSubmit);

  // Cerrar todo con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeViewer();
      closeDrawer();
      closeJsonModal();
    }
  });
}

// Mostrar Toast
function showToast(message) {
  toastText.innerText = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Inicializar al cargar
document.addEventListener("DOMContentLoaded", init);
