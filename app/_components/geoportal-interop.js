// geoportal-interop.js
// GeoPortal interop layer: GeoJSON in/out + embed snippet.
// Scope: interop only — NO consumer map editor. (Item 5, Stage 2)
// Source: competitor scout — take file formats + embed (MapHub/ArcGIS),
//         leave the drawing tools.
// Constitution: JavaScript for all UI. Drop into z-factors.com GeoPortal.
// Vanilla ESM, framework-agnostic (works with the SVG map / Next.js).

// --- Signal <-> GeoJSON Feature mapping --------------------------------
// EDIT THIS to match the live Supabase signal/article row shape.
// GeoJSON coordinates are ALWAYS [longitude, latitude] — not lat,lng.

function signalToFeature(s) {
  return {
    type: "Feature",
    geometry: { type: "Point", coordinates: [s.lng, s.lat] },
    properties: {
      id: s.id,
      title: s.title,
      city: s.city,
      region: s.region,
      z_score: s.z_score,
      sub_tag: s.sub_tag,
      series_slug: s.series_slug,
      url: s.url,
    },
  };
}

function featureToSignal(f) {
  const [lng, lat] = f.geometry.coordinates;
  const p = f.properties || {};
  return {
    id: p.id,
    title: p.title,
    city: p.city,
    region: p.region,
    z_score: p.z_score,
    sub_tag: p.sub_tag,
    series_slug: p.series_slug,
    url: p.url,
    lat,
    lng,
  };
}

// --- EXPORT: signals[] -> GeoJSON file download ------------------------
export function exportSignalsToGeoJSON(signals, filename = "geoportal-signals.geojson") {
  const features = signals
    .filter((s) => s.lat != null && s.lng != null)
    .map(signalToFeature);

  const fc = { type: "FeatureCollection", features };

  const blob = new Blob([JSON.stringify(fc, null, 2)], {
    type: "application/geo+json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);

  return fc; // also return it, in case caller wants the object
}

// --- IMPORT: GeoJSON (object or string) -> signals[] -------------------
export function importGeoJSONToSignals(geojson) {
  const data = typeof geojson === "string" ? JSON.parse(geojson) : geojson;

  if (!data || data.type !== "FeatureCollection" || !Array.isArray(data.features)) {
    throw new Error("Not a valid GeoJSON FeatureCollection");
  }

  return data.features
    .filter((f) => f && f.geometry && f.geometry.type === "Point")
    .map(featureToSignal);
}

// Helper: wire a <input type="file"> straight to signals[]
export function readGeoJSONFile(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      try {
        resolve(importGeoJSONToSignals(r.result));
      } catch (e) {
        reject(e);
      }
    };
    r.onerror = () => reject(new Error("File read failed"));
    r.readAsText(file);
  });
}

// --- EMBED: build an <iframe> snippet a business can paste -------------
// Requires the GeoPortal page to honor ?embed=1 (hide chrome) and
// optional ?city= / ?region= filters. That wiring is the one repo task.
export function buildEmbedSnippet({
  baseUrl = "https://z-factors.com/geoportal",
  city = "",
  region = "",
  width = "100%",
  height = 480,
} = {}) {
  const params = new URLSearchParams();
  if (city) params.set("city", city);
  if (region) params.set("region", region);
  params.set("embed", "1");

  const src = `${baseUrl}?${params.toString()}`;
  return (
    `<iframe src="${src}" width="${width}" height="${height}" ` +
    `style="border:0;border-radius:12px" loading="lazy" ` +
    `title="GeoBond signals"></iframe>`
  );
}
