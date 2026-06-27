// Base de datos del GDD - Realms of Ruin: 1v1 Clash (Versión de Alta Fidelidad Gráfica y Técnica)
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
        <li><strong>Duelos Rápidos de Alta Intensidad:</strong> Duelos frenéticos de 3 minutos con generación acelerada de recursos en el último minuto y muerte súbita basada en daño.</li>
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
        <svg viewBox="0 0 500 120" width="100%" height="120">
          <defs>
            <linearGradient id="g-purple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#a78bfa" />
              <stop offset="100%" stop-color="#6d28d9" />
            </linearGradient>
            <linearGradient id="g-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#22d3ee" />
              <stop offset="100%" stop-color="#0891b2" />
            </linearGradient>
            <linearGradient id="g-pink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f472b6" />
              <stop offset="100%" stop-color="#db2777" />
            </linearGradient>
          </defs>
          <rect x="35" y="35" width="90" height="50" rx="8" fill="url(#g-purple)" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
          <text x="80" y="65" fill="#fff" font-size="10" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="bold">1. DISEÑAR BASE</text>
          
          <path d="M 125 60 L 160 60" fill="none" stroke="#64748b" stroke-width="2"/>
          
          <rect x="175" y="35" width="100" height="50" rx="8" fill="url(#g-cyan)" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
          <text x="225" y="65" fill="#fff" font-size="10" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="bold">2. DUELO 1v1 (CARTAS)</text>
          
          <path d="M 275 60 L 310 60" fill="none" stroke="#64748b" stroke-width="2"/>
          
          <rect x="325" y="35" width="100" height="50" rx="8" fill="url(#g-pink)" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
          <text x="375" y="65" fill="#fff" font-size="9" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="bold">3. REUNIR RUNAS</text>

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

      <h2>3.2 IA de Unidades: Selección de Objetivos (Targeting)</h2>
      <p>El comportamiento y trayectoria de las tropas desplegadas está regido por un conjunto de reglas deterministas que los jugadores pueden manipular tácticamente:</p>
      <ul>
        <li><strong>Prioridad por Favoritos:</strong> Las unidades tienen un objetivo predefinido. Los <em>Caballeros de la Muerte</em> y <em>Nigromantes</em> buscan el objetivo enemigo más cercano (unidades o edificios). Sin embargo, ciertas tropas pesadas o de asedio priorizan **únicamente edificios**, ignorando por completo el fuego de las tropas defensoras hasta golpear las estructuras.</li>
        <li><strong>Umbral de Visión (Sight Range):</strong> Cada tropa posee un radio de detección rúnica. Si un enemigo entra en este radio, la tropa fijará su objetivo en él. Si el objetivo sale del radio o es destruido, la tropa reevaluará el mapa para seleccionar el siguiente objetivo más cercano.</li>
        <li><strong>Estrategias de "Pulling" (Tirón):</strong> Los jugadores avanzados aprovechan esta heurística de proximidad. Al colocar una estructura defensiva o tropa barata en el centro del mapa, pueden "atraer" a una tropa atacante pesada enemiga fuera de su carril original, distrayéndola para que sea eliminada por las torres del Ayuntamiento.</li>
      </ul>

      <h2>3.3 Navegación y Evitación de Obstáculos (Pathfinding)</h2>
      <p>Para evitar un coste de procesamiento prohibitivo en dispositivos móviles al calcular rutas en tiempo real con docenas de tropas activas, Realms of Ruin utiliza un sistema híbrido optimizado:</p>
      <ul>
        <li><strong>Campos de Flujo de Carriles (Lane Flow Fields):</strong> El mapa cuenta con vectores de dirección precalculados invisibles instalados en las calles que conducen a los puentes y torres. Las unidades terrestres simplemente leen el vector debajo de sus pies y avanzan en esa dirección, lo que garantiza que sigan las rutas lógicas del mapa sin ejecutar algoritmos complejos como A* en cada tick.</li>
        <li><strong>Fuerzas de Dirección Locales (Steering Behaviors):</strong> Para evitar que las tropas atraviesen muros o se encallen entre ellas, se aplican fuerzas locales de <em>Separación</em> y <em>Evitación</em>. Esto permite que los ejércitos de esqueletos fluyan de forma orgánica alrededor de las esquinas o se empujen sutilmente al cruzar los angostos puentes de la arena.</li>
        <li><strong>Unidades Aéreas:</strong> Las gárgolas e invocaciones voladoras ignoran la grilla de colisiones de tierra y los campos de flujo de carriles, trazando una línea recta (vector directo) hacia su objetivo activo.</li>
      </ul>
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

      <h2>5.2 Consistencia del Servidor: Matemática de Punto Fijo (Fixed-Point Math)</h2>
      <div class="note-box" style="border-left-color: var(--color-tech);">
        <strong>El Desafío de la Sincronización Móvil:</strong> El juego se ejecuta tanto en dispositivos iOS (ARM) como Android (diversos procesadores ARM y x86). Los cálculos matemáticos de punto flotante estándar de los procesadores varían sutilmente a nivel de hardware, lo que provocaría que un Caballero de la Muerte se desplace una fracción de píxel diferente en cada teléfono, causando desincronizaciones críticas del estado de batalla tras unos segundos.
      </div>
      <p>Para resolver esto, Realms of Ruin utiliza un motor físico y matemático de **Punto Fijo (Fixed-Point Math)** en lugar de números flotantes (float). Todas las posiciones, colisiones, rangos de ataque y daño se calculan utilizando enteros puros con una resolución fija (por ejemplo, multiplicando los floats por 1000 internamente). Esto garantiza determinismo puro y absoluto: la simulación matemática de la IA en el servidor y en ambos dispositivos da exactamente el mismo resultado bit por bit.</p>

      <h2>5.3 Diagrama de Flujo de Red (Sincronización Síncrona 1vs1)</h2>
      <p>El siguiente flujo ilustra cómo se coordinan las acciones de cartas, mitigando la latencia en tiempo real sin desincronizar la posición de las unidades:</p>

      <div class="diagram-container">
        <!-- Diagrama Complejo de Sincronización Netcode -->
        <svg viewBox="0 0 700 240" width="100%" height="240" style="background:#090d16; border-radius:12px;">
          <defs>
            <linearGradient id="grad-cyan-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#06b6d4" />
              <stop offset="100%" stop-color="#0891b2" />
            </linearGradient>
            <linearGradient id="grad-purple-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#8b5cf6" />
              <stop offset="100%" stop-color="#6d28d9" />
            </linearGradient>
            <linearGradient id="grad-gray-box" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#1e293b" />
              <stop offset="100%" stop-color="#0f172a" />
            </linearGradient>
          </defs>

          <!-- Cliente 1 (Local) -->
          <rect x="30" y="50" width="160" height="140" rx="8" fill="url(#grad-gray-box)" stroke="#06b6d4" stroke-width="1.5"/>
          <text x="110" y="80" fill="#fff" font-size="12" font-family="'Outfit', sans-serif" font-weight="bold" text-anchor="middle">CLIENTE 1 (Jugador)</text>
          <rect x="45" y="100" width="130" height="30" rx="4" fill="rgba(6, 182, 212, 0.1)" stroke="rgba(6, 182, 212, 0.3)" stroke-width="1"/>
          <text x="110" y="118" fill="#06b6d4" font-size="9" font-family="sans-serif" text-anchor="middle">1. Despliega Carta</text>
          <rect x="45" y="140" width="130" height="30" rx="4" fill="rgba(255, 255, 255, 0.05)"/>
          <text x="110" y="158" fill="#94a3b8" font-size="9" font-family="sans-serif" text-anchor="middle">2. Predicción Visual Local</text>

          <!-- Flecha Cliente 1 -> Servidor -->
          <path d="M 200 95 L 260 95" fill="none" stroke="#06b6d4" stroke-width="2" stroke-dasharray="4 2"/>
          <text x="230" y="85" fill="#06b6d4" font-size="9" text-anchor="middle">JSON Event</text>

          <!-- Servidor Autoritativo -->
          <rect x="270" y="30" width="160" height="180" rx="8" fill="url(#grad-gray-box)" stroke="#8b5cf6" stroke-width="1.5"/>
          <text x="350" y="60" fill="#fff" font-size="12" font-family="'Outfit', sans-serif" font-weight="bold" text-anchor="middle">SERVIDOR (Go/WSS)</text>
          <rect x="285" y="80" width="130" height="40" rx="4" fill="rgba(139, 92, 246, 0.1)" stroke="rgba(139, 92, 246, 0.3)"/>
          <text x="350" y="98" fill="#c084fc" font-size="9" text-anchor="middle" font-weight="bold">3. Simulación Ticks 30Hz</text>
          <text x="350" y="110" fill="#a78bfa" font-size="8" text-anchor="middle">Valida Cenizas y Coordenadas</text>
          <rect x="285" y="140" width="130" height="50" rx="4" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.1)"/>
          <text x="350" y="158" fill="#94a3b8" font-size="8" text-anchor="middle">4. Resuelve Colisión de IA</text>
          <text x="350" y="170" fill="#94a3b8" font-size="8" text-anchor="middle">y Daño de Torres</text>

          <!-- Flecha Servidor -> Cliente 2 -->
          <path d="M 440 95 L 500 95" fill="none" stroke="#8b5cf6" stroke-width="2"/>
          <text x="470" y="85" fill="#8b5cf6" font-size="9" text-anchor="middle">Broadcast</text>
          
          <!-- Flecha Retorno Servidor -> Cliente 1 (Confirmación) -->
          <path d="M 260 145 L 200 145" fill="none" stroke="#2ec4b6" stroke-width="2"/>
          <text x="230" y="160" fill="#2ec4b6" font-size="9" text-anchor="middle">Ack / Ticks</text>

          <!-- Cliente 2 (Rival) -->
          <rect x="510" y="50" width="160" height="140" rx="8" fill="url(#grad-gray-box)" stroke="#cbd5e1" stroke-width="1.5"/>
          <text x="590" y="80" fill="#fff" font-size="12" font-family="'Outfit', sans-serif" font-weight="bold" text-anchor="middle">CLIENTE 2 (Oponente)</text>
          <rect x="525" y="100" width="130" height="30" rx="4" fill="rgba(255,255,255,0.05)"/>
          <text x="590" y="118" fill="#cbd5e1" font-size="9" text-anchor="middle">5. Recibe Spawn</text>
          <rect x="525" y="140" width="130" height="30" rx="4" fill="rgba(139, 92, 246, 0.1)" stroke="rgba(139, 92, 246, 0.3)"/>
          <text x="590" y="158" fill="#a78bfa" font-size="9" text-anchor="middle">6. Renderiza Spawn e IA</text>
        </svg>
      </div>
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
        <strong>Fase 4: Lanzamiento Global e Integraciones (Meses 9-10)</strong><br>
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
              <defs>
                <linearGradient id="grad-dk-shield" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#1e293b" />
                  <stop offset="100%" stop-color="#0b1329" />
                </linearGradient>
                <linearGradient id="grad-cyan-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#22d3ee" />
                  <stop offset="100%" stop-color="#06b6d4" />
                </linearGradient>
              </defs>
              <!-- Espadas cruzadas de fondo -->
              <path d="M15 85 L85 15 M20 15 L80 85" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
              <path d="M15 85 L22 78 M85 15 L78 22 M20 15 L27 22 M80 85 L73 78" stroke="#06b6d4" stroke-width="4" stroke-linecap="round"/>
              <!-- Escudo Principal -->
              <path d="M25 20 Q50 15 75 20 Q75 60 50 85 Q25 60 25 20 Z" fill="url(#grad-dk-shield)" stroke="#06b6d4" stroke-width="2"/>
              <!-- Símbolo Rúnico Espectral -->
              <path d="M50 30 L50 65 M40 40 L60 40 M42 55 L58 55" fill="none" stroke="url(#grad-cyan-glow)" stroke-width="3" stroke-linecap="round"/>
              <!-- Ojos brillantes en el escudo -->
              <circle cx="43" cy="35" r="2.5" fill="#fff" filter="drop-shadow(0 0 3px #00ffff)"/>
              <circle cx="57" cy="35" r="2.5" fill="#fff" filter="drop-shadow(0 0 3px #00ffff)"/>
            </svg>
          </div>
          <div class="gdd-entity-info">
            <h4>Caballero de la Muerte</h4>
            <p class="gdd-entity-role">Cuerpo a Cuerpo • Tanque</p>
            <p class="gdd-entity-desc">Clad en armadura rúnica pesada. Ataca lentamente con un mandoble impregnado de fuego azul y bloquea proyectiles.</p>
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
              <defs>
                <linearGradient id="grad-bow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#fbbf24" />
                  <stop offset="100%" stop-color="#d97706" />
                </linearGradient>
              </defs>
              <!-- Cuerda del arco tensa -->
              <line x1="25" y1="25" x2="25" y2="75" stroke="#fef08a" stroke-width="1.5" opacity="0.6"/>
              <!-- Cuerpo del Arco de Hueso Rúnico -->
              <path d="M 25 25 Q 75 50 25 75" fill="none" stroke="url(#grad-bow)" stroke-width="4.5" stroke-linecap="round" filter="drop-shadow(0 0 5px rgba(245,158,11,0.4))"/>
              <!-- Flecha de Energía Azul -->
              <line x1="15" y1="50" x2="65" y2="50" stroke="#22d3ee" stroke-width="3" stroke-linecap="round" filter="drop-shadow(0 0 4px #00ffff)"/>
              <polygon points="65,46 75,50 65,54" fill="#22d3ee"/>
              <path d="M12 43 L20 50 L12 57" fill="none" stroke="#fbbf24" stroke-width="2"/>
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
              <defs>
                <linearGradient id="grad-hood" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#4c1d95" />
                  <stop offset="100%" stop-color="#1e1b4b" />
                </linearGradient>
              </defs>
              <!-- Aura mágica verde de fondo -->
              <circle cx="50" cy="50" r="35" fill="none" stroke="#4ade80" stroke-width="2" stroke-dasharray="8 4" opacity="0.5"/>
              <!-- Capucha -->
              <path d="M 25 75 Q 50 15 75 75 Q 50 85 25 75 Z" fill="url(#grad-hood)" stroke="#8b5cf6" stroke-width="2"/>
              <!-- Rostro Calavera Sombría -->
              <path d="M 38 68 Q 50 48 62 68 Q 50 78 38 68 Z" fill="#f8fafc" stroke="#475569" stroke-width="1"/>
              <!-- Cuencas de ojos oscuras con fuego verde -->
              <circle cx="44" cy="62" r="4" fill="#0f172a"/>
              <circle cx="56" cy="62" r="4" fill="#0f172a"/>
              <circle cx="44" cy="62" r="1.5" fill="#4ade80" filter="drop-shadow(0 0 2px #22c55e)"/>
              <circle cx="56" cy="62" r="1.5" fill="#4ade80" filter="drop-shadow(0 0 2px #22c55e)"/>
              <!-- Nariz y Dientes -->
              <polygon points="50,66 48,70 52,70" fill="#0f172a"/>
              <path d="M 45 72 L 55 72" stroke="#475569" stroke-width="1.5"/>
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
              <defs>
                <linearGradient id="grad-goblin" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#ec4899" />
                  <stop offset="100%" stop-color="#9d174d" />
                </linearGradient>
              </defs>
              <!-- Orejas puntiagudas alargadas de fondo -->
              <path d="M 10 38 Q 30 40 40 46 L 30 60 Z" fill="url(#grad-goblin)" stroke="#f472b6" stroke-width="1"/>
              <path d="M 90 38 Q 70 40 60 46 L 70 60 Z" fill="url(#grad-goblin)" stroke="#f472b6" stroke-width="1"/>
              <!-- Cara del Duende -->
              <path d="M30 46 Q50 35 70 46 Q72 65 50 78 Q28 65 30 46 Z" fill="url(#grad-goblin)" stroke="#9d174d" stroke-width="2"/>
              <!-- Ojos Amarillos Furtivos -->
              <path d="M 36 50 Q 42 45 46 52" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
              <path d="M 64 50 Q 58 45 54 52" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
              <circle cx="42" cy="51" r="1.5" fill="#fff"/>
              <circle cx="58" cy="51" r="1.5" fill="#fff"/>
              <!-- Símbolo de éter robado -->
              <path d="M 40 74 Q 50 68 60 74 Q 70 90 50 92 Q 30 90 40 74 Z" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
              <circle cx="50" cy="83" r="3" fill="#22d3ee" filter="drop-shadow(0 0 3px #00ffff)"/>
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
              <defs>
                <linearGradient id="grad-wing" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#475569" />
                  <stop offset="100%" stop-color="#1e293b" />
                </linearGradient>
              </defs>
              <!-- Alas de murciélago extendidas -->
              <path d="M 50 45 Q 25 15 10 40 Q 30 45 50 50 Z" fill="url(#grad-wing)" stroke="#64748b" stroke-width="1.5"/>
              <path d="M 50 45 Q 75 15 90 40 Q 70 45 50 50 Z" fill="url(#grad-wing)" stroke="#64748b" stroke-width="1.5"/>
              <!-- Cola puntiaguda -->
              <path d="M 50 50 L 50 82 L 45 78 L 50 82 L 55 78" stroke="#334155" stroke-width="2" stroke-linecap="round"/>
              <!-- Cuerpo central de la Gárgola -->
              <circle cx="50" cy="45" r="14" fill="#334155" stroke="#475569" stroke-width="2"/>
              <!-- Ojos de Fuego Naranja -->
              <polygon points="44,43 48,41 46,45" fill="#f97316" filter="drop-shadow(0 0 2px #f97316)"/>
              <polygon points="56,43 52,41 54,45" fill="#f97316" filter="drop-shadow(0 0 2px #f97316)"/>
              <!-- Cuernos -->
              <path d="M 44 35 L 40 22 L 48 32" fill="#334155" stroke="#475569" stroke-width="1.5"/>
              <path d="M 56 35 L 60 22 L 52 32" fill="#334155" stroke="#475569" stroke-width="1.5"/>
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
              <defs>
                <linearGradient id="grad-fire" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stop-color="#b91c1c" />
                  <stop offset="60%" stop-color="#ef4444" />
                  <stop offset="100%" stop-color="#f43f5e" />
                </linearGradient>
              </defs>
              <!-- Aura de fuego gótica -->
              <path d="M 20 65 C 20 20, 80 20, 80 65 C 80 85, 20 85, 20 65 Z" fill="none" stroke="url(#grad-fire)" stroke-width="2" opacity="0.3" filter="blur(2px)"/>
              <!-- Gran Corona de Obsidiana -->
              <polygon points="25,35 32,8 43,24 50,4 57,24 68,8 75,35 50,45" fill="#111827" stroke="#ef4444" stroke-width="1.5"/>
              <circle cx="50" cy="18" r="2" fill="#ef4444" filter="drop-shadow(0 0 3px #ef4444)"/>
              <!-- Cráneo de Fuego del Rey -->
              <path d="M34 50 Q50 36 66 50 Q66 70 50 82 Q34 70 34 50 Z" fill="url(#grad-fire)" stroke="#4c0519" stroke-width="2"/>
              <!-- Cuencas oscuras con fuego de alma roja -->
              <circle cx="44" cy="54" r="5" fill="#000"/>
              <circle cx="56" cy="54" r="5" fill="#000"/>
              <polygon points="44,52 46,56 42,56" fill="#fff" filter="drop-shadow(0 0 3px #f43f5e)"/>
              <polygon points="56,52 54,56 58,56" fill="#fff" filter="drop-shadow(0 0 3px #f43f5e)"/>
            </svg>
          </div>
          <div class="gdd-entity-info">
            <h4>Señor de la Ceniza</h4>
            <p class="gdd-entity-role">Jefe de Área • Nigromante Supremo</p>
            <p class="gdd-entity-desc">El comandante supremo de la campaña. Dispara proyectiles oscuros y resucita esqueletos cada 15 segundos.</p>
            <div class="gdd-entity-stats">
              <span><strong>Dificultad:</strong> Extrema</span>
              <span><strong>HP:</strong> 8,500</span>
              <span><strong>Daño:</strong> 180/s (Área)</span>
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
