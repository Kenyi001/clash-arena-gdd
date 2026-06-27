// La Biblia de Clash of Realms - Application Logic

// Elementos del DOM
const cardsGrid = document.getElementById("cardsGrid");
const searchInput = document.getElementById("searchInput");
const tabButtons = document.querySelectorAll(".tab-btn");
const btnAddNew = document.getElementById("btnAddNew");
const btnReset = document.getElementById("btnReset");

// Modal de detalles
const modalOverlay = document.getElementById("modalOverlay");
const btnCloseModal = document.getElementById("btnCloseModal");
const modalIcon = document.getElementById("modalIcon");
const modalCategory = document.getElementById("modalCategory");
const modalName = document.getElementById("modalName");
const modalDesc = document.getElementById("modalDesc");
const modalStatsBody = document.getElementById("modalStatsBody");
const modalLore = document.getElementById("modalLore");

// Drawer de nuevo elemento
const drawerOverlay = document.getElementById("drawerOverlay");
const btnCloseDrawer = document.getElementById("btnCloseDrawer");
const btnCancelDrawer = document.getElementById("btnCancelDrawer");
const newItemForm = document.getElementById("newItemForm");
const statsFieldsContainer = document.getElementById("statsFieldsContainer");
const btnAddStatField = document.getElementById("btnAddStatField");

// Modal de JSON Export
const jsonModalOverlay = document.getElementById("jsonModalOverlay");
const btnCloseJsonModal = document.getElementById("btnCloseJsonModal");
const btnCopyJson = document.getElementById("btnCopyJson");
const jsonCodePreview = document.getElementById("jsonCodePreview");

// Toast
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

// Estado de la aplicación
let currentCategory = "all";
let searchQuery = "";
let gameDatabase = [];

// Iconos SVG predeterminados para nuevos elementos según categoría
const DEFAULT_ICONS = {
  buildings: `<svg viewBox="0 0 100 100" width="100" height="100">
    <defs>
      <linearGradient id="grad-bld-def" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FF9800" />
        <stop offset="100%" stop-color="#E65100" />
      </linearGradient>
    </defs>
    <rect x="25" y="40" width="50" height="45" rx="5" fill="url(#grad-bld-def)" stroke="#FFE082" stroke-width="2"/>
    <polygon points="20,43 50,15 80,43" fill="#E65100" stroke="#FFE082" stroke-width="2"/>
    <rect x="42" y="60" width="16" height="25" fill="#3E2723"/>
    <circle cx="50" cy="30" r="5" fill="#FFD700"/>
  </svg>`,
  troops: `<svg viewBox="0 0 100 100" width="100" height="100">
    <defs>
      <linearGradient id="grad-trp-def" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#E91E63" />
        <stop offset="100%" stop-color="#880E4F" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="45" r="25" fill="url(#grad-trp-def)" stroke="#FFF" stroke-width="2"/>
    <path d="M 30 75 Q 50 65 70 75 L 65 90 L 35 90 Z" fill="#880E4F" stroke="#FFF" stroke-width="2"/>
    <path d="M 40 40 L 45 45 L 50 40 L 55 45 L 60 40" fill="none" stroke="#FFEB3B" stroke-width="3" stroke-linecap="round"/>
  </svg>`,
  spells: `<svg viewBox="0 0 100 100" width="100" height="100">
    <defs>
      <linearGradient id="grad-spl-def" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#9C27B0" />
        <stop offset="100%" stop-color="#4A148C" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="40" fill="none" stroke="url(#grad-spl-def)" stroke-width="3" stroke-dasharray="5 3" opacity="0.6"/>
    <rect x="38" y="35" width="24" height="40" rx="8" fill="url(#grad-spl-def)" stroke="#E1BEE7" stroke-width="2"/>
    <rect x="44" y="27" width="12" height="8" rx="2" fill="#E1BEE7"/>
    <path d="M 44 48 Q 50 42 56 48" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
  heroes: `<svg viewBox="0 0 100 100" width="100" height="100">
    <defs>
      <linearGradient id="grad-her-def" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00BCD4" />
        <stop offset="100%" stop-color="#006064" />
      </linearGradient>
    </defs>
    <polygon points="30,35 35,15 50,28 65,15 70,35 50,45" fill="#FFD700" stroke="#FFF" stroke-width="1.5"/>
    <circle cx="50" cy="55" r="25" fill="url(#grad-her-def)" stroke="#FFD700" stroke-width="2"/>
    <path d="M 38 52 Q 50 62 62 52" fill="none" stroke="#FFF" stroke-width="2"/>
  </svg>`
};

// Carga Inicial
function init() {
  gameDatabase = getDatabase();
  renderCards();
  setupEventListeners();
  addInitialStatField();
}

// Renderizar tarjetas
function renderCards() {
  cardsGrid.innerHTML = "";
  
  const filtered = gameDatabase.filter(item => {
    const matchesCategory = currentCategory === "all" || item.category === currentCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery) ||
                          item.description.toLowerCase().includes(searchQuery) ||
                          (item.subcategory && item.subcategory.toLowerCase().includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    cardsGrid.innerHTML = `
      <div class="no-results">
        <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <h3>No se encontraron elementos</h3>
        <p>Intenta con otros términos de búsqueda o añade un nuevo elemento.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = `item-card category-${item.category}`;
    card.dataset.id = item.id;
    
    // Si es un item personalizado, mostramos el botón de borrar
    const isCustom = item.id.startsWith("custom_");
    const deleteBtnHtml = isCustom ? `
      <button class="btn-delete-card" title="Eliminar elemento permanentemente" data-id="${item.id}">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    ` : '';

    const categoryNames = {
      buildings: "Edificio",
      troops: "Tropa",
      spells: "Hechizo",
      heroes: "Héroe"
    };

    card.innerHTML = `
      <div class="card-header">
        <div class="badge-wrapper">
          <span class="badge-cat">${categoryNames[item.category] || item.category}</span>
          ${item.subcategory ? `<span class="badge-subcat">${item.subcategory.toUpperCase()}</span>` : ''}
        </div>
        ${deleteBtnHtml}
      </div>
      <div class="card-visual">
        ${item.icon || DEFAULT_ICONS[item.category] || ''}
      </div>
      <div class="card-content">
        <h3 class="card-title">${item.name}</h3>
        <p class="card-desc">${item.description}</p>
      </div>
    `;
    
    // Registrar evento de click para abrir modal (evitando el botón de borrar)
    card.addEventListener("click", (e) => {
      if (e.target.closest(".btn-delete-card")) {
        e.stopPropagation();
        return;
      }
      openDetailModal(item);
    });

    cardsGrid.appendChild(card);
  });

  // Agregar eventos a botones de eliminar
  document.querySelectorAll(".btn-delete-card").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = e.currentTarget.dataset.id;
      if (confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
        gameDatabase = deleteItemFromDatabase(id);
        renderCards();
        showToast("Elemento eliminado localmente");
      }
    });
  });
}

