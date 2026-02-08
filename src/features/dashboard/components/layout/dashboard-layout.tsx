'use client'

import { Sidebar } from './sidebar'
import { TopNav } from './top-nav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar />
      </div>
      <main className="md:pl-72 pb-10 min-h-screen bg-gray-50/50">
        <TopNav />
        <div className="px-4 sm:px-8 lg:px-12">
            {children}
        </div>
      </main>
    </div>
  )
}
