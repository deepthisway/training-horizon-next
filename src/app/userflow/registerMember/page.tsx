"use client";
import React, { useState } from 'react';
import Navbar from '@/components/UserFlow/NavBar';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Popup from '@/components/trainer-dashboard/PopUp';

// Zod schema for form validation
const registerMemberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z
    .number()
    .int({ message: 'Age must be a valid integer' })
    .min(0, 'Age must be greater than 0'),
    dob: z.string().refine((date) => {
      const dob = new Date(date);
      const today = new Date();
      return dob <= today; // Ensure DOB is not in the future
    }, {
      message: 'Invalid date ',
    }),
  relationship: z.enum(['brother', 'child', 'father', 'mother'], {errorMap: () => ({message: 'Select a valid relationship'})}),
  gender: z.enum(['male', 'female', 'other'], { errorMap: () => ({ message: 'Select a valid gender' }) }),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  postalCode: z.string().min(5, 'Postal code must be at least 5 characters'),
  agreeToTerms: z.literal(true, { errorMap: () => ({ message: 'You must agree to the terms and conditions' }) }),
  doctorName: z.string().optional(),
  doctorNumber: z.string().optional(),
  bloodGroup: z.string().optional(),
});

const RegisterMemberForm = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: zodResolver(registerMemberSchema),
  });
    // console.log(errors)

  const [showPopup, setShowPopup] = useState(false);
  const [popUpMessage, setpopUpMessage] = useState("");
  const [age, setAge] = useState<number | null>(null);

  const onSubmit = async (data: any) => {
    console.log("Button clicked!!")
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/registerMember`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      setpopUpMessage("Member registered successfully");
      setShowPopup(true);
      reset();
    } catch (error) {
      setpopUpMessage("Error registering member");
      setShowPopup(true);
      console.error('Error registering member:', error);
    }
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }

    setAge(calculatedAge >= 0 ? calculatedAge : null); 
  };
  
  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto p-4 mt-10 ">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register Family Member</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              {...register("name")}
              className={`mt-1 block w-full px-4 py-2   shadow-sm border ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter member's name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
          </div>
          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              {...register("dob")}
              className={`mt-1 block w-full px-4 py-2   shadow-sm border ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
              onChange={(e) => {
                const dobValue = e.target.value;
                setValue("dob", dobValue); // Ensures form state is updated
                calculateAge(dobValue); // Also calculates age
              }}
             />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message as string}</p>}
          </div>

          {/* age */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              value={age !== null ? age : ""}
              className="mt-1 block w-full px-4 py-2 shadow-sm border border-gray-300 bg-gray-100"
              readOnly
            />
          </div>
    
          {/* Relationship */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Relationship</label>
            <select
              {...register("relationship")}
              className={`mt-1 block w-full px-4 py-2   shadow-sm border ${errors.relationship ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select relationship</option>
              <option value="brother">Brother</option>
              <option value="child">Child</option>
              <option value="father">Father</option>
              <option value="mother">Mother</option>
            </select>
            {errors.relationship && <p className="text-red-500 text-sm">{errors.relationship.message as string}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              {...register("gender")}
              className={`mt-1 block w-full px-4 py-2   shadow-sm border ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message as string}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              {...register("address")}
              className={`mt-1 block w-full px-4 py-2   shadow-sm border ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter address"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message as string}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              {...register("city")}
              className={`mt-1 block w-full px-4 py-2   shadow-sm border ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter city"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city.message as string}</p>}
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Postal Code</label>
            <input
              {...register("postalCode")}
              className={`mt-1 block w-full px-4 py-2   shadow-sm border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter postal code"
            />
            {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message as string}</p>}
          </div>


          {/* Doctor's Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Doctor's Name (Optional)</label>
            <input
              {...register("doctorName")}
              className="mt-1 block w-full px-4 py-2   shadow-sm border border-gray-300"
              placeholder="Enter doctor's name"
            />
          </div>

          {/* Doctor's Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Doctor's Number (Optional)</label>
            <input
              type="tel"
              {...register("doctorNumber")}
              className="mt-1 block w-full px-4 py-2   shadow-sm border border-gray-300"
              placeholder="Enter doctor's number"
            />
          </div>
          {/* Agree to Terms */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register("agreeToTerms")}
                className="mr-2"
              />
              I agree to the terms and conditions
            </label>
            {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms.message as string}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4  hover:bg-blue-600 transition duration-150"
          >
            Submit
          </button>

          {/* Popup for messages */}
          <Popup
            message={popUpMessage}
            isOpen={showPopup}
            onClose={() => setShowPopup(false)}
            redirectTo="/"
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterMemberForm;
