// TomTom Traffic Incidents Worker
// Proxies TomTom Traffic Incidents API for the Százhalombatta area
//
// Usage: GET / (no params required, uses Százhalombatta bounding box)
//   Optional: ?bbox=minLon,minLat,maxLon,maxLat
// Returns: { incidents: [...] }

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Százhalombatta + Budapest dél + M6/M7 korridor bounding box
const DEFAULT_BBOX = '18.75,47.15,19.15,47.55';

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const apiKey = env.TOMTOM_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    const url = new URL(request.url);
    const bbox = url.searchParams.get('bbox') || DEFAULT_BBOX;

    const tomtomUrl = `https://api.tomtom.com/traffic/services/5/incidentDetails?key=${apiKey}&bbox=${bbox}&fields={incidents{type,geometry{type,coordinates},properties{id,iconCategory,magnitudeOfDelay,events{description,code,iconCategory},startTime,endTime,from,to,length,delay,roadNumbers,timeValidity}}}&language=hu-HU&categoryFilter=0,1,2,3,4,5,6,7,8,9,10,11,14&timeValidityFilter=present`;

    try {
      const response = await fetch(tomtomUrl, {
        headers: { 'Accept': 'application/json' },
      });

      const data = await response.json();

      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60',
          ...CORS_HEADERS,
        },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'TomTom Incidents API request failed', details: error.message }),
        { status: 502, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }
  },
};
