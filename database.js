// Base de datos de "Clash of Realms" - Biblia del RTS
const DEFAULT_DATABASE = [
  // --- EDIFICIOS ---
  {
    id: "edificio_ayuntamiento",
    name: "Ayuntamiento",
    category: "buildings",
    subcategory: "principal",
    description: "El corazón de tu imperio. Mejorar el Ayuntamiento desbloquea nuevas estructuras, defensas y tropas.",
    stats: {
      "Puntos de vida": "8,500",
      "Nivel Máximo": "15",
      "Alcance de Defensa": "10 casillas",
      "Tipo de daño": "Objetivos Múltiples (Giga Tesla)",
      "Recurso de Mejora": "Oro"
    },
    lore: "El Ayuntamiento no solo almacena tus secretos más valiosos, sino que a partir del nivel 12 se equipa con una Giga Tesla oculta que electrocuta a los invasores y estalla en una densa nube de veneno al ser destruido.",
    icon: `<svg viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <linearGradient id="grad-ayto" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF5E3A" />
          <stop offset="50%" stop-color="#FF2A68" />
          <stop offset="100%" stop-color="#7B1FA2" />
        </linearGradient>
        <linearGradient id="roof-ayto" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFD700" />
          <stop offset="100%" stop-color="#FF8C00" />
        </linearGradient>
      </defs>
      <!-- Base -->
      <rect x="15" y="45" width="70" height="45" rx="8" fill="url(#grad-ayto)" stroke="#FFE082" stroke-width="3"/>
      <!-- Techo -->
      <polygon points="10,48 50,15 90,48" fill="url(#roof-ayto)" stroke="#FFE082" stroke-width="3" />
      <polygon points="30,30 50,15 70,30" fill="#FFE082" opacity="0.4"/>
      <!-- Puerta -->
      <rect x="40" y="65" width="20" height="25" rx="4" fill="#3E2723" stroke="#FFE082" stroke-width="2"/>
      <circle cx="45" cy="77" r="2" fill="#FFD700"/>
      <!-- Ventanas -->
      <rect x="25" y="55" width="10" height="10" rx="2" fill="#E0F7FA" stroke="#FFE082" stroke-width="1.5"/>
      <rect x="65" y="55" width="10" height="10" rx="2" fill="#E0F7FA" stroke="#FFE082" stroke-width="1.5"/>
      <!-- Escudo / Corona superior -->
      <polygon points="45,10 50,2 55,10 50,7" fill="#FFD700"/>
    </svg>`
  },
  {
    id: "edificio_canon",
    name: "Cañón",
    category: "buildings",
    subcategory: "defensa",
    description: "Una defensa básica terrestre con gran cadencia de fuego pero de corto alcance.",
    stats: {
      "Daño por segundo": "120",
      "Puntos de vida": "1,400",
      "Alcance": "9 casillas",
      "Objetivo": "Tierra",
      "Velocidad de ataque": "0.8s"
    },
    lore: "Los cañones son las primeras defensas que cualquier comandante instala. Baratos, fiables y devastadores contra tropas terrestres individuales como bárbaros o gigantes. ¡No olvides mejorarlos para atravesar armaduras gruesas!",
    icon: `<svg viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <linearGradient id="grad-canon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#455A64" />
          <stop offset="100%" stop-color="#212121" />
        </linearGradient>
        <linearGradient id="grad-bronze" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#CD7F32" />
          <stop offset="100%" stop-color="#8B4513" />
        </linearGradient>
      </defs>
      <!-- Base de Piedra -->
      <rect x="20" y="70" width="60" height="20" rx="5" fill="#78909C" stroke="#37474F" stroke-width="2"/>
      <rect x="28" y="60" width="44" height="12" fill="#455A64" stroke="#37474F" stroke-width="2"/>
      <!-- Soporte Dorado/Bronce -->
      <ellipse cx="50" cy="55" rx="18" ry="12" fill="url(#grad-bronze)" stroke="#37474F" stroke-width="2"/>
      <!-- Cañón -->
      <g transform="rotate(-25 50 45)">
        <rect x="35" y="30" width="30" height="30" rx="3" fill="url(#grad-canon)" stroke="#212121" stroke-width="2"/>
        <rect x="32" y="24" width="36" height="6" fill="#FFD700" stroke="#8B4513" stroke-width="1.5"/>
        <circle cx="50" cy="30" r="10" fill="#212121"/>
      </g>
    </svg>`
  },
  {
    id: "edificio_extractor",
    name: "Extractor de Elixir",
    category: "buildings",
    subcategory: "recursos",
    description: "Extrae el elixir místico del subsuelo profundo y lo almacena temporalmente.",
    stats: {
      "Producción por hora": "3,500",
      "Capacidad de almacén": "75,000",
      "Puntos de vida": "980",
      "Tiempo de mejora": "12 horas"
    },
    lore: "El elixir fluye por las venas del reino. Colocar extractores en puntos estratégicos garantiza el suministro para entrenar tus tropas y mejorar tus laboratorios. ¡Asegúrate de recolectarlo antes de que te ataquen!",
    icon: `<svg viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <linearGradient id="grad-elixir" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#E040FB" />
          <stop offset="100%" stop-color="#AA00FF" />
        </linearGradient>
      </defs>
      <!-- Base Metálica -->
      <path d="M 20 85 L 80 85 L 70 50 L 30 50 Z" fill="#90A4AE" stroke="#37474F" stroke-width="2"/>
      <!-- Contenedor de Cristal -->
      <rect x="35" y="25" width="30" height="30" rx="15" fill="none" stroke="#ECEFF1" stroke-width="33" opacity="0.1"/>
      <rect x="35" y="25" width="30" height="30" rx="15" fill="none" stroke="#ECEFF1" stroke-width="3"/>
      <!-- Elixir Líquido -->
      <rect x="37" y="35" width="26" height="18" rx="8" fill="url(#grad-elixir)"/>
      <!-- Tubería de bronce superior -->
      <path d="M 50 15 L 50 25 M 42 15 L 58 15" fill="none" stroke="#FFB300" stroke-width="3" stroke-linecap="round"/>
      <!-- Burbujitas mágicas -->
      <circle cx="45" cy="40" r="2" fill="#FFF" opacity="0.8"/>
      <circle cx="53" cy="45" r="3" fill="#FFF" opacity="0.6"/>
      <circle cx="48" cy="48" r="1.5" fill="#FFF" opacity="0.9"/>
      <!-- Base inferior -->
      <rect x="15" y="80" width="70" height="10" rx="3" fill="#455A64" stroke="#37474F" stroke-width="2"/>
    </svg>`
  },

  // --- TROPAS ---
  {
    id: "tropa_barbaro",
    name: "Bárbaro",
    category: "troops",
    subcategory: "cuerpo_a_cuerpo",
    description: "Un guerrero intrépido con bigote imponente que confía en sus músculos y su espada para causar estragos.",
    stats: {
      "Daño por golpe": "30",
      "Puntos de vida": "230",
      "Velocidad de movimiento": "16",
      "Espacio en viviendas": "1",
      "Tiempo de entrenamiento": "5s"
    },
    lore: "El bárbaro es la columna vertebral de cualquier ejército. No tiene un objetivo favorito; simplemente atacará el edificio más cercano con una furia implacable y gritos ensordecedores. ¡Júntalos en hordas para abrumar las defensas enemigas!",
    icon: `<svg viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <linearGradient id="grad-hair" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFEB3B" />
          <stop offset="100%" stop-color="#F57F17" />
        </linearGradient>
        <linearGradient id="grad-skin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFCC80" />
          <stop offset="100%" stop-color="#FFA726" />
        </linearGradient>
      </defs>
      <!-- Fondo / Pelo trasero -->
      <circle cx="50" cy="50" r="38" fill="url(#grad-hair)"/>
      <!-- Cara -->
      <circle cx="50" cy="50" r="30" fill="url(#grad-skin)"/>
      <!-- Ojos furiosos -->
      <path d="M 33 42 Q 40 40 43 45" fill="none" stroke="#212121" stroke-width="3" stroke-linecap="round"/>
      <path d="M 67 42 Q 60 40 57 45" fill="none" stroke="#212121" stroke-width="3" stroke-linecap="round"/>
      <circle cx="38" cy="47" r="2.5" fill="#212121"/>
      <circle cx="62" cy="47" r="2.5" fill="#212121"/>
      <!-- El Bigote Legendario -->
      <path d="M 25 58 Q 50 48 75 58 Q 80 66 70 66 Q 50 60 30 66 Q 20 66 25 58 Z" fill="url(#grad-hair)" stroke="#E65100" stroke-width="1"/>
      <!-- Banda de pelo -->
      <path d="M 25 32 Q 50 25 75 32" fill="none" stroke="#D32F2F" stroke-width="5"/>
      <!-- Boca gritando -->
      <ellipse cx="50" cy="58" rx="8" ry="4" fill="#212121"/>
      <rect x="47" y="55" width="6" height="2" fill="#FFF"/>
    </svg>`
  },
  {
    id: "tropa_arquera",
    name: "Arquera",
    category: "troops",
    subcategory: "distancia",
    description: "Una tiradora experta de pelo rosa que prefiere mantener la distancia en el campo de batalla.",
    stats: {
      "Daño por golpe": "26",
      "Puntos de vida": "110",
      "Velocidad de movimiento": "24",
      "Alcance de ataque": "5 casillas",
      "Espacio en viviendas": "1"
    },
    lore: "Las arqueras no temen al peligro, pero saben que sobrevivir es clave para ganar. Con su precisión quirúrgica, pueden disparar por encima de los muros para destruir estructuras defensivas sin exponerse al fuego directo del cañón.",
    icon: `<svg viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <linearGradient id="grad-hair-pink" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#EC407A" />
          <stop offset="100%" stop-color="#C2185B" />
        </linearGradient>
        <linearGradient id="grad-skin-archer" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFE0B2" />
          <stop offset="100%" stop-color="#FFB74D" />
        </linearGradient>
      </defs>
      <!-- Capucha / Cabello -->
      <circle cx="50" cy="48" r="36" fill="url(#grad-hair-pink)"/>
      <path d="M 20 45 Q 50 20 80 45 L 75 80 L 25 80 Z" fill="url(#grad-hair-pink)"/>
      <!-- Cara -->
      <circle cx="50" cy="50" r="26" fill="url(#grad-skin-archer)"/>
      <!-- Ojos -->
      <ellipse cx="40" cy="48" rx="3" ry="4" fill="#00695C"/>
      <ellipse cx="60" cy="48" rx="3" ry="4" fill="#00695C"/>
      <path d="M 35 40 Q 40 38 45 42" fill="none" stroke="#212121" stroke-width="2"/>
      <path d="M 65 40 Q 60 38 55 42" fill="none" stroke="#212121" stroke-width="2"/>
      <!-- Mechones de cabello frontales -->
      <path d="M 24 45 C 30 45 35 35 45 45 C 40 30 60 30 55 45 C 65 35 70 45 76 45" fill="none" stroke="url(#grad-hair-pink)" stroke-width="5" stroke-linecap="round"/>
      <!-- Labios finos -->
      <path d="M 45 62 Q 50 65 55 62" fill="none" stroke="#D81B60" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: "tropa_dragon",
    name: "Dragón",
    category: "troops",
    subcategory: "aereo",
    description: "Una bestia voladora mítica capaz de calcinar ejércitos enteros con su aliento de fuego ígneo.",
    stats: {
      "Daño por segundo": "240 (Daño de área)",
      "Puntos de vida": "3,200",
      "Velocidad de movimiento": "12",
      "Espacio en viviendas": "20",
      "Tipo de Daño": "Salpicadura de fuego"
    },
    lore: "El Dragón reina los cielos. Ignora los muros y reduce a cenizas cualquier obstáculo a su paso. Su grueso pellejo escamoso resiste castigos masivos, aunque debe tener extremo cuidado con los Cohetes de Defensa y las Torres de Magos.",
    icon: `<svg viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <linearGradient id="grad-dragon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#D32F2F" />
          <stop offset="100%" stop-color="#5D4037" />
        </linearGradient>
        <linearGradient id="fire-grad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#FFD54F" />
          <stop offset="50%" stop-color="#FF9100" />
          <stop offset="100%" stop-color="#FF3D00" />
        </linearGradient>
      </defs>
      <!-- Alas -->
      <path d="M 15 40 Q 5 15 35 25 Q 50 35 50 50 Q 50 35 65 25 Q 95 15 85 40 Z" fill="#B71C1C" stroke="#212121" stroke-width="2"/>
      <!-- Cabeza/Cuello -->
      <path d="M 40 75 Q 50 90 60 75 L 62 45 Q 65 30 50 30 Q 35 30 38 45 Z" fill="url(#grad-dragon)" stroke="#212121" stroke-width="2"/>
      <!-- Cuernos -->
      <path d="M 42 32 L 35 20 L 44 28" fill="#FFD700" stroke="#212121" stroke-width="1.5"/>
      <path d="M 58 32 L 65 20 L 56 28" fill="#FFD700" stroke="#212121" stroke-width="1.5"/>
      <!-- Ojos amarillos brillantes -->
      <polygon points="43,40 48,37 46,43" fill="#FFEB3B"/>
      <polygon points="57,40 52,37 54,43" fill="#FFEB3B"/>
      <!-- Fuego saliendo de la boca -->
      <path d="M 45 58 Q 50 78 55 58 Q 62 85 50 95 Q 38 85 45 58 Z" fill="url(#fire-grad)" opacity="0.95"/>
    </svg>`
  },

  // --- HECHIZOS ---
  {
    id: "hechizo_curacion",
    name: "Hechizo de Curación",
    category: "spells",
    subcategory: "apoyo",
    description: "Crea un anillo místico de sanación que regenera la salud de todas las tropas aliadas que estén dentro.",
    stats: {
      "Curación total": "1,200 HP",
      "Duración": "12 segundos",
      "Radio del efecto": "5 casillas",
      "Espacio de fábrica": "2",
      "Costo de producción": "18,000 Elixir"
    },
    lore: "Ideal para mantener con vida a tus Gigantes o Montapuercos mientras reciben castigo pesado de los Morteros o las Torres de Infierno. ¡La sincronización y la colocación precisa lo son todo para cambiar el rumbo del asalto!",
    icon: `<svg viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <radialGradient id="heal-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#E8F5E9" />
          <stop offset="60%" stop-color="#81C784" />
          <stop offset="100%" stop-color="#2E7D32" opacity="0" />
        </radialGradient>
      </defs>
      <!-- Aura Sanadora -->
      <circle cx="50" cy="50" r="45" fill="url(#heal-glow)"/>
      <!-- Frasco de Hechizo -->
      <rect x="40" y="35" width="20" height="35" rx="10" fill="#E8F5E9" stroke="#1B5E20" stroke-width="3" opacity="0.9"/>
      <rect x="43" y="45" width="14" height="22" rx="6" fill="#4CAF50"/>
      <!-- Cuello del frasco -->
      <rect x="45" y="28" width="10" height="8" fill="#FFF" stroke="#1B5E20" stroke-width="2"/>
      <ellipse cx="50" cy="27" rx="7" ry="3" fill="#388E3C"/>
      <!-- Cruz de curación -->
      <path d="M 50 48 L 50 60 M 44 54 L 56 54" fill="none" stroke="#FFF" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: "hechizo_furia",
    name: "Hechizo de Furia",
    category: "spells",
    subcategory: "daño",
    description: "Crea un halo de energía violenta que aumenta el tamaño, daño y velocidad de tus tropas.",
    stats: {
      "Aumento de daño": "+180%",
      "Aumento de velocidad": "+28",
      "Duración": "18 segundos",
      "Radio del efecto": "5 casillas"
    },
    lore: "Cuando tus tropas se queden atascadas frente a un bloque de muros gruesos o necesiten derribar el Ayuntamiento rápidamente, lanza la Furia. Los ojos de tus soldados se inyectarán en sangre y destruirán todo al doble de velocidad.",
    icon: `<svg viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <radialGradient id="rage-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FAEEF5" />
          <stop offset="60%" stop-color="#E040FB" />
          <stop offset="100%" stop-color="#4A148C" opacity="0" />
        </radialGradient>
      </defs>
      <!-- Aura de Furia -->
      <circle cx="50" cy="50" r="45" fill="url(#rage-glow)"/>
      <!-- Botella de Poción -->
      <path d="M 38 75 Q 50 82 62 75 L 56 45 L 56 32 L 44 32 L 44 45 Z" fill="#EA80FC" stroke="#4A148C" stroke-width="3" opacity="0.9"/>
      <path d="M 41 71 Q 50 77 59 71 L 54 48 L 46 48 Z" fill="#D500F9"/>
      <!-- Tapón de corcho -->
      <rect x="46" y="25" width="8" height="8" rx="1" fill="#8D6E63" stroke="#4E342E" stroke-width="1.5"/>
      <!-- Rayos interiores -->
      <path d="M 50 52 L 47 58 L 53 58 L 50 64" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },

  // --- HÉROES ---
  {
    id: "heroe_rey_barbaro",
    name: "Rey Bárbaro",
    category: "heroes",
    subcategory: "combate",
    description: "Una máquina de demolición imponente alimentada con Elixir Oscuro. Defiende su territorio con un puño de hierro.",
    stats: {
      "Puntos de vida base": "4,500",
      "Daño por segundo": "190",
      "Habilidad Especial": "Puño de Hierro (Nivel 5+)",
      "Regeneración": "40 minutos"
    },
    lore: "El Rey Bárbaro es el más fuerte y temido de su tribu. Una vez invocado en su altar, patrullará incansablemente tu base. En ataque, activa su Puño de Hierro para enfurecerlo, curar parte de su salud e invocar un escuadrón de bárbaros enfurecidos a su lado.",
    icon: `<svg viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <linearGradient id="gold-crown" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFD700" />
          <stop offset="100%" stop-color="#DAA520" />
        </linearGradient>
        <linearGradient id="king-skin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFE0B2" />
          <stop offset="100%" stop-color="#F57C00" />
        </linearGradient>
      </defs>
      <!-- Cabello trasero -->
      <circle cx="50" cy="52" r="32" fill="#F57F17"/>
      <!-- Rostro -->
      <circle cx="50" cy="54" r="26" fill="url(#king-skin)"/>
      <!-- Ojo parche (izquierdo) y Ojo derecho -->
      <circle cx="38" cy="50" r="3.5" fill="#212121"/>
      <path d="M 56 46 L 68 54 M 68 46 L 56 54" fill="none" stroke="#D32F2F" stroke-width="3" stroke-linecap="round"/> <!-- Parche de batalla -->
      <!-- Gran Bigote del Rey -->
      <path d="M 30 64 Q 50 56 70 64 Q 75 72 65 72 Q 50 66 35 72 Q 25 72 30 64 Z" fill="#F57F17" stroke="#E65100" stroke-width="1.5"/>
      <!-- Corona Dorada -->
      <polygon points="30,36 35,16 45,26 50,14 55,26 65,16 70,36" fill="url(#gold-crown)" stroke="#8B7500" stroke-width="2"/>
      <circle cx="50" cy="30" r="2" fill="#D32F2F"/>
      <!-- Hombrera de Acero -->
      <path d="M 20 85 Q 50 78 80 85" fill="none" stroke="#78909C" stroke-width="6" stroke-linecap="round"/>
    </svg>`
  }
];

// Claves de almacenamiento
const STORAGE_KEY = "clash_realms_bible_db";

// Inicializar la base de datos
function getDatabase() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATABASE));
    return DEFAULT_DATABASE;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Error al leer la base de datos de localStorage, restaurando valores por defecto.", e);
    return DEFAULT_DATABASE;
  }
}

// Guardar base de datos
function saveDatabase(db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

// Agregar un nuevo item a la base de datos
function addItemToDatabase(item) {
  const db = getDatabase();
  // Validar si tiene ID o generar uno único
  if (!item.id) {
    item.id = `custom_${item.category}_${Date.now()}`;
  }
  db.push(item);
  saveDatabase(db);
  return db;
}

// Eliminar un item por ID (para gestión del usuario)
function deleteItemFromDatabase(id) {
  let db = getDatabase();
  db = db.filter(item => item.id !== id);
  saveDatabase(db);
  return db;
}

// Restaurar valores iniciales
function resetDatabaseToDefault() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATABASE));
  return DEFAULT_DATABASE;
}
