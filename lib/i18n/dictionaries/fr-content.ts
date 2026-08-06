import type { ContentDictionary } from "./en-content";

/**
 * French long-form content — a complete translation, typed as ContentDictionary
 * so a missing key fails the build. Specification ids (OFS-####), code
 * identifiers (getChainStatus, --public-rpc-url, openfiat-node, RocksDB, libp2p,
 * execute_dispute_outcome…), repository names, the glossary acronyms and proper
 * nouns are preserved verbatim.
 */
export const frContent: ContentDictionary = {
  home: {
    rails: [
      "Virement bancaire",
      "Argent mobile",
      "ACH",
      "SEPA",
      "Faster Payments",
      "PIX",
      "Dépôt d’espèces",
      "Réseaux régionaux de paiement instantané",
    ],
  },

  trust: {
    flow: [
      {
        title: "Vous choisissez une offre",
        body: "Les offres indiquent le taux, les moyens de paiement acceptés, les limites et comment l’autre partie s’est comportée lors d’échanges passés. Rien n’est encore engagé.",
      },
      {
        title: "Sa crypto part en garde",
        body: "Avant que le moindre argent ne bouge, les stablecoins du vendeur sont verrouillés dans une garde on-chain. Le vendeur ne peut pas les reprendre et l’acheteur ne peut pas les saisir en avance. C’est l’étape qui rend le reste sûr.",
      },
      {
        title: "Vous payez comme vous payez d’habitude",
        body: "Virement bancaire, argent mobile, un réseau de paiement instantané ou des espèces. Le paiement passe par vos rails habituels, pas par une blockchain, et vous le marquez comme envoyé une fois fait.",
      },
      {
        title: "La garde est libérée",
        body: "Le vendeur confirme que l’argent est arrivé et la garde est libérée automatiquement. S’il ne confirme pas, ou si quelque chose cloche, l’une ou l’autre partie peut ouvrir un litige.",
      },
    ],

    pillars: [
      {
        title: "La garde vient d’abord",
        body: "Les fonds sont verrouillés avant que le fiat ne bouge, à chaque fois. Un acheteur n’envoie jamais d’argent en espérant que l’autre partie honore, et un vendeur ne libère jamais de coins en espérant que le paiement arrive.",
      },
      {
        title: "La réputation se gagne, elle ne s’achète pas",
        body: "Chaque échange conclu, chaque litige et chaque temps de réponse fait partie d’un registre public lié à un portefeuille. Personne ne peut acheter une bonne réputation, ni laisser une mauvaise derrière lui en ouvrant un nouveau compte.",
      },
      {
        title: "Votre identité reste la vôtre",
        body: "Il n’y a pas de KYC. Au lieu de demander qui vous êtes, le protocole vous laisse prouver ce que vous contrôlez — un e-mail, un téléphone, un compte Telegram — et n’établit jamais votre nationalité ni votre situation légale.",
      },
      {
        title:
          "Les portefeuilles notoirement mauvais sont signalés, et certains bloqués",
        body: "Des fournisseurs indépendants publient des informations de risque signées sur les portefeuilles liés à la fraude ou aux sanctions. L’essentiel est consultatif — votre app peut avertir, demander confirmation ou l’ignorer. Au-dessus se trouve une liste de bannissement tenue par la gouvernance, et un portefeuille qui y figure ne peut déposer dans aucun coffre nulle part dans le protocole. Les fournisseurs publient les preuves ; seul un vote de gouvernance ajoute ou retire une entrée, et les deux sens sont enregistrés on-chain. Ce n’est pas encore construit.",
      },
    ],

    dispute: [
      {
        title: "L’une ou l’autre partie ouvre un dossier",
        body: "Soulever un litige ne coûte rien à l’acheteur. Le dépôt d’arbitrage est apporté par le commerçant depuis son coffre de liquidité, quelle que soit la partie qui a ouvert le dossier, et il ne le perd que si l’issue lui est défavorable. Les deux parties soumettent des preuves : reçus, confirmations de paiement, la conversation de l’échange. Le dépôt est spécifié et pas encore prélevé.",
      },
      {
        title: "Les arbitres misent pour prendre le dossier",
        body: "Les arbitres qualifiés choisissent les dossiers au lieu d’y être affectés, et doivent engager leur propre OPEN avant d’être autorisés à voir les preuves. Comme les preuves restent cachées jusqu’à leur engagement, il n’y a rien à corrompre à l’avance.",
      },
      {
        title: "Ils votent sans se voir",
        body: "Chaque arbitre publie d’abord un engagement scellé et révèle sa décision ensuite, de sorte que personne ne peut suivre la foule. Le nombre d’arbitres sur un dossier n’est pas publié, ce qui empêche de deviner combien est en jeu.",
      },
      {
        title: "La garde règle l’issue",
        body: "La décision est exécutée on-chain. Le design paie les arbitres de la majorité et retire une partie du stake de ceux qui en sortent, avec des pénalités volontairement modérées — le but est de dissuader la négligence et la collusion, pas de punir le désaccord honnête. Ni la récompense ni la pénalité ne sont encore implémentées, donc aujourd’hui un vote ne rapporte rien et voter contre le consensus ne coûte rien.",
      },
    ],
  },

  protocol: {
    solanaBlurb:
      "Des programmes on-chain audités gardent les actifs. La garde ne dépend pas du fait qu’OpenFiat soit en ligne, atteignable ou même encore maintenu.",
    solanaItems: [
      "Garde des actifs",
      "Exécution de la garde",
      "Staking",
      "Trésorerie",
      "Exécution de la gouvernance",
    ],
    openfiatBlurb:
      "Un réseau pair-à-pair ouvert porte le marché. N’importe qui peut en faire tourner une pièce, et aucun opérateur isolé ne peut le faire tomber.",
    openfiatItems: [
      "Découverte des annonces",
      "Coordination des échanges",
      "Réputation",
      "Messagerie chiffrée",
      "Découverte des services",
      "Notifications",
      "Récupération de session",
    ],
    principles: [
      {
        title: "Vérifiez le contrôle, pas l’identité",
        body: "Au lieu de déterminer qui est quelqu’un, OpenFiat vérifie ce qu’il contrôle. Il n’établit ni nationalité, ni citoyenneté, ni situation légale, et n’exige pas de KYC.",
      },
      {
        title: "Protocole, pas plateforme",
        body: "Aucune entreprise ne possède l’e-mail. Des milliers de fournisseurs indépendants implémentent une norme commune. OpenFiat est bâti de la même façon.",
      },
      {
        title: "La réputation se gagne",
        body: "Un utilisateur fraîchement vérifié a moins d’historique observable qu’un commerçant anonyme qui a conclu des milliers d’échanges au fil des ans.",
      },
      {
        title: "Ne décentralisez que ce qui en profite",
        body: "La garde profite de l’exécution on-chain. Les listes d’annonces non. Le test est de savoir si décentraliser améliore la sécurité, la résilience, la transparence ou la propriété.",
      },
      {
        title: "Pas une blockchain de plus",
        body: "OpenFiat n’introduit aucun algorithme de consensus concurrent. Au lieu de remplacer les chaînes existantes, il les prolonge.",
      },
      {
        title: "Conçu pour survivre à ses créateurs",
        body: "AllenHark mène le développement initial et est conçue pour devenir superflue. Aucun participant isolé ne devrait être indispensable.",
      },
    ],
  },

  actorGroups: {
    participants: {
      title: "N’importe qui peut être ceux-là",
      blurb: "Échanger ne demande ni inscription ni stake. Annoncer, oui.",
    },
    providers: {
      title: "Rôles d’infrastructure et de service",
      blurb:
        "Faites tourner une partie du réseau et gagnez sur les revenus du protocole.",
    },
    builders: {
      title: "Construire sur le protocole",
      blurb: "Un protocole, de nombreuses implémentations.",
    },
  },

  actors: {
    buyers: {
      name: "Acheteurs et vendeurs",
      definition:
        "Un acheteur est tout participant qui accepte une annonce existante.",
      summary: "Achetez et vendez des stablecoins contre de la monnaie locale.",
      responsibilities: [
        "Parcourir les annonces et filtrer par pays, monnaie, moyen de paiement et montant",
        "Réserver un échange, ce qui déplace les stablecoins en garde avant qu’aucun fiat ne soit envoyé",
        "Envoyer ou recevoir le paiement fiat par le rail convenu",
        "Marquer le paiement comme envoyé, et confirmer sa réception en tant que contrepartie",
        "Ouvrir un litige avec preuves si quelque chose tourne mal",
      ],
      stake:
        "Aucun. Les acheteurs ne publient pas d’annonces, ne misent rien et ne paient rien pour soulever un litige — le dépôt d’arbitrage est apporté par le commerçant, quelle que soit la partie qui ouvre le dossier. Le seul coût d’un acheteur est le frais de règlement, et uniquement sur un échange qui se conclut.",
      earns:
        "Rien directement. L’avantage est la concurrence entre commerçants et le fait de ne pas dépendre d’un opérateur unique qui reste en ligne.",
      requirements: [
        "Un portefeuille en auto-garde",
        "Pas de KYC ni de vérification d’identité centralisée",
        "En option, des déclarations d’identité volontaires prouvant le contrôle d’un e-mail, d’un Telegram ou d’un autre canal",
      ],
    },
    merchants: {
      name: "Commerçants",
      definition:
        "Les commerçants sont des participants qui fournissent de la liquidité au marché en continu.",
      summary: "Fournissez de la liquidité et publiez des annonces.",
      responsibilities: [
        "Publier des annonces signées numériquement pour acheter ou vendre des stablecoins contre du fiat local",
        "Choisir un prix fixe ou un prix flottant contre un taux de référence d’oracle",
        "Prendre en charge un ou plusieurs pays et moyens de paiement",
        "Gérer la disponibilité entre les états en ligne, hors ligne et vacances",
        "Vérifier que le paiement fiat est arrivé, puis libérer la garde",
        "Renouveler les annonces avant qu’elles n’expirent",
      ],
      stake:
        "L’enregistrement d’un commerçant exige de mettre OPEN en stake. Cela décourage le spam, fournit une responsabilité économique et définit la capacité d’annonces initiale du commerçant. Il est important de noter que le stake du commerçant ne garantit pas les échanges individuels — le règlement est protégé par le coffre de garde. Mettre en stake ne confère pas non plus de réputation, qui doit se gagner par des échanges conclus.",
      earns:
        "Le spread sur son propre prix. Les commerçants paient des frais de protocole au lieu d’en recevoir : une annonce porte un frais de listing en OPEN, et le dépôt d’arbitrage sur un échange contesté vient du coffre du commerçant. Aucun n’est encore prélevé — tous deux sont spécifiés et aucune instruction ne les lit, donc annoncer aujourd’hui ne coûte rien.",
      requirements: [
        "Enregistrer un profil de commerçant avant d’annoncer",
        "Mettre OPEN en stake ; la capacité évolue avec le stake, la réputation, l’ancienneté du compte, l’historique d’échanges et le taux de litiges",
        "Déclarer les pays et moyens de paiement pris en charge",
      ],
    },
    "node-operators": {
      name: "Opérateurs de nœuds",
      definition:
        "Les opérateurs de nœuds sont l’épine dorsale du réseau OpenFiat. Les validateurs Solana sécurisent la blockchain et exécutent les programmes OpenFiat ; les opérateurs de nœuds maintiennent le marché décentralisé qui existe au-dessus.",
      summary: "Faites tourner la couche du marché pair-à-pair.",
      responsibilities: [
        "Maintenir les connexions entre pairs et participer à la propagation par gossip",
        "Synchroniser l’état du marché et héberger les index d’annonces",
        "Distribuer les vecteurs de réputation et de risque",
        "Diffuser les événements du cycle de vie des échanges",
        "Tenir le répertoire des fournisseurs et publier la santé du nœud",
        "Servir les applications clientes",
      ],
      stake:
        "Requis pour être un participant actif. Mais le stake seul ne détermine pas la réputation — un opérateur peu performant ne peut pas se rattraper en misant davantage. La priorité effective combine réputation, stake et performance réseau mesurée, et les nœuds avec stake sont éligibles aux récompenses du protocole.",
      earns:
        "La rémunération vient des revenus du protocole plutôt que de l’inflation du token, pondérée par stake, connectivité et disponibilité — un nœud qui fait le pont vers Solana gagne plus qu’un nœud qui ne fait que propager par gossip. La formule est publiée dans l’OFS-4100 §9.2. Rien ne la paie encore : le calcul existe, mais rien n’envoie le résultat et le coffre de récompenses est vide.",
      requirements: [
        "Du matériel serveur ordinaire — 4 cœurs, 16 Go de RAM et 250 Go NVMe au minimum",
        "Une connexion stable et une identité de nœud générée",
        "Sans l’approbation de personne : tout participant qui remplit les exigences du protocole peut faire tourner un nœud",
      ],
    },
    arbitrators: {
      name: "Arbitres",
      definition:
        "OpenFiat répartit la résolution des litiges entre des arbitres indépendants économiquement incités à parvenir à des décisions honnêtes.",
      summary: "Résolvez les litiges sous responsabilité économique.",
      responsibilities: [
        "Découvrir les dossiers publiés et y adhérer volontairement, plutôt que d’y être affectés",
        "Engager un stake spécifique au dossier pour obtenir l’accès aux preuves",
        "Examiner les reçus, les confirmations de paiement et la communication de l’échange",
        "Voter selon un schéma engagement-révélation, puis révéler avant l’échéance",
      ],
      stake:
        "Par dossier. Un arbitre engage un stake supplémentaire pour chaque dossier auquel il adhère, et ce dossier est économiquement protégé jusqu’à la résolution. Les arbitres dont le vote révélé sort du consensus final peuvent perdre une partie de ce stake. Les pénalités sont volontairement modérées : le but est de décourager la négligence et la collusion, pas de punir le désaccord de bonne foi.",
      earns:
        "Le design finance les récompenses depuis le pool d’arbitrage, réparties entre les arbitres dont le vote révélé a correspondu à l’issue, au prorata du poids révélé. Rien de cela n’est implémenté — un arbitre ne gagne rien aujourd’hui, et il n’y a pas de champ on-chain pour conserver un paiement.",
      requirements: [
        "Un stake minimal d’OPEN et une réputation d’arbitre minimale",
        "Une ancienneté suffisante dans le protocole et aucune pénalité d’arbitrage active",
        "Une compatibilité à jour avec le protocole",
      ],
    },
    "notification-gateways": {
      name: "Passerelles de notification",
      definition:
        "Une passerelle de notification est tout service qui implémente la spécification de passerelle de notification d’OpenFiat.",
      summary: "Livrez des notifications optionnelles au nom des utilisateurs.",
      responsibilities: [
        "Accepter les événements de notification du protocole et les livrer par tout transport",
        "Retourner des accusés de livraison",
        "Vérifier les points de contact des utilisateurs par codes à usage unique ou défis anti-bot",
        "Enregistrer les canaux, régions et tarifs pris en charge dans le registre de services",
      ],
      stake:
        "5 000 OPEN, exigés par le programme de staking lorsque vous misez contre le rôle de passerelle de notification. Cela achète une responsabilité économique et une résistance aux attaques Sybil plutôt qu’un traitement préférentiel : rien ne route le trafic de notifications par stake aujourd’hui, donc atteindre le minimum rend une passerelle éligible, pas favorisée.",
      earns:
        "Rien encore. Le modèle visé est une part d’un petit frais fixe en OPEN qu’un participant paie pour activer les notifications sur un échange, le reste étant réparti entre les allocations de trésorerie et d’écosystème — mais aucun de ces frais n’existe nulle part dans le protocole aujourd’hui et aucune récompense de passerelle n’est versée. À traiter comme une intention de design, pas un revenu.",
      requirements: [
        "Implémenter la spécification de notifications publiée",
        "Enregistrer les métadonnées de la passerelle : canaux, version du protocole, tarifs, endpoints",
        "Accepter que les passerelles ne reçoivent que le minimum d’information nécessaire pour livrer — jamais les soldes, les preuves de litige ni un état de marché sans rapport",
      ],
    },
    "oracle-providers": {
      name: "Fournisseurs d’oracle",
      definition: "N’importe qui peut exploiter un fournisseur d’oracle.",
      summary: "Publiez des données signées de taux de change et régionales.",
      responsibilities: [
        "Publier des taux de change signés comme USD/KES et USDC/USD",
        "Publier les métadonnées des stablecoins : décimales, émetteur, réseaux pris en charge, adresses de contrat",
        "Publier les données d’infrastructure de paiement : rails pris en charge, jours fériés bancaires, interruptions",
        "Publier les métadonnées régionales : monnaies prises en charge, identifiants de pays, informations de locale",
      ],
      stake:
        "Requis avant de publier des informations de prix. Les fournisseurs qui publient systématiquement des données incorrectes ou indisponibles peuvent perdre leur éligibilité aux récompenses et subir des pénalités définies par la gouvernance ; une faute d’oracle prouvée est une cause déclarée de slashing.",
      earns:
        "Les lectures sont gratuites, et le fournisseur est plutôt payé par le protocole — mis à l’échelle par le nombre de paires de monnaies qu’il couvre réellement et par le temps de fonctionnement observé. La formule est proposée dans l’OFS-4100 §9.6 et n’est pas définitive, et rien ne la paie encore.",
      requirements: [
        "S’enregistrer via le registre de services avec les paires prises en charge et la fréquence de mise à jour",
        "Signer chaque enregistrement — les mises à jour d’oracle non signées doivent être rejetées",
        "Accepter que les données d’oracle ne forcent jamais un prix d’échange ; elles ne sont qu’une référence",
      ],
    },
    "snapshot-providers": {
      name: "Fournisseurs de snapshots",
      definition:
        "L’hébergement de snapshots est lui-même un service du protocole. Tout participant qualifié peut devenir fournisseur de snapshots.",
      summary:
        "Publiez des snapshots de l’état pour que les nouveaux nœuds se synchronisent vite.",
      responsibilities: [
        "Générer des snapshots compressés sans interrompre le fonctionnement du marché",
        "Publier des hashes d’intégrité, une racine d’état et des métadonnées signées",
        "Maintenir la disponibilité du téléchargement et une grande bande passante",
        "Conserver plusieurs snapshots historiques",
      ],
      stake:
        "Requis, comme engagement d’infrastructure. Publier des snapshots corrompus figure parmi les comportements malveillants passibles d’un slashing approuvé par la gouvernance.",
      earns:
        "Rien. Les téléchargements sont gratuits et le rôle ne porte aucune rémunération, par décision — servir un snapshot est un coût marginal sur une infrastructure qu’un opérateur de nœud fait déjà tourner et pour laquelle il est déjà payé. Il n’y a pas de revenu dans un service de snapshot autonome et aucun n’est prévu.",
      requirements: [
        "Annoncer la capacité via le registre de services",
        "Publier les métadonnées complètes du snapshot, y compris la hauteur du snapshot et la racine d’état",
        "Signer chaque snapshot ; les clients vérifient la signature, la compatibilité et la racine d’état avant d’importer",
      ],
    },
    "risk-intelligence-providers": {
      name: "Fournisseurs d’intelligence des risques",
      definition:
        "Le seul rôle de fournisseur qui exige l’approbation de la gouvernance avant d’opérer.",
      summary:
        "Publiez des informations consultatives de risque sur les portefeuilles.",
      responsibilities: [
        "Publier des enregistrements de risque signés nommant l’adresse du portefeuille, la catégorie, la sévérité et la confiance",
        "Couvrir l’analyse de blockchain, l’intelligence de fraude, les signaux de conformité ou les signalements de la communauté",
        "Prendre en charge le consensus multi-fournisseur et le traitement des faux positifs",
      ],
      stake:
        "Non spécifié — c’est le seul rôle de fournisseur que la table de staking du livre blanc omet, et aucune exigence de stake n’apparaît pour lui nulle part. Ce qui encadre le rôle est l’approbation par la gouvernance, pas le stake : un abonnement permanent tiré de la trésorerie n’a pas de limite naturelle à l’abus comme en a un oracle inutile.",
      earns:
        "Un abonnement fixe payé par la trésorerie — 1 000 USDC par mois par défaut, mis à l’échelle par le temps de fonctionnement observé, configurable par la gouvernance et censé évoluer à mesure que le réseau grandit. Ni le paiement ni la barrière d’approbation ci-dessous ne sont encore construits.",
      requirements: [
        "S’enregistrer via le registre de services",
        "Accepter que les enregistrements soient consultatifs : les applications peuvent rejeter des dépôts, avertir, exiger une confirmation ou ignorer l’avertissement entièrement",
      ],
    },
    "bootstrap-nodes": {
      name: "Nœuds de bootstrap",
      definition:
        "Les nœuds de bootstrap n’ont qu’une seule responsabilité : présenter les nœuds nouvellement arrivés au réseau existant. Ce sont des répertoires, pas des coordinateurs centralisés.",
      summary: "Présentez les nouveaux nœuds au réseau, puis effacez-vous.",
      responsibilities: [
        "Répondre aux demandes de premier contact avec une liste de pairs",
        "Rien de plus — ils n’approuvent pas de pairs, ne conservent pas d’état exclusif, ne coordonnent ni ne routent de décisions du protocole",
      ],
      stake: "Non spécifié pour ce rôle.",
      earns: "Non spécifié pour ce rôle.",
      requirements: [
        "Enregistré comme service de bootstrap dans le registre de services",
        "La gouvernance peut approuver au fil du temps des nœuds de bootstrap supplémentaires opérés par la communauté",
        "Une fois la découverte achevée, les nœuds de bootstrap deviennent optionnels",
      ],
    },
    developers: {
      name: "Développeurs",
      definition:
        "N’importe qui peut construire un logiciel conforme sans demander la permission.",
      summary:
        "Construisez des clients, des nœuds, des outils et des intégrations.",
      responsibilities: [
        "Construire des implémentations indépendantes : nœuds embarqués, logiciels de passerelle, implémentations de recherche, clients personnalisés",
        "Héberger des interfaces utilisateur — web, mobile, portails d’entreprise, marchés régionaux",
        "Soumettre des propositions d’amélioration et relire les spécifications",
        "Contribuer au code, à la documentation, à la recherche en sécurité et à la localisation",
      ],
      stake: "Aucun. Les développeurs ne misent rien.",
      earns:
        "Des subventions d’écosystème de la Trésorerie d’écosystème, qui finance les subventions, les partenariats, l’éducation, les hackathons et les incitations aux développeurs.",
      requirements: [
        "La seule conformité à la spécification — le protocole est indépendant du langage",
        "Un ingénieur devrait pouvoir construire une implémentation pleinement conforme à partir des seules spécifications",
      ],
    },
  },

  repos: {
    "openfiat-specs":
      "Les spécifications canoniques du protocole et le livre blanc. Tout ce site en est généré.",
    "openfiat-core":
      "Le nœud de référence, en Rust. Réseau pair-à-pair, gossip, état du marché, snapshots et les API du nœud.",
    "openfiat-sdks":
      "SDK officiels pour Rust, TypeScript et Python, plus les données de référence partagées dont ils dépendent.",
    "openfiat-app":
      "L’application web standard : échange, vue réseau, staking, gouvernance, litiges et historique.",
    "openfiat-apps":
      "Applications supplémentaires — tableau de bord du commerçant et explorateur de réseau.",
    "openfiat-devtools":
      "Réseaux de test, vecteurs de conformité du protocole, benchmarks et fuzzing.",
    "openfiat-infra":
      "Images de conteneur, charts Helm, modules Terraform et la pile de supervision.",
    "openfiat-docs": "Le site de documentation développeur.",
    "openfiat-org": "Ce site.",
    "awesome-openfiat":
      "Une liste, curée par la communauté, de projets, d’outils et de ressources OpenFiat.",
  },

  runNode: {
    minimumSpecs: [
      "4 cœurs de CPU",
      "16 Go de RAM",
      "SSD NVMe de 250 Go",
      "Connexion haut débit stable",
    ],
    recommendedSpecs: [
      "8–16 cœurs de CPU",
      "32 Go de RAM ou plus",
      "SSD NVMe de 1 To",
      "Réseau à grande bande passante et faible latence",
      "Protection d’alimentation par onduleur (UPS)",
      "Connectivité internet redondante",
    ],
    internals:
      "Le nœud est un unique binaire Rust. libp2p (QUIC, Noise, Yamux) et RocksDB sont compilés dedans — il n’y a rien à installer séparément.",

    install: [
      {
        id: "source",
        title: "Compiler depuis les sources — pour la production, aujourd’hui",
        note: "Aucune version n’a encore été taguée, c’est donc pour l’instant la seule façon d’obtenir le binaire du nœud. Il faut le toolchain Rust et un toolchain C pour RocksDB. Compilez, placez dans /usr/local/bin et faites tourner sous systemd — c’est le déploiement que cette page documente, et celui à utiliser pour un nœud dont d’autres dépendent.",
      },
      {
        id: "binary",
        title: "Binaire pré-compilé — dès qu’une version est taguée",
        note: "Pousser un tag v* déclenche le workflow de release, qui compile openfiat-node sur des runners natifs et publie des archives linux-x86_64 et windows-x86_64 dans les GitHub Releases. Rien n’a encore été tagué, donc cette page est vide pour l’instant. Notez que ce sont des builds de release ordinaires, ni statiques ni signés — vérifiez ce que vous téléchargez contre le workflow qui l’a produit.",
      },
      {
        id: "docker",
        title: "Docker — pour les tests uniquement",
        note: "Utilisez l’image pour expérimenter un nœud localement ou monter un cluster multi-nœuds jetable — pas pour faire tourner un nœud dont le réseau dépend. Elle existe pour des tests locaux reproductibles ; la production fait tourner le binaire sous systemd.",
      },
    ],

    ports: {
      p2pQuic:
        "Trafic entre pairs. QUIC est le transport principal, donc ce port UDP doit être atteignable — celui que les gens oublient le plus d’ouvrir.",
      api: "JSON-RPC, WebSocket, REST, santé et métriques — un seul port réel sert tout, il n’y a pas de port distinct par surface.",
      metrics:
        "Le même port que l’API ci-dessus (GET /metrics). Restreignez-le par pare-feu à loopback/un réseau privé si vous ne voulez pas qu’il soit public.",
    },

    troubleshooting: {
      noPeers: {
        symptom: "Aucun pair ne se connecte",
        cause:
          "L’UDP 4001 est bloqué, ou --entrypoint pointe vers une adresse que les pairs ne peuvent pas réellement atteindre — ce doit être un multiaddr/IP statique, pas un nom d’hôte (le bootstrap par DNS ne résout pas). Votre propre nœud journalise les adresses où il est atteignable dès qu’il écoute.",
      },
      stuckSync: {
        symptom: "La synchronisation ne se termine jamais",
        cause:
          "L’import de snapshot (OFS-1300) n’a pas fini, ou aucun pair n’a encore annoncé un snapshot assez récent — vérifiez getLatestSnapshot/getCheckpointHeight.",
      },
      highDisk: {
        symptom: "L’usage du disque ne cesse de croître",
        cause: "RocksDB n’a pas compacté.",
      },
      clockSkew: {
        symptom: "Signatures ou expirations rejetées",
        cause:
          "Dérive de l’horloge. Les enregistrements portent des timestamps et une expiration, l’horloge de l’hôte doit donc être correcte.",
      },
    },

    walkthrough: [
      {
        id: "prepare",
        title: "Préparez la machine",
        body: "Un serveur Debian ou Ubuntu à jour, un pare-feu et une horloge précise. L’horloge importe plus qu’il n’y paraît : les enregistrements portent des timestamps et des heures d’expiration, et une horloge dérivée fait rejeter par un nœud des données valides.",
      },
      {
        id: "install",
        title: "Installez le nœud",
        body: "Compilez depuis les sources et faites tourner le résultat sous systemd — aucune version n’a encore été taguée, c’est donc la seule façon d’obtenir un binaire aujourd’hui, et le reste de ce manuel le suppose. Ne recourez à Docker que pour tester localement ou monter un cluster jetable.",
      },
      {
        id: "identity",
        title: "Générez le portefeuille du nœud",
        body: "Il n’y a pas de format « d’identité de nœud » distinct — l’identité d’un nœud est un vrai wallet.json de la CLI Solana, le même fichier que produit solana-keygen. Sa seed est réutilisée à la fois pour l’identité de gossip/pair du nœud et pour la clé de signature Solana. Gardez le fichier — si vous le perdez, le nœud rejoint en inconnu et recommence à bâtir sa réputation de zéro.",
      },
      {
        id: "configure",
        title: "Définissez l’environnement",
        body: "openfiat-node n’a pas de fichier de configuration propre — chaque réglage est une variable d’environnement, lue une fois au démarrage : où vivent les données, sur quelle adresse écouter, quels pairs composer au démarrage et (en option) quel endpoint RPC Solana utiliser. Les pairs de bootstrap doivent être un multiaddr/IP statique, pas un nom d’hôte — le bootstrap par DNS ne résout pas.",
      },
      {
        id: "firewall",
        title: "Ouvrez les bons ports",
        body: "Les pairs atteignent le nœud par UDP parce que QUIC est le transport principal — c’est le port que les gens oublient le plus. Un port TCP sert JSON-RPC, WebSocket, REST, santé et métriques ensemble ; gardez-le privé si vous ne voulez pas servir de clients publiquement.",
      },
      {
        id: "reachable",
        title: "Servez le réseau : rendez votre nœud atteignable",
        body: "C’est l’étape qui transforme un nœud, d’une chose qui observe le réseau en une chose qui le porte. Placez nginx devant et obtenez un certificat, puis indiquez au nœud son URL publique avec --public-rpc-url et il s’annonce pour que portefeuilles, explorateurs et l’app web OpenFiat elle-même puissent l’utiliser. L’ordre compte : nginx sur HTTP simple d’abord, puis certbot ajoute TLS — une configuration qui nomme déjà un certificat ne peut pas démarrer, si bien que certbot échoue avant de pouvoir émettre celui qui aurait résolu le problème. Un certificat n’est pas un ornement optionnel : une page servie en HTTPS ne peut pas ouvrir de connexion HTTP simple, donc un nœud sans certificat est invisible pour tout navigateur, aussi sain soit-il.",
      },
      {
        id: "service",
        title: "Faites-en un service",
        body: "Sous systemd, le nœud redémarre après un plantage ou un reboot, et bénéficie d’un délai d’arrêt assez long pour que la base de données se vide proprement au lieu d’être tuée au milieu d’une écriture.",
      },
      {
        id: "sync",
        title: "Laissez-le rattraper",
        body: "Au lieu de rejouer tout l’historique, un nouveau nœud peut découvrir et importer un snapshot annoncé par un pair de l’état actuel du marché (OFS-1300) — de vraies méthodes JSON-RPC, pas un outil séparé : getLatestSnapshot, getCheckpointHeight. Signature, version du protocole et racine d’état doivent toutes correspondre avant qu’on ne s’y fie.",
      },
      {
        id: "verify",
        title: "Vérifiez qu’il est sain",
        body: "GET /health confirme que le processus tourne ; getChainStatus par JSON-RPC dit s’il est GossipOnly ou RpcConnected, et son blockhash courant s’il est le dernier.",
      },
      {
        id: "register",
        title: "Il fait déjà partie du réseau",
        body: "Il n’y a pas d’étape « annoncer » distincte — dès qu’un nœud a des pairs de bootstrap, il propage par gossip et est propagé automatiquement ; personne ne l’approuve. Mettre en stake, publier des métadonnées dans le registre de services, adhérer à des litiges et émettre des votes de gouvernance sont des actions distinctes, guidées par portefeuille, qu’un client réalise contre le nœud en cours d’exécution — voir le guide de participation correspondant à chacune.",
      },
      {
        id: "monitor",
        title: "Surveillez-le",
        body: "Les signaux qui prédisent vraiment les ennuis sont les pairs connectés, le mode de la chaîne (GossipOnly vs RpcConnected) et l’âge du blockhash. Alertez sur ceux-là et vous saurez avant vos utilisateurs.",
      },
      {
        id: "upgrade",
        title: "Gardez-le à jour",
        body: "Arrêtez, remplacez le binaire, démarrez. Les nœuds se mettent à jour un par un, donc le réseau n’a jamais besoin d’un arrêt coordonné, et les événements de gossip manqués sont rejoués au démarrage.",
      },
      {
        id: "backup",
        title: "Sauvegardez ce qui ne peut pas être régénéré",
        body: "L’état du marché peut toujours être resynchronisé depuis un snapshot. Le portefeuille ne peut pas être régénéré. Les soldes et la garde vivent sur Solana, pas sur votre disque.",
      },
    ],

    monitoring: [
      {
        group: "Infrastructure",
        items: ["CPU", "Mémoire", "Disque", "Débit réseau"],
      },
      {
        group: "Protocole (GET /metrics)",
        items: ["rpc_requests_total", "rpc_errors_total"],
      },
    ],
    monitoringNote:
      "C’est tout ce que le nœud exporte aujourd’hui — le nombre de pairs, le mode de la chaîne et la progression de synchronisation ne sont pas encore des métriques Prometheus, seulement des valeurs que vous pouvez interroger par JSON-RPC (getChainStatus, getLatestSnapshot, getCheckpointHeight).",

    apis: [
      {
        group: "Marché",
        items: [
          "Récupérer des annonces",
          "Créer des annonces",
          "Mettre à jour des annonces",
          "Retirer des annonces",
        ],
      },
      {
        group: "Échange",
        items: [
          "Réserver des annonces",
          "Synchroniser les sessions d’échange",
          "Envoyer des confirmations de paiement",
        ],
      },
      {
        group: "Infrastructure",
        items: [
          "Découverte de pairs",
          "Découverte de passerelles",
          "Informations de snapshot",
          "Intelligence des risques",
        ],
      },
      {
        group: "Gouvernance",
        items: [
          "Découverte des propositions",
          "Envoi de votes",
          "Informations de trésorerie",
        ],
      },
    ],

    interfaces: [
      "Interface web officielle",
      "Interfaces de la communauté",
      "Interfaces de commerçant",
      "Marchés régionaux",
      "Portails d’entreprise",
    ],
  },

  becomeArbitrator: {
    requirements: [
      "Un portefeuille Solana avec au moins 10 000 OPEN — le min_stake_arbitrator de la configuration de staking déployée, que la gouvernance peut modifier — mettez-le en bond via la page Stake d’openfiat-app, ou via les instructions ci-dessous si vous construisez votre propre client",
      "Un portefeuille capable de signer des messages, ce que fait tout portefeuille Solana pertinent — la page Arbitrate d’openfiat-app exécute tout le dossier dans le navigateur, et les SDK sont là si vous préférez programmer",
      "Un accès réseau à l’endpoint JSON-RPC d’au moins un nœud OpenFiat, le vôtre ou un public",
    ],

    walkthrough: [
      {
        id: "bond",
        title: "Mettez OPEN en bond pour débloquer le pool d’arbitrage",
        body: "Les arbitres doivent mettre en stake avant de pouvoir voir les preuves d’un seul dossier — c’est ce qui rend inutile d’en corrompre un (vous ne savez pas quel dossier viser) et donne au réseau quelque chose à slasher si vous votez contre le consensus révélé. La configuration de devnet déployée fixe le minimum d’arbitre à 10 000 OPEN, dix fois les 1 000 que chaque autre rôle apporte.",
      },
      {
        id: "discover",
        title: "Trouvez un dossier ouvert",
        body: "Les arbitres choisissent les litiges sur lesquels travailler — personne ne vous en affecte un. Interrogez n’importe quel nœud pour les dossiers qui n’ont pas encore atteint le nombre d’arbitres requis.",
      },
      {
        id: "join",
        title: "Adhérez avant de pouvoir voir les preuves",
        body: "Adhérer est ce qui débloque un dossier pour vous : les soumissions de l’acheteur et du vendeur, les confirmations de paiement et le journal de messages de leur échange. Une fois qu’un dossier a son complément complet d’arbitres, il se verrouille et la phase d’engagement commence.",
      },
      {
        id: "commit",
        title: "Engagez votre vote — deux fois",
        body: "Deux votes engagement-révélation tournent côte à côte : un off-chain qui s’inscrit dans la piste d’audit et de réputation propre au dossier, et un on-chain contre le compte DisputeCase d’openfiat-escrow qui décide réellement de l’issue pondérée par stake. Utilisez la même décision et le même salt pour les deux — mais l’enum propre à chaque côté, pas le même nombre : Invalid off-chain vaut 2, InvalidDispute on-chain vaut 3, parce que MutualSettlement occupe 2 on-chain. Hachez le mauvais octet et vous vous engagez sur quelque chose que vous ne pourrez jamais révéler, ce qui est exactement ce qui fait slasher un arbitre.",
      },
      {
        id: "reveal",
        title: "Révélez dès que la fenêtre s’ouvre",
        body: "Révélez votre issue et votre salt aux deux endroits dès que la fenêtre d’engagement se ferme. On-chain, c’est aussi ici que votre vote gagne son poids réel : l’instruction de reveal lit directement votre compte de stake du rôle Arbitrator, si bien qu’un portefeuille sans stake d’arbitre ne peut tout simplement pas en fournir un valide.",
      },
      {
        id: "resolve",
        title: "L’issue s’exécute d’elle-même",
        body: "Une fois que chaque arbitre a révélé, ou que la fenêtre de reveal se ferme, n’importe qui — vous, l’acheteur, le vendeur ou un bot sans rapport — peut appeler execute_dispute_outcome. Il ne compte que les votes déjà enregistrés on-chain. Le design paie alors à la majorité une part des frais du dossier et retire une partie du stake de qui a révélé contre elle — mais ni la récompense ni la pénalité ne sont implémentées, donc aujourd’hui le décompte déplace les fonds des traders et rien de plus.",
      },
    ],
  },

  sale: {
    allocationLabels: {
      presale: "Prévente communautaire",
      allenhark: "Trésorerie AllenHark",
      ecosystem: "Trésorerie d’écosystème",
      infrastructure: "Bootstrap d’infrastructure",
      incentives: "Incitations de la communauté",
      liquidity: "Programmes de liquidité",
      reserve: "Réserve stratégique",
    },
    allocationVesting: {
      presale: "Sans lockup — débloqué au claim",
      allenhark: "Cliff de 12 mois, puis 36 mois linéaire",
      ecosystem: "Cliff de 12 mois, puis 36 mois linéaire",
      infrastructure:
        "Émis selon les règles de récompense des nœuds, pas une libération linéaire",
      incentives: "Émis à mesure que les incitations sont gagnées",
      liquidity: "Cliff de 3 mois, puis 24 mois linéaire",
      reserve: "Cliff de 12 mois, puis 48 mois linéaire",
    },
    useOfFunds: [
      "Ingénierie du protocole central",
      "Audits de sécurité indépendants",
      "Déploiement d’infrastructure",
      "Documentation",
      "Croissance de la communauté",
      "Outils pour développeurs",
      "Éducation et marketing",
      "Frais juridiques et opérationnels de lancement",
    ],
    vesting: [
      "Fondateurs",
      "Membres de l’équipe",
      "Conseillers",
      "Partenaires stratégiques",
      "Certaines allocations de prévente, le cas échéant",
    ],
    protections: [
      "Allocations documentées publiquement",
      "Calendriers de vesting transparents",
      "Portefeuilles de trésorerie publiquement connus",
      "Calendriers de libération prévisibles",
      "La gouvernance ne peut pas émettre de nouvelle offre en secret",
    ],
  },

  glossary: [
    {
      term: "OPEN",
      expansion: null,
      definition:
        "Le token d’utilité et de gouvernance du protocole. Ce n’est pas l’actif échangé — les règlements utilisent des stablecoins comme USDC. OPEN est mis en stake comme responsabilité économique et porte des droits de gouvernance. Émis une seule fois à la genèse avec une offre maximale fixe.",
      specs: [],
    },
    {
      term: "OFS",
      expansion: "OpenFiat Protocol Suite",
      definition:
        "La série de spécifications numérotées. Le numéro encode la couche : 1000 réseau, 2000 marché, 3000 réputation, 4000 gouvernance, 5000 identité, 6000 notifications, 7000 oracle et risque.",
      specs: ["OFS-0000"],
    },
    {
      term: "OFNP",
      expansion: "OpenFiat Network Protocol",
      definition:
        "La couche de transport pair-à-pair que tout nœud conforme implémente, bâtie sur libp2p avec QUIC, Noise et Yamux.",
      specs: ["OFS-1000"],
    },
    {
      term: "OFTP",
      expansion: "OpenFiat Trade Protocol",
      definition:
        "Le cycle de vie de l’échange : réservation, financement de la garde, paiement fiat, confirmation, règlement. Un échange ne peut jamais sauter un état obligatoire.",
      specs: ["OFS-2000"],
    },
    {
      term: "OFIP",
      expansion: "OpenFiat Improvement Proposal",
      definition:
        "Le véhicule de gouvernance pour modifier le protocole — l’équivalent d’un RFC ou d’un EIP.",
      specs: ["OFS-4000"],
    },
    {
      term: "SWQoS",
      expansion: "Stake-Weighted Quality of Service",
      definition:
        "Comment les nœuds sont priorisés. La priorité effective combine réputation, stake et performance réseau mesurée ; miser davantage ne peut pas compenser une mauvaise performance.",
      specs: ["OFS-1600"],
    },
    {
      term: "Annonce",
      expansion: null,
      definition:
        "Une déclaration signée publiquement exprimant la volonté d’un commerçant d’échanger, avec l’actif, la direction, la monnaie, les limites, le modèle de prix et les moyens de paiement.",
      specs: ["OFS-2100"],
    },
    {
      term: "Réservation",
      expansion: null,
      definition:
        "L’étape qui revendique une portion d’une annonce pour un acheteur précis, avant que la garde ne soit financée.",
      specs: ["OFS-2200"],
    },
    {
      term: "Garde",
      expansion: null,
      definition:
        "Conservation on-chain des stablecoins pendant l’échange. Les stablecoins entrent en garde avant que le paiement fiat ne commence, si bien qu’un acheteur n’envoie jamais de fiat sans fonds déjà protégés.",
      specs: ["OFS-2300"],
    },
    {
      term: "Coffre de liquidité",
      expansion: null,
      definition:
        "L’architecture on-chain qui conserve les fonds des échanges. Le règlement de l’échange est protégé ici plutôt que par le stake du commerçant.",
      specs: [],
    },
    {
      term: "Gossip",
      expansion: null,
      definition:
        "Comment les événements qui changent l’état se propagent dans le réseau, pour qu’aucun nœud ne dépende d’un flux central.",
      specs: ["OFS-1200"],
    },
    {
      term: "Snapshot",
      expansion: null,
      definition:
        "Une copie signée et compressée de l’état du marché avec une racine d’état, permettant à un nouveau nœud de se synchroniser vite au lieu de rejouer tout l’historique.",
      specs: ["OFS-1300"],
    },
    {
      term: "Nœud de bootstrap",
      expansion: null,
      definition:
        "Un répertoire qui présente un nœud fraîchement démarré aux pairs, puis devient optionnel. Il n’approuve rien et ne coordonne rien.",
      specs: ["OFS-1100"],
    },
    {
      term: "Registre de services",
      expansion: null,
      definition:
        "Le répertoire où les fournisseurs publient ce qu’ils offrent et où. C’est un répertoire, pas un marché : il ne fait pas de recommandations, et les clients choisissent d’eux-mêmes.",
      specs: ["OFS-1500"],
    },
    {
      term: "Déclaration d’identité",
      expansion: null,
      definition:
        "Une preuve volontaire et signée qu’un portefeuille contrôle un canal de communication comme un e-mail ou un compte Telegram. Elle établit un contrôle, jamais une identité légale, une nationalité ou une situation réglementaire.",
      specs: ["OFS-5000"],
    },
    {
      term: "Engagement-révélation",
      expansion: null,
      definition:
        "Le vote d’arbitre en deux phases : publier un engagement d’abord, révéler le vote et le secret ensuite, de sorte qu’aucun arbitre ne puisse voir les votes des autres avant d’émettre le sien.",
      specs: ["OFS-2400"],
    },
    {
      term: "Slashing",
      expansion: null,
      definition:
        "Perte d’une partie d’un stake pour des violations du protocole. Les règles sont déterministes et documentées publiquement ; les interruptions ordinaires affectent la réputation et l’éligibilité aux récompenses plutôt que de déclencher un slashing.",
      specs: [],
    },
    {
      term: "Décentralisation progressive",
      expansion: null,
      definition:
        "L’engagement le plus répété du livre blanc : AllenHark mène le développement initial, et la responsabilité de l’infrastructure et de la gouvernance est conçue pour se transférer à la communauté.",
      specs: [],
    },
    {
      term: "AllenHark",
      expansion: null,
      definition:
        "L’entreprise qui mène le développement initial. Elle exploite l’infrastructure de bootstrap pendant le lancement et concourt avec tout autre fournisseur sous des règles de protocole identiques. Elle est conçue pour devenir superflue.",
      specs: [],
    },
  ],
};
