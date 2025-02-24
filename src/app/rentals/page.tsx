// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import SearchBar from "@/components/listing/SearchBar"
// import ListingCard from "@/components/UserFlow/NavBar"
// import axios from "axios"
// import SearchSection from "@/components/UserFlow/SeachSection"
// import Navbar from "@/components/UserFlow/NavBar"

// interface Listing {
//   _id: string
//   category: string
//   title: string
//   imageUrl: string
//   priceMode: string
//   price: string
//   mode: string
//   location: string
//   quantity: string
//   classSize: string
//   startDate: string
//   endDate: string
//   days: string
//   gender: string
//   startTime: string
//   endTime: string
//   minAge: string
//   maxAge: string
//   description: string
//   trainerId: string
//   listingId: string
//   isFavorite: boolean
//   avgRating: number
// }

// const ListingsPage: React.FC<{
//   categoryName: string
//   subCategoryName: string
// }> = ({ categoryName, subCategoryName }) => {
//   const [rentals, setRentals] = useState<Rental[]>([])
//   const [keywords, setKeywords] = useState<string>("")
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([])
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
//   const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)
//   const [RateRange, setRateRange] = useState<[number, number]>([10, 9980])
//   const [ageLimit, setAgeLimit] = useState<[number, number]>([2, 90])
//   const [selectedGender, setSelectedGender] = useState<string | null>(null)
//   const [get, set] = useState<boolean>(false)

//   const handleSearch = () => {
//     const filtered = listings.filter(
//       (listing) => keywords === "" || listing.title.toLowerCase().includes(keywords.toLowerCase()),
//     )
//     setFilteredListings(filtered)
//   }

//   useEffect(() => {
//     const fetchCourses = async () => {
//       const query = new URLSearchParams({
//         title: keywords || "",
//         category: selectedCategory || "",
//         selectedSubCategory: selectedSubCategory || "",
//         minPrice: RateRange[0].toString(),
//         maxPrice: RateRange[1].toString(),
//         minAge: ageLimit[0].toString(),
//         maxAge: ageLimit[1].toString(),
//         gender: selectedGender || "",
//       }).toString()

//       try {
        
//       } catch (error) {
//         console.error("Failed to fetch listings:", error)
//       }
//     }

//     fetchCourses()
//   }, [keywords, selectedCategory, selectedSubCategory, RateRange, ageLimit, selectedGender])

//   return (
//     <>
//     <Navbar/>
//       <div className="min-h-screen flex flex-col">
//         <header className="bg-white shadow">
//           <div className="container mx-auto ">
//             <SearchSection keywords={keywords} setKeywords={setKeywords} onSearch={handleSearch} />
//           </div>
//         </header>

//         {/* <FilterSortBar
//           selectedCategories={selectedCategories}
//           setSelectedCategories={setSelectedCategories}
//           onFilter={handleSearch}
//           selectedCategory={selectedCategory}
//           setSelectedCategory={setSelectedCategory}
//           selectedSubCategory={selectedSubCategory}
//           setSelectedSubCategory={setSelectedSubCategory}
//           RateRange={RateRange}
//           setRateRange={setRateRange}
//           ageLimit={ageLimit}
//           setAgeLimit={setAgeLimit}
//           selectedGender={selectedGender}
//           setSelectedGender={setSelectedGender}
//           get={get}
//           set={set}
//         /> */}

//       </div>
//     </>
//   )
// }

// export default ListingsPage


import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page