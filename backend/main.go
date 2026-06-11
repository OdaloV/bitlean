package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"sync"
	"time"
)

// ─── Models ──────────────────────────────────────────────────────────────────

type User struct {
	ID              int64    `json:"id"`
	Name            string   `json:"name"`
	Email           string   `json:"email"`
	Password        string   `json:"password,omitempty"`
	XP              int      `json:"xp"`
	Level           int      `json:"level"`
	CompletedLevels []int    `json:"completedLevels"`
	Badges          []Badge  `json:"badges"`
	Streak          int      `json:"streak"`
	LastActive      string   `json:"lastActive"`
}

type Badge struct {
	Icon string `json:"icon"`
	Name string `json:"name"`
	When string `json:"when"`
}

type Question struct {
	ID          int      `json:"id"`
	Level       int      `json:"level"`
	Question    string   `json:"question"`
	Options     []string `json:"options"`
	Answer      int      `json:"answer"`
	Explanation string   `json:"explanation"`
}

type ProgressUpdate struct {
	UserID  int64   `json:"userId"`
	LevelID int     `json:"levelId"`
	XP      int     `json:"xp"`
	Badge   *Badge  `json:"badge,omitempty"`
}

// ─── In-memory store ─────────────────────────────────────────────────────────

var (
	mu      sync.RWMutex
	users   = map[int64]*User{}
	byEmail = map[string]int64{}
)

// ─── Question bank (factual, Bitcoin-accurate) ───────────────────────────────

var questions = []Question{
	// Level 1 — What is Money?
	{1, 1, "What are the 6 core properties of good money?",
		[]string{
			"Fast, free, digital, secure, popular, legal",
			"Scarce, durable, divisible, portable, fungible, hard to counterfeit",
			"Backed by gold, government-issued, bank-approved, taxed, regulated",
			"Paper, metal, digital, rare, shiny, old",
		}, 1,
		"Good money is scarce (limited supply), durable (doesn't decay), divisible (splits into units), portable, fungible (each unit identical), and hard to counterfeit. Bitcoin satisfies all 6."},
	{2, 1, "What did the end of the US Gold Standard in 1971 mean?",
		[]string{
			"Gold became worthless overnight",
			"The US dollar was now backed by oil",
			"Governments could print unlimited money without gold backing",
			"Bitcoin became the default global reserve",
		}, 2,
		"Before 1971, every dollar represented a gold claim. After Nixon ended the Gold Standard, dollars became pure 'fiat' — backed only by government decree. This enabled unlimited money printing, driving inflation worldwide."},
	{3, 1, "What is the double-spend problem that Bitcoin solved?",
		[]string{
			"How to make Bitcoin transactions cheaper",
			"How to stop someone copying digital money and spending it twice",
			"How to store Bitcoin safely on a hard drive",
			"How to speed up international bank transfers",
		}, 1,
		"Digital files can be copied infinitely. A digital '$10' could be duplicated and spent a million times. Bitcoin solved this without a central authority — via a public ledger verified by thousands of computers simultaneously. A historic breakthrough."},
	{4, 1, "Why is Bitcoin's 21 million supply cap significant?",
		[]string{
			"It means Bitcoin is very expensive per unit",
			"It prevents inflation — no one can ever print more Bitcoin",
			"Only 21 million people will ever use Bitcoin",
			"Satoshi chose it randomly",
		}, 1,
		"Scarcity is fundamental to value. Bitcoin's 21M cap is enforced by code — no government, bank, or developer can change it. This makes Bitcoin mathematically inflation-proof, unlike any national currency in history."},
	{5, 1, "What is 1 satoshi?",
		[]string{
			"The name of Bitcoin's creator",
			"One hundred-millionth of a Bitcoin (0.00000001 BTC)",
			"A Japanese Bitcoin exchange",
			"The first block ever mined",
		}, 1,
		"1 Bitcoin = 100,000,000 satoshis. This divisibility is crucial — you don't need to buy a whole Bitcoin. Named after the pseudonymous creator Satoshi Nakamoto, who has never been identified."},
	// Level 2 — How Bitcoin Works
	{101, 2, "What is the mempool?",
		[]string{
			"Where mined Bitcoin is permanently stored",
			"A waiting area for unconfirmed transactions before miners include them in a block",
			"The pool of computers running the Bitcoin network",
			"A type of Bitcoin wallet for developers",
		}, 1,
		"The mempool (memory pool) holds unconfirmed transactions across all nodes. Miners pick transactions — usually prioritising higher fees. High demand = full mempool = higher fees to confirm quickly. During quiet periods, fees drop significantly."},
	{102, 2, "What is a Bitcoin full node?",
		[]string{
			"The device used to send Bitcoin",
			"A mining rig that creates new Bitcoin blocks",
			"A computer storing the complete blockchain and independently verifying all transactions",
			"A type of Bitcoin address format",
		}, 2,
		"A full node stores every Bitcoin transaction since 2009 and verifies all new ones against the rules — trusting no one. Over 15,000 public nodes exist globally. Running your own gives maximum security and privacy."},
	{103, 2, "What does a transaction confirmation mean?",
		[]string{
			"A bank has approved the payment",
			"Satoshi Nakamoto has manually verified it",
			"A new block has been added on top of the block containing your transaction",
			"The recipient has accepted the funds",
		}, 2,
		"Each confirmation = one new block on top of yours. After 6 confirmations (~1 hour), a transaction is considered practically irreversible. Lightning payments skip this wait entirely — they settle in milliseconds."},
	{104, 2, "What is a seed phrase?",
		[]string{
			"A password to log into your wallet app",
			"A 12–24 word backup encoding your private keys — controls all your Bitcoin",
			"An SMS verification code for identity",
			"The first 12 characters of your Bitcoin address",
		}, 1,
		"A seed phrase mathematically encodes your private keys. Anyone with your seed phrase controls your Bitcoin. Store it offline, never photographed or in cloud storage, never shared with anyone. It can restore your wallet on any device after loss or damage."},
	{105, 2, "What does 'not your keys, not your coins' mean?",
		[]string{
			"Always physically lock your hardware wallet",
			"If an exchange holds your private keys, they — not you — truly control your Bitcoin",
			"You must own the Bitcoin mining hardware to use the network",
			"Only Bitcoin from 2009 is considered authentic",
		}, 1,
		"When you buy Bitcoin on Coinbase or Binance, they hold the keys. FTX collapsed in 2022, losing $8 billion of customer funds. Self-custody with your own keys removes counterparty risk entirely — your Bitcoin exists as long as you hold the keys."},
}

