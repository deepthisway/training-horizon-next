"use client"; // This marks the component as a Client Component
import axios from 'axios';
import { useState, useEffect } from 'react';
import ListingCard from '../listing/ListingCard';

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
  isfavorite: boolean;
}

const FavoriteListingIds = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]); // Always initialized as an array
  const [listingDetails, setListingDetails] = useState<Listing[]>([]); // State to store listing details

  // Fetch favorite listing IDs
  useEffect(() => {
    const fetchFavoriteIds = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = window.localStorage.getItem('userId');

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/favorites/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && Array.isArray(response.data.favorites)) {
          setFavoriteIds(response.data.favorites); // Ensure it's an array
        } else {
          setFavoriteIds([]); // Fallback to an empty array if the response is not valid
        }
      } catch (error) {
        console.error('Error fetching favorite listing IDs:', error);
        setFavoriteIds([]); // Fallback to empty array on error
      }
    };
    fetchFavoriteIds();
  }, []);

  // Fetch details for each listing ID
  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const detailsPromises = favoriteIds.map(id =>
          axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/listing/listing/${id}`) // Fetch details for each listing ID
        );
        const results = await Promise.all(detailsPromises);
        const listings = results.map(result => result.data.listing); // Adjust based on your API response structure
        setListingDetails(listings); // Store fetched listing details
        console.log(listings);
      } catch (error) {
        console.error('Error fetching listing details:', error);
      }
    };

    if (favoriteIds.length > 0) {
      fetchListingDetails(); // Fetch details only if favoriteIds is a non-empty array
    }
  }, [favoriteIds]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-3/4">
        <div className="w-full text-center text-3xl my-4 font-bold text-gray-700">Your Favorite Courses</div>

        <hr className="w=full border-2 border-sky-500 mb-10" />

        <div className="w-full">
          <div className="flex gap-6 flex-wrap justify-evenly">
            {listingDetails.length > 0 ? (
              listingDetails.map(listing => (
                <ListingCard
                  key={listing._id}
                  listingId={listing._id}
                  category={listing.category}
                  title={listing.title}
                  priceMode={listing.priceMode}
                  price={listing.price}
                  mode={listing.mode}
                  trainerId={listing.trainerId}
                  location={listing.location}
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
                  description={""}
                  isFavorite={true} // Indicate that this listing is a favorite
                />
              ))
             ) : (
              <p className="text-xl my-10 font-bold">NO LISTING FOUND</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteListingIds;
