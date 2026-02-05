# 🏙️ Százhalombatta Smart City Dashboard

> **Átfogó okosváros információs rendszer** – Valós idejű adatok, interaktív vizualizációk és közösségi funkciók egy modern, reszponzív felületen.

![Smart City](https://img.shields.io/badge/Smart%20City-Platform-blue)
![Status](https://img.shields.io/badge/Status-Active-success)
![Version](https://img.shields.io/badge/Version-20.0-brightgreen)

---

## 📋 Tartalomjegyzék

- [Áttekintés](#áttekintés)
- [Dashboard modulok](#dashboard-modulok)
- [Technológiai stack](#technológiai-stack)
- [API integráció](#api-integráció)
- [Telepítés](#telepítés)
- [Design rendszer](#design-rendszer)
- [Funkciók részletesen](#funkciók-részletesen)
- [Jövőbeli fejlesztések](#jövőbeli-fejlesztések)

---

## 🎯 Áttekintés

A **Százhalombatta Smart City Dashboard** egy komplex városi információs rendszer, amely **11 fő modult** integrál egyetlen központi felületen. A rendszer célja, hogy a lakosok, vállalkozások és önkormányzati szereplők egyaránt hozzáférjenek a város legfontosabb adataihoz valós időben.

### Főbb jellemzők

✅ **Real-time adatok** – Élő forgalmi, időjárási és környezeti információk  
✅ **6 smart city pillér** – Economy, People, Governance, Mobility, Environment, Living  
✅ **Interaktív térképek** – Google Maps és Leaflet.js alapú vizualizáció  
✅ **Reszponzív design** – Desktop, tablet és mobil nézetek  
✅ **Glassmorphism UI** – Modern, antracit színvilágú felület  
✅ **Moduláris felépítés** – Testreszabható, kitűzhető csempék (mosaic cards)  

---

## 🧩 Dashboard modulok

A dashboard **11 független modult** tartalmaz, amelyek külön oldalakként vagy csempeként jelennek meg:

### 1. 🏠 Áttekintés (Overview)

**Cél:** Gyors snapshot a város állapotáról

**Funkciók:**
- **KPI kártyák:** Valós idejű adatok (forgalom, parkolók, légminőség, hőmérséklet)
- **Radar diagram:** 6 okosváros pillér értékelése (Economy, People, Governance, Mobility, Environment, Living)
- **Hírfolyamok (News Ticker):** 4 kategória rotációja (Közlekedés, Városfejlesztés, Szolgáltatások, Értesítések)
- **Gyors linkek:** 6 pillér egyenkénti elérése
- **Interaktív térkép:** Élő adatpontok (torlódások, parkolók, közintézmények)
- **Környezeti adatok:** Napsütés, szélsebesség, páratartalom
- **Hírek & Események:** Legfrissebb városi hírek időbélyeggel

**Design:**
- Mosaic grid layout (kitűzhető kártyák)
- Élő animációk (pulsáló pontok)
- 3 hírfolyam típus (slideshow rotáció)

---

### 2. 👥 Közösség (People)

**Cél:** Lakossági statisztikák, demográfiai adatok

**Funkciók:**
- Népesség alakulása (idősor diagram)
- Korösszetétel (piramis diagram)
- Foglalkoztatottság
- Oktatási intézmények
- Egészségügyi ellátás
- Közösségi terek

**Adatforrások:**
- KSH (Központi Statisztikai Hivatal)
- Önkormányzati nyilvántartások

---

### 3. 🗺️ Térkép (Map)

**Cél:** Átfogó városnézet interaktív funkcióval

**Funkciók:**
- **Rétegek (Layers):**
  - Buszmegállók
  - E-töltők
  - Parkolók
  - Intelligens gyalogátkelők (22 db)
  - Kerékpártárolók
  - Benzinkutak
  - Útépítések
  - Útkarbantartások
  - Traffipax helyszínek
- **Forgalmi helyzet színkódolása:**
  - 🟢 Szabad
  - 🟡 Lassú
  - 🟠 Sűrű
  - 🔴 Torlódás
- **GPS helymeghatározás:** Felhasználó pozíciója
- **Legenda:** Dinamikus réteg információk

**Technológia:**
- Google Maps API
- Real-time Traffic Layer
- Custom markers és overlays

---

### 4. 🚗 Közlekedés (Mobility)

**Cél:** Komplex közlekedési információs rendszer

#### 4.1 Interaktív Térkép
- Élő forgalmi helyzet színkódolása
- Torlódás vizualizáció
- Gyalogátkelők megjelenítése

#### 4.2 Menetidő Csempe (Travel Time)
- **5 szerkeszthető úticél** (célcím + GPS koordináták)
- Real-time menetidő becslés (TomTom Routing API)
- Trend nyilak (↑ lassul, ↓ gyorsul, → stabil)
- Gyors helyek: Budapest, Érd, Dunaújváros, Székesfehérvár
- Szerkesztő modal: új úticélok hozzáadása, törlés

#### 4.3 Forgalmi Terhelés (Traffic Flow)
- Forgalmi sebesség vs. ideális sebesség
- Torlódás százalékos mutatója
- Bar chart (Chart.js)

#### 4.4 Közlekedési Hírek
- Építések, karbantartások
- Címkék, időbélyegek
- Admin modal: hírek kezelése (hozzáadás, szerkesztés, törlés)
- Geocoding: automatikus GPS pozíció meghatározás cím alapján

#### 4.5 Útinformációk (Útinform API)
- Országos útinformációk (kritikus, figyelmeztetés, info)
- Real-time szűrés Százhalombatta környékére

#### 4.6 Intelligens Gyalogátkelők (Crosswalk)
- **22 gyalogátkelőhely** dropdown választóval
- **Statisztikák:**
  - Napi áthaladók száma
  - Ütközések száma
  - Várható várakozási idő
- **Micro charts (Chart.js):** Sparkline adatvizualizáció
- Állapot jelzők (aktív, karbantartás alatt)

**Design:**
- 6 oszlopos grid layout
- Térkép: 2/3 szélesség
- Menetidők: 1/3 szélesség
- Hírek + Útinform + Crosswalk: 1/2-1/2 szélesség (alsó sor)

**API-k:**
- TomTom Traffic Flow API
- TomTom Routing API
- OpenWeatherMap API
- Útinform API (országos lekérdezés)

---

### 5. 🌿 Környezet (Environment)

**Cél:** Környezeti fenntarthatóság monitorozása

**Funkciók:**
- **Levegőminőség (AQI):** Real-time szenzor adatok
- **Időjárás:** Hőmérséklet, páratartalom, szélsebesség
- **Napkelte/napnyugta:** Asztronómiai adatok
- **Hulladékgyűjtés:** Szelektív hulladékstatisztikák
- **Zöldterületek:** Parkok, faállomány
- **Energiafogyasztás:** Városi közintézmények

**Adatforrások:**
- OpenWeatherMap API
- Önkormányzati környezetvédelmi adatok

---

### 6. 🏛️ Önkormányzat (Governance)

**Cél:** Átláthatóság, részvételi demokrácia

**Funkciók:**
- **Önkormányzati hírek:** Közlemények, döntések
- **E-ügyintézés linkek:** Online ügyintézési portálok
- **Képviselő-testületi ülések:** Jegyzőkönyvek, napirendek
- **Közérdekű adatok:** Költségvetés, pályázatok
- **Elérhetőségek:** Hivatali nyitvatartás, telefonszámok

---

### 7. 💰 Gazdaság (Economy)

**Cél:** Helyi gazdasági teljesítmény nyomon követése

**Funkciók:**
- **GDP/GVA:** Bruttó hozzáadott érték
- **Munkanélküliségi ráta:** Statisztikák
- **Vállalkozások száma:** Ágazati megoszlás (Ipar 45%, Szolgáltatás 35%, Kereskedelem 15%, Egyéb 5%)
- **Top foglalkoztatók:** 
  1. MOL Nyrt. (~2,800 fő)
  2. Százhalombattai Önkormányzat (~450 fő)
  3. AUCHAN Magyarország (~280 fő)
- **Innovációs index:** 72/100 pont
- **Turizmus:** Vendégéjszakák száma (18,542 éj/év, +8.3%)

**Design:**
- Mosaic card grid
- Donut chart (ágazati megoszlás)
- Gauge chart (innovációs index)
- Trend nyilak (+/-)

---

### 8. 🛠️ Szolgáltatások (Services)

**Cél:** Közszolgáltatások elérhetősége

**Funkciók:**
- **Közművek:** Víz, gáz, elektromosság, csatorna
- **Hulladékgyűjtés:** Lomtalanítás időpontok
- **Orvosi ügyeletek:** Éjszakai és hétvégi ellátás
- **Oktatás:** Iskolák, óvodák, bölcsődék
- **Kulturális intézmények:** Könyvtár, Matrica Múzeum
- **Sportlétesítmények:** Uszoda, sportpályák

---

### 9. 📢 Bejelentés (Reports)

**Cél:** Lakossági problémák bejelentése

**Funkciók:**
- **Bejelentési űrlap:** Kátyú, rongálás, közvilágítás, stb.
- **Helyszín megadás:** Térkép kattintással vagy cím
- **Fotó feltöltés:** Probléma dokumentálása
- **Státusz követés:** Folyamatban, megoldva, elutasítva
- **Bejelentések száma:** Badge az oldalsávon (jelenleg: 3)

**Kategóriák:**
- Úthibák
- Közvilágítás
- Zöldterület
- Hulladék
- Közrend
- Egyéb

---

### 10. 📅 Események (Events)

**Cél:** Városi események, rendezvények

**Funkciók:**
- **Naptár nézet:** Havi/heti/napi
- **Esemény részletek:** Időpont, helyszín, leírás
- **Kategóriák:** Kultúra, sport, közösségi, gyermek
- **Esemény hozzáadása:** Admin felület (moderált)
- **Emlékeztető:** Értesítés opció

---

### 11. ℹ️ A városról (About)

**Cél:** Százhalombatta története, bemutatása

**Funkciók:**
- **Történelmi áttekintés:** Matrica kultúra, ipari örökség
- **Földrajz:** Duna-part, 6-os út
- **Népesség:** Demográfiai adatok
- **Nevezetességek:** Matrica Múzeum, régészeti lelőhelyek
- **Média galéria:** Fotók, videók

---

## 🛠️ Technológiai stack

### Frontend
| Technológia | Verzió | Funkció |
|-------------|--------|---------|
| **HTML5** | - | Szemantikus markup |
| **CSS3** | - | Glassmorphism design, animációk |
| **JavaScript ES6+** | - | Dinamikus logika, async/await |
| **Leaflet.js** | 1.9.4 | Térképek (OpenStreetMap) |
| **Google Maps API** | - | Mobility térkép |
| **Chart.js** | Latest | Adatvizualizáció |
| **Inter Font** | Google Fonts | Modern tipográfia |

### Backend / API Layer
| Szolgáltatás | Funkció |
|--------------|---------|
| **Cloudflare Workers** | API proxy, CORS kezelés |
| **TomTom Traffic API** | Forgalmi adatok |
| **TomTom Routing API** | Menetidő kalkuláció |
| **OpenWeatherMap API** | Időjárás |
| **Google Maps Geocoding** | Cím → GPS konverzió |
| **Útinform API** | Országos útinformációk |

### Adattárolás
- **LocalStorage:** Úticélok mentése, felhasználói beállítások
- **JSON fájlok:** Statikus adatok (gyalogátkelők, események)

---

## 🔌 API integráció

### API kulcsok (példa konfiguráció)

```javascript
const API_CONFIG = {
    tomtom: {
        key: 'GR3PcgPZetBKeUBGF96U6VgEdt29lgtP',
        trafficFlow: 'https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/',
        routing: 'https://api.tomtom.com/routing/1/calculateRoute/'
    },
    openweather: {
        key: 'YOUR_OPENWEATHER_KEY',
        endpoint: 'https://api.openweathermap.org/data/2.5/weather'
    },
    googleMaps: {
        key: 'AIzaSyB2RUdNQll9hlrUpYLBCR4iZH3Gk5sPak8'
    }
};
```

### Cloudflare Worker példa (CORS proxy)

```javascript
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');
    
    const response = await fetch(targetUrl, {
        headers: {
            'X-Api-Key': 'YOUR_KEY'
        }
    });
    
    return new Response(response.body, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });
}
```

---

## 🚀 Telepítés

### 1. Repository klónozása

```bash
git clone https://github.com/boitiferenc/Projekt.git
cd Projekt
```

### 2. API kulcsok beállítása

Nyisd meg a `Szazhalombatta_Dashboard_v20.html` fájlt és cseréld ki az API kulcsokat:

```javascript
// Keress rá: "API_CONFIG" vagy "api.tomtom.com"
const TOMTOM_API_KEY = 'YOUR_TOMTOM_KEY';
const OPENWEATHER_API_KEY = 'YOUR_OPENWEATHER_KEY';
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_KEY';
```

### 3. Lokális HTTP szerver indítása

**Python 3:**
```bash
python -m http.server 8000
```

**Node.js (http-server):**
```bash
npx http-server -p 8000
```

**PHP:**
```bash
php -S localhost:8000
```

### 4. Böngészőben megnyitás

```
http://localhost:8000/Szazhalombatta_Dashboard_v20.html
```

---

## 🎨 Design rendszer

### Színpaletta (Glassmorphism Antracit)

```css
:root {
    /* Háttér */
    --bg-base: #1A1A2E;
    --bg-darker: #12121F;
    --bg-lighter: #252540;
    
    /* Glassmorphism */
    --glass-bg: rgba(255, 255, 255, 0.05);
    --glass-border: rgba(255, 255, 255, 0.1);
    --glass-blur: blur(20px);
    
    /* Akcentus színek */
    --accent-primary: #60A5FA; /* Kék */
    --accent-secondary: #34D399; /* Zöld */
    --accent-tertiary: #A78BFA; /* Lila */
    --accent-warning: #FBBF24; /* Sárga */
    --accent-error: #F87171; /* Piros */
    
    /* Szövegek */
    --text-primary: #F8FAFC;
    --text-secondary: rgba(248, 250, 252, 0.7);
    --text-muted: rgba(248, 250, 252, 0.5);
}
```

### Tipográfia

- **Betűtípus:** Inter (Google Fonts)
- **Méret skála:** 11px – 28px
- **Súlyok:** 300, 400, 500, 600, 700, 800

### Grid Layout (Mobility oldal)

```
┌──────────────────────────────────────────────────┐
│  Térkép (4 oszlop, 2/3)   │  Menetidő (2 oszlop) │
│                            │                      │
│                            ├──────────────────────┤
│                            │  Forgalmi Terhelés   │
├────────────┬───────────────┴──────────────────────┤
│ Hírek      │ Útinform      │ Gyalogátkelők        │
│ (2 oszlop) │ (2 oszlop)    │ (2 oszlop)           │
└────────────┴───────────────┴──────────────────────┘
```

### Tile (csempe) anatómia

```
┌──────────────────────────────┐
│ Header (48px)                │ ← Cím + ikon + badge
├──────────────────────────────┤
│                              │
│ Body (dinamikus)             │ ← Tartalom
│                              │
├──────────────────────────────┤
│ Footer (44px)                │ ← Forrás + frissítés idő
└──────────────────────────────┘
Gap: 16px minden csempe között
```

---

## 📊 Funkciók részletesen

### Real-time Frissítési Intervallumok

| Modul | Frissítési gyakoriság |
|-------|-----------------------|
| Forgalmi térkép | 30 másodperc |
| Menetidők | 60 másodperc |
| Időjárás | 10 perc |
| Hírfolyam | 15 másodperc (animáció) |
| Gyalogátkelők | 60 másodperc |
| Útinformációk | 2 perc |

### Reszponzív Breakpointok

```css
/* Desktop */
@media (min-width: 1200px) { 6 oszlopos grid }

/* Tablet */
@media (max-width: 1200px) { 2 oszlopos grid }

/* Mobil */
@media (max-width: 900px) { 1 oszlopos grid }
```

### Akadálymentesítés

- **WCAG 2.1 AA megfelelőség** (tervezett)
- Képernyőolvasó támogatás (fejlesztés alatt)
- Billentyűzetnavigáció
- Magas kontraszt mód (tervezett)

---

## 🗺️ Jövőbeli fejlesztések (Roadmap)

### Q2 2025
- [ ] Mobil alkalmazás (React Native / Flutter)
- [ ] Push notifikációk
- [ ] Felhasználói fiókok (regisztráció, bejelentkezés)
- [ ] Admin dashboard (teljes körű)

### Q3 2025
- [ ] AI-alapú forgalom előrejelzés
- [ ] Chatbot (lakossági támogatás)
- [ ] Többnyelvűség (angol, német)
- [ ] Dark/Light mode toggle

### Q4 2025
- [ ] Open Data API (harmadik féltől érkező fejlesztők számára)
- [ ] Blockchain alapú szavazás (pilot)
- [ ] Augmented Reality (AR) városlátogatás

---

## 📝 Verziótörténet

### v20.0 (Aktuális – 2025. február)
- ✅ 6 oszlopos mobility grid layout
- ✅ Intelligens gyalogátkelők (22 db) Chart.js vizualizációval
- ✅ Egységes csempe design (header 48px, footer 44px, gap 16px)
- ✅ Forrásjelölések minden csempében
- ✅ Admin modal: közlekedési hírek kezelése
- ✅ Geocoding integráció

### v18.0
- Menetidő csempe optimalizálása
- Hírek + útinformációk integráció

### v1.0 – v17.0
- Prototípus fejlesztés
- API tesztek
- Design iterációk

---

## 🤝 Közreműködés

### Hogyan járulhatsz hozzá?

1. **Fork** a repository-t
2. **Branch** készítése (`git checkout -b feature/UjFunkció`)
3. **Commit** (`git commit -m 'Új funkció: ...'`)
4. **Push** (`git push origin feature/UjFunkció`)
5. **Pull Request** nyitása

### Kódolási konvenciók

- **Indentáció:** 4 space
- **Változónevek:** camelCase
- **Függvények:** camelCase, beszédes nevek
- **Kommentek:** Magyar nyelven (funkcionalitás)

---

## 📄 Licenc

MIT License – Szabadon használható, módosítható.

---

## 📧 Kapcsolat

**Projekt vezető:** Ferenc  
**GitHub:** [boitiferenc](https://github.com/boitiferenc)

---

## 🙏 Köszönetnyilvánítás

- **TomTom:** Traffic és Routing API
- **OpenWeatherMap:** Időjárás adatok
- **Google Maps:** Térképek és Geocoding
- **Leaflet.js:** Nyílt forráskódú térképes könyvtár
- **Chart.js:** Adatvizualizáció
- **Inter Font:** Typografia (Rasmus Andersson)
- **Százhalombatta Önkormányzat:** Adatszolgáltatás

---

**Készítette:** NABOTEK · Smart City Solutions  
**Utolsó frissítés:** 2025. február 5.

---

> **Megjegyzés:** Ez a dashboard egy **élő projekt**, folyamatosan fejlődik. Az API kulcsokat éles környezetben **soha ne** tedd közzé publikusan! Használj környezeti változókat (`.env` fájl) vagy titkosított tárolást.
