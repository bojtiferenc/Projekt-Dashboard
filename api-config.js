// ==========================================
// API KONFIGURÁCIÓ
// Százhalombatta Smart City Dashboard
// ==========================================

/**
 * API kulcsok és endpoint-ok központi konfigurációja
 * A kulcsok környezeti változókból töltődnek be (.env fájl)
 * 
 * Használat:
 * import { API_CONFIG } from './config/api-config.js';
 * const response = await fetch(`${API_CONFIG.tomtom.trafficFlow}?key=${API_CONFIG.tomtom.key}`);
 */

// Környezeti változók beolvasása
const getEnvVar = (key, defaultValue = '') => {
    // Vite környezetben
    if (typeof import.meta !== 'undefined' && import.meta.env) {
        return import.meta.env[key] || defaultValue;
    }
    
    // Vanilla JS környezetben (process.env)
    if (typeof process !== 'undefined' && process.env) {
        return process.env[key] || defaultValue;
    }
    
    // Fallback: window objektumból (manuális betöltés esetén)
    if (typeof window !== 'undefined' && window.ENV) {
        return window.ENV[key] || defaultValue;
    }
    
    return defaultValue;
};

// ========== API KONFIGURÁCIÓ OBJEKTUM ==========
export const API_CONFIG = {
    // ========== TOMTOM ==========
    tomtom: {
        key: getEnvVar('VITE_TOMTOM_API_KEY'),
        workerUrl: getEnvVar('VITE_TOMTOM_WORKER_URL', 'https://tomtom.bojtiferenc.workers.dev'),
        endpoints: {
            trafficFlow: 'https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute',
            routing: 'https://api.tomtom.com/routing/1/calculateRoute',
            incidents: 'https://api.tomtom.com/traffic/services/5/incidentDetails',
            geocoding: 'https://api.tomtom.com/search/2/geocode'
        },
        defaults: {
            zoom: 10,
            thickness: 10,
            unit: 'KMPH'
        }
    },
    
    // ========== OPENWEATHERMAP ==========
    openweather: {
        key: getEnvVar('VITE_OPENWEATHER_API_KEY'),
        endpoints: {
            current: 'https://api.openweathermap.org/data/2.5/weather',
            forecast: 'https://api.openweathermap.org/data/2.5/forecast',
            airPollution: 'https://api.openweathermap.org/data/2.5/air_pollution'
        },
        defaults: {
            units: 'metric',
            lang: 'hu'
        }
    },
    
    // ========== GOOGLE MAPS ==========
    googleMaps: {
        key: getEnvVar('VITE_GOOGLE_MAPS_API_KEY'),
        endpoints: {
            maps: 'https://maps.googleapis.com/maps/api/js',
            geocoding: 'https://maps.googleapis.com/maps/api/geocode/json',
            places: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
        },
        defaults: {
            zoom: 13,
            center: { lat: 47.3089, lng: 18.9156 }, // Százhalombatta
            mapTypeId: 'roadmap'
        }
    },
    
    // ========== ÚTINFORM (OPCIONÁLIS) ==========
    utinform: {
        url: getEnvVar('VITE_UTINFORM_API_URL', ''),
        enabled: !!getEnvVar('VITE_UTINFORM_API_URL')
    },
    
    // ========== ALKALMAZÁS BEÁLLÍTÁSOK ==========
    app: {
        mode: getEnvVar('VITE_APP_MODE', 'development'),
        debugEnabled: getEnvVar('VITE_DEBUG_ENABLED', 'true') === 'true',
        logApiCalls: getEnvVar('VITE_LOG_API_CALLS', 'true') === 'true'
    }
};

// ========== VALIDÁCIÓ ==========
/**
 * Ellenőrzi, hogy minden kötelező API kulcs be van-e állítva
 * Fejlesztési módban figyelmeztető üzenetet ad
 * Production módban hibát dob
 */
export function validateApiKeys() {
    const requiredKeys = [
        { name: 'TomTom', value: API_CONFIG.tomtom.key },
        { name: 'OpenWeatherMap', value: API_CONFIG.openweather.key },
        { name: 'Google Maps', value: API_CONFIG.googleMaps.key }
    ];
    
    const missingKeys = requiredKeys.filter(k => !k.value || k.value === 'your_' + k.name.toLowerCase().replace(' ', '_') + '_api_key_here');
    
    if (missingKeys.length > 0) {
        const message = `⚠️ Hiányzó API kulcsok: ${missingKeys.map(k => k.name).join(', ')}`;
        
        if (API_CONFIG.app.mode === 'production') {
            throw new Error(message);
        } else {
            console.warn(message);
            console.warn('📝 Hozz létre egy .env fájlt az .env.example alapján és töltsd ki az API kulcsokat!');
        }
    } else {
        console.log('✅ Minden API kulcs be van állítva');
    }
}

// ========== HELPER FÜGGVÉNYEK ==========

/**
 * TomTom API URL építő
 * @param {string} endpoint - API végpont neve (trafficFlow, routing, stb.)
 * @param {Object} params - Query paraméterek
 * @returns {string} Teljes API URL
 */
export function buildTomTomUrl(endpoint, params = {}) {
    const baseUrl = API_CONFIG.tomtom.endpoints[endpoint];
    if (!baseUrl) {
        throw new Error(`Ismeretlen TomTom endpoint: ${endpoint}`);
    }
    
    const queryParams = new URLSearchParams({
        key: API_CONFIG.tomtom.key,
        ...params
    });
    
    return `${baseUrl}?${queryParams.toString()}`;
}

/**
 * OpenWeatherMap API URL építő
 * @param {string} endpoint - API végpont neve (current, forecast, airPollution)
 * @param {Object} params - Query paraméterek
 * @returns {string} Teljes API URL
 */
export function buildOpenWeatherUrl(endpoint, params = {}) {
    const baseUrl = API_CONFIG.openweather.endpoints[endpoint];
    if (!baseUrl) {
        throw new Error(`Ismeretlen OpenWeather endpoint: ${endpoint}`);
    }
    
    const queryParams = new URLSearchParams({
        appid: API_CONFIG.openweather.key,
        units: API_CONFIG.openweather.defaults.units,
        lang: API_CONFIG.openweather.defaults.lang,
        ...params
    });
    
    return `${baseUrl}?${queryParams.toString()}`;
}

/**
 * Google Maps API betöltése dinamikusan
 * @param {Function} callback - Callback függvény
 */
export function loadGoogleMapsAPI(callback) {
    if (typeof google !== 'undefined' && google.maps) {
        callback();
        return;
    }
    
    const script = document.createElement('script');
    script.src = `${API_CONFIG.googleMaps.endpoints.maps}?key=${API_CONFIG.googleMaps.key}&callback=${callback.name}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// ========== DEBUG LOGOLÁS ==========
/**
 * API hívások logolása (csak debug módban)
 */
export function logApiCall(service, endpoint, params = {}) {
    if (!API_CONFIG.app.logApiCalls) return;
    
    console.group(`🌐 API Call: ${service}`);
    console.log('Endpoint:', endpoint);
    console.log('Params:', params);
    console.log('Timestamp:', new Date().toISOString());
    console.groupEnd();
}

// ========== EXPORT ==========
export default API_CONFIG;

// Automatikus validáció fejlesztési módban
if (API_CONFIG.app.mode === 'development') {
    validateApiKeys();
}
