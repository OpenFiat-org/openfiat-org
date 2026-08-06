import type { ContentDictionary } from "./en-content";

/**
 * Portuguese (Brazil) long-form content — a complete translation, typed as
 * ContentDictionary so a missing key fails the build. Specification ids
 * (OFS-####), code identifiers (getChainStatus, --public-rpc-url,
 * openfiat-node, RocksDB, libp2p, execute_dispute_outcome…), repository names,
 * the glossary acronyms and proper nouns are preserved verbatim.
 */
export const ptBRContent: ContentDictionary = {
  home: {
    rails: [
      "Transferência bancária",
      "Dinheiro móvel",
      "ACH",
      "SEPA",
      "Faster Payments",
      "PIX",
      "Depósito em dinheiro",
      "Redes regionais de pagamento instantâneo",
    ],
  },

  trust: {
    flow: [
      {
        title: "Você escolhe uma oferta",
        body: "As ofertas mostram a taxa, os métodos de pagamento aceitos, os limites e como o outro lado se saiu em negociações passadas. Nada é assumido ainda.",
      },
      {
        title: "A cripto dele vai para a custódia",
        body: "Antes de qualquer dinheiro se mover, as stablecoins do vendedor são bloqueadas em uma custódia on-chain. O vendedor não pode retomá-las e o comprador não pode pegá-las cedo. Este é o passo que torna o resto seguro.",
      },
      {
        title: "Você paga do jeito que normalmente paga",
        body: "Transferência bancária, dinheiro móvel, uma rede de pagamento instantâneo ou dinheiro. O pagamento acontece nos seus trilhos de sempre, não em uma blockchain, e você o marca como enviado quando estiver feito.",
      },
      {
        title: "A custódia é liberada",
        body: "O vendedor confirma que o dinheiro chegou e a custódia é liberada automaticamente. Se ele não confirmar, ou algo estiver errado, qualquer um dos lados pode abrir uma disputa.",
      },
    ],

    pillars: [
      {
        title: "A custódia vem primeiro",
        body: "Os fundos são bloqueados antes de o fiat se mover, toda vez. Um comprador nunca envia dinheiro esperando que o outro lado honre, e um vendedor nunca libera moedas esperando que o pagamento apareça.",
      },
      {
        title: "A reputação é conquistada, não comprada",
        body: "Cada negociação concluída, cada disputa e cada tempo de resposta faz parte de um registro público ligado a uma carteira. Ninguém pode comprar uma boa reputação, nem deixar uma ruim para trás abrindo uma conta nova.",
      },
      {
        title: "Sua identidade continua sendo sua",
        body: "Não há KYC. Em vez de perguntar quem você é, o protocolo permite que você prove o que controla — um e-mail, um telefone, uma conta de Telegram — e nunca estabelece sua nacionalidade ou situação legal.",
      },
      {
        title:
          "Carteiras sabidamente ruins são sinalizadas, e algumas bloqueadas",
        body: "Provedores independentes publicam informações de risco assinadas sobre carteiras ligadas a fraude ou sanções. A maior parte é consultiva — seu app pode avisar, pedir confirmação ou ignorá-la. Acima disso fica uma lista de banimento mantida pela governança, e uma carteira nela não pode depositar em nenhum cofre em lugar algum do protocolo. Os provedores publicam as provas; só um voto de governança adiciona ou remove uma entrada, e ambos os sentidos são registrados on-chain. Isto ainda não foi construído.",
      },
    ],

    dispute: [
      {
        title: "Qualquer um dos lados abre um caso",
        body: "Levantar uma disputa não custa nada ao comprador. O depósito de arbitragem é aportado pelo comerciante a partir de seu cofre de liquidez, seja qual for o lado que abriu o caso, e ele o perde apenas se o resultado for contra ele. Ambos os lados enviam provas: recibos, confirmações de pagamento, a conversa da negociação. O depósito é especificado e ainda não cobrado.",
      },
      {
        title: "Os árbitros fazem stake para pegar o caso",
        body: "Árbitros qualificados escolhem casos em vez de serem designados, e devem comprometer o próprio OPEN antes de terem permissão para ver as provas. Como as provas ficam ocultas até se comprometerem, não há nada para subornar de antemão.",
      },
      {
        title: "Eles votam sem se ver",
        body: "Cada árbitro publica primeiro um compromisso selado e revela sua decisão depois, então ninguém pode seguir a multidão. O número de árbitros em um caso não é publicado, o que impede adivinhar quanto está em jogo.",
      },
      {
        title: "A custódia liquida o resultado",
        body: "A decisão é executada on-chain. O design paga os árbitros da maioria e retira parte do stake dos que ficam fora dela, com penalidades deliberadamente moderadas — o objetivo é dissuadir a negligência e o conluio, não punir a discordância honesta. Nem a recompensa nem a penalidade estão implementadas ainda, então hoje um voto não ganha nada e votar contra o consenso não custa nada.",
      },
    ],
  },

  protocol: {
    solanaBlurb:
      "Programas on-chain auditados guardam os ativos. A custódia não depende de o OpenFiat estar online, alcançável ou mesmo ainda mantido.",
    solanaItems: [
      "Custódia de ativos",
      "Execução da custódia",
      "Staking",
      "Tesouraria",
      "Execução da governança",
    ],
    openfiatBlurb:
      "Uma rede aberta entre pares carrega o mercado. Qualquer um pode executar uma peça dela, e nenhum operador individual pode derrubá-la.",
    openfiatItems: [
      "Descoberta de anúncios",
      "Coordenação de negociações",
      "Reputação",
      "Mensagens criptografadas",
      "Descoberta de serviços",
      "Notificações",
      "Recuperação de sessão",
    ],
    principles: [
      {
        title: "Verifique o controle, não a identidade",
        body: "Em vez de determinar quem alguém é, o OpenFiat verifica o que ela controla. Não estabelece nacionalidade, cidadania ou situação legal, e não exige KYC.",
      },
      {
        title: "Protocolo, não plataforma",
        body: "Nenhuma empresa é dona do e-mail. Milhares de provedores independentes implementam um padrão comum. O OpenFiat é construído da mesma forma.",
      },
      {
        title: "A reputação é conquistada",
        body: "Um usuário recém-verificado tem menos histórico observável que um comerciante anônimo que concluiu milhares de negociações ao longo de anos.",
      },
      {
        title: "Descentralize só o que se beneficia disso",
        body: "A custódia se beneficia da execução on-chain. As listagens de anúncios não. O teste é se descentralizar melhora a segurança, a resiliência, a transparência ou a propriedade.",
      },
      {
        title: "Não é mais uma blockchain",
        body: "O OpenFiat não introduz nenhum algoritmo de consenso concorrente. Em vez de substituir as cadeias existentes, ele as estende.",
      },
      {
        title: "Projetado para sobreviver aos seus criadores",
        body: "A AllenHark lidera o desenvolvimento inicial e é projetada para se tornar desnecessária. Nenhum participante individual deveria ser indispensável.",
      },
    ],
  },

  actorGroups: {
    participants: {
      title: "Qualquer um pode ser estes",
      blurb: "Negociar não precisa de registro nem de stake. Anunciar precisa.",
    },
    providers: {
      title: "Papéis de infraestrutura e serviço",
      blurb: "Opere parte da rede e ganhe com a receita do protocolo.",
    },
    builders: {
      title: "Construindo sobre o protocolo",
      blurb: "Um protocolo, muitas implementações.",
    },
  },

  actors: {
    buyers: {
      name: "Compradores e vendedores",
      definition:
        "Um comprador é qualquer participante que aceita um anúncio existente.",
      summary: "Compre e venda stablecoins por moeda local.",
      responsibilities: [
        "Navegar pelos anúncios e filtrar por país, moeda, método de pagamento e valor",
        "Reservar uma negociação, o que move stablecoins para a custódia antes de qualquer fiat ser enviado",
        "Enviar ou receber o pagamento fiat pelo trilho combinado",
        "Marcar o pagamento como enviado, e confirmar o recebimento como contraparte",
        "Abrir uma disputa com provas se algo der errado",
      ],
      stake:
        "Nenhum. Os compradores não publicam anúncios, não fazem stake de nada e não pagam nada para levantar uma disputa — o depósito de arbitragem é aportado pelo comerciante, independentemente de quem abre o caso. O único custo de um comprador é a taxa de liquidação, e só em uma negociação que se conclui.",
      earns:
        "Nada diretamente. O benefício é a concorrência entre comerciantes e não depender de um único operador continuar online.",
      requirements: [
        "Uma carteira de autocustódia",
        "Sem KYC e sem verificação de identidade centralizada",
        "Opcionalmente, declarações de identidade voluntárias provando o controle de um e-mail, Telegram ou outro canal",
      ],
    },
    merchants: {
      name: "Comerciantes",
      definition:
        "Comerciantes são participantes que fornecem liquidez ao mercado continuamente.",
      summary: "Forneça liquidez e publique anúncios.",
      responsibilities: [
        "Publicar anúncios assinados digitalmente para comprar ou vender stablecoins por fiat local",
        "Escolher preço fixo ou preço flutuante contra uma taxa de referência de oráculo",
        "Suportar um ou mais países e métodos de pagamento",
        "Gerenciar a disponibilidade entre os estados online, offline e férias",
        "Verificar que o pagamento fiat chegou, então liberar a custódia",
        "Renovar os anúncios antes de expirarem",
      ],
      stake:
        "O registro de comerciante exige fazer stake de OPEN. Desencoraja spam, fornece responsabilização econômica e define a capacidade inicial de anúncios do comerciante. É importante que o stake do comerciante não dá lastro a negociações individuais — a liquidação é protegida pelo cofre de custódia. Fazer stake também não concede reputação, que deve ser conquistada com negociações concluídas.",
      earns:
        "O spread sobre o próprio preço. Os comerciantes pagam taxas do protocolo em vez de recebê-las: um anúncio carrega uma taxa de listagem em OPEN, e o depósito de arbitragem em uma negociação disputada vem do cofre do comerciante. Nenhum é cobrado ainda — ambos são especificados e nenhuma instrução os lê, então anunciar hoje não custa nada.",
      requirements: [
        "Registrar um perfil de comerciante antes de anunciar",
        "Fazer stake de OPEN; a capacidade escala com o stake, a reputação, a idade da conta, o histórico de negociações e a taxa de disputas",
        "Declarar os países e métodos de pagamento suportados",
      ],
    },
    "node-operators": {
      name: "Operadores de nós",
      definition:
        "Os operadores de nós são a espinha dorsal da rede OpenFiat. Os validadores da Solana protegem a blockchain e executam os programas do OpenFiat; os operadores de nós mantêm o mercado descentralizado que existe acima dela.",
      summary: "Execute a camada do mercado entre pares.",
      responsibilities: [
        "Manter conexões entre pares e participar da propagação por gossip",
        "Sincronizar o estado do mercado e hospedar os índices de anúncios",
        "Distribuir os vetores de reputação e risco",
        "Transmitir os eventos do ciclo de vida das negociações",
        "Manter o diretório de provedores e publicar a saúde do nó",
        "Servir os aplicativos cliente",
      ],
      stake:
        "Exigido para ser um participante ativo. Mas o stake sozinho não determina a reputação — um operador com desempenho ruim não pode compensar fazendo mais stake. A prioridade efetiva combina reputação, stake e o desempenho de rede medido, e os nós com stake são elegíveis para as recompensas do protocolo.",
      earns:
        "A compensação vem da receita do protocolo em vez da inflação do token, ponderada por stake, conectividade e disponibilidade — um nó que faz ponte para a Solana ganha mais que um que só propaga por gossip. A fórmula está publicada na OFS-4100 §9.2. Nada a paga ainda: o cálculo existe, mas nada envia o resultado e o cofre de recompensas está vazio.",
      requirements: [
        "Hardware de servidor comum — 4 núcleos, 16 GB de RAM e 250 GB NVMe no mínimo",
        "Uma conexão estável e uma identidade de nó gerada",
        "Sem aprovação de ninguém: qualquer participante que atenda aos requisitos do protocolo pode executar um nó",
      ],
    },
    arbitrators: {
      name: "Árbitros",
      definition:
        "O OpenFiat distribui a resolução de disputas entre árbitros independentes economicamente incentivados a chegar a decisões honestas.",
      summary: "Resolva disputas sob responsabilização econômica.",
      responsibilities: [
        "Descobrir os casos publicados e ingressar voluntariamente, em vez de serem designados",
        "Comprometer stake específico do caso para obter acesso às provas",
        "Revisar recibos, confirmações de pagamento e a comunicação da negociação",
        "Votar usando um esquema de comprometer-e-revelar, então revelar antes do prazo",
      ],
      stake:
        "Por caso. Um árbitro compromete stake adicional para cada caso em que ingressa, e esse caso fica economicamente protegido até a resolução. Árbitros cujo voto revelado ficar fora do consenso final podem perder parte desse stake. As penalidades são intencionalmente moderadas: o objetivo é desencorajar a negligência e o conluio, não punir a discordância de boa-fé.",
      earns:
        "O design financia as recompensas a partir do pool de arbitragem, divididas entre os árbitros cujo voto revelado correspondeu ao resultado, pro-rata por peso revelado. Nada disso está implementado — um árbitro não ganha nada hoje, e não há campo on-chain para guardar um pagamento.",
      requirements: [
        "Um stake mínimo de OPEN e uma reputação mínima de árbitro",
        "Idade suficiente no protocolo e sem penalidades de arbitragem ativas",
        "Compatibilidade atual com o protocolo",
      ],
    },
    "notification-gateways": {
      name: "Gateways de notificação",
      definition:
        "Um Gateway de Notificação é qualquer serviço que implementa a Especificação de Gateway de Notificação do OpenFiat.",
      summary: "Entregue notificações opcionais em nome dos usuários.",
      responsibilities: [
        "Aceitar eventos de notificação do protocolo e entregá-los por qualquer transporte",
        "Retornar recibos de entrega",
        "Verificar os pontos de contato do usuário por códigos de uso único ou desafios de bot",
        "Registrar os canais, regiões e preços suportados no registro de serviços",
      ],
      stake:
        "5.000 OPEN, exigidos pelo programa de staking quando você faz stake contra o papel de gateway de notificação. Compra responsabilização econômica e resistência a Sybil em vez de tratamento preferencial: nada roteia o tráfego de notificações por stake hoje, então atingir o mínimo torna um gateway elegível, não favorecido.",
      earns:
        "Nada ainda. O modelo pretendido é uma parcela de uma pequena taxa fixa em OPEN que um participante paga para habilitar notificações em uma negociação, com o restante dividido entre as alocações de tesouraria e ecossistema — mas nenhuma dessa taxa existe em lugar algum do protocolo hoje e nenhuma recompensa de gateway é paga. Trate como intenção de design, não como renda.",
      requirements: [
        "Implementar a especificação de notificações publicada",
        "Registrar os metadados do gateway: canais, versão do protocolo, preços, endpoints",
        "Aceitar que os gateways recebem apenas o mínimo de informação necessário para entregar — nunca saldos, provas de disputa ou estado de mercado não relacionado",
      ],
    },
    "oracle-providers": {
      name: "Provedores de oráculo",
      definition: "Qualquer um pode operar um Provedor de Oráculo.",
      summary: "Publique dados assinados de taxa de câmbio e regionais.",
      responsibilities: [
        "Publicar taxas de câmbio assinadas como USD/KES e USDC/USD",
        "Publicar metadados de stablecoins: casas decimais, emissor, redes suportadas, endereços de contrato",
        "Publicar dados de infraestrutura de pagamento: trilhos suportados, feriados bancários, interrupções",
        "Publicar metadados regionais: moedas suportadas, identificadores de país, informações de localidade",
      ],
      stake:
        "Exigido antes de publicar informações de preço. Provedores que publicam consistentemente dados incorretos ou indisponíveis podem perder a elegibilidade a recompensas e enfrentar penalidades definidas pela governança; má conduta de oráculo comprovada é uma causa declarada para slashing.",
      earns:
        "As leituras são gratuitas, e o provedor é pago pelo protocolo em vez disso — escalado por quantos pares de moedas ele de fato cobre e pelo tempo de atividade observado. A fórmula é proposta na OFS-4100 §9.6 e não é final, e nada a paga ainda.",
      requirements: [
        "Registrar-se pelo registro de serviços com os pares suportados e a frequência de atualização",
        "Assinar cada registro — atualizações de oráculo não assinadas devem ser rejeitadas",
        "Aceitar que os dados do oráculo nunca forçam um preço de negociação; são apenas uma referência",
      ],
    },
    "snapshot-providers": {
      name: "Provedores de snapshot",
      definition:
        "A hospedagem de snapshots é, ela própria, um serviço do protocolo. Qualquer participante qualificado pode se tornar um provedor de snapshots.",
      summary:
        "Publique snapshots do estado para que novos nós sincronizem rápido.",
      responsibilities: [
        "Gerar snapshots comprimidos sem interromper a operação do mercado",
        "Publicar hashes de integridade, uma raiz de estado e metadados assinados",
        "Manter a disponibilidade de download e alta largura de banda",
        "Reter múltiplos snapshots históricos",
      ],
      stake:
        "Exigido, como compromisso de infraestrutura. Publicar snapshots corrompidos está listado entre os comportamentos maliciosos sujeitos a slashing aprovado pela governança.",
      earns:
        "Nada. Os downloads são gratuitos e o papel não carrega compensação, por decisão — servir um snapshot é um custo marginal sobre uma infraestrutura que um operador de nó já executa e pela qual já é pago. Não há receita em um serviço de snapshot independente e nenhuma é planejada.",
      requirements: [
        "Anunciar a capacidade pelo registro de serviços",
        "Publicar os metadados completos do snapshot, incluindo a altura do snapshot e a raiz de estado",
        "Assinar cada snapshot; os clientes verificam a assinatura, a compatibilidade e a raiz de estado antes de importar",
      ],
    },
    "risk-intelligence-providers": {
      name: "Provedores de inteligência de risco",
      definition:
        "O único papel de provedor que exige aprovação da governança antes de operar.",
      summary: "Publique informações consultivas de risco de carteiras.",
      responsibilities: [
        "Publicar registros de risco assinados nomeando o endereço da carteira, a categoria, a severidade e a confiança",
        "Cobrir análise de blockchain, inteligência de fraude, sinais de conformidade ou relatos da comunidade",
        "Suportar consenso multiprovedor e tratamento de falsos positivos",
      ],
      stake:
        "Não especificado — este é o único papel de provedor que a tabela de staking do whitepaper omite, e nenhum requisito de stake aparece para ele em lugar algum. O que restringe o papel é a aprovação pela governança, não o stake: uma assinatura permanente sacada da tesouraria não tem um limite natural para o abuso como tem um oráculo inútil.",
      earns:
        "Uma assinatura fixa paga pela tesouraria — 1.000 USDC por mês por padrão, escalada pelo tempo de atividade observado, configurável pela governança e esperada para mudar à medida que a rede cresce. Nem o pagamento nem a barreira de aprovação abaixo estão construídos ainda.",
      requirements: [
        "Registrar-se pelo registro de serviços",
        "Aceitar que os registros são consultivos: os aplicativos podem rejeitar depósitos, avisar, exigir confirmação ou ignorar o aviso por completo",
      ],
    },
    "bootstrap-nodes": {
      name: "Nós de bootstrap",
      definition:
        "Os nós de bootstrap têm apenas uma responsabilidade: apresentar os nós recém-ingressados à rede existente. São diretórios, não coordenadores centralizados.",
      summary: "Apresente os nós novos à rede, e depois se afaste.",
      responsibilities: [
        "Responder a pedidos de primeiro contato com uma lista de pares",
        "Nada mais — não aprovam pares, não guardam estado exclusivo, não coordenam nem roteiam decisões do protocolo",
      ],
      stake: "Não especificado para este papel.",
      earns: "Não especificado para este papel.",
      requirements: [
        "Registrado como serviço de bootstrap no registro de serviços",
        "A governança pode aprovar nós de bootstrap adicionais operados pela comunidade ao longo do tempo",
        "Uma vez concluída a descoberta, os nós de bootstrap se tornam opcionais",
      ],
    },
    developers: {
      name: "Desenvolvedores",
      definition:
        "Qualquer um pode construir software compatível sem pedir permissão.",
      summary: "Construa clientes, nós, ferramentas e integrações.",
      responsibilities: [
        "Construir implementações independentes: nós embarcados, software de gateway, implementações de pesquisa, clientes personalizados",
        "Hospedar interfaces de usuário — web, mobile, portais corporativos, mercados regionais",
        "Enviar propostas de melhoria e revisar especificações",
        "Contribuir com código, documentação, pesquisa de segurança e localização",
      ],
      stake: "Nenhum. Os desenvolvedores não fazem stake de nada.",
      earns:
        "Subvenções de ecossistema da Tesouraria de Ecossistema, que financia subvenções, parcerias, educação, hackathons e incentivos a desenvolvedores.",
      requirements: [
        "Apenas conformidade com a especificação — o protocolo é independente de linguagem",
        "Um engenheiro deveria conseguir construir uma implementação totalmente compatível apenas a partir das especificações",
      ],
    },
  },

  repos: {
    "openfiat-specs":
      "As especificações canônicas do protocolo e o whitepaper. Tudo neste site é gerado a partir dele.",
    "openfiat-core":
      "O nó de referência, em Rust. Rede entre pares, gossip, estado do mercado, snapshots e as APIs do nó.",
    "openfiat-sdks":
      "SDKs oficiais para Rust, TypeScript e Python, além dos dados de referência compartilhados de que dependem.",
    "openfiat-app":
      "O aplicativo web padrão: negociação, visão de rede, staking, governança, disputas e histórico.",
    "openfiat-apps":
      "Aplicativos adicionais — painel do comerciante e explorador de rede.",
    "openfiat-devtools":
      "Redes de teste, vetores de conformidade do protocolo, benchmarks e fuzzing.",
    "openfiat-infra":
      "Imagens de contêiner, charts do Helm, módulos do Terraform e a pilha de monitoramento.",
    "openfiat-docs": "O site de documentação para desenvolvedores.",
    "openfiat-org": "Este site.",
    "awesome-openfiat":
      "Uma lista curada pela comunidade de projetos, ferramentas e recursos do OpenFiat.",
  },

  runNode: {
    minimumSpecs: [
      "4 núcleos de CPU",
      "16 GB de RAM",
      "SSD NVMe de 250 GB",
      "Conexão de banda larga estável",
    ],
    recommendedSpecs: [
      "8–16 núcleos de CPU",
      "32 GB de RAM ou mais",
      "SSD NVMe de 1 TB",
      "Rede de alta largura de banda e baixa latência",
      "Proteção de energia por no-break (UPS)",
      "Conectividade de internet redundante",
    ],
    internals:
      "O nó é um único binário Rust. libp2p (QUIC, Noise, Yamux) e RocksDB são compilados dentro — não há nada para instalar separadamente.",

    install: [
      {
        id: "source",
        title: "Compilar a partir do código-fonte — para produção, hoje",
        note: "Nenhuma versão foi marcada ainda, então esta é atualmente a única forma de obter o binário do nó. Precisa do toolchain do Rust e de um toolchain de C para o RocksDB. Compile, coloque em /usr/local/bin e execute sob systemd — esta é a implantação que esta página documenta, e a que se deve usar para um nó do qual outros dependem.",
      },
      {
        id: "binary",
        title: "Binário pré-compilado — assim que uma versão for marcada",
        note: "Empurrar uma tag v* executa o workflow de release, que compila o openfiat-node em runners nativos e publica arquivos linux-x86_64 e windows-x86_64 nos GitHub Releases. Nada foi marcado ainda, então essa página está vazia no momento. Note que são builds de release comuns, não estáticos nem assinados — verifique o que você baixa contra o workflow que o produziu.",
      },
      {
        id: "docker",
        title: "Docker — apenas para testes",
        note: "Use a imagem para experimentar um nó localmente ou para subir um cluster multinó descartável — não para executar um nó do qual a rede depende. Existe para testes locais reproduzíveis; a produção executa o binário sob systemd.",
      },
    ],

    ports: {
      p2pQuic:
        "Tráfego entre pares. O QUIC é o transporte principal, então esta porta UDP deve ser alcançável — a que as pessoas mais esquecem de abrir.",
      api: "JSON-RPC, WebSocket, REST, saúde e métricas — uma porta real serve tudo, não há porta separada por superfície.",
      metrics:
        "A mesma porta da API acima (GET /metrics). Restrinja com firewall para loopback/uma rede privada se você não quiser que seja pública.",
    },

    troubleshooting: {
      noPeers: {
        symptom: "Nenhum par se conecta",
        cause:
          "A UDP 4001 está bloqueada, ou o --entrypoint aponta para um endereço que os pares não conseguem realmente alcançar — deve ser um multiaddr/IP estático, não um nome de host (o bootstrap por DNS não resolve). Seu próprio nó registra os endereços em que é alcançável assim que está escutando.",
      },
      stuckSync: {
        symptom: "A sincronização nunca conclui",
        cause:
          "A importação do snapshot (OFS-1300) não terminou, ou nenhum par anunciou um snapshot recente o suficiente ainda — verifique getLatestSnapshot/getCheckpointHeight.",
      },
      highDisk: {
        symptom: "O uso de disco continua crescendo",
        cause: "O RocksDB não compactou.",
      },
      clockSkew: {
        symptom: "Assinaturas ou expirações rejeitadas",
        cause:
          "Desvio do relógio. Os registros carregam timestamps e expiração, então o relógio do host precisa estar correto.",
      },
    },

    walkthrough: [
      {
        id: "prepare",
        title: "Prepare a máquina",
        body: "Um servidor Debian ou Ubuntu atual, um firewall e um relógio preciso. O relógio importa mais do que parece: os registros carregam timestamps e horários de expiração, e um relógio desviado faz um nó rejeitar dados válidos.",
      },
      {
        id: "install",
        title: "Instale o nó",
        body: "Compile a partir do código-fonte e execute o resultado sob systemd — nenhuma versão foi marcada ainda, então essa é a única forma de obter um binário hoje, e o resto deste manual assume isso. Recorra ao Docker só ao testar localmente ou subir um cluster descartável.",
      },
      {
        id: "identity",
        title: "Gere a carteira do nó",
        body: 'Não há um formato de "identidade de nó" separado — a identidade de um nó é um wallet.json real da CLI da Solana, o mesmo arquivo que o solana-keygen produz. Sua seed é reutilizada tanto para a identidade de gossip/par do nó quanto para a chave de assinatura da Solana. Guarde o arquivo — se você o perder, o nó reingressa como um estranho e começa a construir reputação do zero.',
      },
      {
        id: "configure",
        title: "Defina o ambiente",
        body: "O openfiat-node não tem arquivo de configuração próprio — cada ajuste é uma variável de ambiente, lida uma vez na inicialização: onde os dados ficam, em qual endereço escutar, quais pares discar na partida e (opcionalmente) qual endpoint RPC da Solana usar. Os pares de bootstrap devem ser um multiaddr/IP estático, não um nome de host — o bootstrap por DNS não resolve.",
      },
      {
        id: "firewall",
        title: "Abra as portas certas",
        body: "Os pares alcançam o nó por UDP porque o QUIC é o transporte principal — essa é a porta que as pessoas mais esquecem. Uma porta TCP serve JSON-RPC, WebSocket, REST, saúde e métricas juntos; mantenha-a privada se você não quiser servir clientes publicamente.",
      },
      {
        id: "reachable",
        title: "Sirva a rede: torne seu nó alcançável",
        body: "Este é o passo que transforma um nó de algo que observa a rede em algo que a carrega. Coloque o nginx na frente e obtenha um certificado, então informe ao nó sua URL pública com --public-rpc-url e ele se anuncia para que carteiras, exploradores e o próprio app web do OpenFiat possam usá-lo. A ordem importa: nginx sobre HTTP simples primeiro, depois o certbot adiciona TLS — uma configuração que já nomeia um certificado não consegue iniciar, então o certbot falha antes de poder emitir aquele que teria resolvido. Um certificado não é enfeite opcional: uma página servida por HTTPS não consegue abrir uma conexão HTTP simples, então um nó sem um é invisível para todo navegador por mais saudável que esteja.",
      },
      {
        id: "service",
        title: "Execute-o como serviço",
        body: "Sob systemd o nó reinicia após uma queda ou reboot, e ganha um período de encerramento longo o suficiente para o banco de dados esvaziar de forma limpa em vez de ser morto no meio de uma escrita.",
      },
      {
        id: "sync",
        title: "Deixe-o alcançar",
        body: "Em vez de reproduzir todo o histórico, um nó novo pode descobrir e importar um snapshot anunciado por um par do estado atual do mercado (OFS-1300) — métodos JSON-RPC reais, não uma ferramenta separada: getLatestSnapshot, getCheckpointHeight. Assinatura, versão do protocolo e raiz de estado, todos têm de corresponder antes de se confiar.",
      },
      {
        id: "verify",
        title: "Verifique que está saudável",
        body: "GET /health confirma que o processo está no ar; getChainStatus por JSON-RPC diz se é GossipOnly ou RpcConnected, e seu blockhash atual se for o último.",
      },
      {
        id: "register",
        title: "Já faz parte da rede",
        body: 'Não há um passo de "anunciar" separado — assim que um nó tem pares de bootstrap, ele propaga por gossip e é propagado automaticamente; ninguém o aprova. Fazer stake, publicar metadados no registro de serviços, ingressar em disputas e emitir votos de governança são ações separadas, guiadas por carteira, que um cliente realiza contra o nó em execução — veja o guia de participação relevante para cada uma.',
      },
      {
        id: "monitor",
        title: "Vigie-o",
        body: "Os sinais que de fato predizem problema são os pares conectados, o modo da cadeia (GossipOnly vs RpcConnected) e a idade do blockhash. Alerte sobre esses e você saberá antes dos seus usuários.",
      },
      {
        id: "upgrade",
        title: "Mantenha-o atual",
        body: "Pare, troque o binário, inicie. Os nós atualizam um de cada vez, então a rede nunca precisa de uma parada coordenada, e os eventos de gossip perdidos são reproduzidos na inicialização.",
      },
      {
        id: "backup",
        title: "Faça backup do que não pode ser regenerado",
        body: "O estado do mercado sempre pode ser ressincronizado a partir de um snapshot. A carteira não pode ser regenerada. Os saldos e a custódia vivem na Solana, não no seu disco.",
      },
    ],

    monitoring: [
      {
        group: "Infraestrutura",
        items: ["CPU", "Memória", "Disco", "Throughput de rede"],
      },
      {
        group: "Protocolo (GET /metrics)",
        items: ["rpc_requests_total", "rpc_errors_total"],
      },
    ],
    monitoringNote:
      "Isso é tudo o que o nó exporta hoje — contagem de pares, modo da cadeia e progresso de sincronização ainda não são métricas do Prometheus, apenas valores que você pode consultar por JSON-RPC (getChainStatus, getLatestSnapshot, getCheckpointHeight).",

    apis: [
      {
        group: "Mercado",
        items: [
          "Buscar anúncios",
          "Criar anúncios",
          "Atualizar anúncios",
          "Remover anúncios",
        ],
      },
      {
        group: "Negociação",
        items: [
          "Reservar anúncios",
          "Sincronizar sessões de negociação",
          "Enviar confirmações de pagamento",
        ],
      },
      {
        group: "Infraestrutura",
        items: [
          "Descoberta de pares",
          "Descoberta de gateways",
          "Informações de snapshot",
          "Inteligência de risco",
        ],
      },
      {
        group: "Governança",
        items: [
          "Descoberta de propostas",
          "Envio de votos",
          "Informações de tesouraria",
        ],
      },
    ],

    interfaces: [
      "Interface web oficial",
      "Interfaces da comunidade",
      "Interfaces de comerciante",
      "Mercados regionais",
      "Portais corporativos",
    ],
  },

  becomeArbitrator: {
    requirements: [
      "Uma carteira Solana com pelo menos 10.000 OPEN — o min_stake_arbitrator da configuração de staking implantada, que a governança pode mudar — faça bond dela pela página Stake do openfiat-app, ou pelas instruções abaixo se você estiver construindo seu próprio cliente",
      "Uma carteira que consiga assinar mensagens, o que toda carteira Solana relevante faz — a página Arbitrate do openfiat-app roda o caso inteiro no navegador, e os SDKs estão aí se você preferir programar",
      "Acesso de rede ao endpoint JSON-RPC de pelo menos um nó OpenFiat, o seu ou um público",
    ],

    walkthrough: [
      {
        id: "bond",
        title: "Faça bond de OPEN para desbloquear o pool de arbitragem",
        body: "Os árbitros precisam fazer stake antes de poderem ver as provas de um único caso — é o que torna subornar um deles inútil (você não sabe qual caso mirar) e dá à rede algo para dar slash se você votar contra o consenso revelado. A configuração de devnet implantada define o mínimo de árbitro em 10.000 OPEN, dez vezes os 1.000 que todo outro papel aporta.",
      },
      {
        id: "discover",
        title: "Encontre um caso aberto",
        body: "Os árbitros escolhem quais disputas trabalhar — ninguém lhe designa uma. Consulte qualquer nó por casos que ainda não atingiram a contagem exigida de árbitros.",
      },
      {
        id: "join",
        title: "Ingresse antes de poder ver as provas",
        body: "Ingressar é o que desbloqueia um caso para você: os próprios envios do comprador e do vendedor, as confirmações de pagamento e o log de mensagens da negociação deles. Uma vez que um caso tem seu complemento completo de árbitros, ele trava e a fase de compromisso começa.",
      },
      {
        id: "commit",
        title: "Comprometa seu voto — duas vezes",
        body: "Dois votos de comprometer-revelar rodam lado a lado: um off-chain que registra na própria trilha de auditoria e reputação do caso, e um on-chain contra a conta DisputeCase do openfiat-escrow que de fato decide o resultado ponderado por stake. Use a mesma decisão e o mesmo salt para ambos — mas o enum próprio de cada lado, não o mesmo número: Invalid off-chain é 2, InvalidDispute on-chain é 3, porque MutualSettlement fica em 2 on-chain. Faça o hash do byte errado e você se compromete a algo que nunca poderá revelar, que é exatamente o que faz um árbitro levar slash.",
      },
      {
        id: "reveal",
        title: "Revele assim que a janela abrir",
        body: "Revele seu resultado e salt em ambos os lugares assim que a janela de compromisso fechar. On-chain, é também aqui que seu voto ganha seu peso real: a instrução de reveal lê sua conta de stake do papel Arbitrator diretamente, então uma carteira sem stake de árbitro simplesmente não consegue fornecer um válido.",
      },
      {
        id: "resolve",
        title: "O resultado se executa sozinho",
        body: "Uma vez que todo árbitro revelou, ou a janela de reveal fecha, qualquer um — você, o comprador, o vendedor ou um bot não relacionado — pode chamar execute_dispute_outcome. Ele só conta os votos já registrados on-chain. O design então paga à maioria uma parcela das taxas do caso e retira parte do stake de quem revelou contra ela — mas nem a recompensa nem a penalidade estão implementadas, então hoje a contagem move os fundos dos traders e nada mais.",
      },
    ],
  },

  sale: {
    allocationLabels: {
      presale: "Pré-venda comunitária",
      allenhark: "Tesouraria da AllenHark",
      ecosystem: "Tesouraria de ecossistema",
      infrastructure: "Bootstrap de infraestrutura",
      incentives: "Incentivos da comunidade",
      liquidity: "Programas de liquidez",
      reserve: "Reserva estratégica",
    },
    allocationVesting: {
      presale: "Sem lockup — desbloqueado no claim",
      allenhark: "Cliff de 12 meses, depois 36 meses linear",
      ecosystem: "Cliff de 12 meses, depois 36 meses linear",
      infrastructure:
        "Emitido pelas regras de recompensa de nós, não uma liberação linear",
      incentives: "Emitido à medida que os incentivos são ganhos",
      liquidity: "Cliff de 3 meses, depois 24 meses linear",
      reserve: "Cliff de 12 meses, depois 48 meses linear",
    },
    useOfFunds: [
      "Engenharia do protocolo central",
      "Auditorias de segurança independentes",
      "Implantação de infraestrutura",
      "Documentação",
      "Crescimento da comunidade",
      "Ferramentas para desenvolvedores",
      "Educação e marketing",
      "Despesas legais e operacionais de lançamento",
    ],
    vesting: [
      "Fundadores",
      "Membros da equipe",
      "Consultores",
      "Parceiros estratégicos",
      "Certas alocações de pré-venda, quando aplicável",
    ],
    protections: [
      "Alocações documentadas publicamente",
      "Cronogramas de vesting transparentes",
      "Carteiras de tesouraria publicamente conhecidas",
      "Cronogramas de liberação previsíveis",
      "A governança não pode emitir novo fornecimento em segredo",
    ],
  },

  glossary: [
    {
      term: "OPEN",
      expansion: null,
      definition:
        "O token de utilidade e governança do protocolo. Não é o ativo negociado — as liquidações usam stablecoins como USDC. OPEN é feito stake como responsabilização econômica e carrega direitos de governança. Emitido uma vez na gênese com um fornecimento máximo fixo.",
      specs: [],
    },
    {
      term: "OFS",
      expansion: "OpenFiat Protocol Suite",
      definition:
        "A série de especificações numeradas. O número codifica a camada: 1000 rede, 2000 mercado, 3000 reputação, 4000 governança, 5000 identidade, 6000 notificações, 7000 oráculo e risco.",
      specs: ["OFS-0000"],
    },
    {
      term: "OFNP",
      expansion: "OpenFiat Network Protocol",
      definition:
        "A camada de transporte entre pares que todo nó compatível implementa, construída sobre libp2p com QUIC, Noise e Yamux.",
      specs: ["OFS-1000"],
    },
    {
      term: "OFTP",
      expansion: "OpenFiat Trade Protocol",
      definition:
        "O ciclo de vida da negociação: reserva, financiamento da custódia, pagamento fiat, confirmação, liquidação. Uma negociação nunca pode pular um estado obrigatório.",
      specs: ["OFS-2000"],
    },
    {
      term: "OFIP",
      expansion: "OpenFiat Improvement Proposal",
      definition:
        "O veículo de governança para mudar o protocolo — o equivalente a um RFC ou EIP.",
      specs: ["OFS-4000"],
    },
    {
      term: "SWQoS",
      expansion: "Stake-Weighted Quality of Service",
      definition:
        "Como os nós são priorizados. A prioridade efetiva combina reputação, stake e o desempenho de rede medido; fazer mais stake não pode compensar um desempenho ruim.",
      specs: ["OFS-1600"],
    },
    {
      term: "Anúncio",
      expansion: null,
      definition:
        "Uma declaração assinada publicamente expressando a disposição de um comerciante para negociar, com ativo, direção, moeda, limites, modelo de precificação e métodos de pagamento.",
      specs: ["OFS-2100"],
    },
    {
      term: "Reserva",
      expansion: null,
      definition:
        "O passo que reivindica uma porção de um anúncio para um comprador específico, antes de a custódia ser financiada.",
      specs: ["OFS-2200"],
    },
    {
      term: "Custódia",
      expansion: null,
      definition:
        "Guarda on-chain das stablecoins durante a negociação. As stablecoins entram na custódia antes de o pagamento fiat começar, então um comprador nunca envia fiat sem fundos já protegidos.",
      specs: ["OFS-2300"],
    },
    {
      term: "Cofre de liquidez",
      expansion: null,
      definition:
        "A arquitetura on-chain que guarda os fundos das negociações. A liquidação da negociação é protegida aqui em vez de pelo stake do comerciante.",
      specs: [],
    },
    {
      term: "Gossip",
      expansion: null,
      definition:
        "Como os eventos que mudam o estado propagam pela rede, para que nenhum nó dependa de um feed central.",
      specs: ["OFS-1200"],
    },
    {
      term: "Snapshot",
      expansion: null,
      definition:
        "Uma cópia assinada e comprimida do estado do mercado com uma raiz de estado, deixando um nó novo sincronizar rápido em vez de reproduzir todo o histórico.",
      specs: ["OFS-1300"],
    },
    {
      term: "Nó de bootstrap",
      expansion: null,
      definition:
        "Um diretório que apresenta um nó recém-iniciado aos pares, e depois se torna opcional. Não aprova nada e não coordena nada.",
      specs: ["OFS-1100"],
    },
    {
      term: "Registro de serviços",
      expansion: null,
      definition:
        "O diretório onde os provedores publicam o que oferecem e onde. É um diretório, não um mercado: não faz recomendações, e os clientes escolhem por si.",
      specs: ["OFS-1500"],
    },
    {
      term: "Declaração de identidade",
      expansion: null,
      definition:
        "Uma prova voluntária e assinada de que uma carteira controla um canal de comunicação como um e-mail ou conta de Telegram. Estabelece controle, nunca identidade legal, nacionalidade ou situação regulatória.",
      specs: ["OFS-5000"],
    },
    {
      term: "Comprometer-revelar",
      expansion: null,
      definition:
        "O voto de árbitro em duas fases: publicar um compromisso primeiro, revelar o voto e o segredo depois, para que nenhum árbitro possa ver os votos dos outros antes de emitir o seu.",
      specs: ["OFS-2400"],
    },
    {
      term: "Slashing",
      expansion: null,
      definition:
        "Perda de parte de um stake por violações do protocolo. As regras são determinísticas e documentadas publicamente; interrupções comuns afetam a reputação e a elegibilidade a recompensas em vez de disparar slashing.",
      specs: [],
    },
    {
      term: "Descentralização progressiva",
      expansion: null,
      definition:
        "O compromisso mais repetido do whitepaper: a AllenHark lidera o desenvolvimento inicial, e a responsabilidade pela infraestrutura e governança é projetada para se transferir à comunidade.",
      specs: [],
    },
    {
      term: "AllenHark",
      expansion: null,
      definition:
        "A empresa que lidera o desenvolvimento inicial. Opera a infraestrutura de bootstrap durante o lançamento e compete com todo outro provedor sob regras de protocolo idênticas. É projetada para se tornar desnecessária.",
      specs: [],
    },
  ],
};
