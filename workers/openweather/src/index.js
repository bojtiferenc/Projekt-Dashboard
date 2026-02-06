// OpenWeatherMap Worker
// Proxies OpenWeatherMap API requests, injecting the API key server-side
//
// Usage:
//   ?type=current&lat=47.3175&lon=18.9145
//   ?type=forecast&lat=47.3175&lon=18.9145&cnt=3
// Returns: raw OpenWeatherMap API response

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const apiKey = env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    const url = new URL(request.url);
    const type = url.searchParams.get('type') || 'current';
    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');
    const cnt = url.searchParams.get('cnt') || '3';

    if (!lat || !lon) {
      return new Response(
        JSON.stringify({ error: 'Missing lat/lon parameters' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    let endpoint;
    if (type === 'forecast') {
      endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=hu&cnt=${cnt}`;
    } else {
      endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=hu`;
    }

    try {
      const response = await fetch(endpoint, {
        headers: { 'Accept': 'application/json' },
      });

      const data = await response.json();

      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': type === 'forecast' ? 'public, max-age=600' : 'public, max-age=120',
          ...CORS_HEADERS,
        },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'OpenWeatherMap API request failed', details: error.message }),
        { status: 502, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }
  },
};
