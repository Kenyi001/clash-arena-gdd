// Base de datos del Documento de Diseño del Juego (GDD) - Clash Arena: Realms of War
const DEFAULT_GDD_DATABASE = [
  {
    id: "vision_general",
    title: "1. Visión General y Concepto",
    category: "concept",
    summary: "El concepto básico del juego, pilares de diseño y público objetivo de Clash Arena.",
    content: `
      <h2>1.1 Resumen del Proyecto</h2>
      <p><strong>Clash Arena: Realms of War</strong> es un juego de estrategia en tiempo real (RTS) diseñado específicamente para dispositivos móviles, centrado en enfrentamientos tácticos 1vs1 de ritmo rápido (partidas de 3 a 5 minutos). Fusiona la gestión de base a micro-escala de los RTS clásicos con la accesibilidad y velocidad de los juegos de arena móviles modernos.</p>
      
      <div class="note-box">
        <strong>Pilar Clave:</strong> No es un simulador de espera. El juego ocurre en tiempo real y requiere que los jugadores recolecten recursos, construyan contra-medidas y comanden tropas en el mapa de manera activa durante la partida.
      </div>

      <h2>1.2 Pilares de Diseño</h2>
      <ul>
        <li><strong>Estrategia Activa y Dinámica:</strong> El jugador toma decisiones de macro-gestión (¿mejoro mi economía o construyo defensas?) y micro-gestión (dirigir ataques a flancos débiles) en tiempo real.</li>
        <li><strong>Accesibilidad Competitiva:</strong> Controles táctiles optimizados. Sin comandos complejos; arrastrar y soltar estructuras, pulsar para desplegar tropas e interactuar con el mapa de forma intuitiva.</li>
        <li><strong>Sesiones de Juego Cortas e Intensas:</strong> Un temporizador de 3 minutos (con muerte súbita de 1 minuto) asegura partidas rápidas perfectas para el formato móvil.</li>
      </ul>

      <h2>1.3 Público Objetivo</h2>
      <p>Jugadores de dispositivos móviles (iOS y Android) de entre 16 y 35 años que disfrutan de la competencia directa en línea, fanáticos de los RTS tradicionales (StarCraft, Age of Empires) que buscan una experiencia portátil, y jugadores de juegos de cartas de combate en tiempo real que buscan una jugabilidad más profunda.</p>
    `
  },
  {
    id: "bucle_principal",
    title: "2. Bucle de Juego Principal (Core Loop)",
    category: "gameplay",
    summary: "El flujo de juego recurrente, la economía dentro de la partida y el progreso general.",
    content: `
      <h2>2.1 El Bucle de Progresión Externo</h2>
      <p>El jugador entra en un ciclo constante de desafío y recompensa que incentiva el juego a largo plazo:</p>
      
      <div class="diagram-container">
        <!-- Diagrama SVG del Bucle de Juego -->
        <svg viewBox="0 0 500 120" width="100%" height="120">
          <defs>
            <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#2ec4b6" />
              <stop offset="100%" stop-color="#0f172a" />
            </linearGradient>
          </defs>
          <!-- Flechas de conexión -->
          <path d="M 120 60 L 160 60" fill="none" stroke="#64748b" stroke-width="3" marker-end="url(#arrow)"/>
          <path d="M 270 60 L 310 60" fill="none" stroke="#64748b" stroke-width="3"/>
          <path d="M 420 60 L 450 60 A 10 10 0 0 1 460 70 L 460 100 A 10 10 0 0 1 450 110 L 50 110 A 10 10 0 0 1 40 100 L 40 70 A 10 10 0 0 1 50 60 L 70 60" fill="none" stroke="#64748b" stroke-width="3" stroke-dasharray="4 4"/>
          
          <!-- Bloques -->
          <rect x="50" y="35" width="80" height="50" rx="8" fill="#1e293b" stroke="#2ec4b6" stroke-width="2"/>
          <text x="90" y="65" fill="#fff" font-size="12" text-anchor="middle" font-weight="bold">1. JUGAR 1v1</text>
          
          <rect x="190" y="35" width="90" height="50" rx="8" fill="#1e293b" stroke="#ff006e" stroke-width="2"/>
          <text x="235" y="65" fill="#fff" font-size="12" text-anchor="middle" font-weight="bold">2. GANAR RECURSOS</text>
          
          <rect x="340" y="35" width="90" height="50" rx="8" fill="#1e293b" stroke="#ffb703" stroke-width="2"/>
          <text x="385" y="65" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">3. MEJORAR MAZO</text>
        </svg>
      </div>

      <h2>2.2 Economía Dentro de la Partida</h2>
      <p>Durante un enfrentamiento 1vs1, el jugador debe gestionar activamente dos recursos dinámicos:</p>
      
      <table class="stats-table">
        <tr>
          <td class="stat-label">Oro de Batalla</td>
          <td class="stat-value">Se genera automáticamente por segundo. Se utiliza para reclutar unidades básicas y construir estructuras defensivas iniciales. La tasa de generación aumenta un 50% en el último minuto de la partida.</td>
        </tr>
        <tr>
          <td class="stat-label">Cristal de Éter</td>
          <td class="stat-value">Debe ser extraído activamente construyendo "Extractores de Éter" sobre grietas de cristal del mapa. Sirve para desarrollar mejoras tecnológicas (subir de era la base) y desplegar unidades pesadas o hechizos destructivos.</td>
        </tr>
      </table>

      <h2>2.3 Progreso y Coleccionables</h2>
      <p>El juego cuenta con un sistema de cartas coleccionables. Antes de entrar a la arena, el jugador configura su "Mazo de Batalla" compuesto por 8 cartas (4 Tropas, 2 Estructuras y 2 Hechizos). Ganar batallas otorga cofres con planos y oro necesarios para subir de nivel estas cartas, aumentando sus estadísticas base.</p>
    `
  },
  {
    id: "pvp_combate",
    title: "3. Sistema Multijugador (PvP)",
    category: "pvp_pve",
    summary: "Reglas de las partidas de 1vs1, diseño del mapa simétrico y sistema de trofeos.",
    content: `
      <h2>3.1 La Arena 1vs1</h2>
      <p>Las batallas toman lugar en un mapa completamente simétrico dividido por un río central que solo puede cruzarse mediante dos puentes (carril izquierdo y derecho). Cada jugador inicia con un Centro de Mando (Ayuntamiento) y dos Torres de Vigilancia defensivas en su mitad de la arena.</p>

      <div class="note-box" style="border-left-color: var(--color-cyan);">
        <strong>Niebla de Guerra (Fog of War):</strong> El mapa está cubierto por una niebla. El jugador solo puede ver las unidades e intenciones de construcción enemigas dentro del rango de visión de sus propios edificios o tropas activas. Esto fomenta el espionaje y los ataques sorpresa.
      </div>

      <h2>3.2 Flujo del Combate 1vs1</h2>
      <ol>
        <li><strong>Fase de Apertura (0:00 - 1:00):</strong> Los jugadores colocan sus primeros Extractores de Éter y defensas básicas. Se inician las escaramuzas en los puentes por el control de las minas centrales de cristal.</li>
        <li><strong>Fase de Mitad de Partida (1:00 - 2:30):</strong> Con el éter recolectado, los jugadores mejoran sus Centros de Mando a Era II o Era III, desbloqueando unidades pesadas (Gigantes, Mágicas) e iniciando ofensivas a gran escala en los carriles.</li>
        <li><strong>Fase de Clímax / Frenesí (2:30 - 3:00):</strong> El Oro se genera al doble de velocidad. El combate se vuelve caótico con despliegues constantes de hechizos y tropas pesadas.</li>
        <li><strong>Muerte Súbita (3:00 - 4:00):</strong> Si no se destruye ningún Centro de Mando, la partida entra en Muerte Súbita. El primer jugador en destruir cualquier estructura enemiga gana de inmediato.</li>
      </ol>

      <h2>3.3 Sistema de Emparejamiento (Matchmaking) y Ligas</h2>
      <p>El sistema calcula el nivel de habilidad del jugador mediante Copas (sistema ELO modificado). El buscador de emparejamiento busca oponentes dentro de un rango de +/- 50 copas y un diferencial máximo de +/- 1 nivel de Ayuntamiento para evitar desbalances de poder de cartas.</p>
    `
  },
  {
    id: "pve_campana",
    title: "4. Modo Campaña (PvE)",
    category: "pvp_pve",
    summary: "Asaltos cooperativos, campaña en solitario y mapas de desafíos tácticos.",
    content: `
      <h2>4.1 Campaña: "La Rebelión de los Reinos"</h2>
      <p>Diseñada como una experiencia en solitario y una herramienta de entrenamiento avanzado para el PvP. El jugador avanza a través de un mapa de hexágonos donde cada nodo presenta un escenario asimétrico gobernado por un General de la IA con mecánicas de juego alteradas.</p>
      
      <h3>Tipos de Misiones PvE:</h3>
      <ul>
        <li><strong>Asalto a la Fortaleza:</strong> El enemigo ya inicia con una base fortificada y defensas avanzadas. El jugador debe asediar y destruir la base antes de que acabe el tiempo.</li>
        <li><strong>Supervivencia ante Hordas:</strong> El jugador no puede entrenar tropas ofensivas; debe construir barricadas, trampas y torres para resistir oleadas continuas de la IA durante 5 minutos.</li>
        <li><strong>Desafíos de Habilidad (Puzzles):</strong> Escenarios con tropas fijas sin generación de recursos. El jugador debe resolver cómo destruir una guarnición usando únicamente la micro-gestión de las tropas asignadas.</li>
      </ul>

      <h2>4.2 Recompensas de PvE</h2>
      <p>El modo PvE no otorga copas ni influye en el rango global, pero es la fuente principal para obtener recursos estéticos (skins de torres, avatares), oro básico y cartas de tipo "Apoyo" no competitivas que ayudan a experimentar con nuevas estrategias en el modo de entrenamiento.</p>
    `
  },
  {
    id: "pila_tecnologica",
    title: "5. Pila Tecnológica y Arquitectura",
    category: "tech",
    summary: "Motores, netcode, base de datos de usuarios y sincronización en tiempo real.",
    content: `
      <h2>5.1 Pila de Tecnologías Propuesta</h2>
      <p>Para asegurar un desarrollo escalable y de bajo costo para el mantenimiento de los servidores de juego, se propone la siguiente arquitectura:</p>
      
      <table class="stats-table">
        <tr>
          <td class="stat-label">Motor del Cliente (Frontend)</td>
          <td class="stat-value"><strong>Unity Engine (C#)</strong> o <strong>Godot Engine (C#/C++)</strong>. Ambos permiten compilación nativa altamente optimizada para Android y iOS, y cuentan con sistemas de físicas 2D/3D ligeros óptimos para móviles de gama media-baja.</td>
        </tr>
        <tr>
          <td class="stat-label">Servidor de Batallas (Netcode)</td>
          <td class="stat-value">Servidor autoritativo ligero programado en <strong>Node.js (TypeScript)</strong> o <strong>Go (Golang)</strong> utilizando WebSockets seguros (WSS) o gRPC sobre HTTP/2. El servidor simula el estado del mapa y solo procesa las acciones enviadas por el cliente (construir, mover tropa) para evitar hackeos de velocidad o recursos.</td>
        </tr>
        <tr>
          <td class="stat-label">Base de Datos de Usuarios</td>
          <td class="stat-value"><strong>PostgreSQL</strong> para almacenar datos persistentes del jugador: nivel de cartas, inventario de recursos, copas históricas y transacciones.</td>
        </tr>
        <tr>
          <td class="stat-label">Matchmaking y Caché</td>
          <td class="stat-value"><strong>Redis</strong>. Utilizado para gestionar las salas de espera rápidas del emparejamiento 1vs1, y almacenar en caché el estado de partidas activas para una reconexión instantánea si el jugador pierde señal de red.</td>
        </tr>
      </table>

      <h2>5.2 Mitigación de Latencia</h2>
      <p>Dado que es un RTS, la latencia es crítica. Se implementará una arquitectura de <strong>Client Prediction</strong> con <strong>Visual Interpolation</strong>. Las acciones de las tropas se simulan localmente de forma visual al instante, pero el daño real y las colisiones físicas son validadas por ticks del servidor cada 50ms.</p>
    `
  },
  {
    id: "roadmap_desarrollo",
    title: "6. Roadmap y Plan de Desarrollo",
    category: "roadmap",
    summary: "Fases del proyecto, hitos de desarrollo y plan de lanzamiento.",
    content: `
      <h2>6.1 Fases del Proyecto</h2>
      <p>El desarrollo se divide en 4 fases principales a lo largo de un ciclo estimado de 10 meses para un equipo pequeño:</p>
      
      <div class="note-box" style="border-left-color: var(--color-purple);">
        <strong>Fase 1: Prototipo Jugable (Mes 1 - 2)</strong><br>
        Objetivo: Tener la simulación local del mapa, la recolección de éter y oro en funcionamiento y el combate básico de 3 tropas contra 1 torre. Todo usando cubos tridimensionales de marcador de posición (greyboxing).
      </div>

      <div class="note-box" style="border-left-color: var(--color-pink);">
        <strong>Fase 2: Alfa de Red y Servidor (Mes 3 - 5)</strong><br>
        Objetivo: Conectar dos clientes de prueba mediante internet. Implementar el emparejamiento en base a salas de Redis y el validador de ticks de daño en el servidor para evitar hacks de vida.
      </div>

      <div class="note-box" style="border-left-color: var(--color-gold);">
        <strong>Fase 3: Beta y Contenido (Mes 6 - 8)</strong><br>
        Objetivo: Reemplazar el arte provisional por el definitivo (diseño de personajes neón-fantasía), crear los primeros 10 niveles del modo campaña PvE y lanzar una prueba beta cerrada con 5,000 jugadores para balanceo de estadísticas.
      </div>

      <div class="note-box" style="border-left-color: var(--color-cyan);">
        <strong>Fase 4: Lanzamiento Global e Integraciones (Mes 9 - 10)</strong><br>
        Objetivo: Integrar pasarelas de pago (Apple Pay / Google Play Billing), sistema de Pase de Batalla dinámico y desplegar servidores en múltiples regiones de Azure para garantizar latencias menores a 80ms a nivel mundial.
      </div>
    `
  }
];

