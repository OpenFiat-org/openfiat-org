import type { Dictionary } from "./en";

/**
 * French — a complete translation, typed as Dictionary so a missing key fails
 * the build. Proper nouns (OpenFiat, OPEN, USDC, Solana, AllenHark, GitHub,
 * Discord, Reddit, Apache-2.0, the OFS-#### and source-file references) stay
 * as-is, and every {placeholder} is preserved.
 */
export const fr: Dictionary = {
  meta: {
    tagline: "Change fiat pair-à-pair, décentralisé",
    description:
      "OpenFiat est un protocole ouvert pour échanger des stablecoins contre de la monnaie fiat locale, de pair à pair, sans opérateur de change centralisé. Règlement sur Solana ; coordination sur un réseau ouvert.",
  },

  nav: {
    howItWorks: "Comment ça marche",
    trust: "Confiance et sécurité",
    whitepaper: "Livre blanc",
    specs: "Spécifications",
    actors: "Participer",
    guides: "Guides",
    fees: "Frais",
    sale: "Vente de tokens",
    runNode: "Faire tourner un nœud",
    launchApp: "Ouvrir l’app",
    preview: "Aperçu",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    primaryLabel: "Principal",
    skipToContent: "Aller au contenu",
    language: "Langue",
  },

  footer: {
    blurb:
      "Un protocole ouvert pour échanger des stablecoins et de la monnaie fiat locale, de pair à pair. Règlement sur Solana, coordination sur un réseau ouvert.",
    columns: {
      protocol: "Protocole",
      participate: "Participer",
      network: "Réseau",
      project: "Projet",
      community: "Communauté",
    },
    links: {
      overview: "Vue d’ensemble du protocole",
      howItWorks: "Comment ça marche",
      trust: "Confiance et sécurité",
      whitepaper: "Livre blanc",
      specifications: "Spécifications",
      glossary: "Glossaire",
      roadmap: "Feuille de route",
      fees: "Frais",
      actors: "Tous les rôles",
      merchants: "Commerçants",
      nodeOperators: "Opérateurs de nœuds",
      developers: "Développeurs",
      guides: "Guides",
      becomeArbitrator: "Devenir arbitre",
      earn: "Comment vous gagnez",
      sale: "Vente de tokens",
      runNode: "Faire tourner un nœud",
      downloads: "Téléchargements",
      documentation: "Documentation",
      developerDocs: "Docs développeur",
      status: "Statut",
      app: "Ouvrir l’app",
      foundation: "Fondation",
      blog: "Blog",
      press: "Presse",
      careers: "Carrières",
      contact: "Contact",
      contribute: "Comment contribuer",
      github: "GitHub",
      discussions: "Discussions",
      discord: "Discord",
      reddit: "Reddit",
      privacy: "Confidentialité",
      terms: "Conditions",
    },
    siteLicense: "Ce site est open source sous licence Apache-2.0.",
    notice:
      "OpenFiat est un protocole ouvert, pas un service financier. Rien sur ce site ne constitue une offre de vente de valeurs mobilières ni un conseil financier. L’offre, l’allocation et les conditions de vente du token OPEN ne sont pas définitives et restent soumises à l’examen de la communauté et à la modélisation économique.",
  },

  home: {
    headlineLead: "Un marché",
    headlineAccent: "qu’aucun pays ni entreprise ne peut couper",
    headlineTail: ".",
    lede: "OpenFiat est un protocole ouvert pour échanger des stablecoins contre de la monnaie locale, de pair à pair. La garde est réglée sur Solana ; la découverte, la réputation et la communication tournent sur un réseau que n’importe qui peut rejoindre. Aucun gouvernement ne peut vous censurer et aucune entreprise ne peut vous suspendre — il n’y a pas d’opérateur à faire plier, seulement des participants.",
    ctaJoinSale: "Rejoindre la prévente communautaire",
    ctaHowItWorks: "Voir comment se déroule un échange",
    readWhitepaper: "Lire le livre blanc",
    tokenSale: "Vente de tokens",

    telemetry: {
      layers: "couches",
      stakedRoles: "rôles avec stake",
      specifications: "spécifications",
      repositories: "dépôts",
      centralOperators: "opérateurs centraux",
    },

    problem: {
      title: "Toute plateforme P2P aujourd’hui a la même architecture.",
      subtitle:
        "La crypto est décentralisée. Le marché ne l’est pas. Derrière presque tout échange pair-à-pair :",
      company: "Une seule entreprise",
      actions: [
        "possède les serveurs",
        "contrôle la base de données",
        "décide quelles annonces apparaissent",
        "tranche les litiges",
        "stocke les scores de réputation",
        "peut suspendre ou supprimer des utilisateurs",
        "décide quels pays sont pris en charge",
        "peut être fermée, piratée ou mise sous pression",
      ],
      verdict:
        "Si l’opérateur échoue — techniquement, financièrement ou juridiquement — le marché disparaît, même si la blockchain en dessous ne s’est jamais arrêtée. OpenFiat élimine cette dépendance.",
    },

    layers: {
      title: "Deux couches, chacune faisant ce qu’elle fait de mieux.",
      subtitle:
        "L’architecture minimise le coût on-chain tout en préservant la propriété décentralisée et la transparence.",
      coordination: {
        label: "Couche de coordination · réseau OpenFiat",
        title: "Communication rapide entre personnes",
        body: "Tourne sur un réseau pair-à-pair ouvert que n’importe qui peut rejoindre — aucune entreprise au milieu, aucun serveur à saisir.",
        items: [
          "Découverte des annonces",
          "Coordination des échanges",
          "Réputation",
          "Communication chiffrée",
          "Notifications et recherche",
          "Indexation du marché",
        ],
      },
      settlement: {
        label: "Couche de règlement · Solana",
        title: "Ce que les blockchains font exceptionnellement bien",
        body: "Les actifs sont verrouillés et libérés par des contrats intelligents audités — jamais par la bonne volonté d’un opérateur.",
        items: [
          "Garde sécurisée des actifs",
          "Gestion de la garde",
          "Staking",
          "Gestion de la trésorerie",
          "Exécution de la gouvernance",
        ],
      },
    },

    flow: {
      title: "Un échange, quatre mouvements",
      subtitle:
        "Protégé dès le deuxième mouvement — personne au milieu ne peut saisir les fonds, et personne n’a besoin de se fier à la bonne volonté de l’autre partie.",
      stages: ["Réseau", "On-chain", "Rail fiat", "On-chain"],
      pathsNote:
        "et poursuivez : des guides pour les traders, les opérateurs et les développeurs",
    },

    read: {
      title: "Lire le protocole",
      subtitle:
        "Chaque chapitre publié comme page web — sans téléchargement, rien derrière un formulaire. Ne suppose aucune expérience préalable de la blockchain et part de ce qu’est l’argent. Les spécifications numérotées sont juste à côté, pour ceux qui implémentent.",
      startHere: "commencez ici",
      moreChapters: (n: number) => `${n} chapitres de plus`,
      specsCta: (n: number) => `${n} spécifications`,
    },

    contribute: {
      title: "Construisez avec nous",
      subtitle:
        "Chaque couche est open source sous Apache-2.0, et le dépôt de spécifications accepte des textes et des traductions — contribuer ne veut pas forcément dire coder.",
    },

    saleBand: {
      body: "OPEN est le stake derrière chaque rôle qui garde le marché honnête — commerçants, arbitres, nœuds, oracles. La prévente propose l’allocation communautaire à un taux fixe avant toute vente publique. Aucun contrat de vente n’a encore été déployé ; connecter un portefeuille aujourd’hui ne fait que vérifier votre préparation.",
      bodyLive:
        "OPEN est le stake derrière chaque rôle qui garde le marché honnête — commerçants, arbitres, nœuds, oracles. La prévente propose l’allocation communautaire à un taux fixe avant toute vente publique. La prévente est active sur devnet ; connecter un portefeuille permet d’y contribuer dès aujourd’hui.",
      presaleRate: "Taux de prévente",
      publicRate: "Vente publique ensuite",
      publicRateValue: "1 USDC = 80 OPEN",
      supply: "Offre",
      supplyValue: "100 000 000 000 · autorité d’émission révoquée",
      status: "Statut",
      statusLive: "Active sur devnet",
      termsCta: "Conditions de vente et allocation",
    },

    safety: {
      more: "Comment fonctionne la confiance",
    },

    roles: {
      seeAll: "Voir tous les rôles",
    },

    finalCta: {
      title: "Votre argent, votre monnaie, sans intermédiaire.",
      body: "Commencez par un aperçu de cinq minutes, ou lisez le tout.",
      start: "Voir comment se déroule un échange",
    },
  },

  whitepaper: {
    title: "Le protocole OpenFiat, en entier",
    intro:
      "Chaque chapitre est publié ici comme page web — aucun téléchargement nécessaire, rien derrière un formulaire. Ne suppose aucune expérience préalable de la blockchain et part de ce qu’est l’argent.",
    chapters: (n: number) => `${n} chapitres`,
    words: (n: string) => `~${n} mots`,
    readTime: (h: number, m: number) => `~${h} h ${m} min de lecture`,
    startReading: "Commencer à lire",
    downloadPdfs: "Télécharger les PDF",
    frontMatter: "Préliminaires",
    chapter: (n: number) => `Chapitre ${n}`,
    expandsChapter: (n: number) => `développe le chap. ${n}`,
    englishOnlyTitle: "Publié en anglais",
    englishOnlyBody:
      "Le livre blanc et les spécifications ne sont pas encore traduits. La traduction est répertoriée comme domaine de contribution communautaire au Chapitre 25 ; la navigation de cette page est localisée, mais le texte du document reste l’anglais d’origine.",
  },

  specsPage: {
    title: "La suite de protocoles OpenFiat",
    intro: (count: number) =>
      `${count} spécifications numérotées. Le numéro encode la couche : les 1000 sont le réseau, les 2000 sont le marché, et ainsi de suite jusqu’aux oracles et à l’intelligence des risques.`,
    published: (n: number) => `${n} publiées`,
    layers: (n: number) => `${n} couches`,
    draft: "Version 1.0.0 · Brouillon",
    reservedTitle: "Plages réservées",
    notWritten: "Pas encore rédigée",
    reservedNote:
      "Les spécifications des plages réservées sont citées par des documents publiés, mais n’ont pas été rédigées. Les références qui y renvoient apparaissent en texte simple plutôt qu’en lien.",
  },

  reader: {
    onThisPage: "Sur cette page",
    minRead: (n: number) => `${n} min de lecture`,
    wordCount: (n: string) => `${n} mots`,
    sections: (n: number) => `${n} sections`,
    relatedChapter: "Chapitre lié",
    revisitsGround: "Ce chapitre revient sur ce qui a été traité dans",
    canonicalTreatment: ", qui en est le traitement canonique.",
    coversOverlapping:
      "couvre une matière qui se recoupe, sous un second angle.",
    dependsOn: "Dépend de",
    dependedOnBy: "Dont dépendent",
    navLabel: "Navigation du document",
    specifications: "Spécifications",
    whitepaper: "Livre blanc",
    layer: (name: string) => `Couche ${name}`,
  },

  actors: {
    title: "Acheteurs, commerçants, arbitres, opérateurs de nœuds",
    intro:
      "Dix rôles font tourner OpenFiat — certains, vous les endossez rien qu’en échangeant, d’autres en faisant tourner de l’infrastructure. Personne n’accorde d’autorisation pour aucun d’eux.",
    whatTheyDo: "Ce qu’ils font",
    whatTheyStake: "Stake",
    howTheyEarn: "Comment ils gagnent",
    requirements: "Prérequis",
    repositories: "Dépôts",
    governedBy: "Régi par",
    noStake: "Aucun stake requis",
    noStakeStated: "Non précisé dans le livre blanc",
    notStated: "Non précisé dans le livre blanc",
    readMore: "En savoir plus",
    otherRoles: "Autres rôles",
    permissionless: "Sans permission",
    stakeNote:
      "Le stake démontre un engagement économique envers l’écosystème. Ce n’est pas un paiement. Les participants restent propriétaires de leur stake, sauf application de pénalités définies par le protocole.",
  },

  howItWorks: {
    title: "Comment se déroule un échange",
    lede: "Quatre étapes. La crypto de votre contrepartie est verrouillée avant que vous ne cédiez le moindre argent, et le reste jusqu’à ce que vous conveniez tous deux que le paiement est arrivé.",
    flowTitle: "Les quatre étapes",
    needTitle: "Ce qu’il vous faut",
    need: [
      "Un portefeuille que vous contrôlez — pas de compte, pas d’inscription, pas de KYC",
      "Des stablecoins à vendre, ou de la monnaie locale pour acheter",
      "Un moyen de paiement que vous utilisez déjà",
    ],
    railsTitle: "Comment payer",
    railsLede:
      "Le côté fiat passe par les rails que vous utilisez déjà. OpenFiat standardise la manière dont un moyen de paiement est décrit et confirmé, pas la manière dont il fonctionne.",
    safetyTitle: "Si quelque chose tourne mal",
    safetyLede:
      "L’une ou l’autre partie peut ouvrir un litige, et des arbitres indépendants le tranchent avec leur propre stake en jeu.",
    safetyMore: "Comment fonctionne la confiance",
  },

  trust: {
    title: "La confiance, sans personne à qui se fier",
    lede: "Un inconnu s’apprête à vous envoyer de l’argent dans une monnaie qu’aucune blockchain ne voit. Quatre mécanismes rendent cela sûr, et aucun n’est une entreprise qui promet d’être juste.",
    flowTitle: "Ce qui protège un échange individuel",
    pillarsTitle: "De quoi la confiance est faite",
    disputeTitle: "Quand un échange tourne mal",
    disputeLede:
      "L’une ou l’autre partie peut ouvrir un litige. Il est tranché par des arbitres indépendants qui misent leur propre OPEN sur le fait de voir juste, et qui ne peuvent pas voir les preuves avant de s’être engagés.",
    noAppeal:
      "Il n’y a pas d’appel dans la version 1. Le vote par engagement-révélation, les arbitres avec stake et les pénalités modérées sont les garde-fous, plutôt qu’une seconde audience.",
    readChapter: "Lire le protocole de litiges",
    readReputation: "Lire le moteur de réputation",
  },

  protocolPage: {
    title: "OpenFiat n’est pas une blockchain",
    lede: "C’est une couche de coordination qui repose sur une blockchain. Solana garde l’argent et exécute la garde ; OpenFiat porte tout ce dont un marché a besoin et qui n’a aucune raison d’être sur une chaîne — annonces, réputation, messagerie, découverte.",
    layersTitle: "Deux couches, chacune dans ce qu’elle fait de mieux",
    layersLede:
      "La séparation est tout le design. Décentralisez ce qui en profite, et laissez le reste là où il fonctionne le mieux.",
    settlement: "Couche de règlement",
    coordination: "Couche de coordination",
    principlesTitle: "Le raisonnement derrière",
    principlesLede:
      "Le Chapitre 3 pose douze principes dont tout le protocole est dérivé. Ces six-là font le plus gros du travail.",
    suiteTitle: "Une suite de spécifications numérotées",
    suiteLede: (count: number) =>
      `${count} spécifications formelles, regroupées par couche. Le numéro indique à quelle couche appartient un document.`,
    browseSpecs: "Parcourir les spécifications",
    readAll: "Lire les douze principes",
  },

  runNode: {
    title: "Faire tourner un nœud OpenFiat",
    intro:
      "Les opérateurs de nœuds maintiennent le marché décentralisé qui repose au-dessus de la blockchain. Les validateurs Solana sécurisent la chaîne et exécutent les programmes OpenFiat ; les nœuds portent les annonces, la réputation, la messagerie et la découverte.",
    neverCustody:
      "Les nœuds ne prennent jamais en garde les fonds des utilisateurs. Toutes les opérations financières restent sous le contrôle des contrats intelligents Solana.",
    requirementsTitle: "Matériel",
    installTitle: "Installation",
    releasesLink: "Releases GitHub",
    referenceNote:
      "Les commandes ci-dessous utilisent le déploiement de référence : le service openfiat-node, /etc/openfiat pour la configuration et /var/lib/openfiat pour les données.",
    serveRpcTitle: "Servez le réseau, pas seulement vous-même",
    serveRpc:
      "Un nœud qui ne fait que lire est un invité. Un nœud que le public peut atteindre est une infrastructure — portefeuilles, explorateurs et apps web doivent parler à *quelqu’un*, et aujourd’hui ces quelqu’un sont rares. Chaque opérateur qui place son nœud derrière TLS et définit --public-rpc-url élargit cet ensemble, ce qui fait la différence entre un réseau avec plusieurs portes d’entrée indépendantes et un réseau avec un point de défaillance unique dont tout le monde dépend en silence. Cela coûte un certificat et un reverse proxy. C’est aussi rémunéré : un nœud atteignable est un nœud que les pairs peuvent défier et récompenser, et les applications OpenFiat elles-mêmes utiliseront le vôtre au même titre que tous les autres.",
    serveRpcHonest:
      "Deux choses à savoir avant. Servir le public signifie du trafic réel, alors dimensionnez la machine en conséquence et surveillez l’endpoint de métriques. Et un nœud public est un engagement public — les gens vont bâtir contre l’URL que vous publiez, alors retirez-la délibérément plutôt qu’en silence.",
    portsTitle: "Ports",
    portPublic: "Doit être atteignable",
    portPrivate: "Gardez-le privé",
    troubleshootingTitle: "Quand quelque chose ne va pas",
    copy: "Copier",
    copied: "Copié",
    minimum: "Minimum",
    recommended: "Recommandé pour la production",
    lifecycleTitle: "Mettre un nœud en ligne",
    lifecycleNote:
      "Suivez ces étapes dans l’ordre. Chaque étape ci-dessous apporte la commande dont elle a besoin.",
    monitoringTitle: "Ce qu’un nœud doit exposer",
    stakingBody:
      "Un nœud met OPEN en stake pour devenir un participant actif. Mais le stake n’achète pas de réputation : un opérateur peu performant ne peut pas se rattraper en misant davantage. La priorité effective combine réputation, stake et performance réseau mesurée.",
    hostUiTitle: "Héberger l’interface utilisateur",
    hostUiIntro:
      "OpenFiat sépare le protocole de ses interfaces. N’importe qui peut héberger une interface web, une passerelle mobile, un portail d’entreprise ou un marché régional, et chacun atteint le même marché.",
    hostUiQuote:
      "Quelle que soit l’interface utilisée, chaque participant interagit avec le même marché décentralisé.",
    hostUiConnect: "Ce à quoi une interface se connecte",
    hostUiConnectBody:
      "Les interfaces ne parlent pas directement à la chaîne. Elles se connectent à un ou plusieurs nœuds OpenFiat proches, et basculent vers un autre nœud si l’un devient indisponible.",
    apiTitle: "Surface d’API du nœud",
    apiNote:
      "Chaque nœud conforme expose la même surface d’API, si bien qu’une interface écrite contre un nœud fonctionne contre tous.",

    hostingTitle: "Où le faire tourner",
    hostingIntro:
      "AllenHark mène le développement initial du protocole et vend les deux choses dont un nœud a besoin : un serveur et un accès RPC à Solana. Les opérateurs de nœuds bénéficient de {pct} % de remise sur les deux, dans le cadre du programme OpenFiat.",
    hostingVps: "Hébergement de serveurs",
    hostingVpsBody:
      "Stockage NVMe sur liens 10 Gbps, à Francfort, Amsterdam et Chicago. Dimensionnez d’après le matériel ci-dessus — le stockage est ce qu’un nœud complet finit par exiger, alors indiquez ce que vous faites tourner et il pourra être spécifié pour vous.",
    hostingRpc: "RPC et gRPC Solana",
    hostingRpcBody:
      "Connexions avec stake, pour que les transactions envoyées par votre nœud ne fassent pas la queue derrière celles de tout le monde. L’accès est accordé par liste blanche d’IP plutôt que par une clé d’API. Yellowstone gRPC est disponible pour diffuser les mises à jour de comptes et de slots.",
    hostingViewPricing: "Voir les tarifs",
    hostingClaimTitle: "Obtenir la remise",
    hostingClaimBody:
      "Aucun code à saisir. Demandez sur Discord ou dans le chat sur allenhark.com, dites que vous faites tourner un nœud OpenFiat, et la remise est appliquée à votre commande.",
    hostingDiscord: "Demander sur Discord",
    hostingChat: "Ouvrir un chat",
  },

  earn: {
    title: "Comment vous gagnez",
    intro:
      "La récompense d’un nœud est une part de l’émission d’une journée, décidée par ce qu’il a mis en stake et par trois mesures de ce qu’il a fait de ce stake. Voici la formule que le logiciel exécute réellement, avec les parties qu’il ne peut pas connaître marquées comme telles.",
    heroMeta:
      "Chaque constante de cette page est lue depuis crates/rewards dans openfiat-core. Aucun nœud n’a encore été payé.",

    modelTitle: "Ce qui décide de votre part",
    modelIntro:
      "L’émission par époque est fixe. Votre récompense est votre poids rapporté au poids de chaque nœud éligible, et le poids est un stake multiplié par trois mesures de service — chacune plafonnée à 1,0.",
    termStakeTitle: "Ce que vous avez mis en stake",
    termStakeBody:
      "Lu depuis votre compte de stake on-chain, jamais un nombre que votre nœud rapporte sur lui-même. Un stake donne du lest à un nœud : si deux nœuds désignent le même compte, tous deux sont exclus de l’époque.",
    termConnectivityTitle: "Si vous faites le pont vers Solana",
    termConnectivityBody:
      "1,0 si le réseau a vu votre nœud émettre une annonce de blockhash Solana, 0,4 s’il l’a seulement vu la propager par gossip. Un nœud-pont fait strictement plus de travail, et la différence apparaît dans ses propres annonces signées plutôt que dans une affirmation.",
    termAvailabilityTitle: "Quelle part de la journée vous étiez en ligne",
    termAvailabilityBody:
      "La part des 24 tranches d’une heure de l’époque durant lesquelles votre nœud a été entendu. Être entendu une fois dans une tranche la valide et être entendu cinq cents fois vaut pareil, donc inonder le réseau ne rapporte rien.",
    termPinningTitle: "Si vous servez du contenu",
    termPinningBody:
      "1,0 si votre nœud a renvoyé des octets correspondant à une adresse de contenu lorsqu’il a été défié, 0,7 s’il n’a jamais été défié ou a échoué. C’est le seul des trois qui est prouvé plutôt que plausible — des octets qui se résument à un CID ne peuvent pas être produits sans les posséder.",
    pinningAheadOfSpec:
      "Une réserve sur ce quatrième terme. Le tableau confirmé de l’OFS-4100 §9.2 liste trois facteurs — stake, connectivité, disponibilité — et ne mentionne pas le pinning. Le crate l’applique quand même. Là où la spécification et le code divergent, cette page suit le code, car le code est ce qui calculerait un barème ; mais lisez le multiplicateur de pinning comme quelque chose d’en avance sur la spécification plutôt que défini par elle.",

    ceilingTitle: "Rien ici ne peut dépasser 1,0",
    ceilingLede:
      "Chaque multiplicateur est une fraction d’un, et le logiciel refuse de démarrer avec un jeu de paramètres où l’un d’eux ne l’est pas.",
    ceilingBody:
      "Ce n’est pas de la prudence, c’est le seul arrangement qui boucle. Le pool d’une époque est un nombre fixe de tokens, et les multiplicateurs décident comment ce pool est partagé. Un multiplicateur au-dessus de 1,0 ne surpaierait pas un bon nœud à partir de nulle part — il répartirait des tokens que le seau Infrastructure ne contient pas. RewardParams::validate rejette un tel jeu d’emblée plutôt que de laisser le déficit apparaître le jour du paiement.",
    ceilingPenalty:
      "C’est aussi pourquoi la récompense pour servir du contenu est construite comme une pénalité sur les nœuds qui n’en servent pas. « Les nœuds qui font du pinning gagnent plus » et « les nœuds qui n’en font pas gagnent moins » décrivent le même résultat, et seul le second peut être implémenté sans inventer de tokens. Un nœud qui fait du pinning garde toute sa part ; un nœud qui n’en fait d’aucun cède trois dixièmes de la sienne.",
    matrixCaption:
      "Toutes les valeurs que les deux clés peuvent prendre, en disponibilité totale.",
    matrixQuality: "Multiplicateur",
    matrixNote:
      "Lisez les deux lignes centrales ensemble : un nœud gossip-seul qui sert du contenu ({gossipPin}) gagne encore moins qu’un nœud-pont qui n’en sert aucun ({rpcNoPin}). Servir du contenu est une prime sur une connexion à la chaîne, jamais un substitut à celle-ci.",

    calcTitle: "Essayez vos propres chiffres",
    calcIntro:
      "La colonne de gauche est ce que vous contrôlez. Celle de droite scinde le résultat en deux : ce que vos entrées fixent exactement, et ce qui dépend d’un réseau qui ne s’est pas encore formé.",
    yourNode: "Votre nœud",
    stakeLabel: "Stake",
    stakeHint:
      "En dessous de 1 000 OPEN un nœud n’est pas pondéré du tout. Il n’est pas payé avec une part réduite — il est ignoré.",
    availabilityLabel: "Heures où il a été entendu",
    availabilityHint:
      "Sur les 24 tranches d’une heure de l’époque. Une tranche compte une fois, quel que soit le trafic que vous envoyez pendant.",
    connectivityLabel: "Connectivité",
    connectivityRpc: "Pont vers Solana",
    connectivityGossip: "Gossip seul",
    pinningLabel: "Contenu",
    pinningServing: "A répondu à un défi",
    pinningAbsent: "Non défié, ou a échoué",

    determinedTitle: "Défini par vos entrées",
    qualityCeiling: "sur un possible 1,00",
    qualityLabel:
      "Votre multiplicateur de qualité — les trois facteurs de service, combinés comme le barème les combine.",
    factorConnectivity: "connectivité",
    factorAvailability: "disponibilité",
    factorPinning: "pinning",
    factorProduct: "qualité",
    ineligibleBelowFloor:
      "Avec ce stake le nœud ne gagne rien. {min} OPEN est le plancher, et un nœud en dessous reste hors de toute pondération.",
    ineligibleOffline:
      "Un nœud entendu dans aucune tranche de l’époque marque zéro en disponibilité, ce qui annule tout le poids. Il ne gagne rien, quel que soit le stake.",

    assumedTitle: "Dépend du reste du réseau",
    assumedNote:
      "Votre part est votre poids divisé par le poids de chaque nœud éligible, elle ne peut donc pas être calculée à partir de vos seules entrées. Il n’y a pas de total en direct à substituer — cette page ne lit pas l’état de la chaîne, et aucune récompense n’a jamais été distribuée. Le total est donc une hypothèse, c’est vous qui la fixez, et les deux chiffres ci-dessous s’appuient dessus et sur rien de plus solide.",
    peersLabel: "Autres nœuds éligibles",
    peerStakeLabel: "Stake de chacun",
    shareLabel: "Votre part du pool de l’époque",
    perEpochLabel: "OPEN par époque, sous cette hypothèse",
    poolReminder:
      "Le pool entier est de {pool} OPEN par époque, réparti entre chaque nœud éligible. Les deux chiffres bougent dès qu’un autre met en stake, et aucun n’est une prévision.",

    emissionTitle: "Le pool est fini",
    emissionLede:
      "L’émission de bootstrap est un seau, pas un taux. Il se vide.",
    emissionBody:
      "120 000 000 OPEN — 12 % de l’offre — sont réservés pour payer les nœuds tant que les revenus du protocole sont trop faibles pour compter, répartis également sur environ quatre ans d’époques quotidiennes. Le jour où il s’épuise, le pool de récompenses devient exactement la part de la trésorerie Infrastructure sur les frais de règlement : ce que le réseau a gagné, et rien de plus. Qui dimensionne un nœud d’après les chiffres ci-dessus devrait le dimensionner aussi d’après ce jour-là.",
    emissionBucket: "OPEN dans le seau",
    emissionBucketNote:
      "L’allocation de genèse Infrastructure / Bootstrap des nœuds, 12 % de l’offre totale.",
    emissionPerEpoch: "OPEN par époque",
    emissionPerEpochNote:
      "Partagé entre chaque nœud éligible, et plafonné par ce qui reste dans le seau.",
    emissionEpochs: "Époques quotidiennes",
    emissionEpochsNote:
      "Environ quatre ans, après quoi l’émission est ce que les revenus du protocole financent.",

    refusalTitle: "Ce que cette page ne vous dira pas",
    refusalLede: "Trois chiffres manquent, et chacun manque exprès.",
    refusalPriceTitle: "Combien ça vaut dans votre monnaie",
    refusalPriceBody:
      "OPEN n’a pas de marché et donc pas de prix. Un chiffre en dollars, en euros ou en renminbi ici serait une valeur que ce projet a inventée sur son propre token puis vous a servie avec l’autorité d’une calculatrice. Il n’y a pas de taux honnête pour convertir, donc il n’y a pas de conversion.",
    refusalYieldTitle: "Un rendement, un APR ou un retour",
    refusalYieldBody:
      "Un rendement en pourcentage sonne comme une promesse, et ce n’est pas quelque chose que le protocole puisse promettre. L’émission derrière se vide en quatre ans, la part est partagée avec chaque nœud qui entre, et aucun des paramètres n’est figé — la §9 les rend tous modifiables par la gouvernance. Un seul chiffre annualisé masquerait ces trois choses.",
    refusalTotalTitle: "Combien le réseau a mis en stake aujourd’hui",
    refusalTotalBody:
      "Cette page ne lit pas l’état de la chaîne. Votre part dépend du total mis en stake sur chaque nœud éligible et, plutôt que de substituer un chiffre plausible, la calculatrice fait de ce total une hypothèse que vous fixez, puis étiquette tout ce qui s’appuie dessus.",

    statusTitle: "Ce qui tourne réellement",
    statusBadge: "Devnet · rien de payé",
    statusLede: "Le calcul existe. Le paiement non.",
    statusBody:
      "Les nœuds observent l’activité des uns et des autres et publient ce qu’ils ont vu, et le barème qui transforme ces observations en montants est implémenté et testé — de façon déterministe, pour que quiconque disposant des mêmes observations dérive la même réponse et que le nœud payeur puisse être vérifié plutôt que cru sur parole. Ce qui manque, c’est la dernière étape : rien n’envoie de barème on-chain, et le coffre de récompenses est vide. Aucun nœud n’a jamais été payé.",
    statusParams:
      "Chaque valeur ici est un paramètre de gouvernance plutôt qu’une constante : le plancher de {min} OPEN, les {buckets} tranches de disponibilité et les quatre multiplicateurs peuvent être modifiés par vote sans changement de code. Voici les valeurs par défaut d’aujourd’hui.",
    sourceNote:
      "Les constantes sont lues depuis crates/rewards/src/params.rs ; l’arithmétique reflète schedule.rs, y compris là où elle tronque.",
    sourceLink: "Lire le code source",
    specLink: "Lire l’OFS-4100",

    ctaTitle: "Faites-en tourner un et voyez",
    ctaBody:
      "Le modèle de récompenses est la plus petite moitié de la décision. La plus grande, c’est de savoir si la machine, la bande passante et l’attention en valent la peine pour vous — le guide de l’opérateur donne le matériel réel, les commandes réelles et les parties qui ne sont pas encore construites.",
    ctaRunNode: "Faire tourner un nœud",
    ctaFees: "Chaque frais et chaque paiement",
  },

  fees: {
    title: "Frais",
    intro:
      "Chaque frais que le protocole prélève et tout ce qu’il paie. L’essentiel de ce qui suit est décidé et documenté, mais pas encore prélevé ni payé, et chaque ligne dit ce qu’il en est — une page de frais qui se lirait comme si tout était en direct serait le genre d’erreur le plus grave.",
    accuracyNote:
      "Devnet uniquement. Chaque frais est un paramètre de gouvernance, jamais une constante.",
    payTitle: "Ce que vous payez",
    payIntro:
      "Trois frais, et ils ne pèsent pas sur la même partie. Un acheteur ne paie que sur un échange conclu et rien pour ouvrir un litige ; un commerçant supporte les coûts permanents d’annoncer et d’être arbitré.",
    receiveTitle: "Ce que chaque rôle reçoit",
    receiveIntro:
      "Consommer et être rémunéré sont deux questions distinctes. Un service peut être gratuit à consommer et pourtant être payé par le protocole — c’est exactement ainsi que fonctionnent les frais d’oracle.",
    permissionedTitle: "Le seul rôle sous permission",
    permissionedBody:
      "L’intelligence des risques est le seul rôle qui exige l’approbation de la gouvernance avant d’opérer. AllenHark est le fournisseur par défaut.",
    defaultProviderLabel: "Clé de service par défaut",
    governanceTitle: "Chaque frais est un paramètre",
    governanceBody:
      "Aucune valeur ici n’est une constante. Chacune est modifiable par la gouvernance, car des frais libellés dans un token doivent bouger avec le prix de ce token. Les chiffres affichés sont les valeurs par défaut actuelles, et ceux marqués comme proposés n’ont pas été approuvés.",
    columnPayer: "Payeur",
    columnAmount: "Montant",
    columnConsumer: "Le consommateur paie",
    columnReceives: "Le fournisseur reçoit",
    status: {
      live: "Prélevé aujourd’hui",
      specified: "Spécifié, pas encore actif",
      none: "Rien, par décision",
    },
  },

  guides: {
    title: "Guides",
    intro:
      "Pas à pas, avec les vraies commandes. Chaque guide est écrit contre le logiciel tel qu’il existe aujourd’hui, donc là où quelque chose n’est pas encore construit, le guide le dit plutôt que de décrire à quoi cela ressemblerait.",
    accuracyNote:
      "Devnet uniquement. Les ids de programme et endpoints de ces pages sont des artefacts de devnet ; il n’y a pas de déploiement en mainnet.",
    allGuides: "Tous les guides",
    requirementsTitle: "Avant de commencer",
    stepsTitle: "Étapes",
    relatedTitle: "Sur le même sujet",
    copy: "Copier",
    copied: "Copié",
    standalonePage: "Page dédiée",
    azTitle: "Tous les guides, A–Z",
    progressNote:
      "La progression ne vit que dans ce navigateur — pas de compte, rien n’est envoyé nulle part.",
    completedLabel: "terminé",
    milestonesMeta: (count: number) =>
      `${count} jalon${count === 1 ? "" : "s"}`,
    stepsMeta: (count: number) => `${count} étape${count === 1 ? "" : "s"}`,
    milestoneOf: (position: number, total: number) =>
      `Jalon ${position} sur ${total}`,
    markStepDone: "Marquer l’étape comme faite",
    stepDoneLabel: "Fait",
    prevOnPath: "Précédent sur le parcours",
    nextOnPath: "Suivant sur le parcours",
    groups: {
      trade: {
        title: "Échanger",
        blurb:
          "Acheter et vendre, et fournir la liquidité contre laquelle d’autres échangent.",
      },
      operate: {
        title: "Faire tourner de l’infrastructure",
        blurb:
          "Les rôles qui tiennent le réseau debout. Les revenus du protocole doivent les payer ; rien n’en découle encore.",
      },
      build: {
        title: "Construire sur OpenFiat",
        blurb:
          "Écrire du logiciel contre le protocole plutôt qu’utiliser une app écrite par quelqu’un d’autre.",
      },
    },
    standalone: {
      runNode: {
        title: "Faire tourner un nœud",
        summary:
          "Installez, configurez et exploitez un nœud OpenFiat, du matériel à la supervision.",
      },
      becomeArbitrator: {
        title: "Devenir arbitre",
        summary:
          "Déposez un bond d’OPEN, prenez un cas de litige et émettez le vote engagement-révélation qui le tranche.",
      },
    },
  },

  becomeArbitrator: {
    title: "Devenir arbitre OpenFiat",
    intro:
      "Les arbitres tranchent les litiges avec leur propre OPEN en jeu, pas leur réputation. Ceci parcourt le bond, la recherche d’un cas et l’émission du vote engagement-puis-révélation qui paie effectivement.",
    neverCustody:
      "Les arbitres ne détiennent jamais les fonds des échanges. Une décision ne déplace que l’argent que le programme de garde lui-même a déjà verrouillé avant l’ouverture du litige.",
    requirementsTitle: "Ce qu’il vous faut",
    bondCta: "Déposez un bond de {amount} OPEN dans openfiat-app",
    lifecycleTitle: "Traiter un cas",
    lifecycleNote:
      "Suivez ces étapes dans l’ordre, un cas à la fois. Chaque étape apporte la commande ou le code dont elle a besoin.",
    copy: "Copier",
    copied: "Copié",
  },

  sale: {
    title: "La prévente communautaire d’OPEN",
    notLiveTitle: "La vente n’est pas ouverte",
    notLiveBody:
      "Aucun contrat de vente n’a été déployé et aucune condition n’est définitive. Vous pouvez connecter un portefeuille pour vérifier votre préparation, mais il n’y a encore rien à acheter.",
    connectWallet: "Connecter le portefeuille",
    disconnect: "Déconnecter",
    connected: "Connecté",
    verifyWallet: "Vérifier le portefeuille",
    verifying: "En attente de la signature…",
    verified: "Vérifié",
    verifyNote:
      "Signez un message (aucune transaction, aucun frais) pour confirmer que vous contrôlez ce portefeuille avant d’acheter.",
    verifyUnsupported:
      "Ce portefeuille ne prend pas en charge la signature de messages — vous pouvez tout de même acheter ; la propriété du portefeuille est prouvée par la signature de la transaction elle-même.",
    balance: "Solde",
    max: "Max",
    limitNote:
      "{min}–{max} USDC par portefeuille. Max prend le plus petit entre votre solde et cette limite.",
    raisedLabel: "Collecté",
    goalLabel: "Objectif",
    offeredLabel: "Proposé",
    goalNote:
      "L’objectif est un but, pas un plafond. La prévente propose toute l’allocation de la Prévente communautaire, elle peut donc continuer à vendre au-delà de l’objectif si la demande va plus loin.",
    publicSaleNote:
      "Ce qui reste invendu de l’allocation de la Prévente communautaire à la clôture de la prévente sera proposé ensuite lors d’une vente publique à 1 USDC = 80 OPEN.",
    purchase: "Acheter OPEN",
    purchaseDisabled: "L’achat ouvre quand la vente sera en ligne",
    amount: "Vous payez",
    youReceive: "Vous recevez",
    rateNote: "1 USDC = 100 OPEN",
    estimated: "estimé",
    reviewing: "Simulation de la transaction…",
    submitting: "En attente de la signature du portefeuille…",
    confirming: "Confirmation…",
    done: "Achat confirmé",
    txFailed: "La transaction n’a pas été envoyée",
    txSuccess: "Confirmée",
    claim: "Réclamer OPEN",
    swapNotice:
      "Converti en USDC de façon atomique au prix confirmé avant de créditer votre allocation d’OPEN. Les remboursements (si le soft cap n’est pas atteint) sont versés en USDC, pas dans l’actif d’origine.",
    whatIsOpen: "Qu’est-ce qu’OPEN",
    whatIsOpenBody:
      "OPEN est le token d’utilité et de gouvernance du protocole. Ce n’est pas l’actif échangé — les règlements du marché se font en stablecoins comme USDC. OPEN est mis en stake par les commerçants, les arbitres, les opérateurs de nœuds et les fournisseurs de services comme responsabilité économique, et il porte des droits de gouvernance.",
    supplyTitle: "Offre fixe",
    supplyBody:
      "OPEN est émis une seule fois à la genèse avec une offre maximale fixe, et chaque allocation initiale est vérifiable publiquement on-chain.",
    allocationTitle: "Catégories d’allocation",
    allocationNote:
      "Les pourcentages d’allocation sont détaillés dans le Document de Tokenomics d’OPEN.",
    useOfFundsTitle: "Ce que la prévente finance",
    vestingTitle: "Vesting et protections",
    whatVests: "Ce qui est soumis à vesting",
    vestingNote:
      "Les allocations de long terme sont débloquées selon des calendriers publiés plutôt qu’en une seule fois, et chaque libération est visible on-chain.",
    protectionsTitle: "Protections",
    riskTitle: "Risque",
    riskBody:
      "Rien ici n’est une offre de vente de valeurs mobilières ni un conseil financier. Les conditions peuvent changer. Participer à une vente de tokens peut entraîner une perte totale.",
    rewardsTitle: "Vos récompenses en OPEN",
    rewardsSubtitle:
      "Connectez le portefeuille avec lequel vous avez contribué.",
    rewardsConnectPrompt:
      "Connectez votre portefeuille pour voir ce que vous avez gagné à la prévente.",
    rewardsContributed: "Vous avez contribué",
    rewardsEntitlement: "Récompense en OPEN",
    rewardsNoContribution: "Aucune contribution trouvée pour ce portefeuille.",
    rewardsNoContributionCta: "Rejoindre la prévente",
    rewardsPendingNote:
      "Comptabilisé dès que la vente est finalisée — revenez vérifier après la clôture.",
    rewardsClaimedNote: "Déjà réclamée pour ce portefeuille.",
    rewardsRefundableNote:
      "Le soft cap n’a pas été atteint — cette contribution est remboursable en USDC sur la page de la vente.",
    rewardsGoToSale: "Aller à la page de la vente",
  },

  pages: {
    roadmap: {
      eyebrow: "feuille de route",
      title: "Feuille de route",
      intro:
        "La version 1.0 des spécifications est le point de départ, pas l’arrivée. Le Chapitre 26 pose les phases ; chaque élément ci-dessous est un jalon plutôt qu’une fonctionnalité déjà livrée.",
    },
    downloads: {
      eyebrow: "téléchargements",
      title: "Téléchargements",
      intro:
        "Rendus PDF chapitre par chapitre du livre blanc. Il n’y a pas de PDF des spécifications OFS — lisez-les sur le site ou dans le dépôt de spécifications.",
    },
    documentation: {
      eyebrow: "documentation",
      title: "Documentation",
      intro:
        "La documentation développeur est sur docs.openfiat.network. Les spécifications elles-mêmes sont la référence faisant autorité et sont publiées en entier ici.",
    },
    foundation: {
      eyebrow: "gouvernance",
      title: "Fondation",
      intro:
        "Le livre blanc évoque à la fois AllenHark et une Fondation OpenFiat sans définir la relation entre les deux. Cette page décrira la structure de tutelle une fois qu’elle sera arrêtée.",
    },
    community: {
      eyebrow: "communauté",
      title: "Communauté",
      intro:
        "Domaines de contribution cités au Chapitre 25 : développement logiciel, documentation, recherche en sécurité, rapports de bugs, services d’infrastructure, matériel pédagogique, localisation et outils pour développeurs.",
    },
    blog: {
      eyebrow: "blog",
      title: "Blog",
      intro:
        "Les mises à jour du protocole et les notes d’ingénierie seront publiées ici.",
    },
    press: {
      eyebrow: "presse",
      title: "Presse",
      intro:
        "Ressources de marque et contacts presse. Pour tout élément factuel sur le protocole, le livre blanc et les spécifications sont la source.",
    },
    careers: {
      eyebrow: "carrières",
      title: "Carrières",
      intro: "Les postes ouverts seront listés ici.",
    },
    status: {
      eyebrow: "statut",
      title: "Statut",
      intro:
        "État du réseau et des services. Aucun réseau public ne tourne encore, il n’y a donc rien à signaler.",
    },
    contact: {
      eyebrow: "contact",
      title: "Contact",
      intro:
        "Pour toute question sur le protocole, ouvrez une discussion dans le dépôt de spécifications afin que la réponse soit publique et cherchable.",
    },
    privacy: {
      eyebrow: "légal",
      title: "Politique de confidentialité",
      intro:
        "Cette page nécessite une relecture juridique avant lancement et n’est pas définitive.",
    },
    terms: {
      eyebrow: "légal",
      title: "Conditions d’utilisation",
      intro:
        "Cette page nécessite une relecture juridique avant lancement et n’est pas définitive.",
    },
  },

  tokenomics: {
    supplyLabel: "Offre maximale",
    supplyPending: "Fixée à la genèse",
    allocationAria: "Allocation d’OPEN",
    provisional:
      "Les pourcentages d’allocation sont provisoires et seront finalisés dans le Document de Tokenomics d’OPEN.",
    proceedsTitle: "Ce que la prévente finance",
  },

  common: {
    readWhitepaper: "Lire le livre blanc",
    notFoundTitle: "Page introuvable",
    notFoundBody:
      "Cette page n’existe pas. Elle a peut-être été déplacée, ou le lien est peut-être erroné.",
    goHome: "Aller à la page d’accueil",
    errorTitle: "Une erreur est survenue",
    errorBody:
      "Cette page n’a pas pu s’afficher. Recharger peut résoudre le problème ; sinon, il est de notre côté.",
    tryAgain: "Réessayer",
  },
};
