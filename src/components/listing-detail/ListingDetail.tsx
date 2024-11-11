"use client";

import React, { useEffect, useState } from "react";
import SideLayout from "./SideLayout";
import MainDetailPage from "./MainDetailPage";
import InstructorsPage from "../UserFlow/Instructor";
import Reviews from "./Reviews";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import axios from "axios";
import GoogleMapComponent from "./GoogleMapComponent";
import MapWidget from "./MapWidget";
import { useParams } from "next/navigation";

interface TrainerData {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  experience: string;
  qualifications: string;
  [key: string]: any; // Optional: for additional properties
}
interface ListingDetailPageProps {
  id:string; 
}
interface ListingCard {
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
const ListingDetail: React.FC<ListingDetailPageProps> = ({id}) => {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<TrainerData | null>(null);
  const tabs = ["Overview", "Instructors", "Curriculum", "Reviews", "FAQs"];
  const [getListing ,setListing] = useState<ListingCard >({} as ListingCard); 
  const form = useSelector((state: RootState) => state.form);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/listing/listing/${id}`
        );
        setListing(response.data.listing);
      } catch (error) {
        console.log("error");
      }
    };
  
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/trainers/` + form.trainerId.toString()
        );
        // console.log(response.data.trainer);
        setData(response.data.trainer);
        // console.log(data);
      } catch (error) {
        console.log("error");
      }
    };

    fetchData();
  }, [form.trainerId]);


  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 flex items-center ">
        <MainDetailPage  listingId ={id} listingData= {getListing} />
        <SideLayout minAgeLimit={Number(form.minAge)} maxAgeLimit={Number(form.maxAge)} listingId={id} />
      </div>
      <Reviews />
      {/* <GoogleMapComponent apiKey={googleMapsApiKey} /> */}
      {data && <InstructorsPage trainer={data} />}
    </>
  );
};

export default ListingDetail;
