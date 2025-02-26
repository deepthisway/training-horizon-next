"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

interface SearchWordProps {
  keywords: string
  setKeywords: Dispatch<SetStateAction<string>>
  onSearch: () => void
}

const SearchWord: React.FC<SearchWordProps> = ({ keywords, setKeywords, onSearch }) => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/all/courses?keywords=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <section className="bg-white/20 container mx-auto px-4 py-24">
      <div className="flex flex-row justify-end max-w-2xl mx-auto relative">
        <Input
          type="text"
          value={keywords}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Courses..."
          className="w-full pl-4 pr-20 py-6 shadow-lg rounded-full"
        />
        <Button
          onClick={handleSearch}
          className="absolute bg-blue-500 hover:bg-blue-600 rounded-full py-6 px-8"
        >
          Search
        </Button>
      </div>
    </section>
  )
}

export default SearchWord

