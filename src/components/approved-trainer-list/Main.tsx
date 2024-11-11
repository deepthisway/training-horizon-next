"use client";
import SearchBar from '../listing/SearchBar';
import TrainerCard from './TrainerCard';
import { useCallback, useEffect, useState } from 'react';


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
  const [keywords, setKeywords] = useState<string>('');
  const [filteredTrainers, setFilteredTrainers] = useState<Trainer[]>([]);

  useEffect(() => {
    // Fetch trainers from the API
    const fetchTrainers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/approved-trainers/`); // API route for fetching trainers
        const data = await response.json();
        setTrainers(data);
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };

    fetchTrainers();
  }, []);


  useEffect(() => {
    // Filter trainers based on keywords
    const filtered = trainers.filter(trainer => {
      const fullName = `${trainer.fname} ${trainer.lname}`.toLowerCase();
      return fullName.includes(keywords.toLowerCase());
    });
    setFilteredTrainers(filtered);
  }, [keywords, trainers]);

  const handleSearch = useCallback ((searchKeywords: string) => {
    // Filter trainers based on the provided search keywords
    const filtered = trainers.filter(trainer => {
      const fullName = `${trainer.fname} ${trainer.lname}`.toLowerCase();
      return fullName.includes(searchKeywords.toLowerCase());
    });
    setFilteredTrainers(filtered);
  }, [trainers]);

  useEffect(() => {
    handleSearch(keywords);
  }, [keywords, trainers, handleSearch]);


  return (
    <div className="w-full flex justify-center">
      <div className="w-3/4">
        <div className="w-full text-center text-3xl my-4 font-bold text-gray-700">OUR TRAINERS</div>
        <hr className="w=full border-2 border-sky-500" />
        <div className="w-full">
          <div className="my-4">
            <SearchBar
              keywords={keywords} 
              setKeywords={setKeywords} 
              onSearch={() => handleSearch(keywords)}
            />
          </div>
          <div className="flex gap-6 flex-wrap justify-evenly">
            {filteredTrainers.length > 0 ? (
              filteredTrainers.map((trainer,idx) => (
                <TrainerCard 
                  key={idx} 
                  trainer={trainer} // Pass each trainer data as prop
                />
              ))
            ) : (
              <p className="text-xl my-10 font-bold">NO TRAINERS FOUND</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
