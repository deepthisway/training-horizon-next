"use client";
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import React, { useEffect, useState } from "react";
import ReplyToListing from "./ReplyToListing";
import MapWidget from './MapWidget';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function SideLayout({minAgeLimit, maxAgeLimit, listingId}: {minAgeLimit: number, maxAgeLimit: number, listingId: string}) {

  const [name, setName] = useState("user");
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useSelector((state: RootState) => state.form);
  const tabs = ["Overview", "Instructors", "Curriculum", "Reviews", "FAQs"];
  // useEffect(()=>  {
  //   // console.log(minAgeLimit, maxAgeLimit)
  //   console.log(form.title),
  //       console.log(form.ageGroup)
  // })
  // Fetch the username and members
  useEffect(() => {
    const fetchUserName = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/username`, {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      });
      setName(res.data.user);
    };
    const fetchMembers = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/allmembers`, {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      });
      setMembers(res.data.familyMembers);
    };

    fetchUserName();
    fetchMembers();
  }, []);
  
  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    closePopup();

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/review/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, review, rating }),
    });
    
    if (response.ok) {
      alert("Review submitted!");
      setName("");
      setReview("");
      setRating(5);
    } else {
      alert("Error submitting review.");
    }
  };

  const handleRegister = async () => {
    if (selectedMember) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/enroll`, {
          listingId, 
          memberIds: [selectedMember]  // Wrap selectedMember in an array
        });
        if (response.status === 200 || response.status === 201) {
          router.push(`/checkout/${listingId}?memberId=${selectedMember}`);
        }
      } catch (e) {
        console.error("Error during enrollment:", e);
        // Optionally set an error message state here to show to the user
      }
    }
  };
  

  return (
    <>
      {/* Right Section: Class Details */}
      <div className="bg-blue-50 rounded-lg p-4 max-w-full">
        <div className="w-80 mx-auto p-4">
          <ReplyToListing />

          {/* Dropdown for selecting registered members */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Member:</label>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              
              className="w-full p-2 border border-gray-300 rounded mb-2"
            >
              <option value="">N/A</option>
              {members.filter((member: any)=> {
                if(member.age >= minAgeLimit && member.age <= maxAgeLimit){
                  return member;
                }
              }).map((member: any) => (
                <option key={member._id} value={member._id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Register Now Button */}
          <button
            onClick={handleRegister} 
            disabled={!selectedMember} // Button is disabled if no member is selected
            className={`w-full p-2 mb-5 text-white rounded ${selectedMember ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'}`}
          >
            Register Now
          </button>

          {/* Pop-Up Card */}
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
                <h2 className="text-xl font-bold mb-4">Send a Feedback</h2>
                <textarea
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 mb-4"
                  rows={8}
                  placeholder="Type your message here..."
                  required
                ></textarea>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>
                      {star} Star{star > 1 && "s"}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end">
                  <button
                    onClick={closePopup}
                    className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-[#17A8FC] hover:bg-blue-500 text-white rounded-md"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Review and Report Section */}
          <div className="bg-white rounded-md shadow p-4 text-center mb-4">
            <p onClick={openPopup} className="text-gray-600 hover:underline">
              <span className="inline-block mr-2">⭐</span> Write a Review
            </p>
            <p className="text-gray-600 mt-2 hover:underline">
              <span className="inline-block mr-2 ">🚩</span> Report Listing
            </p>
          </div>

          {/* Map Section */}
          <MapWidget />
        </div>
      </div>
    </>
  );
}

export default SideLayout;