// Abrir detalle de elemento
function openDetailModal(item) {
  const categoryNames = {
    buildings: "Edificio",
    troops: "Tropa",
    spells: "Hechizo",
    heroes: "Héroe"
  };

  modalIcon.innerHTML = item.icon || DEFAULT_ICONS[item.category] || '';
  modalCategory.innerText = `${categoryNames[item.category] || item.category} • ${item.subcategory || 'General'}`;
  modalName.innerText = item.name;
  modalDesc.innerText = item.description;
  modalLore.innerText = item.lore || "No hay lore registrado sobre este elemento todavía.";

  // Renderizar tabla de estadísticas
  modalStatsBody.innerHTML = "";
  if (item.stats && Object.keys(item.stats).length > 0) {
    Object.entries(item.stats).forEach(([key, value]) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="stat-label">${key}</td>
        <td class="stat-value">${value}</td>
      `;
      modalStatsBody.appendChild(row);
    });
  } else {
    modalStatsBody.innerHTML = `
      <tr>
        <td colspan="2" style="text-align: center; color: var(--text-muted);">Sin estadísticas numéricas asignadas.</td>
      </tr>
    `;
  }

  modalOverlay.classList.add("open");
}

// Cerrar detalle
function closeDetailModal() {
  modalOverlay.classList.remove("open");
}

// Abrir Creador de items
function openDrawer() {
  drawerOverlay.classList.add("open");
}

// Cerrar Creador de items
function closeDrawer() {
  drawerOverlay.classList.remove("open");
  newItemForm.reset();
  statsFieldsContainer.innerHTML = "";
  addInitialStatField();
}

// Manejar campos de estadísticas dinámicos en el formulario
function addInitialStatField() {
  addStatRow("Puntos de vida", "1,000");
}

function addStatRow(initialName = "", initialVal = "") {
  const row = document.createElement("div");
  row.className = "stat-row";
  row.innerHTML = `
    <input type="text" class="form-control stat-name-input" placeholder="Ej: Daño" value="${initialName}" required>
    <input type="text" class="form-control stat-val-input" placeholder="Ej: 150" value="${initialVal}" required>
    <button type="button" class="btn-icon-danger btn-remove-stat" title="Eliminar fila">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  `;

  row.querySelector(".btn-remove-stat").addEventListener("click", () => {
    row.remove();
  });

  statsFieldsContainer.appendChild(row);
}

// Guardar nuevo item
function handleFormSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById("itemName").value.trim();
  const category = document.getElementById("itemCategory").value;
  const subcategory = document.getElementById("itemSubcategory").value.trim();
  const description = document.getElementById("itemDesc").value.trim();
  const lore = document.getElementById("itemLore").value.trim();

  // Recoger estadísticas dinámicas
  const stats = {};
  const rows = statsFieldsContainer.querySelectorAll(".stat-row");
  rows.forEach(row => {
    const key = row.querySelector(".stat-name-input").value.trim();
    const val = row.querySelector(".stat-val-input").value.trim();
    if (key && val) {
      stats[key] = val;
    }
  });

  // Generar ID único
  const id = `custom_${category}_${Date.now()}`;
  
  // Icono SVG auto-generado
  const icon = DEFAULT_ICONS[category] || '';

  const newItem = {
    id,
    name,
    category,
    subcategory,
    description,
    stats,
    lore,
    icon
  };

  // Guardar en Base de Datos (localStorage)
  gameDatabase = addItemToDatabase(newItem);
  renderCards();
  closeDrawer();
  showToast("¡Nuevo elemento creado con éxito!");

  // Mostrar el código JSON para agregar al archivo físico
  openJsonModal(newItem);
}

// Mostrar modal de JSON exportable
function openJsonModal(item) {
  // Omitimos el prefijo "custom_" en el ID exportado para que tenga una estructura limpia
  const exportableItem = {
    ...item,
    id: item.id.replace("custom_", "")
  };
  
  jsonCodePreview.innerText = JSON.stringify(exportableItem, null, 2);
  jsonModalOverlay.classList.add("open");
}

function closeJsonModal() {
  jsonModalOverlay.classList.remove("open");
}

function copyJsonToClipboard() {
  const code = jsonCodePreview.innerText;
  navigator.clipboard.writeText(code).then(() => {
    showToast("¡Copiado al portapapeles!");
  }).catch(err => {
    console.error("Error al copiar", err);
  });
}

// Configurar escuchadores de eventos
function setupEventListeners() {
  // Filtro por pestañas
  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      tabButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      currentCategory = button.dataset.category;
      renderCards();
    });
  });

  // Búsqueda en tiempo real
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderCards();
  });

  // Acciones de botones principales
  btnAddNew.addEventListener("click", openDrawer);
  btnReset.addEventListener("click", () => {
    if (confirm("¿Estás seguro de restaurar los valores iniciales? Se perderán las modificaciones locales.")) {
      gameDatabase = resetDatabaseToDefault();
      renderCards();
      showToast("Base de datos restaurada");
    }
  });

  // Cierres de Modales / Drawers
  btnCloseModal.addEventListener("click", closeDetailModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeDetailModal();
  });

  btnCloseDrawer.addEventListener("click", closeDrawer);
  btnCancelDrawer.addEventListener("click", closeDrawer);
  drawerOverlay.addEventListener("click", (e) => {
    if (e.target === drawerOverlay) closeDrawer();
  });

  btnCloseJsonModal.addEventListener("click", closeJsonModal);
  jsonModalOverlay.addEventListener("click", (e) => {
    if (e.target === jsonModalOverlay) closeJsonModal();
  });

  btnCopyJson.addEventListener("click", copyJsonToClipboard);

  // Agregar fila de estadísticas en formulario
  btnAddStatField.addEventListener("click", () => addStatRow());

  // Submit del formulario
  newItemForm.addEventListener("submit", handleFormSubmit);

  // Escuchar tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDetailModal();
      closeDrawer();
      closeJsonModal();
    }
  });
}

// Mostrar aviso flotante (Toast)
function showToast(message) {
  toastText.innerText = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Inicializar la aplicación al cargar
document.addEventListener("DOMContentLoaded", init);
