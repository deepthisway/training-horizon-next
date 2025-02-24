"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface Listing {
  _id: string;
  category: string;
  subCategory: string[];
}

const Categories = () => {
  const [getCategories, setCategories] = useState<Listing[]>([]);
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) setItemsPerPage(4); // Large screens
      else if (window.innerWidth >= 768) setItemsPerPage(2); // Medium screens
      else setItemsPerPage(1); // Small screens
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const pageCount = Math.ceil(getCategories.length / itemsPerPage);
  const displayedCategories = getCategories.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/category`)
      .then((res) => {
        setCategories(res.data);
      });
  }, []);

  return (
    <section className=" bg-white/30 container mx-auto py-12">
      <h2 className="text-4xl font-bold text-center mb-10">
        Browse <span className="text-blue-600">Category</span>
      </h2>

      <div className="relative max-w-6xl mx-auto">
        {/* Left Arrow */}
        {currentPage > 0 && (
          <button
            onClick={handlePrev}
            className="absolute -left-5 top-1/2 transform z-10 -translate-y-1/2 bg-gray-100 hover:bg-gray-300 px-2 py-1 rounded-full shadow-md"
            aria-label="Previous">
            ←
          </button>
        )}

        {/* Categories Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`}>
          {displayedCategories.map((category, i) => (
            <div
              onClick={() => {
                router.push(`/${category.category}`);
              }}
              key={i}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 hover:-translate-y-2">
              <div className="aspect-square relative">
                <Image
                  src={"/img/new/education.svg"} //this should be dynamic once AWS work is done
                  alt={category.category}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg ">{category.category}</h3>
                {/* <p className="text-sm text-gray-500">{category.subCategory}</p> */}
                <p>by TH</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {currentPage < pageCount - 1 && (
          <button
            onClick={handleNext}
            className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-300 px-2 py-1 rounded-full shadow-md"
            aria-label="Next">
            →
          </button>
        )}
      </div>
    </section>
  );
};

export default Categories;
