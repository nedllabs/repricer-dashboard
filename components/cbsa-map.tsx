"use client"

import { useEffect, useRef } from "react"
import type * as mapboxglType from "mapbox-gl" // type-only import, erased at runtime
import cbsaMetrics from "@/data/cbsa-metrics.json"
import cbsaMapConfig from "@/data/cbsa-map-config.json"
import type { GeoJSON } from "geojson"

type MetricKey = "claimsVolume" | "rateRelativity"

interface CbsaMapProps {
  title: string
  metric: MetricKey
  legendUnit: string
  token: string
}

/* -------------------------------------------------------------------------- */
/*                          Utility – load Mapbox GL                          */
/* -------------------------------------------------------------------------- */
function loadMapboxGL(): Promise<typeof mapboxglType> {
  // If it’s already on the window, resolve immediately
  if (typeof window !== "undefined" && (window as any).mapboxgl) {
    return Promise.resolve((window as any).mapboxgl as typeof mapboxglType)
  }

  return new Promise((resolve, reject) => {
    if (typeof document === "undefined") return reject("No DOM")

    const script = document.createElement("script")
    script.src = "https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.js"
    script.async = true
    script.crossOrigin = "anonymous"
    script.onload = () => {
      if ((window as any).mapboxgl) {
        resolve((window as any).mapboxgl as typeof mapboxglType)
      } else {
        reject("Mapbox GL failed to load")
      }
    }
    script.onerror = () => reject("Unable to load Mapbox GL script")
    document.head.appendChild(script)
  })
}

/* -------------------------------------------------------------------------- */
/*                                Color helpers                               */
/* -------------------------------------------------------------------------- */
function getRadiusForValue(value: number, metric: MetricKey): number {
  if (metric === "claimsVolume") {
    // Scale radius based on claims volume (min: 8px, max: 25px)
    return Math.max(8, Math.min(25, (value / 10000) * 25 + 8))
  }
  // Rate relativity (min: 10px, max: 22px)
  return Math.max(10, Math.min(22, ((value - 76) / (138 - 76)) * 12 + 10))
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
export function CbsaMap({ title, metric, legendUnit, token }: CbsaMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxglType.Map | null>(null)

  useEffect(() => {
    let isMounted = true

    async function init() {
      try {
        const mapboxgl = await loadMapboxGL()
        if (!isMounted || !mapContainer.current || mapRef.current) return

        mapboxgl.accessToken = token

        // Convert point list to GeoJSON FeatureCollection
        const featureCollection: GeoJSON.FeatureCollection = {
          type: "FeatureCollection",
          features: cbsaMetrics.map((cbsa) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [cbsa.lng, cbsa.lat],
            },
            properties: cbsa,
          })),
        }

        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/light-v11",
          center: [-79.5, 35.5],
          zoom: 6.5,
        })
        mapRef.current = map

        map.on("load", () => {
          map.addSource("cbsa-points", { type: "geojson", data: featureCollection })

          const colorScale = cbsaMapConfig.colorScales[metric]

          // Helper to build paint arrays
          const radiusStops = colorScale.flatMap((s: any) => [s.value, getRadiusForValue(s.value, metric)])
          const colorStops = colorScale.flatMap((s: any) => [s.value, s.color])

          // Outer glow layer
          map.addLayer({
            id: "cbsa-glow",
            type: "circle",
            source: "cbsa-points",
            paint: {
              "circle-radius": ["interpolate", ["linear"], ["get", metric], ...radiusStops.map((r) => r * 2.5)],
              "circle-color": ["interpolate", ["linear"], ["get", metric], ...colorStops],
              "circle-opacity": 0.15,
              "circle-blur": 1,
            },
          })

          // Main circles
          map.addLayer({
            id: "cbsa-circles",
            type: "circle",
            source: "cbsa-points",
            paint: {
              "circle-radius": ["interpolate", ["linear"], ["get", metric], ...radiusStops],
              "circle-color": ["interpolate", ["linear"], ["get", metric], ...colorStops],
              "circle-opacity": 0.8,
              "circle-stroke-width": 2,
              "circle-stroke-color": "#ffffff",
              "circle-stroke-opacity": 0.9,
            },
          })

          // Inner highlight
          map.addLayer({
            id: "cbsa-highlight",
            type: "circle",
            source: "cbsa-points",
            paint: {
              "circle-radius": ["interpolate", ["linear"], ["get", metric], ...radiusStops.map((r) => r * 0.3)],
              "circle-color": "#ffffff",
              "circle-opacity": 0.4,
            },
          })

          /* ----------------------------- Interactions ---------------------------- */
          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            className: "cbsa-popup",
          })

          const layers = ["cbsa-circles", "cbsa-glow", "cbsa-highlight"] as const

          layers.forEach((layer) => {
            map.on("mouseenter", layer, (e) => {
              map.getCanvas().style.cursor = "pointer"
              if (!e.features?.length) return
              const props: any = e.features[0].properties
              popup
                .setLngLat([props.lng, props.lat])
                .setHTML(
                  `<div style="padding:12px;font-family:system-ui">
                     <div style="font-size:14px;font-weight:600;margin-bottom:8px;color:#374151">
                       ${props.cbsa}
                     </div>
                     <div style="font-size:12px;color:#6b7280;margin-bottom:4px">
                       <strong>Claims Volume:</strong> ${props.claimsVolume.toLocaleString()}
                     </div>
                     <div style="font-size:12px;color:#6b7280">
                       <strong>Rate Relativity:</strong> ${props.rateRelativity}${legendUnit}
                     </div>
                   </div>`,
                )
                .addTo(map)
            })

            map.on("mouseleave", layer, () => {
              map.getCanvas().style.cursor = ""
              popup.remove()
            })

            map.on("click", layer, (e) => {
              if (!e.features?.length) return
              const p: any = e.features[0].properties
              map.flyTo({ center: [p.lng, p.lat], zoom: 8, duration: 1000 })
            })
          })
        })
      } catch (err) {
        console.error("Map initialisation failed:", err)
      }
    }

    init()

    // Cleanup
    return () => {
      isMounted = false
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [metric, legendUnit, token])

  /* --------------------------------- Render --------------------------------- */
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5e7eb] flex flex-col relative">
      <h4 className="font-semibold text-[#374151] mb-4 font-comfortaa">{title}</h4>

      {/* Legend */}
      <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
        <div className="text-xs font-semibold text-gray-700 mb-2">
          {metric === "claimsVolume" ? "Claims Volume" : "Rate Relativity (%)"}
        </div>
        <div className="space-y-1">
          {cbsaMapConfig.legendRanges[metric].map((item: any, idx: number) => (
            <div key={idx} className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full border border-white/50" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-gray-600">{item.range}</span>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
          Circle size = {metric === "claimsVolume" ? "volume" : "relativity"}
        </div>
      </div>

      <div ref={mapContainer} className="flex-grow rounded-lg overflow-hidden" style={{ minHeight: 400 }} />

      {/* Attribution */}
      <div className="text-xs text-gray-400 mt-2 text-right">© Mapbox © OpenStreetMap</div>
    </div>
  )
}
