// TomTom Routing Worker
// Proxies TomTom Routing API requests, injecting the API key server-side
//
// Usage: ?start=47.3175,18.9145&end=47.4979,19.0402
// Returns: { travelTimeInSeconds, lengthInMeters, trafficDelayInSeconds }

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
    const start = url.searchParams.get('start');
    const end = url.searchParams.get('end');

    if (!start || !end) {
      return new Response(
        JSON.stringify({ error: 'Missing start/end parameters. Use ?start=lat,lng&end=lat,lng' }),
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

    // TomTom Routing API format: start_lat,start_lng:end_lat,end_lng
    const routeCoords = `${start}:${end}`;
    const tomtomUrl = `https://api.tomtom.com/routing/1/calculateRoute/${routeCoords}/json?key=${apiKey}&traffic=true&travelMode=car`;

    try {
      const response = await fetch(tomtomUrl, {
        headers: { 'Accept': 'application/json' },
      });

      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const summary = data.routes[0].summary;
        return new Response(
          JSON.stringify({
            travelTimeInSeconds: summary.travelTimeInSeconds,
            lengthInMeters: summary.lengthInMeters,
            trafficDelayInSeconds: summary.trafficDelayInSeconds || 0,
            departureTime: summary.departureTime,
            arrivalTime: summary.arrivalTime,
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'public, max-age=60',
              ...CORS_HEADERS,
            },
          }
        );
      }

      return new Response(
        JSON.stringify({ error: 'No route found', raw: data }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'TomTom Routing API request failed', details: error.message }),
        { status: 502, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }
  },
};
