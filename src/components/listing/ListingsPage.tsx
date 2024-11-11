"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSideBar";
import ListingCard from "./ListingCard";
import axios from 'axios';

interface Listing {
  _id: string;
  category: string;
  title: string;
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
}

const ListingsPage: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [keywords, setKeywords] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>(listings);

    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/listing/bulk?filter=${keywords || selectedCategories }`).then((res)=>{
          setListings( res.data);
        })
    },[keywords,selectedCategories])

  //   useEffect(()=>{
  //     axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/listing/bulk?filter=${keywords || selectedCategories }`).then((res)=>{
  //       setListings( res.data);
  //     })
  // },[keywords,selectedCategories])


  const handleSearch = () => {
    const filtered = listings.filter((listing) => {
      const matchesKeywords =
        keywords === "" ||
        listing.title.toLowerCase().includes(keywords.toLowerCase());
      // const matchesLocation = location === '' || listing.location.toLowerCase().includes(location.toLowerCase());
      // return matchesKeywords && matchesLocation;
      return matchesKeywords;
    });

    setFilteredListings(filtered);
  };

  const handleFilter = () => {
    const filtered = listings.filter((listing) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(listing.category);
      return matchesCategory;
    });

    setFilteredListings(filtered);
  };
  // console.log(listings[0].trainerId);

  return (
    <>
      <div>{/* <h1>{listings[0].trainerId}</h1> */}</div>
      <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow">
          <div className="container mx-auto">
            <SearchBar
              keywords={keywords}
              setKeywords={setKeywords}
              // location={location}
              // setLocation={setLocation}
              onSearch={handleSearch}
            />
          </div>
        </header>

        <div className="container mx-auto flex flex-1">
          <aside className="w-1/4">
            <FilterSidebar
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              // onFilter={handleFilter}
            />
          </aside>

          <main className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.length > 0 ? (
              listings.map((listing, idx) => (
                // <ListingCard key={idx} {...listing} />
                <ListingCard 
                key={idx}
                listingId={listing._id} // Make sure listing._id is passed here
                category={listing.category}
                title={listing.title}
                priceMode={listing.priceMode}
                price={listing.price}
                mode={listing.mode}
                location={listing.location} trainerId={listing.trainerId} quantity={listing.quantity} classSize={listing.classSize} startDate={listing.startDate} endDate={listing.endDate} days={listing.days} gender={listing.gender} startTime={listing.startTime} endTime={listing.endTime} minAge={listing.minAge} maxAge={listing.maxAge} description={listing.description} isFavorite={false}/>
              ))
            ) : (
              <p>No listings found.</p>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default ListingsPage;
