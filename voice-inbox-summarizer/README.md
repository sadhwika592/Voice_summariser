
# Voice Inbox – AI Call Summarizer

Upload a voice note or call recording. The app transcribes it using Whisper and summarizes it using OpenAI’s GPT.

## Tech Stack
- Node.js, Express, TypeScript
- React, Tailwind CSS
- Python + Whisper (OpenAI)
- GPT-3.5 via OpenAI API

## Getting Started

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Add your OpenAI key to .env
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Python (Whisper)
```bash
pip install openai-whisper
# Whisper model will download on first run
```

## License
MIT © 2025 Sadhwika Rachamalla
