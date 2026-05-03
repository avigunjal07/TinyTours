import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar.jsx";
import { getUserJwtToken } from "../utils";
import imgNewTour from "../assets/new-tour.png";
import TourCard from "../components/TourCard.jsx";
import { Link } from "react-router";

function Dashboard() {
  const [tours, setTours] = useState([]);

  const loadTours = async () => {
    const userJwt = getUserJwtToken();

    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/tours`, {
      headers: {
        Authorization: `Bearer ${userJwt}`,
      },
    });

    if (response.data.success) {
      toast.success(response.data.message);
      setTours(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    loadTours();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 mt-10">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Your Tours
        </h1>

        {tours.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-xl">No tours available</p>
            <p className="text-sm mt-2">Click the + button to add a new tour</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tourItem, index) => {
            return (
              <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-2">
                <TourCard key={index} {...tourItem} />
              </div>
            );
          })}
        </div>
      </div>

      <Link to="/tours/new">
        <div className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 p-4 rounded-full shadow-lg transition duration-300 cursor-pointer">
          <img
            src={imgNewTour}
            alt="Add New Tour"
            className="h-8 w-8"
          />
        </div>
      </Link>

      <Toaster />
    </div>
  );
}

export default Dashboard; 