// ─── LEVEL 1 QUIZ — What is Money? ──────────────────────────────────────────
export const level1Questions = [
  {
    id: 1,
    question: "What are the 6 properties of good money?",
    options: [
      "Fast, free, digital, secure, popular, legal",
      "Scarce, durable, divisible, portable, fungible, hard to counterfeit",
      "Backed by gold, government-issued, bank-approved, taxed, regulated",
      "Paper, metal, digital, rare, shiny, old"
    ],
    answer: 1,
    explanation: "Good money needs to be scarce (limited supply), durable (doesn't decay), divisible (split into units), portable (easy to move), fungible (each unit equal), and hard to counterfeit. Bitcoin satisfies all 6 — arguably better than any money in history."
  },
  {
    id: 2,
    question: "In 1971, the US ended the Gold Standard. What did this mean?",
    options: [
      "Gold became worthless",
      "The US dollar was now backed by oil instead",
      "Governments could print unlimited money without any gold backing",
      "Bitcoin became the new global currency"
    ],
    answer: 2,
    explanation: "Before 1971, every US dollar represented a claim on a fixed amount of gold. After Nixon ended the Gold Standard, dollars became pure 'fiat' — backed only by government decree. This enabled unlimited money printing and is a root cause of inflation."
  },
  {
    id: 3,
    question: "What problem did Bitcoin solve that made digital money possible?",
    options: [
      "How to make money look good on a screen",
      "The double-spend problem — stopping someone from copying and spending digital money twice",
      "How to store money on a hard drive",
      "How to make banks work faster"
    ],
    answer: 1,
    explanation: "Digital files can be copied infinitely. A digital '$10' could be duplicated and spent a million times. Bitcoin solved this without a central authority — using a public ledger verified by thousands of computers simultaneously. This was a historic breakthrough."
  },
  {
    id: 4,
    question: "Why is Bitcoin's 21 million supply cap significant?",
    options: [
      "It means Bitcoin is very expensive",
      "It prevents inflation — no one can print more Bitcoin to dilute its value",
      "It means only 21 million people can use Bitcoin",
      "It was chosen randomly by Satoshi"
    ],
    answer: 1,
    explanation: "Scarcity is fundamental to value. Gold is valuable partly because there's a limited amount. Bitcoin's 21 million cap is enforced by code — no government, bank, or developer can ever change it. This makes Bitcoin mathematically inflation-proof."
  },
  {
    id: 5,
    question: "What does 'permissionless' mean in the context of Bitcoin?",
    options: [
      "Bitcoin transactions are anonymous and untraceable",
      "Anyone can use Bitcoin without approval from any authority",
      "Miners approve all transactions before they go through",
      "Bitcoin is free to use — no fees ever"
    ],
    answer: 1,
    explanation: "To open a bank account, you need ID, a physical address, and the bank's approval. To use Bitcoin, you need only a phone and internet. No ID, no application, no permission. This is revolutionary for the 1.4 billion unbanked adults worldwide."
  },
  {
    id: 6,
    question: "What is 1 satoshi?",
    options: [
      "The name of Bitcoin's creator",
      "The smallest unit — one hundred-millionth of a Bitcoin (0.00000001 BTC)",
      "A Japanese Bitcoin exchange",
      "The first block mined on the Bitcoin network"
    ],
    answer: 1,
    explanation: "1 Bitcoin = 100,000,000 satoshis. This divisibility is crucial — you don't need to buy a whole Bitcoin. You could buy 1,000 satoshis (about KES 5) and start using Bitcoin immediately. Named after Bitcoin's pseudonymous creator, Satoshi Nakamoto."
  },
  {
    id: 7,
    question: "What happened to depositors when Kenya's Imperial Bank collapsed in 2015?",
    options: [
      "The government immediately refunded all deposits",
      "Their accounts were frozen for years — money was inaccessible",
      "Bitcoin saved them by converting their deposits automatically",
      "The bank merged with a bigger bank and everyone got paid"
    ],
    answer: 1,
    explanation: "When Imperial Bank was placed under receivership, depositors had their funds frozen for years. This illustrates the risk of custodial financial systems — when the institution fails, you lose access to your 'own' money. Self-custody in Bitcoin prevents this."
  },
  {
    id: 8,
    question: "What is the Lightning Network?",
    options: [
      "A fast internet connection for downloading Bitcoin",
      "A layer built on top of Bitcoin for instant, near-free small payments",
      "An exchange for trading Bitcoin quickly",
      "The mining hardware used to create new Bitcoin"
    ],
    answer: 1,
    explanation: "The Lightning Network is a 'Layer 2' built on top of Bitcoin. It enables instant payments for fractions of a cent — perfect for everyday transactions like buying coffee or sending money across Africa. On-chain Bitcoin is better for larger, final settlements."
  },
  {
    id: 9,
    question: "The average fee for sending money across Africa is 8.2%. What is Bitcoin Lightning's fee?",
    options: ["3–4%", "0.5–1%", "About 0.01% (fractions of a cent)", "Zero — it's always free"],
    answer: 2,
    explanation: "Remittance fees across Africa average 8.2% — meaning $82 lost on every $1,000 sent home. Bitcoin Lightning fees are typically 0.01% or less. On a $1,000 transfer, that's the difference between paying $82 and paying $0.10. This is why Lightning is transformative for African remittances."
  },
  {
    id: 10,
    question: "Who created Bitcoin and when?",
    options: [
      "Elon Musk, in 2010",
      "A group of banks, in 2000",
      "Satoshi Nakamoto (unknown identity), in 2009",
      "The US government, in 2008"
    ],
    answer: 2,
    explanation: "Bitcoin was created by someone using the pseudonym Satoshi Nakamoto in 2009. Their true identity remains unknown. Satoshi published the Bitcoin whitepaper in 2008 and disappeared from the internet in 2010. They are estimated to hold ~1 million BTC, which they have never moved."
  }
];

