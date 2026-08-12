import type { Dictionary } from "./en";

/**
 * Indonesian — a complete translation, typed as Dictionary so a missing key
 * fails the build. Proper nouns (OpenFiat, OPEN, USDC, Solana, AllenHark,
 * GitHub, Discord, Reddit, Apache-2.0, the OFS-#### and source-file references)
 * stay as-is, and every {placeholder} is preserved.
 */
export const id: Dictionary = {
  meta: {
    tagline: "Pertukaran fiat peer-to-peer, terdesentralisasi",
    description:
      "OpenFiat adalah protokol terbuka untuk menukar stablecoin dengan mata uang fiat lokal, langsung antarorang, tanpa operator bursa terpusat. Penyelesaian di Solana; koordinasi di jaringan terbuka.",
  },

  nav: {
    howItWorks: "Cara kerjanya",
    trust: "Kepercayaan & keamanan",
    whitepaper: "Whitepaper",
    specs: "Spesifikasi",
    actors: "Ikut serta",
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
      "Protokol terbuka untuk menukar stablecoin dan mata uang fiat lokal, langsung antarorang. Penyelesaian di Solana, koordinasi di jaringan terbuka.",
    columns: {
      protocol: "Protokol",
      participate: "Ikut serta",
      network: "Jaringan",
      project: "Proyek",
      community: "Komunitas",
    },
    links: {
      overview: "Ikhtisar protokol",
      howItWorks: "Cara kerjanya",
      trust: "Kepercayaan & keamanan",
      whitepaper: "Whitepaper",
      specifications: "Spesifikasi",
      glossary: "Glosarium",
      roadmap: "Peta jalan",
      fees: "Biaya",
      actors: "Semua peran",
      merchants: "Merchant",
      nodeOperators: "Operator node",
      developers: "Pengembang",
      guides: "Panduan",
      becomeArbitrator: "Menjadi arbiter",
      earn: "Cara Anda menghasilkan",
      sale: "Penjualan token",
      runNode: "Jalankan node",
      downloads: "Unduhan",
      documentation: "Dokumentasi",
      developerDocs: "Dokumentasi pengembang",
      status: "Status",
      app: "Buka aplikasi",
      foundation: "Yayasan",
      blog: "Blog",
      press: "Pers",
      careers: "Karier",
      contact: "Kontak",
      contribute: "Cara berkontribusi",
      github: "GitHub",
      discussions: "Diskusi",
      discord: "Discord",
      reddit: "Reddit",
      privacy: "Privasi",
      terms: "Ketentuan",
    },
    siteLicense: "Situs ini bersifat open source di bawah lisensi Apache-2.0.",
    notice:
      "OpenFiat adalah protokol terbuka, bukan layanan keuangan. Tidak ada di situs ini yang merupakan penawaran penjualan efek maupun nasihat keuangan. Pasokan, alokasi, dan ketentuan penjualan token OPEN belum final dan tetap tunduk pada tinjauan komunitas serta pemodelan ekonomi.",
  },

  home: {
    headlineLead: "Sebuah pasar yang",
    headlineAccent: "tak dapat dimatikan oleh negara atau perusahaan mana pun",
    headlineTail: ".",
    lede: "OpenFiat adalah protokol terbuka untuk menukar stablecoin dengan mata uang lokal, langsung antarorang. Kustodi diselesaikan di Solana; penemuan, reputasi, dan komunikasi berjalan di jaringan yang dapat diikuti siapa saja. Tidak ada pemerintah yang dapat menyensor Anda dan tidak ada perusahaan yang dapat menangguhkan Anda — tidak ada operator untuk ditekan, hanya peserta.",
    ctaJoinSale: "Ikut prapenjualan komunitas",
    ctaHowItWorks: "Lihat bagaimana sebuah transaksi berjalan",
    readWhitepaper: "Baca whitepaper",
    tokenSale: "Penjualan token",

    telemetry: {
      layers: "lapisan",
      stakedRoles: "peran ber-stake",
      specifications: "spesifikasi",
      repositories: "repositori",
      centralOperators: "operator terpusat",
    },

    problem: {
      title: "Setiap platform P2P saat ini memiliki arsitektur yang sama.",
      subtitle:
        "Kripto terdesentralisasi. Pasarnya tidak. Di balik hampir setiap pertukaran antarorang:",
      company: "Satu perusahaan tunggal",
      actions: [
        "memiliki server",
        "mengendalikan basis data",
        "menentukan iklan mana yang muncul",
        "menyelesaikan sengketa",
        "menyimpan skor reputasi",
        "dapat menangguhkan atau menghapus pengguna",
        "menentukan negara mana yang didukung",
        "dapat ditutup, diretas, atau ditekan",
      ],
      verdict:
        "Jika operator gagal — secara teknis, finansial, atau hukum — pasar itu lenyap, meski blockchain di bawahnya tak pernah berhenti. OpenFiat menghapus ketergantungan itu.",
    },

    layers: {
      title: "Dua lapisan, masing-masing melakukan yang terbaik.",
      subtitle:
        "Arsitektur ini meminimalkan biaya on-chain sambil menjaga kepemilikan terdesentralisasi dan transparansi.",
      coordination: {
        label: "Lapisan koordinasi · jaringan OpenFiat",
        title: "Komunikasi cepat antarorang",
        body: "Berjalan di jaringan peer-to-peer terbuka yang dapat diikuti siapa saja — tidak ada perusahaan di tengah, tidak ada server untuk disita.",
        items: [
          "Penemuan iklan",
          "Koordinasi transaksi",
          "Reputasi",
          "Komunikasi terenkripsi",
          "Notifikasi dan pencarian",
          "Pengindeksan pasar",
        ],
      },
      settlement: {
        label: "Lapisan penyelesaian · Solana",
        title: "Yang dilakukan blockchain dengan sangat baik",
        body: "Aset dikunci dan dilepaskan oleh smart contract yang telah diaudit — tak pernah oleh niat baik seorang operator.",
        items: [
          "Kustodi aset yang aman",
          "Manajemen kustodi",
          "Staking",
          "Manajemen treasury",
          "Eksekusi tata kelola",
        ],
      },
    },

    flow: {
      title: "Satu transaksi, empat langkah",
      subtitle:
        "Terlindungi mulai dari langkah kedua — tak seorang pun di tengah dapat mengambil dana, dan tak seorang pun perlu memercayai niat baik pihak lawan.",
      stages: ["Jaringan", "On-chain", "Jalur fiat", "On-chain"],
      pathsNote:
        "dan lanjutkan: panduan untuk trader, operator, dan pengembang",
    },

    read: {
      title: "Baca protokolnya",
      subtitle:
        "Setiap bab terbit sebagai halaman web — tanpa unduhan, tak ada yang di balik formulir. Tidak mengasumsikan pengalaman blockchain sebelumnya dan bermula dari apa itu uang. Spesifikasi bernomor ada di sampingnya, bagi yang mengimplementasikan.",
      startHere: "mulai di sini",
      moreChapters: (n: number) => `${n} bab lagi`,
      specsCta: (n: number) => `${n} spesifikasi`,
    },

    contribute: {
      title: "Bangun bersama kami",
      subtitle:
        "Setiap lapisan bersifat open source di bawah Apache-2.0, dan repositori spesifikasi menerima teks serta terjemahan — berkontribusi tak harus berarti kode.",
    },

    saleBand: {
      body: "OPEN adalah stake di balik setiap peran yang menjaga pasar tetap jujur — merchant, arbiter, node, oracle. Prapenjualan menawarkan alokasi komunitas pada kurs tetap sebelum penjualan publik apa pun. Belum ada kontrak penjualan yang di-deploy; menghubungkan dompet hari ini hanya memverifikasi kesiapan.",
      bodyLive:
        "OPEN adalah stake di balik setiap peran yang menjaga pasar tetap jujur — merchant, arbiter, node, oracle. Prapenjualan menawarkan alokasi komunitas pada kurs tetap sebelum penjualan publik apa pun. Prapenjualan sudah aktif di devnet; menghubungkan dompet memungkinkan Anda berkontribusi hari ini.",
      presaleRate: "Kurs prapenjualan",
      publicRate: "Penjualan publik setelahnya",
      publicRateValue: "1 USDC = 80 OPEN",
      supply: "Pasokan",
      supplyValue: "100.000.000.000 · wewenang mint dibatalkan",
      status: "Status",
      statusLive: "Aktif di devnet",
      termsCta: "Ketentuan penjualan & alokasi",
    },

    safety: {
      more: "Cara kepercayaan bekerja",
    },

    roles: {
      seeAll: "Lihat semua peran",
    },

    finalCta: {
      title: "Uang Anda, mata uang Anda, tanpa perantara.",
      body: "Mulai dengan ikhtisar lima menit, atau baca semuanya.",
      start: "Lihat bagaimana sebuah transaksi berjalan",
    },
  },

  whitepaper: {
    title: "Protokol OpenFiat, selengkapnya",
    intro:
      "Setiap bab terbit di sini sebagai halaman web — tanpa perlu unduhan, tak ada yang di balik formulir. Tidak mengasumsikan pengalaman blockchain sebelumnya dan bermula dari apa itu uang.",
    chapters: (n: number) => `${n} bab`,
    words: (n: string) => `~${n} kata`,
    readTime: (h: number, m: number) => `~${h} j ${m} mnt membaca`,
    startReading: "Mulai membaca",
    downloadPdfs: "Unduh PDF",
    frontMatter: "Bagian awal",
    chapter: (n: number) => `Bab ${n}`,
    expandsChapter: (n: number) => `memperluas bab ${n}`,
    englishOnlyTitle: "Terbit dalam bahasa Inggris",
    englishOnlyBody:
      "Whitepaper dan spesifikasi belum diterjemahkan. Penerjemahan tercantum sebagai bidang kontribusi komunitas di Bab 25; navigasi halaman ini dilokalkan, tetapi teks dokumen adalah bahasa Inggris aslinya.",
  },

  specsPage: {
    title: "Rangkaian protokol OpenFiat",
    intro: (count: number) =>
      `${count} spesifikasi bernomor. Nomornya mengodekan lapisan: yang 1000 adalah jaringan, yang 2000 adalah pasar, dan seterusnya hingga oracle dan intelijen risiko.`,
    published: (n: number) => `${n} terbit`,
    layers: (n: number) => `${n} lapisan`,
    draft: "Versi 1.0.0 · Draf",
    reservedTitle: "Rentang yang dicadangkan",
    notWritten: "Belum ditulis",
    reservedNote:
      "Spesifikasi dalam rentang yang dicadangkan dikutip oleh dokumen yang telah terbit, tetapi belum ditulis. Rujukan ke sana tampil sebagai teks biasa alih-alih tautan.",
  },

  reader: {
    onThisPage: "Di halaman ini",
    minRead: (n: number) => `${n} mnt membaca`,
    wordCount: (n: string) => `${n} kata`,
    sections: (n: number) => `${n} bagian`,
    relatedChapter: "Bab terkait",
    revisitsGround: "Bab ini meninjau kembali apa yang dibahas di",
    canonicalTreatment: ", yang merupakan pembahasan kanoniknya.",
    coversOverlapping: "membahas materi yang tumpang-tindih dari sudut kedua.",
    dependsOn: "Bergantung pada",
    dependedOnBy: "Yang bergantung padanya",
    navLabel: "Navigasi dokumen",
    specifications: "Spesifikasi",
    whitepaper: "Whitepaper",
    layer: (name: string) => `Lapisan ${name}`,
  },

  actors: {
    title: "Pembeli, merchant, arbiter, operator node",
    intro:
      "Sepuluh peran membuat OpenFiat tetap berjalan — sebagian Anda emban hanya dengan bertransaksi, sebagian lagi dengan menjalankan infrastruktur. Tak seorang pun memberi izin untuk salah satunya.",
    whatTheyDo: "Apa yang mereka lakukan",
    whatTheyStake: "Stake",
    howTheyEarn: "Cara mereka menghasilkan",
    requirements: "Persyaratan",
    repositories: "Repositori",
    governedBy: "Diatur oleh",
    noStake: "Tak butuh stake",
    noStakeStated: "Tidak dinyatakan dalam whitepaper",
    notStated: "Tidak dinyatakan dalam whitepaper",
    readMore: "Baca selengkapnya",
    otherRoles: "Peran lain",
    permissionless: "Tanpa izin",
    stakeNote:
      "Stake menunjukkan komitmen ekonomi terhadap ekosistem. Ini bukan pembayaran. Peserta tetap memiliki stake mereka, kecuali penalti yang ditetapkan protokol berlaku.",
  },

  howItWorks: {
    title: "Bagaimana sebuah transaksi berjalan",
    lede: "Empat langkah. Kripto lawan transaksi Anda dikunci sebelum Anda melepaskan uang apa pun, dan tetap terkunci hingga Anda berdua sepakat bahwa pembayaran telah tiba.",
    flowTitle: "Empat langkahnya",
    needTitle: "Yang Anda butuhkan",
    need: [
      "Dompet yang Anda kendalikan — tanpa akun, tanpa pendaftaran, tanpa KYC",
      "Stablecoin untuk dijual, atau mata uang lokal untuk membeli",
      "Metode pembayaran yang sudah Anda gunakan",
    ],
    railsTitle: "Cara membayar",
    railsLede:
      "Sisi fiat bergerak di jalur yang sudah Anda gunakan. OpenFiat menstandarkan bagaimana metode pembayaran dideskripsikan dan dikonfirmasi, bukan bagaimana ia beroperasi.",
    safetyTitle: "Jika ada yang salah",
    safetyLede:
      "Salah satu pihak dapat membuka sengketa, dan arbiter independen memutuskannya dengan stake mereka sendiri dipertaruhkan.",
    safetyMore: "Cara kepercayaan bekerja",
  },

  trust: {
    title: "Kepercayaan, tanpa siapa pun untuk dipercaya",
    lede: "Seorang asing hendak mengirimi Anda uang dalam mata uang yang tak dilihat oleh blockchain mana pun. Empat mekanisme membuatnya aman, dan tak satu pun berupa perusahaan yang berjanji bersikap adil.",
    flowTitle: "Yang melindungi satu transaksi individual",
    pillarsTitle: "Dari apa kepercayaan terbentuk",
    disputeTitle: "Ketika sebuah transaksi bermasalah",
    disputeLede:
      "Salah satu pihak dapat membuka sengketa. Ia diputuskan oleh arbiter independen yang mempertaruhkan OPEN mereka sendiri untuk memutus dengan benar, dan tak dapat melihat bukti sebelum berkomitmen.",
    noAppeal:
      "Tidak ada banding di versi 1. Pemungutan suara commit-reveal, arbiter ber-stake, dan penalti moderat menjadi pengamannya, alih-alih sidang kedua.",
    readChapter: "Baca protokol sengketa",
    readReputation: "Baca mesin reputasi",
  },

  protocolPage: {
    title: "OpenFiat bukan sebuah blockchain",
    lede: "Ia adalah lapisan koordinasi yang berdiri di atas satu blockchain. Solana memegang uang dan mengeksekusi kustodi; OpenFiat mengangkut semua yang dibutuhkan sebuah pasar dan yang tak perlu berada di sebuah chain — daftar iklan, reputasi, pesan, penemuan.",
    layersTitle: "Dua lapisan, masing-masing pada keahliannya",
    layersLede:
      "Pembagian ini adalah seluruh desainnya. Desentralisasikan yang mendapat manfaat darinya, dan biarkan sisanya di tempat ia bekerja lebih baik.",
    settlement: "Lapisan penyelesaian",
    coordination: "Lapisan koordinasi",
    principlesTitle: "Nalar di baliknya",
    principlesLede:
      "Bab 3 menyajikan dua belas prinsip yang menjadi turunan seluruh protokol. Enam ini melakukan pekerjaan terbanyak.",
    suiteTitle: "Serangkaian spesifikasi bernomor",
    suiteLede: (count: number) =>
      `${count} spesifikasi formal, dikelompokkan berdasarkan lapisan. Nomornya menunjukkan lapisan mana sebuah dokumen berada.`,
    browseSpecs: "Telusuri spesifikasi",
    readAll: "Baca dua belas prinsip",
  },

  runNode: {
    title: "Menjalankan node OpenFiat",
    intro:
      "Operator node menjaga pasar terdesentralisasi yang berdiri di atas blockchain. Validator Solana mengamankan chain dan mengeksekusi program OpenFiat; node mengangkut daftar iklan, reputasi, pesan, dan penemuan.",
    neverCustody:
      "Node tak pernah mengkustodi dana pengguna. Semua operasi finansial tetap di bawah kendali smart contract Solana.",
    requirementsTitle: "Perangkat keras",
    installTitle: "Pemasangan",
    releasesLink: "Rilis GitHub",
    referenceNote:
      "Perintah di bawah menggunakan deployment rujukan: layanan openfiat-node, /etc/openfiat untuk konfigurasi, dan /var/lib/openfiat untuk data.",
    serveRpcTitle: "Layani jaringan, bukan hanya diri sendiri",
    serveRpc:
      "Node yang hanya membaca adalah tamu. Node yang dapat dijangkau publik adalah infrastruktur — dompet, explorer, dan aplikasi web perlu berbicara dengan *seseorang*, dan hari ini seseorang semacam itu sedikit. Setiap operator yang menempatkan node-nya di balik TLS dan menyetel --public-rpc-url memperluas himpunan itu, yang menjadi perbedaan antara jaringan dengan banyak pintu masuk independen dan jaringan dengan satu titik kegagalan yang diam-diam diandalkan semua orang. Biayanya sebuah sertifikat dan sebuah reverse proxy. Ada imbalannya juga: node yang terjangkau adalah node yang dapat ditantang dan diberi imbalan oleh peer, dan aplikasi OpenFiat sendiri akan memakai node Anda bersama semua lainnya.",
    serveRpcHonest:
      "Dua hal yang perlu diketahui lebih dulu. Melayani publik berarti trafik nyata, jadi sesuaikan ukuran mesin untuk itu dan awasi endpoint metrik. Dan node publik adalah komitmen publik — orang akan membangun terhadap URL yang Anda terbitkan, jadi tarik ia secara sengaja alih-alih diam-diam.",
    portsTitle: "Port",
    portPublic: "Harus terjangkau",
    portPrivate: "Jaga tetap privat",
    troubleshootingTitle: "Saat ada yang salah",
    copy: "Salin",
    copied: "Tersalin",
    minimum: "Minimum",
    recommended: "Direkomendasikan untuk produksi",
    lifecycleTitle: "Menjadikan node daring",
    lifecycleNote:
      "Kerjakan langkah-langkah ini secara berurutan. Tiap langkah di bawah membawa perintah yang dibutuhkannya.",
    monitoringTitle: "Apa yang harus diekspos sebuah node",
    stakingBody:
      "Sebuah node men-stake OPEN untuk menjadi peserta aktif. Namun stake tak membeli reputasi: operator berkinerja buruk tak dapat menutupinya dengan men-stake lebih banyak. Prioritas efektif memadukan reputasi, stake, dan kinerja jaringan yang terukur.",
    hostUiTitle: "Menghosting antarmuka pengguna",
    hostUiIntro:
      "OpenFiat memisahkan protokol dari antarmukanya. Siapa pun dapat menghosting antarmuka web, gateway seluler, portal korporat, atau pasar regional, dan masing-masing menjangkau pasar yang sama.",
    hostUiQuote:
      "Apa pun antarmuka yang digunakan, setiap peserta berinteraksi dengan pasar terdesentralisasi yang sama.",
    hostUiConnect: "Ke mana sebuah antarmuka terhubung",
    hostUiConnectBody:
      "Antarmuka tak berbicara langsung dengan chain. Mereka terhubung ke satu atau lebih node OpenFiat terdekat, dan beralih ke node lain jika satu menjadi tak tersedia.",
    apiTitle: "Permukaan API node",
    apiNote:
      "Setiap node yang patuh mengekspos permukaan API yang sama, sehingga antarmuka yang ditulis terhadap satu node bekerja terhadap semuanya.",

    hostingTitle: "Di mana menjalankannya",
    hostingIntro:
      "AllenHark memimpin pengembangan awal protokol dan menjual dua hal yang dibutuhkan sebuah node: sebuah server dan akses RPC ke Solana. Operator node mendapat diskon {pct}% untuk keduanya, sebagai bagian dari program OpenFiat.",
    hostingVps: "Hosting server",
    hostingVpsBody:
      "Penyimpanan NVMe pada tautan 10 Gbps, di Frankfurt, Amsterdam, dan Chicago. Sesuaikan ukuran dengan perangkat keras di atas — penyimpanan adalah hal yang lambat laun dituntut sebuah node penuh, jadi sebutkan apa yang Anda jalankan dan ia dapat dispesifikasikan untuk Anda.",
    hostingRpc: "RPC & gRPC Solana",
    hostingRpcBody:
      "Koneksi ber-stake, agar transaksi yang dikirim node Anda tak mengantre di belakang milik semua orang. Akses diberikan melalui daftar IP yang diizinkan alih-alih kunci API. Yellowstone gRPC tersedia untuk men-streaming pembaruan akun dan slot.",
    hostingViewPricing: "Lihat harga",
    hostingClaimTitle: "Mengklaim diskon",
    hostingClaimBody:
      "Tak ada kode untuk dimasukkan. Tanya di Discord atau di chat di allenhark.com, sebutkan bahwa Anda menjalankan node OpenFiat, dan diskon diterapkan ke pesanan Anda.",
    hostingDiscord: "Tanya di Discord",
    hostingChat: "Buka chat",
  },

  earn: {
    title: "Cara Anda menghasilkan",
    intro:
      "Imbalan sebuah node adalah bagian dari emisi satu hari, ditentukan oleh berapa yang di-stake-nya dan tiga pengukuran atas apa yang dilakukannya dengan stake itu. Inilah rumus yang benar-benar dijalankan perangkat lunak, dengan bagian-bagian yang tak dapat diketahuinya ditandai sebagaimana adanya.",
    heroMeta:
      "Setiap konstanta di halaman ini dibaca dari crates/rewards di openfiat-core. Belum ada node yang dibayar.",

    modelTitle: "Yang menentukan bagian Anda",
    modelIntro:
      "Emisi per epoch bersifat tetap. Imbalan Anda adalah bobot Anda dibagi bobot setiap node yang memenuhi syarat, dan bobot adalah stake dikalikan tiga pengukuran layanan — masing-masing paling banyak 1,0.",
    termStakeTitle: "Berapa yang Anda stake",
    termStakeBody:
      "Dibaca dari akun stake on-chain Anda, tak pernah dari angka yang dilaporkan node tentang dirinya sendiri. Stake memberi node ballast: jika dua node menyebut akun yang sama, keduanya dikeluarkan dari epoch.",
    termConnectivityTitle: "Apakah Anda menjembatani ke Solana",
    termConnectivityBody:
      "1,0 jika jaringan melihat node Anda memunculkan pengumuman blockhash Solana, 0,4 jika hanya melihatnya menyebar lewat gossip. Node jembatan mengerjakan pekerjaan yang jelas lebih banyak, dan selisihnya tampak pada pengumuman bertanda tangannya sendiri alih-alih pada suatu klaim.",
    termAvailabilityTitle: "Berapa banyak dari hari Anda daring",
    termAvailabilityBody:
      "Bagian dari 24 irisan satu jam dalam epoch tempat node Anda terdengar. Terdengar sekali dalam sebuah irisan menghitungnya dan terdengar lima ratus kali menghitung sama, jadi membanjiri jaringan tak menghasilkan apa-apa.",
    termPinningTitle: "Apakah Anda menyajikan konten",
    termPinningBody:
      "1,0 jika node Anda mengembalikan byte yang cocok dengan sebuah alamat konten saat ditantang, 0,7 jika ia tak pernah ditantang atau gagal. Inilah satu-satunya dari ketiganya yang terbukti alih-alih masuk akal — byte yang mengerucut menjadi sebuah CID tak dapat diproduksi tanpa memilikinya.",
    pinningAheadOfSpec:
      "Sebuah catatan tentang pengali keempat ini. Tabel terkonfirmasi di OFS-4100 §9.2 mendaftar tiga faktor — stake, konektivitas, ketersediaan — dan tak menyebut pinning. Crate menerapkannya juga. Di mana spesifikasi dan kode berbeda, halaman ini mengikuti kode, karena kodelah yang akan menghitung sebuah jadwal; tetapi bacalah pengali pinning sebagai sesuatu yang mendahului spesifikasi alih-alih ditetapkan olehnya.",

    ceilingTitle: "Tak ada di sini yang dapat melebihi 1,0",
    ceilingLede:
      "Setiap pengali adalah pecahan dari satu, dan perangkat lunak menolak memulai dengan sekumpulan parameter yang salah satunya bukan demikian.",
    ceilingBody:
      "Ini bukan kehati-hatian, ini satu-satunya susunan yang tertutup. Pool sebuah epoch adalah sejumlah token tetap, dan pengali menentukan bagaimana pool itu dibagi. Pengali di atas 1,0 tak akan membayar lebih sebuah node bagus dari suatu tempat — ia akan membagikan token yang tak ada di ember Infrastruktur. RewardParams::validate menolak set semacam itu seketika alih-alih membiarkan defisitnya muncul di hari pembayaran.",
    ceilingPenalty:
      "Itu pula sebabnya imbalan untuk menyajikan konten dibangun sebagai penalti atas node yang tak menyajikannya. «Node yang melakukan pinning menghasilkan lebih banyak» dan «node yang tak melakukan pinning menghasilkan lebih sedikit» menggambarkan hasil yang sama, dan hanya yang kedua yang dapat diimplementasikan tanpa mengarang token. Node yang melakukan pinning menyimpan seluruh bagiannya; node yang tak melakukan pinning apa pun melepas tiga per sepuluh bagiannya.",
    matrixCaption:
      "Semua nilai yang dapat diambil kedua kunci, pada ketersediaan penuh.",
    matrixQuality: "Pengali",
    matrixNote:
      "Baca dua baris tengah bersama-sama: node gossip-saja yang menyajikan konten ({gossipPin}) masih menghasilkan lebih sedikit daripada node jembatan yang tak menyajikan apa pun ({rpcNoPin}). Menyajikan konten adalah premi di atas koneksi ke chain, tak pernah pengganti untuknya.",

    calcTitle: "Coba angka Anda sendiri",
    calcIntro:
      "Kolom kiri adalah yang Anda kendalikan. Yang kanan membagi hasilnya menjadi dua: yang ditetapkan tepat oleh masukan Anda, dan yang bergantung pada jaringan yang belum terbentuk.",
    yourNode: "Node Anda",
    stakeLabel: "Stake",
    stakeHint:
      "Di bawah 1.000 OPEN sebuah node tak dibobot sama sekali. Ia tak dibayar dengan bagian yang lebih kecil — ia diabaikan.",
    availabilityLabel: "Jam saat terdengar",
    availabilityHint:
      "Dari 24 irisan satu jam dalam epoch. Sebuah irisan dihitung sekali, sebanyak apa pun trafik yang Anda kirim selama itu.",
    connectivityLabel: "Konektivitas",
    connectivityRpc: "Jembatan ke Solana",
    connectivityGossip: "Gossip saja",
    pinningLabel: "Konten",
    pinningServing: "Menjawab sebuah tantangan",
    pinningAbsent: "Tak ditantang, atau gagal",

    determinedTitle: "Ditentukan oleh masukan Anda",
    qualityCeiling: "dari kemungkinan 1,00",
    qualityLabel:
      "Pengali kualitas Anda — tiga faktor layanan, dipadukan sebagaimana jadwal memadukannya.",
    factorConnectivity: "konektivitas",
    factorAvailability: "ketersediaan",
    factorPinning: "pinning",
    factorProduct: "kualitas",
    ineligibleBelowFloor:
      "Dengan stake ini node tak menghasilkan apa-apa. {min} OPEN adalah batas bawah, dan node di bawahnya tetap berada di luar seluruh pembobotan.",
    ineligibleOffline:
      "Node yang tak terdengar dalam irisan mana pun dari epoch memperoleh nol ketersediaan, yang menolkan seluruh bobot. Ia tak menghasilkan apa-apa, berapa pun stake-nya.",

    assumedTitle: "Bergantung pada sisa jaringan",
    assumedNote:
      "Bagian Anda adalah bobot Anda dibagi bobot setiap node yang memenuhi syarat, jadi ia tak dapat dihitung hanya dari masukan Anda. Tak ada total langsung untuk disubstitusi — halaman ini tak membaca keadaan chain, dan tak pernah ada imbalan yang dibagikan. Jadi totalnya adalah asumsi, Anda yang menetapkannya, dan kedua angka di bawah bersandar padanya dan tak ada yang lebih kokoh.",
    peersLabel: "Node lain yang memenuhi syarat",
    peerStakeLabel: "Stake masing-masing dari mereka",
    shareLabel: "Bagian Anda dari pool epoch",
    perEpochLabel: "OPEN per epoch, di bawah asumsi itu",
    poolReminder:
      "Seluruh pool adalah {pool} OPEN per epoch, dibagi antara setiap node yang memenuhi syarat. Kedua angka bergerak begitu ada yang lain men-stake, dan tak satu pun berupa prakiraan.",

    emissionTitle: "Pool-nya terbatas",
    emissionLede:
      "Emisi bootstrap adalah sebuah ember, bukan sebuah laju. Ia mengosong.",
    emissionBody:
      "120.000.000 OPEN — 12% dari pasokan — dicadangkan untuk membayar node selama pendapatan protokol masih terlalu kecil untuk berarti, dibagikan merata selama sekitar empat tahun epoch harian. Pada hari ia habis, pool imbalan menjadi persis bagian treasury Infrastruktur atas biaya penyelesaian: yang telah dihasilkan jaringan, dan tak lebih. Siapa yang menyesuaikan ukuran node terhadap angka-angka di atas sebaiknya menyesuaikannya terhadap hari itu pula.",
    emissionBucket: "OPEN di ember",
    emissionBucketNote:
      "Alokasi genesis Infrastruktur / Bootstrap Node, 12% dari total pasokan.",
    emissionPerEpoch: "OPEN per epoch",
    emissionPerEpochNote:
      "Dibagikan ke setiap node yang memenuhi syarat, dan dibatasi oleh sisa di ember.",
    emissionEpochs: "Epoch harian",
    emissionEpochsNote:
      "Sekitar empat tahun, setelahnya emisi adalah apa yang didanai pendapatan protokol.",

    refusalTitle: "Yang tak akan diberitahukan halaman ini",
    refusalLede: "Tiga angka hilang, dan masing-masing hilang dengan sengaja.",
    refusalPriceTitle: "Berapa nilainya dalam mata uang Anda",
    refusalPriceBody:
      "OPEN tak punya pasar dan karenanya tak punya harga. Sebuah angka dalam dolar, euro, atau renminbi di sini akan menjadi nilai yang dikarang proyek ini tentang tokennya sendiri lalu diserahkan kepada Anda dengan otoritas sebuah kalkulator. Tak ada kurs jujur untuk mengonversi, jadi tak ada konversi.",
    refusalYieldTitle: "Sebuah imbal hasil, APR, atau return",
    refusalYieldBody:
      "Return persentase terdengar seperti janji, dan itu bukan sesuatu yang dapat dijanjikan protokol. Emisi di baliknya mengosong dalam empat tahun, bagiannya dibagi dengan setiap node yang masuk, dan tak satu parameter pun tetap — §9 menjadikan semuanya dapat diperbarui lewat tata kelola. Satu angka tahunan tunggal akan menyembunyikan ketiga hal itu.",
    refusalTotalTitle: "Berapa yang di-stake jaringan hari ini",
    refusalTotalBody:
      "Halaman ini tak membaca keadaan chain. Bagian Anda bergantung pada total yang di-stake di setiap node yang memenuhi syarat, dan alih-alih menyubstitusi sebuah angka yang masuk akal, kalkulator menjadikan total itu sebuah asumsi yang Anda tetapkan, lalu menandai semua yang bersandar padanya.",

    statusTitle: "Yang benar-benar berjalan",
    statusBadge: "Devnet · tak ada yang dibayar",
    statusLede: "Perhitungannya ada. Pembayarannya tidak.",
    statusBody:
      "Node mengamati aktivitas satu sama lain dan menerbitkan yang mereka lihat, dan jadwal yang mengubah pengamatan itu menjadi jumlah telah diimplementasikan dan diuji — secara deterministik, agar siapa pun dengan pengamatan yang sama menurunkan jawaban yang sama dan node pembayar dapat diverifikasi alih-alih dipercaya. Yang kurang adalah langkah terakhir: tak ada yang mengirim jadwal on-chain, dan vault imbalan kosong. Belum ada node yang pernah dibayar.",
    statusParams:
      "Setiap nilai di sini adalah parameter tata kelola alih-alih konstanta: batas bawah {min} OPEN, {buckets} irisan ketersediaan, dan keempat pengali dapat diubah lewat pemungutan suara tanpa perubahan kode. Ini adalah nilai default hari ini.",
    sourceNote:
      "Konstanta dibaca dari crates/rewards/src/params.rs; aritmetikanya mencerminkan schedule.rs, termasuk di mana ia memotong.",
    sourceLink: "Baca kode sumber",
    specLink: "Baca OFS-4100",

    ctaTitle: "Jalankan satu dan cari tahu",
    ctaBody:
      "Model imbalan adalah setengah yang lebih kecil dari keputusan. Yang lebih besar adalah apakah mesin, bandwidth, dan perhatian sepadan bagi Anda — panduan operator berisi perangkat keras nyata, perintah nyata, dan bagian-bagian yang belum dibangun.",
    ctaRunNode: "Jalankan node",
    ctaFees: "Setiap biaya dan pembayaran",
  },

  fees: {
    title: "Biaya",
    intro:
      "Setiap biaya yang dipungut protokol dan semua yang dibayarnya. Sebagian besar yang menyusul telah diputuskan dan didokumentasikan, tetapi belum dipungut maupun dibayarkan, dan tiap baris menyatakan mana yang mana — sebuah halaman biaya yang terbaca seolah semuanya sudah live akan menjadi jenis kekeliruan paling serius.",
    accuracyNote:
      "Hanya devnet. Setiap biaya adalah parameter tata kelola, tak pernah konstanta.",
    payTitle: "Yang Anda bayar",
    payIntro:
      "Tiga biaya, dan mereka tak jatuh pada pihak yang sama. Pembeli hanya membayar pada transaksi yang selesai dan tak membayar apa pun untuk membuka sengketa; merchant menanggung biaya permanen untuk beriklan dan diarbitrase.",
    receiveTitle: "Yang diterima tiap peran",
    receiveIntro:
      "Konsumsi dan kompensasi adalah pertanyaan terpisah. Sebuah layanan dapat gratis dikonsumsi dan tetap dibayar oleh protokol — begitulah tepatnya biaya oracle bekerja.",
    permissionedTitle: "Satu-satunya peran berizin",
    permissionedBody:
      "Intelijen risiko adalah satu-satunya peran yang memerlukan persetujuan tata kelola sebelum beroperasi. AllenHark adalah penyedia default.",
    defaultProviderLabel: "Kunci layanan default",
    governanceTitle: "Setiap biaya adalah parameter",
    governanceBody:
      "Tak ada nilai di sini yang berupa konstanta. Masing-masing dapat diperbarui lewat tata kelola, karena biaya yang didenominasi dalam sebuah token harus bergerak seiring harga token itu. Angka yang ditampilkan adalah default saat ini, dan yang ditandai sebagai diusulkan belum disetujui.",
    columnPayer: "Pembayar",
    columnAmount: "Jumlah",
    columnConsumer: "Konsumen membayar",
    columnReceives: "Penyedia menerima",
    status: {
      live: "Dipungut hari ini",
      specified: "Dispesifikasikan, belum aktif",
      none: "Tak ada, berdasarkan keputusan",
    },
  },

  guides: {
    title: "Panduan",
    intro:
      "Langkah demi langkah, dengan perintah nyata. Tiap panduan ditulis terhadap perangkat lunak sebagaimana adanya hari ini, jadi di mana sesuatu belum dibangun, panduan menyatakannya alih-alih menggambarkan bagaimana tampaknya nanti.",
    accuracyNote:
      "Hanya devnet. Id program dan endpoint di halaman-halaman ini adalah artefak devnet; tak ada deployment mainnet.",
    allGuides: "Semua panduan",
    requirementsTitle: "Sebelum memulai",
    stepsTitle: "Langkah",
    relatedTitle: "Terkait",
    copy: "Salin",
    copied: "Tersalin",
    standalonePage: "Halaman mandiri",
    azTitle: "Semua panduan, A–Z",
    progressNote:
      "Kemajuan hanya tersimpan di browser ini — tanpa akun, tak ada yang dikirim ke mana pun.",
    completedLabel: "selesai",
    milestonesMeta: (count: number) => `${count} tonggak`,
    stepsMeta: (count: number) => `${count} langkah`,
    milestoneOf: (position: number, total: number) =>
      `Tonggak ${position} dari ${total}`,
    markStepDone: "Tandai langkah selesai",
    stepDoneLabel: "Selesai",
    prevOnPath: "Sebelumnya di jalur",
    nextOnPath: "Berikutnya di jalur",
    groups: {
      trade: {
        title: "Bertransaksi",
        blurb:
          "Membeli dan menjual, serta menyediakan likuiditas yang menjadi lawan transaksi orang lain.",
      },
      operate: {
        title: "Jalankan infrastruktur",
        blurb:
          "Peran-peran yang menopang jaringan. Pendapatan protokol semestinya membayarnya; belum ada yang mengalir darinya.",
      },
      build: {
        title: "Bangun di atas OpenFiat",
        blurb:
          "Menulis perangkat lunak terhadap protokol alih-alih memakai aplikasi yang ditulis orang lain.",
      },
    },
    standalone: {
      runNode: {
        title: "Jalankan node",
        summary:
          "Pasang, konfigurasikan, dan operasikan node OpenFiat, dari perangkat keras hingga pemantauan.",
      },
      becomeArbitrator: {
        title: "Menjadi arbiter",
        summary:
          "Bond OPEN, ambil sebuah kasus sengketa, dan berikan suara commit-reveal yang memutuskannya.",
      },
    },
  },

  becomeArbitrator: {
    title: "Menjadi arbiter OpenFiat",
    intro:
      "Arbiter memutus sengketa dengan OPEN mereka sendiri dipertaruhkan, bukan reputasi. Ini menelusuri bond, menemukan sebuah kasus, dan memberikan suara commit-lalu-reveal yang benar-benar membayar.",
    neverCustody:
      "Arbiter tak pernah memegang dana transaksi. Sebuah keputusan hanya menggerakkan uang yang telah dikunci program kustodi itu sendiri sebelum sengketa dibuka.",
    requirementsTitle: "Yang Anda butuhkan",
    bondCta: "Bond {amount} OPEN di openfiat-app",
    lifecycleTitle: "Menangani sebuah kasus",
    lifecycleNote:
      "Kerjakan langkah-langkah ini secara berurutan, satu kasus setiap kali. Tiap langkah membawa perintah atau kode yang dibutuhkannya.",
    copy: "Salin",
    copied: "Tersalin",
  },

  sale: {
    title: "Prapenjualan komunitas OPEN",
    notLiveTitle: "Penjualan belum dibuka",
    notLiveBody:
      "Belum ada kontrak penjualan yang di-deploy dan tak ada ketentuan yang final. Anda dapat menghubungkan dompet untuk memverifikasi kesiapan, tetapi belum ada yang bisa dibeli.",
    connectWallet: "Hubungkan dompet",
    disconnect: "Putuskan",
    connected: "Terhubung",
    verifyWallet: "Verifikasi dompet",
    verifying: "Menunggu tanda tangan…",
    verified: "Terverifikasi",
    verifyNote:
      "Tanda tangani sebuah pesan (tanpa transaksi, tanpa biaya) untuk menegaskan bahwa Anda mengendalikan dompet ini sebelum membeli.",
    verifyUnsupported:
      "Dompet ini tak mendukung penandatanganan pesan — Anda tetap dapat membeli; kepemilikan dompet dibuktikan oleh tanda tangan transaksi itu sendiri.",
    balance: "Saldo",
    max: "Maks",
    limitNote:
      "{min}–{max} USDC per dompet. Maks mengambil yang lebih kecil antara saldo Anda dan batas ini.",
    raisedLabel: "Terkumpul",
    goalLabel: "Target",
    offeredLabel: "Ditawarkan",
    goalNote:
      "Target adalah sasaran, bukan plafon. Prapenjualan menawarkan seluruh alokasi Prapenjualan Komunitas, jadi ia dapat terus menjual melampaui target jika permintaan berlanjut.",
    publicSaleNote:
      "Yang tersisa tak terjual dari alokasi Prapenjualan Komunitas saat prapenjualan ditutup akan ditawarkan kemudian dalam penjualan publik pada 1 USDC = 80 OPEN.",
    purchase: "Beli OPEN",
    purchaseDisabled: "Pembelian dibuka saat penjualan live",
    amount: "Anda membayar",
    youReceive: "Anda menerima",
    rateNote: "1 USDC = 100 OPEN",
    estimated: "perkiraan",
    reviewing: "Menyimulasikan transaksi…",
    submitting: "Menunggu tanda tangan dompet…",
    confirming: "Mengonfirmasi…",
    done: "Pembelian dikonfirmasi",
    txFailed: "Transaksi tak terkirim",
    txSuccess: "Dikonfirmasi",
    errors: {
      amountRequired: "Masukkan jumlah kontribusi.",
      amountInvalid: "Masukkan jumlah lebih dari nol.",
      insufficientBalance:
        "Anda punya {balance} {symbol}. Masukkan jumlah yang tercakup saldo Anda.",
      belowMinimum:
        "Kontribusi pertama sebuah dompet minimal harus {min} USDC.",
      aboveMaximum:
        "Satu dompet dapat berkontribusi maksimal {max} USDC total.",
      hardCapReached: "Penjualan sudah mencapai batas dan tidak menerima lagi.",
      saleNotOpen: "Penjualan sedang tidak dibuka.",
      claimsNotOpen: "Klaim dibuka setelah penjualan difinalisasi.",
      nothingToClaim: "Tidak ada OPEN tersisa untuk diklaim.",
      walletBanned: "Dompet ini tidak dapat mengikuti penjualan.",
      walletRejected: "Anda membatalkan permintaan di dompet Anda.",
      notEnoughSol: "SOL Anda tidak cukup untuk biaya jaringan.",
      expired:
        "Permintaan kedaluwarsa sebelum dikonfirmasi. Silakan coba lagi.",
      slippage: "Harga bergerak terlalu jauh saat swap. Silakan coba lagi.",
      network:
        "Tidak dapat menghubungi jaringan. Periksa koneksi lalu coba lagi.",
      generic: "Terjadi kesalahan dan pembelian tidak dilakukan.",
      detailsLabel: "Detail teknis",
    },
    claim: "Klaim OPEN",
    swapNotice:
      "Dikonversi ke USDC secara atomik pada harga terkonfirmasi sebelum mengkreditkan alokasi OPEN Anda. Pengembalian dana (jika soft cap tak tercapai) dibayarkan dalam USDC, bukan aset asalnya.",
    whatIsOpen: "Apa itu OPEN",
    whatIsOpenBody:
      "OPEN adalah token utilitas dan tata kelola protokol. Ia bukan aset yang ditransaksikan — penyelesaian pasar terjadi dalam stablecoin seperti USDC. OPEN di-stake oleh merchant, arbiter, operator node, dan penyedia layanan sebagai pertanggungjawaban ekonomi, dan ia membawa hak tata kelola.",
    supplyTitle: "Pasokan tetap",
    supplyBody:
      "OPEN diterbitkan sekali pada genesis dengan pasokan maksimum tetap, dan setiap alokasi awal dapat diverifikasi publik secara on-chain.",
    allocationTitle: "Kategori alokasi",
    allocationNote: "Persentase alokasi dirinci dalam Dokumen Tokenomics OPEN.",
    useOfFundsTitle: "Yang didanai prapenjualan",
    vestingTitle: "Vesting & perlindungan",
    whatVests: "Yang divesting",
    vestingNote:
      "Alokasi jangka panjang dibuka menurut jadwal yang diterbitkan alih-alih sekaligus, dan tiap pelepasan tampak on-chain.",
    protectionsTitle: "Perlindungan",
    riskTitle: "Risiko",
    riskBody:
      "Tak ada di sini yang merupakan penawaran penjualan efek maupun nasihat keuangan. Ketentuan dapat berubah. Ikut serta dalam penjualan token dapat berujung pada kerugian total.",
    rewardsTitle: "Imbalan OPEN Anda",
    rewardsSubtitle: "Hubungkan dompet yang Anda gunakan untuk berkontribusi.",
    rewardsConnectPrompt:
      "Hubungkan dompet Anda untuk melihat apa yang Anda peroleh di prapenjualan.",
    rewardsContributed: "Anda berkontribusi",
    rewardsEntitlement: "Imbalan dalam OPEN",
    rewardsNoContribution: "Tak ada kontribusi ditemukan untuk dompet ini.",
    rewardsNoContributionCta: "Ikut prapenjualan",
    rewardsPendingNote:
      "Dihitung begitu penjualan difinalkan — periksa lagi setelah penutupan.",
    rewardsClaimedNote: "Sudah diklaim untuk dompet ini.",
    rewardsRefundableNote:
      "Soft cap tak tercapai — kontribusi ini dapat dikembalikan dalam USDC di halaman penjualan.",
    rewardsGoToSale: "Ke halaman penjualan",
  },

  pages: {
    roadmap: {
      eyebrow: "peta jalan",
      title: "Peta jalan",
      intro:
        "Versi 1.0 spesifikasi adalah titik berangkat, bukan tujuan. Bab 26 menyajikan fase-fasenya; tiap butir di bawah adalah tonggak alih-alih fitur yang sudah dikirim.",
    },
    downloads: {
      eyebrow: "unduhan",
      title: "Unduhan",
      intro:
        "Rilis perangkat lunak dari GitHub — biner node, SDK, dan aplikasi — plus whitepaper dalam PDF. Tak ada PDF spesifikasi OFS — bacalah di situs atau di repositori spesifikasi.",
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
      eyebrow: "dokumentasi",
      title: "Dokumentasi",
      intro:
        "Dokumentasi pengembang ada di docs.openfiat.network. Spesifikasinya sendiri adalah rujukan yang berwenang dan diterbitkan lengkap di sini.",
    },
    foundation: {
      eyebrow: "tata kelola",
      title: "Yayasan",
      intro:
        "Whitepaper menyebut AllenHark maupun sebuah Yayasan OpenFiat tanpa mendefinisikan hubungan di antara keduanya. Halaman ini akan menjelaskan struktur perwalian begitu hal itu diputuskan.",
    },
    community: {
      eyebrow: "komunitas",
      title: "Komunitas",
      intro:
        "Bidang kontribusi yang dikutip di Bab 25: pengembangan perangkat lunak, dokumentasi, riset keamanan, laporan bug, layanan infrastruktur, materi edukasi, pelokalan, dan perkakas pengembang.",
    },
    blog: {
      eyebrow: "blog",
      title: "Blog",
      intro:
        "Pembaruan protokol dan catatan rekayasa akan diterbitkan di sini.",
    },
    press: {
      eyebrow: "pers",
      title: "Pers",
      intro:
        "Aset merek dan kontak pers. Untuk apa pun yang faktual tentang protokol, whitepaper dan spesifikasi adalah sumbernya.",
    },
    careers: {
      eyebrow: "karier",
      title: "Karier",
      intro: "Posisi yang terbuka akan dicantumkan di sini.",
    },
    status: {
      eyebrow: "status",
      title: "Status",
      intro:
        "Status langsung dari devnet OpenFiat, dibaca langsung dari RPC sebuah node publik. Hanya devnet — belum ada penyebaran ke mainnet.",
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
      eyebrow: "kontak",
      title: "Kontak",
      intro:
        "Untuk pertanyaan tentang protokol, bukalah sebuah diskusi di repositori spesifikasi agar jawabannya publik dan dapat dicari.",
    },
    privacy: {
      eyebrow: "hukum",
      title: "Kebijakan Privasi",
      intro:
        "Halaman ini memerlukan tinjauan hukum sebelum peluncuran dan belum final.",
    },
    terms: {
      eyebrow: "hukum",
      title: "Ketentuan Penggunaan",
      intro:
        "Halaman ini memerlukan tinjauan hukum sebelum peluncuran dan belum final.",
    },
  },

  tokenomics: {
    supplyLabel: "Pasokan maksimum",
    supplyPending: "Ditetapkan pada genesis",
    allocationAria: "Alokasi OPEN",
    provisional:
      "Persentase alokasi bersifat sementara dan akan difinalkan dalam Dokumen Tokenomics OPEN.",
    proceedsTitle: "Yang didanai prapenjualan",
  },

  common: {
    readWhitepaper: "Baca whitepaper",
    notFoundTitle: "Halaman tak ditemukan",
    notFoundBody:
      "Halaman itu tak ada. Mungkin telah dipindahkan, atau tautannya keliru.",
    goHome: "Ke halaman beranda",
    errorTitle: "Ada yang salah",
    errorBody:
      "Halaman ini gagal dirender. Memuat ulang mungkin memperbaikinya; jika tidak, masalahnya di pihak kami.",
    tryAgain: "Coba lagi",
  },
};
