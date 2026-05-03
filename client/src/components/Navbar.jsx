import { useState, useEffect } from "react";
import imgLogo from "../assets/logo.png";
import { getUserData, logoutUser } from "../utils.jsx";
import Button from "./Button";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Avatar from "./Avatar.jsx";

function Navbar() {
  const [userData, setUserData] = useState({});

  const fetchUserData = () => {
    const data = getUserData();
    setUserData(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="bg-blue-300 shadow-md mx-4 rounded-xl px-6 py-3 flex flex-wrap items-center justify-between">

      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <img src={imgLogo} alt="Logo" className="h-9 w-9" />
          <span className="font-bold text-lg text-white">Tiny Tours</span>
        </Link>
      </div>

      <div className="flex items-center gap-3">

        <Link
          className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 transition"
          to="/contact"
        >
          Contact Us
        </Link>

        <Link
          className="bg-blue-300 text-blue-300 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-300 transition"
          to="/recieved-contact"
        >
          My Contact
        </Link>
      </div>

      <div className="flex items-center gap-3 mt-2 sm:mt-0">
        {userData?.name ? (
          <>
            <div className="flex items-center gap-2 text-white font-medium">
              <Avatar name={userData.name} />
              <span>Hello, {userData.name}</span>
            </div>

            <Button
              variant="tertiary"
              title="Logout"
              onClick={() => logoutUser()}
              className="bg-white text-red-500 px-3 py-1 rounded-full hover:bg-red-100 transition"
            />
          </>
        ) : (
          <Link
            className="bg-white text-blue-600 px-4 py-1 rounded-full font-medium hover:bg-blue-100 transition"
            to="/login"
          >
            Login
          </Link>
        )}
      </div>

      <Toaster />
    </div>
  );
}

export default Navbar;