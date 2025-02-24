"use client";
import { Triangle } from "lucide-react";
import SearchBar from "../listing/SearchBar";
import { Card, CardContent } from "../ui/card";
import SearchSection from "../UserFlow/SeachSection";
import TrainerCard from "./TrainerCard";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

interface Trainer {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
}

const Main = () => {
  // const [trainers, setTrainers] = useState([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [keywords, setKeywords] = useState<string>("");
  const [filteredTrainers, setFilteredTrainers] = useState<Trainer[]>([]);

  useEffect(() => {
    // Fetch trainers from the API
    const fetchTrainers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/approved-trainers/`
        ); // API route for fetching trainers
        const data = await response.json();
        setTrainers(data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    fetchTrainers();
  }, []);

  useEffect(() => {
    // Filter trainers based on keywords
    const filtered = trainers.filter((trainer) => {
      const fullName = `${trainer.fname} ${trainer.lname}`.toLowerCase();
      return fullName.includes(keywords.toLowerCase());
    });
    setFilteredTrainers(filtered);
  }, [keywords, trainers]);

  const handleSearch = useCallback(
    (searchKeywords: string) => {
      // Filter trainers based on the provided search keywords
      const filtered = trainers.filter((trainer) => {
        const fullName = `${trainer.fname} ${trainer.lname}`.toLowerCase();
        return fullName.includes(searchKeywords.toLowerCase());
      });
      setFilteredTrainers(filtered);
    },
    [trainers]
  );

  useEffect(() => {
    handleSearch(keywords);
  }, [keywords, trainers, handleSearch]);

  return (
    <div className="flex flex-col items-center pt-5 min-h-screen bg-background">
      <div className="w-full max-w-[1296px] px-4  space-y-6">
        <h2 className="text-5xl font-bold text-center">
          Our <span className="text-blue-500">Trainers</span>
        </h2>
        <hr className="w=full border-2 border-sky-500" />
        <div className="w-full">
          <SearchSection
            keywords={keywords}
            setKeywords={setKeywords}
            onSearch={handleSearch}
          />
          {/* <div className="flex gap-6 flex-wrap justify-evenly">
            {filteredTrainers.length > 0 ? (
              filteredTrainers.map((trainer, idx) => (
                <TrainerCard
                  key={idx}
                  trainer={trainer} // Pass each trainer data as prop
                />
              ))
            ) : (
              <p className="text-xl my-10 font-bold">NO TRAINERS FOUND</p>
            )}
          </div> */}

          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTrainers.length > 0 ? (
              filteredTrainers.map((trainer, idx) => (
                <Card
                  key={idx}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 hover:-translate-y-2"
                >
                  <img
                    src="/img/new/user.jpg"
                    alt={"abc"}
                    className="w-full h-[300px] object-cover rounded-t-lg"
                  />

                  <CardContent className="pt-6 space-y-2 ">
                    <div className=" flex items-center justify-center font-semibold">
                      <h3 className="text-xl ">
                        {trainer.fname} {trainer.lname}
                      </h3>
                    </div>
                    {/* <div className="text-xl font-bold">
                      {trainer.fname} {trainer.lname}
                    </div> */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-sm  text-gray-600">
                        {trainer.email}
                      </div>
                      <div className="text-sm  text-gray-600">
                        {trainer.phone}
                      </div>
                      <Link
                        href={`/dashboard/teacher/${trainer._id}`}
                        className="text-sky-500 "
                      >
                        Know More
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No listings found.</p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Main;
