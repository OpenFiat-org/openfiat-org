import type { Dictionary } from "./en";

/**
 * Portuguese (Brazil) — a complete translation, typed as Dictionary so a
 * missing key fails the build. Proper nouns (OpenFiat, OPEN, USDC, Solana,
 * AllenHark, GitHub, Discord, Reddit, Apache-2.0, the OFS-#### and source-file
 * references) stay as-is, and every {placeholder} is preserved.
 */
export const ptBR: Dictionary = {
  meta: {
    tagline: "Câmbio de fiat entre pares, descentralizado",
    description:
      "OpenFiat é um protocolo aberto para trocar stablecoins por moeda fiat local, de par a par, sem operador de câmbio centralizado. Liquidação na Solana; coordenação em uma rede aberta.",
  },

  nav: {
    howItWorks: "Como funciona",
    trust: "Confiança e segurança",
    whitepaper: "Whitepaper",
    specs: "Especificações",
    actors: "Participar",
    guides: "Guias",
    fees: "Taxas",
    sale: "Venda de tokens",
    runNode: "Executar um nó",
    launchApp: "Abrir o app",
    preview: "Prévia",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    primaryLabel: "Principal",
    skipToContent: "Pular para o conteúdo",
    language: "Idioma",
  },

  footer: {
    blurb:
      "Um protocolo aberto para trocar stablecoins e moeda fiat local, de par a par. Liquidação na Solana, coordenação em uma rede aberta.",
    columns: {
      protocol: "Protocolo",
      participate: "Participar",
      network: "Rede",
      project: "Projeto",
      community: "Comunidade",
    },
    links: {
      overview: "Visão geral do protocolo",
      howItWorks: "Como funciona",
      trust: "Confiança e segurança",
      whitepaper: "Whitepaper",
      specifications: "Especificações",
      glossary: "Glossário",
      roadmap: "Roteiro",
      fees: "Taxas",
      actors: "Todos os papéis",
      merchants: "Comerciantes",
      nodeOperators: "Operadores de nós",
      developers: "Desenvolvedores",
      guides: "Guias",
      becomeArbitrator: "Torne-se árbitro",
      earn: "Como você ganha",
      sale: "Venda de tokens",
      runNode: "Executar um nó",
      downloads: "Downloads",
      documentation: "Documentação",
      developerDocs: "Docs para desenvolvedores",
      status: "Status",
      app: "Abrir o app",
      foundation: "Fundação",
      blog: "Blog",
      press: "Imprensa",
      careers: "Carreiras",
      contact: "Contato",
      contribute: "Formas de contribuir",
      github: "GitHub",
      discussions: "Discussões",
      discord: "Discord",
      reddit: "Reddit",
      privacy: "Privacidade",
      terms: "Termos",
    },
    siteLicense: "Este site é de código aberto sob a licença Apache-2.0.",
    notice:
      "OpenFiat é um protocolo aberto, não um serviço financeiro. Nada neste site é uma oferta de venda de valores mobiliários nem aconselhamento financeiro. O fornecimento, a alocação e os termos de venda do token OPEN não são finais e continuam sujeitos a revisão da comunidade e modelagem econômica.",
  },

  home: {
    headlineLead: "Um mercado que",
    headlineAccent: "nenhum país ou empresa pode desligar",
    headlineTail: ".",
    lede: "OpenFiat é um protocolo aberto para trocar stablecoins por moeda local, de par a par. A custódia é liquidada na Solana; a descoberta, a reputação e a comunicação funcionam em uma rede que qualquer um pode integrar. Nenhum governo pode censurá-lo e nenhuma empresa pode suspendê-lo — não há operador a ser pressionado, apenas participantes.",
    ctaJoinSale: "Participe da pré-venda da comunidade",
    ctaHowItWorks: "Veja como uma negociação funciona",
    readWhitepaper: "Leia o whitepaper",
    tokenSale: "Venda de tokens",

    telemetry: {
      layers: "camadas",
      stakedRoles: "papéis em stake",
      specifications: "especificações",
      repositories: "repositórios",
      centralOperators: "operadores centrais",
    },

    problem: {
      title: "Toda plataforma P2P hoje tem a mesma arquitetura.",
      subtitle:
        "A criptomoeda é descentralizada. O mercado não. Por trás de quase toda troca entre pares:",
      company: "Uma única empresa",
      actions: [
        "é dona dos servidores",
        "controla o banco de dados",
        "decide quais anúncios aparecem",
        "resolve as disputas",
        "armazena as pontuações de reputação",
        "pode suspender ou remover usuários",
        "decide quais países são suportados",
        "pode ser encerrada, hackeada ou pressionada",
      ],
      verdict:
        "Se o operador falha — técnica, financeira ou legalmente — o mercado desaparece, mesmo que a blockchain por baixo nunca tenha parado. O OpenFiat elimina essa dependência.",
    },

    layers: {
      title: "Duas camadas, cada uma fazendo o que faz de melhor.",
      subtitle:
        "A arquitetura minimiza o custo on-chain preservando a propriedade descentralizada e a transparência.",
      coordination: {
        label: "Camada de coordenação · rede OpenFiat",
        title: "Comunicação rápida entre pessoas",
        body: "Funciona em uma rede aberta entre pares que qualquer um pode integrar — sem empresa no meio, sem servidor a apreender.",
        items: [
          "Descoberta de anúncios",
          "Coordenação de negociações",
          "Reputação",
          "Comunicação criptografada",
          "Notificações e busca",
          "Indexação do mercado",
        ],
      },
      settlement: {
        label: "Camada de liquidação · Solana",
        title: "O que as blockchains fazem excepcionalmente bem",
        body: "Os ativos são bloqueados e liberados por contratos inteligentes auditados — nunca pela boa vontade de um operador.",
        items: [
          "Custódia segura de ativos",
          "Gestão da custódia",
          "Staking",
          "Gestão de tesouraria",
          "Execução da governança",
        ],
      },
    },

    flow: {
      title: "Uma negociação, quatro movimentos",
      subtitle:
        "Protegida a partir do segundo movimento — ninguém no meio pode pegar os fundos, e ninguém precisa confiar na boa vontade do outro lado.",
      stages: ["Rede", "On-chain", "Trilho fiat", "On-chain"],
      pathsNote: "e continue: guias para traders, operadores e desenvolvedores",
    },

    read: {
      title: "Leia o protocolo",
      subtitle:
        "Cada capítulo publicado como página web — sem download, nada atrás de um formulário. Não pressupõe experiência prévia com blockchain e parte do que é dinheiro. As especificações numeradas ficam ao lado, para quem implementa.",
      startHere: "comece aqui",
      moreChapters: (n: number) => `${n} capítulos a mais`,
      specsCta: (n: number) => `${n} especificações`,
    },

    contribute: {
      title: "Construa conosco",
      subtitle:
        "Cada camada é de código aberto sob Apache-2.0, e o repositório de especificações aceita textos e traduções — contribuir não precisa significar código.",
    },

    saleBand: {
      body: "OPEN é o stake por trás de cada papel que mantém o mercado honesto — comerciantes, árbitros, nós, oráculos. A pré-venda oferece a alocação da comunidade a uma taxa fixa antes de qualquer venda pública. Nenhum contrato de venda foi implantado ainda; conectar uma carteira hoje apenas verifica a prontidão.",
      bodyLive:
        "OPEN é o stake por trás de cada papel que mantém o mercado honesto — comerciantes, árbitros, nós, oráculos. A pré-venda oferece a alocação da comunidade a uma taxa fixa antes de qualquer venda pública. A pré-venda já está ativa na devnet; conectar uma carteira permite contribuir hoje mesmo.",
      presaleRate: "Taxa da pré-venda",
      publicRate: "Venda pública depois",
      publicRateValue: "1 USDC = 80 OPEN",
      supply: "Fornecimento",
      supplyValue: "100.000.000.000 · autoridade de emissão anulada",
      status: "Status",
      statusLive: "Ativa na devnet",
      termsCta: "Termos de venda e alocação",
    },

    safety: {
      more: "Como a confiança funciona",
    },

    roles: {
      seeAll: "Ver todos os papéis",
    },

    finalCta: {
      title: "Seu dinheiro, sua moeda, sem intermediário.",
      body: "Comece com uma visão geral de cinco minutos, ou leia tudo.",
      start: "Veja como uma negociação funciona",
    },
  },

  whitepaper: {
    title: "O protocolo OpenFiat, na íntegra",
    intro:
      "Cada capítulo é publicado aqui como página web — sem download necessário, nada atrás de um formulário. Não pressupõe experiência prévia com blockchain e parte do que é dinheiro.",
    chapters: (n: number) => `${n} capítulos`,
    words: (n: string) => `~${n} palavras`,
    readTime: (h: number, m: number) => `~${h}h ${m}min de leitura`,
    startReading: "Começar a ler",
    downloadPdfs: "Baixar PDFs",
    frontMatter: "Preliminares",
    chapter: (n: number) => `Capítulo ${n}`,
    expandsChapter: (n: number) => `expande o cap. ${n}`,
    englishOnlyTitle: "Publicado em inglês",
    englishOnlyBody:
      "O whitepaper e as especificações ainda não foram traduzidos. A tradução é listada como área de contribuição da comunidade no Capítulo 25; a navegação desta página é localizada, mas o texto do documento é o inglês original.",
  },

  specsPage: {
    title: "O conjunto de protocolos OpenFiat",
    intro: (count: number) =>
      `${count} especificações numeradas. O número codifica a camada: os 1000 são redes, os 2000 são o mercado, e assim por diante até oráculos e inteligência de risco.`,
    published: (n: number) => `${n} publicadas`,
    layers: (n: number) => `${n} camadas`,
    draft: "Versão 1.0.0 · Rascunho",
    reservedTitle: "Faixas reservadas",
    notWritten: "Ainda não redigida",
    reservedNote:
      "As especificações em faixas reservadas são citadas por documentos publicados, mas não foram redigidas. As referências a elas aparecem como texto simples em vez de links.",
  },

  reader: {
    onThisPage: "Nesta página",
    minRead: (n: number) => `${n} min de leitura`,
    wordCount: (n: string) => `${n} palavras`,
    sections: (n: number) => `${n} seções`,
    relatedChapter: "Capítulo relacionado",
    revisitsGround: "Este capítulo revisita o que foi abordado em",
    canonicalTreatment: ", que é o tratamento canônico.",
    coversOverlapping: "cobre material sobreposto de um segundo ângulo.",
    dependsOn: "Depende de",
    dependedOnBy: "Do qual dependem",
    navLabel: "Navegação do documento",
    specifications: "Especificações",
    whitepaper: "Whitepaper",
    layer: (name: string) => `Camada ${name}`,
  },

  actors: {
    title: "Compradores, comerciantes, árbitros, operadores de nós",
    intro:
      "Dez papéis mantêm o OpenFiat funcionando — alguns você assume só negociando, outros executando infraestrutura. Ninguém concede permissão para nenhum deles.",
    whatTheyDo: "O que fazem",
    whatTheyStake: "Stake",
    howTheyEarn: "Como ganham",
    requirements: "Requisitos",
    repositories: "Repositórios",
    governedBy: "Governado por",
    noStake: "Não requer stake",
    noStakeStated: "Não especificado no whitepaper",
    notStated: "Não especificado no whitepaper",
    readMore: "Leia mais",
    otherRoles: "Outros papéis",
    permissionless: "Sem permissão",
    stakeNote:
      "O stake demonstra comprometimento econômico com o ecossistema. Não é um pagamento. Os participantes mantêm a propriedade de seu stake, a menos que se apliquem penalidades definidas pelo protocolo.",
  },

  howItWorks: {
    title: "Como uma negociação funciona",
    lede: "Quatro passos. A cripto da sua contraparte é bloqueada antes de você abrir mão de qualquer dinheiro, e continua bloqueada até vocês dois concordarem que o pagamento chegou.",
    flowTitle: "Os quatro passos",
    needTitle: "O que você precisa",
    need: [
      "Uma carteira que você controla — sem conta, sem cadastro, sem KYC",
      "Stablecoins para vender, ou moeda local para comprar",
      "Um método de pagamento que você já usa",
    ],
    railsTitle: "Formas de pagar",
    railsLede:
      "O lado fiat se move nos trilhos que você já usa. O OpenFiat padroniza como um método de pagamento é descrito e confirmado, não como ele opera.",
    safetyTitle: "Se algo der errado",
    safetyLede:
      "Qualquer um dos lados pode abrir uma disputa, e árbitros independentes a decidem com o próprio stake em risco.",
    safetyMore: "Como a confiança funciona",
  },

  trust: {
    title: "Confiança, sem ninguém em quem confiar",
    lede: "Um estranho está prestes a lhe enviar dinheiro em uma moeda que nenhuma blockchain enxerga. Quatro mecanismos tornam isso seguro, e nenhum deles é uma empresa prometendo ser justa.",
    flowTitle: "O que protege uma negociação individual",
    pillarsTitle: "Do que a confiança é feita",
    disputeTitle: "Quando uma negociação dá errado",
    disputeLede:
      "Qualquer um dos lados pode abrir uma disputa. Ela é decidida por árbitros independentes que apostam seu próprio OPEN em acertar, e que não podem ver as provas até se comprometerem.",
    noAppeal:
      "Não há recurso na versão 1. O voto de comprometer e revelar, os árbitros com stake e as penalidades moderadas são as salvaguardas, em vez de uma segunda audiência.",
    readChapter: "Leia o protocolo de disputas",
    readReputation: "Leia o motor de reputação",
  },

  protocolPage: {
    title: "OpenFiat não é uma blockchain",
    lede: "É uma camada de coordenação que fica em cima de uma. A Solana guarda o dinheiro e executa a custódia; o OpenFiat carrega tudo o que um mercado precisa e que não tem por que estar em uma cadeia — listagens, reputação, mensagens, descoberta.",
    layersTitle: "Duas camadas, cada uma no que é boa",
    layersLede:
      "A divisão é todo o design. Descentralize o que se beneficia disso, e deixe o resto onde funciona melhor.",
    settlement: "Camada de liquidação",
    coordination: "Camada de coordenação",
    principlesTitle: "O raciocínio por trás",
    principlesLede:
      "O Capítulo 3 apresenta doze princípios dos quais todo o protocolo é derivado. Estes seis fazem o maior trabalho.",
    suiteTitle: "Um conjunto de especificações numeradas",
    suiteLede: (count: number) =>
      `${count} especificações formais, agrupadas em camadas. O número diz a qual camada um documento pertence.`,
    browseSpecs: "Explorar as especificações",
    readAll: "Ler os doze princípios",
  },

  runNode: {
    title: "Executando um nó OpenFiat",
    intro:
      "Os operadores de nós mantêm o mercado descentralizado que fica acima da blockchain. Os validadores da Solana protegem a cadeia e executam os programas do OpenFiat; os nós carregam as listagens, a reputação, as mensagens e a descoberta.",
    neverCustody:
      "Os nós nunca custodiam fundos dos usuários. Todas as operações financeiras permanecem sob o controle dos contratos inteligentes da Solana.",
    requirementsTitle: "Hardware",
    installTitle: "Instalação",
    releasesLink: "Releases do GitHub",
    referenceNote:
      "Os comandos abaixo usam a implantação de referência: o serviço openfiat-node, /etc/openfiat para configuração e /var/lib/openfiat para dados.",
    serveRpcTitle: "Sirva a rede, não só a si mesmo",
    serveRpc:
      "Um nó que só lê é um convidado. Um nó que o público pode alcançar é infraestrutura — carteiras, exploradores e apps web precisam falar com *alguém*, e hoje existem poucos desses alguéns. Cada operador que põe seu nó atrás de TLS e define --public-rpc-url amplia esse conjunto, que é a diferença entre uma rede com várias portas de entrada independentes e uma com um único ponto de falha do qual todos dependem em silêncio. Custa um certificado e um proxy reverso. Também é remunerado: um nó alcançável é um que os pares podem desafiar e recompensar, e os próprios aplicativos do OpenFiat usarão o seu junto com todos os outros.",
    serveRpcHonest:
      "Duas coisas que vale saber antes. Servir o público significa tráfego real, então dimensione a máquina para isso e vigie o endpoint de métricas. E um nó público é um compromisso público — as pessoas vão construir contra a URL que você publica, então retire-a deliberadamente em vez de silenciosamente.",
    portsTitle: "Portas",
    portPublic: "Deve ser alcançável",
    portPrivate: "Mantenha privada",
    troubleshootingTitle: "Quando algo está errado",
    copy: "Copiar",
    copied: "Copiado",
    minimum: "Mínimo",
    recommended: "Recomendado para produção",
    lifecycleTitle: "Colocando um nó online",
    lifecycleNote:
      "Trabalhe nestes passos em ordem. Cada passo abaixo traz o comando de que precisa.",
    monitoringTitle: "O que um nó deve expor",
    stakingBody:
      "Um nó faz stake de OPEN para se tornar um participante ativo. Mas o stake não compra reputação: um operador com desempenho ruim não pode compensar fazendo mais stake. A prioridade efetiva combina reputação, stake e o desempenho de rede medido.",
    hostUiTitle: "Hospedando a interface de usuário",
    hostUiIntro:
      "O OpenFiat separa o protocolo de suas interfaces. Qualquer um pode hospedar uma interface web, um gateway móvel, um portal corporativo ou um mercado regional, e cada um deles alcança o mesmo mercado.",
    hostUiQuote:
      "Independentemente da interface usada, cada participante interage com o mesmo mercado descentralizado.",
    hostUiConnect: "A que uma interface se conecta",
    hostUiConnectBody:
      "As interfaces não falam diretamente com a cadeia. Elas se conectam a um ou mais nós OpenFiat próximos, e trocam para outro nó se um ficar indisponível.",
    apiTitle: "Superfície de API do nó",
    apiNote:
      "Todo nó compatível expõe a mesma superfície de API, então uma interface escrita contra um nó funciona contra todos.",

    hostingTitle: "Onde executá-lo",
    hostingIntro:
      "A AllenHark lidera o desenvolvimento inicial do protocolo e vende as duas coisas de que um nó precisa: um servidor e acesso RPC à Solana. Os operadores de nós recebem {pct}% de desconto em ambos, como parte do programa OpenFiat.",
    hostingVps: "Hospedagem de servidores",
    hostingVpsBody:
      "Armazenamento NVMe em links de 10 Gbps, em Frankfurt, Amsterdã e Chicago. Dimensione contra o hardware acima — o armazenamento é o que um nó completo vai exigindo, então diga o que você está executando e ele pode ser especificado para você.",
    hostingRpc: "RPC e gRPC da Solana",
    hostingRpcBody:
      "Conexões com stake, para que as transações que seu nó envia não fiquem em fila atrás das de todos os outros. O acesso é concedido por lista de IPs permitidos em vez de uma chave de API. O Yellowstone gRPC está disponível para transmitir atualizações de contas e slots.",
    hostingViewPricing: "Ver preços",
    hostingClaimTitle: "Reivindicando o desconto",
    hostingClaimBody:
      "Não há código a inserir. Pergunte no Discord ou no chat em allenhark.com, diga que está executando um nó OpenFiat, e o desconto é aplicado ao seu pedido.",
    hostingDiscord: "Perguntar no Discord",
    hostingChat: "Abrir um chat",
  },

  earn: {
    title: "Como você ganha",
    intro:
      "A recompensa de um nó é uma parcela da emissão de um dia, decidida pelo que ele fez stake e por três medições do que fez com esse stake. Esta é a fórmula que o software realmente executa, com as partes que ele não pode saber marcadas como tais.",
    heroMeta:
      "Cada constante desta página é lida de crates/rewards em openfiat-core. Nenhum nó foi pago ainda.",

    modelTitle: "O que decide sua parcela",
    modelIntro:
      "A emissão por época é fixa. Sua recompensa é seu peso sobre o peso de todo nó elegível, e o peso é um stake multiplicado por três medições de serviço — cada uma no máximo 1,0.",
    termStakeTitle: "O que você fez stake",
    termStakeBody:
      "Lido da sua conta de stake on-chain, nunca de um número que seu nó reporta sobre si mesmo. Um stake dá lastro a um nó: se dois nós nomeiam a mesma conta, ambos são excluídos da época.",
    termConnectivityTitle: "Se você faz ponte para a Solana",
    termConnectivityBody:
      "1,0 se a rede viu seu nó originar um anúncio de blockhash da Solana, 0,4 se só o viu propagar por gossip. Um nó ponte faz estritamente mais trabalho, e a diferença aparece em seus próprios anúncios assinados em vez de em uma alegação.",
    termAvailabilityTitle: "Quanto do dia você esteve no ar",
    termAvailabilityBody:
      "A parcela das 24 fatias de uma hora da época em que seu nó foi ouvido. Ser ouvido uma vez em uma fatia a pontua e ser ouvido quinhentas vezes pontua igual, então inundar a rede não ganha nada.",
    termPinningTitle: "Se você serve conteúdo",
    termPinningBody:
      "1,0 se seu nó retornou bytes correspondentes a um endereço de conteúdo quando desafiado, 0,7 se nunca foi desafiado ou falhou. Este é o único dos três que é provado em vez de plausível — bytes que resumem a um CID não podem ser produzidos sem possuí-los.",
    pinningAheadOfSpec:
      "Uma ressalva sobre esse quarto termo. A tabela confirmada da OFS-4100 §9.2 lista três fatores — stake, conectividade, disponibilidade — e não menciona o pinning. O crate o aplica mesmo assim. Onde a especificação e o código divergem, esta página segue o código, porque o código é o que calcularia um cronograma; mas leia o multiplicador de pinning como algo à frente da especificação em vez de definido por ela.",

    ceilingTitle: "Nada aqui pode exceder 1,0",
    ceilingLede:
      "Todo multiplicador é uma fração de um, e o software se recusa a iniciar com um conjunto de parâmetros em que algum não seja.",
    ceilingBody:
      "Isso não é cautela, é o único arranjo que fecha. O pool de uma época é um número fixo de tokens, e os multiplicadores decidem como esse pool é dividido. Um multiplicador acima de 1,0 não pagaria a mais a um bom nó de algum lugar — ele repartiria tokens que o balde de Infraestrutura não contém. RewardParams::validate rejeita tal conjunto de imediato em vez de deixar o déficit aparecer no dia do pagamento.",
    ceilingPenalty:
      "É também por isso que a recompensa por servir conteúdo é construída como uma penalidade sobre os nós que não servem. «Nós que fazem pinning ganham mais» e «nós que não fazem pinning ganham menos» descrevem o mesmo resultado, e só o segundo pode ser implementado sem inventar tokens. Um nó que faz pinning mantém toda a sua parcela; um nó que não faz pinning de nada cede três décimos da sua.",
    matrixCaption:
      "Todos os valores que as duas chaves podem assumir, em disponibilidade total.",
    matrixQuality: "Multiplicador",
    matrixNote:
      "Leia as duas linhas centrais juntas: um nó só-gossip que serve conteúdo ({gossipPin}) ainda ganha menos que um nó ponte que não serve nenhum ({rpcNoPin}). Servir conteúdo é um prêmio sobre uma conexão à cadeia, nunca um substituto dela.",

    calcTitle: "Experimente seus próprios números",
    calcIntro:
      "A coluna da esquerda é o que você controla. A da direita divide o resultado em dois: o que suas entradas definem exatamente, e o que depende de uma rede que ainda não se formou.",
    yourNode: "Seu nó",
    stakeLabel: "Stake",
    stakeHint:
      "Abaixo de 1.000 OPEN um nó não é ponderado de jeito nenhum. Não é pago com uma parcela menor — é ignorado.",
    availabilityLabel: "Horas em que foi ouvido",
    availabilityHint:
      "Das 24 fatias de uma hora da época. Uma fatia conta uma vez, por mais tráfego que você envie durante ela.",
    connectivityLabel: "Conectividade",
    connectivityRpc: "Ponte para a Solana",
    connectivityGossip: "Só gossip",
    pinningLabel: "Conteúdo",
    pinningServing: "Respondeu a um desafio",
    pinningAbsent: "Não desafiado, ou falhou",

    determinedTitle: "Definido pelas suas entradas",
    qualityCeiling: "de um possível 1,00",
    qualityLabel:
      "Seu multiplicador de qualidade — os três fatores de serviço, combinados do jeito que o cronograma os combina.",
    factorConnectivity: "conectividade",
    factorAvailability: "disponibilidade",
    factorPinning: "pinning",
    factorProduct: "qualidade",
    ineligibleBelowFloor:
      "Com este stake o nó não ganha nada. {min} OPEN é o piso, e um nó abaixo dele fica de fora da ponderação inteira.",
    ineligibleOffline:
      "Um nó não ouvido em nenhuma fatia da época pontua zero de disponibilidade, o que zera todo o peso. Não ganha nada, seja qual for o stake.",

    assumedTitle: "Depende do resto da rede",
    assumedNote:
      "Sua parcela é seu peso dividido pelo peso de todo nó elegível, então não pode ser calculada só com suas entradas. Não há um total ao vivo para substituir — esta página não lê estado da cadeia, e nenhuma recompensa jamais foi distribuída. Então o total é um palpite, você o define, e ambos os números abaixo se apoiam nele e em nada mais firme.",
    peersLabel: "Outros nós elegíveis",
    peerStakeLabel: "Stake de cada um deles",
    shareLabel: "Sua parcela do pool da época",
    perEpochLabel: "OPEN por época, sob essa suposição",
    poolReminder:
      "O pool inteiro é de {pool} OPEN por época, dividido entre todo nó elegível. Ambos os números se movem no instante em que qualquer outro faz stake, e nenhum é uma previsão.",

    emissionTitle: "O pool é finito",
    emissionLede:
      "A emissão de bootstrap é um balde, não uma taxa. Ele esvazia.",
    emissionBody:
      "120.000.000 OPEN — 12% do fornecimento — são reservados para pagar os nós enquanto a receita do protocolo é pequena demais para importar, distribuídos igualmente por cerca de quatro anos de épocas diárias. No dia em que acabar, o pool de recompensas passa a ser exatamente a parcela da tesouraria de Infraestrutura sobre as taxas de liquidação: o que a rede ganhou, e nada mais. Quem dimensiona um nó contra os números acima deveria dimensioná-lo contra esse dia também.",
    emissionBucket: "OPEN no balde",
    emissionBucketNote:
      "A alocação de gênese de Infraestrutura / Bootstrap de Nós, 12% do fornecimento total.",
    emissionPerEpoch: "OPEN por época",
    emissionPerEpochNote:
      "Compartilhado por todo nó elegível, e limitado pelo que resta no balde.",
    emissionEpochs: "Épocas diárias",
    emissionEpochsNote:
      "Cerca de quatro anos, após os quais a emissão é o que a receita do protocolo financiar.",

    refusalTitle: "O que esta página não vai lhe dizer",
    refusalLede: "Três números estão faltando, e cada um falta de propósito.",
    refusalPriceTitle: "Quanto vale na sua moeda",
    refusalPriceBody:
      "OPEN não tem mercado e, portanto, não tem preço. Um número em dólares, euros ou renminbi aqui seria um valor que este projeto inventou sobre o próprio token e depois lhe entregou com a autoridade de uma calculadora. Não há taxa honesta para converter, então não há conversão.",
    refusalYieldTitle: "Um rendimento, uma APR ou um retorno",
    refusalYieldBody:
      "Um retorno percentual soa como uma promessa, e isso não é algo que o protocolo possa prometer. A emissão por trás esvazia em quatro anos, a parcela é dividida com cada nó que entra, e nenhum dos parâmetros é fixo — a §9 torna todos eles atualizáveis pela governança. Um único número anualizado esconderia as três coisas.",
    refusalTotalTitle: "Quanto a rede fez de stake hoje",
    refusalTotalBody:
      "Esta página não lê estado da cadeia. Sua parcela depende do total em stake em todo nó elegível e, em vez de substituir um número plausível, a calculadora torna esse total uma suposição que você define, e depois rotula tudo que se apoia nela.",

    statusTitle: "O que está realmente rodando",
    statusBadge: "Devnet · nada pago",
    statusLede: "O cálculo existe. O pagamento não.",
    statusBody:
      "Os nós observam a atividade uns dos outros e publicam o que viram, e o cronograma que transforma essas observações em quantias está implementado e testado — de forma determinística, para que qualquer um com as mesmas observações derive a mesma resposta e o nó pagador possa ser verificado em vez de confiado. O que falta é o último passo: nada envia um cronograma on-chain, e o cofre de recompensas está vazio. Nenhum nó jamais foi pago.",
    statusParams:
      "Cada valor aqui é um parâmetro de governança em vez de uma constante: o piso de {min} OPEN, as {buckets} fatias de disponibilidade e os quatro multiplicadores podem ser alterados por voto sem mudança de código. Estes são os padrões de hoje.",
    sourceNote:
      "As constantes são lidas de crates/rewards/src/params.rs; a aritmética espelha schedule.rs, incluindo onde ela trunca.",
    sourceLink: "Leia o código-fonte",
    specLink: "Leia a OFS-4100",

    ctaTitle: "Execute um e descubra",
    ctaBody:
      "O modelo de recompensas é a metade menor da decisão. A maior é se a máquina, a banda e a atenção valem a pena para você — o guia do operador tem o hardware real, os comandos reais e as partes que ainda não foram construídas.",
    ctaRunNode: "Executar um nó",
    ctaFees: "Cada taxa e pagamento",
  },

  fees: {
    title: "Taxas",
    intro:
      "Cada taxa que o protocolo cobra e tudo o que ele paga. A maior parte do que segue está decidida e documentada, mas ainda não cobrada nem paga, e cada linha diz qual é — uma página de taxas que se lesse como se tudo estivesse ao vivo seria o tipo de erro mais grave.",
    accuracyNote:
      "Apenas devnet. Toda taxa é um parâmetro de governança, nunca uma constante.",
    payTitle: "O que você paga",
    payIntro:
      "Três taxas, e elas não recaem sobre a mesma parte. Um comprador paga só numa negociação concluída e nada para abrir uma disputa; um comerciante arca com os custos permanentes de anunciar e de ser arbitrado.",
    receiveTitle: "O que cada papel recebe",
    receiveIntro:
      "Consumo e compensação são questões separadas. Um serviço pode ser gratuito de consumir e ainda assim ser pago pelo protocolo — é exatamente assim que as taxas de oráculo funcionam.",
    permissionedTitle: "O único papel permissionado",
    permissionedBody:
      "A inteligência de risco é o único papel que exige aprovação da governança antes de operar. A AllenHark é a provedora padrão.",
    defaultProviderLabel: "Chave de serviço padrão",
    governanceTitle: "Toda taxa é um parâmetro",
    governanceBody:
      "Nenhum valor aqui é uma constante. Cada um é atualizável pela governança, porque taxas denominadas em um token têm de se mover conforme o preço desse token. Os números mostrados são os padrões atuais, e os marcados como propostos não foram aprovados.",
    columnPayer: "Pagador",
    columnAmount: "Valor",
    columnConsumer: "Consumidor paga",
    columnReceives: "Provedor recebe",
    status: {
      live: "Cobrada hoje",
      specified: "Especificada, ainda não ativa",
      none: "Nada, por decisão",
    },
  },

  guides: {
    title: "Guias",
    intro:
      "Passo a passo, com os comandos reais. Cada guia é escrito contra o software como ele existe hoje, então onde algo ainda não foi construído, o guia diz isso em vez de descrever como ficaria.",
    accuracyNote:
      "Apenas devnet. Os ids de programa e endpoints nestas páginas são artefatos de devnet; não há implantação em mainnet.",
    allGuides: "Todos os guias",
    requirementsTitle: "Antes de começar",
    stepsTitle: "Passos",
    relatedTitle: "Relacionado",
    copy: "Copiar",
    copied: "Copiado",
    standalonePage: "Página independente",
    azTitle: "Todos os guias, A–Z",
    progressNote:
      "O progresso vive só neste navegador — sem conta, nada enviado a lugar nenhum.",
    completedLabel: "concluído",
    milestonesMeta: (count: number) =>
      `${count} marco${count === 1 ? "" : "s"}`,
    stepsMeta: (count: number) => `${count} passo${count === 1 ? "" : "s"}`,
    milestoneOf: (position: number, total: number) =>
      `Marco ${position} de ${total}`,
    markStepDone: "Marcar passo como feito",
    stepDoneLabel: "Feito",
    prevOnPath: "Anterior no caminho",
    nextOnPath: "Próximo no caminho",
    groups: {
      trade: {
        title: "Negociar",
        blurb:
          "Comprar e vender, e fornecer a liquidez contra a qual outros negociam.",
      },
      operate: {
        title: "Executar infraestrutura",
        blurb:
          "Os papéis que mantêm a rede de pé. A receita do protocolo deve pagar por isso; nada dela flui ainda.",
      },
      build: {
        title: "Construir sobre o OpenFiat",
        blurb:
          "Escrever software contra o protocolo em vez de usar um app que outra pessoa escreveu.",
      },
    },
    standalone: {
      runNode: {
        title: "Executar um nó",
        summary:
          "Instale, configure e opere um nó OpenFiat, do hardware ao monitoramento.",
      },
      becomeArbitrator: {
        title: "Torne-se árbitro",
        summary:
          "Faça bond de OPEN, pegue um caso de disputa e emita o voto de comprometer-revelar que o decide.",
      },
    },
  },

  becomeArbitrator: {
    title: "Torne-se um árbitro OpenFiat",
    intro:
      "Os árbitros decidem disputas com o próprio OPEN em risco, não a reputação. Isto percorre o bond, encontrar um caso e emitir o voto de comprometer-então-revelar que de fato paga.",
    neverCustody:
      "Os árbitros nunca guardam fundos de negociações. Uma decisão só move dinheiro que o próprio programa de custódia já bloqueou antes de a disputa ser aberta.",
    requirementsTitle: "O que você precisa",
    bondCta: "Faça bond de {amount} OPEN no openfiat-app",
    lifecycleTitle: "Trabalhando um caso",
    lifecycleNote:
      "Trabalhe nestes passos em ordem, um caso de cada vez. Cada passo traz o comando ou código de que precisa.",
    copy: "Copiar",
    copied: "Copiado",
  },

  sale: {
    title: "A pré-venda comunitária do OPEN",
    notLiveTitle: "A venda não está aberta",
    notLiveBody:
      "Nenhum contrato de venda foi implantado e nenhum termo é final. Você pode conectar uma carteira para verificar a prontidão, mas ainda não há nada para comprar.",
    connectWallet: "Conectar carteira",
    disconnect: "Desconectar",
    connected: "Conectada",
    verifyWallet: "Verificar carteira",
    verifying: "Aguardando a assinatura…",
    verified: "Verificada",
    verifyNote:
      "Assine uma mensagem (sem transação, sem taxa) para confirmar que você controla esta carteira antes de comprar.",
    verifyUnsupported:
      "Esta carteira não suporta assinatura de mensagens — você ainda pode comprar; a propriedade da carteira é provada pela própria assinatura da transação.",
    balance: "Saldo",
    max: "Máx",
    limitNote:
      "{min}–{max} USDC por carteira. Máx pega o menor entre seu saldo e esse limite.",
    raisedLabel: "Arrecadado",
    goalLabel: "Meta",
    offeredLabel: "Ofertado",
    goalNote:
      "A meta é um objetivo, não um teto. A pré-venda oferece toda a alocação da Pré-venda Comunitária, então pode continuar vendendo além da meta se a demanda for mais longe.",
    publicSaleNote:
      "O que restar sem vender da alocação da Pré-venda Comunitária quando a pré-venda fechar será ofertado depois em uma venda pública a 1 USDC = 80 OPEN.",
    purchase: "Comprar OPEN",
    purchaseDisabled: "A compra abre quando a venda entrar no ar",
    amount: "Você paga",
    youReceive: "Você recebe",
    rateNote: "1 USDC = 100 OPEN",
    estimated: "estimado",
    reviewing: "Simulando a transação…",
    submitting: "Aguardando a assinatura da carteira…",
    confirming: "Confirmando…",
    done: "Compra confirmada",
    txFailed: "A transação não foi enviada",
    txSuccess: "Confirmada",
    errors: {
      amountRequired: "Informe um valor para contribuir.",
      amountInvalid: "Informe um valor maior que zero.",
      insufficientBalance:
        "Você tem {balance} {symbol}. Informe um valor que seu saldo cubra.",
      belowMinimum:
        "A primeira contribuição de uma carteira deve ser de no mínimo {min} USDC.",
      aboveMaximum:
        "Uma carteira pode contribuir com no máximo {max} USDC no total.",
      hardCapReached:
        "A venda atingiu o limite e não aceita mais contribuições.",
      saleNotOpen: "A venda não está aberta no momento.",
      claimsNotOpen: "Os resgates abrem quando a venda for finalizada.",
      nothingToClaim: "Você não tem mais OPEN para resgatar.",
      walletBanned: "Esta carteira não pode participar da venda.",
      walletRejected: "Você cancelou a solicitação na sua carteira.",
      notEnoughSol: "Você não tem SOL suficiente para a taxa de rede.",
      expired: "A solicitação expirou antes de confirmar. Tente novamente.",
      slippage: "O preço variou demais durante a troca. Tente novamente.",
      network:
        "Não foi possível alcançar a rede. Verifique sua conexão e tente de novo.",
      generic: "Algo deu errado e a compra não foi feita.",
      detailsLabel: "Detalhes técnicos",
    },
    claim: "Reivindicar OPEN",
    swapNotice:
      "Convertido para USDC atomicamente ao preço confirmado antes de creditar sua alocação de OPEN. Reembolsos (se o soft cap não for atingido) são pagos em USDC, não no ativo original.",
    whatIsOpen: "O que é OPEN",
    whatIsOpenBody:
      "OPEN é o token de utilidade e governança do protocolo. Não é o ativo negociado — as liquidações do mercado acontecem em stablecoins como USDC. OPEN é feito stake por comerciantes, árbitros, operadores de nós e provedores de serviços como responsabilização econômica, e carrega direitos de governança.",
    supplyTitle: "Fornecimento fixo",
    supplyBody:
      "OPEN é emitido uma vez na gênese com um fornecimento máximo fixo, e cada alocação inicial é verificável publicamente on-chain.",
    allocationTitle: "Categorias de alocação",
    allocationNote:
      "As porcentagens de alocação estão detalhadas no Documento de Tokenomics do OPEN.",
    useOfFundsTitle: "O que a pré-venda financia",
    vestingTitle: "Vesting e proteções",
    whatVests: "O que tem vesting",
    vestingNote:
      "As alocações de longo prazo são desbloqueadas em cronogramas publicados em vez de tudo de uma vez, e cada liberação é visível on-chain.",
    protectionsTitle: "Proteções",
    riskTitle: "Risco",
    riskBody:
      "Nada aqui é uma oferta de venda de valores mobiliários nem aconselhamento financeiro. Os termos podem mudar. Participar de uma venda de tokens pode resultar em perda total.",
    rewardsTitle: "Suas recompensas em OPEN",
    rewardsSubtitle: "Conecte a carteira com que você contribuiu.",
    rewardsConnectPrompt:
      "Conecte sua carteira para ver o que você ganhou na pré-venda.",
    rewardsContributed: "Você contribuiu",
    rewardsEntitlement: "Recompensa em OPEN",
    rewardsNoContribution:
      "Nenhuma contribuição encontrada para esta carteira.",
    rewardsNoContributionCta: "Participe da pré-venda",
    rewardsPendingNote:
      "Contado assim que a venda for finalizada — volte a verificar após o fechamento.",
    rewardsClaimedNote: "Já reivindicada para esta carteira.",
    rewardsRefundableNote:
      "O soft cap não foi atingido — esta contribuição é reembolsável em USDC na página da venda.",
    rewardsGoToSale: "Ir para a página da venda",
  },

  pages: {
    roadmap: {
      eyebrow: "roteiro",
      title: "Roteiro",
      intro:
        "A versão 1.0 das especificações é o ponto de partida, não a chegada. O Capítulo 26 apresenta as fases; cada item abaixo é um marco em vez de um recurso já entregue.",
    },
    downloads: {
      eyebrow: "downloads",
      title: "Downloads",
      intro:
        "Versões de software do GitHub — binários do nó, SDKs e o app — além do whitepaper em PDF. Não há PDFs das especificações OFS — leia-as no site ou no repositório de especificações.",
      releasesTitle: "Software releases",
      releasesIntro:
        "Each project publishes its own tagged releases on GitHub. These links always point at the latest.",
      nodeTitle: "Node",
      nodeBody:
        "The reference node binary and source — the software that runs the network in run-a-node.",
      sdkTitle: "SDKs",
      sdkBody:
        "Client libraries for building against OpenFiat: TypeScript and Rust packages, published alongside their source.",
      appTitle: "App",
      appBody:
        "The reference wallet and trading interface. A preview build — see the app's own releases for what has shipped.",
      viewReleases: "View releases",
      whitepaperTitle: "Whitepaper",
      whitepaperBody:
        "Per-chapter PDF renders are not published yet — read the whitepaper on the site, or download the full specifications from the specifications repository.",
      whitepaperCta: "Read the whitepaper",
    },
    documentation: {
      eyebrow: "documentação",
      title: "Documentação",
      intro:
        "A documentação para desenvolvedores fica em docs.openfiat.network. As próprias especificações são a referência autoritativa e são publicadas na íntegra aqui.",
    },
    foundation: {
      eyebrow: "governança",
      title: "Fundação",
      intro:
        "O whitepaper se refere tanto à AllenHark quanto a uma Fundação OpenFiat sem definir a relação entre elas. Esta página descreverá a estrutura de tutela assim que for resolvida.",
    },
    community: {
      eyebrow: "comunidade",
      title: "Comunidade",
      intro:
        "Áreas de contribuição citadas no Capítulo 25: desenvolvimento de software, documentação, pesquisa de segurança, relatórios de bugs, serviços de infraestrutura, material educativo, localização e ferramentas para desenvolvedores.",
    },
    blog: {
      eyebrow: "blog",
      title: "Blog",
      intro:
        "Atualizações do protocolo e notas de engenharia serão publicadas aqui.",
    },
    press: {
      eyebrow: "imprensa",
      title: "Imprensa",
      intro:
        "Ativos de marca e contatos de imprensa. Para qualquer coisa factual sobre o protocolo, o whitepaper e as especificações são a fonte.",
    },
    careers: {
      eyebrow: "carreiras",
      title: "Carreiras",
      intro: "As vagas abertas serão listadas aqui.",
    },
    status: {
      eyebrow: "status",
      title: "Status",
      intro:
        "Status ao vivo da devnet da OpenFiat, lido diretamente do RPC de um nó público. Apenas devnet — não há implantação na mainnet.",
      online: "Online",
      offline: "Offline",
      slotLabel: "Current slot",
      modeLabel: "Chain mode",
      ageLabel: "Block age",
      lastCheckedLabel: "Last checked",
      checkingLabel: "Checking…",
      lastKnownNote:
        "Showing the last known values; the node is not responding right now.",
      neverReachedNote: "This node has not responded yet.",
      rpcLabel: "RPC endpoint",
      autoRefreshNote: "Refreshes automatically every 15 seconds.",
    },
    contact: {
      eyebrow: "contato",
      title: "Contato",
      intro:
        "Para perguntas sobre o protocolo, abra uma discussão no repositório de especificações para que a resposta seja pública e pesquisável.",
    },
    privacy: {
      eyebrow: "legal",
      title: "Política de Privacidade",
      intro:
        "Esta página precisa de revisão jurídica antes do lançamento e não é final.",
    },
    terms: {
      eyebrow: "legal",
      title: "Termos de Uso",
      intro:
        "Esta página precisa de revisão jurídica antes do lançamento e não é final.",
    },
  },

  tokenomics: {
    supplyLabel: "Fornecimento máximo",
    supplyPending: "Definido na gênese",
    allocationAria: "Alocação de OPEN",
    provisional:
      "As porcentagens de alocação são provisórias e serão finalizadas no Documento de Tokenomics do OPEN.",
    proceedsTitle: "O que a pré-venda financia",
  },

  common: {
    readWhitepaper: "Leia o whitepaper",
    notFoundTitle: "Página não encontrada",
    notFoundBody:
      "Essa página não existe. Pode ter sido movida, ou o link pode estar errado.",
    goHome: "Ir para a página inicial",
    errorTitle: "Algo deu errado",
    errorBody:
      "Esta página falhou ao renderizar. Recarregar pode resolver; se não resolver, o problema é do nosso lado.",
    tryAgain: "Tentar novamente",
  },
};
