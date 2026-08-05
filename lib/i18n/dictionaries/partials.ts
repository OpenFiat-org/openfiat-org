import type { DeepPartial } from "../deep-merge";
import type { Dictionary } from "./en";

/**
 * Partial UI translations for the non-English, non-Chinese locales.
 *
 * Each is a DeepPartial<Dictionary>: only the keys translated so far, with
 * everything else falling back to English via `mergeDictionary`. The core
 * languages carry the visible chrome (meta, nav, footer columns and blurb);
 * the rest are empty and render fully in English until filled in. This is the
 * same phased approach the app and docs take, made possible here by the new
 * per-key fallback — before it, a locale needed all ~1,600 keys or nothing.
 */
export const UI_PARTIALS: Record<string, DeepPartial<Dictionary>> = {
  es: {
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
    },
  },
  hi: {
    meta: {
      tagline: "विकेंद्रीकृत पीयर-टू-पीयर फ़िएट विनिमय",
      description:
        "OpenFiat एक खुला प्रोटोकॉल है जो बिना किसी केंद्रीकृत एक्सचेंज संचालक के, स्थिर मुद्राओं को स्थानीय फ़िएट मुद्रा से व्यक्ति-से-व्यक्ति बदलने के लिए है। निपटान Solana पर; समन्वय एक खुले नेटवर्क पर।",
    },
    nav: {
      howItWorks: "यह कैसे काम करता है",
      trust: "विश्वास और सुरक्षा",
      whitepaper: "श्वेतपत्र",
      specs: "विनिर्देश",
      actors: "भाग लें",
      guides: "मार्गदर्शिकाएँ",
      fees: "शुल्क",
      sale: "टोकन बिक्री",
      runNode: "नोड चलाएँ",
      launchApp: "ऐप खोलें",
      preview: "पूर्वावलोकन",
      openMenu: "मेन्यू खोलें",
      closeMenu: "मेन्यू बंद करें",
      primaryLabel: "प्राथमिक",
      skipToContent: "सामग्री पर जाएँ",
      language: "भाषा",
    },
    footer: {
      blurb:
        "स्थिर मुद्राओं और स्थानीय फ़िएट मुद्रा को व्यक्ति-से-व्यक्ति बदलने के लिए एक खुला प्रोटोकॉल। निपटान Solana पर, समन्वय एक खुले नेटवर्क पर।",
      columns: {
        protocol: "प्रोटोकॉल",
        participate: "भाग लें",
        network: "नेटवर्क",
        project: "परियोजना",
        community: "समुदाय",
      },
    },
  },
  "pt-BR": {
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
    },
  },
  bn: {},
  ru: {
    meta: {
      tagline: "Децентрализованный одноранговый обмен фиата",
      description:
        "OpenFiat — открытый протокол для обмена стейблкоинов на местную фиатную валюту напрямую между людьми, без централизованного оператора биржи. Расчёты в Solana; координация в открытой сети.",
    },
    nav: {
      howItWorks: "Как это работает",
      trust: "Доверие и безопасность",
      whitepaper: "Технический документ",
      specs: "Спецификации",
      actors: "Участвовать",
      guides: "Руководства",
      fees: "Комиссии",
      sale: "Продажа токенов",
      runNode: "Запустить узел",
      launchApp: "Открыть приложение",
      preview: "Предпросмотр",
      openMenu: "Открыть меню",
      closeMenu: "Закрыть меню",
      primaryLabel: "Основное",
      skipToContent: "Перейти к содержимому",
      language: "Язык",
    },
    footer: {
      blurb:
        "Открытый протокол для обмена стейблкоинов и местной фиатной валюты напрямую между людьми. Расчёты в Solana, координация в открытой сети.",
      columns: {
        protocol: "Протокол",
        participate: "Участвовать",
        network: "Сеть",
        project: "Проект",
        community: "Сообщество",
      },
    },
  },
  ja: {
    meta: {
      tagline: "分散型ピアツーピア法定通貨交換",
      description:
        "OpenFiatは、中央集権的な取引所運営者なしに、ステーブルコインと現地の法定通貨を個人間で交換するためのオープンプロトコルです。決済はSolana、調整はオープンネットワークで行われます。",
    },
    nav: {
      howItWorks: "仕組み",
      trust: "信頼と安全",
      whitepaper: "ホワイトペーパー",
      specs: "仕様",
      actors: "参加",
      guides: "ガイド",
      fees: "手数料",
      sale: "トークンセール",
      runNode: "ノードを実行",
      launchApp: "アプリを開く",
      preview: "プレビュー",
      openMenu: "メニューを開く",
      closeMenu: "メニューを閉じる",
      primaryLabel: "メイン",
      skipToContent: "コンテンツへスキップ",
      language: "言語",
    },
    footer: {
      blurb:
        "ステーブルコインと現地の法定通貨を個人間で交換するためのオープンプロトコル。決済はSolana、調整はオープンネットワークで。",
      columns: {
        protocol: "プロトコル",
        participate: "参加",
        network: "ネットワーク",
        project: "プロジェクト",
        community: "コミュニティ",
      },
    },
  },
  vi: {},
  tr: {
    meta: {
      tagline: "Merkeziyetsiz eşler arası fiat takası",
      description:
        "OpenFiat, stablecoin'leri yerel itibari paraya eşler arasında, merkezi bir borsa operatörü olmadan takas etmek için açık bir protokoldür. Mutabakat Solana'da; koordinasyon açık bir ağda.",
    },
    nav: {
      howItWorks: "Nasıl çalışır",
      trust: "Güven ve güvenlik",
      whitepaper: "Teknik doküman",
      specs: "Spesifikasyonlar",
      actors: "Katıl",
      guides: "Kılavuzlar",
      fees: "Ücretler",
      sale: "Token satışı",
      runNode: "Düğüm çalıştır",
      launchApp: "Uygulamayı aç",
      preview: "Önizleme",
      openMenu: "Menüyü aç",
      closeMenu: "Menüyü kapat",
      primaryLabel: "Birincil",
      skipToContent: "İçeriğe geç",
      language: "Dil",
    },
    footer: {
      blurb:
        "Stablecoin'leri ve yerel itibari parayı eşler arasında takas etmek için açık bir protokol. Mutabakat Solana'da, koordinasyon açık bir ağda.",
      columns: {
        protocol: "Protokol",
        participate: "Katıl",
        network: "Ağ",
        project: "Proje",
        community: "Topluluk",
      },
    },
  },
  mr: {},
  te: {},
  ko: {},
  fr: {
    meta: {
      tagline: "Échange de fiat pair-à-pair, décentralisé",
      description:
        "OpenFiat est un protocole ouvert pour échanger des stablecoins contre de la monnaie fiat locale, de pair à pair, sans opérateur d'échange centralisé. Règlement sur Solana ; coordination sur un réseau ouvert.",
    },
    nav: {
      howItWorks: "Comment ça marche",
      trust: "Confiance et sécurité",
      whitepaper: "Livre blanc",
      specs: "Spécifications",
      actors: "Participer",
      guides: "Guides",
      fees: "Frais",
      sale: "Vente de jetons",
      runNode: "Exécuter un nœud",
      launchApp: "Ouvrir l'app",
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
    },
  },
  ta: {},
  de: {
    meta: {
      tagline: "Dezentraler Peer-to-Peer-Fiat-Austausch",
      description:
        "OpenFiat ist ein offenes Protokoll für den Tausch von Stablecoins gegen lokales Fiatgeld, von Person zu Person, ohne zentralen Börsenbetreiber. Abwicklung auf Solana; Koordination über ein offenes Netzwerk.",
    },
    nav: {
      howItWorks: "Funktionsweise",
      trust: "Vertrauen & Sicherheit",
      whitepaper: "Whitepaper",
      specs: "Spezifikationen",
      actors: "Teilnehmen",
      guides: "Leitfäden",
      fees: "Gebühren",
      sale: "Token-Verkauf",
      runNode: "Knoten betreiben",
      launchApp: "App öffnen",
      preview: "Vorschau",
      openMenu: "Menü öffnen",
      closeMenu: "Menü schließen",
      primaryLabel: "Primär",
      skipToContent: "Zum Inhalt springen",
      language: "Sprache",
    },
    footer: {
      blurb:
        "Ein offenes Protokoll für den Tausch von Stablecoins und lokalem Fiatgeld, von Person zu Person. Abwicklung auf Solana, Koordination über ein offenes Netzwerk.",
      columns: {
        protocol: "Protokoll",
        participate: "Teilnehmen",
        network: "Netzwerk",
        project: "Projekt",
        community: "Community",
      },
    },
  },
  it: {},
  gu: {},
  pa: {},
  th: {},
  id: {
    meta: {
      tagline: "Pertukaran fiat peer-to-peer yang terdesentralisasi",
      description:
        "OpenFiat adalah protokol terbuka untuk menukar stablecoin dengan mata uang fiat lokal, antar sesama, tanpa operator bursa terpusat. Penyelesaian di Solana; koordinasi di jaringan terbuka.",
    },
    nav: {
      howItWorks: "Cara kerja",
      trust: "Kepercayaan & keamanan",
      whitepaper: "Whitepaper",
      specs: "Spesifikasi",
      actors: "Berpartisipasi",
      guides: "Panduan",
      fees: "Biaya",
      sale: "Penjualan token",
      runNode: "Jalankan node",
      launchApp: "Buka aplikasi",
      preview: "Pratinjau",
      openMenu: "Buka menu",
      closeMenu: "Tutup menu",
      primaryLabel: "Utama",
      skipToContent: "Lewati ke konten",
      language: "Bahasa",
    },
    footer: {
      blurb:
        "Protokol terbuka untuk menukar stablecoin dan mata uang fiat lokal, antar sesama. Penyelesaian di Solana, koordinasi di jaringan terbuka.",
      columns: {
        protocol: "Protokol",
        participate: "Berpartisipasi",
        network: "Jaringan",
        project: "Proyek",
        community: "Komunitas",
      },
    },
  },
  pl: {},
  uk: {},
  kn: {},
  ar: {
    meta: {
      tagline: "تبادل عملات ورقية لامركزي من الند للند",
      description:
        "OpenFiat بروتوكول مفتوح لتبادل العملات المستقرة بالعملات الورقية المحلية، من الند للند، دون مشغّل بورصة مركزي. التسوية على Solana؛ والتنسيق عبر شبكة مفتوحة.",
    },
    nav: {
      howItWorks: "كيف يعمل",
      trust: "الثقة والأمان",
      whitepaper: "الورقة البيضاء",
      specs: "المواصفات",
      actors: "المشاركة",
      guides: "الأدلة",
      fees: "الرسوم",
      sale: "بيع الرموز",
      runNode: "تشغيل عُقدة",
      launchApp: "فتح التطبيق",
      preview: "معاينة",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
      primaryLabel: "رئيسي",
      skipToContent: "تخطَّ إلى المحتوى",
      language: "اللغة",
    },
    footer: {
      blurb:
        "بروتوكول مفتوح لتبادل العملات المستقرة والعملات الورقية المحلية، من الند للند. التسوية على Solana، والتنسيق عبر شبكة مفتوحة.",
      columns: {
        protocol: "البروتوكول",
        participate: "المشاركة",
        network: "الشبكة",
        project: "المشروع",
        community: "المجتمع",
      },
    },
  },
  ur: {},
  fa: {},
};
