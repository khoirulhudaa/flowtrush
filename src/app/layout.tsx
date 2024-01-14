"use client"

import Sidebar from "@/components/Layouts/sidebar"
import ProviderMain from "@/store/provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className='flex'>
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  )
}
