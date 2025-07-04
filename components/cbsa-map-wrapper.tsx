import type React from "react";
import { CbsaMap } from "@/components/cbsa-map";

/*
 * Server component wrapper. Reads the environment variable on the server
 * and passes it as a regular prop to the client component.
 */
export default function CbsaMapWrapper(
  props: Omit<React.ComponentProps<typeof CbsaMap>, "token">
) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";
  return <CbsaMap {...props} token={token} />;
}
