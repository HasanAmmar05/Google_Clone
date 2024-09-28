import { Image, Newspaper, Video, ShoppingBag, Map, BookOpen, MoreHorizontal } from 'lucide-react'

interface SearchFiltersProps {
  filters: { type: string }
  setFilters: React.Dispatch<React.SetStateAction<{ type: string }>>
}

export default function SearchFilters({ filters, setFilters }: SearchFiltersProps) {
  const filterOptions = [
    { label: 'All', value: 'web', icon: null },
    { label: 'Images', value: 'image', icon: Image },
    { label: 'News', value: 'news', icon: Newspaper },
    { label: 'Videos', value: 'video', icon: Video },
    { label: 'Shopping', value: 'shopping', icon: ShoppingBag },
    { label: 'Maps', value: 'maps', icon: Map },
    { label: 'Books', value: 'books', icon: BookOpen },
  ]

  return (
    <div className="flex items-center space-x-4 border-b dark:border-gray-700 pb-2">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => setFilters({ type: option.value })}
          className={`flex items-center space-x-1 px-3 py-2 rounded-full ${
            filters.type === option.value
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {option.icon && <option.icon size={16} />}
          <span>{option.label}</span>
        </button>
      ))}
      <button className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-full">
        <MoreHorizontal size={16} />
        <span className="sr-only">More options</span>
      </button>
    </div>
  )
}