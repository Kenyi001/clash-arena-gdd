// La Biblia de Clash Arena - GDD Application Logic

// Elementos del DOM
const appContainer = document.querySelector(".app-container");
const navList = document.getElementById("navList");
const searchInput = document.getElementById("searchInput");
const btnMenu = document.getElementById("btnMenu");
const btnAddNew = document.getElementById("btnAddNew");
const btnReset = document.getElementById("btnReset");

// Barra superior de lectura
const currentCategoryTag = document.getElementById("currentCategoryTag");
const btnEditChapter = document.getElementById("btnEditChapter");
const btnDeleteChapter = document.getElementById("btnDeleteChapter");

// Panel del Lector
const documentBody = document.getElementById("documentBody");

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

// Modal de exportación JSON
const jsonModalOverlay = document.getElementById("jsonModalOverlay");
const btnCloseJsonModal = document.getElementById("btnCloseJsonModal");
const btnCopyJson = document.getElementById("btnCopyJson");
const jsonCodePreview = document.getElementById("jsonCodePreview");

// Toast
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

// Estado
let gddDatabase = [];
let activeChapterId = "";
let searchQuery = "";
let isEditingMode = false;

// Inicialización
function init() {
  gddDatabase = getGddDatabase();
  
  // Establecer primer capítulo como activo por defecto si existe
  if (gddDatabase.length > 0) {
    activeChapterId = gddDatabase[0].id;
  }
  
  renderSidebar();
  renderActiveChapter();
  setupEventListeners();
}

