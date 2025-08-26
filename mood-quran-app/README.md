# Mood-Based Quran & Hadith Finder

A professional single-page app to surface Quran verses or Sahih Hadiths based on the user's mood, with a premium Islamic UI and smooth animations.

## Tech Stack
- Frontend: React 18, Vite, Tailwind CSS, Framer Motion, Lucide
- Backend: Flask, OpenAI API, dataset.json, CORS

## Monorepo Layout
```
mood-quran-app/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── backend/
    ├── app.py
    ├── dataset.json
    └── requirements.txt
```

## Prerequisites
- Node.js 18+
- Python 3.10+
- OpenAI API key (optional, for AI fallback)

## Backend Setup
1. Create virtual environment and install dependencies:
```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r backend/requirements.txt
```

2. Create `.env` in `backend/` (optional):
```env
OPENAI_API_KEY=your_key
OPENAI_MODEL=gpt-4o-mini
PORT=5001
```

3. Run the API:
```bash
python backend/app.py
```

Endpoints:
- GET `/api/health`
- POST `/api/get_verse` body: `{ "mood": "dukhi" }`

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Vite dev server: `http://localhost:5173` (proxy to backend `/api`).

Build for production:
```bash
npm run build
npm run preview
```

## Deployment
- Frontend (Vercel):
```bash
npm run build
vercel --prod
```
- Backend (Render/Heroku):
```bash
pip install -r backend/requirements.txt
python backend/app.py
```

## Notes
- The app prefers local `dataset.json` mappings for quick results.
- If a mood is not in the dataset and OpenAI is configured, the backend requests an authentic verse or hadith and returns JSON.
- Fonts: Amiri (Arabic), Noto Nastaliq Urdu (Urdu), Inter (UI).

## Testing Checklist
- Dropdown mood selection works
- API calls successful for all moods
- Flashcard animation smooth
- Mobile responsive design
- Arabic/Urdu fonts display correctly
- Loading states work properly
- Error handling for failed API calls
- OpenAI API integration functional