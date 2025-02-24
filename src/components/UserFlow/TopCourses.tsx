"use client";

import {
  BookmarkPlus,
  Calendar,
  Clock,
  Heart,
  MapPin,
  Share2,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Listing {
  _id: string;
  category: string;
  subCategory: string[];
}

const handleonClick = () => {};

export default function TopCourses() {
  const [getCategories, setCategories] = useState<Listing[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/category`)
      .then((res) => {
        setCategories(res.data);
      });
  }, []);

  return (
    <section className="bg-white/40 container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center">
        Top <span className="text-blue-600">Courses</span>
      </h2>
      <p className="text-center text-gray-500 mt-2 mb-12">
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
        cubilia <br />
        curae Proin sodales ultrices nulla blandit volutpat.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {getCategories.map((getCategories, i) => (
          <div
            key={i}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 hover:-translate-y-2">
            <div className="aspect-video relative rounded-t-xl overflow-hidden">
              <Image
                src={"/img/new/sport.svg"} // Replace with dynamic source later
                alt={getCategories.category}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">
                {getCategories.category}
              </h3>
              <p className="text-blue-500 font-bold text-sm sm:text-base mb-2 sm:mb-3">
                $ {999} {/* Replace with dynamic price */}
              </p>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{"New York"}</span>{" "}
                  {/* Replace with dynamic location */}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{"2 hr"}</span> {/* Replace with dynamic duration */}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{"Mon, Tues, Wed"}</span>{" "}
                  {/* Replace with dynamic schedule */}
                </div>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200" />
                  <span className="font-medium">{"Vinish"}</span>{" "}
                  {/* Replace with dynamic name */}
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-full">
                    <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-full">
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-full">
                    <BookmarkPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline" className="px-8 bg-blue-500 text-white">
          Load more listing
        </Button>
      </div>
    </section>
  );
}