// Renderizar la barra lateral con capítulos
function renderSidebar() {
  navList.innerHTML = "";
  
  const filtered = gddDatabase.filter(ch => {
    const query = searchQuery.toLowerCase().trim();
    return ch.title.toLowerCase().includes(query) ||
           ch.summary.toLowerCase().includes(query) ||
           ch.content.toLowerCase().includes(query);
  });

  if (filtered.length === 0) {
    navList.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 2rem 1rem; font-size: 0.9rem;">
        No se encontraron secciones
      </div>
    `;
    return;
  }

  filtered.forEach(chapter => {
    const item = document.createElement("div");
    item.className = `nav-item cat-${chapter.category} ${chapter.id === activeChapterId ? 'active' : ''}`;
    item.dataset.id = chapter.id;
    
    item.innerHTML = `
      <div class="nav-item-title">${chapter.title}</div>
      <div class="nav-item-summary">${chapter.summary}</div>
    `;
    
    item.addEventListener("click", () => {
      activeChapterId = chapter.id;
      renderSidebar();
      renderActiveChapter();
      
      // En móvil, ocultar la barra lateral tras seleccionar
      appContainer.classList.remove("show-sidebar");
    });

    navList.appendChild(item);
  });
}

// Renderizar el contenido del capítulo activo
function renderActiveChapter() {
  const chapter = gddDatabase.find(ch => ch.id === activeChapterId);
  
  if (!chapter) {
    documentBody.innerHTML = `
      <h1>Sección no encontrada</h1>
      <p>Selecciona otro capítulo de la barra lateral.</p>
    `;
    currentCategoryTag.style.display = "none";
    btnEditChapter.style.display = "none";
    btnDeleteChapter.style.display = "none";
    return;
  }

  // Actualizar etiqueta de categoría
  const categories = {
    concept: "Concepto",
    gameplay: "Jugabilidad",
    pvp_pve: "PvP / PvE",
    tech: "Tecnología",
    roadmap: "Desarrollo"
  };

  currentCategoryTag.innerText = categories[chapter.category] || chapter.category;
  currentCategoryTag.className = `chapter-category-tag tag-${chapter.category}`;
  currentCategoryTag.style.display = "inline-block";
  
  // Mostrar botones de acción de lectura
  btnEditChapter.style.display = "inline-flex";
  
  // Mostrar botón borrar solo si es un capítulo personalizado
  if (chapter.id.startsWith("chapter_")) {
    btnDeleteChapter.style.display = "inline-flex";
  } else {
    btnDeleteChapter.style.display = "none";
  }

  // Renderizar contenido
  documentBody.innerHTML = `
    <h1>${chapter.title}</h1>
    <div class="document-text">
      ${chapter.content}
    </div>
  `;
}

// Abrir Drawer de creación/edición
function openDrawer(edit = false) {
  isEditingMode = edit;
  
  if (edit) {
    const chapter = gddDatabase.find(ch => ch.id === activeChapterId);
    if (!chapter) return;
    
    drawerTitle.innerText = "Editar Capítulo";
    chapterIdInput.value = chapter.id;
    chapterTitleInput.value = chapter.title;
    chapterCategorySelect.value = chapter.category;
    chapterSummaryInput.value = chapter.summary;
    chapterContentInput.value = chapter.content.trim();
  } else {
    drawerTitle.innerText = "Crear Nuevo Capítulo";
    chapterIdInput.value = "";
    chapterTitleInput.value = "";
    chapterCategorySelect.value = "concept";
    chapterSummaryInput.value = "";
    chapterContentInput.value = `<h2>Subtítulo de Sección</h2>
<p>Escribe aquí tu contenido detallado...</p>

<div class="note-box">
  <strong>Nota:</strong> Puedes destacar información importante dentro de estas cajas de notas.
</div>`;
  }
  
  drawerOverlay.classList.add("open");
}

// Cerrar Drawer
function closeDrawer() {
  drawerOverlay.classList.remove("open");
  chapterForm.reset();
}

// Procesar formulario de Guardado
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
    // Editar
    gddDatabase = updateChapterInDatabase(chapterData);
    showToast("Capítulo actualizado localmente");
  } else {
    // Crear
    gddDatabase = addChapterToDatabase(chapterData);
    activeChapterId = chapterData.id;
    showToast("¡Nuevo capítulo creado con éxito!");
  }

  renderSidebar();
  renderActiveChapter();
  closeDrawer();

  // Mostrar el código JSON para agregar al archivo físico
  openJsonModal(chapterData);
}

// Eliminar capítulo activo
function handleDeleteChapter() {
  if (confirm("¿Estás seguro de que deseas eliminar este capítulo permanentemente de tu navegador?")) {
    gddDatabase = deleteChapterFromDatabase(activeChapterId);
    if (gddDatabase.length > 0) {
      activeChapterId = gddDatabase[0].id;
    } else {
      activeChapterId = "";
    }
    renderSidebar();
    renderActiveChapter();
    showToast("Capítulo eliminado");
  }
}

// Mostrar exportador JSON
function openJsonModal(chapter) {
  // Limpiamos prefijo temporal si existe
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
    showToast("¡Copiado al portapapeles!");
  }).catch(err => {
    console.error("Error al copiar", err);
  });
}

// Configurar escuchadores de eventos
function setupEventListeners() {
  // Buscar capítulos
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderSidebar();
  });

  // Alternar barra lateral en móvil
  btnMenu.addEventListener("click", () => {
    appContainer.classList.toggle("show-sidebar");
  });

  // Botones de acción principales
  btnAddNew.addEventListener("click", () => openDrawer(false));
  btnEditChapter.addEventListener("click", () => openDrawer(true));
  btnDeleteChapter.addEventListener("click", handleDeleteChapter);
  
  btnReset.addEventListener("click", () => {
    if (confirm("¿Deseas restaurar el documento original? Se perderán las modificaciones locales.")) {
      gddDatabase = resetGddDatabaseToDefault();
      if (gddDatabase.length > 0) {
        activeChapterId = gddDatabase[0].id;
      }
      renderSidebar();
      renderActiveChapter();
      showToast("GDD Restaurado por defecto");
    }
  });

  // Cerrar Drawer
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

  // Envío de Formulario
  chapterForm.addEventListener("submit", handleFormSubmit);

  // Cerrar con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDrawer();
      closeJsonModal();
    }
  });
}

// Mostrar aviso
function showToast(message) {
  toastText.innerText = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Iniciar al cargar el DOM
document.addEventListener("DOMContentLoaded", init);
