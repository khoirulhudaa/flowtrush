"use client"

import dynamic from "next/dynamic"

const Sidebar = dynamic(() => import('@/components/Layouts/sidebar'), {
  ssr: false,
  loading: () => <div className='w-screen h-screen z-[999999999999999] bg-white text-black text-center flex justify-center items-center text-[20px] font-normal fixed left-0 top-0'><p>Loading...</p></div>
})

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
