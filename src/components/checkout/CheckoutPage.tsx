"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/trainer-dashboard/ui/form";
import { Input } from "@/components/trainer-dashboard/ui/input";
import { Button } from "@/components/trainer-dashboard/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/trainer-dashboard/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/trainer-dashboard/ui/dialog";
import { Textarea } from "@/components/ui/textarea"
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";

function CheckoutPage () {

  const checkoutSchema = z.object({
    firstName: z.string().min(1, "Full Name is required"),
    lastName: z.string().min(1, "Full Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone Number is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Zip Code is required"),
    country: z.string().min(1, "Country is required"),
    paymentMethod: z.string(),
    orderNotes: z.string().optional(),
    // title: z.string(), 
    // totalPrice: z.string()
  });

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      postalCode: "",
      city: "",
      country: "",
      paymentMethod: "Credit Card",
      orderNotes: "",
      // title: "", 
      // totalPrice: ""
    },
  });

  const details = useSelector((state: RootState) => state.form);

  const countries = ["USA", "Canada", "UK", "Australia", "India"];

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("listingId");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState<z.infer<typeof checkoutSchema>>(
    form.getValues()
  );

  const onSubmit = async (values: z.infer<typeof checkoutSchema>) => {
    try {
      const token = localStorage.getItem("token")

      const response = await axios.post('http://localhost:3005/api/v1/order/checkout', values, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };


  const handleSubmit = () => {
    form.handleSubmit(onSubmit)();
    setIsDialogOpen(false);
  };
  const handleReviewClick = () => {
    setFormValues(form.getValues());
    setIsDialogOpen(true);
  };

  
  return (
    <div className="flex justify-between p-4">
      {/* LeftSide - Billing Details */}
      <div className="flex-1 m-2 p-4">
        <div className="m-4 flex justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-lw py-4 space-y-4 p-6 shadow-md rounded-md "
            >
              <div className="text-xl font-bold mb-3">Billing details</div>

              {/* First Name Field */}
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your first name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name Field */}
              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your last name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        placeholder="Enter your Email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your phone number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address Field */}
              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Zip Code Field */}
              <FormField
                name="postalCode"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your postal code" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City Field */}
              <FormField
                name="city"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your city" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Country Field */}
              <FormField
                name="country"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Countries</SelectLabel>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Payment Method Field */}
              <FormField
                name="paymentMethod"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Payment Methods</SelectLabel>
                            <SelectItem value="Credit Card">
                              Credit Card
                            </SelectItem>
                            <SelectItem value="PayPal">PayPal</SelectItem>
                            <SelectItem value="Bank Transfer">
                              Bank Transfer
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* orderNotes Field */}
              <FormField
                name="orderNotes"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Notes (Optional) </FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Notes about your order, e.g. special notes for delivery." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Proceed to Checkout
              </Button>

              {/* Dialog for Review */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
                <DialogTrigger asChild>
                  <Button type="button" onClick={handleReviewClick}>Review</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Review Your Order</DialogTitle>
                    <DialogDescription>
                      Confirm your details before proceeding.
                    </DialogDescription>
                  </DialogHeader>
                  <div>
                    <div>
                      <strong>Full Name:</strong> {formValues.firstName + " " + formValues.lastName}
                    </div>
                    <div>
                      <strong>Phone Number:</strong> {formValues.phone}
                    </div>
                    <div>
                      <strong>Email:</strong> {formValues.email}
                    </div>
                    <div>
                      <strong>Address:</strong> {formValues.address}
                    </div>
                    <div>
                      <strong>Postal Code:</strong> {formValues.postalCode}
                    </div>
                    <div>
                      <strong>City:</strong> {formValues.city}
                    </div>
                    <div>
                      <strong>Country:</strong> {formValues.country}
                    </div>
                    <div>
                      <strong>Payment Method:</strong>{formValues.paymentMethod}
                    </div>
                    <div>
                      <strong>Order Notes:</strong>{formValues.orderNotes}
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button
                      type="button"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={handleSubmit}
                    >
                      Submit Order
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </form>
          </Form>
        </div>
      </div>

      {/* RightSide - Order payment details */}
      <div className="flex-1 m-2 p-4 text-center">
        <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold mb-3">Your order</h2>
          <div className="border-t border-gray-200">
            <div className="flex justify-between py-2">
              <span className="font-medium">Product</span>
              <span className="font-medium">Subtotal</span>
            </div>
            <div className="flex justify-between py-2">
              <div>
                <span>{details.title} × 1</span>
                <br />
                <span className="text-gray-500">Learner: test test</span>
              </div>
              <span>${details.price}</span>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>${details.price}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Service Fee</span>
              <span>$2.00</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Tax</span>
              <span>${Math.round(parseInt(details.price)*0.18)}</span>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between py-2 font-bold">
              <span>Total</span>
              <span>${Math.round(parseInt(details.price) * 1.18 + 2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage