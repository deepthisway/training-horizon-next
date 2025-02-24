// import React from 'react'

// function page() {
//   return (
//     <div>page</div>
//   )
// }

// export default page

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/UserFlow/NavBar";

const amenitiesList = [
  "WiFi",
  "Parking",
  "Air Conditioning",
  "Swimming Pool",
  "Gym",
  "Pet Friendly",
  "TV",
  "Kitchen",
  "Laundry",
];

const rentalSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "Zip Code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  amenities: z.array(z.string()).optional(), // Stores selected amenities
  pricing: z.object({
    dailyRate: z.number().min(1, "Daily rate is required"),
    hourlyRate: z.number().min(1, "Hourly rate is required"),
  }),
  email: z.string().email("Enter a valid email"),
});

const RentalForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(rentalSchema),
    defaultValues: {
      name: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      amenities: [],
      pricing: { dailyRate: 0, hourlyRate: 0 },
      email: "",
    },
  });

  const selectedAmenities = watch("amenities", []);

  // Handle checkbox selection
  const handleAmenityChange = (amenity: string) => {
    setValue(
      "amenities",
      selectedAmenities.includes(amenity)
        ? selectedAmenities.filter((item: string) => item !== amenity)
        : [...selectedAmenities, amenity]
    );
  };

  // Form submission
  const onSubmit = async (data: any) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/create-rental`,
        data
      );
      console.log("rental Data: ", data);

      alert("Rental submitted successfully!");
    } catch (error) {
      console.error("Error submitting rental:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create Rental</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <Label>Rental Name</Label>
            <Input {...register("name")} placeholder="Enter rental name" />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label>Choose Category</Label>
            <Input {...register("name")} placeholder="Enter Category" />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Address Fields */}
          <div className="grid grid-cols-2 gap-4">
            {["street", "city", "state", "zipCode", "country"].map((field) => (
              <div key={field}>
                <Label className="capitalize">{field}</Label>
                <Input
                  {...register(`address.${field}`)}
                  placeholder={`Enter ${field}`}
                />
                {errors.address?.[field] && (
                  <p className="text-red-500 text-sm">
                    {errors.address[field]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Amenities Checkboxes */}
          <div>
            <Label>Select Amenities</Label>
            <div className="grid grid-cols-2 gap-2">
              {amenitiesList.map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityChange(amenity)}
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Daily Rate</Label>
              <Input
                type="number"
                {...register("pricing.dailyRate", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label>Hourly Rate</Label>
              <Input
                type="number"
                {...register("pricing.hourlyRate", { valueAsNumber: true })}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input {...register("email")} placeholder="Enter email" />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Submit Rental
          </Button>
        </form>
      </div>
    </>
  );
};

export default RentalForm;
