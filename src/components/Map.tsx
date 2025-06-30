"use client";

import { useEffect, useRef } from "react";
import maplibregl, {
  Map as MapLibreMap,
  NavigationControl,
  MapMouseEvent,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Define GeoJSON feature structure
interface GeoJSONFeature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    [key: string]: string;
  };
}

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<MapLibreMap | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style:
        "https://api.maptiler.com/maps/streets-v2/style.json?key=nJhlM90Zjv4SvwXxP9aW",
      center: [119.8, -8.68],
      zoom: 10,
    });

    map.current.addControl(new NavigationControl(), "top-right");

    map.current.on("load", async () => {
      if (!map.current) return;

      try {
        // KOMODO PARK
        const parkRes = await fetch("/komodo_park.geojson");
        const parkData = await parkRes.json();

        map.current.addSource("komodo-park", {
          type: "geojson",
          data: parkData,
        });

        map.current.addLayer({
          id: "komodo-park-fill",
          type: "fill",
          source: "komodo-park",
          paint: {
            "fill-color": "#FFD700",
            "fill-opacity": 0.1,
          },
        });

        map.current.addLayer({
          id: "komodo-park-outline",
          type: "line",
          source: "komodo-park",
          paint: {
            "line-color": "#444",
            "line-width": 1.5,
          },
        });

        // MANGROVE TNK
        const mangroveRes = await fetch("/mang_tnk.geojson");
        const mangroveData = await mangroveRes.json();

        map.current.addSource("mangrove-polygons", {
          type: "geojson",
          data: mangroveData,
        });

        map.current.addLayer({
          id: "mangrove-outline",
          type: "line",
          source: "mangrove-polygons",
          paint: {
            "line-color": "#333",
            "line-width": 0.8,
          },
        });

        // POINT GEOJSON
        const pointRes = await fetch("/point.geojson");
        const pointData = await pointRes.json();

        const jitter = (i: number) => {
          const offset = ((i % 5) - 2) * 0.0005;
          return offset;
        };

        const features = pointData.features.map((f: GeoJSONFeature, i: number) => {
          const mhi = parseFloat(f.properties?.["MHI (%)"] ?? "0");
          const status =
            mhi >= 70 ? "Excellent" : mhi >= 50 ? "Moderate" : "Poor";

          const originalCoords = f.geometry.coordinates;
          const jitteredCoords: [number, number] = [
            originalCoords[0] + jitter(i),
            originalCoords[1] + jitter(i + 1),
          ];

          return {
            type: "Feature" as const,
            geometry: {
              type: "Point" as const,
              coordinates: jitteredCoords,
            },
            properties: {
              ...f.properties,
              Status: status,
              MHI: mhi,
              Lokasi: `${f.properties["Site Code"]} - Plot ${f.properties["Plot Code"]}`,
            },
          };
        });

        map.current.addSource("mangrove-points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features,
          },
        });

        map.current.addLayer({
          id: "mangrove-points-layer",
          type: "circle",
          source: "mangrove-points",
          paint: {
            "circle-radius": 10,
            "circle-color": [
              "match",
              ["get", "Status"],
              "Excellent", "#2E8B57",
              "Moderate", "#FFD700",
              "Poor", "#DC143C",
              "#ccc",
            ],
            "circle-stroke-color": "#000",
            "circle-stroke-width": 1,
          },
        });

        // INTERAKSI POPUP + ZOOM
        map.current.on("click", "mangrove-points-layer", (e: MapMouseEvent & { features?: maplibregl.MapGeoJSONFeature[] }) => {
          const f = e.features?.[0];
          if (!f) return;
          const props = f.properties as { [key: string]: any };

          map.current!.flyTo({
            center: e.lngLat,
            zoom: 14,
            essential: true,
          });

          new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
              <strong>${props?.Lokasi}</strong><br/>
              Status: ${props?.Status}<br/>
              MHI: ${parseFloat(props?.MHI).toFixed(2)}%
            `)
            .addTo(map.current!);
        });

        map.current.on("mouseenter", "mangrove-points-layer", () => {
          map.current!.getCanvas().style.cursor = "pointer";
        });

        map.current.on("mouseleave", "mangrove-points-layer", () => {
          map.current!.getCanvas().style.cursor = "";
        });
      } catch (err) {
        console.error("Gagal memuat data:", err);
      }
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }} />;
}
