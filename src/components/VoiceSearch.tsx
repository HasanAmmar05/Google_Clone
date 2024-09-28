import { useState } from 'react'
import { Mic } from 'lucide-react'

interface VoiceSearchProps {
  onSearch: (query: string) => void
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function VoiceSearch({ onSearch }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false)

  const startListening = () => {
    setIsListening(true)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        onSearch(transcript)
      }
      recognition.onend = () => setIsListening(false)
      recognition.start()
    } else {
      alert('Speech recognition is not supported in your browser.')
    }
  }

  return (
    <button
      onClick={startListening}
      disabled={isListening}
      className={`ml-2 p-2 rounded-full mt-4 ${
        isListening ? 'bg-red-500' : 'bg-blue-500'
      } text-white hover:bg-opacity-80 transition duration-300 ease-in-out`}
    >
      <Mic size={24} />
    </button>
  )
}