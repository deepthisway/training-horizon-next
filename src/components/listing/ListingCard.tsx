"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setForm } from "@/lib/store/formSlice";
import Image from "next/image";

interface ListingCardProps {
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

const ListingCard: React.FC<ListingCardProps> = ({
  category,
  title,
  priceMode,
  price,
  mode,
  location,
  quantity,
  classSize,
  startDate,
  endDate,
  days,
  gender,
  startTime,
  endTime,
  minAge,
  maxAge,
  description,
  trainerId,
  listingId,
  isFavorite,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(isFavorite);
  const [favorites, setFavorites] = useState<string[]>([]);
  const dispatch = useDispatch();
 
  const router = useRouter();

  const sendData = () => {
    dispatch(
      setForm({
        category,
        title,
        priceMode,
        price,
        mode,
        location,
        quantity,
        classSize,
        startDate,
        endDate,
        days,
        gender,
        startTime,
        endTime,
        minAge,
        maxAge,
        description,
        trainerId,
        isFavorite,
      })
    );
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = window.localStorage.getItem('userId');
      if (!userId) {
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/favorites/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${ window.localStorage.getItem('token') }`,
                },
    });

  if (response.ok) {
    const { favorites } = await response.json();
    setFavorites(favorites);
    setIsSelected(favorites.includes(listingId)); // Check if this listing is a favorite
  } else {
    console.error('Error fetching user favorites');
  }
} catch (error) {
  console.error('Error fetching favorites:', error);
}
    };

fetchFavorites();
}, [listingId]);

// Handle favorite button click
const handleOnClick = async (event: React.MouseEvent<HTMLImageElement>) => {
  event.preventDefault();
  event.stopPropagation();

  const newIsSelected = !isSelected;
  setIsSelected(newIsSelected);

  const userId = window.localStorage.getItem('userId');
  if (!userId) {
    alert("Please log in to use this feature");
    router.push("/userflow/login");
    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/favorites`, {
      method: newIsSelected ? 'POST' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ window.localStorage.getItem('token') }`,
            },
  body: JSON.stringify({ userId, listingId }),
        });

if (response.ok) {
  if (newIsSelected) {
    setFavorites((prevFavorites) => [...prevFavorites, listingId]);
    console.log('Favorite added successfully');
  } else {
    setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== listingId));
    console.log('Favorite removed successfully');
  }
} else {
  const errorData = await response.json();
  console.error(newIsSelected ? 'Error adding favorite:' : 'Error removing favorite:', errorData.message);
  setIsSelected(!newIsSelected); // Revert state if API call fails
}
    } catch (error) {
  console.error('Error processing favorite:', error);
  setIsSelected(!newIsSelected); // Revert state if API call fails
}
};

return (
  <div className="flex-col max-sm:w-10/12 rounded-sm overflow-hidden hover:ring-sky-500 hover:scale-105 ring-1 ring-gray-200 shadow-3xl bg-white w-[18rem] h-[24rem]">
    <div className="h-5/6 cursor-pointer" onClick={() => {
      sendData();
      router.push(`/courses/${listingId}`);
    }}>
      <div className="h-1/2 w-full">
        <Image
          src={"/img/tempListingImg.jpg"}
          alt={title}
          className="w-full object-cover h-full"
          width={500}   
          height={300}
        />
      </div>
      <div className="h-1/2">
        <div className="bg-white h-4/5 p-3 w-full ">
          <h3 className="text-xl font-semibold truncate overflow-hidden whitespace-nowrap">{title}</h3>
          <p className="text-sm text-gray-500">Starting: {startDate}</p>
          <p className="text-xs text-gray-500">{gender}</p>
          <p className="text-xs text-gray-500">{days}</p>
          <p className="text-xs text-gray-500">Age: {minAge}-{maxAge}</p>
        </div>
      </div>
    </div>

    <div className="w-full bg-white h-1/6 ring-1 ring-gray-200 flex flex-row justify-between p-3">
      <div className="w-5/6 flex items-center justify-start">
        <div className="text-xl">$ {price}.00 <span className="text-gray-400 text-xs">{priceMode === "Per day" ? "/day" : priceMode === "Per month" ? "/month" : "/course"}</span></div>
      </div>
      <div className="h-full flex items-center justify-center w-1/6">
        <Image
          src={`${isSelected ? `/icons/filled_fav.png` : `/icons/fav.png`}`}
          alt="fav"
          className="cursor-pointer"
          width={25} 
          height={25}   
          onClick={handleOnClick}
        />
      </div>
    </div>

  </div>
);
};

export default ListingCard;