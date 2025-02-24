import { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
// import router from "next/router";
import { useRouter } from "next/navigation";
import Listing from "../show_all_listings/Listing";
import CustomCalendar from "./Calendar";
import Calendar from "./Calendar";

interface Listing {
  category: string;
  title: string;
  priceMode: string;
  price: string;
  mode: string;
  imageUrl: string;
  location: string;
  quantity: string;
  classSize: string;
  startDate: string;
  endDate: string;
  days: [string];
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
interface ListingId {
  listingData: Listing;
  listingId: string;
  instructorData: TrainerData;
}
interface TrainerData {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  experience: string;
  qualifications: string;
  avgRating: number;
}

interface InstructorsPageProps {
  trainer: TrainerData; // Expecting a trainer prop
}
const NewDetailPage: React.FC<ListingId> = ({
  listingId,
  listingData,
  instructorData,
}) => {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const form = useSelector((state: RootState) => state.form);
  const [isSelected, setIsSelected] = useState<boolean>(form.isFavorite);

  const [getImageUrl, setImageUrl] = useState<string>("/img/animation2.gif");

  useEffect(() => {
    const fetchFavorites = async () => {
      console.log("imageUrl", listingData.imageUrl);
      const userId = window.localStorage.getItem("userId");
      if (!userId) {
        return;
      }
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/favorites/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const { favorites } = await response.json();
          setFavorites(favorites);
          setIsSelected(favorites.includes(listingData.listingId)); // Check if this listing is a favorite
        } else {
          console.error("Error fetching user favorites");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    const fetchImage = async () => {
      try {
        const response2 = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/upload?imageUrl=${listingData.imageUrl}`
        );
        if (!response2.ok) throw new Error("Failed to fetch signed URL");

        const data = await response2.json();
        setImageUrl(data.signedUrl);
        console.log(getImageUrl);
      } catch (error) {}
    };

    console.log("Image url : ", getImageUrl);

    fetchFavorites();
    fetchImage();
  }, [listingData.listingId, listingData.imageUrl]);
  function formatDays(days: string[]) {
    return days?.map((day) => day.replace(/([A-Z][a-z]+)/g, " $1")).join(", ");
  }

  // Handle favorite button click
  const handleOnClick = async (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const newIsSelected = !isSelected;
    setIsSelected(newIsSelected);

    const userId = window.localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to use this feature");
      router.push("/userflow/login");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/favorites`,
        {
          method: newIsSelected ? "POST" : "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ userId, listingId }),
        }
      );

      if (response.ok) {
        if (newIsSelected) {
          setFavorites((prevFavorites) => [
            ...prevFavorites,
            listingData.listingId,
          ]);
          console.log("Favorite added successfully");
        } else {
          setFavorites((prevFavorites) =>
            prevFavorites.filter((id) => id !== listingData.listingId)
          );
          console.log("Favorite removed successfully");
        }
      } else {
        const errorData = await response.json();
        console.error(
          newIsSelected ? "Error adding favorite:" : "Error removing favorite:",
          errorData.message
        );
        setIsSelected(!newIsSelected); // Revert state if API call fails
      }
    } catch (error) {
      console.error("Error processing favorite:", error);
      setIsSelected(!newIsSelected); // Revert state if API call fails
    }
  };

  const handleViewProfile = (id: string) => {
    router.push(`/dashboard/teacher/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="">
        <div className="w-[800px] h-[400px] relative overflow-hidden rounded-lg">
          <Image src={getImageUrl} alt="img" layout="fill" objectFit="cover" />
        </div>

        <div className="md:col-span-2 space-y-4">
          <h1 className="mt-10 text-3xl font-bold">{listingData.title}</h1>
          <div className="flex justify-between">
            <p className="text-gray-500 flex items-center font-bold">
              From : {listingData.startDate} &bull; To : {listingData.endDate}
            </p>
            <p className="text-gray-500 flex items-center font-bold">
              Price : ${listingData.price} / {listingData.priceMode}
            </p>
            <p className="text-gray-500 flex items-center font-bold">
              Age Group : {listingData.minAge} - {listingData.maxAge}
            </p>
          </div>
          <div className="flex justify-between">

          <p className="text-gray-500 flex items-center font-bold">
              Class Type : {listingData.classSize}
            </p>
          <p className="text-gray-500 flex items-center font-bold">
            Days: {formatDays(listingData.days)}
          </p>
          </div>
          <div className="flex justify-between">
            <div className="text-gray-500 flex items-center gap-2 font-bold">
              Mode : {listingData.mode}
            </div>
            <div className="text-gray-500 flex items-center gap-2 font-bold">
              {listingData.mode === "Offline" ? `Location` : `Link`}:{" "}
              {listingData.location}
            </div>
          </div>
          <div>
            <p className="text-xl flex items-center font-bold">
              About This Course
            </p>
            <p className="text-gray-700">{listingData.description}</p>
          </div>
        </div>
      </div>

      {/* Schedule */}

      {/* <div>
      <Calendar year={2025} startDate={listingData.startDate} endDate={listingData.endDate} days={listingData.days} />

      </div> */}

      {/* Instructor */}
      <div className="border p-4 rounded-lg shadow-md flex flex-col">
        <h2 className="mb-10 text-3xl font-bold">About Instructor</h2>
        <div className="p-4 rounded-lg flex items-center gap-10">
          <Image
            src="/img/bp1.svg"
            alt="Instructor"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <div>
              <h3 className="text-lg font-semibold">
                {instructorData.fname} {instructorData.lname}
              </h3>
              <div>
                Rating :<i className="fas fa-book"></i>{" "}
                {instructorData.avgRating}⭐
              </div>
            </div>
            <p className="text-gray-500">
              Qualifications : {instructorData.qualifications}
            </p>
            <p className="text-gray-500">
              Years of Experience : {instructorData.experience}
            </p>
            <p className="text-gray-500">Email: {instructorData.email}</p>
            <div className="flex items-center gap-1 text-yellow-500"></div>
          </div>
          <button
            onClick={() => handleViewProfile(instructorData._id)}
            className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewDetailPage;
