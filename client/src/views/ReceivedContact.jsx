import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import toast, { Toaster } from "react-hot-toast";

function RecievdContact() {
  const [contact, setContact] = useState([]);

  const fetchContact = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await axios.get(`${BASE_URL}/api/contact`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userJwtToken")}`,
        },
      });

      if (response.data.success) {
        setContact(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch inquiries");
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <div className="bg-linear-to-r from-slate-100 to-teal-50 min-h-screen">
      <Navbar />

      <p className="text-2xl font-semibold text-center mt-6">
        Tour <span className="text-green-700">Inquiries</span>
      </p>

      <div className="p-6 flex flex-wrap gap-6 justify-center">
        {contact.map((cont) => (
          <div
            key={cont._id}
            className="w-87.5 bg-white shadow-lg p-5 rounded-xl border border-green-200"
          >
            <p>
              <b>👤 Name:</b> {cont.name}
            </p>
            <p>
              <b>📧 Email:</b> {cont.email}
            </p>
            <p>
              <b>📞 Phone:</b> {cont.phone}
            </p>
            <p>
              <b>📍 Location:</b> {cont.address}
            </p>
            <p>
              <b>🧳 Travel Plan:</b> {cont.message}
            </p>
          </div>
        ))}
      </div>

      <Toaster />
    </div>
  );
}

export default RecievdContact;