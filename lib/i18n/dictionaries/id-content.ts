import type { ContentDictionary } from "./en-content";

/**
 * Indonesian long-form content — a complete translation, typed as
 * ContentDictionary so a missing key fails the build. Specification ids
 * (OFS-####), code identifiers (getChainStatus, --public-rpc-url, openfiat-node,
 * RocksDB, libp2p, execute_dispute_outcome…), repository names, the glossary
 * acronyms and proper nouns are preserved verbatim.
 */
export const idContent: ContentDictionary = {
  home: {
    rails: [
      "Transfer bank",
      "Uang seluler",
      "ACH",
      "SEPA",
      "Faster Payments",
      "PIX",
      "Setoran tunai",
      "Jaringan pembayaran instan regional",
    ],
  },

  trust: {
    flow: [
      {
        title: "Anda memilih sebuah penawaran",
        body: "Penawaran menunjukkan kurs, metode pembayaran yang diterima, batas, dan bagaimana pihak lawan berkinerja pada transaksi lalu. Belum ada yang diasumsikan.",
      },
      {
        title: "Kriptonya masuk ke kustodi",
        body: "Sebelum uang apa pun bergerak, stablecoin penjual dikunci dalam kustodi on-chain. Penjual tak dapat menariknya kembali dan pembeli tak dapat mengambilnya lebih awal. Inilah langkah yang membuat sisanya aman.",
      },
      {
        title: "Anda membayar seperti biasanya Anda membayar",
        body: "Transfer bank, uang seluler, jaringan pembayaran instan, atau tunai. Pembayaran terjadi di jalur biasa Anda, bukan di sebuah blockchain, dan Anda menandainya terkirim setelah selesai.",
      },
      {
        title: "Kustodi dilepaskan",
        body: "Penjual mengonfirmasi uang telah tiba dan kustodi dilepaskan otomatis. Jika ia tak mengonfirmasi, atau ada yang salah, salah satu pihak dapat membuka sengketa.",
      },
    ],

    pillars: [
      {
        title: "Kustodi lebih dulu",
        body: "Dana dikunci sebelum fiat bergerak, setiap kali. Pembeli tak pernah mengirim uang berharap pihak lawan menepati, dan penjual tak pernah melepas koin berharap pembayaran muncul.",
      },
      {
        title: "Reputasi dihasilkan, bukan dibeli",
        body: "Setiap transaksi yang selesai, setiap sengketa, dan setiap waktu respons adalah bagian dari catatan publik yang terikat ke sebuah dompet. Tak seorang pun dapat membeli reputasi baik, atau meninggalkan yang buruk dengan membuka akun baru.",
      },
      {
        title: "Identitas Anda tetap milik Anda",
        body: "Tak ada KYC. Alih-alih menanyakan siapa Anda, protokol memungkinkan Anda membuktikan apa yang Anda kendalikan — sebuah email, telepon, akun Telegram — dan tak pernah menetapkan kewarganegaraan atau status hukum Anda.",
      },
      {
        title: "Dompet yang diketahui buruk ditandai, dan sebagian diblokir",
        body: "Penyedia independen menerbitkan informasi risiko bertanda tangan tentang dompet yang terkait penipuan atau sanksi. Sebagian besar bersifat anjuran — aplikasi Anda dapat memperingatkan, meminta konfirmasi, atau mengabaikannya. Di atas itu ada daftar larangan yang dikelola tata kelola, dan dompet yang ada di dalamnya tak dapat menyetor ke vault mana pun di mana pun dalam protokol. Penyedia menerbitkan buktinya; hanya suara tata kelola yang menambah atau menghapus sebuah entri, dan kedua arahnya dicatat on-chain. Ini belum dibangun.",
      },
    ],

    dispute: [
      {
        title: "Salah satu pihak membuka sebuah kasus",
        body: "Mengajukan sengketa tak menelan biaya apa pun bagi pembeli. Deposit arbitrase disetor merchant dari vault likuiditasnya, pihak mana pun yang membuka kasus, dan ia hanya kehilangannya jika hasilnya melawannya. Kedua pihak menyerahkan bukti: kuitansi, konfirmasi pembayaran, percakapan transaksi. Deposit dispesifikasikan dan belum dipungut.",
      },
      {
        title: "Arbiter men-stake untuk mengambil kasus",
        body: "Arbiter yang memenuhi syarat memilih kasus alih-alih ditugaskan, dan harus mengomitkan OPEN mereka sendiri sebelum diizinkan melihat bukti. Karena bukti tersembunyi sampai mereka berkomitmen, tak ada yang bisa disuap sebelumnya.",
      },
      {
        title: "Mereka memilih tanpa saling melihat",
        body: "Tiap arbiter lebih dulu menerbitkan sebuah commit tersegel dan mengungkap keputusannya kemudian, jadi tak seorang pun dapat mengikuti kerumunan. Jumlah arbiter pada sebuah kasus tak diterbitkan, yang mencegah menebak berapa yang dipertaruhkan.",
      },
      {
        title: "Kustodi menyelesaikan hasilnya",
        body: "Keputusan dieksekusi on-chain. Desainnya membayar arbiter mayoritas dan menyita sebagian stake dari yang berada di luarnya, dengan penalti yang sengaja moderat — tujuannya menangkal kelalaian dan kolusi, bukan menghukum ketaksepakatan yang jujur. Baik imbalan maupun penalti belum diimplementasikan, jadi hari ini sebuah suara tak menghasilkan apa-apa dan memilih melawan konsensus tak menelan biaya.",
      },
    ],
  },

  protocol: {
    solanaBlurb:
      "Program on-chain yang telah diaudit memegang aset. Kustodi tak bergantung pada apakah OpenFiat daring, terjangkau, atau bahkan masih dipelihara.",
    solanaItems: [
      "Kustodi aset",
      "Eksekusi kustodi",
      "Staking",
      "Treasury",
      "Eksekusi tata kelola",
    ],
    openfiatBlurb:
      "Sebuah jaringan peer-to-peer terbuka mengangkut pasar. Siapa pun dapat menjalankan sebagiannya, dan tak ada operator tunggal yang dapat merobohkannya.",
    openfiatItems: [
      "Penemuan iklan",
      "Koordinasi transaksi",
      "Reputasi",
      "Pesan terenkripsi",
      "Penemuan layanan",
      "Notifikasi",
      "Pemulihan sesi",
    ],
    principles: [
      {
        title: "Verifikasi kendali, bukan identitas",
        body: "Alih-alih menentukan siapa seseorang, OpenFiat memverifikasi apa yang ia kendalikan. Ia tak menetapkan kewarganegaraan, kebangsaan, atau status hukum, dan tak menuntut KYC.",
      },
      {
        title: "Protokol, bukan platform",
        body: "Tak ada perusahaan yang memiliki email. Ribuan penyedia independen mengimplementasikan sebuah standar bersama. OpenFiat dibangun dengan cara yang sama.",
      },
      {
        title: "Reputasi dihasilkan",
        body: "Pengguna yang baru terverifikasi memiliki lebih sedikit riwayat teramati daripada merchant anonim yang telah menyelesaikan ribuan transaksi selama bertahun-tahun.",
      },
      {
        title: "Hanya desentralisasikan yang mendapat manfaat",
        body: "Kustodi mendapat manfaat dari eksekusi on-chain. Daftar iklan tidak. Ujinya adalah apakah desentralisasi meningkatkan keamanan, ketahanan, transparansi, atau kepemilikan.",
      },
      {
        title: "Bukan blockchain lagi",
        body: "OpenFiat tak memperkenalkan algoritma konsensus pesaing apa pun. Alih-alih menggantikan chain yang ada, ia memperluasnya.",
      },
      {
        title: "Dirancang untuk melampaui para pembuatnya",
        body: "AllenHark memimpin pengembangan awal dan dirancang agar menjadi tak diperlukan. Tak ada satu peserta pun yang semestinya tak tergantikan.",
      },
    ],
  },

  actorGroups: {
    participants: {
      title: "Siapa pun bisa menjadi ini",
      blurb: "Bertransaksi tak butuh pendaftaran maupun stake. Beriklan butuh.",
    },
    providers: {
      title: "Peran infrastruktur dan layanan",
      blurb:
        "Jalankan sebagian jaringan dan hasilkan dari pendapatan protokol.",
    },
    builders: {
      title: "Membangun di atas protokol",
      blurb: "Satu protokol, banyak implementasi.",
    },
  },

  actors: {
    buyers: {
      name: "Pembeli dan penjual",
      definition:
        "Pembeli adalah peserta mana pun yang menerima sebuah iklan yang sudah ada.",
      summary: "Beli dan jual stablecoin dengan mata uang lokal.",
      responsibilities: [
        "Menelusuri iklan dan memfilter berdasarkan negara, mata uang, metode pembayaran, dan jumlah",
        "Memesan sebuah transaksi, yang memindahkan stablecoin ke kustodi sebelum fiat apa pun dikirim",
        "Mengirim atau menerima pembayaran fiat lewat jalur yang disepakati",
        "Menandai pembayaran terkirim, dan mengonfirmasi penerimaan sebagai pihak lawan",
        "Membuka sengketa dengan bukti jika ada yang salah",
      ],
      stake:
        "Tak ada. Pembeli tak menerbitkan iklan, tak men-stake apa pun, dan tak membayar apa pun untuk mengajukan sengketa — deposit arbitrase disetor merchant, siapa pun yang membuka kasus. Satu-satunya biaya pembeli adalah biaya penyelesaian, dan hanya pada transaksi yang selesai.",
      earns:
        "Tak ada secara langsung. Manfaatnya adalah persaingan antarmerchant dan tak bergantung pada satu operator yang tetap daring.",
      requirements: [
        "Sebuah dompet swakustodi",
        "Tanpa KYC dan tanpa verifikasi identitas terpusat",
        "Opsional, deklarasi identitas sukarela yang membuktikan kendali atas email, Telegram, atau kanal lain",
      ],
    },
    merchants: {
      name: "Merchant",
      definition:
        "Merchant adalah peserta yang menyediakan likuiditas ke pasar secara berkelanjutan.",
      summary: "Sediakan likuiditas dan terbitkan iklan.",
      responsibilities: [
        "Menerbitkan iklan bertanda tangan digital untuk membeli atau menjual stablecoin dengan fiat lokal",
        "Memilih harga tetap atau harga mengambang terhadap kurs rujukan oracle",
        "Mendukung satu atau lebih negara dan metode pembayaran",
        "Mengelola ketersediaan antara status daring, luring, dan libur",
        "Memverifikasi bahwa pembayaran fiat telah tiba, lalu melepaskan kustodi",
        "Memperbarui iklan sebelum kedaluwarsa",
      ],
      stake:
        "Registrasi merchant menuntut men-stake OPEN. Ini menangkal spam, memberi pertanggungjawaban ekonomi, dan menetapkan kapasitas iklan awal merchant. Penting dicatat bahwa stake merchant tak menjamin transaksi individual — penyelesaian dilindungi vault kustodi. Men-stake juga tak memberi reputasi, yang harus dihasilkan lewat transaksi yang selesai.",
      earns:
        "Spread atas harganya sendiri. Merchant membayar biaya protokol alih-alih menerimanya: sebuah iklan membawa biaya listing dalam OPEN, dan deposit arbitrase pada transaksi yang disengketakan berasal dari vault merchant. Belum ada yang dipungut — keduanya dispesifikasikan dan tak ada instruksi yang membacanya, jadi beriklan hari ini tak menelan biaya.",
      requirements: [
        "Mendaftarkan profil merchant sebelum beriklan",
        "Men-stake OPEN; kapasitas berskala dengan stake, reputasi, umur akun, riwayat transaksi, dan tingkat sengketa",
        "Mendeklarasikan negara dan metode pembayaran yang didukung",
      ],
    },
    "node-operators": {
      name: "Operator node",
      definition:
        "Operator node adalah tulang punggung jaringan OpenFiat. Validator Solana mengamankan blockchain dan mengeksekusi program OpenFiat; operator node menjaga pasar terdesentralisasi yang ada di atasnya.",
      summary: "Jalankan lapisan pasar peer-to-peer.",
      responsibilities: [
        "Memelihara koneksi antarpeer dan berpartisipasi dalam penyebaran gossip",
        "Menyinkronkan keadaan pasar dan menghosting indeks iklan",
        "Mendistribusikan vektor reputasi dan risiko",
        "Menyiarkan peristiwa siklus hidup transaksi",
        "Memelihara direktori penyedia dan menerbitkan kesehatan node",
        "Melayani aplikasi klien",
      ],
      stake:
        "Diperlukan untuk menjadi peserta aktif. Namun stake saja tak menentukan reputasi — operator berkinerja buruk tak dapat menutupinya dengan men-stake lebih banyak. Prioritas efektif memadukan reputasi, stake, dan kinerja jaringan yang terukur, dan node ber-stake berhak atas imbalan protokol.",
      earns:
        "Kompensasi berasal dari pendapatan protokol alih-alih inflasi token, dibobot berdasarkan stake, konektivitas, dan ketersediaan — node yang menjembatani ke Solana menghasilkan lebih banyak daripada yang hanya menyebar lewat gossip. Rumusnya diterbitkan di OFS-4100 §9.2. Belum ada yang membayarnya: perhitungannya ada, tetapi tak ada yang mengirim hasilnya dan vault imbalan kosong.",
      requirements: [
        "Perangkat keras server umum — minimal 4 core, 16 GB RAM, dan 250 GB NVMe",
        "Koneksi stabil dan identitas node yang dibangkitkan",
        "Tanpa persetujuan siapa pun: peserta mana pun yang memenuhi persyaratan protokol dapat menjalankan node",
      ],
    },
    arbitrators: {
      name: "Arbiter",
      definition:
        "OpenFiat mendistribusikan penyelesaian sengketa antar arbiter independen yang secara ekonomi terdorong untuk mencapai keputusan yang jujur.",
      summary: "Selesaikan sengketa di bawah pertanggungjawaban ekonomi.",
      responsibilities: [
        "Menemukan kasus yang diterbitkan dan bergabung secara sukarela, alih-alih ditugaskan",
        "Mengomitkan stake khusus kasus untuk memperoleh akses ke bukti",
        "Meninjau kuitansi, konfirmasi pembayaran, dan komunikasi transaksi",
        "Memilih memakai skema commit-reveal, lalu mengungkap sebelum tenggat",
      ],
      stake:
        "Per kasus. Seorang arbiter mengomitkan stake tambahan untuk tiap kasus yang ia ikuti, dan kasus itu terlindungi secara ekonomi hingga penyelesaian. Arbiter yang suara terungkapnya berada di luar konsensus akhir dapat kehilangan sebagian stake itu. Penalti sengaja moderat: tujuannya menangkal kelalaian dan kolusi, bukan menghukum ketaksepakatan yang beritikad baik.",
      earns:
        "Desainnya mendanai imbalan dari pool arbitrase, dibagi di antara arbiter yang suara terungkapnya cocok dengan hasil, pro-rata menurut bobot terungkap. Tak satu pun dari ini diimplementasikan — seorang arbiter tak menghasilkan apa-apa hari ini, dan tak ada field on-chain untuk menyimpan pembayaran.",
      requirements: [
        "Stake minimum OPEN dan reputasi arbiter minimum",
        "Umur yang cukup dalam protokol dan tanpa penalti arbitrase yang aktif",
        "Kompatibilitas mutakhir dengan protokol",
      ],
    },
    "notification-gateways": {
      name: "Gateway notifikasi",
      definition:
        "Sebuah Gateway Notifikasi adalah layanan mana pun yang mengimplementasikan Spesifikasi Gateway Notifikasi OpenFiat.",
      summary: "Kirim notifikasi opsional atas nama pengguna.",
      responsibilities: [
        "Menerima peristiwa notifikasi protokol dan mengirimnya lewat transport apa pun",
        "Mengembalikan tanda terima pengiriman",
        "Memverifikasi titik kontak pengguna lewat kode sekali pakai atau tantangan anti-bot",
        "Mendaftarkan kanal, wilayah, dan harga yang didukung di registri layanan",
      ],
      stake:
        "5.000 OPEN, dituntut oleh program staking saat Anda men-stake terhadap peran gateway notifikasi. Ini membeli pertanggungjawaban ekonomi dan ketahanan Sybil alih-alih perlakuan istimewa: tak ada yang merutekan trafik notifikasi berdasarkan stake hari ini, jadi memenuhi minimum menjadikan sebuah gateway memenuhi syarat, bukan diistimewakan.",
      earns:
        "Belum ada. Model yang dimaksudkan adalah bagian dari biaya tetap kecil dalam OPEN yang dibayar peserta untuk mengaktifkan notifikasi pada sebuah transaksi, sisanya dibagi antara alokasi treasury dan ekosistem — tetapi tak ada biaya semacam itu di mana pun dalam protokol hari ini dan tak ada imbalan gateway yang dibayarkan. Anggap ini niat desain, bukan pendapatan.",
      requirements: [
        "Mengimplementasikan spesifikasi notifikasi yang diterbitkan",
        "Mendaftarkan metadata gateway: kanal, versi protokol, harga, endpoint",
        "Menerima bahwa gateway hanya menerima informasi minimum yang diperlukan untuk mengirim — tak pernah saldo, bukti sengketa, atau keadaan pasar yang tak terkait",
      ],
    },
    "oracle-providers": {
      name: "Penyedia oracle",
      definition: "Siapa pun dapat mengoperasikan sebuah Penyedia Oracle.",
      summary: "Terbitkan data kurs dan data regional bertanda tangan.",
      responsibilities: [
        "Menerbitkan kurs valuta bertanda tangan seperti USD/KES dan USDC/USD",
        "Menerbitkan metadata stablecoin: desimal, penerbit, jaringan yang didukung, alamat kontrak",
        "Menerbitkan data infrastruktur pembayaran: jalur yang didukung, hari libur bank, gangguan",
        "Menerbitkan metadata regional: mata uang yang didukung, pengenal negara, informasi locale",
      ],
      stake:
        "Diperlukan sebelum menerbitkan informasi harga. Penyedia yang secara konsisten menerbitkan data keliru atau tak tersedia dapat kehilangan kelayakan imbalan dan menghadapi penalti yang ditetapkan tata kelola; kesalahan oracle yang terbukti adalah alasan yang dinyatakan untuk slashing.",
      earns:
        "Pembacaan gratis, dan penyedia dibayar oleh protokol sebagai gantinya — diskalakan berdasarkan berapa banyak pasangan mata uang yang benar-benar ia cakup dan uptime yang teramati. Rumusnya diusulkan di OFS-4100 §9.6 dan belum final, dan belum ada yang membayarnya.",
      requirements: [
        "Mendaftar lewat registri layanan dengan pasangan yang didukung dan frekuensi pembaruan",
        "Menandatangani tiap rekaman — pembaruan oracle yang tak bertanda tangan harus ditolak",
        "Menerima bahwa data oracle tak pernah memaksakan harga transaksi; ia hanya rujukan",
      ],
    },
    "snapshot-providers": {
      name: "Penyedia snapshot",
      definition:
        "Menghosting snapshot itu sendiri adalah sebuah layanan protokol. Peserta mana pun yang memenuhi syarat dapat menjadi penyedia snapshot.",
      summary:
        "Terbitkan snapshot keadaan agar node baru menyinkron dengan cepat.",
      responsibilities: [
        "Membangkitkan snapshot terkompresi tanpa mengganggu operasi pasar",
        "Menerbitkan hash integritas, sebuah state root, dan metadata bertanda tangan",
        "Memelihara ketersediaan unduhan dan bandwidth tinggi",
        "Menyimpan beberapa snapshot historis",
      ],
      stake:
        "Diperlukan, sebagai komitmen infrastruktur. Menerbitkan snapshot yang rusak termasuk di antara perilaku berbahaya yang tunduk pada slashing yang disetujui tata kelola.",
      earns:
        "Tak ada. Unduhan gratis dan peran ini tak membawa kompensasi, berdasarkan keputusan — melayani sebuah snapshot adalah biaya marjinal atas infrastruktur yang sudah dijalankan operator node dan sudah dibayar. Tak ada pendapatan dalam layanan snapshot yang berdiri sendiri dan tak ada yang direncanakan.",
      requirements: [
        "Mengumumkan kapasitas lewat registri layanan",
        "Menerbitkan metadata snapshot lengkap, termasuk tinggi snapshot dan state root",
        "Menandatangani tiap snapshot; klien memverifikasi tanda tangan, kompatibilitas, dan state root sebelum mengimpor",
      ],
    },
    "risk-intelligence-providers": {
      name: "Penyedia intelijen risiko",
      definition:
        "Satu-satunya peran penyedia yang memerlukan persetujuan tata kelola sebelum beroperasi.",
      summary: "Terbitkan informasi anjuran risiko dompet.",
      responsibilities: [
        "Menerbitkan rekaman risiko bertanda tangan yang menyebut alamat dompet, kategori, tingkat keparahan, dan keyakinan",
        "Mencakup analitik blockchain, intelijen penipuan, sinyal kepatuhan, atau laporan komunitas",
        "Mendukung konsensus multipenyedia dan penanganan positif palsu",
      ],
      stake:
        "Tak dispesifikasikan — inilah satu-satunya peran penyedia yang tabel staking whitepaper hilangkan, dan tak ada persyaratan stake yang muncul untuknya di mana pun. Yang membatasi peran ini adalah persetujuan tata kelola, bukan stake: sebuah langganan permanen yang ditarik dari treasury tak punya batas alami untuk penyalahgunaan seperti yang dimiliki sebuah oracle yang tak berguna.",
      earns:
        "Sebuah langganan tetap yang dibayar treasury — default 1.000 USDC per bulan, diskalakan berdasarkan uptime yang teramati, dapat dikonfigurasi tata kelola, dan diharapkan berubah seiring jaringan bertumbuh. Baik pembayaran maupun penghalang persetujuan di bawah belum dibangun.",
      requirements: [
        "Mendaftar lewat registri layanan",
        "Menerima bahwa rekaman bersifat anjuran: aplikasi dapat menolak setoran, memperingatkan, menuntut konfirmasi, atau mengabaikan peringatan sepenuhnya",
      ],
    },
    "bootstrap-nodes": {
      name: "Node bootstrap",
      definition:
        "Node bootstrap hanya punya satu tanggung jawab: memperkenalkan node yang baru bergabung ke jaringan yang ada. Mereka adalah direktori, bukan koordinator terpusat.",
      summary: "Perkenalkan node baru ke jaringan, lalu menyingkir.",
      responsibilities: [
        "Menjawab permintaan kontak pertama dengan daftar peer",
        "Tak lebih — mereka tak menyetujui peer, tak menyimpan keadaan eksklusif, tak mengoordinasikan atau merutekan keputusan protokol",
      ],
      stake: "Tak dispesifikasikan untuk peran ini.",
      earns: "Tak dispesifikasikan untuk peran ini.",
      requirements: [
        "Terdaftar sebagai layanan bootstrap di registri layanan",
        "Tata kelola dapat menyetujui node bootstrap tambahan yang dioperasikan komunitas seiring waktu",
        "Setelah penemuan selesai, node bootstrap menjadi opsional",
      ],
    },
    developers: {
      name: "Pengembang",
      definition:
        "Siapa pun dapat membangun perangkat lunak yang patuh tanpa meminta izin.",
      summary: "Bangun klien, node, perkakas, dan integrasi.",
      responsibilities: [
        "Membangun implementasi independen: node tertanam, perangkat lunak gateway, implementasi riset, klien kustom",
        "Menghosting antarmuka pengguna — web, seluler, portal korporat, pasar regional",
        "Mengirim proposal peningkatan dan meninjau spesifikasi",
        "Berkontribusi pada kode, dokumentasi, riset keamanan, dan pelokalan",
      ],
      stake: "Tak ada. Pengembang tak men-stake apa pun.",
      earns:
        "Hibah ekosistem dari Treasury Ekosistem, yang mendanai hibah, kemitraan, edukasi, hackathon, dan insentif pengembang.",
      requirements: [
        "Hanya kepatuhan pada spesifikasi — protokol bersifat bebas bahasa",
        "Seorang insinyur semestinya dapat membangun implementasi yang sepenuhnya patuh hanya dari spesifikasi",
      ],
    },
  },

  repos: {
    "openfiat-specs":
      "Spesifikasi kanonik protokol dan whitepaper. Segala hal di situs ini dibangkitkan darinya.",
    "openfiat-core":
      "Node rujukan, dalam Rust. Jaringan peer-to-peer, gossip, keadaan pasar, snapshot, dan API node.",
    "openfiat-sdks":
      "SDK resmi untuk Rust, TypeScript, dan Python, ditambah data rujukan bersama yang menjadi sandarannya.",
    "openfiat-app":
      "Aplikasi web standar: transaksi, ikhtisar jaringan, staking, tata kelola, sengketa, dan riwayat.",
    "openfiat-apps":
      "Aplikasi tambahan — dasbor merchant dan explorer jaringan.",
    "openfiat-devtools":
      "Jaringan uji, vektor kepatuhan protokol, benchmark, dan fuzzing.",
    "openfiat-infra":
      "Image kontainer, chart Helm, modul Terraform, dan tumpukan pemantauan.",
    "openfiat-docs": "Situs dokumentasi pengembang.",
    "openfiat-org": "Situs ini.",
    "awesome-openfiat":
      "Daftar proyek, perkakas, dan sumber daya OpenFiat yang dikurasi komunitas.",
  },

  runNode: {
    minimumSpecs: [
      "4 core CPU",
      "16 GB RAM",
      "SSD NVMe 250 GB",
      "Koneksi broadband stabil",
    ],
    recommendedSpecs: [
      "8–16 core CPU",
      "32 GB RAM atau lebih",
      "SSD NVMe 1 TB",
      "Jaringan berbandwidth tinggi, berlatensi rendah",
      "Perlindungan daya lewat UPS",
      "Konektivitas internet redundan",
    ],
    internals:
      "Node adalah satu biner Rust tunggal. libp2p (QUIC, Noise, Yamux) dan RocksDB dikompilasi di dalamnya — tak ada yang perlu dipasang terpisah.",

    install: [
      {
        id: "source",
        title: "Bangun dari sumber — untuk produksi, hari ini",
        note: "Belum ada versi yang ditandai, jadi saat ini inilah satu-satunya cara memperoleh biner node. Butuh toolchain Rust dan toolchain C untuk RocksDB. Bangun, letakkan di /usr/local/bin, dan jalankan di bawah systemd — inilah deployment yang didokumentasikan halaman ini, dan yang semestinya dipakai untuk node yang menjadi sandaran orang lain.",
      },
      {
        id: "binary",
        title: "Biner prabangun — begitu ada versi yang ditandai",
        note: "Mendorong sebuah tag v* menjalankan workflow rilis, yang membangun openfiat-node di runner native dan menerbitkan arsip linux-x86_64 dan windows-x86_64 di GitHub Releases. Belum ada yang ditandai, jadi halaman itu kosong untuk saat ini. Perhatikan ini adalah build rilis biasa, bukan statis maupun bertanda tangan — verifikasi yang Anda unduh terhadap workflow yang memproduksinya.",
      },
      {
        id: "docker",
        title: "Docker — hanya untuk pengujian",
        note: "Gunakan image untuk mencoba sebuah node secara lokal atau menaikkan klaster multi-node sekali pakai — bukan untuk menjalankan node yang menjadi sandaran jaringan. Ia ada untuk pengujian lokal yang reprodusibel; produksi menjalankan biner di bawah systemd.",
      },
    ],

    ports: {
      p2pQuic:
        "Trafik antarpeer. QUIC adalah transport utama, jadi port UDP ini harus terjangkau — yang paling sering lupa dibuka orang.",
      api: "JSON-RPC, WebSocket, REST, health, dan metrik — satu port nyata melayani semuanya, tak ada port terpisah per permukaan.",
      metrics:
        "Port yang sama dengan API di atas (GET /metrics). Batasi dengan firewall ke loopback/jaringan privat jika Anda tak ingin ia publik.",
    },

    troubleshooting: {
      noPeers: {
        symptom: "Tak ada peer yang terhubung",
        cause:
          "UDP 4001 terblokir, atau --entrypoint menunjuk ke alamat yang sebenarnya tak dapat dijangkau peer — ia harus berupa multiaddr/IP statis, bukan nama host (bootstrap DNS tak diresolusi). Node Anda sendiri mencatat alamat tempat ia terjangkau begitu ia mendengarkan.",
      },
      stuckSync: {
        symptom: "Sinkronisasi tak pernah selesai",
        cause:
          "Impor snapshot (OFS-1300) belum tuntas, atau belum ada peer yang mengumumkan snapshot yang cukup baru — periksa getLatestSnapshot/getCheckpointHeight.",
      },
      highDisk: {
        symptom: "Penggunaan disk terus bertambah",
        cause: "RocksDB belum melakukan kompaksi.",
      },
      clockSkew: {
        symptom: "Tanda tangan atau kedaluwarsa ditolak",
        cause:
          "Pergeseran jam. Rekaman membawa timestamp dan kedaluwarsa, jadi jam host harus benar.",
      },
    },

    walkthrough: [
      {
        id: "prepare",
        title: "Siapkan mesin",
        body: "Sebuah server Debian atau Ubuntu mutakhir, sebuah firewall, dan jam yang akurat. Jam lebih penting dari yang terlihat: rekaman membawa timestamp dan waktu kedaluwarsa, dan jam yang bergeser membuat sebuah node menolak data yang valid.",
      },
      {
        id: "install",
        title: "Pasang node",
        body: "Bangun dari sumber dan jalankan hasilnya di bawah systemd — belum ada versi yang ditandai, jadi inilah satu-satunya cara memperoleh biner hari ini, dan sisa manual ini mengasumsikannya. Gunakan Docker hanya saat menguji secara lokal atau menaikkan klaster sekali pakai.",
      },
      {
        id: "identity",
        title: "Bangkitkan dompet node",
        body: "Tak ada format «identitas node» terpisah — identitas sebuah node adalah wallet.json CLI Solana yang sebenarnya, file yang sama yang diproduksi solana-keygen. Seed-nya dipakai ulang baik untuk identitas gossip/peer node maupun kunci penandatanganan Solana. Simpan file itu — jika Anda kehilangannya, node bergabung kembali sebagai orang asing dan mulai membangun reputasi dari nol.",
      },
      {
        id: "configure",
        title: "Setel lingkungan",
        body: "openfiat-node tak punya file konfigurasi sendiri — tiap pengaturan adalah variabel lingkungan, dibaca sekali saat startup: di mana data berada, alamat mana yang didengarkan, peer mana yang dihubungi saat mulai, dan (opsional) endpoint RPC Solana mana yang dipakai. Peer bootstrap harus berupa multiaddr/IP statis, bukan nama host — bootstrap DNS tak diresolusi.",
      },
      {
        id: "firewall",
        title: "Buka port yang tepat",
        body: "Peer menjangkau node lewat UDP karena QUIC adalah transport utama — itulah port yang paling sering dilupakan. Satu port TCP melayani JSON-RPC, WebSocket, REST, health, dan metrik bersama-sama; jaga tetap privat jika Anda tak ingin melayani klien secara publik.",
      },
      {
        id: "reachable",
        title: "Layani jaringan: jadikan node Anda terjangkau",
        body: "Inilah langkah yang mengubah sebuah node dari sesuatu yang mengamati jaringan menjadi sesuatu yang mengangkutnya. Tempatkan nginx di depan dan peroleh sebuah sertifikat, lalu beri tahu node URL publiknya dengan --public-rpc-url dan ia mengumumkan dirinya agar dompet, explorer, dan aplikasi web OpenFiat sendiri dapat memakainya. Urutannya penting: nginx di atas HTTP polos dulu, lalu certbot menambahkan TLS — sebuah konfigurasi yang sudah menyebut sebuah sertifikat tak dapat memulai, sehingga certbot gagal sebelum sempat menerbitkan sertifikat yang akan menyelesaikannya. Sebuah sertifikat bukan hiasan opsional: sebuah halaman yang dilayani lewat HTTPS tak dapat membuka koneksi HTTP polos, jadi node tanpa sertifikat tak terlihat oleh setiap browser betapa pun sehatnya.",
      },
      {
        id: "service",
        title: "Jalankan sebagai layanan",
        body: "Di bawah systemd node memulai ulang setelah crash atau reboot, dan memperoleh periode mati yang cukup panjang agar basis data mengosong dengan bersih alih-alih dibunuh di tengah sebuah penulisan.",
      },
      {
        id: "sync",
        title: "Biarkan ia menyusul",
        body: "Alih-alih memutar ulang seluruh riwayat, sebuah node baru dapat menemukan dan mengimpor snapshot keadaan pasar saat ini yang diumumkan peer (OFS-1300) — metode JSON-RPC yang sebenarnya, bukan perkakas terpisah: getLatestSnapshot, getCheckpointHeight. Tanda tangan, versi protokol, dan state root, semua harus cocok sebelum dipercaya.",
      },
      {
        id: "verify",
        title: "Verifikasi ia sehat",
        body: "GET /health menegaskan proses berjalan; getChainStatus lewat JSON-RPC menyatakan apakah ia GossipOnly atau RpcConnected, dan blockhash-nya saat ini jika itu yang terbaru.",
      },
      {
        id: "register",
        title: "Ia sudah bagian dari jaringan",
        body: "Tak ada langkah «mengumumkan» terpisah — begitu sebuah node punya peer bootstrap, ia mem-gossip dan disebarkan otomatis; tak ada yang menyetujuinya. Men-stake, menerbitkan metadata di registri layanan, mengikuti sengketa, dan memberikan suara tata kelola adalah tindakan terpisah, dipandu dompet, yang dilakukan sebuah klien terhadap node yang berjalan — lihat panduan partisipasi terkait untuk masing-masing.",
      },
      {
        id: "monitor",
        title: "Awasi ia",
        body: "Sinyal yang benar-benar memprediksi masalah adalah peer yang terhubung, mode chain (GossipOnly vs RpcConnected), dan umur blockhash. Setel peringatan pada itu dan Anda akan tahu sebelum pengguna Anda.",
      },
      {
        id: "upgrade",
        title: "Jaga tetap mutakhir",
        body: "Hentikan, tukar biner, mulai. Node memperbarui satu per satu, jadi jaringan tak pernah butuh penghentian terkoordinasi, dan peristiwa gossip yang terlewat diputar ulang saat startup.",
      },
      {
        id: "backup",
        title: "Cadangkan yang tak dapat dibangkitkan kembali",
        body: "Keadaan pasar selalu dapat disinkronkan ulang dari sebuah snapshot. Dompet tak dapat dibangkitkan kembali. Saldo dan kustodi berada di Solana, bukan di disk Anda.",
      },
    ],

    monitoring: [
      {
        group: "Infrastruktur",
        items: ["CPU", "Memori", "Disk", "Throughput jaringan"],
      },
      {
        group: "Protokol (GET /metrics)",
        items: ["rpc_requests_total", "rpc_errors_total"],
      },
    ],
    monitoringNote:
      "Itulah semua yang diekspor node hari ini — jumlah peer, mode chain, dan kemajuan sinkronisasi belum menjadi metrik Prometheus, hanya nilai yang dapat Anda kueri lewat JSON-RPC (getChainStatus, getLatestSnapshot, getCheckpointHeight).",

    apis: [
      {
        group: "Pasar",
        items: [
          "Mengambil iklan",
          "Membuat iklan",
          "Memperbarui iklan",
          "Menghapus iklan",
        ],
      },
      {
        group: "Transaksi",
        items: [
          "Memesan iklan",
          "Menyinkronkan sesi transaksi",
          "Mengirim konfirmasi pembayaran",
        ],
      },
      {
        group: "Infrastruktur",
        items: [
          "Penemuan peer",
          "Penemuan gateway",
          "Informasi snapshot",
          "Intelijen risiko",
        ],
      },
      {
        group: "Tata kelola",
        items: ["Penemuan proposal", "Pengiriman suara", "Informasi treasury"],
      },
    ],

    interfaces: [
      "Antarmuka web resmi",
      "Antarmuka komunitas",
      "Antarmuka merchant",
      "Pasar regional",
      "Portal korporat",
    ],
  },

  becomeArbitrator: {
    requirements: [
      "Sebuah dompet Solana dengan setidaknya 10.000 OPEN — min_stake_arbitrator dari konfigurasi staking yang di-deploy, yang dapat diubah tata kelola — bond ia lewat halaman Stake di openfiat-app, atau lewat instruksi di bawah jika Anda membangun klien Anda sendiri",
      "Sebuah dompet yang dapat menandatangani pesan, yang dilakukan setiap dompet Solana yang relevan — halaman Arbitrate di openfiat-app menjalankan seluruh kasus di browser, dan SDK tersedia jika Anda lebih suka memprogram",
      "Akses jaringan ke endpoint JSON-RPC setidaknya satu node OpenFiat, milik Anda atau yang publik",
    ],

    walkthrough: [
      {
        id: "bond",
        title: "Bond OPEN untuk membuka kunci pool arbitrase",
        body: "Arbiter harus men-stake sebelum dapat melihat bukti satu kasus — itulah yang membuat menyuap salah satunya sia-sia (Anda tak tahu kasus mana yang harus dibidik) dan memberi jaringan sesuatu untuk di-slash jika Anda memilih melawan konsensus terungkap. Konfigurasi devnet yang di-deploy menetapkan minimum arbiter di 10.000 OPEN, sepuluh kali 1.000 yang disetor setiap peran lain.",
      },
      {
        id: "discover",
        title: "Temukan sebuah kasus terbuka",
        body: "Arbiter memilih sengketa mana yang dikerjakan — tak ada yang menugaskan satu kepada Anda. Kueri node mana pun untuk kasus yang belum mencapai jumlah arbiter yang diwajibkan.",
      },
      {
        id: "join",
        title: "Bergabung sebelum dapat melihat bukti",
        body: "Bergabung adalah yang membuka kunci sebuah kasus bagi Anda: pengajuan milik pembeli dan penjual sendiri, konfirmasi pembayaran, dan log pesan transaksi mereka. Begitu sebuah kasus memiliki jumlah arbiter lengkapnya, ia terkunci dan fase commit dimulai.",
      },
      {
        id: "commit",
        title: "Komitkan suara Anda — dua kali",
        body: "Dua pemungutan suara commit-reveal berjalan berdampingan: satu off-chain yang tercatat di jejak audit dan reputasi milik kasus itu sendiri, dan satu on-chain terhadap akun DisputeCase milik openfiat-escrow yang benar-benar memutuskan hasil yang dibobot stake. Gunakan keputusan dan salt yang sama untuk keduanya — tetapi enum khusus tiap sisi, bukan angka yang sama: Invalid off-chain adalah 2, InvalidDispute on-chain adalah 3, karena MutualSettlement menempati 2 on-chain. Hash byte yang salah dan Anda berkomitmen pada sesuatu yang tak pernah dapat Anda ungkap, yang persis membuat seorang arbiter di-slash.",
      },
      {
        id: "reveal",
        title: "Ungkap begitu jendelanya terbuka",
        body: "Ungkap hasil dan salt Anda di kedua tempat begitu jendela commit tertutup. On-chain, di sinilah pula suara Anda memperoleh bobot sejatinya: instruksi reveal membaca akun stake peran Arbitrator Anda secara langsung, jadi dompet tanpa stake arbiter tak dapat memberikan yang valid.",
      },
      {
        id: "resolve",
        title: "Hasilnya mengeksekusi dirinya sendiri",
        body: "Begitu tiap arbiter mengungkap, atau jendela reveal tertutup, siapa pun — Anda, pembeli, penjual, atau bot yang tak terkait — dapat memanggil execute_dispute_outcome. Ia hanya menghitung suara yang sudah tercatat on-chain. Desainnya lalu membayar mayoritas sebagian biaya kasus dan menyita sebagian stake dari yang mengungkap melawannya — tetapi baik imbalan maupun penalti belum diimplementasikan, jadi hari ini penghitungan menggerakkan dana trader dan tak lebih.",
      },
    ],
  },

  sale: {
    allocationLabels: {
      presale: "Prapenjualan komunitas",
      allenhark: "Treasury AllenHark",
      ecosystem: "Treasury ekosistem",
      infrastructure: "Bootstrap infrastruktur",
      incentives: "Insentif komunitas",
      liquidity: "Program likuiditas",
      reserve: "Cadangan strategis",
    },
    allocationVesting: {
      presale: "Tanpa lockup — dibuka saat klaim",
      allenhark: "Cliff 12 bulan, lalu linear 36 bulan",
      ecosystem: "Cliff 12 bulan, lalu linear 36 bulan",
      infrastructure:
        "Diterbitkan menurut aturan imbalan node, bukan pelepasan linear",
      incentives: "Diterbitkan seiring insentif dihasilkan",
      liquidity: "Cliff 3 bulan, lalu linear 24 bulan",
      reserve: "Cliff 12 bulan, lalu linear 48 bulan",
    },
    useOfFunds: [
      "Rekayasa protokol inti",
      "Audit keamanan independen",
      "Deployment infrastruktur",
      "Dokumentasi",
      "Pertumbuhan komunitas",
      "Perkakas pengembang",
      "Edukasi dan pemasaran",
      "Biaya hukum dan operasional peluncuran",
    ],
    vesting: [
      "Pendiri",
      "Anggota tim",
      "Penasihat",
      "Mitra strategis",
      "Alokasi prapenjualan tertentu, jika berlaku",
    ],
    protections: [
      "Alokasi yang didokumentasikan publik",
      "Jadwal vesting yang transparan",
      "Dompet treasury yang diketahui publik",
      "Jadwal pelepasan yang dapat diprediksi",
      "Tata kelola tak dapat menerbitkan pasokan baru secara rahasia",
    ],
  },

  glossary: [
    {
      term: "OPEN",
      expansion: null,
      definition:
        "Token utilitas dan tata kelola protokol. Ia bukan aset yang ditransaksikan — penyelesaian memakai stablecoin seperti USDC. OPEN di-stake sebagai pertanggungjawaban ekonomi dan membawa hak tata kelola. Diterbitkan sekali pada genesis dengan pasokan maksimum tetap.",
      specs: [],
    },
    {
      term: "OFS",
      expansion: "OpenFiat Protocol Suite",
      definition:
        "Seri spesifikasi bernomor. Nomornya mengodekan lapisan: 1000 jaringan, 2000 pasar, 3000 reputasi, 4000 tata kelola, 5000 identitas, 6000 notifikasi, 7000 oracle dan risiko.",
      specs: ["OFS-0000"],
    },
    {
      term: "OFNP",
      expansion: "OpenFiat Network Protocol",
      definition:
        "Lapisan transport peer-to-peer yang diimplementasikan setiap node yang patuh, dibangun di atas libp2p dengan QUIC, Noise, dan Yamux.",
      specs: ["OFS-1000"],
    },
    {
      term: "OFTP",
      expansion: "OpenFiat Trade Protocol",
      definition:
        "Siklus hidup transaksi: pemesanan, pendanaan kustodi, pembayaran fiat, konfirmasi, penyelesaian. Sebuah transaksi tak pernah dapat melewati sebuah keadaan wajib.",
      specs: ["OFS-2000"],
    },
    {
      term: "OFIP",
      expansion: "OpenFiat Improvement Proposal",
      definition:
        "Sarana tata kelola untuk mengubah protokol — setara dengan RFC atau EIP.",
      specs: ["OFS-4000"],
    },
    {
      term: "SWQoS",
      expansion: "Stake-Weighted Quality of Service",
      definition:
        "Bagaimana node diprioritaskan. Prioritas efektif memadukan reputasi, stake, dan kinerja jaringan yang terukur; men-stake lebih banyak tak dapat menutupi kinerja buruk.",
      specs: ["OFS-1600"],
    },
    {
      term: "Iklan",
      expansion: null,
      definition:
        "Pernyataan bertanda tangan publik yang mengungkapkan kesediaan merchant untuk bertransaksi, dengan aset, arah, mata uang, batas, model penetapan harga, dan metode pembayaran.",
      specs: ["OFS-2100"],
    },
    {
      term: "Pemesanan",
      expansion: null,
      definition:
        "Langkah yang mengklaim sebagian dari sebuah iklan untuk pembeli tertentu, sebelum kustodi didanai.",
      specs: ["OFS-2200"],
    },
    {
      term: "Kustodi",
      expansion: null,
      definition:
        "Penyimpanan on-chain stablecoin selama transaksi. Stablecoin masuk kustodi sebelum pembayaran fiat dimulai, jadi pembeli tak pernah mengirim fiat tanpa dana yang sudah terlindungi.",
      specs: ["OFS-2300"],
    },
    {
      term: "Vault likuiditas",
      expansion: null,
      definition:
        "Arsitektur on-chain yang menyimpan dana transaksi. Penyelesaian transaksi dilindungi di sini alih-alih oleh stake merchant.",
      specs: [],
    },
    {
      term: "Gossip",
      expansion: null,
      definition:
        "Bagaimana peristiwa yang mengubah keadaan menyebar ke seluruh jaringan, agar tak ada node yang bergantung pada feed pusat.",
      specs: ["OFS-1200"],
    },
    {
      term: "Snapshot",
      expansion: null,
      definition:
        "Salinan bertanda tangan dan terkompresi dari keadaan pasar dengan sebuah state root, yang memungkinkan node baru menyinkron cepat alih-alih memutar ulang seluruh riwayat.",
      specs: ["OFS-1300"],
    },
    {
      term: "Node bootstrap",
      expansion: null,
      definition:
        "Sebuah direktori yang memperkenalkan node yang baru dimulai ke peer, lalu menjadi opsional. Ia tak menyetujui apa pun dan tak mengoordinasikan apa pun.",
      specs: ["OFS-1100"],
    },
    {
      term: "Registri layanan",
      expansion: null,
      definition:
        "Direktori tempat penyedia menerbitkan apa yang mereka tawarkan dan di mana. Ia adalah direktori, bukan pasar: ia tak memberi rekomendasi, dan klien memilih sendiri.",
      specs: ["OFS-1500"],
    },
    {
      term: "Deklarasi identitas",
      expansion: null,
      definition:
        "Bukti sukarela dan bertanda tangan bahwa sebuah dompet mengendalikan sebuah kanal komunikasi seperti email atau akun Telegram. Ia menetapkan kendali, tak pernah identitas hukum, kewarganegaraan, atau status regulasi.",
      specs: ["OFS-5000"],
    },
    {
      term: "Commit-reveal",
      expansion: null,
      definition:
        "Pemungutan suara arbiter dua fase: terbitkan sebuah commit dulu, ungkap suara dan rahasia kemudian, agar tak ada arbiter yang dapat melihat suara yang lain sebelum memberikan miliknya.",
      specs: ["OFS-2400"],
    },
    {
      term: "Slashing",
      expansion: null,
      definition:
        "Kehilangan sebagian stake akibat pelanggaran protokol. Aturannya deterministik dan didokumentasikan publik; gangguan biasa memengaruhi reputasi dan kelayakan imbalan alih-alih memicu slashing.",
      specs: [],
    },
    {
      term: "Desentralisasi progresif",
      expansion: null,
      definition:
        "Komitmen yang paling sering diulang dalam whitepaper: AllenHark memimpin pengembangan awal, dan tanggung jawab atas infrastruktur serta tata kelola dirancang untuk beralih ke komunitas.",
      specs: [],
    },
    {
      term: "AllenHark",
      expansion: null,
      definition:
        "Perusahaan yang memimpin pengembangan awal. Ia mengoperasikan infrastruktur bootstrap selama peluncuran dan bersaing dengan setiap penyedia lain di bawah aturan protokol yang identik. Ia dirancang agar menjadi tak diperlukan.",
      specs: [],
    },
  ],
};
