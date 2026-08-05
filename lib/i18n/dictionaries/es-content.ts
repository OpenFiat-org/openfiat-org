import type { ContentDictionary } from "./en-content";

/**
 * Spanish long-form content — a complete translation, typed as
 * ContentDictionary so a missing key fails the build. Specification ids
 * (OFS-####), code identifiers (getChainStatus, --public-rpc-url,
 * openfiat-node, RocksDB, libp2p…), repository names, acronyms defined in the
 * glossary, and proper nouns are left as-is.
 */
export const esContent: ContentDictionary = {
  home: {
    rails: [
      "Transferencia bancaria",
      "Dinero móvil",
      "ACH",
      "SEPA",
      "Faster Payments",
      "PIX",
      "Depósito en efectivo",
      "Redes regionales de pago instantáneo",
    ],
  },

  trust: {
    flow: [
      {
        title: "Eliges una oferta",
        body: "Las ofertas muestran el precio, los métodos de pago aceptados, los límites y cómo se ha comportado la otra parte en operaciones anteriores. Aún no hay ningún compromiso.",
      },
      {
        title: "Su cripto va al depósito en garantía",
        body: "Antes de que se mueva dinero, las monedas estables del vendedor quedan bloqueadas en un depósito en garantía en cadena. El vendedor no puede recuperarlas y el comprador no puede tomarlas antes de tiempo. Este es el paso que hace seguro todo lo demás.",
      },
      {
        title: "Pagas como pagas normalmente",
        body: "Transferencia bancaria, dinero móvil, una red de pago instantáneo o efectivo. El pago ocurre por tus rieles habituales, no en una cadena de bloques, y lo marcas como enviado cuando esté hecho.",
      },
      {
        title: "El depósito se libera",
        body: "El vendedor confirma que el dinero llegó y el depósito se libera automáticamente. Si no confirma, o algo va mal, cualquiera de las partes puede abrir una disputa.",
      },
    ],

    pillars: [
      {
        title: "El depósito en garantía va primero",
        body: "Los fondos se bloquean antes de que se mueva el fiat, siempre. Un comprador nunca envía dinero esperando que la otra parte lo honre, y un vendedor nunca libera monedas esperando que el pago aparezca.",
      },
      {
        title: "La reputación se gana, no se compra",
        body: "Cada operación completada, cada disputa y cada tiempo de respuesta forma parte de un registro público ligado a una billetera. No se puede comprar una buena reputación, ni dejar atrás una mala abriendo una cuenta nueva.",
      },
      {
        title: "Tu identidad sigue siendo tuya",
        body: "No hay KYC. En lugar de preguntar quién eres, el protocolo te permite demostrar qué controlas —un correo, un teléfono, una cuenta de Telegram— y nunca establece tu nacionalidad ni tu situación legal.",
      },
      {
        title:
          "Las billeteras marcadas como maliciosas se señalan, y algunas se bloquean",
        body: "Proveedores independientes publican información de riesgo firmada sobre billeteras ligadas a fraude o sanciones. La mayor parte es orientativa: tu app puede advertirte, pedir confirmación o ignorarla. Por encima se sitúa una lista de baneo mantenida por gobernanza, y una billetera en ella no puede depositar en ninguna bóveda de todo el protocolo. Los proveedores publican las pruebas; solo un voto de gobernanza añade o retira una entrada, y ambos sentidos quedan registrados en cadena. Esto aún no está construido.",
      },
    ],

    dispute: [
      {
        title: "Cualquiera de las partes abre un caso",
        body: "Plantear una disputa no le cuesta nada al comprador. El depósito de arbitraje lo aporta el comerciante desde su bóveda de liquidez, sea cual sea la parte que abrió el caso, y solo lo pierde si el resultado va en su contra. Ambas partes presentan pruebas: recibos, confirmaciones de pago, la conversación de la operación. El depósito está especificado y aún no se cobra.",
      },
      {
        title: "Los árbitros hacen stake para tomar el caso",
        body: "Los árbitros cualificados eligen casos en lugar de que se les asignen, y deben comprometer su propio OPEN antes de que se les permita ver las pruebas. Como las pruebas están ocultas hasta que se comprometen, no hay nada por lo que sobornarlos de antemano.",
      },
      {
        title: "Votan sin verse entre sí",
        body: "Cada árbitro publica primero un compromiso sellado y revela su decisión después, así que nadie puede seguir a la multitud. El número de árbitros en un caso no se publica, lo que impide adivinar cuánto hay en juego.",
      },
      {
        title: "El depósito liquida el resultado",
        body: "La decisión se ejecuta en cadena. El diseño paga a los árbitros de la mayoría y toma parte del stake de los que quedan fuera de ella, con penalizaciones deliberadamente moderadas: el objetivo es disuadir la negligencia y la colusión, no castigar el desacuerdo honesto. Ni la recompensa ni la penalización están implementadas todavía, así que hoy un voto no gana nada y votar contra el consenso no cuesta nada.",
      },
    ],
  },

  protocol: {
    solanaBlurb:
      "Programas en cadena auditados guardan los activos. La custodia no depende de que OpenFiat esté en línea, sea alcanzable, o siga siquiera mantenido.",
    solanaItems: [
      "Custodia de activos",
      "Ejecución del depósito en garantía",
      "Staking",
      "Tesorería",
      "Ejecución de la gobernanza",
    ],
    openfiatBlurb:
      "Una red abierta entre pares lleva el mercado. Cualquiera puede ejecutar una pieza de ella, y ningún operador individual puede derribarla.",
    openfiatItems: [
      "Descubrimiento de anuncios",
      "Coordinación de operaciones",
      "Reputación",
      "Mensajería cifrada",
      "Descubrimiento de servicios",
      "Notificaciones",
      "Recuperación de sesión",
    ],
    principles: [
      {
        title: "Verifica el control, no la identidad",
        body: "En lugar de determinar quién es alguien, OpenFiat verifica qué controla. No establece nacionalidad, ciudadanía ni situación legal, y no requiere KYC.",
      },
      {
        title: "Protocolo, no plataforma",
        body: "Ninguna empresa posee el correo electrónico. Miles de proveedores independientes implementan un estándar común. OpenFiat está construido de la misma manera.",
      },
      {
        title: "La reputación se gana",
        body: "Un usuario recién verificado tiene menos historial observable que un comerciante anónimo que ha completado miles de operaciones a lo largo de años.",
      },
      {
        title: "Descentraliza solo lo que se beneficia de ello",
        body: "El depósito en garantía se beneficia de la ejecución en cadena. Los listados de anuncios no. La prueba es si descentralizar mejora la seguridad, la resiliencia, la transparencia o la propiedad.",
      },
      {
        title: "No es otra cadena de bloques",
        body: "OpenFiat no introduce ningún algoritmo de consenso competidor. En lugar de reemplazar las cadenas existentes, las extiende.",
      },
      {
        title: "Diseñado para sobrevivir a sus creadores",
        body: "AllenHark lidera el desarrollo inicial y está diseñado para volverse innecesario. Ningún participante individual debería ser imprescindible.",
      },
    ],
  },

  actorGroups: {
    participants: {
      title: "Cualquiera puede ser esto",
      blurb: "Operar no necesita registro ni stake. Anunciarse sí.",
    },
    providers: {
      title: "Roles de infraestructura y servicio",
      blurb: "Opera parte de la red y gana con los ingresos del protocolo.",
    },
    builders: {
      title: "Construir sobre el protocolo",
      blurb: "Un protocolo, muchas implementaciones.",
    },
  },

  actors: {
    buyers: {
      name: "Compradores y vendedores",
      definition:
        "Un comprador es cualquier participante que acepta un anuncio existente.",
      summary: "Compra y vende monedas estables por moneda local.",
      responsibilities: [
        "Explorar anuncios y filtrar por país, moneda, método de pago y cantidad",
        "Reservar una operación, lo que mueve monedas estables al depósito en garantía antes de enviar fiat",
        "Enviar o recibir el pago fiat por el riel acordado",
        "Marcar el pago como enviado, y confirmar la recepción como contraparte",
        "Presentar una disputa con pruebas si algo va mal",
      ],
      stake:
        "Ninguno. Los compradores no publican anuncios, no hacen stake de nada y no pagan nada por plantear una disputa: el depósito de arbitraje lo aporta el comerciante sin importar quién abra el caso. El único coste de un comprador es la comisión de liquidación, y solo en una operación que se completa.",
      earns:
        "Nada directamente. El beneficio es la competencia entre comerciantes y no depender de que un único operador siga en línea.",
      requirements: [
        "Una billetera de autocustodia",
        "Sin KYC y sin verificación de identidad centralizada",
        "Opcionalmente, declaraciones de identidad voluntarias que prueben el control de un correo, Telegram u otro canal",
      ],
    },
    merchants: {
      name: "Comerciantes",
      definition:
        "Los comerciantes son participantes que proveen liquidez al mercado de forma continua.",
      summary: "Provee liquidez y publica anuncios.",
      responsibilities: [
        "Publicar anuncios firmados digitalmente para comprar o vender monedas estables por fiat local",
        "Elegir precio fijo o precio flotante contra una tasa de referencia de un oráculo",
        "Admitir uno o más países y métodos de pago",
        "Gestionar la disponibilidad entre los estados en línea, fuera de línea y vacaciones",
        "Verificar que el pago fiat llegó, luego liberar el depósito en garantía",
        "Renovar los anuncios antes de que caduquen",
      ],
      stake:
        "El registro de comerciante requiere hacer stake de OPEN. Desalienta el spam, aporta responsabilidad económica y fija la capacidad inicial de anuncios del comerciante. Es importante que el stake del comerciante no respalda operaciones individuales: la liquidación la asegura la bóveda de garantía. Hacer stake tampoco otorga reputación, que debe ganarse con operaciones completadas.",
      earns:
        "El margen sobre su propio precio. Los comerciantes pagan comisiones del protocolo en lugar de recibirlas: un anuncio conlleva una comisión de listado en OPEN, y el depósito de arbitraje en una operación disputada sale de la bóveda del comerciante. Ninguno se cobra todavía: ambos están especificados y ninguna instrucción los lee, así que anunciarse hoy no cuesta nada.",
      requirements: [
        "Registrar un perfil de comerciante antes de anunciarse",
        "Hacer stake de OPEN; la capacidad escala con el stake, la reputación, la antigüedad de la cuenta, el historial de operaciones y la tasa de disputas",
        "Declarar los países y métodos de pago admitidos",
      ],
    },
    "node-operators": {
      name: "Operadores de nodos",
      definition:
        "Los operadores de nodos son la columna vertebral de la red OpenFiat. Los validadores de Solana aseguran la cadena de bloques y ejecutan los programas de OpenFiat; los operadores de nodos mantienen el mercado descentralizado que existe por encima de ella.",
      summary: "Ejecuta la capa del mercado entre pares.",
      responsibilities: [
        "Mantener conexiones entre pares y participar en la propagación por gossip",
        "Sincronizar el estado del mercado y alojar los índices de anuncios",
        "Distribuir los vectores de reputación y riesgo",
        "Difundir los eventos del ciclo de vida de las operaciones",
        "Mantener el directorio de proveedores y publicar la salud del nodo",
        "Servir a las aplicaciones cliente",
      ],
      stake:
        "Requerido para ser un participante activo. Pero el stake por sí solo no determina la reputación: un operador con mal rendimiento no puede compensarlo haciendo más stake. La prioridad efectiva combina reputación, stake y el rendimiento de red medido, y los nodos con stake son elegibles para las recompensas del protocolo.",
      earns:
        "La compensación proviene de los ingresos del protocolo en lugar de la inflación del token, ponderada por stake, conectividad y disponibilidad: un nodo que hace de puente hacia Solana gana más que uno que solo propaga por gossip. La fórmula está publicada en OFS-4100 §9.2. Nada la paga todavía: el cálculo existe, pero nada envía el resultado y la bóveda de recompensas está vacía.",
      requirements: [
        "Hardware de servidor de consumo: 4 núcleos, 16 GB de RAM y 250 GB NVMe como mínimo",
        "Una conexión estable y una identidad de nodo generada",
        "Sin aprobación de nadie: cualquier participante que cumpla los requisitos del protocolo puede ejecutar un nodo",
      ],
    },
    arbitrators: {
      name: "Árbitros",
      definition:
        "OpenFiat distribuye la resolución de disputas entre árbitros independientes con incentivos económicos para llegar a decisiones honestas.",
      summary: "Resuelve disputas bajo responsabilidad económica.",
      responsibilities: [
        "Descubrir los casos publicados y unirse voluntariamente, en lugar de que se le asignen",
        "Comprometer stake específico del caso para obtener acceso a las pruebas",
        "Revisar recibos, confirmaciones de pago y la comunicación de la operación",
        "Votar mediante un esquema de comprometer-y-revelar, luego revelar antes del plazo",
      ],
      stake:
        "Por caso. Un árbitro compromete stake adicional por cada caso al que se une, y ese caso queda asegurado económicamente hasta la resolución. Los árbitros cuyo voto revelado quede fuera del consenso final pueden perder parte de ese stake. Las penalizaciones son intencionadamente moderadas: el objetivo es desalentar la negligencia y la colusión, no castigar el desacuerdo de buena fe.",
      earns:
        "El diseño financia las recompensas desde el fondo de arbitraje, repartidas entre los árbitros cuyo voto revelado coincidió con el resultado, a prorrata por peso revelado. Nada de ello está implementado: un árbitro no gana nada hoy, y no hay ningún campo en cadena que albergue un pago.",
      requirements: [
        "Un stake mínimo de OPEN y una reputación mínima de árbitro",
        "Antigüedad suficiente en el protocolo y sin penalizaciones de arbitraje activas",
        "Compatibilidad actual con el protocolo",
      ],
    },
    "notification-gateways": {
      name: "Pasarelas de notificaciones",
      definition:
        "Una Pasarela de Notificaciones es cualquier servicio que implementa la Especificación de Pasarela de Notificaciones de OpenFiat.",
      summary: "Entrega notificaciones opcionales en nombre de los usuarios.",
      responsibilities: [
        "Aceptar eventos de notificación del protocolo y entregarlos por cualquier transporte",
        "Devolver recibos de entrega",
        "Verificar los puntos de contacto del usuario mediante códigos de un solo uso o retos de bot",
        "Registrar los canales admitidos, las regiones y los precios en el registro de servicios",
      ],
      stake:
        "5.000 OPEN, exigidos por el programa de staking cuando haces stake contra el rol de pasarela de notificaciones. Compra responsabilidad económica y resistencia Sybil en lugar de trato preferente: nada enruta hoy el tráfico de notificaciones por stake, así que cumplir el mínimo hace elegible a una pasarela, no favorecida.",
      earns:
        "Nada todavía. El modelo previsto es una parte de una pequeña comisión fija en OPEN que un participante paga para habilitar notificaciones en una operación, con el resto repartido entre las asignaciones de tesorería y ecosistema, pero hoy no existe tal comisión en ninguna parte del protocolo y no se pagan recompensas a las pasarelas. Considéralo intención de diseño, no ingresos.",
      requirements: [
        "Implementar la especificación de notificaciones publicada",
        "Registrar los metadatos de la pasarela: canales, versión del protocolo, precios, endpoints",
        "Aceptar que las pasarelas reciben solo la información mínima necesaria para entregar, nunca saldos, pruebas de disputa ni estado del mercado no relacionado",
      ],
    },
    "oracle-providers": {
      name: "Proveedores de oráculos",
      definition: "Cualquiera puede operar un Proveedor de Oráculos.",
      summary: "Publica datos firmados de tasas de cambio y regionales.",
      responsibilities: [
        "Publicar tasas de cambio firmadas como USD/KES y USDC/USD",
        "Publicar metadatos de monedas estables: decimales, emisor, redes admitidas, direcciones de contrato",
        "Publicar datos de infraestructura de pago: rieles admitidos, festivos bancarios, interrupciones",
        "Publicar metadatos regionales: monedas admitidas, identificadores de país, información de configuración regional",
      ],
      stake:
        "Requerido antes de publicar información de precios. Los proveedores que publican de forma constante datos incorrectos o no disponibles pueden perder la elegibilidad para recompensas y enfrentarse a penalizaciones definidas por gobernanza; la mala conducta probada de un oráculo es una causa declarada de slashing.",
      earns:
        "Las lecturas son gratuitas, y al proveedor lo paga el protocolo: escalado según cuántos pares de monedas cubra realmente y según el tiempo de actividad observado. La fórmula se propone en OFS-4100 §9.6 y no es definitiva, y nada la paga todavía.",
      requirements: [
        "Registrarse a través del registro de servicios con los pares admitidos y la frecuencia de actualización",
        "Firmar cada registro: las actualizaciones de oráculo sin firmar deben rechazarse",
        "Aceptar que los datos del oráculo nunca fuerzan un precio de operación; son solo una referencia",
      ],
    },
    "snapshot-providers": {
      name: "Proveedores de snapshots",
      definition:
        "El alojamiento de snapshots es en sí mismo un servicio del protocolo. Cualquier participante cualificado puede convertirse en proveedor de snapshots.",
      summary:
        "Publica snapshots de estado para que los nodos nuevos sincronicen rápido.",
      responsibilities: [
        "Generar snapshots comprimidos sin interrumpir la operación del mercado",
        "Publicar hashes de integridad, una raíz de estado y metadatos firmados",
        "Mantener la disponibilidad de descarga y un ancho de banda alto",
        "Conservar varios snapshots históricos",
      ],
      stake:
        "Requerido, como compromiso de infraestructura. Publicar snapshots corruptos figura entre los comportamientos maliciosos sujetos a slashing aprobado por gobernanza.",
      earns:
        "Nada. Las descargas son gratuitas y el rol no conlleva compensación, por decisión: servir un snapshot es un coste marginal sobre una infraestructura que un operador de nodo ya ejecuta y por la que ya se le paga. No hay ingresos en un servicio de snapshots independiente y no se planea ninguno.",
      requirements: [
        "Anunciar la capacidad a través del registro de servicios",
        "Publicar los metadatos completos del snapshot, incluida la altura del snapshot y la raíz de estado",
        "Firmar cada snapshot; los clientes verifican la firma, la compatibilidad y la raíz de estado antes de importar",
      ],
    },
    "risk-intelligence-providers": {
      name: "Proveedores de inteligencia de riesgo",
      definition:
        "El único rol de proveedor que requiere aprobación de gobernanza antes de operar.",
      summary: "Publica información orientativa de riesgo de billeteras.",
      responsibilities: [
        "Publicar registros de riesgo firmados que nombren la dirección de la billetera, la categoría, la severidad y la confianza",
        "Cubrir análisis de cadena de bloques, inteligencia de fraude, señales de cumplimiento o informes de la comunidad",
        "Admitir el consenso multiproveedor y el manejo de falsos positivos",
      ],
      stake:
        "No especificado: este es el único rol de proveedor que la tabla de staking del documento técnico omite, y no aparece ningún requisito de stake para él en ninguna parte. Lo que restringe el rol es la aprobación por gobernanza, no el stake: una suscripción permanente extraída de la tesorería no tiene un límite natural al abuso como sí lo tiene un oráculo inútil.",
      earns:
        "Una suscripción fija pagada por la tesorería: 1.000 USDC al mes por defecto, escalada según el tiempo de actividad observado, configurable por gobernanza y previsto que cambie a medida que la red crezca. Ni el pago ni la barrera de aprobación anterior están construidos todavía.",
      requirements: [
        "Registrarse a través del registro de servicios",
        "Aceptar que los registros son orientativos: las aplicaciones pueden rechazar depósitos, advertir, requerir confirmación o ignorar del todo el aviso",
      ],
    },
    "bootstrap-nodes": {
      name: "Nodos de arranque",
      definition:
        "Los nodos de arranque tienen una sola responsabilidad: presentar los nodos recién unidos a la red existente. Son directorios, no coordinadores centralizados.",
      summary: "Presenta los nodos nuevos a la red, y luego se aparta.",
      responsibilities: [
        "Responder a las solicitudes de primer contacto con una lista de pares",
        "Nada más: no aprueban pares, no guardan estado exclusivo, no coordinan ni enrutan decisiones del protocolo",
      ],
      stake: "No especificado para este rol.",
      earns: "No especificado para este rol.",
      requirements: [
        "Registrado como servicio de arranque en el registro de servicios",
        "La gobernanza puede aprobar con el tiempo nodos de arranque adicionales operados por la comunidad",
        "Una vez completado el descubrimiento, los nodos de arranque se vuelven opcionales",
      ],
    },
    developers: {
      name: "Desarrolladores",
      definition:
        "Cualquiera puede construir software compatible sin pedir permiso.",
      summary: "Construye clientes, nodos, herramientas e integraciones.",
      responsibilities: [
        "Construir implementaciones independientes: nodos embebidos, software de pasarela, implementaciones de investigación, clientes personalizados",
        "Alojar interfaces de usuario: web, móvil, portales empresariales, mercados regionales",
        "Enviar propuestas de mejora y revisar especificaciones",
        "Contribuir con código, documentación, investigación de seguridad y localización",
      ],
      stake: "Ninguno. Los desarrolladores no hacen stake de nada.",
      earns:
        "Subvenciones de ecosistema de la Tesorería de Ecosistema, que financia subvenciones, alianzas, educación, hackathons e incentivos para desarrolladores.",
      requirements: [
        "Solo conformidad con la especificación: el protocolo es independiente del lenguaje",
        "Un ingeniero debería poder construir una implementación totalmente compatible solo a partir de las especificaciones",
      ],
    },
  },

  repos: {
    "openfiat-specs":
      "Las especificaciones canónicas del protocolo y el documento técnico. Todo en este sitio se genera a partir de él.",
    "openfiat-core":
      "El nodo de referencia, en Rust. Redes entre pares, gossip, estado del mercado, snapshots y las API del nodo.",
    "openfiat-sdks":
      "SDK oficiales para Rust, TypeScript y Python, más los datos de referencia compartidos de los que dependen.",
    "openfiat-app":
      "La aplicación web predeterminada: operaciones, vista de red, staking, gobernanza, disputas e historial.",
    "openfiat-apps":
      "Aplicaciones adicionales: panel de comerciante y explorador de red.",
    "openfiat-devtools":
      "Redes de prueba, vectores de conformidad del protocolo, benchmarks y fuzzing.",
    "openfiat-infra":
      "Imágenes de contenedor, charts de Helm, módulos de Terraform y el stack de monitorización.",
    "openfiat-docs": "El sitio de documentación para desarrolladores.",
    "openfiat-org": "Este sitio web.",
    "awesome-openfiat":
      "Una lista curada por la comunidad de proyectos, herramientas y recursos de OpenFiat.",
  },

  runNode: {
    minimumSpecs: [
      "4 núcleos de CPU",
      "16 GB de RAM",
      "SSD NVMe de 250 GB",
      "Conexión de banda ancha estable",
    ],
    recommendedSpecs: [
      "8–16 núcleos de CPU",
      "32 GB de RAM o más",
      "SSD NVMe de 1 TB",
      "Red de alto ancho de banda y baja latencia",
      "Protección eléctrica con SAI (UPS)",
      "Conectividad a internet redundante",
    ],
    internals:
      "El nodo es un único binario de Rust. libp2p (QUIC, Noise, Yamux) y RocksDB están compilados dentro: no hay nada que instalar por separado.",

    install: [
      {
        id: "source",
        title: "Compilar desde el código fuente: para producción, hoy",
        note: "Aún no se ha etiquetado ninguna versión, así que esta es actualmente la única forma de obtener un binario del nodo. Necesita el toolchain de Rust y un toolchain de C para RocksDB. Compílalo, colócalo en /usr/local/bin y ejecútalo bajo systemd: ese es el despliegue que documenta esta página, y el que usar para un nodo del que otros dependen.",
      },
      {
        id: "binary",
        title: "Binario precompilado: una vez que se etiquete una versión",
        note: "Empujar una etiqueta v* ejecuta el flujo de release, que compila openfiat-node en runners nativos y publica archivos linux-x86_64 y windows-x86_64 en GitHub Releases. Aún no hay nada etiquetado, así que esa página está actualmente vacía. Ten en cuenta que son builds de release ordinarios, no estáticos ni firmados: verifica lo que descargues contra el flujo que lo produjo.",
      },
      {
        id: "docker",
        title: "Docker: solo para pruebas",
        note: "Usa la imagen para probar un nodo localmente o para levantar un clúster multinodo desechable, no para ejecutar un nodo del que dependa la red. Existe para pruebas locales reproducibles; producción ejecuta el binario bajo systemd.",
      },
    ],

    ports: {
      p2pQuic:
        "Tráfico entre pares. QUIC es el transporte principal, así que este puerto UDP debe ser alcanzable: el que la gente olvida abrir con más frecuencia.",
      api: "JSON-RPC, WebSocket, REST, salud y métricas: un solo puerto real sirve todo ello, no hay un puerto separado por superficie.",
      metrics:
        "El mismo puerto que la API anterior (GET /metrics). Restríngelo con firewall a loopback o a una red privada si no quieres que sea público.",
    },

    troubleshooting: {
      noPeers: {
        symptom: "No se conectan pares",
        cause:
          "UDP 4001 está bloqueado, o --entrypoint apunta a una dirección que los pares no pueden alcanzar realmente: debe ser un multiaddr/IP estático, no un nombre de host (el bootstrap por DNS no se resuelve). Tu propio nodo registra las direcciones en las que es alcanzable una vez que está escuchando.",
      },
      stuckSync: {
        symptom: "La sincronización nunca termina",
        cause:
          "La importación del snapshot (OFS-1300) no ha terminado, o ningún par ha anunciado aún un snapshot lo bastante reciente: comprueba getLatestSnapshot/getCheckpointHeight.",
      },
      highDisk: {
        symptom: "El uso de disco sigue creciendo",
        cause: "RocksDB no ha compactado.",
      },
      clockSkew: {
        symptom: "Firmas o caducidades rechazadas",
        cause:
          "Desfase del reloj. Los registros llevan marcas de tiempo y caducidad, así que el reloj del host tiene que ser correcto.",
      },
    },

    walkthrough: [
      {
        id: "prepare",
        title: "Prepara la máquina",
        body: "Un servidor Debian o Ubuntu actual, un firewall y un reloj preciso. El reloj importa más de lo que parece: los registros llevan marcas de tiempo y tiempos de caducidad, y un reloj desfasado hace que un nodo rechace datos válidos.",
      },
      {
        id: "install",
        title: "Instala el nodo",
        body: "Compila desde el código fuente y ejecuta el resultado bajo systemd: aún no se ha etiquetado ninguna versión, así que esa es la única forma de obtener un binario hoy, y el resto de este manual lo asume. Recurre a Docker solo cuando pruebes localmente o levantes un clúster desechable.",
      },
      {
        id: "identity",
        title: "Genera la billetera del nodo",
        body: 'No hay un formato de "identidad de nodo" separado: la identidad de un nodo es un wallet.json real de la CLI de Solana, el mismo archivo que produce solana-keygen. Su semilla se reutiliza tanto para la identidad de gossip/par del nodo como para su clave de firma de Solana. Conserva el archivo: si lo pierdes, el nodo se reincorpora como un desconocido y empieza a construir reputación de nuevo desde cero.',
      },
      {
        id: "configure",
        title: "Configura el entorno",
        body: "openfiat-node no tiene un archivo de configuración propio: cada ajuste es una variable de entorno, leída una vez al arrancar: dónde viven los datos, en qué dirección escuchar, a qué pares marcar al inicio y (opcionalmente) qué endpoint RPC de Solana usar. Los pares de arranque deben ser un multiaddr/IP estático, no un nombre de host: el bootstrap por DNS no se resuelve.",
      },
      {
        id: "firewall",
        title: "Abre los puertos correctos",
        body: "Los pares alcanzan el nodo por UDP porque QUIC es el transporte principal: ese es el puerto que la gente olvida con más frecuencia. Un puerto TCP sirve JSON-RPC, WebSocket, REST, salud y métricas juntos; mantenlo privado si no quieres servir clientes públicamente.",
      },
      {
        id: "reachable",
        title: "Sirve a la red: haz tu nodo alcanzable",
        body: "Este es el paso que convierte un nodo de algo que observa la red en algo que la lleva. Pon nginx delante y obtén un certificado, luego dile al nodo su URL pública con --public-rpc-url y se anuncia para que billeteras, exploradores y la propia app web de OpenFiat puedan usarlo. El orden importa: nginx sobre HTTP simple primero, luego certbot añade TLS: una configuración que ya nombra un certificado no puede arrancar, así que certbot falla antes de poder emitir el que lo habría arreglado. Un certificado no es un adorno opcional: una página servida por HTTPS no puede abrir una conexión HTTP simple, así que un nodo sin él es invisible para cualquier navegador por muy sano que esté.",
      },
      {
        id: "service",
        title: "Ejecútalo como servicio",
        body: "Bajo systemd el nodo se reinicia tras un fallo o reinicio, y obtiene un periodo de gracia de apagado lo bastante largo para que la base de datos se vacíe limpiamente en lugar de ser matada a media escritura.",
      },
      {
        id: "sync",
        title: "Déjalo ponerse al día",
        body: "En lugar de reproducir todo el historial, un nodo nuevo puede descubrir e importar un snapshot anunciado por un par del estado actual del mercado (OFS-1300): métodos JSON-RPC reales, no una herramienta aparte: getLatestSnapshot, getCheckpointHeight. La firma, la versión del protocolo y la raíz de estado tienen que coincidir antes de confiar en él.",
      },
      {
        id: "verify",
        title: "Comprueba que está sano",
        body: "GET /health confirma que el proceso está en marcha; getChainStatus por JSON-RPC te dice si es GossipOnly o RpcConnected, y su blockhash actual si es lo segundo.",
      },
      {
        id: "register",
        title: "Ya forma parte de la red",
        body: 'No hay un paso de "anunciar" separado: una vez que un nodo tiene pares de arranque, propaga por gossip y se le propaga automáticamente; nadie lo aprueba. Hacer stake, publicar metadatos en el registro de servicios, unirse a disputas y emitir votos de gobernanza son acciones separadas impulsadas por billetera que un cliente realiza contra el nodo en marcha: consulta la guía de participación correspondiente a cada una.',
      },
      {
        id: "monitor",
        title: "Vigílalo",
        body: "Las señales que realmente predicen problemas son los pares conectados, el modo de cadena (GossipOnly vs RpcConnected) y la antigüedad del blockhash. Alerta sobre esas y lo sabrás antes que tus usuarios.",
      },
      {
        id: "upgrade",
        title: "Mantenlo al día",
        body: "Detén, reemplaza el binario, arranca. Los nodos se actualizan de uno en uno, así que la red nunca necesita una interrupción coordinada, y los eventos de gossip perdidos se reproducen al arrancar.",
      },
      {
        id: "backup",
        title: "Respalda lo que no puede regenerarse",
        body: "El estado del mercado siempre puede re-sincronizarse desde un snapshot. La billetera no puede regenerarse. Los saldos y el depósito en garantía viven en Solana, no en tu disco.",
      },
    ],

    monitoring: [
      {
        group: "Infraestructura",
        items: ["CPU", "Memoria", "Disco", "Rendimiento de red"],
      },
      {
        group: "Protocolo (GET /metrics)",
        items: ["rpc_requests_total", "rpc_errors_total"],
      },
    ],
    monitoringNote:
      "Eso es todo lo que el nodo exporta hoy: el número de pares, el modo de cadena y el progreso de sincronización aún no son métricas de Prometheus, solo valores que puedes consultar por JSON-RPC (getChainStatus, getLatestSnapshot, getCheckpointHeight).",

    apis: [
      {
        group: "Mercado",
        items: [
          "Buscar anuncios",
          "Crear anuncios",
          "Actualizar anuncios",
          "Eliminar anuncios",
        ],
      },
      {
        group: "Operaciones",
        items: [
          "Reservar anuncios",
          "Sincronizar sesiones de operación",
          "Enviar confirmaciones de pago",
        ],
      },
      {
        group: "Infraestructura",
        items: [
          "Descubrimiento de pares",
          "Descubrimiento de pasarelas",
          "Información de snapshots",
          "Inteligencia de riesgo",
        ],
      },
      {
        group: "Gobernanza",
        items: [
          "Descubrimiento de propuestas",
          "Envío de votos",
          "Información de tesorería",
        ],
      },
    ],

    interfaces: [
      "Interfaz web oficial",
      "Interfaces de la comunidad",
      "Interfaces de comerciante",
      "Mercados regionales",
      "Portales empresariales",
    ],
  },

  becomeArbitrator: {
    requirements: [
      "Una billetera de Solana con al menos 10.000 OPEN —el min_stake_arbitrator de la configuración de staking desplegada, que la gobernanza puede cambiar—; deposítalos mediante la página Stake de openfiat-app, o las instrucciones de abajo si construyes tu propio cliente",
      "Una billetera que pueda firmar mensajes, algo que hace toda billetera de Solana importante: la página Arbitrate de openfiat-app ejecuta todo el caso en el navegador, y los SDK están ahí si prefieres programarlo",
      "Acceso de red al endpoint JSON-RPC de al menos un nodo OpenFiat, el tuyo o uno público",
    ],

    walkthrough: [
      {
        id: "bond",
        title: "Deposita OPEN para desbloquear el fondo de arbitraje",
        body: "Los árbitros deben hacer stake antes de poder ver las pruebas de un solo caso: eso es lo que hace inútil sobornar a uno (no sabes a qué caso apuntar) y le da a la red algo que recortar si votas contra el consenso revelado. La configuración desplegada de devnet fija el mínimo de árbitro en 10.000 OPEN, diez veces los 1.000 que aporta cada otro rol.",
      },
      {
        id: "discover",
        title: "Encuentra un caso abierto",
        body: "Los árbitros eligen qué disputas trabajar; nadie te asigna una. Consulta cualquier nodo para ver los casos a los que aún les falta su número requerido de árbitros.",
      },
      {
        id: "join",
        title: "Únete antes de poder ver las pruebas",
        body: "Unirse es lo que te desbloquea un caso: las presentaciones del comprador y del vendedor, las confirmaciones de pago y el registro de mensajes de su operación. Una vez que un caso tiene su cupo completo de árbitros, se bloquea y comienza la fase de compromiso.",
      },
      {
        id: "commit",
        title: "Compromete tu voto: dos veces",
        body: "Dos votos de comprometer-revelar corren en paralelo: uno fuera de cadena que se registra en el propio rastro de auditoría y la reputación del caso, y uno en cadena contra la cuenta DisputeCase de openfiat-escrow que realmente decide el resultado ponderado por stake. Usa la misma decisión y la misma sal para ambos, pero el enum propio de cada lado, no el mismo número: Invalid fuera de cadena es 2, InvalidDispute en cadena es 3, porque MutualSettlement ocupa el 2 en cadena. Haz el hash del byte equivocado y te comprometes a algo que nunca podrás revelar, que es precisamente lo que hace que a un árbitro le apliquen slashing.",
      },
      {
        id: "reveal",
        title: "Revela cuando se abra la ventana",
        body: "Revela tu resultado y tu sal en ambos lugares una vez que se cierre la ventana de compromiso. En cadena, aquí es también donde tu voto obtiene su peso real: la instrucción de revelado lee directamente tu cuenta de stake de rol Arbitrator, así que una billetera sin stake de árbitro sencillamente no puede aportar uno válido.",
      },
      {
        id: "resolve",
        title: "El resultado se ejecuta solo",
        body: "Una vez que todos los árbitros han revelado, o se cierra la ventana de revelado, cualquiera —tú, el comprador, el vendedor o un bot no relacionado— puede llamar a execute_dispute_outcome. Solo cuenta los votos ya registrados en cadena. El diseño paga entonces a la mayoría una parte de las comisiones del caso y toma parte del stake de quien reveló en contra, pero ni la recompensa ni la penalización están implementadas, así que hoy el recuento mueve los fondos de los traders y nada más.",
      },
    ],
  },

  sale: {
    allocationLabels: {
      presale: "Preventa comunitaria",
      allenhark: "Tesorería de AllenHark",
      ecosystem: "Tesorería de ecosistema",
      infrastructure: "Arranque de infraestructura",
      incentives: "Incentivos de la comunidad",
      liquidity: "Programas de liquidez",
      reserve: "Reserva estratégica",
    },
    allocationVesting: {
      presale: "Sin bloqueo: desbloqueado al reclamar",
      allenhark: "Cliff de 12 meses, luego 36 meses lineal",
      ecosystem: "Cliff de 12 meses, luego 36 meses lineal",
      infrastructure:
        "Emitido según las reglas de recompensa de nodos, no una liberación lineal",
      incentives: "Emitido a medida que se ganan los incentivos",
      liquidity: "Cliff de 3 meses, luego 24 meses lineal",
      reserve: "Cliff de 12 meses, luego 48 meses lineal",
    },
    useOfFunds: [
      "Ingeniería del protocolo central",
      "Auditorías de seguridad independientes",
      "Despliegue de infraestructura",
      "Documentación",
      "Crecimiento de la comunidad",
      "Herramientas para desarrolladores",
      "Educación y marketing",
      "Gastos legales y operativos de lanzamiento",
    ],
    vesting: [
      "Fundadores",
      "Miembros del equipo",
      "Asesores",
      "Socios estratégicos",
      "Ciertas asignaciones de preventa, cuando corresponda",
    ],
    protections: [
      "Asignaciones documentadas públicamente",
      "Calendarios de vesting transparentes",
      "Billeteras de tesorería públicamente conocidas",
      "Calendarios de liberación predecibles",
      "La gobernanza no puede emitir nuevo suministro en secreto",
    ],
  },

  glossary: [
    {
      term: "OPEN",
      expansion: null,
      definition:
        "El token de utilidad y gobernanza del protocolo. No es el activo que se opera: las liquidaciones usan monedas estables como USDC. OPEN se hace stake como responsabilidad económica y conlleva derechos de gobernanza. Se emite una vez en el génesis con un suministro máximo fijo.",
      specs: [],
    },
    {
      term: "OFS",
      expansion: "OpenFiat Protocol Suite",
      definition:
        "La serie de especificaciones numeradas. El número codifica la capa: 1000 redes, 2000 mercado, 3000 reputación, 4000 gobernanza, 5000 identidad, 6000 notificaciones, 7000 oráculo y riesgo.",
      specs: ["OFS-0000"],
    },
    {
      term: "OFNP",
      expansion: "OpenFiat Network Protocol",
      definition:
        "La capa de transporte entre pares que implementa todo nodo conforme, construida sobre libp2p con QUIC, Noise y Yamux.",
      specs: ["OFS-1000"],
    },
    {
      term: "OFTP",
      expansion: "OpenFiat Trade Protocol",
      definition:
        "El ciclo de vida de la operación: reserva, financiación del depósito en garantía, pago fiat, confirmación, liquidación. Una operación nunca puede saltarse un estado obligatorio.",
      specs: ["OFS-2000"],
    },
    {
      term: "OFIP",
      expansion: "OpenFiat Improvement Proposal",
      definition:
        "El vehículo de gobernanza para cambiar el protocolo, el equivalente a un RFC o un EIP.",
      specs: ["OFS-4000"],
    },
    {
      term: "SWQoS",
      expansion: "Stake-Weighted Quality of Service",
      definition:
        "Cómo se prioriza a los nodos. La prioridad efectiva combina reputación, stake y el rendimiento de red medido; hacer más stake no puede compensar un mal rendimiento.",
      specs: ["OFS-1600"],
    },
    {
      term: "Anuncio",
      expansion: null,
      definition:
        "Una declaración firmada públicamente que expresa la disposición de un comerciante a operar, con activo, dirección, moneda, límites, modelo de precios y métodos de pago.",
      specs: ["OFS-2100"],
    },
    {
      term: "Reserva",
      expansion: null,
      definition:
        "El paso que reclama una porción de un anuncio para un comprador concreto, antes de financiar el depósito en garantía.",
      specs: ["OFS-2200"],
    },
    {
      term: "Depósito en garantía",
      expansion: null,
      definition:
        "Custodia en cadena de las monedas estables durante la operación. Las monedas estables entran en el depósito antes de que empiece el pago fiat, así que un comprador nunca envía fiat sin que los fondos estén ya asegurados.",
      specs: ["OFS-2300"],
    },
    {
      term: "Bóveda de liquidez",
      expansion: null,
      definition:
        "La arquitectura en cadena que guarda los fondos de las operaciones. La liquidación de la operación se asegura aquí en lugar de con el stake del comerciante.",
      specs: [],
    },
    {
      term: "Gossip",
      expansion: null,
      definition:
        "Cómo se propagan por la red los eventos que cambian el estado, para que ningún nodo dependa de un feed central.",
      specs: ["OFS-1200"],
    },
    {
      term: "Snapshot",
      expansion: null,
      definition:
        "Una copia firmada y comprimida del estado del mercado con una raíz de estado, que permite a un nodo nuevo sincronizar rápido en lugar de reproducir todo el historial.",
      specs: ["OFS-1300"],
    },
    {
      term: "Nodo de arranque",
      expansion: null,
      definition:
        "Un directorio que presenta a un nodo recién iniciado a sus pares, y luego se vuelve opcional. No aprueba nada y no coordina nada.",
      specs: ["OFS-1100"],
    },
    {
      term: "Registro de servicios",
      expansion: null,
      definition:
        "El directorio donde los proveedores publican qué ofrecen y dónde. Es un directorio, no un mercado: no hace recomendaciones, y los clientes eligen por sí mismos.",
      specs: ["OFS-1500"],
    },
    {
      term: "Declaración de identidad",
      expansion: null,
      definition:
        "Una prueba voluntaria y firmada de que una billetera controla un canal de comunicación como un correo o una cuenta de Telegram. Establece control, nunca identidad legal, nacionalidad ni situación regulatoria.",
      specs: ["OFS-5000"],
    },
    {
      term: "Comprometer-revelar",
      expansion: null,
      definition:
        "El voto de árbitro en dos fases: publicar primero un compromiso, revelar el voto y el secreto después, para que ningún árbitro pueda ver los votos de los demás antes de emitir el suyo.",
      specs: ["OFS-2400"],
    },
    {
      term: "Slashing",
      expansion: null,
      definition:
        "Pérdida de parte de un stake por violaciones del protocolo. Las reglas son deterministas y están documentadas públicamente; las interrupciones ordinarias afectan a la reputación y a la elegibilidad para recompensas en lugar de desencadenar slashing.",
      specs: [],
    },
    {
      term: "Descentralización progresiva",
      expansion: null,
      definition:
        "El compromiso más repetido del documento técnico: AllenHark lidera el desarrollo inicial, y la responsabilidad de la infraestructura y la gobernanza está diseñada para transferirse a la comunidad.",
      specs: [],
    },
    {
      term: "AllenHark",
      expansion: null,
      definition:
        "La empresa que lidera el desarrollo inicial. Opera la infraestructura de arranque durante el lanzamiento y compite con cualquier otro proveedor bajo reglas de protocolo idénticas. Está diseñada para volverse innecesaria.",
      specs: [],
    },
  ],
};
