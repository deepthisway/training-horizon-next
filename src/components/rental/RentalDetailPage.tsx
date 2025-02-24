"use client"

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setForm } from "@/lib/store/formSlice";
import NewRentalDetailPage from "./NewRentalDetailPage";
import SideLayout from "../listing-detail/SideLayout";
import Reviews from "../listing-detail/Reviews";



interface TrainerData {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  experience: string;
  qualifications: string;
  phone: string;
  avgRating: number;
  [key: string]: any;
}

interface ListingDetailPageProps {
  rentalId: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Availability {
  days: string[];
}

interface Pricing {
  dailyRate: number;
  hourlyRate: number;
}

interface Rentals {
  _id: string;
  name: string;
  email: string;
  address: Address;
  availability: Availability;
  pricing: Pricing;
  ratings: number;
  amenities: string[];
  timeSlots: string[];
  images: string[];
  reviews: string[];
}

const ListingDetail: React.FC<ListingDetailPageProps> = ({ rentalId }) => {
  const [data, setData] = useState<TrainerData | null>(null);
  const [getListing, setListing] = useState<Rentals>({} as Rentals);
  const form = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  // Fetch listing details
  useEffect(() => {
    const fetchListingData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/listing/listing/${rentalId}`
        );
        const listing = response.data.listing;
        setListing(listing);
        dispatch(setForm(listing))
      } catch (error) {
        console.log("Error fetching listing data:", error);
      }
    };

    fetchListingData();
  }, [rentalId, dispatch]);

  // Fetch trainer details if trainerId is available
  useEffect(() => {
    if (form.trainerId) {
      const fetchTrainerData = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/trainers/${form.trainerId}`
          );
          setData(response.data.trainer);
        } catch (error) {
          console.log("Error fetching trainer data:", error);
        }
      };

      fetchTrainerData();
    }
  }, [form.trainerId]);

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8 bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start">

        <div className="w-full md:w-2/3">
          <NewRentalDetailPage rentalId={rentalId} />
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-1/3">
        
          <SideLayout
            minAgeLimit={Number(form.minAge)}
            maxAgeLimit={Number(form.maxAge)}
            listingId={rentalId}
            trainerPhone={data?.phone ?? ""}
          />
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Reviews</h2>
        <Reviews listingId={rentalId} />
      </div>
    </div>
  );
};

export default ListingDetail;
