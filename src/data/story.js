// ─── LEVEL 1: What is Money? ────────────────────────────────────────────────
export const level1Slides = [
  {
    id: 1,
    tag: "The Problem",
    color: "red",
    icon: "💸",
    title: "Amara wants to send money home",
    body: [
      "Amara works in Nairobi. Her mum is 340 km away in Kisumu and urgently needs KES 2,000 for food and medicine.",
      "Amara's options: send it through the bank, use mobile money, or try something new.",
      "The bank quotes her KES 800 in fees — nearly 40% of what she's sending — and says it will take 2–3 business days.",
      "Mobile money is faster, but still charges KES 150 and requires her mum to have an account.",
      "This is the reality for over 1.4 billion people globally who are 'unbanked' — cut off from basic financial tools the rest of us take for granted."
    ],
    choice: null
  },
  {
    id: 2,
    tag: "History",
    color: "yellow",
    icon: "🪙",
    title: "What makes something 'money'?",
    body: [
      "For thousands of years, humans traded using barter — exchanging goods directly. But barter has a problem: what if I have fish and you want bread, but the baker doesn't want fish?",
      "So societies invented money as a shared agreement — a medium everyone accepts. Gold became popular because it has 6 key properties of good money:",
      "① Scarce — limited supply prevents overprinting  ② Durable — doesn't rot or decay  ③ Divisible — can be split into smaller units  ④ Portable — easy to carry and trade  ⑤ Fungible — every unit is the same  ⑥ Hard to counterfeit — difficult to fake",
      "Paper money was created as a convenient stand-in for gold. Banks issued notes promising the holder could redeem them for gold. This was called the 'Gold Standard.'",
      "In 1971, U.S. President Nixon ended the Gold Standard. Since then, governments can print money with no backing — and they do. This is why a loaf of bread that cost KES 20 in 1990 now costs KES 120."
    ],
    choice: null
  },
  {
    id: 3,
    tag: "The Problem",
    color: "red",
    icon: "🏦",
    title: "Why banks are a problem",
    body: [
      "Banks act as trusted middlemen — they hold your money, process transactions, and lend it out. But this creates serious risks.",
      "In 2008, a global financial crisis hit when banks made reckless loans. Millions of ordinary people lost their savings, homes, and jobs — while governments bailed out the banks with taxpayers' money.",
      "In Kenya, Imperial Bank collapsed in 2015. Depositors had their accounts frozen for years. Their 'money in the bank' was inaccessible.",
      "Banks also have the power to freeze your account, block transactions, and report your financial activity to governments — without your consent.",
      "The fundamental problem: when you deposit money in a bank, it's no longer truly yours. You have a legal claim on it, but the bank controls it."
    ],
    choice: {
      question: "If a bank can freeze your account without warning, what does that mean?",
      options: [
        "The money is still mine — I can get it back eventually",
        "I don't actually control my own money in a bank",
        "Banks only freeze accounts for criminals"
      ],
      correct: 1,
      feedback: [
        "Eventually — but not when you need it. 'Eventually' during a crisis can mean years.",
        "Correct. You have an IOU from the bank, not actual control of your money. Bitcoin changes this.",
        "Banks freeze accounts for many reasons — political pressure, legal disputes, or even technical errors. It happens to ordinary people."
      ]
    }
  },
  {
    id: 4,
    tag: "The Solution",
    color: "blue",
    icon: "₿",
    title: "What is Bitcoin?",
    body: [
      "Bitcoin was created in 2009 by a person (or group) using the name Satoshi Nakamoto. No one knows who Satoshi is — they've never been identified.",
      "Bitcoin is the first scarce digital money. Before Bitcoin, digital files could be copied infinitely. A digital dollar could be duplicated and spent twice. Bitcoin solved this — called the 'double-spend problem' — without needing a central authority.",
      "Think of Bitcoin like this: Email is to letters what Bitcoin is to money. Email let you send messages directly to anyone, anywhere, instantly, for free — without a postal service. Bitcoin lets you send value directly to anyone, anywhere, instantly, for almost free — without a bank.",
      "Bitcoin runs on a network of over 15,000 computers (called nodes) spread across 100+ countries. No single company, government, or person controls it. To shut it down, you'd have to shut down the internet itself.",
      "In 2010, a programmer named Laszlo Hanyecz paid 10,000 Bitcoin for two pizzas — the first real-world Bitcoin transaction. Those pizzas would be worth over $600 million today."
    ],
    choice: null
  },
  {
    id: 5,
    tag: "Key Facts",
    color: "accent",
    icon: "📊",
    title: "Bitcoin's fixed supply",
    body: [
      "Only 21 million Bitcoin will ever exist. This is written into Bitcoin's code and cannot be changed by anyone — not a government, not a developer, not even Satoshi.",
      "As of 2024, about 19.7 million Bitcoin have already been mined. The last Bitcoin will be mined around the year 2140.",
      "Bitcoin is divided into smaller units called satoshis (sats). 1 Bitcoin = 100,000,000 satoshis. You don't need to buy a whole Bitcoin — you can buy KES 100 worth.",
      "Compare this to the Kenyan shilling: the Central Bank of Kenya printed over 1 trillion shillings between 2020–2023. More money printed = each shilling buys less = your savings shrink. This is inflation.",
      "Bitcoin's fixed supply means it cannot be inflated. Historically, the price of Bitcoin has increased as demand grows and supply stays fixed — though it is very volatile in the short term."
    ],
    choice: {
      question: "Why does a fixed supply of 21 million make Bitcoin different from shillings?",
      options: [
        "Because Bitcoin is worth more per unit",
        "Because nobody can print more Bitcoin to reduce its value",
        "Because Bitcoin is backed by the US government"
      ],
      correct: 1,
      feedback: [
        "Worth per unit changes constantly — that's not the key property. Think about what controls the supply.",
        "Correct! No central bank can inflate Bitcoin. Its scarcity is enforced by code, not by the promises of politicians.",
        "Bitcoin has no government backing — that's actually the point. It doesn't need one."
      ]
    }
  },
  {
    id: 6,
    tag: "Key Facts",
    color: "green",
    icon: "⚡",
    title: "Sending Bitcoin: back to Amara",
    body: [
      "Remember Amara and her mum? Let's compare her options now.",
      "Bank transfer: KES 800 fee, 2–3 business days, requires both parties to have bank accounts.",
      "Mobile money: KES 150 fee, same day, requires both parties to have registered accounts.",
      "Bitcoin on-chain: ~KES 50 fee, ~10 minutes, requires only a phone and internet connection.",
      "Bitcoin via Lightning Network: ~KES 1 fee, ~3 seconds, works with any Lightning wallet globally.",
      "Amara's mum can receive Bitcoin with a free app like Phoenix Wallet. No bank account, no ID verification, no branch visit needed. This is why Bitcoin is considered critical financial infrastructure for Africa — where 57% of adults remain unbanked."
    ],
    choice: null
  }
];

