import axios from "axios";
import { useEffect, useState } from "react";
import { setPageTitle } from "../utils.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router";
import Navbar from "../components/Navbar.jsx";


function Signup() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    country: "",
    password: "",
  });

  useEffect(() => {
    setPageTitle("Signup - TinyTours");
  }, []);

  const createUser = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/signup`,
        newUser,
      );

      if (response.data.success) {
        toast.success(response.data.message, { id: "signupSuccess" });
        setNewUser({
          name: "",
          email: "",
          mobile: "",
          city: "",
          country: "",
          password: "",
        });

        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else {
        toast.error(response.data.message, { id: "signupError" });
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error");
      }
    }
  };
  return (
    <div>
      <Navbar />
      <h1>Signup</h1>

      <div className="w-75 block mx-auto ">
        <Input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />

        <Input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />

        <Input
          type="text"
          placeholder="Mobile"
          value={newUser.mobile}
          onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
        />

        <Input
          type="text"
          placeholder="Country"
          value={newUser.country}
          onChange={(e) => setNewUser({ ...newUser, country: e.target.value })}
        />

        <Input
          type="text"
          placeholder="City"
          value={newUser.city}
          onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
        />

        <Input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />

        <Button title="Signup" onClick={createUser} />

        <Link to="/login" className="my-2 block text-blue-500">
          Already have an account? Login
        </Link>
      </div>
      <Toaster />
    </div>
  );
}

export default Signup;