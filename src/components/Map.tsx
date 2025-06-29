"use client";
import { useEffect, useRef } from "react";
import maplibregl, { Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const mangroveData: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [
        { type: "Feature", properties: { Kode: "KMD1-1", Lokasi: "Kerontong", MHI: 65.52782, Status: "Moderate" }, geometry: { type: "Point", coordinates: [119.514441, -8.543333] } },
        { type: "Feature", properties: { Kode: "KMD1-2", Lokasi: "Kerontong", MHI: 73.38556, Status: "Excellent" }, geometry: { type: "Point", coordinates: [119.514741, -8.543033] } },
        { type: "Feature", properties: { Kode: "KMD1-3", Lokasi: "Kerontong", MHI: 78.14509, Status: "Excellent" }, geometry: { type: "Point", coordinates: [119.514141, -8.543633] } },
        { type: "Feature", properties: { Kode: "KMD2-1", Lokasi: "Tambora", MHI: 65.87401, Status: "Moderate" }, geometry: { type: "Point", coordinates: [118.000000, -8.250000] } },
        { type: "Feature", properties: { Kode: "KMD2-2", Lokasi: "Tambora", MHI: 65.86113, Status: "Moderate" }, geometry: { type: "Point", coordinates: [118.000300, -8.249700] } },
        { type: "Feature", properties: { Kode: "KMD2-3", Lokasi: "Tambora", MHI: 61.40076, Status: "Moderate" }, geometry: { type: "Point", coordinates: [117.999700, -8.250300] } },
        { type: "Feature", properties: { Kode: "KMD3-1", Lokasi: "Lohginggo", MHI: 75.28874, Status: "Excellent" }, geometry: { type: "Point", coordinates: [119.489441, -8.518333] } },
        { type: "Feature", properties: { Kode: "KMD3-2", Lokasi: "Lohginggo", MHI: 73.31778, Status: "Excellent" }, geometry: { type: "Point", coordinates: [119.489741, -8.518033] } },
        { type: "Feature", properties: { Kode: "KMD3-3", Lokasi: "Lohginggo", MHI: 66.54276, Status: "Moderate" }, geometry: { type: "Point", coordinates: [119.489141, -8.518633] } },
        { type: "Feature", properties: { Kode: "KMD4-1", Lokasi: "Loh Lawi", MHI: 71.74171, Status: "Excellent" }, geometry: { type: "Point", coordinates: [119.49529, -8.48141] } },
        { type: "Feature", properties: { Kode: "KMD4-2", Lokasi: "Loh Lawi", MHI: 70.84554, Status: "Excellent" }, geometry: { type: "Point", coordinates: [119.49559, -8.48111] } },
        { type: "Feature", properties: { Kode: "KMD4-3", Lokasi: "Loh Lawi", MHI: 55.29865, Status: "Moderate" }, geometry: { type: "Point", coordinates: [119.495, -8.4817] } },
        { type: "Feature", properties: { Kode: "KMD5-1", Lokasi: "Loh Lawi 2", MHI: 67.1686, Status: "Excellent" }, geometry: { type: "Point", coordinates: [119.47029, -8.45641] } },
        { type: "Feature", properties: { Kode: "KMD5-2", Lokasi: "Loh Lawi 2", MHI: 70.12672, Status: "Excellent" }, geometry: { type: "Point", coordinates: [119.47059, -8.45611] } },
        { type: "Feature", properties: { Kode: "KMD5-3", Lokasi: "Loh Lawi 2", MHI: 67.45274, Status: "Excellent" }, geometry: { type: "Point", coordinates: [119.47, -8.4567] } },
        { type: "Feature", properties: { Kode: "KMD6-1", Lokasi: "Sebita", MHI: 76.25032, Status: "Excellent" }, geometry: { type: "Point", coordinates: [119.464441, -8.543333] } },
        { type: "Feature", properties: { Kode: "KMD6-2", Lokasi: "Sebita", MHI: 77.75929, Status: "Excellent" }, geometry: { type: "Point", coordinates: [119.464741, -8.543033] } },
        { type: "Feature", properties: { Kode: "KMD6-3", Lokasi: "Sebita", MHI: 73.74387, Status: "Excellent" }, geometry: { type: "Point", coordinates: [119.464141, -8.543633] } },
        { type: "Feature", properties: { Kode: "KMD7-1", Lokasi: "Gili Lawa", MHI: 63.51682, Status: "Moderate" }, geometry: { type: "Point", coordinates: [119.558614, -8.469012] } },
        { type: "Feature", properties: { Kode: "KMD7-2", Lokasi: "Gili Lawa", MHI: 77.35712, Status: "Excellent" }, geometry: { type: "Point", coordinates: [119.558914, -8.468712] } },
        { type: "Feature", properties: { Kode: "KMD7-3", Lokasi: "Gili Lawa", MHI: 83.01312, Status: "Excellent" }, geometry: { type: "Point", coordinates: [119.558314, -8.469312] } },
    ],
};

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<MapLibreMap | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) {
      return;
    }

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://api.maptiler.com/maps/streets-v2/style.json?key=nJhlM90Zjv4SvwXxP9aW",
      center: [119.5, -8.5],
      zoom: 8,
    });

    map.current.on("load", () => {
      if (!map.current) return;

      map.current.addSource("mangrove-data", {
        type: "geojson",
        data: mangroveData,
      });

      map.current.addLayer({
        id: "mangrove-points",
        type: "circle",
        source: "mangrove-data",
        paint: {
          "circle-radius": 6,
          "circle-color": [
            "match",
            ["get", "Status"],
            "Excellent", "#4CAF50",
            "Moderate", "#FFC107",
            "#FF5722"
          ],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff"
        },
      });

      map.current.on('click', 'mangrove-points', (e) => {
        if (!map.current || !e.features || e.features.length === 0) return;

        const properties = e.features[0].properties;
        const coordinates = (e.features[0].geometry as GeoJSON.Point).coordinates.slice();
        
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        const MHI_Value = parseFloat(properties?.MHI).toFixed(2);
        const popupHTML = `
          <div>
            <h3>${properties?.Lokasi}</h3>
            <p><strong>Status:</strong> ${properties?.Status}</p>
            <p><strong>MHI:</strong> ${MHI_Value}</p>
          </div>
        `;

        new maplibregl.Popup()
          .setLngLat(coordinates as [number, number])
          .setHTML(popupHTML)
          .addTo(map.current);
      });

      map.current.on('mouseenter', 'mangrove-points', () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = 'pointer';
        }
      });

      map.current.on('mouseleave', 'mangrove-points', () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = '';
        }
      });
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }} />;
}