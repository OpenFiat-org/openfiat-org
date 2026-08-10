import type { Dictionary } from "./en";

/**
 * Spanish — a complete translation, typed as Dictionary so a missing key is a
 * build failure rather than a silent fallback. Proper nouns (OpenFiat, OPEN,
 * USDC, Solana, AllenHark, GitHub, Discord, Reddit, Apache-2.0, the OFS-####
 * and source-file references) are left as-is, and every {placeholder} is
 * preserved exactly so the runtime substitution still lands.
 */
export const es: Dictionary = {
  meta: {
    tagline: "Intercambio de fiat entre pares, descentralizado",
    description:
      "OpenFiat es un protocolo abierto para intercambiar monedas estables por moneda fiat local, entre pares, sin operador de intercambio centralizado. Liquidación en Solana; coordinación en una red abierta.",
  },

  nav: {
    howItWorks: "Cómo funciona",
    trust: "Confianza y seguridad",
    whitepaper: "Documento técnico",
    specs: "Especificaciones",
    actors: "Participar",
    guides: "Guías",
    fees: "Comisiones",
    sale: "Venta de tokens",
    runNode: "Ejecutar un nodo",
    launchApp: "Abrir la app",
    preview: "Vista previa",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    primaryLabel: "Principal",
    skipToContent: "Saltar al contenido",
    language: "Idioma",
  },

  footer: {
    blurb:
      "Un protocolo abierto para intercambiar monedas estables y moneda fiat local, entre pares. Liquidación en Solana, coordinación en una red abierta.",
    columns: {
      protocol: "Protocolo",
      participate: "Participar",
      network: "Red",
      project: "Proyecto",
      community: "Comunidad",
    },
    links: {
      overview: "Descripción del protocolo",
      howItWorks: "Cómo funciona",
      trust: "Confianza y seguridad",
      whitepaper: "Documento técnico",
      specifications: "Especificaciones",
      glossary: "Glosario",
      roadmap: "Hoja de ruta",
      fees: "Comisiones",
      actors: "Todos los roles",
      merchants: "Comerciantes",
      nodeOperators: "Operadores de nodos",
      developers: "Desarrolladores",
      guides: "Guías",
      becomeArbitrator: "Conviértete en árbitro",
      earn: "Cómo ganas",
      sale: "Venta de tokens",
      runNode: "Ejecutar un nodo",
      downloads: "Descargas",
      documentation: "Documentación",
      developerDocs: "Documentación para desarrolladores",
      status: "Estado",
      app: "Abrir la app",
      foundation: "Fundación",
      blog: "Blog",
      press: "Prensa",
      careers: "Empleo",
      contact: "Contacto",
      contribute: "Formas de contribuir",
      github: "GitHub",
      discussions: "Debates",
      discord: "Discord",
      reddit: "Reddit",
      privacy: "Privacidad",
      terms: "Términos",
    },
    siteLicense: "Este sitio es de código abierto bajo Apache-2.0.",
    notice:
      "OpenFiat es un protocolo abierto, no un servicio financiero. Nada en este sitio constituye una oferta de venta de valores ni asesoramiento financiero. El suministro, la asignación y los términos de venta del token OPEN no son definitivos y siguen sujetos a revisión comunitaria y modelado económico.",
  },

  home: {
    headlineLead: "Un mercado que",
    headlineAccent: "ningún país ni empresa puede apagar",
    headlineTail: ".",
    lede: "OpenFiat es un protocolo abierto para intercambiar monedas estables por moneda local, entre pares. El depósito en garantía se liquida en Solana; el descubrimiento, la reputación y la comunicación funcionan en una red a la que cualquiera puede unirse. Ningún gobierno puede censurarlo y ninguna empresa puede suspenderte: no hay operador al que presionar, solo participantes.",
    ctaJoinSale: "Únete a la preventa comunitaria",
    ctaHowItWorks: "Ve cómo funciona una operación",
    readWhitepaper: "Lee el documento técnico",
    tokenSale: "Venta de tokens",

    telemetry: {
      layers: "capas",
      stakedRoles: "roles con stake",
      specifications: "especificaciones",
      repositories: "repositorios",
      centralOperators: "operadores centrales",
    },

    problem: {
      title: "Toda plataforma P2P actual tiene la misma arquitectura.",
      subtitle:
        "La criptomoneda es descentralizada. El mercado no lo es. Detrás de casi todo intercambio entre pares:",
      company: "Una sola empresa",
      actions: [
        "posee los servidores",
        "controla la base de datos",
        "decide qué anuncios aparecen",
        "resuelve las disputas",
        "almacena las puntuaciones de reputación",
        "puede suspender o eliminar usuarios",
        "decide qué países se admiten",
        "puede ser cerrada, hackeada o presionada",
      ],
      verdict:
        "Si el operador falla —técnica, financiera o legalmente— el mercado desaparece, aunque la cadena de bloques subyacente nunca se detenga. OpenFiat elimina esa dependencia.",
    },

    layers: {
      title: "Dos capas, cada una haciendo lo que mejor sabe hacer.",
      subtitle:
        "La arquitectura minimiza el coste en cadena preservando la propiedad descentralizada y la transparencia.",
      coordination: {
        label: "Capa de coordinación · red OpenFiat",
        title: "Comunicación rápida entre personas",
        body: "Funciona en una red abierta entre pares a la que cualquiera puede unirse: sin empresa en medio, sin servidor que incautar.",
        items: [
          "Descubrimiento de anuncios",
          "Coordinación de operaciones",
          "Reputación",
          "Comunicación cifrada",
          "Notificaciones y búsqueda",
          "Indexación del mercado",
        ],
      },
      settlement: {
        label: "Capa de liquidación · Solana",
        title: "Lo que las cadenas de bloques hacen excepcionalmente bien",
        body: "Los activos se bloquean y liberan mediante contratos inteligentes auditados, nunca por la buena voluntad de un operador.",
        items: [
          "Custodia segura de activos",
          "Gestión del depósito en garantía",
          "Staking",
          "Gestión de tesorería",
          "Ejecución de la gobernanza",
        ],
      },
    },

    flow: {
      title: "Una operación, cuatro movimientos",
      subtitle:
        "Protegida desde el segundo movimiento en adelante: nadie en medio puede tomar los fondos, y nadie tiene que confiar en la buena voluntad de la otra parte.",
      stages: ["Red", "En cadena", "Riel fiat", "En cadena"],
      pathsNote: "y sigue: guías para traders, operadores y desarrolladores",
    },

    read: {
      title: "Lee el protocolo",
      subtitle:
        "Cada capítulo publicado como página web: sin descargas, nada tras un formulario. No supone experiencia previa con cadenas de bloques y parte de qué es el dinero. Las especificaciones numeradas están al lado, para quienes implementan.",
      startHere: "empieza aquí",
      moreChapters: (n: number) => `${n} capítulos más`,
      specsCta: (n: number) => `${n} especificaciones`,
    },

    contribute: {
      title: "Constrúyelo con nosotros",
      subtitle:
        "Cada capa es de código abierto bajo Apache-2.0, y el repositorio de especificaciones acepta prosa y traducciones: contribuir no tiene por qué significar código.",
    },

    saleBand: {
      body: "OPEN es el stake detrás de cada rol que mantiene honesto al mercado: comerciantes, árbitros, nodos, oráculos. La preventa ofrece la asignación comunitaria a un precio fijo antes de cualquier venta pública. La preventa ya está activa en devnet; conectar una billetera te permite contribuir hoy mismo.",
      presaleRate: "Precio de preventa",
      publicRate: "Venta pública después",
      publicRateValue: "1 USDC = 80 OPEN",
      supply: "Suministro",
      supplyValue: "100.000.000.000 · autoridad de emisión anulada",
      status: "Estado",
      statusLive: "Activa en devnet",
      termsCta: "Términos de venta y asignación",
    },

    safety: {
      more: "Cómo funciona la confianza",
    },

    roles: {
      seeAll: "Ver todos los roles",
    },

    finalCta: {
      title: "Tu dinero, tu moneda, sin intermediarios.",
      body: "Empieza con una descripción de cinco minutos, o léelo todo.",
      start: "Ve cómo funciona una operación",
    },
  },

  whitepaper: {
    title: "El protocolo OpenFiat, completo",
    intro:
      "Cada capítulo se publica aquí como página web: sin descargas, nada tras un formulario. No supone experiencia previa con cadenas de bloques y parte de qué es el dinero.",
    chapters: (n: number) => `${n} capítulos`,
    words: (n: string) => `~${n} palabras`,
    readTime: (h: number, m: number) => `~${h} h ${m} min de lectura`,
    startReading: "Empezar a leer",
    downloadPdfs: "Descargar PDF",
    frontMatter: "Preliminares",
    chapter: (n: number) => `Capítulo ${n}`,
    expandsChapter: (n: number) => `amplía el cap. ${n}`,
    englishOnlyTitle: "Publicado en inglés",
    englishOnlyBody:
      "El documento técnico y las especificaciones aún no se han traducido. La traducción figura como un área de contribución comunitaria en el Capítulo 25; la navegación de esta página está localizada, pero el texto del documento es el inglés original.",
  },

  specsPage: {
    title: "El conjunto de protocolos de OpenFiat",
    intro: (count: number) =>
      `${count} especificaciones numeradas. El número codifica la capa: los 1000 son redes, los 2000 el mercado, y así sucesivamente hasta los oráculos y la inteligencia de riesgo.`,
    published: (n: number) => `${n} publicadas`,
    layers: (n: number) => `${n} capas`,
    draft: "Versión 1.0.0 · Borrador",
    reservedTitle: "Rangos reservados",
    notWritten: "Aún no redactada",
    reservedNote:
      "Las especificaciones en rangos reservados son citadas por documentos publicados pero no se han redactado. Las referencias a ellas aparecen como texto plano en lugar de enlaces.",
  },

  reader: {
    onThisPage: "En esta página",
    minRead: (n: number) => `${n} min de lectura`,
    wordCount: (n: string) => `${n} palabras`,
    sections: (n: number) => `${n} secciones`,
    relatedChapter: "Capítulo relacionado",
    revisitsGround: "Este capítulo retoma lo tratado en",
    canonicalTreatment: ", que es el tratamiento canónico.",
    coversOverlapping: "cubre material solapado desde un segundo ángulo.",
    dependsOn: "Depende de",
    dependedOnBy: "Del que dependen",
    navLabel: "Navegación del documento",
    specifications: "Especificaciones",
    whitepaper: "Documento técnico",
    layer: (name: string) => `Capa ${name}`,
  },

  actors: {
    title: "Compradores, comerciantes, árbitros, operadores de nodos",
    intro:
      "Diez roles mantienen OpenFiat en marcha: algunos los asumes solo con operar, otros ejecutando infraestructura. Nadie concede permiso para ninguno de ellos.",
    whatTheyDo: "Qué hacen",
    whatTheyStake: "Stake",
    howTheyEarn: "Cómo ganan",
    requirements: "Requisitos",
    repositories: "Repositorios",
    governedBy: "Gobernado por",
    noStake: "No requiere stake",
    noStakeStated: "No especificado en el documento técnico",
    notStated: "No especificado en el documento técnico",
    readMore: "Leer más",
    otherRoles: "Otros roles",
    permissionless: "Sin permisos",
    stakeNote:
      "El stake demuestra compromiso económico con el ecosistema. No es un pago. Los participantes conservan la propiedad de su stake salvo que se apliquen penalizaciones definidas por el protocolo.",
  },

  howItWorks: {
    title: "Cómo funciona una operación",
    lede: "Cuatro pasos. La cripto de tu contraparte queda bloqueada antes de que entregues dinero, y sigue bloqueada hasta que ambos confirméis que el pago llegó.",
    flowTitle: "Los cuatro pasos",
    needTitle: "Qué necesitas",
    need: [
      "Una billetera que controles: sin cuenta, sin registro, sin KYC",
      "Monedas estables para vender, o moneda local para comprar",
      "Un método de pago que ya uses",
    ],
    railsTitle: "Formas de pagar",
    railsLede:
      "El lado fiat se mueve por los rieles que ya usas. OpenFiat estandariza cómo se describe y confirma un método de pago, no cómo funciona.",
    safetyTitle: "Si algo sale mal",
    safetyLede:
      "Cualquiera de las partes puede abrir una disputa, y árbitros independientes la deciden con su propio stake en riesgo.",
    safetyMore: "Cómo funciona la confianza",
  },

  trust: {
    title: "Confianza, sin nadie en quien confiar",
    lede: "Un desconocido está a punto de enviarte dinero en una moneda que ninguna cadena de bloques puede ver. Cuatro mecanismos lo hacen seguro, y ninguno es una empresa prometiendo ser justa.",
    flowTitle: "Qué protege una operación individual",
    pillarsTitle: "De qué está hecha la confianza",
    disputeTitle: "Cuando una operación sale mal",
    disputeLede:
      "Cualquiera de las partes puede abrir una disputa. La deciden árbitros independientes que ponen en juego su propio OPEN por acertar, y que no pueden ver las pruebas hasta haberse comprometido.",
    noAppeal:
      "No hay apelación en la versión 1. El voto de comprometer y revelar, los árbitros con stake y las penalizaciones moderadas son las salvaguardas, en lugar de una segunda audiencia.",
    readChapter: "Lee el protocolo de disputas",
    readReputation: "Lee el motor de reputación",
  },

  protocolPage: {
    title: "OpenFiat no es una cadena de bloques",
    lede: "Es una capa de coordinación que se apoya sobre una. Solana guarda el dinero y ejecuta el depósito en garantía; OpenFiat lleva todo lo que un mercado necesita y que no tiene por qué estar en una cadena: anuncios, reputación, mensajería, descubrimiento.",
    layersTitle: "Dos capas, cada una en lo que es buena",
    layersLede:
      "La división es todo el diseño. Descentraliza lo que se beneficia de ello, y deja el resto donde funciona mejor.",
    settlement: "Capa de liquidación",
    coordination: "Capa de coordinación",
    principlesTitle: "El razonamiento detrás",
    principlesLede:
      "El Capítulo 3 expone doce principios de los que se deriva todo el protocolo. Estos seis son los que más pesan.",
    suiteTitle: "Un conjunto de especificaciones numeradas",
    suiteLede: (count: number) =>
      `${count} especificaciones formales, agrupadas en capas. El número te dice a qué capa pertenece un documento.`,
    browseSpecs: "Explorar las especificaciones",
    readAll: "Leer los doce principios",
  },

  runNode: {
    title: "Ejecutar un nodo OpenFiat",
    intro:
      "Los operadores de nodos mantienen el mercado descentralizado que se sitúa por encima de la cadena de bloques. Los validadores de Solana aseguran la cadena y ejecutan los programas de OpenFiat; los nodos llevan los anuncios, la reputación, la mensajería y el descubrimiento.",
    neverCustody:
      "Los nodos nunca custodian fondos de los usuarios. Todas las operaciones financieras siguen bajo el control de los contratos inteligentes de Solana.",
    requirementsTitle: "Hardware",
    installTitle: "Instalación",
    releasesLink: "Releases de GitHub",
    referenceNote:
      "Los comandos siguientes usan el despliegue de referencia: el servicio openfiat-node, /etc/openfiat para la configuración y /var/lib/openfiat para los datos.",
    serveRpcTitle: "Sirve a la red, no solo a ti",
    serveRpc:
      "Un nodo que solo lee es un invitado. Un nodo al que el público puede llegar es infraestructura: las billeteras, exploradores y aplicaciones web tienen que hablar con *alguien*, y hoy existen demasiado pocos de esos alguien. Cada operador que pone su nodo tras TLS y configura --public-rpc-url amplía ese conjunto, que es la diferencia entre una red con varias puertas de entrada independientes y una con un único punto de fallo del que todos dependen en silencio. Cuesta un certificado y un proxy inverso. También se recompensa: un nodo alcanzable es uno que los pares pueden desafiar y recompensar, y las propias aplicaciones de OpenFiat usarán el tuyo junto a todos los demás.",
    serveRpcHonest:
      "Dos cosas que conviene saber antes de hacerlo. Servir al público significa tráfico real, así que dimensiona la máquina para ello y vigila el endpoint de métricas. Y un nodo público es un compromiso público: la gente construirá contra la URL que publiques, así que retírala de forma deliberada en lugar de silenciosa.",
    portsTitle: "Puertos",
    portPublic: "Debe ser alcanzable",
    portPrivate: "Mantener privado",
    troubleshootingTitle: "Cuando algo va mal",
    copy: "Copiar",
    copied: "Copiado",
    minimum: "Mínimo",
    recommended: "Recomendado para producción",
    lifecycleTitle: "Poner un nodo en línea",
    lifecycleNote:
      "Sigue estos pasos en orden. Cada paso incluye el comando que necesita.",
    monitoringTitle: "Qué debe exponer un nodo",
    stakingBody:
      "Un nodo hace stake de OPEN para convertirse en participante activo. Pero el stake no compra reputación: un operador con mal rendimiento no puede compensarlo haciendo más stake. La prioridad efectiva combina reputación, stake y el rendimiento de red medido.",
    hostUiTitle: "Alojar la interfaz de usuario",
    hostUiIntro:
      "OpenFiat separa el protocolo de sus interfaces. Cualquiera puede alojar una interfaz web, una pasarela móvil, un portal empresarial o un mercado regional, y todas ellas llegan al mismo mercado.",
    hostUiQuote:
      "Independientemente de la interfaz que se use, cada participante interactúa con el mismo mercado descentralizado.",
    hostUiConnect: "A qué se conecta una interfaz",
    hostUiConnectBody:
      "Las interfaces no hablan directamente con la cadena. Se conectan a uno o más nodos OpenFiat cercanos, y conmutan a otro nodo si uno deja de estar disponible.",
    apiTitle: "Superficie de API del nodo",
    apiNote:
      "Todo nodo conforme expone la misma superficie de API, de modo que una interfaz escrita contra un nodo funciona contra todos.",

    hostingTitle: "Dónde ejecutarlo",
    hostingIntro:
      "AllenHark lidera el desarrollo inicial del protocolo y vende las dos cosas que un nodo necesita: un servidor y acceso RPC a Solana. Los operadores de nodos obtienen un {pct}% de descuento en ambos, como parte del programa OpenFiat.",
    hostingVps: "Alojamiento de servidores",
    hostingVpsBody:
      "Almacenamiento NVMe en enlaces de 10 Gbps, en Fráncfort, Ámsterdam y Chicago. Dimensiónalo según el hardware anterior: el almacenamiento es lo que un nodo completo va necesitando, así que di qué vas a ejecutar y se puede especificar por ti.",
    hostingRpc: "RPC y gRPC de Solana",
    hostingRpcBody:
      "Conexiones con stake, de modo que las transacciones que tu nodo envía no quedan en cola tras las de todos los demás. El acceso se concede por lista de IP permitidas en lugar de una clave de API. Yellowstone gRPC está disponible para transmitir actualizaciones de cuentas y slots.",
    hostingViewPricing: "Ver precios",
    hostingClaimTitle: "Reclamar el descuento",
    hostingClaimBody:
      "No hay código que introducir. Pregunta en Discord o en el chat de allenhark.com, di que ejecutas un nodo OpenFiat, y el descuento se aplica a tu pedido.",
    hostingDiscord: "Preguntar en Discord",
    hostingChat: "Abrir un chat",
  },

  earn: {
    title: "Cómo ganas",
    intro:
      "La recompensa de un nodo es una parte de la emisión de un día, decidida por lo que hizo stake y por tres mediciones de lo que hizo con ese stake. Esta es la fórmula que el software ejecuta realmente, con las partes que no puede conocer marcadas como tales.",
    heroMeta:
      "Toda constante de esta página se lee de crates/rewards en openfiat-core. Ningún nodo ha cobrado todavía.",

    modelTitle: "Qué decide tu parte",
    modelIntro:
      "La emisión por época es fija. Tu recompensa es tu peso sobre el peso de todos los nodos elegibles, y el peso es un stake multiplicado por tres mediciones de servicio, cada una de ellas como máximo 1,0.",
    termStakeTitle: "Lo que hiciste stake",
    termStakeBody:
      "Se lee de tu cuenta de stake en cadena, nunca de una cifra que tu nodo declare sobre sí mismo. Un stake respalda un nodo: si dos nodos nombran la misma cuenta, ambos quedan excluidos de la época.",
    termConnectivityTitle: "Si haces de puente hacia Solana",
    termConnectivityBody:
      "1,0 si la red vio a tu nodo originar un anuncio de blockhash de Solana, 0,4 si solo te vio propagar por gossip. Un nodo puente hace estrictamente más trabajo, y la diferencia se ve en sus propios anuncios firmados en lugar de en una afirmación.",
    termAvailabilityTitle: "Cuánto del día estuviste activo",
    termAvailabilityBody:
      "La proporción de las 24 franjas de una hora de la época en las que se oyó a tu nodo. Ser oído una vez en una franja la puntúa, y ser oído quinientas veces puntúa lo mismo, así que inundar la red no gana nada.",
    termPinningTitle: "Si sirves contenido",
    termPinningBody:
      "1,0 si tu nodo devolvió bytes que coinciden con una dirección de contenido cuando se le desafió, 0,7 si nunca fue desafiado o falló. Este es el único de los tres que se prueba en lugar de suponerse: unos bytes que resumen a un CID no pueden producirse sin poseerlos.",
    pinningAheadOfSpec:
      "Una advertencia sobre ese cuarto término. La tabla confirmada de OFS-4100 §9.2 enumera tres factores —stake, conectividad, disponibilidad— y no menciona el pinning. El crate lo aplica igualmente. Donde la especificación y el código discrepan, esta página sigue al código, porque el código es lo que computaría una programación; pero lee el multiplicador de pinning como algo que va por delante de la especificación en lugar de zanjado por ella.",

    ceilingTitle: "Nada aquí puede superar 1,0",
    ceilingLede:
      "Todo multiplicador es una fracción de uno, y el software se niega a arrancar con un conjunto de parámetros donde alguno no lo sea.",
    ceilingBody:
      "Eso no es cautela, es la única disposición que cuadra. El fondo de una época es un número fijo de tokens, y los multiplicadores deciden cómo se divide ese fondo. Un multiplicador por encima de 1,0 no pagaría de más a un buen nodo desde algún sitio: repartiría tokens que el cubo de Infraestructura no contiene. RewardParams::validate rechaza tal conjunto de plano en lugar de dejar que el déficit aflore el día del pago.",
    ceilingPenalty:
      "Es también por lo que la recompensa por servir contenido se construye como una penalización a los nodos que no lo hacen. «Los nodos que hacen pinning ganan más» y «los nodos que no hacen pinning ganan menos» describen el mismo resultado, y solo el segundo puede implementarse sin inventar tokens. Un nodo que hace pinning conserva toda su parte; un nodo que no hace pinning de nada cede tres décimas de la suya.",
    matrixCaption:
      "Todos los valores que pueden tomar los dos interruptores, a plena disponibilidad.",
    matrixQuality: "Multiplicador",
    matrixNote:
      "Lee juntas las dos filas centrales: un nodo solo-gossip que sirve contenido ({gossipPin}) aún gana menos que un nodo puente que no sirve ninguno ({rpcNoPin}). Servir contenido es una prima sobre una conexión a la cadena, nunca un sustituto de ella.",

    calcTitle: "Prueba tus propios números",
    calcIntro:
      "La columna izquierda es lo que tú controlas. La derecha divide el resultado en dos: lo que tus datos determinan con exactitud, y lo que depende de una red que aún no se ha formado.",
    yourNode: "Tu nodo",
    stakeLabel: "Stake",
    stakeHint:
      "Por debajo de 1.000 OPEN un nodo no se pondera en absoluto. No se le paga una parte menor: se le omite.",
    availabilityLabel: "Horas en las que se te oyó",
    availabilityHint:
      "De las 24 franjas de una hora de la época. Una franja cuenta una vez, por mucho tráfico que envíes durante ella.",
    connectivityLabel: "Conectividad",
    connectivityRpc: "Puente hacia Solana",
    connectivityGossip: "Solo gossip",
    pinningLabel: "Contenido",
    pinningServing: "Respondió a un desafío",
    pinningAbsent: "No desafiado, o falló",

    determinedTitle: "Determinado por tus datos",
    qualityCeiling: "de un posible 1,00",
    qualityLabel:
      "Tu multiplicador de calidad: los tres factores de servicio, combinados como los combina la programación.",
    factorConnectivity: "conectividad",
    factorAvailability: "disponibilidad",
    factorPinning: "pinning",
    factorProduct: "calidad",
    ineligibleBelowFloor:
      "Con este stake el nodo no gana nada. {min} OPEN es el mínimo, y un nodo por debajo queda fuera de la ponderación por completo.",
    ineligibleOffline:
      "Un nodo al que no se oyó en ninguna franja de la época puntúa cero disponibilidad, lo que anula todo el peso. No gana nada, sea cual sea su stake.",

    assumedTitle: "Depende del resto de la red",
    assumedNote:
      "Tu parte es tu peso dividido por el peso de todos los nodos elegibles, así que no puede calcularse solo con tus datos. No hay un total en vivo que sustituir: esta página no lee estado de la cadena, y nunca se ha distribuido ninguna recompensa. Así que el total es una suposición, la fijas tú, y ambas cifras de abajo descansan sobre ella y sobre nada más firme.",
    peersLabel: "Otros nodos elegibles",
    peerStakeLabel: "Stake de cada uno de ellos",
    shareLabel: "Tu parte del fondo de la época",
    perEpochLabel: "OPEN por época, bajo esa suposición",
    poolReminder:
      "El fondo entero es de {pool} OPEN por época, repartido entre todos los nodos elegibles. Ambas cifras se mueven en cuanto alguien más hace stake, y ninguna es un pronóstico.",

    emissionTitle: "El fondo es finito",
    emissionLede: "La emisión de arranque es un cubo, no una tasa. Se vacía.",
    emissionBody:
      "120.000.000 OPEN —el 12% del suministro— se reservan para pagar a los nodos mientras los ingresos del protocolo son demasiado pequeños para importar, repartidos de forma uniforme a lo largo de unos cuatro años de épocas diarias. El día que se agote, el fondo de recompensas pasa a ser exactamente la parte de la tesorería de Infraestructura sobre las comisiones de liquidación: lo que la red ganó, y nada más. Quien dimensione un nodo con las cifras de arriba debería dimensionarlo también contra ese día.",
    emissionBucket: "OPEN en el cubo",
    emissionBucketNote:
      "La asignación de génesis de Infraestructura / Arranque de Nodos, el 12% del suministro total.",
    emissionPerEpoch: "OPEN por época",
    emissionPerEpochNote:
      "Compartido por todos los nodos elegibles, y limitado por lo que quede en el cubo.",
    emissionEpochs: "Épocas diarias",
    emissionEpochsNote:
      "Unos cuatro años, tras los cuales la emisión es lo que financien los ingresos del protocolo.",

    refusalTitle: "Lo que esta página no te dirá",
    refusalLede: "Faltan tres cifras, y cada una falta a propósito.",
    refusalPriceTitle: "Cuánto vale en tu moneda",
    refusalPriceBody:
      "OPEN no tiene mercado y, por tanto, no tiene precio. Una cifra en dólares, euros o renminbi aquí sería un número que este proyecto inventó sobre su propio token y luego te entregó con la autoridad de una calculadora. No hay un tipo honesto al que convertir, así que no hay conversión.",
    refusalYieldTitle: "Un rendimiento, una TAE o un retorno",
    refusalYieldBody:
      "Un porcentaje de retorno se lee como una promesa, y esto no es algo que el protocolo pueda prometer. La emisión que lo respalda se vacía en cuatro años, la parte se divide con cada nodo que se une, y ninguno de los parámetros es fijo: la §9 los hace todos actualizables por gobernanza. Una sola cifra anualizada ocultaría las tres cosas.",
    refusalTotalTitle: "Cuánto ha hecho stake la red hoy",
    refusalTotalBody:
      "Esta página no lee estado de la cadena. Tu parte depende del total en stake de todos los nodos elegibles y, en lugar de sustituir una cifra verosímil, la calculadora convierte ese total en una suposición que fijas tú, y luego etiqueta todo lo que descansa sobre ella.",

    statusTitle: "Qué está funcionando de verdad",
    statusBadge: "Devnet · nada pagado",
    statusLede: "El cálculo existe. El pago no.",
    statusBody:
      "Los nodos observan la actividad de los demás y publican lo que vieron, y la programación que convierte esas observaciones en cantidades está implementada y probada, de forma determinista, así que cualquiera con las mismas observaciones deriva la misma respuesta y el nodo pagador puede comprobarse en lugar de confiarse. Lo que falta es el último paso: nada envía una programación en cadena, y la bóveda de recompensas está vacía. Ningún nodo ha cobrado jamás.",
    statusParams:
      "Todo valor aquí es un parámetro de gobernanza en lugar de una constante: el mínimo de {min} OPEN, las {buckets} franjas de disponibilidad y los cuatro multiplicadores pueden cambiarse por voto sin un cambio de código. Estos son los valores predeterminados de hoy.",
    sourceNote:
      "Las constantes se leen de crates/rewards/src/params.rs; la aritmética refleja schedule.rs, incluido dónde trunca.",
    sourceLink: "Leer el código fuente",
    specLink: "Leer OFS-4100",

    ctaTitle: "Ejecuta uno y averígualo",
    ctaBody:
      "El modelo de recompensas es la mitad menor de la decisión. La mayor es si la máquina, el ancho de banda y la atención te merecen la pena: la guía del operador tiene el hardware real, los comandos reales y las partes que aún no están construidas.",
    ctaRunNode: "Ejecutar un nodo",
    ctaFees: "Cada comisión y pago",
  },

  fees: {
    title: "Comisiones",
    intro:
      "Cada comisión que cobra el protocolo y todo lo que paga. La mayor parte de lo que sigue está decidido y documentado, pero aún no cobrado ni pagado, y cada fila dice cuál es: una página de comisiones que se leyera como si todo estuviera en vivo sería el tipo de error más grave.",
    accuracyNote:
      "Solo devnet. Toda comisión es un parámetro de gobernanza, nunca una constante.",
    payTitle: "Lo que pagas",
    payIntro:
      "Tres comisiones, y no recaen sobre la misma parte. Un comprador paga solo en una operación completada y nada por plantear una disputa; un comerciante carga con los costes permanentes de anunciarse y de ser arbitrado.",
    receiveTitle: "Lo que recibe cada rol",
    receiveIntro:
      "Consumo y compensación son cuestiones separadas. Un servicio puede ser gratuito de consumir y aun así ser pagado por el protocolo: así funcionan exactamente las tarifas de los oráculos.",
    permissionedTitle: "El único rol con permisos",
    permissionedBody:
      "La inteligencia de riesgo es el único rol que requiere aprobación de gobernanza antes de operar. AllenHark es el proveedor predeterminado.",
    defaultProviderLabel: "Clave de servicio predeterminada",
    governanceTitle: "Toda comisión es un parámetro",
    governanceBody:
      "Ninguna cantidad aquí es una constante. Cada una es actualizable por gobernanza, porque las comisiones denominadas en un token tienen que moverse como se mueve el precio de ese token. Las cifras mostradas son valores predeterminados actuales, y las marcadas como propuestas no se han aprobado.",
    columnPayer: "Pagador",
    columnAmount: "Cantidad",
    columnConsumer: "Paga el consumidor",
    columnReceives: "Recibe el proveedor",
    status: {
      live: "Cobrada hoy",
      specified: "Especificada, aún no activa",
      none: "Nada, por decisión",
    },
  },

  guides: {
    title: "Guías",
    intro:
      "Paso a paso, con los comandos reales. Cada guía está escrita contra el software tal como existe hoy, así que donde algo aún no está construido, la guía lo dice en lugar de describir cómo se vería.",
    accuracyNote:
      "Solo devnet. Los ids de programa y endpoints de estas páginas son artefactos de devnet; no hay despliegue en mainnet.",
    allGuides: "Todas las guías",
    requirementsTitle: "Antes de empezar",
    stepsTitle: "Pasos",
    relatedTitle: "Relacionado",
    copy: "Copiar",
    copied: "Copiado",
    standalonePage: "Página independiente",
    azTitle: "Todas las guías, A–Z",
    progressNote:
      "El progreso vive solo en este navegador: sin cuenta, nada enviado a ninguna parte.",
    completedLabel: "completado",
    milestonesMeta: (count: number) => `${count} hito${count === 1 ? "" : "s"}`,
    stepsMeta: (count: number) => `${count} paso${count === 1 ? "" : "s"}`,
    milestoneOf: (position: number, total: number) =>
      `Hito ${position} de ${total}`,
    markStepDone: "Marcar paso como hecho",
    stepDoneLabel: "Hecho",
    prevOnPath: "Anterior en la ruta",
    nextOnPath: "Siguiente en la ruta",
    groups: {
      trade: {
        title: "Operar",
        blurb:
          "Comprar y vender, y aportar la liquidez contra la que otros operan.",
      },
      operate: {
        title: "Ejecutar infraestructura",
        blurb:
          "Los roles que mantienen la red en pie. Los ingresos del protocolo deben pagarlo; aún no fluye nada de ello.",
      },
      build: {
        title: "Construir sobre OpenFiat",
        blurb:
          "Escribir software contra el protocolo en lugar de usar una app que escribió otra persona.",
      },
    },
    standalone: {
      runNode: {
        title: "Ejecutar un nodo",
        summary:
          "Instala, configura y opera un nodo OpenFiat, del hardware a la monitorización.",
      },
      becomeArbitrator: {
        title: "Conviértete en árbitro",
        summary:
          "Deposita OPEN, toma un caso de disputa y emite el voto de comprometer-revelar que lo decide.",
      },
    },
  },

  becomeArbitrator: {
    title: "Conviértete en árbitro de OpenFiat",
    intro:
      "Los árbitros deciden disputas con su propio OPEN en riesgo, no su reputación. Esto recorre el depósito, encontrar un caso y emitir el voto de comprometer-luego-revelar que efectivamente paga.",
    neverCustody:
      "Los árbitros nunca retienen fondos de operaciones. Un fallo solo mueve dinero que el propio programa de depósito en garantía ya bloqueó antes de que se abriera la disputa.",
    requirementsTitle: "Qué necesitas",
    bondCta: "Deposita {amount} OPEN en openfiat-app",
    lifecycleTitle: "Trabajar un caso",
    lifecycleNote:
      "Sigue estos pasos en orden, un caso a la vez. Cada paso incluye el comando o código que necesita.",
    copy: "Copiar",
    copied: "Copiado",
  },

  sale: {
    title: "La preventa comunitaria de OPEN",
    notLiveTitle: "La venta no está abierta",
    notLiveBody:
      "No se ha desplegado ningún contrato de venta y ningún término es definitivo. Puedes conectar una billetera para comprobar la preparación, pero aún no hay nada que comprar.",
    connectWallet: "Conectar billetera",
    disconnect: "Desconectar",
    connected: "Conectada",
    verifyWallet: "Verificar billetera",
    verifying: "Esperando la firma…",
    verified: "Verificada",
    verifyNote:
      "Firma un mensaje (sin transacción, sin comisión) para confirmar que controlas esta billetera antes de comprar.",
    verifyUnsupported:
      "Esta billetera no admite la firma de mensajes: aún puedes comprar; la propiedad de la billetera se prueba con la propia firma de la transacción.",
    balance: "Saldo",
    max: "Máx",
    limitNote:
      "{min}–{max} USDC por billetera. Máx toma el menor entre tu saldo y ese límite.",
    raisedLabel: "Recaudado",
    goalLabel: "Objetivo",
    offeredLabel: "Ofrecido",
    goalNote:
      "El objetivo es una meta, no un tope. La preventa ofrece toda la asignación de Preventa Comunitaria, así que puede seguir vendiendo más allá del objetivo si la demanda va más lejos.",
    publicSaleNote:
      "Lo que quede sin vender de la asignación de Preventa Comunitaria cuando la preventa cierre se ofrecerá después en una venta pública a 1 USDC = 80 OPEN.",
    purchase: "Comprar OPEN",
    purchaseDisabled: "La compra se abre cuando la venta entre en vivo",
    amount: "Pagas",
    youReceive: "Recibes",
    rateNote: "1 USDC = 100 OPEN",
    estimated: "estimado",
    reviewing: "Simulando la transacción…",
    submitting: "Esperando la firma de la billetera…",
    confirming: "Confirmando…",
    done: "Compra confirmada",
    txFailed: "La transacción no se envió",
    txSuccess: "Confirmada",
    claim: "Reclamar OPEN",
    swapNotice:
      "Convertido a USDC de forma atómica al precio confirmado antes de acreditar tu asignación de OPEN. Los reembolsos (si no se alcanza el soft cap) se pagan en USDC, no en el activo original.",
    whatIsOpen: "Qué es OPEN",
    whatIsOpenBody:
      "OPEN es el token de utilidad y gobernanza del protocolo. No es el activo que se opera: las liquidaciones del mercado ocurren en monedas estables como USDC. OPEN lo hacen stake comerciantes, árbitros, operadores de nodos y proveedores de servicios como responsabilidad económica, y conlleva derechos de gobernanza.",
    supplyTitle: "Suministro fijo",
    supplyBody:
      "OPEN se emite una vez en el génesis con un suministro máximo fijo, y cada asignación inicial es verificable públicamente en cadena.",
    allocationTitle: "Categorías de asignación",
    allocationNote:
      "Los porcentajes de asignación se detallan en el Documento de Tokenomics de OPEN.",
    useOfFundsTitle: "Qué financia la preventa",
    vestingTitle: "Vesting y protecciones",
    whatVests: "Qué tiene vesting",
    vestingNote:
      "Las asignaciones a largo plazo se desbloquean según calendarios publicados en lugar de todas a la vez, y cada liberación es visible en cadena.",
    protectionsTitle: "Protecciones",
    riskTitle: "Riesgo",
    riskBody:
      "Nada aquí es una oferta de venta de valores ni asesoramiento financiero. Los términos pueden cambiar. Participar en una venta de tokens puede acarrear pérdida total.",
    rewardsTitle: "Tus recompensas de OPEN",
    rewardsSubtitle: "Conecta la billetera con la que contribuiste.",
    rewardsConnectPrompt:
      "Conecta tu billetera para comprobar lo que ganaste en la preventa.",
    rewardsContributed: "Contribuiste",
    rewardsEntitlement: "Recompensa de OPEN",
    rewardsNoContribution:
      "No se encontró ninguna contribución para esta billetera.",
    rewardsNoContributionCta: "Únete a la preventa",
    rewardsPendingNote:
      "Se cuenta una vez que la venta se finalice: vuelve a comprobar tras el cierre.",
    rewardsClaimedNote: "Ya reclamada a esta billetera.",
    rewardsRefundableNote:
      "No se alcanzó el soft cap: esta contribución es reembolsable en USDC en la página de la venta.",
    rewardsGoToSale: "Ir a la página de la venta",
  },

  pages: {
    roadmap: {
      eyebrow: "hoja de ruta",
      title: "Hoja de ruta",
      intro:
        "La versión 1.0 de las especificaciones es el punto de partida, no la meta. El Capítulo 26 expone las fases; cada elemento de abajo es un hito en lugar de una función ya entregada.",
    },
    downloads: {
      eyebrow: "descargas",
      title: "Descargas",
      intro:
        "Renders en PDF por capítulo del documento técnico. No hay PDF de las especificaciones OFS: léelas en el sitio o en el repositorio de especificaciones.",
    },
    documentation: {
      eyebrow: "documentación",
      title: "Documentación",
      intro:
        "La documentación para desarrolladores está en docs.openfiat.network. Las especificaciones mismas son la referencia autorizada y se publican completas aquí.",
    },
    foundation: {
      eyebrow: "gobernanza",
      title: "Fundación",
      intro:
        "El documento técnico se refiere a AllenHark y a una Fundación OpenFiat sin definir la relación entre ambas. Esta página describirá la estructura de administración una vez que se resuelva.",
    },
    community: {
      eyebrow: "comunidad",
      title: "Comunidad",
      intro:
        "Áreas de contribución nombradas en el Capítulo 25: desarrollo de software, documentación, investigación de seguridad, informes de errores, servicios de infraestructura, material educativo, localización y herramientas para desarrolladores.",
    },
    blog: {
      eyebrow: "blog",
      title: "Blog",
      intro:
        "Aquí se publicarán actualizaciones del protocolo y notas de ingeniería.",
    },
    press: {
      eyebrow: "prensa",
      title: "Prensa",
      intro:
        "Recursos de marca y consultas de prensa. Para cualquier cosa factual sobre el protocolo, el documento técnico y las especificaciones son la fuente.",
    },
    careers: {
      eyebrow: "empleo",
      title: "Empleo",
      intro: "Aquí se listarán las vacantes abiertas.",
    },
    status: {
      eyebrow: "estado",
      title: "Estado",
      intro:
        "Estado de la red y los servicios. Aún no hay ninguna red pública en marcha, así que no hay nada que informar.",
    },
    contact: {
      eyebrow: "contacto",
      title: "Contacto",
      intro:
        "Para preguntas sobre el protocolo, abre un debate en el repositorio de especificaciones para que la respuesta sea pública y buscable.",
    },
    privacy: {
      eyebrow: "legal",
      title: "Política de privacidad",
      intro:
        "Esta página necesita revisión legal antes del lanzamiento y no es definitiva.",
    },
    terms: {
      eyebrow: "legal",
      title: "Términos de uso",
      intro:
        "Esta página necesita revisión legal antes del lanzamiento y no es definitiva.",
    },
  },

  tokenomics: {
    supplyLabel: "Suministro máximo",
    supplyPending: "Fijado en el génesis",
    allocationAria: "Asignación de OPEN",
    provisional:
      "Los porcentajes de asignación son provisionales y se finalizarán en el Documento de Tokenomics de OPEN.",
    proceedsTitle: "Qué financia la preventa",
  },

  common: {
    readWhitepaper: "Lee el documento técnico",
    notFoundTitle: "Página no encontrada",
    notFoundBody:
      "Esa página no existe. Puede que se haya movido, o que el enlace sea incorrecto.",
    goHome: "Ir a la página de inicio",
    errorTitle: "Algo salió mal",
    errorBody:
      "Esta página no se pudo renderizar. Recargar puede solucionarlo; si no, el problema es nuestro.",
    tryAgain: "Reintentar",
  },
};
