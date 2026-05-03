import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../components/Input";
import Buttons from "../components/Buttons";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  useEffect(() => {
    // ✅ Auto-fill user data if logged in
    const user = JSON.parse(localStorage.getItem("userData"));

    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendMessage = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await axios.post(
        `${BASE_URL}/api/contact`,
        form,
        {
          headers: {
            
            Authorization: `Bearer ${localStorage.getItem("userJwtToken")}`,
          },
        }
      );

      

      if (response.data.success) {
        toast.success("Inquiry sent successfully ✈️");

        setForm({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Please login first");
    }
  };

  return (
    <div className="bg-linear-to-r from-slate-100 to-teal-50 min-h-screen">
      <Navbar />

      <div className="flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl md:text-5xl font-semibold mb-10">
          Plan Your <span className="text-green-500">Dream Trip</span>
        </h1>

        <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl">
          
          {/* LEFT FORM */}
          <div className="w-full max-w-2xl mx-auto p-6 shadow-xl rounded-xl bg-white border border-green-300">
            
            <p className="text-xl md:text-2xl text-center mb-5 font-semibold">
              Send Us Your Travel Inquiry 🌍
            </p>

            <Input name="name" placeholder="Enter Your Name" value={form.name} onChange={handleChange} />
            <Input name="email" placeholder="Enter Your Email" value={form.email} onChange={handleChange} />
            <Input name="phone" placeholder="Enter Your Phone" value={form.phone} onChange={handleChange} />
            <Input name="address" placeholder="Your Location" value={form.address} onChange={handleChange} />
            <Input name="message" placeholder="Which destination are you interested in?" value={form.message} onChange={handleChange} />

            <div className="text-center mt-4">
              <Buttons title="Send Inquiry" onClick={sendMessage} />
            </div>

            {/* WHY US */}
            <div className="mt-6 p-4 rounded-xl bg-slate-100 border">
              <p className="text-xl font-semibold mb-2">Why Travel With Us?</p>
              <p className="text-sm">✔ Affordable Packages</p>
              <p className="text-sm">✔ Best Destinations</p>
              <p className="text-sm">✔ 24/7 Support</p>
            </div>
          </div>

          {/* RIGHT INFO */}
          <div className="w-full">
            <div className="rounded-2xl shadow-lg bg-white p-5 border border-green-300 text-center">
              <p className="text-2xl font-semibold mb-3">
                Visit Our <span className="text-green-700">Office</span>
              </p>

              <p className="font-semibold">Pune, Maharashtra</p>
              <p>📞 +91 9876543219</p>
              <p>📧 tours@tinytours.com</p>
            </div>

            <iframe title="map" className="w-full min-h-75 rounded-xl shadow-xl my-7 border-2 border-solid border-green-600 hover:shadoow-xl/30 hover:shadow-green-600 duration-400" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30584.90662048613!2d73.91881922148384!3d18.497252885849324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2e9ff81f1aae9%3A0x2560343555ac8b53!2sHadapsar%2C%20Pune%2C%20Maharashtra!5e1!3m2!1sen!2sin!4v1771491556635!5m2!1sen!2sin" />
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default Contact;