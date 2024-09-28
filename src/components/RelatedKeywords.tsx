interface RelatedKeywordsProps {
    keywords: string[]
  }
  
  export default function RelatedKeywords({ keywords }: RelatedKeywordsProps) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Related Keywords</h2>
        {Array.isArray(keywords) && keywords.length > 0 ? (
          <ul className="space-y-2">
            {keywords.map((keyword, index) => (
              <li key={index} className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300">
                {keyword}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No related keywords available.</p>
        )}
      </div>
    )
  }