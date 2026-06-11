# BitLearn Go Backend

A lightweight REST API for user auth, progress tracking, and question serving.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/signup | Create account (name, email, password) |
| POST | /api/login | Login → returns user object |
| POST | /api/progress | Update XP, completed levels, badges |
| GET | /api/questions?level=1&count=4 | Get shuffled questions for a level |
| GET | /health | Health check |

## Run

```bash
cd backend
go run main.go
# API starts on :8080
```

## Build for production

```bash
go build -o bitlean-api main.go
./bitlean-api
```

## Notes

- In-memory storage (data resets on restart). For production, swap for PostgreSQL or SQLite.
- The React frontend uses localStorage by default. To use the Go backend, set REACT_APP_API=http://localhost:8080 in your .env.
