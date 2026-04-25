# TN 2026 Election Predictor — React Dashboard

A cinematic, dark-themed ML prediction dashboard for the Tamil Nadu 2026 Assembly Election.
Built with React 18 + Recharts. Ready to deploy on Netlify.

---

## 🚀 Deploy to Netlify (quickest: drag & drop)

1. On your machine run:
   ```bash
   npm install
   npm run build
   ```
2. Go to https://app.netlify.com/drop
3. Drag the generated `build/` folder onto the page → live URL instantly!

### Option 2 — GitHub + Netlify CI
1. Push this folder to a GitHub repo
2. app.netlify.com → "Add new site" → "Import from Git"
3. Build command: `npm run build`  |  Publish dir: `build`
4. Click **Deploy** — done.

---

## 🛠 Local Development

```bash
npm install
npm start        # http://localhost:3000
```

---

## 📁 Project Structure

```
src/
├── App.js
├── data.js           ← all election data
├── index.js
├── index.css         ← design tokens & animations
└── components/
    ├── Ticker.js
    ├── Header.js
    ├── NavTabs.js
    ├── PredictionsTab.js
    ├── PartiesTab.js
    ├── FeaturesTab.js
    ├── ModelsTab.js
    ├── HistoryTab.js
    └── Footer.js
```

---

## ⚠️ Data notice
All data is synthetic/simulated. No real ECI per-constituency dataset is embedded.
