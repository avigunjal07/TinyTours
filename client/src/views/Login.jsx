import { useEffect, useState } from "react";
import { setPageTitle } from "../utils.jsx";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";

import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router";

function Login() {
  useEffect(() => {
    setPageTitle("Login - TinyTours");
  }, []);

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const checkUserLogin = async () => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login` , loginUser);

    console.log(response.data);

    if (response.data.success) {
      toast.success(response.data.message, { id: "loginSuccess" });
      setLoginUser({
        email: "",
        password: "",
      });

      const { jwtToken, data } = response.data;

      localStorage.setItem("userJwtToken", jwtToken);

      localStorage.setItem("userData", JSON.stringify(data));
      
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    
    } else {
      toast.error(response.data.message, { id: "loginError" });
    }
  };

  return (
  <div className="min-h-screen bg-blue-50">
    <Navbar />

    <div className="flex justify-center items-center mt-16 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-blue-100">

        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Login to TinyTours
        </h2>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={loginUser.email}
            onChange={(e) =>
              setLoginUser({ ...loginUser, email: e.target.value })
            }
            className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <Input
            type="password"
            placeholder="Password"
            value={loginUser.password}
            onChange={(e) =>
              setLoginUser({ ...loginUser, password: e.target.value })
            }
            className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <Button
            title="Login"
            onClick={checkUserLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
          />
        </div>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 font-medium ">
            Signup
          </Link>
        </p>
      </div>
    </div>

    <Toaster />
  </div>
);
}

export default Login;