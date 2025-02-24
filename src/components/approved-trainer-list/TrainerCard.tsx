"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";

interface TrainerProps {
  trainer: {
    fname: string;
    lname: string;
    email: string;
    phone: string;
    _id: string;
  };
}

const TrainerCard: React.FC<TrainerProps> = ({ trainer }) => {
  console.log(trainer._id);
  return (
    // <div className="w-80  h-96 flex flex-col overflow-hidden rounded-sm shadow-3xl hover:scale-105 hover:ring-sky-500 ring-1 ring-zinc-200">
    //   <div className="h-5/6 w-full flex items-center justify-center flex-col">
    //     <div className="w-36 h-36 rounded-full bg-sky-400 mb-6">
    //       <Image src="/img/instructor.png"
    //         className="object-fill"
    //         alt=''
    //         width={200}
    //         height={200}
    //       />
    //     </div>

    //     <div className="text-xl font-bold">{trainer.fname} {trainer.lname}</div>
    //     <div className="text-sm text-gray-600">{trainer.email}</div>
    //     <div className="text-sm text-gray-600">{trainer.phone}</div>
    //   </div>

    //   <div className="w-full ring-1 ring-zinc-200 h-1/6 flex items-center justify-center">
    //     <Link href={`/dashboard/teacher/${trainer._id}`} className="text-sky-500">Know More</Link>
    //   </div>
    // </div>

    // <div className="flex flex-col items-center  bg-background">
    //   <div className="w-full max-w-[1296px] px-4 space-y-6">
    //     <div className="flex space-x-6 ">
    //       <Card
    //         className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 hover:-translate-y-2"
    //         // onClick={() => {
    //         //   router.push(`/${categoryName}/${subCategory}`);
    //         // }}
    //       >
    //         <div className="w-full aspect-square relative">
    //         <img
    //           src={"/img/instructor.png"}
    //           alt={"abc"}
    //           className=" object-cover rounded-t-lg"
    //           width={200}
    //         height={200}
    //         />
    //         </div>
            
    //         <CardContent className="p-6 space-y-6">
    //           <div className="space-y-3">
    //             <h3 className="text-xl font-semibold">
    //               {trainer.fname} {trainer.lname}
    //             </h3>
    //           </div>
    //         </CardContent>
    //       </Card>
    //     </div>
    //   </div>
    // </div>
    <></>
  );
};

export default TrainerCard;
