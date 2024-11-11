"use client";
import { useState } from "react";
import { Button } from "@/components/Shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/Shared/ui/card";
import { Input } from "@/components/Shared/ui/input";
import { Label } from "@/components/Shared/ui/label";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/navigation";
import GoogleAuth from "./GoogleAuth";

function SignUpcard() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
 const router = useRouter();
  async function submitForm() {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/signup`, {
        email,
        firstName,
        lastName,
        password,
      });

      console.log(res.data.token);

      window.localStorage.setItem("token", res.data.token);
      router.push('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="bg-[#56C1FF] h-screen flex items-center justify-center p-10 w-full">
      <Card className="w-[600px] h-[700px] mx-auto p-6 shadow-lg border-2 border-blue-400">
        <CardHeader>
          <h2 className="text-2xl font-bold">Create your account</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="First Name" className="text-lg">
                First Name
              </Label>
              <Input type="text" id="First Name" placeholder="ex. Narendra" onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Last Name" className="text-lg">
                Last Name
              </Label>
              <Input type="text" id="Last Name" placeholder="ex. Modi" onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <div className="flex justify-center">
          <Button
            className="mt-1 w-[500px] bg-[#FDCE29] text-black hover:bg-yellow-500"
            onClick={submitForm}
          >
            Create Account
          </Button>
        </div>
        <CardFooter className="text-center mt-4">
          <div className="text-sm">
            Already have an account?{" "}
            <Link href="/userflow/login">
              <span className="text-blue-600 cursor-pointer hover:underline">
                Login here!
              </span>
            </Link>
          </div>
        </CardFooter>
        <GoogleAuth />
      </Card>
    </main>
  );
}
export default SignUpcard;
