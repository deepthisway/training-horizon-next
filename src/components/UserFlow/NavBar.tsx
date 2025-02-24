"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import UserDashboard from "./UserDashboard";
import RoleBasedNav from "./RoleBasedNav";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTrainer, setIsTrainer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOrg, setIsOrg] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    setIsOrg(role == "organization");
    setIsTrainer(role === "trainer");
    setLoggedIn(!!token);
    setLoading(false);

    // Scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("cart");
    window.location.reload();
    router.push("/");
  };

  const handlelogin = () => {
    router.push("/userflow/login");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all/courses", label: "Courses" },
    { href: "/rentals", label: "Book a Rental" },
    { href: "/about", label: "About Us" },
    { href: "/trainer",label: "Our Trainers"}
  ];
  

  return (
    <nav className={`sticky top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      isScrolled
        ? "bg-white backdrop-blur-sm"
        : "bg-[url('/img/new/displayBackground.svg')] bg-cover bg-center"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl px-5 font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            <Link href="/">Training Horizon</Link>
          </div>
          {/* <div className="hidden md:flex items-center gap-6">
  <a href="#" className="text-gray-700 hover:text-gray-900">
    Home
  </a>
  <a href="#" className="text-gray-700 hover:text-gray-900">
    Courses
  </a>
  <a href="#" className="text-gray-700 hover:text-gray-900">
    About Us
  </a>
</div> */}
          <div className="flex  space-x-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hidden md:flex items-center gap-6 text-gray-700  hover:underline"
              >
                {label}
              </Link>
            ))}
          </div>
          {loggedIn ? (
            <>
              <div>
                {isOrg ? (
                  <Link
                    className="bg-yellow-600 p-2 rounded-sm text-white"
                    href={"/Organization/createRental"}
                  >
                    Create a Rental
                  </Link>
                ) : null}
              </div>
              {isTrainer && !loading && <RoleBasedNav />}

              {/* {!isTrainer && !isOrg && (
    <Link
      href="/userflow/registerMember"
      className="hidden sm:block hover:underline"
    >
      Register Member
    </Link>
  )} */}
              {/* <div className="max-w-screen-lg flex flex-col justify-between">
    
  </div> */}
              {!isTrainer && !isOrg && (
                <Link
                  href="/dashboard/teacher/join_as_teacher"
                  className="hidden sm:block hover:underline"
                >
                  Join as Trainer
                </Link>
              )}
              <div className="flex flex-row gap-4">
                <UserDashboard />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center  gap-4">
                <Link
                  href={"/dashboard/teacher/join_as_teacher"}
                  className="hidden sm:block hover:underline"
                >
                  Join As Trainer
                </Link>
                <Button
                  onClick={handlelogin}
                  variant="default"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Sign in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
