// API Configuration
// FIGYELEM: Ez a fájl NEM tartalmaz API kulcsokat!
// Kulcsok a Cloudflare Workers-ben vannak (környezeti változók)

const API_CONFIG = {
    // Százhalombatta GPS koordináták
    location: {
        lat: 47.2831,
        lon: 18.9217,
        name: 'Százhalombatta'
    },
    
    // Cloudflare Worker proxy URL-ek (API kulcsok itt vannak tárolva)
    proxies: {
        tomtom: 'https://tomtom-proxy.YOUR-SUBDOMAIN.workers.dev',
        weather: 'https://weather-proxy.YOUR-SUBDOMAIN.workers.dev',
        utinform: 'https://utinform-proxy.YOUR-SUBDOMAIN.workers.dev'
    },
    
    // TomTom API endpoints (kulcs nélkül)
    tomtom: {
        trafficFlow: '/traffic/services/4/flowSegmentData/absolute',
        routing: '/routing/1/calculateRoute'
    },
    
    // OpenWeatherMap endpoint
    weather: {
        current: '/data/2.5/weather',
        forecast: '/data/2.5/forecast'
    },
    
    // Refresh intervals (milliseconds)
    refreshIntervals: {
        traffic: 30000,      // 30 sec
        travelTime: 60000,   // 60 sec
        weather: 600000,     // 10 min
        crosswalks: 60000,   // 60 sec
        news: 120000         // 2 min
    }
};

// Export config
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}
