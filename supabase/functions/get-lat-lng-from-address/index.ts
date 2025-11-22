// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
const GEOCODING_API_KEY = Deno.env.get('GEOCODING_API_KEY');
Deno.serve(async (req) => {
  if (!GEOCODING_API_KEY) {
    return new Response(
      JSON.stringify({
        error: 'Server configuration error: Missing API Key',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
  let address;
  try {
    const payload = await req.json();
    address = payload.addressToGeocode;
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: 'Invalid JSON payload',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
  if (!address) {
    return new Response(
      JSON.stringify({
        error: 'Missing "address" field in payload',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GEOCODING_API_KEY}`;
  try {
    const res = await fetch(url, {
      method: 'GET',
    });
    const data = await res.json();
    if (data.status === 'OK' && Array.isArray(data.results) && data.results.length > 0) {
      const loc = data.results[0].geometry.location;
      const latLng = {
        lat: loc.lat,
        lng: loc.lng,
      };
      return new Response(JSON.stringify(latLng), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else if (data.status === 'ZERO_RESULTS') {
      return new Response(
        JSON.stringify({
          error: 'Address not found',
          status: data.status,
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    } else {
      // General API errors (e.g., OVER_QUERY_LIMIT, INVALID_REQUEST)
      console.error('Geocoding API Error:', data);
      return new Response(
        JSON.stringify({
          error: 'Geocoding API failed',
          status: data.status,
          message: data.error_message || 'Unknown API error',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
  } catch (fetchError) {
    console.error('Fetch failed:', fetchError);
    return new Response(
      JSON.stringify({
        error: 'External API communication failed',
      }),
      {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
});
