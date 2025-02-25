"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface TrainerProps {
  trainer: {
    fname: string;
    lname: string;
    email: string;
    phone: string;
    _id: string;
    imageUrl: string;
  };
}

const TrainerCard: React.FC<TrainerProps> = ({ trainer }) => {
  const [getImageUrl, setImageUrl] = useState<string>("/img/animation2.gif");

  useEffect(() => {
    const loadImage = async () => {
      try {
        if (!trainer.imageUrl) return; // Ensure trainer.imageUrl exists

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/upload?imageUrl=${trainer.imageUrl}`
        );

        if (!response.ok) throw new Error("Failed to fetch signed URL");

        const data = await response.json();
        console.log("Signed URL Response:", data);

        if (data.signedUrl) {
          setImageUrl(data.signedUrl);
        }
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImage();
  }, [trainer.imageUrl]); // Add dependency to re-run when trainer.imageUrl changes

  return (
    <div className="w-80 h-96 flex flex-col overflow-hidden rounded-sm shadow-3xl hover:scale-105 hover:ring-sky-500 ring-1 ring-zinc-200">
      <div className="h-5/6 w-full flex items-center justify-center flex-col">
        <div className="w-36 h-36 rounded-full bg-sky-400 mb-6 overflow-hidden">
          <img
            src={getImageUrl}
            className="object-fill"
            alt="Trainer Image"
          />
        </div>

        <div className="text-xl font-bold">{trainer.fname} {trainer.lname}</div>
        <div className="text-sm text-gray-600">{trainer.email}</div>
        <div className="text-sm text-gray-600">{trainer.phone}</div>
      </div>

      <div className="w-full ring-1 ring-zinc-200 h-1/6 flex items-center justify-center">
        <Link href={`/dashboard/teacher/${trainer._id}`} className="text-sky-500">Know More</Link>
      </div>
    </div>
  );
}

export default TrainerCard;