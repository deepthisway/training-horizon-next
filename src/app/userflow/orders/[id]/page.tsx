// pages/orders.tsx
'use client'
import Footer from '@/components/UserFlow/Footer';
import axios from 'axios';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/UserFlow/NavBar'
import Link from 'next/link';

type OrderD = {
    _id: number,
  createdAt: string;
  status: 'ON HOLD' | 'FAILED' | 'COMPLETED';
  coursePrice: string;
  items: number;
};

export interface Root {
  message: string
  orders: Order[]
}

export interface Order {
  price: Price
  _id: string
  user: string
  members: Member[]
  listings: Listing[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Price {
  subtotal: number
  tax: number
  shipping: number
  totalPrice: number
}

export interface Member {
  _id: string
  name: string
  age: number
  dob: string
  relationship: string
  gender: string
  address: string
  city: string
  postalCode: string
  agreeToTerms: boolean
  doctorName: string
  doctorNumber: string
  __v: number
}

export interface Listing {
  _id: string
  trainerId: string
  category: string
  subCategory: string
  title: string
  imageUrl: string
  priceMode: string
  price: string
  mode: string
  location: string
  quantity: string
  classSize: string
  startDate: string
  endDate: string
  days: string[]
  gender: string
  startTime: string
  endTime: string
  minAge: string
  maxAge: string
  preRequistes: string
  description: string
  avgRating: number
  isApproved: boolean
  reviews: string[]
  __v: number
}


const MyOrders: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(!id) return;
        const fetchOrders = async (id: string) => {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/order/getOrdersDetailsByUserId/` + id.toString());
            const fetchedOrders = response.data.orders.map((order: any) => ({
              ...order,
              coursePrice: order.price, // Assuming `price` is returned from the API
            }));
            setOrders(fetchedOrders); // Assuming the API returns orders in `response.data.orders`
          } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong');
          } finally {
            setLoading(false);
          }
        };
    
        fetchOrders(id);
      }, [id]);

      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
      };
      const calculateTax = (price: string) => {
        const parsedPrice = parseFloat(price) || 0;
        return Number((0.18 * parsedPrice).toFixed(2)); // Tax is 18%
      };
    
      const calculateTotal = (price: string) => {
        const parsedPrice = parseFloat(price) || 0;
        const tax = calculateTax(price);
        const fee = calculateFee(price);
        return (parsedPrice + tax + fee).toFixed(2); // Total = Subtotal + Tax
      };
      const calculateFee = (price: string) =>{
        const parsedPrice = parseFloat(price) || 0;
        return Number((0.10 * parsedPrice).toFixed(2)); //Service Fee is 10%
      }
  return (
    <>
    <Navbar/>
    <div className="container h-[31rem] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className='py-2 px-4'>Order Id</th>
            <th className="py-2 px-4">Date</th>
            {/* <th className="py-2 px-4">Status</th> */}
            <th className="py-2 px-4">Total</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className='py-2 px-4' >{order._id}</td>
              <td className="py-2 px-4">{formatDate(order.createdAt)}</td>
              {/* <td className="py-2 px-4">
                <span className={`${order.status === "ON HOLD" ? `text-yellow-600 bg-yellow-100` : `${order.status === "FAILED" ? `bg-red-500 text-white` :`bg-green-500 text-white`} `} py-1 px-3 rounded-full text-sm`}>
                  {order.status}
                </span>
              </td> */}
              <td className="py-2 px-4">${order?.price.totalPrice.toFixed(2)}</td>
              <td className="py-2 px-4">
                <Link className='text-blue-600' href={`/userflow/orderdetails/${order._id}`}> View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </>
  );
};

export default MyOrders;
