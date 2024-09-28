import { SearchResult } from './types'
import { ExternalLink } from 'lucide-react'

interface SearchResultsProps {
  results: SearchResult[]
  isLoading: boolean
  type: string
}

export default function SearchResults({ results, isLoading, type }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-400">
        No results found. Try a different search query.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {results.map((result, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
          {type === 'image' && result.image && (
            <img src={result.image} alt={result.title} className="w-full h-48 object-cover mb-4 rounded" />
          )}
          {type === 'video' && result.video && (
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe src={result.video} allowFullScreen className="w-full h-full rounded"></iframe>
            </div>
          )}
          <div className="flex items-center mb-2">
            <img src={`https://www.google.com/s2/favicons?domain=${result.url}`} alt="Favicon" className="w-4 h-4 mr-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">{new URL(result.url).hostname}</p>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
            <a href={result.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
              {result.title}
              <ExternalLink size={16} className="ml-2" />
            </a>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{result.description}</p>
        </div>
      ))}
    </div>
  )
}