// Claves de almacenamiento
const GDD_STORAGE_KEY = "clash_arena_gdd_db";

// Inicializar la base de datos de GDD
function getGddDatabase() {
  const stored = localStorage.getItem(GDD_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(GDD_STORAGE_KEY, JSON.stringify(DEFAULT_GDD_DATABASE));
    return DEFAULT_GDD_DATABASE;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Error al leer la base de datos del GDD de localStorage, restaurando valores por defecto.", e);
    return DEFAULT_GDD_DATABASE;
  }
}

// Guardar base de datos de GDD
function saveGddDatabase(db) {
  localStorage.setItem(GDD_STORAGE_KEY, JSON.stringify(db));
}

// Agregar un nuevo capítulo a la base de datos
function addChapterToDatabase(chapter) {
  const db = getGddDatabase();
  if (!chapter.id) {
    chapter.id = `chapter_${Date.now()}`;
  }
  db.push(chapter);
  saveGddDatabase(db);
  return db;
}

// Actualizar un capítulo existente
function updateChapterInDatabase(updatedChapter) {
  let db = getGddDatabase();
  db = db.map(ch => ch.id === updatedChapter.id ? updatedChapter : ch);
  saveGddDatabase(db);
  return db;
}

// Eliminar un capítulo por ID
function deleteChapterFromDatabase(id) {
  let db = getGddDatabase();
  db = db.filter(ch => ch.id !== id);
  saveGddDatabase(db);
  return db;
}

// Restaurar GDD inicial
function resetGddDatabaseToDefault() {
  localStorage.setItem(GDD_STORAGE_KEY, JSON.stringify(DEFAULT_GDD_DATABASE));
  return DEFAULT_GDD_DATABASE;
}
