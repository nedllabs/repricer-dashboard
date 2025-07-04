import type React from "react"
import { CbsaMap } from "@/components/cbsa-map"

/**
 * Server-side wrapper that injects the (private) Mapbox token into the
 * client map component.
 * Make sure `MAPBOX_ACCESS_TOKEN` is defined in your Vercel project
 * settings (Production / Preview / Development).
 */
export default function CbsaMapWrapper(props: Omit<React.ComponentProps<typeof CbsaMap>, "token">) {
  const token = process.env.MAPBOX_ACCESS_TOKEN ?? ""

  // Optional: show a fallback message if the token is missing during local preview
  if (!token) {
    return (
      <div className="rounded-xl border p-6 text-center text-sm text-red-500">
        Map cannot be displayed — missing <code>MAPBOX_ACCESS_TOKEN</code>.
      </div>
    )
  }

  return <CbsaMap {...props} token={token} />
}
