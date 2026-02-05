# 🔐 API Kulcsok Biztonságos Kezelése - ÚTMUTATÓ

## ⚠️ KRITIKUS BIZTONSÁGI FIGYELMEZTETÉS

A jelenlegi GitHub repository-ban **nyilvános API kulcsok** találhatók, amelyeket **AZONNAL** le kell cserélni!

### Érintett API kulcsok:
- ✅ **TomTom API**: `GR3PcgPZetBKeUBGF96U6VgEdt29lgtP`
- ✅ **OpenWeatherMap API**: `31fc3f965906a579bcfff1708d8887e0`
- ✅ **Google Maps API**: `AIzaSyC0Pp4TdH0zQGAJ_68Cg4FVyk-VU-wS6fA`

---

## 🚨 AZONNALI TEENDŐK (15 perc)

### 1. ÚJ API KULCSOK GENERÁLÁSA

#### TomTom Developer Portal
1. Lépj be: https://developer.tomtom.com/user/login
2. Navigálj: **My Dashboard** → **API Keys**
3. Kattints: **Create New Key**
4. Másold ki az új kulcsot

#### OpenWeatherMap
1. Lépj be: https://home.openweathermap.org/users/sign_in
2. Navigálj: **API keys** tab
3. Kattints: **Generate** vagy **Create Key**
4. Másold ki az új kulcsot

#### Google Cloud Platform
1. Lépj be: https://console.cloud.google.com/
2. Navigálj: **APIs & Services** → **Credentials**
3. Kattints: **Create Credentials** → **API Key**
4. **KRITIKUS**: Korlátozd az API kulcsot:
   - **Application restrictions**: HTTP referrers
   - Engedélyezett domének: `localhost:*`, `your-domain.com`
   - **API restrictions**: Maps JavaScript API, Geocoding API
5. Másold ki az új kulcsot

---

### 2. RÉGI KULCSOK TÖRLÉSE / LETILTÁSA

#### ⚠️ FONTOS: Először generálj új kulcsokat, aztán töröld a régieket!

**TomTom:**
- Dashboard → API Keys → Kattints a kulcsra → **Delete** vagy **Revoke**

**OpenWeatherMap:**
- API keys → Kattints a kulcs melletti **Delete** ikonra

**Google Maps:**
- Credentials → Kattints a kulcsra → **Delete API key**

---

### 3. KÖRNYEZETI VÁLTOZÓK BEÁLLÍTÁSA

#### Lokális fejlesztés:

```bash
# 1. Másold át az .env.example fájlt
cp .env.example .env

# 2. Szerkeszd meg a .env fájlt (VS Code / nano / vim)
nano .env

# 3. Illeszd be az ÚJ API kulcsokat:
VITE_TOMTOM_API_KEY=your_new_tomtom_key
VITE_OPENWEATHER_API_KEY=your_new_openweather_key
VITE_GOOGLE_MAPS_API_KEY=your_new_google_maps_key
```

**Ellenőrzés:**
```bash
# .env fájl SOHA ne kerüljön Git-re
git status
# Az .env fájl nem szerepelhet az "Untracked files" listán
```

---

### 4. GIT HISTORY TISZTÍTÁSA (KRITIKUS!)

A régi API kulcsok még mindig ott vannak a Git történetben!

#### Opció A: BFG Repo-Cleaner (ajánlott, gyors)

```bash
# 1. Telepítsd a BFG-t
brew install bfg  # macOS
# vagy töltsd le: https://rtyley.github.io/bfg-repo-cleaner/

# 2. Készíts backup-ot!
cp -r Projekt-Dashboard Projekt-Dashboard-BACKUP

# 3. Töröld a kulcsokat a történetből
cd Projekt-Dashboard
bfg --replace-text sensitive-data.txt

# 4. sensitive-data.txt tartalma:
# GR3PcgPZetBKeUBGF96U6VgEdt29lgtP
# 31fc3f965906a579bcfff1708d8887e0
# AIzaSyC0Pp4TdH0zQGAJ_68Cg4FVyk-VU-wS6fA

# 5. Git history újraírása
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 6. Force push
git push origin --force --all
```

#### Opció B: git filter-branch (lassabb, de beépített)

```bash
# Figyelem: Ez TÖRLI az összes korábbi commit-ot a fájlból!
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch Szazhalombatta_Dashboard_v20.html" \
  --prune-empty --tag-name-filter cat -- --all

git reflog expire --expire=now --all
git gc --prune=now --aggressive

git push origin --force --all
```

