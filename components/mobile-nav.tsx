'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getCurrentDay } from '@/lib/storage'

export function MobileNav() {
  const pathname = usePathname()
  const [currentDay, setCurrentDay] = useState(1)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCurrentDay(getCurrentDay())
  }, [])

  if (!mounted) return null

  const isActive = (path: string) => pathname === path

  return (
    <nav className="hidden md:hidden fixed bottom-0 left-0 right-0 bg-[#0D0D1A] border-t border-[#1E1E2E] z-50">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
            isActive('/') ? 'text-[#00D4FF]' : 'text-gray-400 hover:text-white'
          }`}
        >
          <span className="text-xl">🏠</span>
          <span className="text-xs">Home</span>
        </Link>
        <Link
          href={`/day/${currentDay}`}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
            pathname.startsWith('/day/') ? 'text-[#00D4FF]' : 'text-gray-400 hover:text-white'
          }`}
        >
          <span className="text-xl">📅</span>
          <span className="text-xs">Today</span>
        </Link>
        <Link
          href="/progress"
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
            isActive('/progress') ? 'text-[#00D4FF]' : 'text-gray-400 hover:text-white'
          }`}
        >
          <span className="text-xl">📊</span>
          <span className="text-xs">Progress</span>
        </Link>
      </div>
    </nav>
  )
}