// ─── LEVEL 2 QUIZ — How Bitcoin Works ───────────────────────────────────────
export const level2Questions = [
  {
    id: 101,
    question: "What is the mempool?",
    options: [
      "Where Bitcoin is mined and stored",
      "A waiting area for unconfirmed transactions before miners include them in a block",
      "The pool of computers that run the Bitcoin network",
      "A type of Bitcoin wallet"
    ],
    answer: 1,
    explanation: "Every Bitcoin transaction first enters the mempool (memory pool) — a temporary holding area across all nodes. Miners choose which transactions to include in the next block, usually prioritizing those with higher fees. High demand = full mempool = higher fees needed to get confirmed quickly."
  },
  {
    id: 102,
    question: "What is a Bitcoin node?",
    options: [
      "The device you use to send Bitcoin",
      "A mining machine that creates new Bitcoin",
      "A computer that stores a complete copy of the blockchain and verifies all transactions",
      "A type of Bitcoin address"
    ],
    answer: 2,
    explanation: "A node is any computer running Bitcoin software with the full blockchain. Nodes verify every transaction against Bitcoin's rules — without trusting anyone. If a miner tries to cheat, nodes reject it. Running your own node gives you maximum security and privacy."
  },
  {
    id: 103,
    question: "What does a Bitcoin transaction confirmation mean?",
    options: [
      "A bank has approved the payment",
      "Satoshi Nakamoto has verified the transaction",
      "A new block has been added on top of the block containing your transaction",
      "The recipient has accepted the payment"
    ],
    answer: 2,
    explanation: "Each confirmation = one new block added on top of yours. After 1 confirmation, the transaction is in the blockchain. After 6 confirmations (about 1 hour), it's considered irreversible. Large transfers often wait for 6 confirmations for security. Lightning payments, by contrast, are instant."
  },
  {
    id: 104,
    question: "What is pseudonymity in Bitcoin?",
    options: [
      "All transactions are completely private and invisible",
      "Bitcoin addresses don't contain your real name, but all transactions are publicly visible",
      "Only miners know who sent a transaction",
      "Bitcoin uses fake names to protect users"
    ],
    answer: 1,
    explanation: "Bitcoin is pseudonymous — not anonymous. Your name isn't attached to an address, but every transaction is public on the blockchain. With enough analysis, transactions can potentially be linked to real identities. This is why privacy tools like CoinJoin exist for those who need stronger privacy."
  },
  {
    id: 105,
    question: "What is a seed phrase?",
    options: [
      "A password to log into your Bitcoin wallet app",
      "A 12–24 word backup that contains your private keys — controls all your Bitcoin",
      "A code sent by SMS to verify your identity",
      "The first 12 digits of your Bitcoin address"
    ],
    answer: 1,
    explanation: "A seed phrase (or recovery phrase) is 12–24 words generated when you create a wallet. It mathematically encodes your private keys. Anyone with your seed phrase controls your Bitcoin. Store it offline, never digitally, never share it. If your device breaks, your seed phrase restores everything on any device."
  },
  {
    id: 106,
    question: "What is the difference between a hot wallet and a cold wallet?",
    options: [
      "Hot wallets hold more Bitcoin; cold wallets hold less",
      "Hot wallets are faster; cold wallets are slower to open",
      "Hot wallets are internet-connected (convenient but riskier); cold wallets are offline (safer for large amounts)",
      "Hot wallets charge fees; cold wallets are free"
    ],
    answer: 2,
    explanation: "Hot wallet = connected to internet (phone apps like Blue Wallet, Phoenix). More convenient, slightly more attack surface. Cold wallet = offline hardware device (Ledger, Trezor). Your private keys never touch the internet — much harder to hack. For large savings: cold wallet. For daily spending: hot wallet."
  },
  {
    id: 107,
    question: "What does 'not your keys, not your coins' mean?",
    options: [
      "Always keep your private keys physically locked away",
      "If an exchange or third party holds your private keys, they — not you — truly control your Bitcoin",
      "You must own the Bitcoin hardware to spend it",
      "Only original Bitcoin from 2009 is truly authentic"
    ],
    answer: 1,
    explanation: "When you buy Bitcoin on Coinbase or Binance, you see a balance — but they hold the private keys. If they get hacked (FTX lost $8 billion in 2022), get regulated out of existence, or freeze withdrawals, you can lose access. Self-custody with your own keys removes this risk."
  },
  {
    id: 108,
    question: "Why can't Bitcoin transactions be reversed?",
    options: [
      "Because Bitcoin is too slow to process reversals",
      "Because the government hasn't built the system for it yet",
      "Because the blockchain is an immutable chain — changing one block would require redoing all subsequent blocks faster than the entire network",
      "Because Bitcoin wallets don't have a 'reverse' button"
    ],
    answer: 2,
    explanation: "Immutability comes from the chain structure. To alter a confirmed transaction, you'd have to redo the proof-of-work for that block AND every block since — while outpacing the entire global mining network simultaneously. This is computationally impossible. This is why you should always double-check recipient addresses before sending."
  }
];

// ─── QUESTION ROTATION HELPERS ──────────────────────────────────────────────
const getShuffled = (pool, storageKey) => {
  const seen = JSON.parse(localStorage.getItem(storageKey) || '[]');
  const available = pool.filter(q => !seen.includes(q.id));
  const source = available.length >= 4 ? available : pool;
  if (available.length < 4) localStorage.removeItem(storageKey);
  const shuffled = [...source].sort(() => Math.random() - 0.5);
  const picked = shuffled.slice(0, 4);
  const newSeen = [...new Set([...seen, ...picked.map(q => q.id)])];
  localStorage.setItem(storageKey, JSON.stringify(newSeen));
  return picked;
};

export const getLevel1Questions = () => getShuffled(level1Questions, 'bl_seen_l1');
export const getLevel2Questions = () => getShuffled(level2Questions, 'bl_seen_l2');
