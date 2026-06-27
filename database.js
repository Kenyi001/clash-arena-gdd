// Base de datos del Documento de Diseño del Juego (GDD) - Realms of Ruin: 1v1 Clash
const DEFAULT_GDD_DATABASE = [
  {
    id: "vision_general",
    title: "1. Visión General y Concepto",
    category: "concept",
    summary: "El concepto básico de Realms of Ruin: estrategia 1v1, control indirecto y temática de fantasía oscura gótica.",
    content: `
      <h2>1.1 Resumen del Proyecto</h2>
      <p><strong>Realms of Ruin: 1v1 Clash</strong> es un juego de estrategia en tiempo real para dispositivos móviles que fusiona la personalización táctica de bases de los RTS con la velocidad y combate dinámico de los juegos de cartas en arena. En combates 1v1 síncronos de 3 minutos, los jugadores despliegan ejércitos para destruir la base del rival mientras sus propias defensas pre-construidas intentan contener el asalto.</p>
      
      <div class="note-box" style="border-left-color: var(--color-concept);">
        <strong>Estética Visual:</strong> El juego se enmarca en la <em>Fantasía Oscura y Rúnica</em>. Los mapas están compuestos por ruinas góticas, cementerios olvidados, ríos de fuego azul y defensas alimentadas por almas y runas nigrománticas.
      </div>

      <h2>1.2 Pilares de Diseño</h2>
      <ul>
        <li><strong>Control Indirecto y Despliegue Táctico:</strong> El combate se realiza mediante cartas. El jugador no mueve las unidades individualmente; en su lugar, las despliega estratégicamente en zonas permitidas del mapa y la IA de las tropas las guía hacia sus objetivos favoritos.</li>
        <li><strong>Base Pre-construida Estratégica:</strong> Antes de la batalla, el jugador diseña el plano de su base (colocación de Torres Rúnicas, Murallas, Cañones Necróticos y Trampas de Espinas). Durante la partida, esta base se defiende de forma autónoma.</li>
        <li><strong>Duelos Rápidos de Alta Intensidad:</strong> Partidas frenéticas de 3 minutos con generación acelerada de recursos en el último minuto y muerte súbita basada en daño.</li>
      </ul>

      <h2>1.3 Público Objetivo</h2>
      <p>Jugadores de móviles competitivos que disfrutan de títulos como Clash Royale y Clash of Clans, pero que buscan una ambientación más madura, oscura y gótica, con un nivel superior de personalización defensiva antes del combate.</p>
    `
  },
  {
    id: "bucle_principal",
    title: "2. Bucle de Juego Principal (Core Loop)",
    category: "gameplay",
    summary: "Construcción defensiva pre-partida, combate con mazo de cartas y ciclo de recompensas.",
    content: `
      <h2>2.1 El Ciclo del Comandante de las Sombras</h2>
      <p>El bucle de juego principal entrelaza la gestión de la base y la colección de cartas de combate:</p>
      
      <div class="diagram-container">
        <!-- Diagrama SVG del Bucle de Juego -->
        <svg viewBox="0 0 500 120" width="100%" height="120">
          <rect x="35" y="35" width="90" height="50" rx="8" fill="#0f172a" stroke="#8338ec" stroke-width="2"/>
          <text x="80" y="65" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">1. DISEÑAR BASE</text>
          
          <path d="M 125 60 L 160 60" fill="none" stroke="#64748b" stroke-width="2"/>
          
          <rect x="175" y="35" width="100" height="50" rx="8" fill="#0f172a" stroke="#2ec4b6" stroke-width="2"/>
          <text x="225" y="65" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">2. DUELO 1v1 (CARTAS)</text>
          
          <path d="M 275 60 L 310 60" fill="none" stroke="#64748b" stroke-width="2"/>
          
          <rect x="325" y="35" width="100" height="50" rx="8" fill="#0f172a" stroke="#ff006e" stroke-width="2"/>
          <text x="375" y="65" fill="#fff" font-size="10" text-anchor="middle" font-weight="bold">3. COFRES Y RUNAS</text>

          <path d="M 425 60 L 450 60 A 10 10 0 0 1 460 70 L 460 100 A 10 10 0 0 1 450 110 L 50 110 A 10 10 0 0 1 40 100 L 40 70 A 10 10 0 0 1 50 60 L 75 60" fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="4 4"/>
        </svg>
      </div>

      <h2>2.2 Economía de Combate (Éter y Ceniza)</h2>
      <p>Dentro de cada duelo en la arena, la colocación de tropas está limitada por dos factores económicos:</p>
      
      <table class="stats-table">
        <tr>
          <td class="stat-label">Cenizas de Almas</td>
          <td class="stat-value">Recurso básico generado de forma pasiva por segundo durante el duelo. Se consume para invocar unidades de tu mazo de cartas (ej: Esqueletos, Caballeros de la Muerte).</td>
        </tr>
        <tr>
          <td class="stat-label">Cristales de Éter Oscuro</td>
          <td class="stat-value">Se extraen en zonas de conflicto del mapa. Permiten lanzar hechizos devastadores (ej: Lluvia de Fuego Azul) o invocar héroes caídos.</td>
        </tr>
      </table>

      <h2>2.3 Colección y Mejoras</h2>
      <p>Los jugadores coleccionan cartas de tropas y hechizos, así como planos de defensas para su base. Al abrir cofres obtenidos en PvP, adquieren **Runas de Sangre** para subir el nivel de sus estructuras o tropas, incrementando el daño de sus cañones góticos y los puntos de vida de sus guerreros espectrales.</p>
    `
  },
  {
    id: "pvp_combate",
    title: "3. Sistema Multijugador (PvP)",
    category: "pvp_pve",
    summary: "Detalles del sistema de combate 1vs1, zonas de invocación y reglas del asalto.",
    content: `
      <h2>3.1 Reglas del Enfrentamiento 1vs1</h2>
      <p>Al iniciar la partida, el mapa se divide en dos campos simétricos. En tu mitad se renderiza tu base pre-diseñada. En la mitad superior se encuentra la base del oponente. Un río de energía espiritual separa ambos territorios, conectados únicamente por dos puentes rúnicos.</p>

      <div class="note-box" style="border-left-color: var(--color-pvp);">
        <strong>Mecánica de Despliegue:</strong> Solo puedes invocar tropas dentro de tu "Zona de Despliegue" autorizada (que inicialmente cubre tu mitad de mapa). A medida que destruyes torres defensivas enemigas, la zona de invocación se expande en el territorio enemigo, permitiéndote atacar más cerca del Ayuntamiento rival.
      </div>

      <h2>3.2 Dinámica del Duelo</h2>
      <ul>
        <li><strong>Fase 1 (0:00 - 2:00):</strong> Los jugadores lanzan tropas de asalto en los carriles. Las estructuras defensivas de cada base disparan automáticamente a cualquier enemigo que entre en su rango.</li>
        <li><strong>Fase 2: Eclipse Rúnico (2:00 - 3:00):</strong> La regeneración de Cenizas se duplica. El cielo se oscurece y se permite el despliegue de Héroes Legendarios en la arena.</li>
        <li><strong>Fase 3: Muerte Súbita (3:00 - 4:00):</strong> Si ambos Ayuntamientos siguen en pie, el jugador cuyas estructuras hayan recibido más daño acumulado pierde la partida.</li>
      </ul>

      <h2>3.3 Emparejamiento (Matchmaking)</h2>
      <p>El matchmaking síncrono calcula el emparejamiento basándose en el nivel del **Cáliz de Almas** (nivel de cuenta) y las **Copas de Sangre** (puntos de rango). Si el tiempo en cola supera los 15 segundos, el rango de búsqueda de copas se expande para asegurar una partida rápida.</p>
    `
  },
  {
    id: "pve_campana",
    title: "4. Modo Campaña (PvE)",
    category: "pvp_pve",
    summary: "Asaltos a catacumbas de jefes nigrománticos y desafíos de rompecabezas tácticos.",
    content: `
      <h2>4.1 Campaña: "Las Tierras Baldías del Caos"</h2>
      <p>Una campaña interactiva para un jugador diseñada para enseñar estrategias de contra-ataque y farmear runas de mejora. El jugador asedia castillos oscuros pre-diseñados con configuraciones defensivas extremas gobernadas por la inteligencia artificial.</p>
      
      <h3>Modos de Desafío PvE:</h3>
      <ul>
        <li><strong>Purgatorio de Jefes:</strong> Batallas donde la base enemiga está defendida por un Héroe Jefe masivo (ej: El Rey de las Cenizas) que cuenta con habilidades activas que afectan a toda la arena de juego.</li>
        <li><strong>Defensa de Reliquia:</strong> En lugar de asediar, el jugador debe defender una reliquia en el centro del mapa de oleadas infinitas de la plaga durante 4 minutos.</li>
        <li><strong>Puzzles Rúnicos:</strong> Desafíos con cartas fijas en mano y coste de cenizas limitado. El jugador debe encontrar la combinación de despliegue exacta para destruir una torre defensiva específica.</li>
      </ul>
    `
  },
  {
    id: "pila_tecnologica",
    title: "5. Pila Tecnológica y Arquitectura",
    category: "tech",
    summary: "Netcode síncrono para despliegue de cartas, bases de datos y simulación en servidor.",
    content: `
      <h2>5.1 Arquitectura del Servidor y Cliente</h2>
      <p>Para garantizar una sincronización fluida del despliegue de cartas y el movimiento de la inteligencia artificial de las tropas, se propone la siguiente pila:</p>
      
      <table class="stats-table">
        <tr>
          <td class="stat-label">Motor de Juego (Cliente)</td>
          <td class="stat-value"><strong>Unity Engine (C#)</strong> con canalizaciones de renderizado ligero (URP). Esencial para lograr shaders de fuego azul, niebla espiritual y modelado gótico optimizados para dispositivos móviles antiguos.</td>
        </tr>
        <tr>
          <td class="stat-label">Netcode de Combate</td>
          <td class="stat-value">Servidor de simulación autoritativa basado en <strong>Go (Golang)</strong>. Dado que las tropas se mueven de forma autónoma tras ser desplegadas, el servidor solo necesita recibir el evento de "Carta Desplegada en Coordenadas X/Y" y simular el movimiento de la IA de forma idéntica en ambos clientes con sincronización de ticks de 30Hz.</td>
        </tr>
        <tr>
          <td class="stat-label">Matchmaking y Colas</td>
          <td class="stat-value"><strong>Redis</strong> y microservicios en Node.js que manejan el registro de emparejamientos dinámicos de duelos rápidos.</td>
        </tr>
        <tr>
          <td class="stat-label">Base de Datos</td>
          <td class="stat-value"><strong>PostgreSQL</strong> para almacenar de forma segura las plantillas de base de los usuarios, niveles de cartas del mazo e historial de compras.</td>
        </tr>
      </table>
    `
  },
  {
    id: "roadmap_desarrollo",
    title: "6. Roadmap y Plan de Desarrollo",
    category: "roadmap",
    summary: "Línea de tiempo de producción del juego y fases de balanceo artístico.",
    content: `
      <h2>6.1 Hitos del Proyecto</h2>
      <p>El plan de desarrollo de Realms of Ruin contempla 10 meses de trabajo estructurado:</p>
      
      <div class="note-box" style="border-left-color: var(--color-roadmap);">
        <strong>Fase 1: Prototipo Mecánico (Meses 1-2)</strong><br>
        Implementar la grilla de diseño de bases, la interfaz de cartas básica, y las físicas locales del despliegue de tropas de combate cuerpo a cuerpo y rango.
      </div>
      
      <div class="note-box" style="border-left-color: var(--color-pvp);">
        <strong>Fase 2: Red y Ticks de Servidor (Meses 3-5)</strong><br>
        Implementación del servidor autoritativo de combate en Go y sincronización de la IA de tropas bajo condiciones de red inestables (compensación de lag).
      </div>
      
      <div class="note-box" style="border-left-color: var(--color-gameplay);">
        <strong>Fase 3: Dirección Artística Gótica (Meses 6-8)</strong><br>
        Creación de modelados 3D y texturas rúnicas, efectos de partículas de fuego azul nigromántico, efectos de sonido y música orquestal oscura. Balance de estadísticas de las 12 cartas iniciales.
      </div>
      
      <div class="note-box" style="border-left-color: var(--color-concept);">
        <strong>Fase 4: Lanzamiento y Tienda (Meses 9-10)</strong><br>
        Integración de pasarelas de pago, sistema de Pase de Batalla de la Temporada de las Cenizas, y despliegue final en la infraestructura global de Azure.
      </div>
    `
  },
  {
    id: "catalogo_unidades",
    title: "7. Catálogo de Tropas y Enemigos",
    category: "gameplay",
    summary: "Fichas técnicas y estadísticas del ejército espectral del jugador y los esbirros oscuros del PvE.",
    content: `
      <h2>7.1 Ejércitos Espectrales (Temática Rúnica y Gótica)</h2>
      <p>Las tropas y enemigos en Realms of Ruin están diseñados bajo la estética de magia nigromántica, almas en pena y fuego rúnico. A continuación se presentan las cartas de tropas básicas y los enemigos de la campaña PvE:</p>

      <h3>Cartas de Tropas Básicas (Jugador)</h3>
      <div class="gdd-entity-grid">
        <!-- Tarjeta 1: Caballero de la Muerte -->
        <div class="gdd-entity-card troop">
          <div class="gdd-entity-visual">
            <svg viewBox="0 0 100 100" width="80" height="80">
              <circle cx="50" cy="50" r="40" fill="#2ec4b6" opacity="0.15"/>
              <!-- Casco de Caballero Oscuro -->
              <rect x="35" y="30" width="30" height="40" rx="5" fill="#1e293b" stroke="#fff" stroke-width="2"/>
              <path d="M40 45 L60 45 M50 45 L50 65" stroke="#fff" stroke-width="2"/>
              <!-- Ojos de Fuego Azul -->
              <circle cx="43" cy="40" r="2" fill="#00ffff"/>
              <circle cx="57" cy="40" r="2" fill="#00ffff"/>
            </svg>
          </div>
          <div class="gdd-entity-info">
            <h4>Caballero de la Muerte</h4>
            <p class="gdd-entity-role">Cuerpo a Cuerpo • Tanque</p>
            <p class="gdd-entity-desc">Clad en armadura rúnica pesada. Ignora el daño leve y ataca lentamente con un mandoble de fuego azul.</p>
            <div class="gdd-entity-stats">
              <span><strong>Costo:</strong> 4 Cenizas</span>
              <span><strong>HP:</strong> 1,100</span>
              <span><strong>Daño:</strong> 75/s</span>
            </div>
          </div>
        </div>
        
        <!-- Tarjeta 2: Ballestera Espectral -->
        <div class="gdd-entity-card troop">
          <div class="gdd-entity-visual">
            <svg viewBox="0 0 100 100" width="80" height="80">
              <circle cx="50" cy="50" r="40" fill="#ffb703" opacity="0.15"/>
              <!-- Arco con flecha rúnica -->
              <path d="M 30 70 A 30 30 0 0 1 70 30" fill="none" stroke="#ffb703" stroke-width="3"/>
              <path d="M 30 30 L 70 70 M 60 70 L 70 70 L 70 60" fill="none" stroke="#fff" stroke-width="2"/>
            </svg>
          </div>
          <div class="gdd-entity-info">
            <h4>Ballestera Espectral</h4>
            <p class="gdd-entity-role">Rango • Daño Continuo</p>
            <p class="gdd-entity-desc">Una arquera incorpórea que dispara saetas cargadas de energía fría. Puede atacar a unidades aéreas.</p>
            <div class="gdd-entity-stats">
              <span><strong>Costo:</strong> 3 Cenizas</span>
              <span><strong>HP:</strong> 310</span>
              <span><strong>Daño:</strong> 42/s</span>
            </div>
          </div>
        </div>

        <!-- Tarjeta 3: Nigromante de la Plaga -->
        <div class="gdd-entity-card troop">
          <div class="gdd-entity-visual">
            <svg viewBox="0 0 100 100" width="80" height="80">
              <circle cx="50" cy="50" r="40" fill="#8338ec" opacity="0.15"/>
              <!-- Capucha y Calavera -->
              <path d="M 30 75 Q 50 20 70 75 Z" fill="#1e1b4b" stroke="#8338ec" stroke-width="2"/>
              <circle cx="50" cy="55" r="10" fill="#f1f5f9"/>
              <circle cx="46" cy="53" r="2.5" fill="#000"/>
              <circle cx="54" cy="53" r="2.5" fill="#000"/>
            </svg>
          </div>
          <div class="gdd-entity-info">
            <h4>Nigromante de la Plaga</h4>
            <p class="gdd-entity-role">Rango • Invocador</p>
            <p class="gdd-entity-desc">Lanza esferas de veneno y resucita a dos pequeños esqueletos de combate cada 8 segundos.</p>
            <div class="gdd-entity-stats">
              <span><strong>Costo:</strong> 5 Cenizas</span>
              <span><strong>HP:</strong> 480</span>
              <span><strong>Daño:</strong> 55/s</span>
            </div>
          </div>
        </div>
      </div>

      <h3>Enemigos del Caos (Campaña PvE)</h3>
      <div class="gdd-entity-grid">
        <!-- Tarjeta 4: Duende Saqueador de Tumbas -->
        <div class="gdd-entity-card enemy">
          <div class="gdd-entity-visual">
            <svg viewBox="0 0 100 100" width="80" height="80">
              <circle cx="50" cy="50" r="40" fill="#ff006e" opacity="0.15"/>
              <!-- Orejas de elfo y saco de botín -->
              <path d="M 20 40 L 40 45 L 35 60 L 15 50 Z" fill="#ff006e"/>
              <path d="M 80 40 L 60 45 L 65 60 L 85 50 Z" fill="#ff006e"/>
              <circle cx="50" cy="60" r="15" fill="#7c2d12"/>
            </svg>
          </div>
          <div class="gdd-entity-info">
            <h4>Duende Saqueador</h4>
            <p class="gdd-entity-role">Veloz • Ladrón de Éter</p>
            <p class="gdd-entity-desc">Se escabulle en las sombras. Ignora a tus guerreros y corre directamente a robar el éter acumulado de tus Extractores.</p>
            <div class="gdd-entity-stats">
              <span><strong>Dificultad:</strong> Baja</span>
              <span><strong>Velocidad:</strong> Muy Rápida</span>
              <span><strong>Objetivo:</strong> Almacenes</span>
            </div>
          </div>
        </div>

        <!-- Tarjeta 5: Gargola de Piedra -->
        <div class="gdd-entity-card enemy">
          <div class="gdd-entity-visual">
            <svg viewBox="0 0 100 100" width="80" height="80">
              <circle cx="50" cy="50" r="40" fill="#3a86c8" opacity="0.15"/>
              <!-- Alas de gárgola de piedra -->
              <path d="M 15 45 L 50 30 L 85 45 L 50 65 Z" fill="#475569" stroke="#fff" stroke-width="1.5"/>
              <circle cx="50" cy="45" r="12" fill="#334155"/>
            </svg>
          </div>
          <div class="gdd-entity-info">
            <h4>Gárgola de Piedra</h4>
            <p class="gdd-entity-role">Aéreo • Hostigador</p>
            <p class="gdd-entity-desc">Una gárgola voladora tallada en granito. Escupe fuego fatuo azul y es inmune a las trampas terrestres.</p>
            <div class="gdd-entity-stats">
              <span><strong>Dificultad:</strong> Media</span>
              <span><strong>HP:</strong> 550</span>
              <span><strong>Daño:</strong> 50/s</span>
            </div>
          </div>
        </div>

        <!-- Tarjeta 6: Señor de la Ceniza (Jefe) -->
        <div class="gdd-entity-card enemy">
          <div class="gdd-entity-visual">
            <svg viewBox="0 0 100 100" width="80" height="80">
              <circle cx="50" cy="50" r="40" fill="#ff4d4d" opacity="0.15"/>
              <!-- Corona de Ceniza y Fuego -->
              <polygon points="25,35 35,10 50,25 65,10 75,35 50,45" fill="#f43f5e" stroke="#fff" stroke-width="2"/>
              <path d="M30 65 Q50 85 70 65 L60 45 L40 45 Z" fill="#4c0519"/>
            </svg>
          </div>
          <div class="gdd-entity-info">
            <h4>Señor de la Ceniza</h4>
            <p class="gdd-entity-role">Jefe de Área • Nigromante Supremo</p>
            <p class="gdd-entity-desc">El guardián de las catacumbas finales. Invoca periódicamente lluvias de fuego azul que dañan a tus tropas en toda la arena.</p>
            <div class="gdd-entity-stats">
              <span><strong>Dificultad:</strong> Extrema</span>
              <span><strong>HP:</strong> 8,500</span>
              <span><strong>Daño:</strong> 160/s (Área)</span>
            </div>
          </div>
        </div>
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
