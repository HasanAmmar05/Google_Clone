import { useState } from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="flex-grow">
      <div className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Google..."
          className="w-full px-4 py-2 rounded-l-full border-2 border-blue-500 focus:outline-none focus:border-blue-600 dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-r-full hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          <Search size={24} />
        </button>
      </div>
    </form>
  )
}