// ─── LEVEL 2: How Bitcoin Works ────────────────────────────────────────────
export const level2Slides = [
  {
    id: 1,
    tag: "The Network",
    color: "blue",
    icon: "🌐",
    title: "The peer-to-peer network",
    body: [
      "Traditional money moves through a hub-and-spoke system: your bank → correspondent bank → their bank. Each hop adds fees, delays, and a party who can block or inspect your transaction.",
      "Bitcoin is peer-to-peer (P2P) — transactions go directly between participants, like handing someone cash in person, but digitally and globally.",
      "The Bitcoin network has over 15,000 public nodes (and many more private ones). Each node stores a complete copy of every Bitcoin transaction ever made — going back to 2009. This is called the blockchain.",
      "Because thousands of nodes each hold an identical copy, there is no single point of failure. You can't corrupt Bitcoin by attacking one server — you'd need to simultaneously overwrite the majority of all nodes worldwide.",
      "Anyone can run a node. You can download the entire Bitcoin blockchain (about 600GB as of 2024) on a regular computer and become part of the network. Running a node means you trust no one — you verify everything yourself."
    ],
    choice: null
  },
  {
    id: 2,
    tag: "Transactions",
    color: "accent",
    icon: "📤",
    title: "How a transaction works",
    body: [
      "When Amara sends Bitcoin to her mum, here's exactly what happens — step by step.",
      "Step 1 — Amara's wallet creates a transaction: 'Send 0.005 BTC from Amara's address to Mum's address.' This transaction is signed with Amara's private key (a secret number only she knows).",
      "Step 2 — The transaction is broadcast to the Bitcoin network. Thousands of nodes receive it within seconds. They check: does Amara actually have 0.005 BTC? Is the signature valid? If yes, they pass it along.",
      "Step 3 — The transaction sits in a waiting area called the mempool (memory pool). Miners pick transactions from the mempool to include in the next block.",
      "Step 4 — A miner adds the transaction to a block and solves a puzzle (more on this in Level 3). Once solved, the block is added to the blockchain.",
      "Step 5 — After 1–6 confirmations (each new block on top counts as a confirmation), the transaction is considered final. It cannot be reversed, deleted, or altered. Ever."
    ],
    choice: {
      question: "Amara sends Bitcoin to her mum, but the network goes down for 10 minutes. What happens?",
      options: [
        "The transaction is lost and she loses her Bitcoin",
        "The transaction waits in the mempool and confirms once the network recovers",
        "She needs to resend from the beginning"
      ],
      correct: 1,
      feedback: [
        "Bitcoin doesn't lose transactions. The mempool holds unconfirmed transactions until miners process them.",
        "Correct! The mempool is a buffer. Your transaction waits patiently until a miner picks it up — no data is ever lost.",
        "Resending would create a duplicate transaction. The original stays in the mempool and will confirm."
      ]
    }
  },
  {
    id: 3,
    tag: "The Ledger",
    color: "purple",
    icon: "📒",
    title: "The blockchain — a public ledger",
    body: [
      "Before Bitcoin, the problem with digital money was: who keeps the official record? If there's one record-keeper, they have power and can be corrupted.",
      "Bitcoin's solution: everyone keeps the record. The blockchain is a public ledger — every transaction ever made is visible to anyone. You can look up any Bitcoin transaction in history at websites like blockchair.com.",
      "The blockchain is structured as a chain of blocks. Each block contains: a list of ~2,000–3,000 transactions, a timestamp, and a reference to the previous block (called a hash). This links them in an unbreakable chain.",
      "If you tried to change a transaction from 5 years ago, you'd have to recompute every block since then — and do it faster than the entire rest of the network is building new blocks. This is computationally impossible with current hardware.",
      "Privacy note: Bitcoin addresses look like random strings (e.g., bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq). Your name is not attached to an address — but transactions are fully public. This is called pseudonymity, not anonymity."
    ],
    choice: null
  },
  {
    id: 4,
    tag: "Security",
    color: "green",
    icon: "🔐",
    title: "Private keys and ownership",
    body: [
      "In traditional banking, ownership is a database entry. The bank says '£500 belongs to John Smith' — and that's only as secure as the bank's database.",
      "In Bitcoin, ownership is cryptographic. Your Bitcoin belongs to whoever holds the private key — a 256-bit secret number. Holding the key IS owning the Bitcoin. There's no database to hack, no company to call if you forget your password.",
      "Every Bitcoin address has two keys: a public key (like your bank account number — share it freely) and a private key (like a PIN, but if anyone sees it, they can take everything — never share it).",
      "Private keys are usually represented as a 12 or 24-word 'seed phrase'. For example: 'witch collapse practice feed shame open despair creek road again ice least'. If you control these words, you control the Bitcoin. If you lose them, the Bitcoin is gone forever.",
      "This is why self-custody is both powerful and serious. 'Not your keys, not your coins' is the Bitcoin community's most important rule. Over 3.7 million Bitcoin — worth hundreds of billions of dollars — are estimated to be permanently lost because people lost their private keys."
    ],
    choice: {
      question: "You write your seed phrase on a piece of paper and store it safely at home. Your phone breaks. What happens to your Bitcoin?",
      options: [
        "It's lost — it was stored on the phone",
        "You contact Bitcoin support to recover it",
        "You use the seed phrase to restore your wallet on any new device"
      ],
      correct: 2,
      feedback: [
        "Bitcoin isn't stored on devices — it lives on the blockchain. Your keys just prove you control it.",
        "There is no Bitcoin support — the whole point is no central authority. But this means you also can't be locked out if you have your keys.",
        "Correct! Your seed phrase is the master key. Install any compatible Bitcoin wallet on a new phone, enter those 12–24 words, and your Bitcoin is fully restored."
      ]
    }
  },
  {
    id: 5,
    tag: "Wallets",
    color: "yellow",
    icon: "👛",
    title: "Bitcoin wallets — what they actually are",
    body: [
      "A common misconception: Bitcoin wallets don't actually store Bitcoin. Your Bitcoin always lives on the blockchain. A wallet stores your private keys and shows you your balance.",
      "Think of a wallet like a keychain. The keychain doesn't contain your house — it contains the key that unlocks your house. The house (your Bitcoin) always exists; the key just controls access.",
      "Types of wallets: Hot wallets are connected to the internet (phone apps like Phoenix, Muun, or Blue Wallet). Convenient for everyday spending but more exposed to hacking. Cold wallets are offline devices (like Ledger or Trezor hardware wallets). Safer for storing large amounts.",
      "Custodial vs non-custodial: On an exchange like Binance or Coinbase, they hold your private keys. You trust them like you trust a bank. In a non-custodial wallet like Blue Wallet, you hold your own keys. If they shut down, your Bitcoin is unaffected.",
      "For learning and small amounts: Use a free mobile hot wallet. For significant savings: Use a hardware wallet or extremely secure seed phrase storage. Never store large amounts on an exchange."
    ],
    choice: null
  },
  {
    id: 6,
    tag: "Big Picture",
    color: "accent",
    icon: "🌍",
    title: "Why this matters for Africa",
    body: [
      "Sub-Saharan Africa sends and receives over $48 billion in remittances per year — money sent home by workers abroad. The average fee is 8.2%, compared to Bitcoin Lightning's 0.01%.",
      "Kenya's inflation averaged 6–9% per year over the past decade — meaning savings in shillings buy less every year. Bitcoin's purchasing power has increased over any 4-year period in its history (though with significant volatility).",
      "El Salvador became the first country to make Bitcoin legal tender in 2021. The Central African Republic followed in 2022. These experiments show governments are beginning to take Bitcoin seriously as monetary infrastructure.",
      "In Nigeria, where the naira lost 70% of its value between 2023–2024, peer-to-peer Bitcoin trading surged as citizens sought to protect their savings.",
      "Bitcoin doesn't require ID, a credit score, or a physical address. A Masai herder in northern Kenya with a basic Android phone can hold and transfer value more securely than many people in wealthy countries with traditional banking."
    ],
    choice: {
      question: "What's the most important reason Bitcoin could help unbanked Africans?",
      options: [
        "It will make them rich quickly",
        "It lets anyone store and transfer value without permission from a bank or government",
        "It's backed by major financial institutions"
      ],
      correct: 1,
      feedback: [
        "Bitcoin can be volatile — get-rich-quick thinking leads to poor decisions. Focus on the utility.",
        "Correct! Financial sovereignty — the ability to control your own money without asking permission — is Bitcoin's core value for the unbanked.",
        "Bitcoin is explicitly designed to work without institutional backing. That's its entire point."
      ]
    }
  }
];
