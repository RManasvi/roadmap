'use client'

import { useEffect, useRef, useState } from 'react'

interface SearchBarProps {
  onQueryChange: (query: string) => void
}

export function SearchBar({ onQueryChange }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleQueryChange = (value: string) => {
    setQuery(value)
    onQueryChange(value)
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div className="relative">
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0D0D1A] border border-[#1E1E2E] cursor-text"
          onClick={() => setIsOpen(true)}
        >
          <span className="text-gray-500">🔍</span>
          {!isOpen ? (
            <p className="text-sm text-gray-500">Search days by topic... (Ctrl+K)</p>
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
              placeholder="Search days by topic..."
            />
          )}
        </div>

        {isOpen && query && (
          <div className="fixed top-16 left-1/2 transform -translate-x-1/2 w-96 max-h-96 bg-[#0D0D1A] border border-[#1E1E2E] rounded-lg shadow-2xl z-50 overflow-y-auto">
            <div className="p-4">
              <p className="text-sm text-gray-400">
                Searching for: <span className="text-white font-semibold">"{query}"</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
