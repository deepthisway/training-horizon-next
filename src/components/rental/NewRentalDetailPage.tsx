import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

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

interface RentalProps {
  rentalId: string;
}

const NewRentalDetailPage: React.FC<RentalProps> = ({ rentalId }) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>("/img/animation2.gif");
  const [listing, setListing] = useState<Rentals | null>(null);

  useEffect(() => {
    const fetchListingData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/rentals/${rentalId}`
        );
        setListing(response.data);
      } catch (error) {
        console.error("Error fetching listing data:", error);
      }
    };

    if (rentalId) {
      fetchListingData();
    }
  }, [rentalId]);

  const formattedDays = listing?.availability?.days.join(", ") || "N/A";

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="w-[800px] h-[400px] relative overflow-hidden rounded-lg">
          <Image src={listing?.images?.[0] || imageUrl} alt="img" layout="fill" objectFit="cover" />
        </div>

        <div className="md:col-span-2 space-y-4">
          <h1 className="mt-10 text-3xl font-bold">{listing?.name || "Rental Name"}</h1>
          <div className="flex justify-between">
            <p className="text-gray-500 flex items-center font-bold">From: {formattedDays}</p>
            <p className="text-gray-500 flex items-center font-bold">
              Price: ${listing?.pricing?.dailyRate || "N/A"} / hr
            </p>
          </div>
          <div className="flex items-center gap-2 font-bold">Mode: On-Site</div>
          <div className="flex items-center gap-2 font-bold">
            Location: {listing?.address?.street || "N/A"}
          </div>
          <div>
            <p className="text-xl flex items-center font-bold">About This Rental</p>
            <p className="text-gray-700">{listing?.amenities?.join(", ") || "No amenities listed."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRentalDetailPage;
