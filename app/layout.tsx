import type React from "react"
import type { Metadata } from "next"
import { Inter, Comfortaa } from "next/font/google"
import "./globals.css"
import { HeaderNavigation } from "@/components/header-navigation"
import "mapbox-gl/dist/mapbox-gl.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "NEDL Analytics Dashboard",
  description: "Healthcare analytics and claims processing dashboard",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${comfortaa.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9]">
          <HeaderNavigation />
          {children}
        </div>
      </body>
    </html>
  )
}