func getQuestionsForLevel(level, count int) []Question {
	var pool []Question
	for _, q := range questions {
		if q.Level == level {
			pool = append(pool, q)
		}
	}
	rand.Shuffle(len(pool), func(i, j int) { pool[i], pool[j] = pool[j], pool[i] })
	if count > len(pool) {
		count = len(pool)
	}
	return pool[:count]
}

// ─── HTTP helpers ─────────────────────────────────────────────────────────────

func json200(w http.ResponseWriter, v any) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(v)
}

func jsonErr(w http.ResponseWriter, msg string, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(map[string]string{"error": msg})
}

func cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			return
		}
		next.ServeHTTP(w, r)
	})
}

// ─── Handlers ────────────────────────────────────────────────────────────────

func handleSignup(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		jsonErr(w, "method not allowed", 405); return
	}
	var body struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		jsonErr(w, "invalid JSON", 400); return
	}
	if body.Name == "" || body.Email == "" || body.Password == "" {
		jsonErr(w, "name, email and password required", 400); return
	}
	mu.Lock()
	defer mu.Unlock()
	if _, exists := byEmail[body.Email]; exists {
		jsonErr(w, "email already registered", 409); return
	}
	id := time.Now().UnixMilli()
	u := &User{
		ID: id, Name: body.Name, Email: body.Email, Password: body.Password,
		XP: 0, Level: 1, CompletedLevels: []int{}, Badges: []Badge{}, Streak: 0,
		LastActive: time.Now().Format("2006-01-02"),
	}
	users[id] = u
	byEmail[body.Email] = id
	out := *u; out.Password = ""
	json200(w, out)
}

func handleLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		jsonErr(w, "method not allowed", 405); return
	}
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		jsonErr(w, "invalid JSON", 400); return
	}
	mu.RLock()
	defer mu.RUnlock()
	id, ok := byEmail[body.Email]
	if !ok {
		jsonErr(w, "invalid email or password", 401); return
	}
	u := users[id]
	if u.Password != body.Password {
		jsonErr(w, "invalid email or password", 401); return
	}
	out := *u; out.Password = ""
	json200(w, out)
}

func handleProgress(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		jsonErr(w, "method not allowed", 405); return
	}
	var body ProgressUpdate
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		jsonErr(w, "invalid JSON", 400); return
	}
	mu.Lock()
	defer mu.Unlock()
	u, ok := users[body.UserID]
	if !ok {
		jsonErr(w, "user not found", 404); return
	}
	// Avoid double-counting
	alreadyDone := false
	for _, l := range u.CompletedLevels {
		if l == body.LevelID { alreadyDone = true; break }
	}
	if !alreadyDone {
		u.XP += body.XP
		u.CompletedLevels = append(u.CompletedLevels, body.LevelID)
		u.Streak++
		u.LastActive = time.Now().Format("2006-01-02")
		if body.Badge != nil {
			u.Badges = append(u.Badges, *body.Badge)
		}
	}
	out := *u; out.Password = ""
	json200(w, out)
}

func handleQuestions(w http.ResponseWriter, r *http.Request) {
	level := 1
	count := 4
	if v := r.URL.Query().Get("level"); v != "" {
		fmt.Sscan(v, &level)
	}
	if v := r.URL.Query().Get("count"); v != "" {
		fmt.Sscan(v, &count)
	}
	qs := getQuestionsForLevel(level, count)
	json200(w, qs)
}

func handleHealth(w http.ResponseWriter, r *http.Request) {
	json200(w, map[string]string{"status": "ok", "service": "bitlean-api"})
}

// ─── Main ─────────────────────────────────────────────────────────────────────

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/signup",    handleSignup)
	mux.HandleFunc("/api/login",     handleLogin)
	mux.HandleFunc("/api/progress",  handleProgress)
	mux.HandleFunc("/api/questions", handleQuestions)
	mux.HandleFunc("/health",        handleHealth)

	port := ":8080"
	log.Printf("BitLearn API running on %s", port)
	log.Fatal(http.ListenAndServe(port, cors(mux)))
}
