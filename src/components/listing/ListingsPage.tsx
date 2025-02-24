"use client";

import type React from "react";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ListingCard from "./ListingCard";
import axios from "axios";
import SearchSection from "../UserFlow/SeachSection";

interface Listing {
  _id: string;
  category: string;
  title: string;
  imageUrl: string;
  priceMode: string;
  price: string;
  mode: string;
  location: string;
  quantity: string;
  classSize: string;
  startDate: string;
  endDate: string;
  days: string;
  gender: string;
  startTime: string;
  endTime: string;
  minAge: string;
  maxAge: string;
  description: string;
  trainerId: string;
  listingId: string;
  isFavorite: boolean;
  avgRating: number;
}

const ListingsPage: React.FC<{
  categoryName: string;
  subCategoryName: string;
}> = ({ categoryName, subCategoryName }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [keywords, setKeywords] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>(listings);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [RateRange, setRateRange] = useState<[number, number]>([10, 9980]);
  const [ageLimit, setAgeLimit] = useState<[number, number]>([1, 90]);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [get, set] = useState<boolean>(false);

  const handleSearch = () => {
    const filtered = listings.filter(
      (listing) =>
        keywords === "" ||
        listing.title.toLowerCase().includes(keywords.toLowerCase())
    );
    setFilteredListings(filtered);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const query = new URLSearchParams({
        title: keywords || "",
        category: selectedCategory || "",
        selectedSubCategory: selectedSubCategory || "",
        minPrice: RateRange[0].toString(),
        maxPrice: RateRange[1].toString(),
        minAge: ageLimit[0].toString(),
        maxAge: ageLimit[1].toString(),
        gender: selectedGender || "",
      }).toString();

      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/listing/listing/?${query}`
        );
        setListings(data);
        console.log(data);
        setFilteredListings(data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };

    fetchCourses();
  }, [
    keywords,
    selectedCategory,
    selectedSubCategory,
    RateRange,
    ageLimit,
    selectedGender,
  ]);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow">
          <div className="container mx-auto ">
            <SearchSection
              keywords={keywords}
              setKeywords={setKeywords}
              onSearch={handleSearch}
            />
          </div>
        </header>

        {/* <FilterSortBar
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          onFilter={handleSearch}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
          RateRange={RateRange}
          setRateRange={setRateRange}
          ageLimit={ageLimit}
          setAgeLimit={setAgeLimit}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          get={get}
          set={set}
        /> */}

        <div className="container mx-auto flex flex-1 px-4">
          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredListings.length > 0 ? (
              filteredListings.map((listing, idx) => (
                <ListingCard
                  subCategoryName={subCategoryName}
                  categoryName={categoryName}
                  key={idx}
                  listingId={listing._id}
                  category={listing.category}
                  title={listing.title}
                  imageUrl={listing.imageUrl}
                  priceMode={listing.priceMode}
                  price={listing.price}
                  mode={listing.mode}
                  location={listing.location}
                  avgRating={listing.avgRating}
                  trainerId={listing.trainerId}
                  quantity={listing.quantity}
                  classSize={listing.classSize}
                  startDate={listing.startDate}
                  endDate={listing.endDate}
                  days={listing.days}
                  gender={listing.gender}
                  startTime={listing.startTime}
                  endTime={listing.endTime}
                  minAge={listing.minAge}
                  maxAge={listing.maxAge}
                  description={listing.description}
                  isFavorite={listing.isFavorite}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No listings found.</p>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default ListingsPage;
