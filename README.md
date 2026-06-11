# BitLearn ⚡

Bitcoin education through interactive games — built for hackathons.

## What's inside

```
bitlean/
├── src/                    React PWA (frontend)
│   ├── screens/
│   │   ├── Login.js        Auth screens
│   │   ├── Signup.js
│   │   ├── Dashboard.js    Player dashboard + progress
│   │   ├── LevelScreen.js  Shared level engine (story + quiz + badge)
│   │   ├── Level1.js       What is Money? (6 slides, 4 questions)
│   │   └── Level2.js       How Bitcoin Works (6 slides, 4 questions)
│   ├── data/
│   │   ├── story.js        All slide content (factual)
│   │   └── questions.js    10 L1 + 8 L2 questions with explanations
│   └── api.js              API client (connect to Go backend)
├── backend/
│   └── main.go             Go REST API (no external dependencies)
└── build/                  Production build (ready to deploy)
```

## Run locally

### React frontend
```bash
npm install
npm start          # dev server on :3000
```

### Go backend (optional — app works without it via localStorage)
```bash
cd backend
go run main.go     # API on :8080
```

To connect them:
```bash
echo "REACT_APP_API=http://localhost:8080" > .env
npm start
```

## Deploy (free)

```bash
# Deploy frontend to Vercel
npm install -g vercel
vercel --prod

# Or Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

## Level content

### Level 1 — What is Money?
- Amara's remittance story (Kenya → Kisumu)
- History of money and the Gold Standard
- Why banks are a problem (Imperial Bank collapse, 2015)
- What is Bitcoin? The double-spend problem
- Fixed supply of 21 million Bitcoin
- Comparing payment methods across Africa

### Level 2 — How Bitcoin Works
- Peer-to-peer network and nodes
- Step-by-step transaction lifecycle
- The blockchain as a public ledger
- Private keys and ownership
- Hot vs cold wallets, custodial vs self-custody
- Bitcoin and Africa (remittances, inflation hedge)

All content is factually accurate and sourced from Bitcoin documentation and publicly verified statistics.
