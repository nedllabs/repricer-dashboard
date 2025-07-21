"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import type { Map } from "mapbox-gl";
import cbsaMetrics from "@/data/cbsa-metrics.json";
import cbsaMapConfig from "@/data/cbsa-map-config.json";

type MetricKey = "claimsVolume" | "rateRelativity";

interface ChoroplethProps {
  title: string;
  metric: MetricKey;
  legendUnit: string;
  token: string;
}

function getColorForValue(value: number, metric: MetricKey): string {
  const scale = cbsaMapConfig.colorScales[metric];
  for (let i = scale.length - 1; i >= 0; i--) {
    if (value >= scale[i].value) {
      return scale[i].color;
    }
  }
  return scale[0].color;
}

function getRadiusForValue(value: number, metric: MetricKey): number {
  if (metric === "claimsVolume") {
    // Scale radius based on claims volume (min: 8px, max: 25px)
    // Updated for larger claim volumes (up to 6.2M)
    return Math.max(8, Math.min(25, (value / 1000000) * 17 + 8));
  } else {
    // Scale radius based on rate relativity (min: 10px, max: 22px)
    return Math.max(10, Math.min(22, ((value - 98) / (145 - 98)) * 12 + 10));
  }
}

export function CbsaMap({ title, metric, legendUnit, token }: ChoroplethProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (mapRef.current) return;

    console.log("Map token:", token ? "Token present" : "Token missing");
    console.log("CBSA metrics data:", cbsaMetrics.length, "entries");
    
    if (!token) {
      console.error("Mapbox access token is missing!");
      return;
    }

    mapboxgl.accessToken = token;

    // Create GeoJSON from point data
    const pointFeatures = cbsaMetrics.map((cbsa) => ({
      type: "Feature" as const,
      properties: cbsa,
      geometry: {
        type: "Point" as const,
        coordinates: [cbsa.lng, cbsa.lat],
      },
    }));

    console.log("Point features created:", pointFeatures.length);
    console.log("Sample feature:", pointFeatures[0]);

    const featureCollection = {
      type: "FeatureCollection" as const,
      features: pointFeatures,
    };

    console.log("Creating map with container:", mapContainer.current);
    console.log("Container dimensions:", mapContainer.current?.offsetWidth, "x", mapContainer.current?.offsetHeight);
    
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-98.5795, 39.8283],
      zoom: 4,
      pitch: 0,
      bearing: 0,
    });
    mapRef.current = map;

    map.on("error", (e) => {
      console.error("Mapbox error:", e);
    });

    const addMapLayers = () => {
      console.log("Adding map layers...");
      
      // Add source for circles
      map.addSource("cbsa-points", {
        type: "geojson",
        data: featureCollection,
      });
      
      console.log("Source added successfully");
      
      const colorScale = cbsaMapConfig.colorScales[metric];
      
      // Add outer glow layer (largest, most transparent)
      map.addLayer({
        id: "cbsa-glow",
        type: "circle",
        source: "cbsa-points",
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", metric],
            ...colorScale.flatMap((s) => [
              s.value,
              getRadiusForValue(s.value, metric) * 2.5,
            ]),
          ],
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", metric],
            ...colorScale.flatMap((s) => [s.value, s.color]),
          ],
          "circle-opacity": 0.15,
          "circle-blur": 1,
        },
      });

      // Add main circle layer
      map.addLayer({
        id: "cbsa-circles",
        type: "circle",
        source: "cbsa-points",
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", metric],
            ...colorScale.flatMap((s) => [
              s.value,
              getRadiusForValue(s.value, metric),
            ]),
          ],
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", metric],
            ...colorScale.flatMap((s) => [s.value, s.color]),
          ],
          "circle-opacity": 0.8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-opacity": 0.9,
        },
      });

      // Add inner highlight layer
      map.addLayer({
        id: "cbsa-highlight",
        type: "circle",
        source: "cbsa-points",
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", metric],
            ...colorScale.flatMap((s) => [
              s.value,
              getRadiusForValue(s.value, metric) * 0.3,
            ]),
          ],
          "circle-color": "#ffffff",
          "circle-opacity": 0.4,
        },
      });

      console.log("All layers added successfully");
    };

    map.on("load", () => {
      console.log("Map loaded successfully");
      addMapLayers();
      
      // Add a timeout to check if map is still loading
      setTimeout(() => {
        console.log("Map state after 2 seconds:", map.isStyleLoaded() ? "Style loaded" : "Style not loaded");
        console.log("Map container:", map.getContainer());
      }, 2000);

      // Tooltip interactions
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: "cbsa-popup",
      });

      // Hover effects for all circle layers
      const layers = ["cbsa-circles", "cbsa-glow", "cbsa-highlight"];

      layers.forEach((layerId) => {
        map.on("mouseenter", layerId, (e) => {
          map.getCanvas().style.cursor = "pointer";
          if (!e.features?.length) return;

          const props = e.features[0].properties as any;
          popup
            .setLngLat([props.lng, props.lat])
            .setHTML(
              `<div style="padding: 12px; font-family: system-ui;">
                 <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px; color: #374151;">${
                   props.cbsa
                 }</div>
                 <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">
                   <span style="font-weight: 500;">Claims Volume:</span> ${props.claimsVolume.toLocaleString()}
                 </div>
                 <div style="font-size: 12px; color: #6b7280;">
                   <span style="font-weight: 500;">Rate Relativity:</span> ${
                     props.rateRelativity
                   }${legendUnit}
                 </div>
               </div>`
            )
            .addTo(map);
        });

        map.on("mouseleave", layerId, () => {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });

        // Click to zoom
        map.on("click", layerId, (e) => {
          if (!e.features?.length) return;
          const props = e.features[0].properties as any;
          map.flyTo({
            center: [props.lng, props.lat],
            zoom: 8,
            duration: 1000,
          });
        });
      });
    });

    return () => map.remove();
  }, [metric, legendUnit, token]);

  return (
    <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e5e7eb] flex flex-col relative">
      <h4 className="font-semibold text-[#374151] mb-4 font-comfortaa">
        {title}
      </h4>

      {/* Legend */}
      <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-xs rounded-lg p-3 shadow-lg border border-gray-200">
        <div className="text-xs font-semibold text-gray-700 mb-2">
          {metric === "claimsVolume" ? "Claims Volume" : "Rate Relativity (%)"}
        </div>
        <div className="space-y-1">
          {cbsaMapConfig.legendRanges[metric].map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full border border-white/50"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-600">{item.range}</span>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
          Circle size = {metric === "claimsVolume" ? "volume" : "relativity"}
        </div>
      </div>

      <div
        ref={mapContainer}
        className="grow rounded-lg overflow-hidden"
        style={{ minHeight: 400, width: "100%", height: "400px", position: "relative" }}
      />

      {/* Map Attribution */}
      <div className="text-xs text-gray-400 mt-2 text-right">
        © Mapbox © OpenStreetMap
      </div>
    </div>
  );
}
