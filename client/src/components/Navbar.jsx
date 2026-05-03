import { useState, useEffect } from "react";
import imgLogo from "../assets/logo.png";
import { getUserData, logoutUser } from "../utils.jsx";
import Button from "./Button";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";


function Navbar() { 
  const [userData, setUserData] = useState({});

  const fetchUserData = () => {
    const data = getUserData();
    console.log("Fetched user data:", data);
    setUserData(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="bg-blue-300 px-4 py-2 flex justify-between items-center">
      <div>
        <Link to="/">
          <img src={imgLogo} alt="Logo" className="h-8 inline-block" />
          <span>Tiny Tours</span>
        </Link>
      </div>

      <div>
        {userData?.name ? (
          <div className="flex items-center space-x-2">
            <Avatar name={userData.name} />
            Hello, {userData.name}!
            <Button
              variant="tertiary"
              title="Logout"
              onClick={() => {
                logoutUser();
                // setUserData({});
              }}
            />
          </div>
        ) : (
          <Link
            className="bg-white text-blue-500 px-3 py-1 rounded mr-2"
            to="/login"
          >
            Login
          </Link>
        )}
      </div>

      <div>
        <Link
          className="bg-white text-blue-500 px-3 py-1 rounded"
          to="/contact"
        >
          Contact Us
        </Link>
      </div>

      <div>
        <Link
          className="bg-white text-blue-500 px-3 py-1 rounded"
          to="/recieved-contact"
        >
          My Contact
        </Link>
      </div>

      <Toaster />
    </div>
  );
}
export default Navbar;