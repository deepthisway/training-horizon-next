import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const UserDashboard = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const userId=window.localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get("http://localhost:3005/api/v1/user/username", {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        });
        setUserName(response.data.user);
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, []);

  const goToFavorites = () => {
    router.push("/favorites");
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.reload();
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {/* User Icon and Name */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={handleDropdownToggle}
      >
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-4.4 0-8 3.6-8 8v1h16v-1c0-4.4-3.6-8-8-8z"/>
          </svg>
        </div>
        <span className="text-yellow-500">{userName || "Loading..."}</span>
        <svg
          className="w-4 h-[4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul className="py-2">
          <Link href={`/userflow/yourProfile/`}><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" >Your Profile</li></Link>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={goToFavorites}>Favorites</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
            <Link href={`/userflow/orders/${userId}`}>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Orders</li>
            </Link>
            <Link href="/userflow/familyMembers">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Family Members</li>
            </Link>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleSignOut}>Sign Out</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
