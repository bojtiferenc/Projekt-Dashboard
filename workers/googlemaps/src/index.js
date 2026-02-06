// Google Maps Worker
// Placeholder proxy for Google Maps API requests
// Currently not used (dashboard uses Leaflet/OpenStreetMap)
//
// Usage: ?type=geocode&address=Budapest
// Returns: Google Maps Geocoding API response

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

    const apiKey = env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured', info: 'This worker is a placeholder. The dashboard currently uses Leaflet/OpenStreetMap.' }),
        { status: 501, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    const url = new URL(request.url);
    const type = url.searchParams.get('type') || 'geocode';
    const address = url.searchParams.get('address');

    if (type === 'geocode' && address) {
      const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return new Response(JSON.stringify(data), {
          status: response.status,
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
        });
      } catch (error) {
        return new Response(
          JSON.stringify({ error: 'Google Maps API request failed', details: error.message }),
          { status: 502, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
        );
      }
    }

    return new Response(
      JSON.stringify({ error: 'Invalid request. Use ?type=geocode&address=...' }),
      { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  },
};