---

## 📁 ÚJ FÁJLSTRUKTÚRA

```
Projekt-Dashboard/
├── .env                          # ❌ NEM kerül Git-re (.gitignore védi)
├── .env.example                  # ✅ Git-re kerül (példa sablon)
├── .gitignore                    # ✅ Védi a .env fájlt
├── README.md
├── index.html                    # Refactored verzió
├── assets/
│   ├── css/
│   │   └── main.css              # Szétválasztott CSS
│   ├── js/
│   │   ├── config/
│   │   │   └── api-config.js     # ✅ API kulcsok beolvasása
│   │   ├── modules/
│   │   │   ├── mobility.js
│   │   │   ├── weather.js
│   │   │   └── ...
│   │   └── app.js                # Fő JS fájl
│   └── images/
└── docs/
    └── SECURITY.md               # Ez a fájl
```

---

## 🔧 HASZNÁLAT

### Fejlesztés közben:

```bash
# 1. Klónozd a repo-t
git clone https://github.com/bojtiferenc/Projekt-Dashboard.git
cd Projekt-Dashboard

# 2. Hozd létre a .env fájlt
cp .env.example .env

# 3. Töltsd ki a saját API kulcsaiddal
nano .env

# 4. Indítsd el a fejlesztői szervert
python -m http.server 8000
# vagy
npx http-server -p 8000

# 5. Nyisd meg: http://localhost:8000
```

### Új csapattagok bevonása:

```markdown
Szia! Üdv a projektben. 

A dashboard használatához szükséged lesz saját API kulcsokra:
1. Generálj kulcsokat: TomTom, OpenWeather, Google Maps (lásd README)
2. Másold át: `cp .env.example .env`
3. Töltsd ki a .env fájlt az API kulcsaiddal
4. Soha ne add hozzá a .env fájlt a Git-hez!
```

---

## 🚀 DEPLOYMENT (GitHub Pages / Cloudflare Pages)

### GitHub Pages:

**Probléma:** GitHub Pages statikus, nem tudja beolvasni a .env fájlt.

**Megoldás:** GitHub Secrets használata

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build with env vars
        env:
          VITE_TOMTOM_API_KEY: ${{ secrets.TOMTOM_API_KEY }}
          VITE_OPENWEATHER_API_KEY: ${{ secrets.OPENWEATHER_API_KEY }}
          VITE_GOOGLE_MAPS_API_KEY: ${{ secrets.GOOGLE_MAPS_API_KEY }}
        run: |
          npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**GitHub Secrets beállítása:**
1. Repo → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret**
3. Add hozzá: `TOMTOM_API_KEY`, `OPENWEATHER_API_KEY`, `GOOGLE_MAPS_API_KEY`

---

### Cloudflare Pages (ajánlott):

```bash
# 1. Cloudflare Dashboard → Pages → Create a project
# 2. Connect GitHub repository
# 3. Build settings:
#    - Build command: npm run build
#    - Build output: dist
# 4. Environment variables:
#    VITE_TOMTOM_API_KEY=your_key
#    VITE_OPENWEATHER_API_KEY=your_key
#    VITE_GOOGLE_MAPS_API_KEY=your_key
```

---

## ✅ ELLENŐRZÉSI CHECKLIST

- [ ] Új API kulcsok generálva (TomTom, OpenWeather, Google Maps)
- [ ] Google Maps API kulcs korlátozva (domain + API restrictions)
- [ ] Régi API kulcsok törölve / letiltva
- [ ] .env fájl létrehozva és kitöltve
- [ ] .gitignore fájl hozzáadva a repo-hoz
- [ ] .env.example fájl Git-re commit-olva
- [ ] Git history megtisztítva (BFG vagy filter-branch)
- [ ] Force push végrehajtva
- [ ] GitHub Secrets beállítva (ha GitHub Pages-t használsz)
- [ ] Deployment tesztelve (nincs API kulcs error)

---

## 📞 SEGÍTSÉG

**Problémák esetén:**
- Nézd meg a böngésző konzolt (F12)
- Ellenőrizd, hogy a .env fájl létezik
- Ellenőrizd, hogy a környezeti változók betöltődnek (console.log)
- Teszteld az API kulcsokat külön-külön (pl. Postman-nel)

**Ferenc elérhetősége:**
- GitHub: [@bojtiferenc](https://github.com/bojtiferenc)

---

**Utolsó frissítés:** 2025. február 5.  
**Készítette:** Nándor (UX/UI Developer) + Ferenc
