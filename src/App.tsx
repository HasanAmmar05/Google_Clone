import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import RelatedKeywords from './components/RelatedKeywords'
import VoiceSearch from './components/VoiceSearch'
import SearchFilters from './components/SearchFilters'
import { SearchResult } from './components/types'
import { Sun, Moon } from 'lucide-react'

export default function App() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [relatedKeywords, setRelatedKeywords] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState({ type: 'web' })
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleSearch = async (query: string) => {
    setIsLoading(true)
    try {
      const options = {
        method: 'GET',
        url: 'https://google-search74.p.rapidapi.com/',
        params: {
          query: query,
          limit: '10',
          related_keywords: 'true',
          type: filters.type,
        },
        headers: {
          'x-rapidapi-key': '8a861615ffmsh66b922b5d300103p18a62ajsn09144303544c',
          'x-rapidapi-host': 'google-search74.p.rapidapi.com'
        }
      }

      const response = await axios.request(options)
      setSearchResults(response.data.results || [])
      setRelatedKeywords(response.data.related_keywords || [])
    } catch (error) {
      console.error(error)
      setSearchResults([])
      setRelatedKeywords([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              G<span className="text-red-500">o</span><span className="text-yellow-500">o</span>g<span className="text-blue-500">l</span><span className="text-green-500">e</span> Clone
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-700" />}
            </button>
          </div>
          <div className="mb-4">
            <SearchBar onSearch={handleSearch} />
            <VoiceSearch onSearch={handleSearch}  />
          </div>
          <SearchFilters filters={filters} setFilters={setFilters} />
          <div className="mt-8 flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-3/4">
              <SearchResults results={searchResults} isLoading={isLoading} type={filters.type} />
            </div>
            <div className="w-full md:w-1/4">
              <RelatedKeywords keywords={relatedKeywords} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}