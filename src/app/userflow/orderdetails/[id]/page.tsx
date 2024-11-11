// pages/order.tsx
'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/UserFlow/NavBar'
import Footer from '@/components/UserFlow/Footer';
import Link from 'next/link';

type OrderDetails = {
  _id: number;
  createdAt: string;
  status: 'ON HOLD' | 'FAILED' | 'COMPLETED';
  title: string;
  price: string;
  total: string;
  listingId: string;
  memberId: string;
  paymentMethod: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
    email: string;
};

const OrderDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<OrderDetails | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if(!id) return;
        const fetchOrders = async (id: string) => {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/order/getOrderDetailsByOrderId/` + id.toString());
            
            setOrder(response.data.order); // Assuming the API returns orders in `response.data.orders`
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
    <div className="max-w-2xl mx-auto p-6">
      {/* Order Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Order #{order?._id}</h1>
        <p className="text-gray-500">Placed on {order?.createdAt ? formatDate(order.createdAt) : 'Unknown date'}</p>
        <div className='flex justify-between'>
        <span className={`${order?.status === "ON HOLD" ? `text-yellow-600 bg-yellow-100` : `${order?.status === "FAILED" ? `bg-red-500 text-white` :`bg-green-500 text-white`} `} py-1 px-3 rounded-full text-sm`}>
          {order?.status}
        </span>
        {
          order?.status === "FAILED" && <span className='bg-blue-500 py-1 px-3 rounded-full text-sm'>
          <Link href={`/checkout/${order?.listingId}?memberId=${order?.memberId}`} className=' text-white'>Pay Again</Link>
        </span>
        
        }
        </div>
      </div>

      {/* Order Details */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Order details</h2>
        <table className="min-w-full text-left table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">Product</th>
              <th className="py-2 px-4">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4">
                {order?.title}
                <br />
              </td>
              <td className="py-2 px-4">{order?.price}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-bold">Subtotal:</td>
              <td className="py-2 px-4">{order?.price}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-bold">Service Fee</td>
              <td className="py-2 px-4">${calculateFee(order?.price ?? '0')}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-bold">Tax:</td>
              <td className="py-2 px-4">${calculateTax(order?.price ?? '0')}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-bold">Payment method:</td>
              <td className="py-2 px-4">{order?.paymentMethod}</td>
            </tr>
            <tr className="border-t">
                <td className="py-2 px-4 font-bold">Total:</td>
                <td className="py-2 px-4 font-bold">${calculateTotal(order?.price ?? '0')}</td>
              </tr>
          </tbody>
        </table>
      </div>

      {/* Billing Address */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Billing address</h2>
        <div className="border rounded p-4">
          <p>{order?.firstName} {order?.lastName}</p>
          <p>{order?.address}</p>
          <p>{order?.city}</p>
          <p>{order?.phone}</p>
          <p>{order?.email}</p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default OrderDetailPage;
