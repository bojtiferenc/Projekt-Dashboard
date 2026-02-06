// TomTom Traffic Flow Worker
// Proxies TomTom Traffic Flow API requests, injecting the API key server-side
//
// Usage: ?lat=47.3089&lon=18.9156&zoom=10
// Returns: TomTom flowSegmentData response

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

    const url = new URL(request.url);
    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');
    const zoom = url.searchParams.get('zoom') || '10';

    if (!lat || !lon) {
      return new Response(
        JSON.stringify({ error: 'Missing lat/lon parameters' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    const apiKey = env.TOMTOM_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    const tomtomUrl = `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/${zoom}/json?point=${lat},${lon}&unit=KMPH&thickness=10&key=${apiKey}`;

    try {
      const response = await fetch(tomtomUrl, {
        headers: { 'Accept': 'application/json' },
      });

      const data = await response.json();

      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=30',
          ...CORS_HEADERS,
        },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'TomTom API request failed', details: error.message }),
        { status: 502, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }
  },
};
