# 🔐 SECURITY GUIDE - API Kulcs Kezelés

## ⚠️ KRITIKUS SZABÁLYOK

**SOHA ne commitálj API kulcsokat GitHub-ra!**

---

## 🛡️ CLOUDFLARE WORKERS SETUP

### 1. Cloudflare Worker létrehozása

**TomTom Traffic & Routing Proxy:**

```javascript
// tomtom-proxy.js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get('url');
  
  // API kulcs környezeti változóból (Cloudflare dashboard-ban beállítva)
  const TOMTOM_KEY = TOMTOM_API_KEY;
  
  const apiUrl = `${targetUrl}?key=${TOMTOM_KEY}`;
  
  const response = await fetch(apiUrl);
  
  return new Response(response.body, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  });
}
```

---

### 2. Környezeti változók beállítása

Cloudflare Dashboard → Workers → Settings → Variables

```
TOMTOM_API_KEY = GR3PcgPZetBKeUBGF96U6VgEdt29lgtP
OPENWEATHER_API_KEY = your_key_here
GOOGLE_MAPS_API_KEY = your_key_here
```

---

### 3. Frontend használat

```javascript
// NINCS API kulcs a kliensen! ✅
const response = await fetch(
  'https://tomtom-proxy.your-subdomain.workers.dev/?url=https://api.tomtom.com/traffic/...'
);
```

---

## 📝 .gitignore BEÁLLÍTÁSA

```gitignore
# API kulcsok
.env
.env.local

# Node
node_modules/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

---

## 🔒 TOVÁBBI VÉDELEM

### Rate Limiting (Cloudflare-ben)
- 100 request / perc / IP
- 1000 request / óra / IP

### Domain Restriction (API Dashboard-ban)
- TomTom: csak `*.github.io`
- OpenWeatherMap: csak `*.github.io`
- Google Maps: csak `bojtiferenc.github.io`

---

## ✅ CHECKLIST

- [ ] API kulcsok környezeti változókban
- [ ] Cloudflare Workers működik
- [ ] .gitignore frissítve
- [ ] Domain restriction beállítva
- [ ] Rate limiting konfigurálva
- [ ] Tesztelve production-ben

---

**Utolsó frissítés:** 2025-02-05
